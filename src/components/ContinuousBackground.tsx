"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ContinuousBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const glow1Ref = useRef<HTMLDivElement>(null);
  const glow2Ref = useRef<HTMLDivElement>(null);
  const glow3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      // Very subtle, organic vertical drift of ambient light fields on scroll
      if (glow1Ref.current) {
        gsap.to(glow1Ref.current, {
          y: 80,
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
          y: -100,
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
          y: 60,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.8,
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
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden w-full h-full select-none"
    >
      {/* =========================================================================
          CONTINUOUS HOMEPAGE TONAL PROGRESSION GRADIENT
          Orange Dimension (#FF5108) -> Amber -> Terracotta -> Warm Embers -> Signature Dark (#08090D)
          ========================================================================= */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background: `linear-gradient(
            to bottom,
            #FF5108 0%,
            #FF5108 5%,
            #F24800 10%,
            #D93B00 18%,
            #B52E00 28%,
            #7A1D00 40%,
            #4D1200 52%,
            #2B0A01 64%,
            #170601 76%,
            #0E0503 86%,
            #08090D 94%,
            #08090D 100%
          )`,
        }}
      />

      {/* =========================================================================
          ATMOSPHERIC AMBIENT ILLUMINATION FIELDS
          ========================================================================= */}
      {/* Ambient Glow 1: Top-Right Warm Amber Light Field (Services Area ~18%) */}
      <div
        ref={glow1Ref}
        className="absolute right-[-10%] top-[16%] w-[650px] sm:w-[850px] h-[650px] sm:h-[850px] rounded-full pointer-events-none opacity-40"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 120, 20, 0.28) 0%, rgba(255, 81, 8, 0.12) 45%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Ambient Glow 2: Mid-Left Warm Glow (Selected Work ~38%) */}
      <div
        ref={glow2Ref}
        className="absolute left-[-15%] top-[36%] w-[700px] sm:w-[900px] h-[700px] sm:h-[900px] rounded-full pointer-events-none opacity-35"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 81, 8, 0.22) 0%, rgba(200, 50, 0, 0.08) 50%, transparent 75%)",
          filter: "blur(90px)",
        }}
      />

      {/* Ambient Glow 3: Deep Warm Center Aura (Process & About Area ~62%) */}
      <div
        ref={glow3Ref}
        className="absolute left-[20%] top-[60%] w-[800px] h-[800px] rounded-full pointer-events-none opacity-25"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 81, 8, 0.16) 0%, rgba(255, 81, 8, 0.04) 50%, transparent 75%)",
          filter: "blur(85px)",
        }}
      />

      {/* Ambient Glow 4: Contact Aura (Bottom-Right ~88%) */}
      <div
        className="absolute right-[-5%] top-[86%] w-[600px] h-[600px] rounded-full pointer-events-none opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 81, 8, 0.18) 0%, rgba(255, 81, 8, 0.03) 50%, transparent 75%)",
          filter: "blur(70px)",
        }}
      />

      {/* =========================================================================
          SHARED ABSTRACT GEOMETRIC FORMS ACROSS THE JOURNEY
          ========================================================================= */}
      {/* Section 02/03 Geometry: Delicate Orbital Rings (near Services/Work) */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[900px] lg:w-[1200px] h-[900px] lg:h-[1200px] opacity-[0.06] pointer-events-none">
        <svg viewBox="0 0 1000 1000" fill="none" className="w-full h-full">
          <circle cx="500" cy="500" r="480" stroke="#08090D" strokeWidth="1" strokeDasharray="8 8" />
          <circle cx="500" cy="500" r="320" stroke="#08090D" strokeWidth="0.8" />
          <circle cx="500" cy="500" r="160" stroke="#08090D" strokeWidth="0.6" strokeDasharray="4 4" />
        </svg>
      </div>

      {/* Section 05 Geometry: Architectural Guide Lines (near Process/About) */}
      <div className="absolute top-[55%] left-0 right-0 h-[400px] opacity-[0.05] pointer-events-none flex justify-center">
        <svg viewBox="0 0 1400 400" fill="none" className="w-full max-w-[1400px]">
          <line x1="0" y1="200" x2="1400" y2="200" stroke="#FF5108" strokeWidth="1" strokeDasharray="6 6" />
          <line x1="200" y1="0" x2="1200" y2="400" stroke="#FF5108" strokeWidth="0.8" opacity="0.6" />
          <line x1="1200" y1="0" x2="200" y2="400" stroke="#FF5108" strokeWidth="0.8" opacity="0.6" />
        </svg>
      </div>

      {/* Section 07 Geometry: Subtle Brand Symbol Watermark (near Testimonials) */}
      <div className="absolute top-[78%] right-[8%] w-[380px] h-[380px] opacity-[0.035] pointer-events-none hidden lg:block">
        <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
          <circle cx="100" cy="100" r="90" stroke="#FF5108" strokeWidth="1.5" />
          <circle cx="100" cy="100" r="50" stroke="#FF5108" strokeWidth="1" strokeDasharray="6 6" />
          <circle cx="100" cy="100" r="15" fill="#FF5108" />
        </svg>
      </div>
    </div>
  );
}
