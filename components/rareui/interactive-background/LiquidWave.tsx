"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface LiquidWaveProps {
  color1?: string;
  color2?: string;
  color3?: string;
  mouseForce?: number;
  cursorSize?: number;
  isViscous?: boolean;
  viscous?: number;
  iterationsViscous?: number;
  iterationsPoisson?: number;
  dt?: number;
  BFECC?: boolean;
  resolution?: number;
  isBounce?: boolean;
  autoDemo?: boolean;
  autoSpeed?: number;
  autoIntensity?: number;
  takeoverDuration?: number;
  autoResumeDelay?: number;
  autoRampDuration?: number;
  style?: React.CSSProperties;
  className?: string;
}

export default function LiquidWave({
  color1 = "orange", 
  color2 = "orange",
  color3 = "orange",
  mouseForce = 20,
  cursorSize = 100,
  isViscous = false,
  viscous = 30,
  iterationsViscous = 32,
  iterationsPoisson = 32,
  dt = 0.014,
  BFECC = true,
  resolution = 0.5,
  isBounce = false,
  autoDemo = true,
  autoSpeed = 0.5,
  autoIntensity = 2.2,
  takeoverDuration = 0.25,
  autoResumeDelay = 3000,
  autoRampDuration = 0.6,
  style,
  className,
}: LiquidWaveProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const webglRef = useRef<any>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const rafRef = useRef<number | null>(null);
  const intersectionObserverRef = useRef<IntersectionObserver | null>(null);
  const isVisibleRef = useRef<boolean>(true);
  const resizeRafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // --- 1. Global / Common Classes ---
    // We recreate the classes inside useEffect or outside to avoid global state issues in React HMR/strict mode
    // Ideally, these should be separate, but for a port, keeping them scoped or module-level is fine.
    // Given the complexity, I'll instantiate helpers inside a closure or keep them module-level 
    // IF we are sure only one instance corresponds to one canvas. 
    // The original code used a singleton `Common` and `Mouse`. 
    // We should make them instance-specific to allow multiple LiquidWaves on one page.

    class CommonClass {
      width = 0;
      height = 0;
      aspect = 1;
      pixelRatio = 1;
      container: HTMLElement | null = null;
      renderer: THREE.WebGLRenderer | null = null;
      clock: THREE.Clock | null = null;
      delta = 0;
      time = 0;

      init(container: HTMLElement) {
        this.container = container;
        this.pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
        this.resize();
        this.renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true,
        });
        this.renderer.autoClear = false;
        this.renderer.setClearColor(new THREE.Color(0), 0);
        this.renderer.setPixelRatio(this.pixelRatio);
        this.renderer.setSize(this.width, this.height);
        this.renderer.domElement.style.width = "100%";
        this.renderer.domElement.style.height = "100%";
        this.renderer.domElement.style.display = "block";
        this.clock = new THREE.Clock();
        this.clock.start();
      }

      resize() {
        if (!this.container) return;
        const rect = this.container.getBoundingClientRect();
        this.width = Math.max(1, Math.floor(rect.width));
        this.height = Math.max(1, Math.floor(rect.height));
        this.aspect = this.width / this.height;
        if (this.renderer)
          this.renderer.setSize(this.width, this.height, false);
      }

      update() {
        if (!this.clock) return;
        this.delta = this.clock.getDelta();
        this.time += this.delta;
      }
      
      dispose() {
          if (this.renderer) {
              this.renderer.dispose();
              this.renderer = null;
          }
      }
    }

    class MouseClass {
      container: HTMLElement | null = null;
      mouseMoved = false;
      coords = new THREE.Vector2();
      coords_old = new THREE.Vector2();
      diff = new THREE.Vector2();
      timer: any = null;
      isHoverInside = false;
      hasUserControl = false;
      isAutoActive = false;
      autoIntensity = 2;
      takeoverActive = false;
      takeoverStartTime = 0;
      takeoverDuration = 0.25;
      takeoverFrom = new THREE.Vector2();
      takeoverTo = new THREE.Vector2();
      onInteract: (() => void) | null = null;

      init(container: HTMLElement) {
        this.container = container;
        container.addEventListener("mousemove", this._onMouseMove, false);
        container.addEventListener("touchstart", this._onTouchStart, false);
        container.addEventListener("touchmove", this._onTouchMove, false);
        container.addEventListener("mouseenter", this._onMouseEnter, false);
        container.addEventListener("mouseleave", this._onMouseLeave, false);
        container.addEventListener("touchend", this._onTouchEnd, false);
      }

      dispose() {
        if (!this.container) return;
        this.container.removeEventListener("mousemove", this._onMouseMove, false);
        this.container.removeEventListener("touchstart", this._onTouchStart, false);
        this.container.removeEventListener("touchmove", this._onTouchMove, false);
        this.container.removeEventListener("mouseenter", this._onMouseEnter, false);
        this.container.removeEventListener("mouseleave", this._onMouseLeave, false);
        this.container.removeEventListener("touchend", this._onTouchEnd, false);
      }

      setCoords(x: number, y: number) {
        if (!this.container) return;
        if (this.timer) clearTimeout(this.timer);
        const rect = this.container.getBoundingClientRect();
        const nx = (x - rect.left) / rect.width;
        const ny = (y - rect.top) / rect.height;
        this.coords.set(nx * 2 - 1, -(ny * 2 - 1));
        this.mouseMoved = true;
        this.timer = setTimeout(() => {
          this.mouseMoved = false;
        }, 100);
      }

      setNormalized(nx: number, ny: number) {
        this.coords.set(nx, ny);
        this.mouseMoved = true;
      }

      _onMouseMove = (event: MouseEvent) => {
        if (this.onInteract) this.onInteract();
        if (
          this.isAutoActive &&
          !this.hasUserControl &&
          !this.takeoverActive &&
          this.container
        ) {
          const rect = this.container.getBoundingClientRect();
          const nx = (event.clientX - rect.left) / rect.width;
          const ny = (event.clientY - rect.top) / rect.height;
          this.takeoverFrom.copy(this.coords);
          this.takeoverTo.set(nx * 2 - 1, -(ny * 2 - 1));
          this.takeoverStartTime = performance.now();
          this.takeoverActive = true;
          this.hasUserControl = true;
          this.isAutoActive = false;
          return;
        }
        this.setCoords(event.clientX, event.clientY);
        this.hasUserControl = true;
      };

      _onTouchStart = (event: TouchEvent) => {
        if (event.touches.length === 1) {
          const t = event.touches[0];
          if (this.onInteract) this.onInteract();
          this.setCoords(t.pageX, t.pageY);
          this.hasUserControl = true;
        }
      };

      _onTouchMove = (event: TouchEvent) => {
        if (event.touches.length === 1) {
          const t = event.touches[0];
          if (this.onInteract) this.onInteract();
          this.setCoords(t.pageX, t.pageY);
        }
      };

      _onTouchEnd = () => {
        this.isHoverInside = false;
      };
      _onMouseEnter = () => {
        this.isHoverInside = true;
      };
      _onMouseLeave = () => {
        this.isHoverInside = false;
      };

      update() {
        if (this.takeoverActive) {
          const t =
            (performance.now() - this.takeoverStartTime) /
            (this.takeoverDuration * 1000);
          if (t >= 1) {
            this.takeoverActive = false;
            this.coords.copy(this.takeoverTo);
            this.coords_old.copy(this.coords);
            this.diff.set(0, 0);
          } else {
            const k = t * t * (3 - 2 * t);
            this.coords.copy(this.takeoverFrom).lerp(this.takeoverTo, k);
          }
        }
        this.diff.subVectors(this.coords, this.coords_old);
        this.coords_old.copy(this.coords);
        if (this.coords_old.x === 0 && this.coords_old.y === 0)
          this.diff.set(0, 0);
        if (this.isAutoActive && !this.takeoverActive)
          this.diff.multiplyScalar(this.autoIntensity);
      }
    }

    class AutoDriver {
      mouse: MouseClass;
      manager: any;
      enabled: boolean;
      speed: number;
      resumeDelay: number;
      rampDurationMs: number;
      active = false;
      current = new THREE.Vector2(0, 0);
      target = new THREE.Vector2();
      lastTime = performance.now();
      activationTime = 0;
      margin = 0.2;
      _tmpDir = new THREE.Vector2();

      constructor(mouse: MouseClass, manager: any, opts: any) {
        this.mouse = mouse;
        this.manager = manager;
        this.enabled = opts.enabled;
        this.speed = opts.speed;
        this.resumeDelay = opts.resumeDelay || 3000;
        this.rampDurationMs = (opts.rampDuration || 0) * 1000;
        this.pickNewTarget();
      }

      pickNewTarget() {
        const r = Math.random;
        this.target.set(
          (r() * 2 - 1) * (1 - this.margin),
          (r() * 2 - 1) * (1 - this.margin)
        );
      }

      forceStop() {
        this.active = false;
        this.mouse.isAutoActive = false;
      }

      update() {
        if (!this.enabled) return;
        const now = performance.now();
        const idle = now - this.manager.lastUserInteraction;
        if (idle < this.resumeDelay) {
          if (this.active) this.forceStop();
          return;
        }
        if (this.mouse.isHoverInside) {
          if (this.active) this.forceStop();
          return;
        }
        if (!this.active) {
          this.active = true;
          this.current.copy(this.mouse.coords);
          this.lastTime = now;
          this.activationTime = now;
        }
        if (!this.active) return;
        this.mouse.isAutoActive = true;
        let dtSec = (now - this.lastTime) / 1000;
        this.lastTime = now;
        if (dtSec > 0.2) dtSec = 0.016;

        const dir = this._tmpDir.subVectors(this.target, this.current);
        const dist = dir.length();
        if (dist < 0.01) {
          this.pickNewTarget();
          return;
        }
        dir.normalize();
        let ramp = 1;
        if (this.rampDurationMs > 0) {
          const t = Math.min(
            1,
            (now - this.activationTime) / this.rampDurationMs
          );
          ramp = t * t * (3 - 2 * t);
        }
        const step = this.speed * dtSec * ramp;
        const move = Math.min(step, dist);
        this.current.addScaledVector(dir, move);
        this.mouse.setNormalized(this.current.x, this.current.y);
      }
    }

    // --- 2. Shaders ---
    const face_vert = `
      attribute vec3 position;
      uniform vec2 px;
      uniform vec2 boundarySpace;
      varying vec2 uv;
      precision highp float;
      void main(){
        vec3 pos = position;
        vec2 scale = 1.0 - boundarySpace * 2.0;
        pos.xy = pos.xy * scale;
        uv = vec2(0.5)+(pos.xy)*0.5;
        gl_Position = vec4(pos, 1.0);
      }
    `;

    const line_vert = `
      attribute vec3 position;
      uniform vec2 px;
      precision highp float;
      varying vec2 uv;
      void main(){
        vec3 pos = position;
        uv = 0.5 + pos.xy * 0.5;
        vec2 n = sign(pos.xy);
        pos.xy = abs(pos.xy) - px * 1.0;
        pos.xy *= n;
        gl_Position = vec4(pos, 1.0);
      }
    `;

    const mouse_vert = `
      precision highp float;
      attribute vec3 position;
      attribute vec2 uv;
      uniform vec2 center;
      uniform vec2 scale;
      uniform vec2 px;
      varying vec2 vUv;
      void main(){
        vec2 pos = position.xy * scale * 2.0 * px + center;
        vUv = uv;
        gl_Position = vec4(pos, 0.0, 1.0);
      }
    `;

    const advection_frag = `
      precision highp float;
      uniform sampler2D velocity;
      uniform float dt;
      uniform bool isBFECC;
      uniform vec2 fboSize;
      uniform vec2 px;
      varying vec2 uv;
      void main(){
        vec2 ratio = max(fboSize.x, fboSize.y) / fboSize;
        if(isBFECC == false){
          vec2 vel = texture2D(velocity, uv).xy;
          vec2 uv2 = uv - vel * dt * ratio;
          vec2 newVel = texture2D(velocity, uv2).xy;
          gl_FragColor = vec4(newVel, 0.0, 0.0);
        } else {
          vec2 spot_new = uv;
          vec2 vel_old = texture2D(velocity, uv).xy;
          vec2 spot_old = spot_new - vel_old * dt * ratio;
          vec2 vel_new1 = texture2D(velocity, spot_old).xy;
          vec2 spot_new2 = spot_old + vel_new1 * dt * ratio;
          vec2 error = spot_new2 - spot_new;
          vec2 spot_new3 = spot_new - error / 2.0;
          vec2 vel_2 = texture2D(velocity, spot_new3).xy;
          vec2 spot_old2 = spot_new3 - vel_2 * dt * ratio;
          vec2 newVel2 = texture2D(velocity, spot_old2).xy;
          gl_FragColor = vec4(newVel2, 0.0, 0.0);
        }
      }
    `;

    const color_frag = `
      precision highp float;
      uniform sampler2D velocity;
      uniform sampler2D palette;
      uniform vec4 bgColor;
      varying vec2 uv;
      void main(){
        vec2 vel = texture2D(velocity, uv).xy;
        float lenv = clamp(length(vel), 0.0, 1.0);
        vec3 c = texture2D(palette, vec2(lenv, 0.5)).rgb;
        vec3 outRGB = mix(bgColor.rgb, c, lenv);
        float outA = mix(bgColor.a, 1.0, lenv);
        gl_FragColor = vec4(outRGB, outA);
      }
    `;

    const divergence_frag = `
      precision highp float;
      uniform sampler2D velocity;
      uniform float dt;
      uniform vec2 px;
      varying vec2 uv;
      void main(){
        float x0 = texture2D(velocity, uv-vec2(px.x, 0.0)).x;
        float x1 = texture2D(velocity, uv+vec2(px.x, 0.0)).x;
        float y0 = texture2D(velocity, uv-vec2(0.0, px.y)).y;
        float y1 = texture2D(velocity, uv+vec2(0.0, px.y)).y;
        float divergence = (x1 - x0 + y1 - y0) / 2.0;
        gl_FragColor = vec4(divergence / dt);
      }
    `;

    const externalForce_frag = `
      precision highp float;
      uniform vec2 force;
      uniform vec2 center;
      uniform vec2 scale;
      uniform vec2 px;
      varying vec2 vUv;
      void main(){
        vec2 circle = (vUv - 0.5) * 2.0;
        float d = 1.0 - min(length(circle), 1.0);
        d *= d;
        gl_FragColor = vec4(force * d, 0.0, 1.0);
      }
    `;

    const poisson_frag = `
      precision highp float;
      uniform sampler2D pressure;
      uniform sampler2D divergence;
      uniform vec2 px;
      varying vec2 uv;
      void main(){
        float p0 = texture2D(pressure, uv + vec2(px.x * 2.0, 0.0)).r;
        float p1 = texture2D(pressure, uv - vec2(px.x * 2.0, 0.0)).r;
        float p2 = texture2D(pressure, uv + vec2(0.0, px.y * 2.0)).r;
        float p3 = texture2D(pressure, uv - vec2(0.0, px.y * 2.0)).r;
        float div = texture2D(divergence, uv).r;
        float newP = (p0 + p1 + p2 + p3) / 4.0 - div;
        gl_FragColor = vec4(newP);
      }
    `;

    const pressure_frag = `
      precision highp float;
      uniform sampler2D pressure;
      uniform sampler2D velocity;
      uniform vec2 px;
      uniform float dt;
      varying vec2 uv;
      void main(){
        float step = 1.0;
        float p0 = texture2D(pressure, uv + vec2(px.x * step, 0.0)).r;
        float p1 = texture2D(pressure, uv - vec2(px.x * step, 0.0)).r;
        float p2 = texture2D(pressure, uv + vec2(0.0, px.y * step)).r;
        float p3 = texture2D(pressure, uv - vec2(0.0, px.y * step)).r;
        vec2 v = texture2D(velocity, uv).xy;
        vec2 gradP = vec2(p0 - p1, p2 - p3) * 0.5;
        v = v - gradP * dt;
        gl_FragColor = vec4(v, 0.0, 1.0);
      }
    `;

    const viscous_frag = `
      precision highp float;
      uniform sampler2D velocity;
      uniform sampler2D velocity_new;
      uniform float v;
      uniform vec2 px;
      uniform float dt;
      varying vec2 uv;
      void main(){
        vec2 old = texture2D(velocity, uv).xy;
        vec2 new0 = texture2D(velocity_new, uv + vec2(px.x * 2.0, 0.0)).xy;
        vec2 new1 = texture2D(velocity_new, uv - vec2(px.x * 2.0, 0.0)).xy;
        vec2 new2 = texture2D(velocity_new, uv + vec2(0.0, px.y * 2.0)).xy;
        vec2 new3 = texture2D(velocity_new, uv - vec2(0.0, px.y * 2.0)).xy;
        vec2 newv = 4.0 * old + v * dt * (new0 + new1 + new2 + new3);
        newv /= 4.0 * (1.0 + v * dt);
        gl_FragColor = vec4(newv, 0.0, 0.0);
      }
    `;


    // --- 3. Instances inside component scope ---
    const Common = new CommonClass();
    const Mouse = new MouseClass();
    
    // --- 4. Simulation Classes ---
    class ShaderPass {
      props: any;
      uniforms: any;
      scene: THREE.Scene;
      camera: THREE.Camera;
      material: THREE.RawShaderMaterial | null = null;
      geometry: THREE.PlaneGeometry | null = null;
      plane: THREE.Mesh | null = null;

      constructor(props: any) {
        this.props = props || {};
        this.uniforms = this.props.material?.uniforms;
        this.scene = new THREE.Scene();
        this.camera = new THREE.Camera();
      }

      init() {
        if (this.uniforms) {
          this.material = new THREE.RawShaderMaterial(this.props.material);
          this.geometry = new THREE.PlaneGeometry(2, 2);
          this.plane = new THREE.Mesh(this.geometry, this.material);
          this.scene.add(this.plane);
        }
      }

      run() {
        if(!Common.renderer) return;
        Common.renderer.setRenderTarget(this.props.output || null);
        Common.renderer.render(this.scene, this.camera);
        Common.renderer.setRenderTarget(null);
      }
    }

    class Advection extends ShaderPass {
      line: THREE.LineSegments | null = null;

      constructor(simProps: any) {
        super({
          material: {
            vertexShader: face_vert,
            fragmentShader: advection_frag,
            uniforms: {
              boundarySpace: { value: simProps.cellScale },
              px: { value: simProps.cellScale },
              fboSize: { value: simProps.fboSize },
              velocity: { value: simProps.src.texture },
              dt: { value: simProps.dt },
              isBFECC: { value: true },
            },
          },
          output: simProps.dst,
        });
        this.init();
      }

      init() {
        super.init();
        this.createBoundary();
      }

      createBoundary() {
        const boundaryG = new THREE.BufferGeometry();
        const vertices_boundary = new Float32Array([
          -1, -1, 0, -1, 1, 0, -1, 1, 0, 1, 1, 0, 1, 1, 0, 1, -1, 0, 1, -1, 0, -1, -1, 0,
        ]);
        boundaryG.setAttribute(
          "position",
          new THREE.BufferAttribute(vertices_boundary, 3)
        );
        const boundaryM = new THREE.RawShaderMaterial({
          vertexShader: line_vert,
          fragmentShader: advection_frag,
          uniforms: this.uniforms,
        });
        this.line = new THREE.LineSegments(boundaryG, boundaryM);
        this.scene.add(this.line);
      }

      update({ dt, isBounce, BFECC }: any) {
        this.uniforms.dt.value = dt;
        if(this.line) this.line.visible = isBounce;
        this.uniforms.isBFECC.value = BFECC;
        super.run();
      }
    }

    class ExternalForce extends ShaderPass {
      mouse: THREE.Mesh | null = null;

      constructor(simProps: any) {
        super({ output: simProps.dst });
        this.init(simProps);
      }

      init(simProps?: any) {
        super.init();
        if (!simProps) return;
        const mouseG = new THREE.PlaneGeometry(1, 1);
        const mouseM = new THREE.RawShaderMaterial({
          vertexShader: mouse_vert,
          fragmentShader: externalForce_frag,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          uniforms: {
            px: { value: simProps.cellScale },
            force: { value: new THREE.Vector2(0, 0) },
            center: { value: new THREE.Vector2(0, 0) },
            scale: {
              value: new THREE.Vector2(simProps.cursor_size, simProps.cursor_size),
            },
          },
        });
        this.mouse = new THREE.Mesh(mouseG, mouseM);
        this.scene.add(this.mouse);
      }

      update(props: any) {
        const forceX = (Mouse.diff.x / 2) * props.mouse_force;
        const forceY = (Mouse.diff.y / 2) * props.mouse_force;
        const cursorSizeX = props.cursor_size * props.cellScale.x;
        const cursorSizeY = props.cursor_size * props.cellScale.y;
        const centerX = Math.min(
          Math.max(Mouse.coords.x, -1 + cursorSizeX + props.cellScale.x * 2),
          1 - cursorSizeX - props.cellScale.x * 2
        );
        const centerY = Math.min(
          Math.max(Mouse.coords.y, -1 + cursorSizeY + props.cellScale.y * 2),
          1 - cursorSizeY - props.cellScale.y * 2
        );
        
        if (this.mouse) {
          const uniforms = (this.mouse.material as THREE.RawShaderMaterial).uniforms;
          uniforms.force.value.set(forceX, forceY);
          uniforms.center.value.set(centerX, centerY);
          uniforms.scale.value.set(props.cursor_size, props.cursor_size);
        }
        super.run();
      }
    }

    class Viscous extends ShaderPass {
      constructor(simProps: any) {
        super({
          material: {
            vertexShader: face_vert,
            fragmentShader: viscous_frag,
            uniforms: {
              boundarySpace: { value: simProps.boundarySpace },
              velocity: { value: simProps.src.texture },
              velocity_new: { value: simProps.dst_.texture },
              v: { value: simProps.viscous },
              px: { value: simProps.cellScale },
              dt: { value: simProps.dt },
            },
          },
          output: simProps.dst,
          output0: simProps.dst_,
          output1: simProps.dst,
        });
        this.init();
      }

      update({ viscous, iterations, dt }: any) {
        let fbo_in, fbo_out;
        this.uniforms.v.value = viscous;
        for (let i = 0; i < iterations; i++) {
          if (i % 2 === 0) {
            fbo_in = this.props.output0;
            fbo_out = this.props.output1;
          } else {
            fbo_in = this.props.output1;
            fbo_out = this.props.output0;
          }
          this.uniforms.velocity_new.value = fbo_in.texture;
          this.props.output = fbo_out;
          this.uniforms.dt.value = dt;
          super.run();
        }
        return fbo_out;
      }
    }

    class Divergence extends ShaderPass {
      constructor(simProps: any) {
        super({
          material: {
            vertexShader: face_vert,
            fragmentShader: divergence_frag,
            uniforms: {
              boundarySpace: { value: simProps.boundarySpace },
              velocity: { value: simProps.src.texture },
              px: { value: simProps.cellScale },
              dt: { value: simProps.dt },
            },
          },
          output: simProps.dst,
        });
        this.init();
      }

      update({ vel }: any) {
        this.uniforms.velocity.value = vel.texture;
        super.run();
      }
    }

    class Poisson extends ShaderPass {
      constructor(simProps: any) {
        super({
          material: {
            vertexShader: face_vert,
            fragmentShader: poisson_frag,
            uniforms: {
              boundarySpace: { value: simProps.boundarySpace },
              pressure: { value: simProps.dst_.texture },
              divergence: { value: simProps.src.texture },
              px: { value: simProps.cellScale },
            },
          },
          output: simProps.dst,
          output0: simProps.dst_,
          output1: simProps.dst,
        });
        this.init();
      }

      update({ iterations }: any) {
        let p_in, p_out;
        for (let i = 0; i < iterations; i++) {
          if (i % 2 === 0) {
            p_in = this.props.output0;
            p_out = this.props.output1;
          } else {
            p_in = this.props.output1;
            p_out = this.props.output0;
          }
          this.uniforms.pressure.value = p_in.texture;
          this.props.output = p_out;
          super.run();
        }
        return p_out;
      }
    }

    class Pressure extends ShaderPass {
      constructor(simProps: any) {
        super({
          material: {
            vertexShader: face_vert,
            fragmentShader: pressure_frag,
            uniforms: {
              boundarySpace: { value: simProps.boundarySpace },
              pressure: { value: simProps.src_p.texture },
              velocity: { value: simProps.src_v.texture },
              px: { value: simProps.cellScale },
              dt: { value: simProps.dt },
            },
          },
          output: simProps.dst,
        });
        this.init();
      }

      update({ vel, pressure }: any) {
        this.uniforms.velocity.value = vel.texture;
        this.uniforms.pressure.value = pressure.texture;
        super.run();
      }
    }

    class Simulation {
      options: any;
      fbos: any;
      fboSize = new THREE.Vector2();
      cellScale = new THREE.Vector2();
      boundarySpace = new THREE.Vector2();
      advection: Advection | null = null;
      externalForce: ExternalForce | null = null;
      viscous: Viscous | null = null;
      divergence: Divergence | null = null;
      poisson: Poisson | null = null;
      pressure: Pressure | null = null;

      constructor(options: any) {
        this.options = options;
        this.fbos = {
          vel_0: null,
          vel_1: null,
          vel_viscous0: null,
          vel_viscous1: null,
          div: null,
          pressure_0: null,
          pressure_1: null,
        };
        this.init();
      }

      init() {
        this.calcSize();
        this.createAllFBO();
        this.createShaderPass();
      }

      calcSize() {
        const width = Math.max(1, Math.round(this.options.resolution * Common.width));
        const height = Math.max(1, Math.round(this.options.resolution * Common.height));
        const px_x = 1 / width;
        const px_y = 1 / height;
        this.cellScale.set(px_x, px_y);
        this.fboSize.set(width, height);
      }
      
      getFloatType() {
        // We can just return THREE.FloatType or HalfFloatType. 
        // Some mobile devices might need HalfFloatType, but modern ones support FloatType mostly.
        const isIOS = /(iPad|iPhone|iPod)/i.test(navigator.userAgent);
        return isIOS ? THREE.HalfFloatType : THREE.FloatType;
      }

      createAllFBO() {
        const type = this.getFloatType();
        const opts = {
          type,
          depthBuffer: false,
          stencilBuffer: false,
          minFilter: THREE.LinearFilter,
          magFilter: THREE.LinearFilter,
          wrapS: THREE.ClampToEdgeWrapping,
          wrapT: THREE.ClampToEdgeWrapping,
        };
        for (let key in this.fbos) {
          this.fbos[key] = new THREE.WebGLRenderTarget(
            this.fboSize.x,
            this.fboSize.y,
            opts
          );
        }
      }

      createShaderPass() {
        this.advection = new Advection({
          cellScale: this.cellScale,
          fboSize: this.fboSize,
          dt: this.options.dt,
          src: this.fbos.vel_0,
          dst: this.fbos.vel_1,
        });
        this.externalForce = new ExternalForce({
          cellScale: this.cellScale,
          cursor_size: this.options.cursor_size,
          dst: this.fbos.vel_1,
        });
        this.viscous = new Viscous({
          cellScale: this.cellScale,
          boundarySpace: this.boundarySpace,
          viscous: this.options.viscous,
          src: this.fbos.vel_1,
          dst: this.fbos.vel_viscous1,
          dst_: this.fbos.vel_viscous0,
          dt: this.options.dt,
        });
        this.divergence = new Divergence({
          cellScale: this.cellScale,
          boundarySpace: this.boundarySpace,
          src: this.fbos.vel_viscous0,
          dst: this.fbos.div,
          dt: this.options.dt,
        });
        this.poisson = new Poisson({
          cellScale: this.cellScale,
          boundarySpace: this.boundarySpace,
          src: this.fbos.div,
          dst: this.fbos.pressure_1,
          dst_: this.fbos.pressure_0,
        });
        this.pressure = new Pressure({
          cellScale: this.cellScale,
          boundarySpace: this.boundarySpace,
          src_p: this.fbos.pressure_0,
          src_v: this.fbos.vel_viscous0,
          dst: this.fbos.vel_0,
          dt: this.options.dt,
        });
      }

      resize() {
        this.calcSize();
        for (let key in this.fbos) {
          this.fbos[key].setSize(this.fboSize.x, this.fboSize.y);
        }
      }

      update() {
        if (this.options.isBounce) {
          this.boundarySpace.set(0, 0);
        } else {
          this.boundarySpace.copy(this.cellScale);
        }
        if (this.advection) this.advection.update({
          dt: this.options.dt,
          isBounce: this.options.isBounce,
          BFECC: this.options.BFECC,
        });
        if (this.externalForce) this.externalForce.update({
          cursor_size: this.options.cursor_size,
          mouse_force: this.options.mouse_force,
          cellScale: this.cellScale,
        });
        let vel = this.fbos.vel_1;
        if (this.options.isViscous && this.viscous) {
          vel = this.viscous.update({
            viscous: this.options.viscous,
            iterations: this.options.iterations_viscous,
            dt: this.options.dt,
          });
        }
        if (this.divergence) this.divergence.update({ vel });
        if (this.poisson) {
           const pressure = this.poisson.update({
              iterations: this.options.iterations_poisson,
           });
           if (this.pressure) this.pressure.update({ vel, pressure });
        }
      }
    }

    class Output {
      simulation: Simulation;
      scene: THREE.Scene;
      camera: THREE.Camera;
      output: THREE.Mesh | null = null;

      constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.Camera();
        
        // Dynamic palette texture generation
        const colors = [color1, color2, color3].filter(Boolean) as string[];

        function makePaletteTexture(stops: string[]) {
            let arr: string[];
            if (Array.isArray(stops) && stops.length > 0) {
              if (stops.length === 1) {
                arr = [stops[0], stops[0]];
              } else {
                arr = stops;
              }
            } else {
              arr = ["#ffffff", "#ffffff"];
            }
            const w = arr.length;
            const data = new Uint8Array(w * 4);
            for (let i = 0; i < w; i++) {
              const c = new THREE.Color(arr[i]);
              data[i * 4 + 0] = Math.round(c.r * 255);
              data[i * 4 + 1] = Math.round(c.g * 255);
              data[i * 4 + 2] = Math.round(c.b * 255);
              data[i * 4 + 3] = 255;
            }
            const tex = new THREE.DataTexture(data, w, 1, THREE.RGBAFormat);
            tex.magFilter = THREE.LinearFilter;
            tex.minFilter = THREE.LinearFilter;
            tex.wrapS = THREE.ClampToEdgeWrapping;
            tex.wrapT = THREE.ClampToEdgeWrapping;
            tex.needsUpdate = true;
            return tex;
        }

        const paletteTex = makePaletteTexture(colors);
        const bgVec4 = new THREE.Vector4(0, 0, 0, 0); // Transparent background

        this.simulation = new Simulation({
            iterations_poisson: iterationsPoisson,
            iterations_viscous: iterationsViscous,
            mouse_force: mouseForce,
            resolution: resolution,
            cursor_size: cursorSize,
            viscous: viscous,
            isBounce: isBounce,
            dt: dt,
            isViscous: isViscous,
            BFECC: BFECC,
        });

        this.output = new THREE.Mesh(
            new THREE.PlaneGeometry(2, 2),
            new THREE.RawShaderMaterial({
                vertexShader: face_vert,
                fragmentShader: color_frag,
                transparent: true,
                depthWrite: false,
                uniforms: {
                    velocity: { value: this.simulation.fbos.vel_0.texture },
                    boundarySpace: { value: new THREE.Vector2() },
                    palette: { value: paletteTex },
                    bgColor: { value: bgVec4 },
                }
            })
        );
        this.scene.add(this.output);
      }

      resize() {
        this.simulation.resize();
      }

      update() {
        this.simulation.update();
        if(Common.renderer) {
            Common.renderer.setRenderTarget(null);
            Common.renderer.render(this.scene, this.camera);
        }
      }
    }


    class WebGLManager {
      output: Output | null = null;
      running = false;
      autoDriver: AutoDriver | null = null;
      lastUserInteraction = 0;

      constructor(wrapper: HTMLElement | null) {
        if (!wrapper) return;
        Common.init(wrapper);
        Mouse.init(wrapper);
        wrapper.prepend(Common.renderer!.domElement);

        this.output = new Output();
        this.lastUserInteraction = performance.now();
        Mouse.onInteract = () => {
            this.lastUserInteraction = performance.now();
            if (this.autoDriver) this.autoDriver.forceStop();
        };
        Mouse.autoIntensity = autoIntensity;
        Mouse.takeoverDuration = takeoverDuration;
        
        this.autoDriver = new AutoDriver(Mouse, this, {
            enabled: autoDemo,
            speed: autoSpeed,
            resumeDelay: autoResumeDelay,
            rampDuration: autoRampDuration,
        });
      }

      resize() {
        Common.resize();
        if(this.output) this.output.resize();
      }

      render() {
        if (this.autoDriver) this.autoDriver.update();
        Mouse.update();
        Common.update();
        if(this.output) this.output.update();
      }
      
      loop = () => {
          if(!this.running) return;
          this.render();
          rafRef.current = requestAnimationFrame(this.loop);
      }

      start() {
          if(this.running) return;
          this.running = true;
          this.loop();
      }
      
      pause() {
          this.running = false;
          if(rafRef.current) {
              cancelAnimationFrame(rafRef.current);
              rafRef.current = null;
          }
      }

      dispose() {
          this.pause();
          Mouse.dispose();
          Common.dispose();
      }
    }

    // --- 5. Initializing Logic ---
    const wrapper = mountRef.current;
    
    // Cleanup any existing canvas
    if(wrapper.querySelector('canvas')) {
        wrapper.innerHTML = '';
        wrapper.appendChild(document.createElement('style')).textContent = `
          .liquid-ether-container { position: relative; overflow: hidden; width: 100%; height: 100%; touch-action: none; }
        `;
    } else {
        wrapper.appendChild(document.createElement('style')).textContent = `
          .liquid-ether-container { position: relative; overflow: hidden; width: 100%; height: 100%; touch-action: none; }
        `;
    }

    const webgl = new WebGLManager(wrapper);
    webglRef.current = webgl;
    webgl.start();

    // Resize Observer
    const ro = new ResizeObserver(() => {
        if (resizeRafRef.current) cancelAnimationFrame(resizeRafRef.current);
        resizeRafRef.current = requestAnimationFrame(() => {
           if(webglRef.current) webglRef.current.resize();
        });
    });
    ro.observe(wrapper);
    resizeObserverRef.current = ro;

    // Visibility (Intersection) Observer
    const io = new IntersectionObserver((entries) => {
        const entry = entries[0];
        const isVisible = entry.isIntersecting; // && entry.intersectionRatio > 0;
        isVisibleRef.current = isVisible;
        if(webglRef.current) {
            if(isVisible && !document.hidden) {
                webglRef.current.start();
            } else {
                webglRef.current.pause();
            }
        }
    }, { threshold: 0 });
    io.observe(wrapper);
    intersectionObserverRef.current = io;

    // Visibility Change
    const onVisibilityChange = () => {
        if(document.hidden) {
            if(webglRef.current) webglRef.current.pause();
        } else if(isVisibleRef.current) {
            if(webglRef.current) webglRef.current.start();
        }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        if (resizeObserverRef.current) resizeObserverRef.current.disconnect();
        if (intersectionObserverRef.current) intersectionObserverRef.current.disconnect();
        document.removeEventListener("visibilitychange", onVisibilityChange);
        if (webglRef.current) webglRef.current.dispose();
        if (wrapper && wrapper.querySelector('canvas')) {
          wrapper.innerHTML = ''; // Clear canvas
        }
        Common.dispose(); // Ensure Three.js context is cleaned
        Mouse.dispose();
    };
  }, [
    color1, color2, color3, mouseForce, cursorSize, isViscous, viscous, 
    iterationsViscous, iterationsPoisson, dt, BFECC, resolution, isBounce,
    autoDemo, autoSpeed, autoIntensity, takeoverDuration, autoResumeDelay, autoRampDuration
  ]);

  return (
    <div
      ref={mountRef}
      className={`liquid-ether-container ${className || ""}`}
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    />
  );
}
