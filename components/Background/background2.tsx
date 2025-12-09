"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface InteractiveBackgroundProps {
  className?: string;
  children?: React.ReactNode;
}

export default function InteractiveBackground2({ className, children }: InteractiveBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let flowField: number[] = [];
    let rows = 0;
    let cols = 0;
    let time = 0;
    
    // Config
    const CELL_SIZE = 20; // Resolution of flow field
    const CURVE = 0.003; // Curve scale
    const ZOOM = 0.0005; // Noise Frequency 
    const PARTICLE_COUNT = 3000; 
    
    // Mouse Interaction
    const mouse = { x: -1000, y: -1000, px: -1000, py: -1000, vx: 0, vy: 0, active: false, clicking: false };
    
    // ... (noise3D function remains same)

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      
      cols = Math.floor(width / CELL_SIZE);
      rows = Math.floor(height / CELL_SIZE);
      
      initParticles();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      // Update coords
      mouse.px = mouse.x;
      mouse.py = mouse.y;
      
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      
      // Calculate velocity
      if (mouse.px > -500) {
          mouse.vx = (mouse.x - mouse.px);
          mouse.vy = (mouse.y - mouse.py);
      }
      
      mouse.active = true;
    };
    
    const handleMouseDown = () => { mouse.clicking = true; };
    const handleMouseUp = () => { mouse.clicking = false; };
    
    const handleMouseLeave = () => { mouse.active = false; };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      history: {x: number, y: number}[];
      color: string;
      baseColor: string;
      age: number;
      lifeSpan: number;
      speedMod: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = 0;
        this.vy = 0;
        this.history = [];
        this.age = 0;
        this.lifeSpan = Math.random() * 200 + 50;
        this.speedMod = Math.random() * 0.5 + 0.5;
        
        // Initial Color
        this.baseColor = this.getColor();
        this.color = this.baseColor;
      }
      
      getColor() {
         const r = Math.random();
         if(r > 0.66) return "rgba(14, 165, 233, 0.5)"; // Sky blue
         if(r > 0.33) return "rgba(236, 72, 153, 0.5)"; // Pink
         return "rgba(250, 204, 21, 0.5)"; // Yellow/Gold
      }
      
      reset() {
         this.x = Math.random() * width;
         this.y = Math.random() * height;
         this.history = [];
         this.age = 0;
      }

      update() {
        this.age++;
        if (this.age > this.lifeSpan) {
            this.reset();
        }
        
        // Noise Angle
        const n = Math.sin(this.y * CURVE + time) + Math.cos(this.x * CURVE + time);
        let angle = n * Math.PI;

        // --- MOUSE FLOW CONTROL ---
        if (mouse.active) {
            const dx = this.x - mouse.x;
            const dy = this.y - mouse.y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            const interactionRadius = 250;
            
            if (dist < interactionRadius) {
               const force = (interactionRadius - dist) / interactionRadius;
               
               // DIRECT CONTROL: 
               // Add mouse velocity to particle velocity proportional to distance
               // "Pushing" the fluid
               if (Math.abs(mouse.vx) > 0 || Math.abs(mouse.vy) > 0) {
                  this.vx += mouse.vx * force * 0.05;
                  this.vy += mouse.vy * force * 0.05;
                  
                  // Turn Cyan/White on interaction
                  this.color = "rgba(100, 255, 218, 0.8)";
               }
               
               // Clicking simply disperses/explodes them for fun
               if (mouse.clicking) {
                   const angleToMouse = Math.atan2(dy, dx);
                   this.vx += Math.cos(angleToMouse) * force * 2;
                   this.vy += Math.sin(angleToMouse) * force * 2;
               }
            } else {
                this.color = this.baseColor;
            }
        }
        
        // Natural Move
        this.vx += Math.cos(angle) * 0.02; // Reduced natural force so mouse is stronger
        this.vy += Math.sin(angle) * 0.02;
        
        // Dampening / Friction
        this.vx *= 0.96; 
        this.vy *= 0.96;
        
        this.x += this.vx * this.speedMod * 2;
        this.y += this.vy * this.speedMod * 2;
        
        // Wrap screen
        if (this.x < 0) this.x = width;
        else if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        else if (this.y > height) this.y = 0;
        
        // Store trails
        this.history.push({ x: this.x, y: this.y });
        if (this.history.length > 5) this.history.shift(); 
      }

      draw() {
         if (!ctx) return;
         ctx.beginPath();
         
         const speed = Math.sqrt(this.vx*this.vx + this.vy*this.vy);
         const alpha = Math.min(1, speed * 0.5 + 0.2) * (1 - this.age/this.lifeSpan);
         const size = Math.random() * 1.5 + 0.5; // Varied dot size

         // Draw Dot
         ctx.arc(this.x, this.y, size, 0, Math.PI * 2);
         
         const drawColor = this.color.replace('0.8', alpha.toString()).replace('0.5', alpha.toString());
         ctx.fillStyle = drawColor;
         ctx.fill();
         
         // Optional: Add subtle glow to fast moving particles
         if (speed > 1) {
             ctx.shadowBlur = 4;
             ctx.shadowColor = drawColor;
             // We need to re-fill to apply shadow (or render twice)
             // Simple hack: minimal impact
         } else {
             ctx.shadowBlur = 0;
         }
      }
    }

    const initParticles = () => {
        particles = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push(new Particle());
        }
    };

    const animate = () => {
        if (!ctx) return;
        
        // Fade out previous frame for Trails effect
        // Instead of clearRect, we fillRect with low opacity black
        ctx.fillStyle = "rgba(10, 10, 10, 0.1)"; 
        ctx.fillRect(0, 0, width, height);
        
        time += 0.005; // Flow speed
        
        for(let i=0; i<particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }
        
        requestAnimationFrame(animate);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    
    handleResize();
    const anim = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(anim);
    };
  }, []);

  return (
    <div className={cn("relative w-full h-full overflow-hidden bg-[#0a0a0a]", className)}>
        {/* Vignette */}
        <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_90%)] pointer-events-none" />
        
        <canvas 
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-auto"
        />
        
        <div className="relative z-20 w-full h-full pointer-events-none">
            {children}
        </div>
    </div>
  );
}
