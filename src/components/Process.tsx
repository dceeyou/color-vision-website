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
  const leftColRef = useRef<HTMLDivElement>(null);
  const timelineColRef = useRef<HTMLDivElement>(null);
  const desktopPathRef = useRef<SVGPathElement>(null);

  // Active step index (0 to 4)
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isInViewport, setIsInViewport] = useState<boolean>(false);
  const [isUserInteracting, setIsUserInteracting] = useState<boolean>(false);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);
  const [pathLength, setPathLength] = useState<number>(650);

  const interactionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 5 Approved Process Steps with exact canonical copy
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

  // Desktop timeline coordinates (viewBox="0 0 540 640")
  // Nodes placed along a vertical serpentine curve with alternating X positions
  const desktopNodes = [
    { x: 42, y: 48, textLeft: 106 },   // Node 01: left peak
    { x: 98, y: 180, textLeft: 162 },  // Node 02: right peak
    { x: 42, y: 312, textLeft: 106 },  // Node 03: left peak
    { x: 98, y: 444, textLeft: 162 },  // Node 04: right peak
    { x: 42, y: 576, textLeft: 106 },  // Node 05: left peak
  ];

  // Continuous vertical cubic Bézier curve through all 5 milestone nodes
  // Starts directly at center of Node 01 (42, 48) and smoothly weaves through all nodes to Node 05 (42, 576)
  const curvedTimelinePath =
    "M 42,48 C 42,114 98,114 98,180 C 98,246 42,246 42,312 C 42,378 98,378 98,444 C 98,510 42,510 42,576";

  // Fractions of path length corresponding to each milestone node (0%, 25%, 50%, 75%, 100%)
  const milestoneFractions = [0.0, 0.25, 0.5, 0.75, 1.0];

  // Handle manual user selection (click or keyboard Enter/Space)
  const handleSelectStep = useCallback((index: number) => {
    setActiveStep(index);
    setIsUserInteracting(true);

    if (interactionTimeoutRef.current) {
      clearTimeout(interactionTimeoutRef.current);
    }

    // Resume automatic sequential animation after 4.5s of manual pause
    interactionTimeoutRef.current = setTimeout(() => {
      setIsUserInteracting(false);
    }, 4500);
  }, []);

  // Measure path length on mount
  useEffect(() => {
    if (desktopPathRef.current) {
      try {
        const total = desktopPathRef.current.getTotalLength();
        if (total && total > 0) {
          setPathLength(total);
        }
      } catch {
        // Fallback default
      }
    }
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

  // IntersectionObserver to pause when section leaves viewport and resume when visible
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsInViewport(entry.isIntersecting && entry.intersectionRatio >= 0.2);
      },
      {
        threshold: [0, 0.2, 0.5, 0.8],
        rootMargin: "0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Automatic Sequential Animation Loop:
  // Advances through 01 -> 02 -> 03 -> 04 -> 05 (active ~2.4s each).
  // Step 05 holds final state for 2.4s, then smoothly resets back to 01.
  useEffect(() => {
    if (!isInViewport || isUserInteracting || isReducedMotion) {
      return;
    }

    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 5);
    }, 2400);

    return () => clearInterval(timer);
  }, [isInViewport, isUserInteracting, isReducedMotion]);

  // Cleanup interaction timeout on unmount
  useEffect(() => {
    return () => {
      if (interactionTimeoutRef.current) {
        clearTimeout(interactionTimeoutRef.current);
      }
    };
  }, []);

  // Subtle GSAP scroll reveal for the section container
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) {
      if (leftColRef.current) gsap.set(leftColRef.current, { opacity: 1, y: 0 });
      if (timelineColRef.current) gsap.set(timelineColRef.current, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      if (leftColRef.current) {
        gsap.fromTo(
          leftColRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: leftColRef.current,
              start: "top 85%",
            },
          }
        );
      }

      if (timelineColRef.current) {
        gsap.fromTo(
          timelineColRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            delay: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: timelineColRef.current,
              start: "top 85%",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Calculate dynamic strokeDashoffset for desktop curved timeline
  const activeFraction = isReducedMotion ? 1.0 : milestoneFractions[activeStep] ?? 1.0;
  const strokeDashoffset = pathLength * (1 - activeFraction);

  return (
    <section
      id="process"
      ref={containerRef}
      aria-label="Color Vision Process"
      className="relative w-full bg-[#08090D] py-20 md:py-28 lg:py-32 border-b border-white/[0.06] overflow-hidden select-none"
    >
      {/* Subtle ambient orange glow behind timeline (no harsh light) */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full bg-[radial-gradient(circle,rgba(255,81,8,0.06)_0%,transparent_70%)] pointer-events-none blur-3xl"
        aria-hidden="true"
      />

      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* =========================================================================
              LEFT COLUMN — EDITORIAL INTRODUCTION
              ========================================================================= */}
          <div
            ref={leftColRef}
            className="lg:col-span-5 lg:sticky lg:top-32 self-start flex flex-col justify-start"
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-2.5 mb-5 sm:mb-6">
              <span
                className="w-1.5 h-1.5 rounded-full bg-[#FF5108] inline-block shadow-[0_0_8px_rgba(255,81,8,0.8)]"
                aria-hidden="true"
              />
              <p className="uppercase tracking-[0.24em] text-[11px] sm:text-[12px] md:text-[13px] font-[600] text-[#8E9098]">
                OUR APPROACH / THE PROCESS
              </p>
            </div>

            {/* Main Editorial Heading */}
            <h2 className="text-[34px] sm:text-[42px] md:text-[46px] lg:text-[50px] font-[800] leading-[1.08] tracking-[-0.03em] text-[#F4F2ED] mb-6">
              Good design starts with the right questions.
            </h2>

            {/* Supporting Description */}
            <p className="text-[#8E9098] text-[15px] sm:text-[16px] md:text-[17px] leading-[1.7] font-[400] max-w-[460px] mb-8">
              Every meaningful experience begins with understanding. We take the time to explore the
              challenge, define the right direction, and turn ideas into thoughtful design
              solutions. Our process brings clarity to every stage, from the first conversation to
              the final delivery.
            </p>

            {/* Stage Progress Counter / Minimal Status Indicator */}
            <div className="pt-6 border-t border-white/[0.08] flex items-center justify-between max-w-[460px]">
              <div className="flex items-center gap-1.5">
                {[0, 1, 2, 3, 4].map((idx) => {
                  const isCurrent = idx === activeStep;
                  const isPast = idx < activeStep;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectStep(idx)}
                      aria-label={`Jump to stage 0${idx + 1}`}
                      className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF5108] ${
                        isCurrent
                          ? "w-8 bg-[#FF5108] shadow-[0_0_8px_rgba(255,81,8,0.6)]"
                          : isPast
                          ? "w-2.5 bg-[#FF5108]/50 hover:bg-[#FF5108]/80"
                          : "w-2.5 bg-white/15 hover:bg-white/30"
                      }`}
                    />
                  );
                })}
              </div>

              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] sm:text-[12px] font-[600] text-[#8E9098] tracking-wider">
                  STAGE 0{activeStep + 1} OF 05
                </span>
                <span
                  className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                    isUserInteracting
                      ? "bg-amber-400"
                      : isInViewport
                      ? "bg-[#FF5108] animate-pulse"
                      : "bg-[#777982]"
                  }`}
                  title={isUserInteracting ? "Manual override active" : "Auto-progression active"}
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>

          {/* =========================================================================
              RIGHT COLUMN — CURVED VERTICAL TIMELINE
              ========================================================================= */}
          <div ref={timelineColRef} className="lg:col-span-7 w-full">
            {/* Desktop & Tablet Curved Serpentine Timeline (md and up) */}
            <div className="hidden md:block relative w-full max-w-[580px] lg:max-w-none mx-auto h-[640px]">
              {/* SVG Canvas for Curved Timeline */}
              <svg
                viewBox="0 0 540 640"
                className="absolute inset-0 w-full h-full pointer-events-none z-10"
                preserveAspectRatio="none"
              >
                {/* Background inactive curve */}
                <path
                  d={curvedTimelinePath}
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.16)"
                  strokeWidth="2"
                  strokeDasharray="4 6"
                  vectorEffect="non-scaling-stroke"
                />

                {/* Animated active orange curve */}
                <path
                  ref={desktopPathRef}
                  d={curvedTimelinePath}
                  fill="none"
                  stroke="#FF5108"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  style={{
                    strokeDasharray: pathLength,
                    strokeDashoffset: strokeDashoffset,
                    transition: isReducedMotion
                      ? "none"
                      : "stroke-dashoffset 0.8s cubic-bezier(0.25, 1, 0.5, 1)",
                  }}
                  vectorEffect="non-scaling-stroke"
                />
              </svg>

              {/* 5 Milestone Nodes & Editorial Content Blocks */}
              <div className="absolute inset-0 w-full h-full pointer-events-auto">
                {steps.map((step, i) => {
                  const node = desktopNodes[i];
                  const isActive = i === activeStep;
                  const isCompleted = i <= activeStep;

                  return (
                    <div key={step.id}>
                      {/* Hairline connector line linking node to content */}
                      <div
                        style={{
                          left: `${node.x + 18}px`,
                          top: `${node.y}px`,
                          width: `${node.textLeft - (node.x + 18)}px`,
                        }}
                        className={`absolute h-[1.5px] -translate-y-1/2 pointer-events-none transition-all duration-500 ${
                          isActive
                            ? "bg-[#FF5108] shadow-[0_0_8px_rgba(255,81,8,0.6)] opacity-100"
                            : isCompleted
                            ? "bg-[#FF5108]/50 opacity-70"
                            : "bg-white/[0.12] opacity-40"
                        }`}
                        aria-hidden="true"
                      />

                      {/* Numbered Milestone Node Circle (Accessible Button) */}
                      <button
                        type="button"
                        onClick={() => handleSelectStep(i)}
                        onFocus={() => handleSelectStep(i)}
                        style={{
                          left: `${node.x}px`,
                          top: `${node.y}px`,
                        }}
                        aria-label={`Milestone ${step.stepNumber}: ${step.title}`}
                        aria-pressed={isActive}
                        className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5108] focus-visible:ring-offset-2 focus-visible:ring-offset-[#08090D] rounded-full"
                      >
                        {/* Ambient glow halo ring when active */}
                        <div
                          className={`absolute inset-0 -m-2 rounded-full transition-all duration-500 pointer-events-none ${
                            isActive
                              ? "bg-[#FF5108]/25 scale-125"
                              : "bg-transparent scale-100"
                          }`}
                          aria-hidden="true"
                        />

                        {/* Circular node */}
                        <div
                          className={`relative w-9 h-9 rounded-full bg-[#08090D] border-2 transition-all duration-500 flex items-center justify-center font-mono text-[11px] font-[700] ${
                            isActive
                              ? "border-[#FF5108] text-[#FF5108] scale-110 shadow-[0_0_16px_rgba(255,81,8,0.5)]"
                              : isCompleted
                              ? "border-[#FF5108]/70 text-[#F4F2ED]"
                              : "border-white/[0.18] text-[#8E9098] group-hover:border-white/40 group-hover:text-white"
                          }`}
                        >
                          {step.stepNumber}
                        </div>
                      </button>

                      {/* Milestone Editorial Text Content Block */}
                      <div
                        onClick={() => handleSelectStep(i)}
                        style={{
                          left: `${node.textLeft}px`,
                          top: `${node.y - 28}px`,
                          maxWidth: `calc(100% - ${node.textLeft + 16}px)`,
                        }}
                        className={`absolute flex flex-col cursor-pointer transition-all duration-500 group select-none pr-4 ${
                          isActive
                            ? "opacity-100 translate-x-1 z-30"
                            : isCompleted
                            ? "opacity-85 translate-x-0 z-20 hover:opacity-100"
                            : "opacity-60 translate-x-0 z-10 hover:opacity-90"
                        }`}
                        role="region"
                        aria-label={`Stage ${step.stepNumber} description`}
                      >
                        {/* Step Label (e.g. 01 — DISCOVER) */}
                        <span
                          className={`text-[11px] font-[700] uppercase tracking-[0.2em] block mb-1 transition-colors duration-400 ${
                            isActive
                              ? "text-[#FF5108]"
                              : isCompleted
                              ? "text-[#FF5108]/80"
                              : "text-[#8E9098] group-hover:text-[#B5B5BC]"
                          }`}
                        >
                          {step.stepNumber} — {step.stepLabel}
                        </span>

                        {/* Milestone Subtitle / Heading */}
                        <h3
                          className={`text-[17px] lg:text-[18px] font-[700] tracking-[-0.02em] mb-1.5 leading-[1.3] transition-colors duration-400 ${
                            isActive
                              ? "text-[#F4F2ED]"
                              : isCompleted
                              ? "text-[#E6E4DC]"
                              : "text-[#92939B] group-hover:text-[#F4F2ED]"
                          }`}
                        >
                          {step.title}
                        </h3>

                        {/* Concise Description */}
                        <p
                          className={`text-[13px] lg:text-[14px] leading-[1.65] font-[400] transition-colors duration-400 max-w-[440px] ${
                            isActive
                              ? "text-[#C4C5CC]"
                              : isCompleted
                              ? "text-[#9E9FA7]"
                              : "text-[#777982] group-hover:text-[#9E9FA7]"
                          }`}
                        >
                          {step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Mobile Compact Vertical Timeline (< md) */}
            <div className="block md:hidden relative pl-4 pr-1 mt-2">
              {/* Vertical continuous guide line */}
              <div
                className="absolute left-[33px] top-4 bottom-8 w-[2px] bg-white/[0.12]"
                aria-hidden="true"
              />

              {/* Animated active progress vertical line */}
              <div
                style={{
                  height: `${(activeStep / 4) * 100}%`,
                  maxHeight: "calc(100% - 32px)",
                  transition: isReducedMotion ? "none" : "height 0.6s cubic-bezier(0.25, 1, 0.5, 1)",
                }}
                className="absolute left-[33px] top-4 w-[2px] bg-[#FF5108] shadow-[0_0_8px_rgba(255,81,8,0.7)]"
                aria-hidden="true"
              />

              <div className="flex flex-col gap-8">
                {steps.map((step, i) => {
                  const isActive = i === activeStep;
                  const isCompleted = i <= activeStep;

                  return (
                    <div
                      key={`mobile-${step.id}`}
                      onClick={() => handleSelectStep(i)}
                      className={`relative flex items-start gap-4 cursor-pointer transition-all duration-400 group ${
                        isActive ? "opacity-100" : isCompleted ? "opacity-85" : "opacity-60"
                      }`}
                      role="button"
                      tabIndex={0}
                      aria-label={`Milestone ${step.stepNumber}: ${step.title}`}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handleSelectStep(i);
                        }
                      }}
                    >
                      {/* Numbered Node Circle */}
                      <div
                        className={`relative z-10 w-9 h-9 rounded-full bg-[#08090D] border-2 transition-all duration-400 flex items-center justify-center font-mono text-[11px] font-[700] shrink-0 mt-0.5 ${
                          isActive
                            ? "border-[#FF5108] text-[#FF5108] scale-110 shadow-[0_0_12px_rgba(255,81,8,0.5)]"
                            : isCompleted
                            ? "border-[#FF5108]/70 text-[#F4F2ED]"
                            : "border-white/[0.18] text-[#8E9098]"
                        }`}
                      >
                        {step.stepNumber}
                      </div>

                      {/* Content Block */}
                      <div className="flex-1 relative pt-0.5">
                        {/* Step Label */}
                        <span
                          className={`text-[10.5px] font-[700] uppercase tracking-[0.2em] block mb-1 transition-colors ${
                            isActive
                              ? "text-[#FF5108]"
                              : isCompleted
                              ? "text-[#FF5108]/80"
                              : "text-[#8E9098]"
                          }`}
                        >
                          {step.stepNumber} — {step.stepLabel}
                        </span>

                        {/* Title */}
                        <h3
                          className={`text-[16px] font-[700] tracking-[-0.02em] leading-snug mb-1.5 transition-colors ${
                            isActive ? "text-[#F4F2ED]" : "text-[#92939B]"
                          }`}
                        >
                          {step.title}
                        </h3>

                        {/* Description */}
                        <p
                          className={`text-[13px] leading-[1.6] font-[400] transition-colors ${
                            isActive ? "text-[#C4C5CC]" : "text-[#777982]"
                          }`}
                        >
                          {step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
