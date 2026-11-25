"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroContent } from "@/lib/wordpress/types";

interface HeroProps {
  hero?: HeroContent;
}

export default function Hero({ hero }: HeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const artworkRef = useRef<HTMLDivElement>(null);
  const ambientFieldRef = useRef<HTMLDivElement>(null);
  const mouseLightRef = useRef<HTMLDivElement>(null);
  const ribbonStream1Ref = useRef<SVGGElement>(null);
  const ribbonStream2Ref = useRef<SVGGElement>(null);
  const ribbonFilamentsRef = useRef<SVGGElement>(null);

  // Content Refs for sequential kinetic typography entrance
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const line3Ref = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const btnsRef = useRef<HTMLDivElement>(null);
  const scrollIndRef = useRef<HTMLDivElement>(null);

  // Smooth scroll handler for anchor targets
  const scrollToAnchor = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      const headerOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Smooth scroll down to explore next section
  const handleScrollDown = () => {
    const nextSection =
      document.getElementById("work") ||
      document.getElementById("services") ||
      document.querySelector("main > section:nth-of-type(2)");
    if (nextSection) {
      const headerOffset = 80;
      const elementPosition = nextSection.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const isReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const revealElements = [
      eyebrowRef.current,
      line1Ref.current,
      line2Ref.current,
      line3Ref.current,
      descRef.current,
      btnsRef.current,
      scrollIndRef.current,
    ];

    if (isReduced) {
      gsap.set(revealElements, { opacity: 1, y: 0, yPercent: 0, rotate: 0 });
      if (ambientFieldRef.current) gsap.set(ambientFieldRef.current, { opacity: 1 });
      if (artworkRef.current) gsap.set(artworkRef.current, { opacity: 1 });
      return;
    }

    // =========================================================================
    // 1. KINETIC TYPOGRAPHY ENTRANCE SEQUENCE
    // =========================================================================
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Initial states
    gsap.set(
      [eyebrowRef.current, descRef.current, btnsRef.current, scrollIndRef.current],
      { opacity: 0 }
    );
    gsap.set([line1Ref.current, line2Ref.current, line3Ref.current], {
      yPercent: 115,
      opacity: 0,
    });
    if (ambientFieldRef.current) gsap.set(ambientFieldRef.current, { opacity: 0 });
    if (artworkRef.current) gsap.set(artworkRef.current, { opacity: 0, scale: 0.94 });

    tl
      // Flowing orange artwork & ambient warmth fade in
      .fromTo(
        artworkRef.current,
        { opacity: 0, scale: 0.94 },
        { opacity: 1, scale: 1, duration: 1.4, ease: "power2.out" },
        0.05
      )
      .fromTo(
        ambientFieldRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: "power2.out" },
        0.1
      )
      // Stage 01: Eyebrow badge fades and lifts
      .fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.65 },
        0.18
      )
      // Stage 02: "WE TRANSFORM" smooth vertical clipping reveal
      .fromTo(
        line1Ref.current,
        { yPercent: 115, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.9, ease: "power4.out" },
        0.26
      )
      // Stage 03: "IDEAS INTO" vertical clipping with slight stagger
      .fromTo(
        line2Ref.current,
        { yPercent: 115, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.9, ease: "power4.out" },
        0.4
      )
      // Stage 04: "EXPERIENCES." expressive italic typography reveal
      .fromTo(
        line3Ref.current,
        { yPercent: 115, opacity: 0, rotate: 1.5 },
        { yPercent: 0, opacity: 1, rotate: 0, duration: 0.95, ease: "power3.out" },
        0.54
      )
      // Stage 05: Supporting studio description fades in
      .fromTo(
        descRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.7 },
        0.75
      )
      // Stage 06: CTA buttons appear with subtle upward transition
      .fromTo(
        btnsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7 },
        0.9
      )
      // Stage 07: Scroll indicator reveal
      .fromTo(
        scrollIndRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.65 },
        1.05
      );

    // =========================================================================
    // 2. CONTINUOUS ORGANIC BREATHING WAVE MOTION (Outpace Inspiration)
    // =========================================================================
    const waveAnim1 = gsap.to(ribbonStream1Ref.current, {
      y: 18,
      x: -12,
      rotation: 1.2,
      transformOrigin: "center center",
      duration: 7,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    const waveAnim2 = gsap.to(ribbonStream2Ref.current, {
      y: -22,
      x: 16,
      rotation: -1.5,
      transformOrigin: "center center",
      duration: 8.5,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    const filamentsAnim = gsap.to(ribbonFilamentsRef.current, {
      y: 12,
      x: -8,
      duration: 6,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    // =========================================================================
    // 3. CINEMATIC SCROLL PARALLAX (40–80px Spatial Travel)
    // =========================================================================
    let scrollTriggerInstance: ScrollTrigger | null = null;
    if (artworkRef.current && containerRef.current) {
      scrollTriggerInstance = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.2,
        onUpdate: (self) => {
          if (artworkRef.current) {
            gsap.set(artworkRef.current, {
              y: self.progress * 75,
              opacity: 1 - self.progress * 0.45,
            });
          }
        },
      });
    }

    // =========================================================================
    // 4. DESKTOP CURSOR INTERACTION (Restrained Spatial Depth)
    // =========================================================================
    const container = containerRef.current;
    const mouseLight = mouseLightRef.current;
    const artwork = artworkRef.current;
    const line1 = line1Ref.current;
    const line2 = line2Ref.current;
    const line3 = line3Ref.current;

    const hasFinePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;

    let cleanupMouse: (() => void) | null = null;

    if (container && hasFinePointer) {
      const lightX = mouseLight ? gsap.quickTo(mouseLight, "x", { duration: 0.9, ease: "power2.out" }) : null;
      const lightY = mouseLight ? gsap.quickTo(mouseLight, "y", { duration: 0.9, ease: "power2.out" }) : null;

      const artTiltX = artwork ? gsap.quickTo(artwork, "rotateY", { duration: 1.4, ease: "power2.out" }) : null;
      const artTiltY = artwork ? gsap.quickTo(artwork, "rotateX", { duration: 1.4, ease: "power2.out" }) : null;

      const t1X = line1 ? gsap.quickTo(line1, "x", { duration: 0.8, ease: "power2.out" }) : null;
      const t1Y = line1 ? gsap.quickTo(line1, "y", { duration: 0.8, ease: "power2.out" }) : null;
      const t2X = line2 ? gsap.quickTo(line2, "x", { duration: 0.85, ease: "power2.out" }) : null;
      const t2Y = line2 ? gsap.quickTo(line2, "y", { duration: 0.85, ease: "power2.out" }) : null;
      const t3X = line3 ? gsap.quickTo(line3, "x", { duration: 0.9, ease: "power2.out" }) : null;
      const t3Y = line3 ? gsap.quickTo(line3, "y", { duration: 0.9, ease: "power2.out" }) : null;

      const handleMouseMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const normX = (mouseX / rect.width - 0.5) * 2;
        const normY = (mouseY / rect.height - 0.5) * 2;

        if (lightX && lightY && mouseLight) {
          lightX(mouseX);
          lightY(mouseY);
          gsap.to(mouseLight, { opacity: 0.45, duration: 0.4 });
        }

        if (artTiltX && artTiltY) {
          artTiltX(normX * 6);
          artTiltY(-normY * 5);
        }

        // Kinetic typography micro-displacement (subtle 2–3px)
        if (t1X && t1Y) {
          t1X(normX * 2.5);
          t1Y(normY * 2.0);
        }
        if (t2X && t2Y) {
          t2X(normX * -2.2);
          t2Y(normY * 2.5);
        }
        if (t3X && t3Y) {
          t3X(normX * 3.0);
          t3Y(normY * -2.0);
        }
      };

      const handleMouseLeave = () => {
        if (mouseLight) gsap.to(mouseLight, { opacity: 0, duration: 0.6 });
        if (artTiltX && artTiltY) {
          artTiltX(0);
          artTiltY(0);
        }
        if (t1X && t1Y) {
          t1X(0);
          t1Y(0);
        }
        if (t2X && t2Y) {
          t2X(0);
          t2Y(0);
        }
        if (t3X && t3Y) {
          t3X(0);
          t3Y(0);
        }
      };

      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);

      cleanupMouse = () => {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    }

    return () => {
      tl.kill();
      waveAnim1.kill();
      waveAnim2.kill();
      filamentsAnim.kill();
      if (scrollTriggerInstance) scrollTriggerInstance.kill();
      if (cleanupMouse) cleanupMouse();
    };
  }, []);

  const eyebrowText =
    hero?.eyebrow || "INDEPENDENT DESIGN STUDIO · SRI LANKA";
  const descriptionText =
    "Strategy, creativity and thoughtful design come together to shape distinctive brands, intuitive digital products and meaningful digital experiences.";
  const primaryText = (hero?.primaryCtaLabel || "VIEW OUR WORK").replace("→", "").trim();
  const secondaryText = (hero?.secondaryCtaLabel || "START A PROJECT").replace("→", "").trim();

  return (
    <section
      ref={containerRef}
      id="hero"
      aria-label="Color Vision Hero: Flowing Orange Light & Kinetic Typography"
      className="relative w-full min-h-[100svh] bg-[#08090D] text-[#F4F2ED] flex flex-col justify-between items-center overflow-hidden pt-28 sm:pt-32 md:pt-36 pb-8 sm:pb-10 select-none"
      style={{ perspective: "1000px" }}
    >
      {/* =========================================================================
          ARCHITECTURAL GRID LINES & TECHNICAL ANNOTATIONS (Wezzi-style)
          ========================================================================= */}
      <div
        className="absolute inset-0 max-w-[1280px] mx-auto pointer-events-none z-0 px-4 sm:px-6 lg:px-8"
        aria-hidden="true"
      >
        <div className="w-full h-full border-x border-white/[0.04] grid grid-cols-2 md:grid-cols-4">
          <div className="border-r border-white/[0.03] hidden sm:block h-full" />
          <div className="border-r border-white/[0.03] hidden md:block h-full" />
          <div className="border-r border-white/[0.03] hidden sm:block h-full" />
        </div>

        {/* Studio Technical Markers */}
        <div className="absolute top-28 left-6 sm:left-10 text-[10px] font-mono tracking-[0.25em] text-white/25 uppercase">
          COLOR VISION // CV-SYS.01
        </div>
        <div className="absolute top-28 right-6 sm:right-10 text-[10px] font-mono tracking-[0.25em] text-white/25 uppercase hidden sm:block">
          07°00&apos;N · 80°00&apos;E
        </div>
        <div className="absolute bottom-28 left-6 sm:left-10 text-[10px] font-mono tracking-[0.22em] text-white/20 uppercase hidden md:block">
          STUDIO // EXPERIENCES
        </div>
        <div className="absolute bottom-28 right-6 sm:right-10 text-[10px] font-mono tracking-[0.22em] text-white/20 uppercase hidden md:block">
          EST. SRI LANKA
        </div>
      </div>

      {/* =========================================================================
          ATMOSPHERIC BACKGLOW FIELDS
          ========================================================================= */}
      <div
        ref={ambientFieldRef}
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
        aria-hidden="true"
      >
        {/* Core luminous orange atmospheric aura */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[950px] lg:w-[1200px] h-[550px] sm:h-[700px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(255, 81, 8, 0.22) 0%, rgba(255, 122, 36, 0.08) 45%, transparent 72%)",
            filter: "blur(90px)",
          }}
        />

        {/* Top-Right warm amber bloom */}
        <div
          className="absolute -top-24 right-[-5%] w-[550px] sm:w-[700px] h-[550px] sm:h-[700px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(255, 122, 36, 0.16) 0%, rgba(255, 81, 8, 0.04) 50%, transparent 75%)",
            filter: "blur(80px)",
          }}
        />

        {/* Bottom-Left deep terracotta warmth */}
        <div
          className="absolute -bottom-24 left-[-8%] w-[500px] sm:w-[650px] h-[500px] sm:h-[650px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(181, 46, 0, 0.14) 0%, rgba(82, 19, 0, 0.04) 50%, transparent 75%)",
            filter: "blur(75px)",
          }}
        />
      </div>

      {/* =========================================================================
          SIGNATURE FLOWING ORANGE LIGHT RIBBON ARTWORK (Outpace Inspiration)
          Silk-like 3D curved light waves in deep space
          ========================================================================= */}
      <div
        ref={artworkRef}
        className="absolute inset-0 pointer-events-none z-[1] flex items-center justify-center overflow-hidden will-change-transform"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1600 1000"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full min-w-[1200px] max-w-[2000px] scale-110 lg:scale-100 opacity-90"
        >
          <defs>
            {/* Ribbon Gradient 1: Deep Crimson to Radiant Orange to Amber */}
            <linearGradient id="ribbonGrad1" x1="120" y1="800" x2="1480" y2="200" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#450A00" stopOpacity="0" />
              <stop offset="18%" stopColor="#8A1C00" stopOpacity="0.5" />
              <stop offset="38%" stopColor="#FF5108" stopOpacity="0.85" />
              <stop offset="55%" stopColor="#FF7A24" stopOpacity="0.95" />
              <stop offset="72%" stopColor="#FFA448" stopOpacity="0.8" />
              <stop offset="88%" stopColor="#FF5108" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#450A00" stopOpacity="0" />
            </linearGradient>

            {/* Ribbon Gradient 2: Luminous Inner Flow with Golden Highlights */}
            <linearGradient id="ribbonGrad2" x1="200" y1="250" x2="1400" y2="780" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FF7A24" stopOpacity="0" />
              <stop offset="22%" stopColor="#FF5108" stopOpacity="0.75" />
              <stop offset="48%" stopColor="#FFB366" stopOpacity="0.92" />
              <stop offset="68%" stopColor="#FF5108" stopOpacity="0.8" />
              <stop offset="85%" stopColor="#B52E00" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#300700" stopOpacity="0" />
            </linearGradient>

            {/* Ribbon Gradient 3: Soft Ambient Underside Wave */}
            <linearGradient id="ribbonGrad3" x1="300" y1="700" x2="1300" y2="350" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FF5108" stopOpacity="0" />
              <stop offset="30%" stopColor="#FF5108" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#FF7A24" stopOpacity="0.65" />
              <stop offset="70%" stopColor="#FF3800" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#FF5108" stopOpacity="0" />
            </linearGradient>

            {/* Specular Edge Gradient 1: Radiant Sharp Crest Highlight */}
            <linearGradient id="specularEdgeGrad1" x1="150" y1="750" x2="1450" y2="220" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFD8B3" stopOpacity="0" />
              <stop offset="30%" stopColor="#FFF2E5" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="70%" stopColor="#FFA552" stopOpacity="0.85" />
              <stop offset="90%" stopColor="#FF5108" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#FF5108" stopOpacity="0" />
            </linearGradient>

            {/* Specular Edge Gradient 2: Secondary Light Filament */}
            <linearGradient id="specularEdgeGrad2" x1="250" y1="280" x2="1350" y2="760" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FF8B2B" stopOpacity="0" />
              <stop offset="25%" stopColor="#FFD39B" stopOpacity="0.8" />
              <stop offset="52%" stopColor="#FFF5EB" stopOpacity="0.95" />
              <stop offset="75%" stopColor="#FF7A24" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#FF5108" stopOpacity="0" />
            </linearGradient>

            {/* Gaussian Blur Glow Filter */}
            <filter id="artworkGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="softDiffusion" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="22" result="diffusion" />
              <feMerge>
                <feMergeNode in="diffusion" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* LAYER 1: Deep Diffuse Light Mass (Soft Underglow) */}
          <g filter="url(#softDiffusion)" opacity="0.65">
            <path
              d="M 100,720 C 350,850 580,680 820,540 C 1060,400 1300,420 1550,260 L 1550,380 C 1300,560 1060,540 820,680 C 580,820 350,960 100,840 Z"
              fill="url(#ribbonGrad3)"
            />
          </g>

          {/* LAYER 2: Primary Organic Ribbon Stream (Main Sweeping S-Curve) */}
          <g ref={ribbonStream1Ref} filter="url(#artworkGlow)">
            {/* Ribbon Body */}
            <path
              d="M 80,760 C 320,860 520,640 760,510 C 1020,370 1280,410 1520,240 C 1460,320 1220,490 980,620 C 740,750 480,940 80,850 Z"
              fill="url(#ribbonGrad1)"
              opacity="0.88"
            />
            {/* Primary Specular Edge Filament */}
            <path
              d="M 80,760 C 320,860 520,640 760,510 C 1020,370 1280,410 1520,240"
              stroke="url(#specularEdgeGrad1)"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            {/* Parallel Fine Energy Trace */}
            <path
              d="M 120,775 C 340,865 530,655 770,525 C 1030,385 1270,420 1490,265"
              stroke="url(#specularEdgeGrad1)"
              strokeWidth="1.0"
              strokeDasharray="8 6"
              opacity="0.65"
            />
          </g>

          {/* LAYER 3: Intersecting Helical Light Ribbon (Counter Flow) */}
          <g ref={ribbonStream2Ref} filter="url(#artworkGlow)">
            {/* Twisted Ribbon Body */}
            <path
              d="M 160,320 C 420,240 680,420 900,580 C 1140,750 1340,680 1540,740 C 1360,650 1160,700 940,540 C 720,380 460,200 160,280 Z"
              fill="url(#ribbonGrad2)"
              opacity="0.82"
            />
            {/* Specular Ridge Line */}
            <path
              d="M 160,320 C 420,240 680,420 900,580 C 1140,750 1340,680 1540,740"
              stroke="url(#specularEdgeGrad2)"
              strokeWidth="2.0"
              strokeLinecap="round"
            />
            {/* Ambient Secondary Edge */}
            <path
              d="M 160,280 C 460,200 720,380 940,540 C 1160,700 1360,650 1540,740"
              stroke="rgba(255, 122, 36, 0.45)"
              strokeWidth="1.2"
              strokeDasharray="4 8"
            />
          </g>

          {/* LAYER 4: Radiant Specular Filaments & Floating Light Orbs */}
          <g ref={ribbonFilamentsRef}>
            {/* Center Focal Intersection Highlight Pulse */}
            <circle cx="830" cy="545" r="3.5" fill="#FFFFFF" filter="url(#artworkGlow)" />
            <circle cx="830" cy="545" r="1.5" fill="#FF7A24" />
            <circle cx="680" cy="460" r="2.5" fill="#FFF5EB" opacity="0.85" />
            <circle cx="1010" cy="590" r="3.0" fill="#FFD39B" opacity="0.8" />
            <circle cx="1180" cy="420" r="2.0" fill="#FFFFFF" opacity="0.9" />

            {/* Delicate Wave Lines in Deep Perspective */}
            <path
              d="M 240,680 C 480,760 660,560 880,470 C 1100,380 1320,440 1460,330"
              stroke="rgba(255, 164, 72, 0.35)"
              strokeWidth="0.8"
              strokeDasharray="6 6"
            />
            <path
              d="M 300,380 C 520,330 740,460 920,590 C 1100,720 1260,670 1420,700"
              stroke="rgba(255, 81, 8, 0.3)"
              strokeWidth="0.8"
            />
          </g>
        </svg>
      </div>

      {/* Interactive mouse-following soft light field (fine pointer desktop only) */}
      <div
        ref={mouseLightRef}
        className="absolute top-0 left-0 w-[480px] h-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none opacity-0 z-[2] transition-opacity duration-500 hidden md:block"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 122, 36, 0.22) 0%, rgba(255, 81, 8, 0.05) 45%, transparent 70%)",
          filter: "blur(50px)",
        }}
        aria-hidden="true"
      />

      {/* =========================================================================
          HERO EDITORIAL CONTENT & KINETIC TYPOGRAPHY
          ========================================================================= */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center my-auto">
        {/* 1. Small Studio Identification Label / Eyebrow */}
        <div
          ref={eyebrowRef}
          className="opacity-0 mb-6 sm:mb-8 flex items-center justify-center gap-2.5 px-4 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.035] backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
        >
          <span
            className="w-1.5 h-1.5 rounded-full bg-[#FF5108] inline-block shadow-[0_0_10px_#FF5108] animate-pulse"
            aria-hidden="true"
          />
          <span className="uppercase tracking-[0.24em] text-[11px] sm:text-[12px] md:text-[13px] font-[600] text-[#92939B]">
            {eyebrowText}
          </span>
        </div>

        {/* 2. Large Expressive Three-Line Headline Composition */}
        <h1 className="relative w-full max-w-[1240px] mx-auto flex flex-col items-center justify-center select-none">
          {/* LINE 01: WE TRANSFORM (Manrope Bold, Warm White) */}
          <div className="overflow-hidden py-1">
            <span
              ref={line1Ref}
              className="block will-change-transform font-[800] text-[#F4F2ED] uppercase tracking-[-0.035em] leading-[0.94] text-[44px] sm:text-[64px] md:text-[84px] lg:text-[104px] xl:text-[120px] drop-shadow-[0_4px_30px_rgba(0,0,0,0.6)]"
            >
              WE TRANSFORM
            </span>
          </div>

          {/* LINE 02: IDEAS INTO (Manrope Bold, Warm White) */}
          <div className="overflow-hidden py-1 -mt-1 sm:-mt-2 md:-mt-3">
            <span
              ref={line2Ref}
              className="block will-change-transform font-[800] text-[#F4F2ED] uppercase tracking-[-0.035em] leading-[0.94] text-[44px] sm:text-[64px] md:text-[84px] lg:text-[104px] xl:text-[120px] drop-shadow-[0_4px_30px_rgba(0,0,0,0.6)]"
            >
              IDEAS INTO
            </span>
          </div>

          {/* LINE 03: EXPERIENCES. (Instrument Serif Italic, Glowing Signature Orange) */}
          <div className="overflow-hidden py-1 -mt-1 sm:-mt-2 md:-mt-3">
            <span
              ref={line3Ref}
              className="block will-change-transform font-instrument italic font-[400] md:font-[500] text-[#FF5108] tracking-[-0.02em] leading-[0.96] text-[48px] sm:text-[72px] md:text-[94px] lg:text-[118px] xl:text-[136px] drop-shadow-[0_0_35px_rgba(255,81,8,0.45)]"
            >
              EXPERIENCES.
            </span>
          </div>
        </h1>

        {/* 3. Supporting Studio Description */}
        <p
          ref={descRef}
          className="opacity-0 text-[#92939B] text-[15px] sm:text-[16px] md:text-[17px] leading-[1.65] font-[400] max-w-[520px] mx-auto mt-5 sm:mt-6 md:mt-7 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
        >
          {descriptionText}
        </p>

        {/* 4. Call to Action Buttons */}
        <div
          ref={btnsRef}
          className="opacity-0 mt-7 sm:mt-8 md:mt-9 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto"
        >
          {/* Primary CTA: Glowing Studio Orange with Deep Black Text */}
          <a
            href="#work"
            onClick={(e) => scrollToAnchor(e, "work")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#FF5108] text-[#08090D] border border-[#FF5108] px-7 sm:px-8 py-3.5 sm:py-4 font-[700] uppercase tracking-[0.1em] text-[12px] sm:text-[13px] rounded-full hover:bg-[#FF7A24] hover:shadow-[0_0_30px_rgba(255,81,8,0.45)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#FF5108]"
          >
            <span>{primaryText}</span>
            <span
              className="transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            >
              →
            </span>
          </a>

          {/* Secondary CTA: Sleek Glass Surface with White/Orange Hover Border */}
          <a
            href="#contact"
            onClick={(e) => scrollToAnchor(e, "contact")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-white/[0.035] backdrop-blur-md text-[#F4F2ED] border border-white/[0.14] px-7 sm:px-8 py-3.5 sm:py-4 font-[700] uppercase tracking-[0.1em] text-[12px] sm:text-[13px] rounded-full hover:border-[#FF5108] hover:text-white hover:bg-white/[0.07] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#FF5108]"
          >
            <span>{secondaryText}</span>
            <span
              className="transition-transform duration-300 group-hover:translate-x-1 text-[#FF5108]"
              aria-hidden="true"
            >
              →
            </span>
          </a>
        </div>
      </div>

      {/* =========================================================================
          5. MINIMAL SCROLL INDICATOR
          ========================================================================= */}
      <div
        ref={scrollIndRef}
        onClick={handleScrollDown}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleScrollDown();
          }
        }}
        aria-label="Scroll down to explore work"
        className="relative z-10 mt-6 sm:mt-8 flex flex-col items-center gap-2 cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5108] rounded-md px-3 py-1"
      >
        <span className="text-[11px] sm:text-[12px] font-[600] tracking-[0.24em] text-[#92939B] uppercase group-hover:text-[#F4F2ED] transition-colors duration-300">
          SCROLL TO EXPLORE
        </span>
        <div className="w-[1.5px] h-6 bg-white/20 relative overflow-hidden rounded-full">
          <div className="absolute inset-0 bg-[#FF5108] animate-scroll-line" />
        </div>
      </div>
    </section>
  );
}
