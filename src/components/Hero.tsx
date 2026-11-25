"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { HeroContent } from "@/lib/wordpress/types";

interface HeroProps {
  hero?: HeroContent;
}

export default function Hero({ hero }: HeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const ambientFieldRef = useRef<HTMLDivElement>(null);
  const mouseLightRef = useRef<HTMLDivElement>(null);
  const bgGeoLayer1Ref = useRef<HTMLDivElement>(null);
  const bgGeoLayer2Ref = useRef<HTMLDivElement>(null);

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
      return;
    }

    // =========================================================================
    // 1. KINETIC TYPOGRAPHY ENTRANCE SEQUENCE (1.2–1.6s confident studio timing)
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

    tl
      // Ambient atmospheric warmth fades in
      .fromTo(
        ambientFieldRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: "power2.out" },
        0.05
      )
      // Stage 01: Eyebrow badge fades and lifts
      .fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.65 },
        0.12
      )
      // Stage 02: "WE TRANSFORM" smooth vertical clipping reveal
      .fromTo(
        line1Ref.current,
        { yPercent: 115, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.9, ease: "power4.out" },
        0.22
      )
      // Stage 03: "IDEAS INTO" vertical clipping with slight stagger
      .fromTo(
        line2Ref.current,
        { yPercent: 115, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.9, ease: "power4.out" },
        0.36
      )
      // Stage 04: "EXPERIENCES." expressive italic typography reveal
      .fromTo(
        line3Ref.current,
        { yPercent: 115, opacity: 0, rotate: 1.5 },
        { yPercent: 0, opacity: 1, rotate: 0, duration: 0.95, ease: "power3.out" },
        0.5
      )
      // Stage 05: Supporting studio description fades in
      .fromTo(
        descRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.7 },
        0.72
      )
      // Stage 06: CTA buttons appear with subtle upward transition
      .fromTo(
        btnsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7 },
        0.88
      )
      // Scroll indicator reveal
      .fromTo(
        scrollIndRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.65 },
        1.05
      );

    // =========================================================================
    // 2. ORANGE DIMENSION & TYPOGRAPHY CURSOR INTERACTION (Fine Pointer Desktop)
    // =========================================================================
    const container = containerRef.current;
    const mouseLight = mouseLightRef.current;
    const geoLayer1 = bgGeoLayer1Ref.current;
    const geoLayer2 = bgGeoLayer2Ref.current;
    const line1 = line1Ref.current;
    const line2 = line2Ref.current;
    const line3 = line3Ref.current;

    const hasFinePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;

    if (container && hasFinePointer) {
      // Light field quickTo
      const lightX = mouseLight ? gsap.quickTo(mouseLight, "x", { duration: 0.9, ease: "power2.out" }) : null;
      const lightY = mouseLight ? gsap.quickTo(mouseLight, "y", { duration: 0.9, ease: "power2.out" }) : null;

      // Parallax geometry quickTo
      const geo1X = geoLayer1 ? gsap.quickTo(geoLayer1, "x", { duration: 1.2, ease: "power2.out" }) : null;
      const geo1Y = geoLayer1 ? gsap.quickTo(geoLayer1, "y", { duration: 1.2, ease: "power2.out" }) : null;
      const geo2X = geoLayer2 ? gsap.quickTo(geoLayer2, "x", { duration: 1.5, ease: "power2.out" }) : null;
      const geo2Y = geoLayer2 ? gsap.quickTo(geoLayer2, "y", { duration: 1.5, ease: "power2.out" }) : null;

      // Restrained typography displacement quickTo (max 3-4px)
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

        // Normalized relative to center (-1 to 1)
        const normX = (mouseX / rect.width - 0.5) * 2;
        const normY = (mouseY / rect.height - 0.5) * 2;

        if (lightX && lightY && mouseLight) {
          lightX(mouseX);
          lightY(mouseY);
          gsap.to(mouseLight, { opacity: 0.75, duration: 0.4 });
        }

        // Geometric layers subtle parallax
        if (geo1X && geo1Y) {
          geo1X(normX * 12);
          geo1Y(normY * 10);
        }
        if (geo2X && geo2Y) {
          geo2X(normX * -18);
          geo2Y(normY * -14);
        }

        // Kinetic typography micro-displacement (strictly 2–4px)
        if (t1X && t1Y) {
          t1X(normX * 3.0);
          t1Y(normY * 2.5);
        }
        if (t2X && t2Y) {
          t2X(normX * -2.8);
          t2Y(normY * 3.0);
        }
        if (t3X && t3Y) {
          t3X(normX * 3.5);
          t3Y(normY * -2.5);
        }
      };

      const handleMouseLeave = () => {
        if (mouseLight) gsap.to(mouseLight, { opacity: 0, duration: 0.6 });
        if (geo1X && geo1Y) {
          geo1X(0);
          geo1Y(0);
        }
        if (geo2X && geo2Y) {
          geo2X(0);
          geo2Y(0);
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

      return () => {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
        tl.kill();
      };
    }

    return () => {
      tl.kill();
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
      aria-label="Color Vision Hero: Orange Dimension × Kinetic Typography"
      className="relative w-full min-h-[100svh] bg-[#FF5108] text-[#08090D] flex flex-col justify-between items-center overflow-hidden pt-28 sm:pt-32 md:pt-36 pb-6 sm:pb-8 select-none"
    >
      {/* =========================================================================
          ORANGE DIMENSION: BACKGROUND VISUAL SYSTEM
          ========================================================================= */}
      <div
        ref={ambientFieldRef}
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
        aria-hidden="true"
      >
        {/* Rich atmospheric illumination gradient across the orange canvas */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 90% 70% at 50% 32%, #FF621E 0%, #FF5108 55%, #E84600 100%)",
          }}
        />

        {/* Soft atmospheric top-right highlight */}
        <div
          className="absolute -top-32 -right-24 w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.03) 45%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />

        {/* Soft atmospheric bottom-left warmth */}
        <div
          className="absolute -bottom-24 -left-20 w-[540px] h-[540px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(0, 0, 0, 0.12) 0%, rgba(0, 0, 0, 0.03) 50%, transparent 75%)",
            filter: "blur(50px)",
          }}
        />

        {/* GEOMETRIC LAYER 1: Technical coordinates & subtle circular grid */}
        <div
          ref={bgGeoLayer1Ref}
          className="absolute inset-0 flex items-center justify-center transition-transform duration-300 pointer-events-none"
        >
          {/* Studio Watermark & Technical Identifiers */}
          <div className="absolute top-28 left-6 sm:left-12 lg:left-20 text-[10px] font-mono tracking-[0.25em] text-[#08090D]/35 uppercase">
            ORANGE DIMENSION // CV-SYS.01
          </div>
          <div className="absolute top-28 right-6 sm:right-12 lg:right-20 text-[10px] font-mono tracking-[0.25em] text-[#08090D]/35 uppercase hidden sm:block">
            07°00&apos;N · 80°00&apos;E
          </div>
          <div className="absolute bottom-28 left-6 sm:left-12 lg:left-20 text-[10px] font-mono tracking-[0.22em] text-[#08090D]/30 uppercase hidden md:block">
            KINETIC // EDITORIAL
          </div>
          <div className="absolute bottom-28 right-6 sm:right-12 lg:right-20 text-[10px] font-mono tracking-[0.22em] text-[#08090D]/30 uppercase hidden md:block">
            INDEPENDENT STUDIO
          </div>

          {/* Large delicate circular orbits */}
          <svg
            viewBox="0 0 1000 1000"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[780px] sm:w-[940px] lg:w-[1100px] h-[780px] sm:h-[940px] lg:h-[1100px] opacity-25"
          >
            <circle
              cx="500"
              cy="500"
              r="460"
              stroke="#08090D"
              strokeWidth="1"
              strokeDasharray="6 6"
            />
            <circle
              cx="500"
              cy="500"
              r="340"
              stroke="#08090D"
              strokeWidth="0.8"
              opacity="0.6"
            />
            <circle
              cx="500"
              cy="500"
              r="220"
              stroke="#08090D"
              strokeWidth="0.6"
              strokeDasharray="4 4"
              opacity="0.4"
            />
          </svg>
        </div>

        {/* GEOMETRIC LAYER 2: Abstract Brand Geometry & Cropped Arcs */}
        <div
          ref={bgGeoLayer2Ref}
          className="absolute inset-0 flex items-center justify-center transition-transform duration-500 pointer-events-none"
        >
          <svg
            viewBox="0 0 1200 800"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full max-w-[1400px] opacity-[0.09]"
          >
            {/* Diagonal precision lines */}
            <line x1="100" y1="150" x2="1100" y2="650" stroke="#08090D" strokeWidth="1" />
            <line x1="1100" y1="150" x2="100" y2="650" stroke="#08090D" strokeWidth="0.8" strokeDasharray="8 8" />
            {/* Cropped architectural arcs */}
            <path
              d="M 200,400 A 350,350 0 0,1 1000,400"
              stroke="#08090D"
              strokeWidth="1.5"
            />
            <path
              d="M 300,400 A 250,250 0 0,0 900,400"
              stroke="#08090D"
              strokeWidth="1"
              strokeDasharray="6 6"
            />
          </svg>
        </div>
      </div>

      {/* Interactive mouse-following soft light field (fine pointer desktop only) */}
      <div
        ref={mouseLightRef}
        className="absolute top-0 left-0 w-[520px] h-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none opacity-0 z-[1] transition-opacity duration-500 hidden md:block"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.05) 40%, transparent 70%)",
          filter: "blur(55px)",
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
          className="opacity-0 mb-6 sm:mb-8 flex items-center justify-center gap-2.5 px-4 py-1.5 rounded-full border border-[#08090D]/20 bg-[#08090D]/[0.06] backdrop-blur-sm"
        >
          <span
            className="w-1.5 h-1.5 rounded-full bg-[#08090D] inline-block shadow-[0_0_8px_rgba(8,9,13,0.5)]"
            aria-hidden="true"
          />
          <span className="uppercase tracking-[0.24em] text-[11px] sm:text-[12px] md:text-[13px] font-[700] text-[#08090D]">
            {eyebrowText}
          </span>
        </div>

        {/* 2. Large Expressive Three-Line Headline Composition */}
        <h1 className="relative w-full max-w-[1240px] mx-auto flex flex-col items-center justify-center select-none">
          {/* LINE 01: WE TRANSFORM (Manrope Bold, Deep Black) */}
          <div className="overflow-hidden py-1">
            <span
              ref={line1Ref}
              className="block will-change-transform font-[800] text-[#08090D] uppercase tracking-[-0.035em] leading-[0.94] text-[44px] sm:text-[64px] md:text-[84px] lg:text-[104px] xl:text-[120px]"
            >
              WE TRANSFORM
            </span>
          </div>

          {/* LINE 02: IDEAS INTO (Manrope Bold, Deep Black) */}
          <div className="overflow-hidden py-1 -mt-1 sm:-mt-2 md:-mt-3">
            <span
              ref={line2Ref}
              className="block will-change-transform font-[800] text-[#08090D] uppercase tracking-[-0.035em] leading-[0.94] text-[44px] sm:text-[64px] md:text-[84px] lg:text-[104px] xl:text-[120px]"
            >
              IDEAS INTO
            </span>
          </div>

          {/* LINE 03: EXPERIENCES. (Instrument Serif Italic, Warm White Contrast) */}
          <div className="overflow-hidden py-1 -mt-1 sm:-mt-2 md:-mt-3">
            <span
              ref={line3Ref}
              className="block will-change-transform font-instrument italic font-[400] md:font-[500] text-[#F4F2ED] tracking-[-0.02em] leading-[0.96] text-[48px] sm:text-[72px] md:text-[94px] lg:text-[118px] xl:text-[136px] drop-shadow-[0_4px_30px_rgba(8,9,13,0.25)]"
            >
              EXPERIENCES.
            </span>
          </div>
        </h1>

        {/* 3. Supporting Studio Description */}
        <p
          ref={descRef}
          className="opacity-0 text-[#08090D]/85 text-[15px] sm:text-[16px] md:text-[17px] leading-[1.6] font-[500] max-w-[520px] mx-auto mt-5 sm:mt-6 md:mt-7"
        >
          {descriptionText}
        </p>

        {/* 4. Call to Action Buttons */}
        <div
          ref={btnsRef}
          className="opacity-0 mt-6 sm:mt-7 md:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto"
        >
          {/* Primary CTA: Deep black pill with warm-white text */}
          <a
            href="#work"
            onClick={(e) => scrollToAnchor(e, "work")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#08090D] text-[#F4F2ED] border border-[#08090D] px-7 sm:px-8 py-3 sm:py-3.5 font-[700] uppercase tracking-[0.1em] text-[12px] sm:text-[13px] rounded-full hover:bg-[#1A1D24] hover:shadow-[0_8px_30px_rgba(8,9,13,0.35)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#08090D]"
          >
            <span>{primaryText}</span>
            <span
              className="transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            >
              →
            </span>
          </a>

          {/* Secondary CTA: Transparent with deep black border and text */}
          <a
            href="#contact"
            onClick={(e) => scrollToAnchor(e, "contact")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-transparent text-[#08090D] border-2 border-[#08090D] px-7 sm:px-8 py-3 sm:py-3.5 font-[700] uppercase tracking-[0.1em] text-[12px] sm:text-[13px] rounded-full hover:bg-[#08090D] hover:text-[#F4F2ED] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#08090D]"
          >
            <span>{secondaryText}</span>
            <span
              className="transition-transform duration-300 group-hover:translate-x-1"
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
        className="relative z-10 mt-6 sm:mt-8 flex flex-col items-center gap-2 cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08090D] rounded-md px-3 py-1"
      >
        <span className="text-[11px] sm:text-[12px] font-[700] tracking-[0.24em] text-[#08090D]/75 uppercase group-hover:text-[#08090D] transition-colors duration-300">
          SCROLL TO EXPLORE
        </span>
        <div className="w-[1.5px] h-6 bg-[#08090D]/20 relative overflow-hidden rounded-full">
          <div className="absolute inset-0 bg-[#08090D] animate-scroll-line" />
        </div>
      </div>
    </section>
  );
}
