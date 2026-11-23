"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function HeroVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ring1Ref = useRef<SVGGElement>(null);
  const ring2Ref = useRef<SVGGElement>(null);
  const ring3Ref = useRef<SVGGElement>(null);

  useEffect(() => {
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) return;

    // Ultra-slow, silky rotations for the precision orbital rings
    const r1 = gsap.to(ring1Ref.current, {
      rotation: 360,
      transformOrigin: "center center",
      duration: 60,
      repeat: -1,
      ease: "none",
    });

    const r2 = gsap.to(ring2Ref.current, {
      rotation: -360,
      transformOrigin: "center center",
      duration: 80,
      repeat: -1,
      ease: "none",
    });

    const r3 = gsap.to(ring3Ref.current, {
      rotation: 360,
      transformOrigin: "center center",
      duration: 120,
      repeat: -1,
      ease: "none",
    });

    // Gentle vertical float for the entire visual structure
    const floatAnim = gsap.to(containerRef.current, {
      y: -8,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Subtle restrained mouse parallax
    const onMouseMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;

      gsap.to(containerRef.current, {
        x: dx * 10,
        y: dy * 10,
        duration: 1.4,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    return () => {
      r1.kill();
      r2.kill();
      r3.kill();
      floatAnim.kill();
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] md:w-[420px] md:h-[420px] lg:w-[500px] lg:h-[500px] xl:w-[540px] xl:h-[540px] aspect-square flex items-center justify-center select-none"
    >
      {/* Controlled, restrained ambient orange illumination */}
      <div className="absolute inset-0 bg-[#FF5108]/[0.08] blur-[70px] md:blur-[90px] rounded-full scale-90 pointer-events-none" />

      {/* Pure Vector SVG Geometric & Orbital System */}
      <svg
        viewBox="0 0 600 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10 overflow-visible"
        aria-hidden="true"
      >
        <defs>
          {/* Subtle gradient for primary orbital stroke */}
          <linearGradient id="orbitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF5108" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#FF5108" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#FF5108" stopOpacity="0.7" />
          </linearGradient>

          {/* Core radial gradient */}
          <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FF5108" stopOpacity="0.25" />
            <stop offset="70%" stopColor="#FF5108" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#08090D" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 1. Precision Crosshair Guide Lines (Swiss Technical Details) */}
        <g opacity="0.25">
          <line x1="300" y1="20" x2="300" y2="230" stroke="#F4F2ED" strokeWidth="0.75" />
          <line x1="300" y1="370" x2="300" y2="580" stroke="#F4F2ED" strokeWidth="0.75" />
          <line x1="20" y1="300" x2="230" y2="300" stroke="#F4F2ED" strokeWidth="0.75" />
          <line x1="370" y1="300" x2="580" y2="300" stroke="#F4F2ED" strokeWidth="0.75" />
          
          {/* Cardinal Axis Ticks */}
          <line x1="296" y1="50" x2="304" y2="50" stroke="#FF5108" strokeWidth="1" />
          <line x1="296" y1="550" x2="304" y2="550" stroke="#FF5108" strokeWidth="1" />
          <line x1="50" y1="296" x2="50" y2="304" stroke="#FF5108" strokeWidth="1" />
          <line x1="550" y1="296" x2="550" y2="304" stroke="#FF5108" strokeWidth="1" />
        </g>

        {/* 2. Static Concentric Frame Rings */}
        <circle cx="300" cy="300" r="280" stroke="#F4F2ED" strokeWidth="0.5" opacity="0.08" />
        <circle cx="300" cy="300" r="235" stroke="#F4F2ED" strokeWidth="0.5" opacity="0.12" />
        <circle cx="300" cy="300" r="105" stroke="#FF5108" strokeWidth="1" opacity="0.3" />

        {/* 3. Outer Rotating Orbital Ring 3 (Technical ticks & dots) */}
        <g ref={ring3Ref}>
          <circle
            cx="300"
            cy="300"
            r="260"
            stroke="#FF5108"
            strokeWidth="1"
            strokeDasharray="4 12"
            opacity="0.3"
          />
          {/* Orbital Satellite Node */}
          <circle cx="300" cy="40" r="3" fill="#F4F2ED" opacity="0.8" />
          <circle cx="300" cy="560" r="2.5" fill="#FF5108" />
        </g>

        {/* 4. Middle Counter-Rotating Orbital Ring 2 (Segmented Arcs) */}
        <g ref={ring2Ref}>
          <circle
            cx="300"
            cy="300"
            r="200"
            stroke="url(#orbitGrad)"
            strokeWidth="1.5"
            strokeDasharray="80 30 160 30 40 20"
            opacity="0.6"
          />
          {/* Precision Degree Ticks at 45-degree intervals */}
          <line x1="441" y1="159" x2="446" y2="154" stroke="#FF5108" strokeWidth="1.5" />
          <line x1="159" y1="441" x2="154" y2="446" stroke="#FF5108" strokeWidth="1.5" />
          <line x1="441" y1="441" x2="446" y2="446" stroke="#FF5108" strokeWidth="1.5" />
          <line x1="159" y1="159" x2="154" y2="154" stroke="#FF5108" strokeWidth="1.5" />
        </g>

        {/* 5. Inner Rotating Orbital Ring 1 (Dense Studio Orbit) */}
        <g ref={ring1Ref}>
          <circle
            cx="300"
            cy="300"
            r="150"
            stroke="#FF5108"
            strokeWidth="1.2"
            strokeDasharray="120 40 90 30"
            opacity="0.7"
          />
          <circle cx="450" cy="300" r="3.5" fill="#FF5108" />
          <circle cx="150" cy="300" r="2.5" fill="#F4F2ED" opacity="0.9" />
        </g>

        {/* 6. Central Brand Core Radial Glow Disk */}
        <circle cx="300" cy="300" r="90" fill="url(#coreGlow)" />
        <circle cx="300" cy="300" r="72" stroke="#FF5108" strokeWidth="1.5" opacity="0.45" />
      </svg>

      {/* Central Color Vision Brand Mark Symbol */}
      <div className="absolute z-20 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center pointer-events-none">
        <Image
          src="/icon-192.png"
          alt="Color Vision Brand Mark"
          width={96}
          height={96}
          className="w-full h-full object-contain filter drop-shadow-[0_0_16px_rgba(255,81,8,0.4)]"
          priority
        />
      </div>
    </div>
  );
}
