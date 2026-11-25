"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProcessStep } from "@/lib/wordpress/types";

interface ProcessProps {
  steps?: ProcessStep[];
}

export default function Process({ steps: propSteps }: ProcessProps) {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const trackContainerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Active step index (0 to 4)
  const [activeStep, setActiveStep] = useState<number>(0);
  const [displayStep, setDisplayStep] = useState<number>(0);
  const [isTextFading, setIsTextFading] = useState<boolean>(false);
  const [trackOffset, setTrackOffset] = useState<number>(0);
  const [isInViewport, setIsInViewport] = useState<boolean>(false);
  const [isUserInteracting, setIsUserInteracting] = useState<boolean>(false);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);

  const interactionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const textFadeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 5 Canonical Process Steps
  const defaultSteps: ProcessStep[] = [
    {
      id: "1",
      stepNumber: "01",
      stepLabel: "DISCOVER",
      title: "Understand the challenge",
      description:
        "We learn about your business, audience, goals and challenges to understand what really matters.",
    },
    {
      id: "2",
      stepNumber: "02",
      stepLabel: "DEFINE",
      title: "Find the right direction",
      description:
        "We identify priorities, clarify the problem and establish a focused direction for the project.",
    },
    {
      id: "3",
      stepNumber: "03",
      stepLabel: "DESIGN",
      title: "Explore the possibilities",
      description:
        "We translate ideas into purposeful visual concepts and intuitive digital experiences.",
    },
    {
      id: "4",
      stepNumber: "04",
      stepLabel: "REFINE",
      title: "Make the details count",
      description:
        "We review, test and improve the solution to ensure every detail works as intended.",
    },
    {
      id: "5",
      stepNumber: "05",
      stepLabel: "DELIVER",
      title: "Ready for the real world",
      description:
        "We prepare and hand over the final work for implementation and real-world use.",
    },
  ];

  const steps = propSteps && propSteps.length >= 5 ? propSteps : defaultSteps;

  // Update track translation based on active element offset
  const updateTrackOffset = useCallback((index: number) => {
    const el = itemRefs.current[index];
    if (!el) return;

    if (index === 0) {
      setTrackOffset(0);
    } else {
      // Indent ensures active number sits completely to the right of the left edge gradient mask
      const indent = typeof window !== "undefined" && window.innerWidth < 640 ? 36 : 48;
      setTrackOffset(Math.max(0, el.offsetLeft - indent));
    }
  }, []);

  // Update track position whenever activeStep changes
  useEffect(() => {
    updateTrackOffset(activeStep);
    const id = requestAnimationFrame(() => updateTrackOffset(activeStep));
    return () => cancelAnimationFrame(id);
  }, [activeStep, updateTrackOffset]);

  // Recalculate track position on window resize
  useEffect(() => {
    const handleResize = () => {
      updateTrackOffset(activeStep);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeStep, updateTrackOffset]);

  // Handle smooth text transition when activeStep changes
  useEffect(() => {
    setIsTextFading(true);
    if (textFadeTimeoutRef.current) clearTimeout(textFadeTimeoutRef.current);

    textFadeTimeoutRef.current = setTimeout(() => {
      setDisplayStep(activeStep);
      setIsTextFading(false);
    }, 200);

    return () => {
      if (textFadeTimeoutRef.current) clearTimeout(textFadeTimeoutRef.current);
    };
  }, [activeStep]);

  // Handle manual selection
  const handleSelectStep = useCallback((index: number) => {
    setActiveStep(index);
    setIsUserInteracting(true);

    if (interactionTimeoutRef.current) {
      clearTimeout(interactionTimeoutRef.current);
    }

    // Resume automatic progression after 4.5 seconds
    interactionTimeoutRef.current = setTimeout(() => {
      setIsUserInteracting(false);
    }, 4500);
  }, []);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Viewport IntersectionObserver
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsInViewport(entry.isIntersecting && entry.intersectionRatio > 0.05);
      },
      {
        threshold: [0, 0.05, 0.2, 0.5],
        rootMargin: "0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Automatic progression loop:
  // Cycles through 01 -> 02 -> 03 -> 04 -> 05 (~2.8s per stage).
  // Step 05 holds briefly, then smoothly restarts from 01.
  useEffect(() => {
    if (!isInViewport || isUserInteracting || isReducedMotion) {
      return;
    }

    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 5);
    }, 2800);

    return () => clearInterval(timer);
  }, [isInViewport, isUserInteracting, isReducedMotion]);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current);
      if (textFadeTimeoutRef.current) clearTimeout(textFadeTimeoutRef.current);
    };
  }, []);

  // GSAP scroll reveal
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (isReduced.matches) {
      if (headerRef.current) gsap.set(headerRef.current, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const currentDisplayStep = steps[displayStep] || steps[0];

  return (
    <section
      id="process"
      ref={containerRef}
      aria-label="Color Vision Process"
      className="relative w-full bg-[#08090D] py-20 md:py-28 lg:py-32 border-b border-white/[0.06] overflow-hidden select-none scroll-mt-24 sm:scroll-mt-28"
    >
      {/* Subtle ambient lighting */}
      <div
        className="absolute left-1/4 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(255,81,8,0.05)_0%,transparent_70%)] pointer-events-none blur-3xl"
        aria-hidden="true"
      />

      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* =========================================================================
            1. SECTION INTRODUCTION
            ========================================================================= */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-12 mb-12 sm:mb-16"
        >
          <div className="max-w-[640px]">
            {/* Eyebrow */}
            <div className="flex items-center gap-2.5 mb-4 sm:mb-5">
              <span
                className="w-1.5 h-1.5 rounded-full bg-[#FF5108] inline-block shadow-[0_0_8px_rgba(255,81,8,0.8)]"
                aria-hidden="true"
              />
              <p className="uppercase tracking-[0.24em] text-[11px] sm:text-[12px] md:text-[13px] font-[600] text-[#8E9098]">
                OUR APPROACH / HOW WE WORK
              </p>
            </div>

            {/* Main Editorial Heading */}
            <h2 className="text-[34px] sm:text-[44px] md:text-[50px] lg:text-[56px] font-[800] leading-[1.06] tracking-[-0.035em] text-[#F4F2ED]">
              A thoughtful process. <br className="hidden sm:inline" />
              <span className="text-[#FF5108]">Meaningful outcomes.</span>
            </h2>
          </div>

          {/* Supporting Description */}
          <div className="max-w-[460px] pb-1">
            <p className="text-[#8E9098] text-[15px] sm:text-[16px] md:text-[17px] leading-[1.7] font-[400]">
              From understanding the challenge to delivering the final experience, every step has a
              purpose. Our process keeps creativity focused, decisions intentional and outcomes
              meaningful.
            </p>
          </div>
        </div>

        {/* Top Horizontal Divider Line */}
        <div className="w-full h-[1px] bg-white/[0.12] mb-6 sm:mb-10" aria-hidden="true" />

        {/* =========================================================================
            2. ANIMATED HORIZONTAL NUMBER SEQUENCE
            ========================================================================= */}
        <div
          ref={trackContainerRef}
          className="relative w-full overflow-hidden"
          role="region"
          aria-label="Process stages interactive timeline"
        >
          {/* Subtle gradient edge masks so numbers dissolve smoothly on the edges */}
          <div
            className={`absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-[#08090D] to-transparent z-10 pointer-events-none transition-opacity duration-500 ${
              activeStep > 0 ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden="true"
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-[#08090D] to-transparent z-10 pointer-events-none"
            aria-hidden="true"
          />

          {/* Smooth Horizontal Track */}
          <div
            style={{
              transform: `translateX(-${trackOffset}px)`,
              transition: isReducedMotion
                ? "none"
                : "transform 0.7s cubic-bezier(0.25, 1, 0.5, 1)",
            }}
            className="flex items-start will-change-transform py-2 sm:py-4 pl-9 sm:pl-12"
          >
            {steps.map((step, i) => {
              const isActive = i === activeStep;
              // Upcoming step is strictly the immediate next stage (or stage 01 when at stage 05)
              const isUpcoming = i === (activeStep + 1) % 5;
              const isPast = i < activeStep;

              return (
                <button
                  key={step.id}
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  type="button"
                  onClick={() => handleSelectStep(i)}
                  onFocus={() => handleSelectStep(i)}
                  aria-label={`Select stage ${step.stepNumber}: ${step.title}`}
                  aria-pressed={isActive}
                  className="flex flex-col items-start text-left cursor-pointer shrink-0 transition-all duration-700 group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF5108] rounded-sm pr-12 sm:pr-20 md:pr-28 lg:pr-36"
                >
                  {/* Stage Label & Indicator Stem */}
                  <div className="flex items-center gap-2 mb-2 sm:mb-4">
                    <span
                      className={`h-[1.5px] transition-all duration-500 ${
                        isActive
                          ? "w-8 bg-[#FF5108] shadow-[0_0_8px_rgba(255,81,8,0.7)]"
                          : isUpcoming
                          ? "w-5 bg-[#FF5108]/70"
                          : "w-3 bg-white/20 group-hover:bg-white/40"
                      }`}
                      aria-hidden="true"
                    />
                    <span
                      className={`text-[11px] sm:text-[12px] md:text-[13px] font-[600] uppercase tracking-[0.22em] transition-colors duration-500 ${
                        isActive
                          ? "text-[#F4F2ED]"
                          : isUpcoming
                          ? "text-[#FF5108]"
                          : isPast
                          ? "text-[#484A50] group-hover:text-[#777982]"
                          : "text-[#484A50] group-hover:text-[#777982]"
                      }`}
                    >
                      {step.stepLabel}
                    </span>
                  </div>

                  {/* Giant Number */}
                  <span
                    className={`font-sans text-[80px] sm:text-[110px] md:text-[140px] lg:text-[170px] xl:text-[190px] font-[700] leading-none tracking-[-0.04em] transition-all duration-700 select-none ${
                      isActive
                        ? "text-[#F4F2ED] scale-100"
                        : isUpcoming
                        ? "text-[#FF5108] group-hover:brightness-110"
                        : "text-[#484A50] group-hover:text-[#666870]"
                    }`}
                  >
                    {step.stepNumber}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Horizontal Divider Line with Cumulative Active Progress Fill */}
        <div className="relative w-full h-[1px] bg-white/[0.12] mt-6 sm:mt-10 mb-8 sm:mb-12">
          {/* Active indicator bar extending across completed progress */}
          <div
            style={{
              width: `${((activeStep + 1) / steps.length) * 100}%`,
              transition: isReducedMotion
                ? "none"
                : "width 0.7s cubic-bezier(0.25, 1, 0.5, 1)",
            }}
            className="absolute top-0 left-0 h-[2px] -translate-y-1/2 bg-gradient-to-r from-[#FF5108]/60 to-[#FF5108] shadow-[0_0_8px_rgba(255,81,8,0.7)]"
            aria-hidden="true"
          />
        </div>

        {/* =========================================================================
            3. ACTIVE PROCESS DESCRIPTION
            ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16 items-start min-h-[160px] md:min-h-[180px]">
          {/* Left: Stage Meta & Progress Indicators (md:col-span-4 lg:col-span-4) */}
          <div className="md:col-span-4 lg:col-span-4 flex flex-col justify-start">
            <div className="flex items-center gap-3 mb-4">
              <span
                className="w-2 h-2 rounded-full bg-[#FF5108] shadow-[0_0_8px_rgba(255,81,8,0.8)] shrink-0"
                aria-hidden="true"
              />
              <span className="font-mono text-[12px] sm:text-[13px] font-[700] text-[#FF5108] tracking-widest uppercase">
                STAGE 0{activeStep + 1} / 05
              </span>
              <span className="text-white/20" aria-hidden="true">
                •
              </span>
              <span className="font-mono text-[12px] sm:text-[13px] font-[600] text-[#F4F2ED] tracking-wider uppercase">
                {steps[activeStep]?.stepLabel}
              </span>
            </div>

            {/* Quick jump stage indicator pills */}
            <div
              className="flex items-center gap-2"
              role="tablist"
              aria-label="Stage selector buttons"
            >
              {steps.map((s, idx) => {
                const isCurrent = idx === activeStep;
                const isPast = idx < activeStep;
                return (
                  <button
                    key={`nav-${s.id}`}
                    type="button"
                    role="tab"
                    aria-selected={isCurrent}
                    onClick={() => handleSelectStep(idx)}
                    aria-label={`Jump to stage ${s.stepNumber}: ${s.stepLabel}`}
                    className={`h-2 rounded-full transition-all duration-500 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF5108] ${
                      isCurrent
                        ? "w-10 bg-[#FF5108] shadow-[0_0_8px_rgba(255,81,8,0.6)]"
                        : isPast
                        ? "w-3 bg-white/40 hover:bg-white/60"
                        : "w-3 bg-white/15 hover:bg-white/30"
                    }`}
                  />
                );
              })}
            </div>

            {/* Motion status indicator */}
            <div className="flex items-center gap-2 mt-4">
              <span
                className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                  isUserInteracting
                    ? "bg-amber-400"
                    : isInViewport
                    ? "bg-[#FF5108] animate-pulse"
                    : "bg-[#484A50]"
                }`}
                aria-hidden="true"
              />
              <span className="font-mono text-[10px] text-[#777982] tracking-wider uppercase">
                {isUserInteracting
                  ? "MANUAL CONTROL"
                  : isInViewport
                  ? "AUTO PROGRESSION"
                  : "PAUSED"}
              </span>
            </div>
          </div>

          {/* Right: Animated Title Heading & Description (md:col-span-8 lg:col-span-8) */}
          <div className="md:col-span-8 lg:col-span-8 relative overflow-hidden">
            <div
              style={{
                opacity: isTextFading ? 0 : 1,
                transform: isTextFading ? "translateY(8px)" : "translateY(0px)",
                transition: "opacity 0.25s ease-out, transform 0.35s ease-out",
              }}
              className="flex flex-col justify-start"
              role="region"
              aria-live="polite"
            >
              {/* Short descriptive heading */}
              <h3 className="text-[24px] sm:text-[30px] md:text-[36px] font-[700] tracking-[-0.025em] text-[#F4F2ED] mb-3 leading-[1.2]">
                {currentDisplayStep.title}
              </h3>

              {/* Supporting description */}
              <p className="text-[15px] sm:text-[16px] md:text-[17px] leading-[1.7] font-[400] text-[#92939B] max-w-[680px]">
                {currentDisplayStep.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
