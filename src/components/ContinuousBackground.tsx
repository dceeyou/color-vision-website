"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ContinuousBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const glow1Ref = useRef<HTMLDivElement>(null);
  const glow2Ref = useRef<HTMLDivElement>(null);
  const glow3Ref = useRef<HTMLDivElement>(null);
  const glow4Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      // Very subtle, organic vertical drift of ambient light fields on scroll
      if (glow1Ref.current) {
        gsap.to(glow1Ref.current, {
          y: 60,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.5,
          },
        });
      }

      if (glow2Ref.current) {
        gsap.to(glow2Ref.current, {
          y: -80,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 2,
          },
        });
      }

      if (glow3Ref.current) {
        gsap.to(glow3Ref.current, {
          y: 50,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.8,
          },
        });
      }

      if (glow4Ref.current) {
        gsap.to(glow4Ref.current, {
          y: -50,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.6,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden w-full h-full select-none bg-[#08090D]"
    >
      {/* =========================================================================
          GLOBAL ARCHITECTURAL GRID SYSTEM (Wezzi Inspiration)
          Precision structural column guidelines across the entire page
          ========================================================================= */}
      <div className="absolute inset-0 max-w-[1280px] mx-auto w-full h-full px-4 sm:px-6 lg:px-8">
        <div className="w-full h-full border-x border-white/[0.035] grid grid-cols-2 md:grid-cols-4 pointer-events-none">
          <div className="border-r border-white/[0.025] hidden sm:block h-full" />
          <div className="border-r border-white/[0.025] hidden md:block h-full" />
          <div className="border-r border-white/[0.025] hidden sm:block h-full" />
        </div>
      </div>

      {/* =========================================================================
          ATMOSPHERIC AMBIENT ILLUMINATION FIELDS ON DEEP BLACK (#08090D)
          ========================================================================= */}
      {/* Ambient Glow 1: Top-Right Warm Amber Light Field (Services Area ~18%) */}
      <div
        ref={glow1Ref}
        className="absolute right-[-10%] top-[16%] w-[650px] sm:w-[850px] h-[650px] sm:h-[850px] rounded-full pointer-events-none opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 122, 36, 0.28) 0%, rgba(255, 81, 8, 0.08) 45%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />

      {/* Ambient Glow 2: Mid-Left Warm Glow (Selected Work ~38%) */}
      <div
        ref={glow2Ref}
        className="absolute left-[-15%] top-[36%] w-[700px] sm:w-[900px] h-[700px] sm:h-[900px] rounded-full pointer-events-none opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 81, 8, 0.24) 0%, rgba(200, 50, 0, 0.06) 50%, transparent 75%)",
          filter: "blur(95px)",
        }}
      />

      {/* Ambient Glow 3: Deep Warm Center Aura (Process & About Area ~62%) */}
      <div
        ref={glow3Ref}
        className="absolute left-[20%] top-[60%] w-[800px] h-[800px] rounded-full pointer-events-none opacity-15"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 81, 8, 0.2) 0%, rgba(255, 81, 8, 0.03) 50%, transparent 75%)",
          filter: "blur(90px)",
        }}
      />

      {/* Ambient Glow 4: Contact Aura (Bottom-Right ~88%) */}
      <div
        ref={glow4Ref}
        className="absolute right-[-5%] top-[86%] w-[650px] h-[650px] rounded-full pointer-events-none opacity-18"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 81, 8, 0.22) 0%, rgba(255, 122, 36, 0.04) 50%, transparent 75%)",
          filter: "blur(85px)",
        }}
      />

      {/* Subtle fine technical grid intersection crosshairs */}
      <div className="absolute top-[28%] left-1/2 -translate-x-1/2 w-full max-w-[1280px] px-8 flex justify-between pointer-events-none opacity-25">
        <span className="text-[10px] font-mono text-white/30">+</span>
        <span className="text-[10px] font-mono text-white/30">+</span>
        <span className="text-[10px] font-mono text-white/30">+</span>
      </div>
      <div className="absolute top-[55%] left-1/2 -translate-x-1/2 w-full max-w-[1280px] px-8 flex justify-between pointer-events-none opacity-25">
        <span className="text-[10px] font-mono text-white/30">+</span>
        <span className="text-[10px] font-mono text-white/30">+</span>
        <span className="text-[10px] font-mono text-white/30">+</span>
      </div>
      <div className="absolute top-[82%] left-1/2 -translate-x-1/2 w-full max-w-[1280px] px-8 flex justify-between pointer-events-none opacity-25">
        <span className="text-[10px] font-mono text-white/30">+</span>
        <span className="text-[10px] font-mono text-white/30">+</span>
        <span className="text-[10px] font-mono text-white/30">+</span>
      </div>
    </div>
  );
}
