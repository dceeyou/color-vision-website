"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProcessStep } from "@/lib/wordpress/types";

interface ProcessProps {
  steps?: ProcessStep[];
}

export default function Process({ steps: propSteps }: ProcessProps) {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  const [activeStep, setActiveStep] = useState<number>(4);

  // 5 Canonical process steps
  const defaultSteps: ProcessStep[] = [
    {
      id: "1",
      stepNumber: "01",
      stepLabel: "DISCOVER",
      title: "Understand the challenge",
      description:
        "We learn about your business, audience, goals, competitors, challenges and opportunities. This gives us the context to understand what the project really needs.",
    },
    {
      id: "2",
      stepNumber: "02",
      stepLabel: "DEFINE",
      title: "Find the right direction",
      description:
        "We bring the findings together, establish priorities and create a clear direction for the project.",
    },
    {
      id: "3",
      stepNumber: "03",
      stepLabel: "DESIGN",
      title: "Explore the possibilities",
      description:
        "We translate ideas into concepts, wireframes, interfaces, identity systems and meaningful digital experiences.",
    },
    {
      id: "4",
      stepNumber: "04",
      stepLabel: "REFINE",
      title: "Make the details count",
      description:
        "We review, test and refine the work to improve usability, clarity, consistency and visual quality.",
    },
    {
      id: "5",
      stepNumber: "05",
      stepLabel: "DELIVER",
      title: "Ready for the real world",
      description:
        "We prepare the final assets, specifications and documentation for a smooth transition into production.",
    },
  ];

  const steps = propSteps && propSteps.length >= 5 ? propSteps : defaultSteps;

  // Normalized node configuration matching SVG coordinates (1000 x 500)
  const milestoneNodes = [
    { leftPercent: "10%", topPercent: "52%", isBelow: true },
    { leftPercent: "30%", topPercent: "39%", isBelow: false },
    { leftPercent: "50%", topPercent: "52%", isBelow: true },
    { leftPercent: "70%", topPercent: "39%", isBelow: false },
    { leftPercent: "90%", topPercent: "52%", isBelow: true },
  ];

  // Continuous S-curved path passing through all 5 normalized nodes (1000 x 500)
  const sCurvedTimelinePath =
    "M 25,260 C 60,260 75,260 100,260 C 170,260 230,195 300,195 C 370,195 430,260 500,260 C 570,260 630,195 700,195 C 770,195 830,260 900,260 C 925,260 950,260 975,260";

  // Scroll-triggered path drawing & sequential milestone activation
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Header reveal
    if (headerRef.current) {
      if (isReduced) {
        gsap.set(headerRef.current, { opacity: 1, y: 0 });
      } else {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
            },
          }
        );
      }
    }

    const path = pathRef.current;
    if (!path) return;

    const totalLength = path.getTotalLength();

    if (isReduced) {
      gsap.set(path, { strokeDasharray: totalLength, strokeDashoffset: 0 });
      setActiveStep(4);
      return;
    }

    // Set initial stroke offset
    gsap.set(path, {
      strokeDasharray: totalLength,
      strokeDashoffset: totalLength,
    });

    const ctx = gsap.context(() => {
      // Natural scroll-triggered path drawing (no long pin, no scroll-jacking)
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 2.0,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 65%",
          once: true,
        },
        onUpdate: function () {
          const progress = this.progress();
          if (progress < 0.2) setActiveStep(0);
          else if (progress < 0.42) setActiveStep(1);
          else if (progress < 0.65) setActiveStep(2);
          else if (progress < 0.88) setActiveStep(3);
          else setActiveStep(4);
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      ref={containerRef}
      aria-label="Color Vision Process"
      className="relative w-full bg-transparent py-20 md:py-24 lg:py-28 border-b border-white/[0.06] overflow-hidden select-none"
    >
      <div className="w-full max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
        {/* =========================================================================
            SECTION INTRODUCTION
            ========================================================================= */}
        <div
          ref={headerRef}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 lg:gap-16 mb-12 md:mb-16"
        >
          {/* Eyebrow + Heading */}
          <div className="lg:w-7/12">
            <div className="flex items-center gap-2.5 mb-5 sm:mb-6">
              <span
                className="w-1.5 h-1.5 rounded-full bg-[#FF5108] inline-block shadow-[0_0_8px_rgba(255,81,8,0.7)]"
                aria-hidden="true"
              />
              <p className="uppercase tracking-[0.24em] text-[11px] sm:text-[12px] md:text-[13px] font-[600] text-[#8E9098]">
                OUR PROCESS
              </p>
              <span className="text-[#737680] font-mono text-[10px] sm:text-[11px] tracking-widest ml-1 hidden sm:inline-block">
                (05 STAGES)
              </span>
            </div>

            <h2 className="text-[36px] sm:text-[46px] md:text-[54px] lg:text-[62px] font-[800] leading-[1.05] tracking-[-0.03em] select-none">
              <span className="text-[#F4F2ED]">From idea </span>
              <span className="text-[#FF5108]">to impact.</span>
            </h2>
          </div>

          {/* Supporting Description */}
          <div className="lg:w-5/12 flex justify-start lg:justify-end pb-1">
            <p className="text-[#8E9098] text-[15px] sm:text-[16px] md:text-[17px] leading-[1.7] font-[400] max-w-[480px]">
              A thoughtful journey from understanding the challenge to delivering meaningful
              design. Every stage brings clarity, purpose and direction to the final experience.
            </p>
          </div>
        </div>

        {/* =========================================================================
            DESKTOP & TABLET LAYOUT — HORIZONTAL CURVED TIMELINE (md and up)
            ========================================================================= */}
        <div className="hidden md:block relative w-full h-[500px] lg:h-[520px]">
          {/* SVG Canvas for S-curved Timeline */}
          <svg
            viewBox="0 0 1000 500"
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
            preserveAspectRatio="none"
          >
            {/* Base subtle guide path */}
            <path
              d={sCurvedTimelinePath}
              fill="none"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="2"
              strokeDasharray="4 6"
              vectorEffect="non-scaling-stroke"
            />

            {/* Animated primary orange path */}
            <path
              ref={pathRef}
              d={sCurvedTimelinePath}
              fill="none"
              stroke="#FF5108"
              strokeWidth="2.5"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* Connected Process Nodes & Editorial Milestone Content */}
          <div className="absolute inset-0 w-full h-full pointer-events-auto">
            {steps.map((step, i) => {
              const node = milestoneNodes[i];
              const isBelow = node.isBelow;
              const isActive = i === activeStep;
              const isCompleted = i <= activeStep;

              return (
                <div key={step.id}>
                  {/* Timeline Node Circle */}
                  <div
                    style={{
                      left: node.leftPercent,
                      top: node.topPercent,
                    }}
                    onMouseEnter={() => setActiveStep(i)}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
                    role="button"
                    tabIndex={0}
                    aria-label={`Milestone ${step.stepNumber}: ${step.title}`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setActiveStep(i);
                      }
                    }}
                  >
                    {/* Atmospheric glow ring when active */}
                    <div
                      className={`absolute inset-0 -m-2 rounded-full transition-all duration-300 pointer-events-none ${
                        isActive
                          ? "bg-[#FF5108]/20 scale-125"
                          : "bg-transparent scale-100"
                      }`}
                    />

                    {/* Circular node */}
                    <div
                      className={`relative w-8 h-8 rounded-full bg-[#08090D] border-2 transition-all duration-300 flex items-center justify-center font-mono text-[11px] font-[700] ${
                        isActive
                          ? "border-[#FF5108] text-[#F4F2ED] scale-110 shadow-[0_0_14px_rgba(255,81,8,0.6)]"
                          : isCompleted
                          ? "border-[#FF5108] text-[#F4F2ED]"
                          : "border-white/20 text-[#8E9098]"
                      }`}
                    >
                      {step.stepNumber}
                    </div>

                    {/* Connecting stem line linking node to content */}
                    <div
                      className={`w-[1.5px] h-6 absolute left-1/2 -translate-x-1/2 transition-colors duration-300 pointer-events-none ${
                        isBelow ? "top-full" : "bottom-full"
                      } ${
                        isCompleted
                          ? "bg-gradient-to-b from-[#FF5108] to-[#FF5108]/30"
                          : "bg-white/10"
                      }`}
                    />
                  </div>

                  {/* Editorial Milestone Text Block */}
                  <div
                    onMouseEnter={() => setActiveStep(i)}
                    style={{
                      left: node.leftPercent,
                      top: isBelow ? "calc(52% + 24px)" : "auto",
                      bottom: isBelow ? "auto" : "calc(100% - 39% + 24px)",
                      transform: "translateX(-50%)",
                    }}
                    className={`absolute w-[180px] lg:w-[210px] xl:w-[230px] flex flex-col cursor-pointer transition-all duration-400 group select-none ${
                      isActive
                        ? "opacity-100 scale-100 z-30"
                        : isCompleted
                        ? "opacity-85 scale-100 z-20"
                        : "opacity-45 scale-[0.98] z-10 hover:opacity-85"
                    }`}
                  >
                    {/* Subtle Large Translucent Background Number */}
                    <span
                      aria-hidden="true"
                      className={`absolute -top-4 -left-1 font-mono text-[60px] lg:text-[72px] font-[800] leading-none transition-colors duration-400 pointer-events-none select-none ${
                        isActive
                          ? "text-[#FF5108]/[0.10]"
                          : "text-white/[0.03] group-hover:text-white/[0.06]"
                      }`}
                    >
                      {step.stepNumber}
                    </span>

                    {/* Relative Content */}
                    <div className="relative z-10 pt-1">
                      {/* Step Label */}
                      <span className="text-[10.5px] lg:text-[11.5px] font-[700] uppercase tracking-[0.2em] text-[#FF5108] block mb-1">
                        {step.stepNumber} — {step.stepLabel}
                      </span>

                      {/* Heading */}
                      <h3 className="text-[15px] lg:text-[17px] font-[700] text-[#F4F2ED] tracking-[-0.02em] mb-1.5 leading-[1.3] group-hover:text-white transition-colors">
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p className="text-[12px] lg:text-[13px] text-[#8E9098] leading-[1.6] font-[400] group-hover:text-[#A6A8AE] transition-colors">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            MOBILE LAYOUT — COMPACT VERTICAL TIMELINE (< md)
            ========================================================================= */}
        <div className="block md:hidden relative pl-3 pr-1 mt-6">
          {/* Vertical continuous orange timeline line */}
          <div
            className="absolute left-[27px] top-4 bottom-8 w-[2px] bg-gradient-to-b from-[#FF5108] via-[#FF5108]/70 to-[#FF5108]/20"
            aria-hidden="true"
          />

          <div className="flex flex-col gap-9">
            {steps.map((step) => (
              <div
                key={`mobile-${step.id}`}
                className="relative flex items-start gap-4 group"
              >
                {/* Numbered node circle on the vertical line */}
                <div className="relative z-10 w-9 h-9 rounded-full bg-[#08090D] border-2 border-[#FF5108] flex items-center justify-center font-mono text-[11px] font-[700] text-[#F4F2ED] shrink-0 shadow-[0_0_10px_rgba(255,81,8,0.3)] mt-0.5">
                  {step.stepNumber}
                </div>

                {/* Content */}
                <div className="flex-1 relative pt-0.5">
                  {/* Subtle Background Number */}
                  <span
                    aria-hidden="true"
                    className="absolute -top-3 right-0 font-mono text-[44px] font-[800] leading-none text-white/[0.04] pointer-events-none select-none"
                  >
                    {step.stepNumber}
                  </span>

                  {/* Step Label */}
                  <span className="text-[10px] font-[700] uppercase tracking-[0.2em] text-[#FF5108] block mb-1">
                    {step.stepNumber} — {step.stepLabel}
                  </span>

                  {/* Heading */}
                  <h3 className="text-[16px] font-[700] text-[#F4F2ED] tracking-[-0.02em] leading-snug mb-1.5">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[13px] text-[#8E9098] leading-[1.6] font-[400]">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
