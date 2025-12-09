'use client';

import React, { useState, useEffect, useRef } from 'react';

/**
 * HOOKS
 */

const useSmoothMouse = () => {
  const [mouse, setMouse] = useState({ x: -9999, y: -9999, vx: 0, vy: 0, pressed: 0 });
  const targetMouse = useRef({ x: -9999, y: -9999 });
  const currentMouse = useRef({ x: -9999, y: -9999 });
  const prevMouse = useRef({ x: -9999, y: -9999 });
  const pressedTime = useRef(0);
  const isPressed = useRef(false);
  const animationFrame = useRef<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      targetMouse.current = { x: event.clientX, y: event.clientY };
    };
    
    const handleMouseDown = () => {
      isPressed.current = true;
      pressedTime.current = 0;
    };
    
    const handleMouseUp = () => {
      isPressed.current = false;
    };
    
    const handleMouseLeave = () => {
      targetMouse.current = { x: -9999, y: -9999 };
      isPressed.current = false;
    };

    const updateMouse = () => {
      // Smooth linear interpolation for fluid cursor movement
      currentMouse.current.x += (targetMouse.current.x - currentMouse.current.x) * 0.15;
      currentMouse.current.y += (targetMouse.current.y - currentMouse.current.y) * 0.15;
      
      // Calculate velocity
      const vx = currentMouse.current.x - prevMouse.current.x;
      const vy = currentMouse.current.y - prevMouse.current.y;
      
      // Accumulate press time
      if (isPressed.current) {
        pressedTime.current = Math.min(pressedTime.current + 0.05, 3.0);
      } else {
        pressedTime.current = Math.max(pressedTime.current - 0.1, 0);
      }
      
      prevMouse.current = { ...currentMouse.current };
      setMouse({ ...currentMouse.current, vx, vy, pressed: pressedTime.current });
      animationFrame.current = requestAnimationFrame(updateMouse);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseleave', handleMouseLeave);
    updateMouse();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseleave', handleMouseLeave);
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    };
  }, []);

  return mouse;
};

/**
 * SHADER CODE (GLSL)
 */

const vertexShaderSource = `
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = position * 0.5 + 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

  const fragmentShaderSource = `
  precision highp float;
  
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  uniform vec2 u_velocity;
  uniform float u_pressed;

  // -- PHYSICS & CONFIGURATION --
  const int ITERATIONS = 8;           
  const vec3 SUN_DIR = normalize(vec3(-0.2, 0.4, -0.5)); 
  const vec3 SUN_COLOR = vec3(1.2, 1.1, 1.0);            

  // -- UTILS --
  vec2 hash(vec2 p) {
    p = vec2(dot(p,vec2(127.1,311.7)), dot(p,vec2(269.5,183.3)));
    return -1.0 + 2.0*fract(sin(p)*43758.5453123);
  }

  float noise(vec2 p) {
    const float K1 = 0.366025404;
    const float K2 = 0.211324865;
    vec2 i = floor(p + (p.x+p.y)*K1);
    vec2 a = p - i + (i.x+i.y)*K2;
    vec2 o = (a.x>a.y) ? vec2(1.0,0.0) : vec2(0.0,1.0);
    vec2 b = a - o + K2;
    vec2 c = a - 1.0 + 2.0*K2;
    vec3 h = max(0.5-vec3(dot(a,a), dot(b,b), dot(c,c) ), 0.0 );
    vec3 n = h*h*h*h*vec3( dot(a,hash(i+0.0)), dot(b,hash(i+o)), dot(c,hash(i+1.0)));
    return dot(n, vec3(70.0));
  }

  // -- WAVE GENERATION --
  float getWaves(vec2 p) {
    float iter = 0.0;
    float frequency = 0.8;
    float timeMultiplier = u_time * 0.6; // Slightly faster basic flow
    float weight = 0.8;
    float waveHeight = 0.0;
    
    mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
    
    for(int i=0; i<ITERATIONS; i++) {
        float d = noise(p * frequency + timeMultiplier);
        d = 1.0 - abs(d); 
        d = pow(d, 2.2); 
        waveHeight += d * weight;
        weight *= 0.5;      
        frequency *= 1.18;  
        p = m * p;          
        timeMultiplier *= 1.07;
    }
    return waveHeight;
  }
  
  float getCaustics(vec2 p) {
      vec2 q = p * 2.0;
      float d = noise(q + u_time * 0.5) * 0.5;
      d += noise(q * 2.0 - u_time * 0.3) * 0.25;
      return pow(smoothstep(0.3, 0.8, d + 0.3), 3.0); 
  }

  vec3 aces_tonemap(vec3 color){  
    mat3 m1 = mat3(
        0.59719, 0.07600, 0.02840,
        0.35458, 0.90834, 0.13383,
        0.04823, 0.01566, 0.83777
    );
    mat3 m2 = mat3(
        1.60475, -0.10208, -0.00327,
        -0.53108,  1.10813, -0.07276,
        -0.07367, -0.00605,  1.07602
    );
    vec3 v = m1 * color;    
    vec3 a = v * (v + 0.0245786) - 0.000090537;
    vec3 b = v * (0.983729 * v + 0.4329510) + 0.238081;
    return clamp(m2 * (a / b), 0.0, 1.0);  
  }

  void main() {
      // 1. Setup Coordinates
      vec2 uv = gl_FragCoord.xy / u_resolution.xy;
      vec2 p = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
      
      // 2. Interactive Ripples & Flow
      vec2 mouse = (u_mouse / u_resolution) * 2.0 - 1.0;
      mouse.x *= u_resolution.x / u_resolution.y;
      
      float dist = length(p - mouse);
      vec2 toMouse = p - mouse;
      
      float speed = length(u_velocity);
      vec2 flowDir = normalize(u_velocity + vec2(0.001)); 
      
      float pressIntensity = u_pressed * 0.5 + 1.0;
      float rippleRadius = 0.6 + u_pressed * 0.3;
      
      // Ripple waves
      float ripple1 = sin(dist * 25.0 - u_time * 8.0) * exp(-dist * 3.5) * pressIntensity;
      float ripple2 = sin(dist * 40.0 - u_time * 13.0) * exp(-dist * 5.0) * 0.4 * pressIntensity;
      float ripple = ripple1 + ripple2;
      
      float influence = smoothstep(rippleRadius, 0.0, dist);
      
      // --- ATTRACTION PHYSICS ---
      // 1. Drag Flow: Water follows mouse velocity
      // Invert direction (-=) so sampling moves opposite to motion -> visuals move WITH motion
      float speedFactor = clamp(speed * 3.0, 0.0, 1.0);
      vec2 flowDistortion = flowDir * speedFactor * influence * 0.2;
      p -= flowDistortion; 

      // 2. Suction/Attraction: Water pulled towards mouse center
      // += to sampling coordinate pulls OUTER content INWARDS (Pinch/Attract)
      vec2 attraction = normalize(toMouse) * influence * 0.15;
      p += attraction;
      
      // Subtle ripple refraction
      vec2 rippleDistortion = normalize(toMouse) * ripple * influence * 0.06;
      p += rippleDistortion;

      // 3. Height & Normals
      float h = getWaves(p * 2.0); 
      
      vec2 e = vec2(0.01, 0.0);
      float hx = getWaves((p + e.xy) * 2.0);
      float hy = getWaves((p + e.yx) * 2.0);
      
      vec3 rippleNormal = vec3(-ripple * normalize(toMouse).x, 1.0, -ripple * normalize(toMouse).y) * influence;
      vec3 normal = normalize(vec3(h - hx, 0.1, h - hy) + rippleNormal * 0.5);
      
      // 4. Lighting
      vec3 viewDir = normalize(vec3(0.0, 1.0, 0.5));
      float fresnel = 0.02 + 0.98 * pow(1.0 - max(dot(viewDir, normal), 0.0), 4.0);
      
      vec3 halfVec = normalize(SUN_DIR + viewDir);
      float spec = pow(max(dot(normal, halfVec), 0.0), 180.0);
      
      float caustics = getCaustics(p * 2.0 + normal.xz * 0.2);
      
      // 5. Coloring - Deep Blue/Cyan
      vec3 deepColor = vec3(0.0, 0.4, 0.6);      
      vec3 shallowColor = vec3(0.0, 0.8, 0.95); 
      
      vec3 col = mix(deepColor, shallowColor, h * 0.5 + 0.4);
      col += caustics * vec3(0.5, 0.9, 1.0) * 0.5;
      
      vec3 skyColor = vec3(0.6, 0.8, 0.95);
      col = mix(col, skyColor, fresnel * 0.5);
      
      col += SUN_COLOR * spec * 2.5;
      
      // Highlights
      float rippleIntensity = abs(ripple) * influence;
      float refractedCaustics = getCaustics(p * 2.0 + rippleIntensity * 0.5);
      col += vec3(0.4, 0.7, 0.85) * refractedCaustics * rippleIntensity * 0.6;
      
      float highlight = smoothstep(0.3, 0.8, ripple) * influence;
      col += vec3(0.7, 0.9, 1.0) * highlight * 0.3;
      
      col = mix(col, shallowColor, rippleIntensity * 0.15);

      // 6. Post
      col *= 1.3;
      col = aces_tonemap(col);
      col *= 1.0 - length(uv - 0.5) * 0.3;

      gl_FragColor = vec4(col, 1.0);
  }
`;

/**
 * COMPONENT
 */

const BackgroundShader = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const mouse = useSmoothMouse();
  const mouseRef = useRef({ x: 0, y: 0, vx: 0, vy: 0, pressed: 0 });

  // Sync React state to Ref for render loop access
  useEffect(() => {
    mouseRef.current = mouse;
  }, [mouse]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl');

    if (!gl) return;

    // --- Shader Boilerplate ---
    const createShader = (gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader Error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const createProgram = (gl: WebGLRenderingContext, vs: WebGLShader, fs: WebGLShader): WebGLProgram | null => {
      const program = gl.createProgram();
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error("Program Error:", gl.getProgramInfoLog(program));
        return null;
      }
      return program;
    };

    const vertShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    
    if (!vertShader || !fragShader) return;
    
    const program = createProgram(gl, vertShader, fragShader);

    if (!program) return;

    // Create a full-screen triangle strip/quad
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1, 1, -1, -1, 1,
      -1, 1, 1, -1, 1, 1,
    ]), gl.STATIC_DRAW);

    // Get Uniform Locations
    const positionLoc = gl.getAttribLocation(program, 'position');
    const timeLoc = gl.getUniformLocation(program, 'u_time');
    const resLoc = gl.getUniformLocation(program, 'u_resolution');
    const mouseLoc = gl.getUniformLocation(program, 'u_mouse');
    const velocityLoc = gl.getUniformLocation(program, 'u_velocity');
    const pressedLoc = gl.getUniformLocation(program, 'u_pressed');

    let startTime = performance.now();

    // Render Loop
    const render = (now: number) => {
      if (!canvas) return;

      // Handle Window Resize
      const displayWidth = window.innerWidth;
      const displayHeight = window.innerHeight;
      
      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);
      }

      gl.useProgram(program);
      gl.enableVertexAttribArray(positionLoc);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

      // Pass Uniforms
      gl.uniform1f(timeLoc, (now - startTime) * 0.001);
      gl.uniform2f(resLoc, canvas.width, canvas.height);
      // Invert Y for correct mouse tracking in GL coords
      gl.uniform2f(mouseLoc, mouseRef.current.x, canvas.height - mouseRef.current.y);
      gl.uniform2f(velocityLoc, mouseRef.current.vx, -mouseRef.current.vy);
      gl.uniform1f(pressedLoc, mouseRef.current.pressed);
      
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationRef.current = requestAnimationFrame(render);
    };

    animationRef.current = requestAnimationFrame(render);

    // Cleanup
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (gl) {
        if (program) gl.deleteProgram(program);
        if (vertShader) gl.deleteShader(vertShader);
        if (fragShader) gl.deleteShader(fragShader);
        if (positionBuffer) gl.deleteBuffer(positionBuffer);
      }
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute top-0 left-0 w-full h-full block bg-black"
    />
  );
};

export default function App() {
  return (
    <div className="relative w-full h-full bg-black overflow-hidden">
      <BackgroundShader />
    </div>
  );
}