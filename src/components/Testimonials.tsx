"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Testimonials() {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width/2;
    const y = e.clientY - rect.top - rect.height/2;
    
    gsap.to(cardRef.current, {
      x: x * 0.05,
      y: y * 0.05,
      rotationX: -y * 0.02,
      rotationY: x * 0.02,
      duration: 1,
      ease: "power2.out",
      transformPerspective: 1000
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      x: 0,
      y: 0,
      rotationX: 0,
      rotationY: 0,
      duration: 1.5,
      ease: "power3.out"
    });
  };

  return (
    <section className="px-6 md:px-12 py-32 flex flex-col md:flex-row gap-16 items-center">
      <div className="md:w-1/2">
        <p className="text-accent uppercase tracking-widest text-xs font-bold mb-4">Testimonials</p>
        <h2 className="text-5xl md:text-7xl font-bold leading-tight">
          What our<br/>
          <span className="text-accent">clients say.</span>
        </h2>
      </div>

      <div className="md:w-1/2 flex justify-center w-full perspective-1000">
        <div 
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="group relative w-full max-w-lg p-10 bg-white/[0.02] border border-white/10 rounded-2xl backdrop-blur-xl hover:border-accent/50 hover:bg-white/[0.04] transition-colors duration-500"
        >
          {/* Subtle Glow */}
          <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 rounded-2xl transition-colors duration-500 blur-2xl pointer-events-none" />
          
          <div className="text-6xl text-accent/30 font-serif leading-none absolute top-6 left-6 group-hover:-translate-y-2 group-hover:text-accent/60 transition-all duration-300">&quot;</div>
          
          <p className="relative z-10 text-xl md:text-2xl font-medium leading-relaxed mt-6 mb-10 text-foreground">
            Color Vision entirely transformed our digital presence. Their meticulous attention to detail and deep understanding of our strategic goals resulted in a platform that truly matters.
          </p>
          
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-12 h-12 rounded-full bg-border-light overflow-hidden">
               {/* Avatar placeholder */}
            </div>
            <div>
              <p className="font-bold">Sarah Jenkins</p>
              <p className="text-muted text-sm">CMO, Aura FinTech</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
