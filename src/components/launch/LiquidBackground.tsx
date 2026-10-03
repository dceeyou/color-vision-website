"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function LiquidBackground() {
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const blob3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    if (!isReduced) {
      // Slow ambient liquid movement
      gsap.to(blob1Ref.current, { rotation: 360, transformOrigin: "45% 55%", duration: 45, repeat: -1, ease: "none" });
      gsap.to(blob2Ref.current, { rotation: -360, transformOrigin: "55% 45%", duration: 55, repeat: -1, ease: "none" });
      gsap.to(blob3Ref.current, { rotation: 360, transformOrigin: "50% 50%", duration: 65, repeat: -1, ease: "none" });

      // Subtle Mouse parallax for liquid shifting
      const xTo1 = gsap.quickTo(blob1Ref.current, "x", { duration: 3, ease: "power2.out" });
      const yTo1 = gsap.quickTo(blob1Ref.current, "y", { duration: 3, ease: "power2.out" });
      
      const xTo3 = gsap.quickTo(blob3Ref.current, "x", { duration: 4, ease: "power2.out" });
      const yTo3 = gsap.quickTo(blob3Ref.current, "y", { duration: 4, ease: "power2.out" });

      const handleMouseMove = (e: MouseEvent) => {
        // Only active on desktop
        if (window.innerWidth < 768) return;

        const { clientX, clientY } = e;
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        
        const dx = (clientX - cx) * 0.15;
        const dy = (clientY - cy) * 0.15;

        xTo1(dx);
        yTo1(dy);
        xTo3(-dx * 0.5);
        yTo3(-dy * 0.5);
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#050608]">
      {/* SVG filter for organic liquid displacement */}
      <svg className="hidden">
        <defs>
          <filter id="liquify">
            <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="40" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {/* Liquid Container */}
      <div className="absolute inset-0 w-full h-full opacity-90" style={{ filter: "url(#liquify)" }}>
        <div className="absolute inset-0 blur-[80px]">
          
          {/* Very Dark charcoal blob */}
          <div ref={blob1Ref} className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] rounded-full mix-blend-screen bg-[radial-gradient(circle_at_center,_rgba(30,30,30,0.6)_0%,_transparent_60%)]" />
          
          {/* Darker base blob */}
          <div ref={blob2Ref} className="absolute top-[20%] left-[30%] w-[90vw] h-[90vw] rounded-full mix-blend-screen bg-[radial-gradient(circle_at_center,_rgba(10,10,10,0.9)_0%,_transparent_60%)]" />
          
          {/* Subtle orange warm glow */}
          <div ref={blob3Ref} className="absolute top-[30%] left-[10%] w-[70vw] h-[70vw] rounded-full mix-blend-screen bg-[radial-gradient(circle_at_center,_rgba(255,77,0,0.06)_0%,_transparent_60%)]" />
          
        </div>
      </div>
      
      {/* Texture Overlays */}
      <div className="tech-grid opacity-[0.1] absolute inset-0 mix-blend-overlay" />
      <div className="noise-overlay opacity-[0.04]" />
    </div>
  );
}
