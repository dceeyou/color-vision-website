"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { HeroContent } from "@/lib/wordpress/types";

interface HeroProps {
  hero?: HeroContent;
}

export default function Hero({ hero }: HeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const ambientLightRef = useRef<HTMLDivElement>(null);
  const mouseGlowRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headline1Ref = useRef<HTMLHeadingElement>(null);
  const headline2Ref = useRef<HTMLHeadingElement>(null);
  const headlineGlowRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const btnsRef = useRef<HTMLDivElement>(null);
  const scrollIndRef = useRef<HTMLDivElement>(null);

  // Smooth scroll handler
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

  // Smooth scroll down to next section
  const handleScrollDown = () => {
    const nextSection =
      document.getElementById("work") ||
      document.getElementById("services") ||
      document.querySelector("section:nth-of-type(2)");
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

    // Elements to reveal
    const revealElements = [
      eyebrowRef.current,
      headline1Ref.current,
      headline2Ref.current,
      descRef.current,
      btnsRef.current,
      scrollIndRef.current,
    ];

    if (isReduced) {
      gsap.set(revealElements, { opacity: 1, y: 0 });
      if (ambientLightRef.current) {
        gsap.set(ambientLightRef.current, { opacity: 1 });
      }
      return;
    }

    // GSAP Timeline for sequential entrance
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Initial states
    gsap.set(
      [
        eyebrowRef.current,
        headline1Ref.current,
        headline2Ref.current,
        descRef.current,
        btnsRef.current,
        scrollIndRef.current,
      ],
      { opacity: 0 }
    );
    if (ambientLightRef.current) {
      gsap.set(ambientLightRef.current, { opacity: 0 });
    }

    tl.fromTo(
      eyebrowRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.7 },
      0.15
    )
      .fromTo(
        headline1Ref.current,
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
        0.32
      )
      .fromTo(
        headline2Ref.current,
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 0.95, ease: "power3.out" },
        0.48
      )
      .fromTo(
        descRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.7
      )
      .fromTo(
        btnsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.75 },
        0.88
      )
      .fromTo(
        ambientLightRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.6, ease: "power2.out" },
        0.3
      )
      .fromTo(
        scrollIndRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.8 },
        1.1
      );

    // Interactive mouse-following ambient glow on desktop
    const container = containerRef.current;
    const mouseGlow = mouseGlowRef.current;

    let quickX: ((value: number) => void) | null = null;
    let quickY: ((value: number) => void) | null = null;

    if (
      mouseGlow &&
      container &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      quickX = gsap.quickTo(mouseGlow, "x", { duration: 0.8, ease: "power2.out" });
      quickY = gsap.quickTo(mouseGlow, "y", { duration: 0.8, ease: "power2.out" });

      const handleMouseMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        if (quickX && quickY) {
          quickX(x);
          quickY(y);
        }
        gsap.to(mouseGlow, { opacity: 0.65, duration: 0.4 });
      };

      const handleMouseLeave = () => {
        gsap.to(mouseGlow, { opacity: 0, duration: 0.6 });
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
  const line1Text = hero?.heading || "We transform ideas";
  const line2Text =
    hero?.highlightedText || "into meaningful experiences.";
  const descriptionText =
    hero?.description ||
    "Color Vision brings strategy, creativity and thoughtful design together to shape distinctive brands, intuitive digital products and meaningful digital experiences.";
  const primaryLabel = hero?.primaryCtaLabel || "VIEW OUR WORK →";
  const secondaryLabel = hero?.secondaryCtaLabel || "START A PROJECT →";

  return (
    <section
      ref={containerRef}
      id="hero"
      aria-label="Color Vision Hero"
      className="relative w-full min-h-screen bg-[#08090D] flex flex-col justify-between items-center overflow-hidden pt-36 md:pt-40 lg:pt-44 pb-12 sm:pb-16 select-none"
    >
      {/* =========================================================================
          ATMOSPHERIC BACKGROUND LIGHTING SYSTEM
          ========================================================================= */}
      <div
        ref={ambientLightRef}
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
        aria-hidden="true"
      >
        {/* Left vertical flowing light curtain */}
        <div
          className="absolute -left-[20%] sm:-left-[12%] lg:-left-[6%] top-[8%] w-[420px] sm:w-[540px] lg:w-[680px] h-[720px] lg:h-[900px] rounded-full animate-curtain-left"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(255, 81, 8, 0.32) 0%, rgba(255, 81, 8, 0.14) 42%, rgba(255, 81, 8, 0.02) 70%, transparent 80%)",
            filter: "blur(75px)",
          }}
        />

        {/* Right vertical flowing light curtain */}
        <div
          className="absolute -right-[20%] sm:-right-[12%] lg:-right-[6%] top-[12%] w-[420px] sm:w-[540px] lg:w-[680px] h-[720px] lg:h-[900px] rounded-full animate-curtain-right"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(255, 81, 8, 0.28) 0%, rgba(255, 81, 8, 0.12) 42%, rgba(255, 81, 8, 0.02) 70%, transparent 80%)",
            filter: "blur(80px)",
          }}
        />

        {/* Bottom-left ambient corner illumination */}
        <div
          className="absolute -bottom-24 -left-20 w-[480px] h-[380px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at bottom left, rgba(255, 81, 8, 0.18) 0%, rgba(255, 81, 8, 0.04) 50%, transparent 75%)",
            filter: "blur(60px)",
          }}
        />

        {/* Bottom-right ambient corner illumination */}
        <div
          className="absolute -bottom-24 -right-20 w-[480px] h-[380px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at bottom right, rgba(255, 81, 8, 0.16) 0%, rgba(255, 81, 8, 0.03) 50%, transparent 75%)",
            filter: "blur(60px)",
          }}
        />

        {/* Central dark vignette to ensure pristine typography legibility */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(8, 9, 13, 0.88) 0%, rgba(8, 9, 13, 0.65) 55%, rgba(8, 9, 13, 0.2) 100%)",
          }}
        />
      </div>

      {/* Interactive mouse-following glow (desktop fine pointer only) */}
      <div
        ref={mouseGlowRef}
        className="absolute top-0 left-0 w-[460px] h-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none opacity-0 z-[1] transition-opacity duration-500 hidden md:block"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 81, 8, 0.15) 0%, rgba(255, 81, 8, 0.04) 45%, transparent 70%)",
          filter: "blur(50px)",
        }}
        aria-hidden="true"
      />

      {/* =========================================================================
          CENTERED HERO CONTENT
          ========================================================================= */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center my-auto">
        {/* Eyebrow badge */}
        <div
          ref={eyebrowRef}
          className="opacity-0 mb-6 sm:mb-8 flex items-center justify-center gap-2.5 px-4 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] backdrop-blur-md"
        >
          <span
            className="w-1.5 h-1.5 rounded-full bg-[#FF5108] inline-block shadow-[0_0_10px_rgba(255,81,8,0.9)] animate-pulse"
            aria-hidden="true"
          />
          <span className="uppercase tracking-[0.24em] text-[11px] sm:text-[12px] md:text-[13px] font-[600] text-[#A6A8AE]">
            {eyebrowText}
          </span>
        </div>

        {/* Headline Container with Background Reflection */}
        <div className="relative w-full max-w-[1120px] mx-auto flex flex-col items-center">
          {/* Subtle animated orange light reflection directly behind the italic headline */}
          <div
            ref={headlineGlowRef}
            className="absolute top-[65%] left-1/2 w-[340px] sm:w-[580px] lg:w-[780px] h-[160px] sm:h-[220px] rounded-full pointer-events-none animate-reflection-glow z-0"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(255, 81, 8, 0.32) 0%, rgba(255, 81, 8, 0.12) 50%, transparent 75%)",
              filter: "blur(55px)",
            }}
            aria-hidden="true"
          />

          {/* Line 1: We transform ideas */}
          <h1
            ref={headline1Ref}
            className="relative z-10 text-[36px] sm:text-[54px] md:text-[72px] lg:text-[88px] xl:text-[98px] font-[500] leading-[1.08] text-[#F4F2ED] tracking-[-0.03em]"
          >
            {line1Text}
          </h1>

          {/* Line 2: into meaningful experiences. (Cormorant Garamond italic serif) */}
          <h2
            ref={headline2Ref}
            className="relative z-10 font-serif italic text-[40px] sm:text-[60px] md:text-[80px] lg:text-[98px] xl:text-[108px] font-[400] md:font-[500] leading-[1.08] text-[#F4F2ED] tracking-[-0.02em] mt-1 sm:mt-2 text-balance drop-shadow-[0_2px_24px_rgba(255,81,8,0.18)]"
          >
            {line2Text}
          </h2>
        </div>

        {/* Supporting Studio Description */}
        <p
          ref={descRef}
          className="opacity-0 text-[#A6A8AE] text-[15px] sm:text-[16px] md:text-[18px] leading-[1.7] max-w-[620px] mx-auto mt-6 sm:mt-8 md:mt-9 font-[400]"
        >
          {descriptionText}
        </p>

        {/* Call to Action Buttons */}
        <div
          ref={btnsRef}
          className="opacity-0 mt-8 sm:mt-10 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 w-full sm:w-auto"
        >
          {/* Primary CTA: Warm white pill with orange hover */}
          <a
            href="#work"
            onClick={(e) => scrollToAnchor(e, "work")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#F4F2ED] text-[#08090D] px-8 sm:px-9 py-3.5 sm:py-4 font-[700] uppercase tracking-[0.08em] text-[12px] sm:text-[13px] rounded-full hover:bg-[#FF5108] hover:text-[#08090D] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 shadow-[0_4px_20px_rgba(255,81,8,0.15)] group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#FF5108]"
          >
            <span>{primaryLabel}</span>
            <span
              className="transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            >
              →
            </span>
          </a>

          {/* Secondary CTA: Transparent dark with subtle border */}
          <a
            href="#contact"
            onClick={(e) => scrollToAnchor(e, "contact")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 border border-white/15 bg-white/[0.03] text-[#F4F2ED] px-8 sm:px-9 py-3.5 sm:py-4 font-[600] uppercase tracking-[0.08em] text-[12px] sm:text-[13px] rounded-full hover:border-[#FF5108] hover:text-[#FF5108] hover:bg-[#FF5108]/[0.08] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 backdrop-blur-sm group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#FF5108]"
          >
            <span>{secondaryLabel}</span>
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
          BOTTOM SCROLL INDICATOR
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
        className="relative z-10 mt-10 sm:mt-12 flex flex-col items-center gap-2.5 cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5108] rounded-md px-3 py-1"
      >
        <span className="text-[10px] sm:text-[11px] font-[600] tracking-[0.28em] text-[#8E9098] uppercase group-hover:text-[#FF5108] transition-colors duration-300">
          SCROLL
        </span>
        <div className="w-[1.5px] h-8 bg-white/10 relative overflow-hidden rounded-full">
          <div className="absolute inset-0 bg-[#FF5108] animate-scroll-line" />
        </div>
      </div>
    </section>
  );
}
