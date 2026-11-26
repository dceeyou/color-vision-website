"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroContent } from "@/lib/wordpress/types";

interface HeroProps {
  hero?: HeroContent;
}

// Character mapping for staggered kinetic reveals
const LINE1_WORDS = [
  { word: "WE", chars: ["W", "E"] },
  { word: "TRANSFORM", chars: ["T", "R", "A", "N", "S", "F", "O", "R", "M"] },
];

const LINE2_WORDS = [
  { word: "IDEAS", chars: ["I", "D", "E", "A", "S"] },
  { word: "INTO", chars: ["I", "N", "T", "O"] },
];

const FULL_WORD = "EXPERIENCES.";
// Natural keystroke delay sequence (approximately 55-75ms, subtle pauses for human cadence)
const KEYSTROKE_DELAYS = [65, 70, 65, 80, 60, 65, 70, 65, 75, 65, 80, 110];

// Mathematical cubic-bezier(0.22, 1, 0.36, 1) evaluator
function cubicBezier(p1x: number, p1y: number, p2x: number, p2y: number) {
  return function (t: number) {
    if (t <= 0) return 0;
    if (t >= 1) return 1;
    let u = t;
    for (let i = 0; i < 8; i++) {
      const currentX =
        3 * (1 - u) * (1 - u) * u * p1x +
        3 * (1 - u) * u * u * p2x +
        u * u * u;
      const dx =
        3 * (1 - u) * (1 - u) * p1x +
        6 * (1 - u) * u * (p2x - p1x) +
        3 * u * u * (1 - p2x);
      if (Math.abs(currentX - t) < 0.0001 || Math.abs(dx) < 1e-6) break;
      u -= (currentX - t) / dx;
      u = Math.max(0, Math.min(1, u));
    }
    return (
      3 * (1 - u) * (1 - u) * u * p1y +
      3 * (1 - u) * u * u * p2y +
      u * u * u
    );
  };
}

const editorialEase = cubicBezier(0.22, 1, 0.36, 1);

export default function Hero({ hero }: HeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const ambientLightRightRef = useRef<HTMLDivElement>(null);
  const ambientLightLeftRef = useRef<HTMLDivElement>(null);
  const peripheralDecorRef = useRef<HTMLDivElement>(null);
  const mouseLightRef = useRef<HTMLDivElement>(null);

  // Content Refs for sequential kinetic typography entrance
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const line3Ref = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const btnsRef = useRef<HTMLDivElement>(null);
  const scrollIndRef = useRef<HTMLDivElement>(null);

  // Typewriter state for line 3
  const [typedCount, setTypedCount] = useState<number>(0);
  const [showCursor, setShowCursor] = useState<boolean>(false);
  const timersRef = useRef<NodeJS.Timeout[]>([]);

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
      setTypedCount(FULL_WORD.length);
      setShowCursor(false);
      gsap.set(revealElements, { opacity: 1, y: 0, yPercent: 0, rotate: 0, x: 0, filter: "none" });
      if (line1Ref.current) {
        gsap.set(line1Ref.current.querySelectorAll(".kinetic-char-1"), {
          yPercent: 0,
          opacity: 1,
          filter: "none",
        });
      }
      if (line2Ref.current) {
        gsap.set(line2Ref.current.querySelectorAll(".kinetic-char-2"), {
          yPercent: 0,
          opacity: 1,
          filter: "none",
        });
      }
      if (ambientLightRightRef.current) gsap.set(ambientLightRightRef.current, { opacity: 0.18 });
      if (ambientLightLeftRef.current) gsap.set(ambientLightLeftRef.current, { opacity: 0.14 });
      if (peripheralDecorRef.current) gsap.set(peripheralDecorRef.current, { opacity: 0.10 });
      return;
    }

    // =========================================================================
    // 1. KINETIC TYPOGRAPHY ENTRANCE SEQUENCE
    // =========================================================================
    const tl = gsap.timeline({ defaults: { ease: editorialEase } });

    // Initial states
    gsap.set(
      [eyebrowRef.current, descRef.current, btnsRef.current, scrollIndRef.current],
      { opacity: 0 }
    );

    const chars1 = line1Ref.current
      ? line1Ref.current.querySelectorAll(".kinetic-char-1")
      : [];
    const chars2 = line2Ref.current
      ? line2Ref.current.querySelectorAll(".kinetic-char-2")
      : [];

    gsap.set(chars1, {
      yPercent: 115,
      opacity: 0,
      filter: "blur(5px)",
    });

    gsap.set(chars2, {
      yPercent: 115,
      opacity: 0,
      filter: "blur(5px)",
    });

    if (ambientLightRightRef.current) gsap.set(ambientLightRightRef.current, { opacity: 0 });
    if (ambientLightLeftRef.current) gsap.set(ambientLightLeftRef.current, { opacity: 0 });
    if (peripheralDecorRef.current) gsap.set(peripheralDecorRef.current, { opacity: 0 });

    tl
      // Soft edge ambient lighting fades in smoothly
      .fromTo(
        [ambientLightRightRef.current, ambientLightLeftRef.current],
        { opacity: 0 },
        { opacity: 0.18, duration: 1.4, ease: "power2.out", stagger: 0.15 },
        0.05
      )
      .fromTo(
        peripheralDecorRef.current,
        { opacity: 0 },
        { opacity: 0.10, duration: 1.5, ease: "power2.out" },
        0.15
      )
      // Eyebrow badge fades and lifts
      .fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" },
        0.18
      )
      // Stage 01: Line 1 — "WE TRANSFORM" (Start at ~250ms, duration 800ms with character stagger)
      .fromTo(
        chars1,
        { yPercent: 115, opacity: 0, filter: "blur(5px)" },
        {
          yPercent: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.80,
          stagger: 0.02,
          ease: editorialEase,
        },
        0.25
      )
      // Stage 02: Line 2 — "IDEAS INTO" (Start 300ms after Line 1 at 0.55s, duration 800ms with character stagger)
      .fromTo(
        chars2,
        { yPercent: 115, opacity: 0, filter: "blur(5px)" },
        {
          yPercent: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.80,
          stagger: 0.02,
          ease: editorialEase,
        },
        0.55
      )
      // Stage 04: Supporting studio description fades in (after typewriter finishes)
      .fromTo(
        descRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.65, ease: "power2.out" },
        2.65
      )
      // Stage 05: CTA buttons appear with subtle upward transition
      .fromTo(
        btnsRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.65, ease: "power2.out" },
        2.90
      )
      // Stage 06: Scroll indicator reveal
      .fromTo(
        scrollIndRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.60, ease: "power2.out" },
        3.15
      );

    // =========================================================================
    // 2. TYPEWRITER ANIMATION FOR LINE 03 ("EXPERIENCES.")
    // Begins right after the first two lines complete their entrance (~1.45s)
    // =========================================================================
    const typewriterStartDelay = 1450;

    const startTimer = setTimeout(() => {
      setShowCursor(true);

      let cumulativeDelay = 0;
      for (let i = 0; i < FULL_WORD.length; i++) {
        cumulativeDelay += KEYSTROKE_DELAYS[i] || 65;
        const charTimer = setTimeout(() => {
          setTypedCount(i + 1);

          // Once final period is typed, hold cursor for 450ms then remove permanently
          if (i === FULL_WORD.length - 1) {
            const finishTimer = setTimeout(() => {
              setShowCursor(false);
            }, 450);
            timersRef.current.push(finishTimer);
          }
        }, cumulativeDelay);
        timersRef.current.push(charTimer);
      }
    }, typewriterStartDelay);

    timersRef.current.push(startTimer);

    // =========================================================================
    // 2. RESTRAINED PERIPHERAL AMBIENT LIGHT DRIFT
    // =========================================================================
    const glowAnimRight = gsap.to(ambientLightRightRef.current, {
      x: -18,
      y: 20,
      duration: 10,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    const glowAnimLeft = gsap.to(ambientLightLeftRef.current, {
      x: 16,
      y: -18,
      duration: 12,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    // =========================================================================
    // 3. SUBTLE SCROLL PARALLAX ON PERIPHERAL BACKGROUND
    // =========================================================================
    let scrollTriggerInstance: ScrollTrigger | null = null;
    if (containerRef.current) {
      scrollTriggerInstance = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.2,
        onUpdate: (self) => {
          if (ambientLightRightRef.current) {
            gsap.set(ambientLightRightRef.current, { y: self.progress * 45 });
          }
          if (ambientLightLeftRef.current) {
            gsap.set(ambientLightLeftRef.current, { y: self.progress * 35 });
          }
          if (peripheralDecorRef.current) {
            gsap.set(peripheralDecorRef.current, { y: self.progress * 50 });
          }
          // Subtle headline parallax (stationary background preserved)
          if (headlineRef.current) {
            gsap.set(headlineRef.current, { y: self.progress * 18 });
          }
        },
      });
    }

    // =========================================================================
    // 4. DESKTOP CURSOR INTERACTION (Restrained & Subtle)
    // =========================================================================
    const container = containerRef.current;
    const mouseLight = mouseLightRef.current;
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
          gsap.to(mouseLight, { opacity: 0.22, duration: 0.4 });
        }

        // Kinetic typography micro-displacement (subtle 2px)
        if (t1X && t1Y) {
          t1X(normX * 2.0);
          t1Y(normY * 1.5);
        }
        if (t2X && t2Y) {
          t2X(normX * -1.8);
          t2Y(normY * 2.0);
        }
        if (t3X && t3Y) {
          t3X(normX * 2.2);
          t3Y(normY * -1.5);
        }
      };

      const handleMouseLeave = () => {
        if (mouseLight) gsap.to(mouseLight, { opacity: 0, duration: 0.6 });
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
      timersRef.current.forEach((t) => clearTimeout(t));
      timersRef.current = [];
      tl.kill();
      glowAnimRight.kill();
      glowAnimLeft.kill();
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
      aria-label="Color Vision Hero: Minimal Dark Atmosphere & Kinetic Typography"
      className="relative w-full min-h-[100svh] bg-[#08090D] text-[#F4F2ED] flex flex-col justify-between items-center overflow-hidden pt-28 sm:pt-32 md:pt-36 pb-8 sm:pb-10 select-none"
    >
      {/* =========================================================================
          1. CENTER TEXT-SAFE BASE CANVAS & DEEP VIGNETTE
          Guarantees the central headline & paragraph area is 100% dark & clean (#050609)
          ========================================================================= */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse 1100px 750px at 50% 48%, #050609 0%, #050609 50%, #08090D 100%)",
        }}
        aria-hidden="true"
      />

      {/* Subtle outer vignette framing */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 45%, rgba(8, 9, 13, 0.6) 80%, #08090D 100%)",
        }}
        aria-hidden="true"
      />

      {/* =========================================================================
          2. RESTRAINED PERIPHERAL AMBIENT ORANGE & WARM HIGHLIGHTS
          Positioned strictly at outer edges/corners — zero bright light behind text
          ========================================================================= */}
      {/* Top-Right Ambient Warmth (Far outer corner) */}
      <div
        ref={ambientLightRightRef}
        className="absolute -top-36 -right-36 w-[520px] sm:w-[680px] h-[520px] sm:h-[680px] rounded-full pointer-events-none opacity-20 z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 122, 36, 0.22) 0%, rgba(255, 81, 8, 0.07) 45%, transparent 70%)",
          filter: "blur(110px)",
        }}
        aria-hidden="true"
      />

      {/* Bottom-Left Ambient Warmth (Far outer corner) */}
      <div
        ref={ambientLightLeftRef}
        className="absolute -bottom-36 -left-36 w-[480px] sm:w-[620px] h-[480px] sm:h-[620px] rounded-full pointer-events-none opacity-15 z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 81, 8, 0.18) 0%, rgba(181, 46, 0, 0.05) 45%, transparent 70%)",
          filter: "blur(100px)",
        }}
        aria-hidden="true"
      />

      {/* =========================================================================
          3. SUBTLE PERIPHERAL ABSTRACT EDGES (Desktop Only, Far Margins)
          Never overlaps the central text-safe corridor
          ========================================================================= */}
      <div
        ref={peripheralDecorRef}
        className="absolute inset-0 pointer-events-none z-[1] overflow-hidden opacity-10 hidden lg:block"
        aria-hidden="true"
      >
        {/* Far Right Peripheral Contour */}
        <div className="absolute right-[-40px] top-[18%] w-[380px] h-[540px]">
          <svg viewBox="0 0 380 540" fill="none" className="w-full h-full filter blur-[0.5px]">
            <path
              d="M 360,30 C 220,160 200,340 340,510"
              stroke="#FF7A24"
              strokeWidth="1.2"
              strokeOpacity="0.35"
            />
            <path
              d="M 380,80 C 260,190 240,320 370,460"
              stroke="#FF5108"
              strokeWidth="0.8"
              strokeDasharray="4 8"
              strokeOpacity="0.25"
            />
          </svg>
        </div>

        {/* Far Left Peripheral Contour */}
        <div className="absolute left-[-40px] bottom-[14%] w-[320px] h-[460px]">
          <svg viewBox="0 0 320 460" fill="none" className="w-full h-full filter blur-[0.5px]">
            <path
              d="M 20,430 C 140,330 150,180 30,50"
              stroke="#FF5108"
              strokeWidth="1"
              strokeOpacity="0.25"
            />
          </svg>
        </div>
      </div>

      {/* =========================================================================
          4. ARCHITECTURAL GRID LINES & TECHNICAL METADATA (Wezzi-Style)
          ========================================================================= */}
      <div
        className="absolute inset-0 max-w-[1280px] mx-auto pointer-events-none z-[2] px-4 sm:px-6 lg:px-8"
        aria-hidden="true"
      >
        <div className="w-full h-full border-x border-white/[0.035] grid grid-cols-2 md:grid-cols-4">
          <div className="border-r border-white/[0.025] hidden sm:block h-full" />
          <div className="border-r border-white/[0.025] hidden md:block h-full" />
          <div className="border-r border-white/[0.025] hidden sm:block h-full" />
        </div>

        <div className="absolute bottom-28 left-6 sm:left-10 text-[10px] tracking-[0.22em] font-[600] text-[#777982] uppercase hidden md:block">
          STUDIO // EXPERIENCES
        </div>
        <div className="absolute bottom-28 right-6 sm:right-10 text-[10px] tracking-[0.22em] font-[600] text-[#777982] uppercase hidden md:block">
          EST. SRI LANKA
        </div>
      </div>

      {/* Interactive mouse-following subtle ambient warmth (fine pointer desktop only) */}
      <div
        ref={mouseLightRef}
        className="absolute top-0 left-0 w-[420px] h-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none opacity-0 z-[2] transition-opacity duration-500 hidden md:block"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 122, 36, 0.16) 0%, rgba(255, 81, 8, 0.04) 45%, transparent 70%)",
          filter: "blur(65px)",
        }}
        aria-hidden="true"
      />

      {/* =========================================================================
          5. HERO EDITORIAL CONTENT & KINETIC TYPOGRAPHY
          Primacy on typography, contrast and beautiful negative space
          ========================================================================= */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center my-auto">
        {/* Eyebrow Label Capsule */}
        <div
          ref={eyebrowRef}
          className="opacity-0 mb-6 sm:mb-8 flex items-center justify-center gap-2 sm:gap-2.5 px-3.5 sm:px-4 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.035] backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.3)] max-w-full"
        >
          <span
            className="w-1.5 h-1.5 rounded-full bg-[#FF5108] inline-block shadow-[0_0_8px_#FF5108] animate-pulse shrink-0"
            aria-hidden="true"
          />
          <span className="uppercase tracking-[0.18em] sm:tracking-[0.24em] text-[10px] sm:text-[12px] md:text-[13px] font-[600] text-[#777982] whitespace-nowrap">
            {eyebrowText}
          </span>
        </div>

        {/* Large Expressive Three-Line Headline Composition */}
        <h1
          ref={headlineRef}
          className="relative w-full max-w-[1240px] mx-auto flex flex-col items-center justify-center select-none"
          aria-label="We transform ideas into experiences."
        >
          {/* Accessible screen reader announcement (avoids announcing character-by-character changes) */}
          <span className="sr-only">WE TRANSFORM IDEAS INTO EXPERIENCES.</span>

          {/* LINE 01: WE TRANSFORM (#F4F2ED Inter Tight Bold) */}
          <div className="overflow-hidden py-1" aria-hidden="true">
            <span
              ref={line1Ref}
              className="inline-flex flex-wrap items-center justify-center font-[800] text-[#F4F2ED] uppercase tracking-[-0.035em] leading-[0.94] text-[44px] sm:text-[64px] md:text-[84px] lg:text-[104px] xl:text-[120px]"
            >
              {LINE1_WORDS.map((w, wIdx) => (
                <span key={w.word} className="inline-flex whitespace-nowrap">
                  {w.chars.map((char, cIdx) => (
                    <span
                      key={cIdx}
                      className="kinetic-char-1 inline-block will-change-transform"
                    >
                      {char}
                    </span>
                  ))}
                  {wIdx < LINE1_WORDS.length - 1 && (
                    <span className="inline-block">&nbsp;</span>
                  )}
                </span>
              ))}
            </span>
          </div>

          {/* LINE 02: IDEAS INTO (#F4F2ED Inter Tight Bold) */}
          <div className="overflow-hidden py-1 -mt-1 sm:-mt-2 md:-mt-3" aria-hidden="true">
            <span
              ref={line2Ref}
              className="inline-flex flex-wrap items-center justify-center font-[800] text-[#F4F2ED] uppercase tracking-[-0.035em] leading-[0.94] text-[44px] sm:text-[64px] md:text-[84px] lg:text-[104px] xl:text-[120px]"
            >
              {LINE2_WORDS.map((w, wIdx) => (
                <span key={w.word} className="inline-flex whitespace-nowrap">
                  {w.chars.map((char, cIdx) => (
                    <span
                      key={cIdx}
                      className="kinetic-char-2 inline-block will-change-transform"
                    >
                      {char}
                    </span>
                  ))}
                  {wIdx < LINE2_WORDS.length - 1 && (
                    <span className="inline-block">&nbsp;</span>
                  )}
                </span>
              ))}
            </span>
          </div>

          {/* LINE 03: EXPERIENCES. (Instrument Serif Italic, Signature Orange with Typewriter Reveal) */}
          <div className="py-1 -mt-1 sm:-mt-2 md:-mt-3 relative flex items-center justify-center font-editorial italic" aria-hidden="true">
            <span
              ref={line3Ref}
              className="relative inline-block font-editorial italic font-[400] text-[#FF5108] tracking-[-0.02em] leading-[0.96] text-[48px] sm:text-[72px] md:text-[94px] lg:text-[118px] xl:text-[136px] pr-2 sm:pr-4"
              style={{ fontFamily: "var(--font-editorial, 'Instrument Serif', Georgia, serif)" }}
            >
              {/* Invisible ghost placeholder that guarantees zero layout shift or container collapse */}
              <span
                className="invisible select-none pointer-events-none font-editorial italic"
                style={{ fontFamily: "var(--font-editorial, 'Instrument Serif', Georgia, serif)" }}
                aria-hidden="true"
              >
                {FULL_WORD}
              </span>

              {/* Progressive typewriter character reveal with slim orange cursor */}
              <span
                className="absolute inset-y-0 left-0 flex items-center whitespace-nowrap font-editorial italic"
                style={{ fontFamily: "var(--font-editorial, 'Instrument Serif', Georgia, serif)" }}
              >
                <span
                  className="font-editorial italic"
                  style={{ fontFamily: "var(--font-editorial, 'Instrument Serif', Georgia, serif)" }}
                >
                  {FULL_WORD.slice(0, typedCount)}
                </span>
                {showCursor && (
                  <span
                    className="inline-block w-[2px] h-[0.78em] sm:h-[0.82em] bg-[#FF5108] ml-1 sm:ml-1.5 align-middle select-none animate-hero-cursor"
                    aria-hidden="true"
                  />
                )}
              </span>
            </span>
          </div>
        </h1>

        {/* Supporting Studio Description in exact requested #B5B5BC */}
        <p
          ref={descRef}
          className="opacity-0 text-[#B5B5BC] text-[15px] sm:text-[16px] md:text-[17px] leading-[1.65] font-[400] max-w-[520px] mx-auto mt-5 sm:mt-6 md:mt-7"
        >
          {descriptionText}
        </p>

        {/* Call to Action Buttons */}
        <div
          ref={btnsRef}
          className="opacity-0 mt-7 sm:mt-8 md:mt-9 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto"
        >
          {/* Primary CTA: Studio Orange with Deep Black Text */}
          <a
            href="#work"
            onClick={(e) => scrollToAnchor(e, "work")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#FF5108] text-[#08090D] border border-[#FF5108] px-7 sm:px-8 py-3.5 sm:py-4 font-[700] uppercase tracking-[0.1em] text-[12px] sm:text-[13px] rounded-full hover:bg-[#FF7A24] hover:shadow-[0_0_24px_rgba(255,81,8,0.35)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#FF5108]"
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
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-white/[0.035] backdrop-blur-md text-[#F4F2ED] border border-white/[0.14] px-7 sm:px-8 py-3.5 sm:py-4 font-[700] uppercase tracking-[0.1em] text-[12px] sm:text-[13px] rounded-full hover:border-[#FF5108] hover:text-white hover:bg-white/[0.07] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#FF5108]"
          >
            <span>{secondaryText}</span>
            <span
              className="transition-transform duration-300 group-hover:translate-x-1 text-[#FF5108]"
              aria-hidden="true"
            >
              →
            </span>
          </Link>
        </div>
      </div>

      {/* =========================================================================
          6. MINIMAL SCROLL INDICATOR
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
        <span className="text-[11px] sm:text-[12px] font-[600] tracking-[0.24em] text-[#777982] uppercase group-hover:text-[#F4F2ED] transition-colors duration-300">
          SCROLL TO EXPLORE
        </span>
        <div className="w-[1.5px] h-6 bg-white/20 relative overflow-hidden rounded-full">
          <div className="absolute inset-0 bg-[#FF5108] animate-scroll-line" />
        </div>
      </div>
    </section>
  );
}
