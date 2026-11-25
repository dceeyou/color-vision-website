"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProcessStep } from "@/lib/wordpress/types";

interface ProcessProps {
  steps?: ProcessStep[];
}

export default function Process({ steps: propSteps }: ProcessProps) {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // Active step index (0 to 4). Exactly ONE step is always active.
  const [activeStep, setActiveStep] = useState<number>(0);

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

  // GSAP scroll reveal for the section header
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) {
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

        {/* =========================================================================
            2. INTERACTIVE HORIZONTAL STEP SELECTOR
            All 5 numbers remain visible simultaneously in a horizontal sequence.
            Clicking any step displays its title and description immediately to the
            RIGHT of the active number.
            ========================================================================= */}
        <div
          className="flex flex-col md:flex-row items-stretch w-full border-y border-white/[0.12] transition-all"
          role="region"
          aria-label="Interactive process stages selector"
        >
          {steps.map((step, i) => {
            const isActive = i === activeStep;

            return (
              <div
                key={step.id}
                onClick={() => setActiveStep(i)}
                className={`flex flex-row items-center border-b last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0 border-white/[0.12] transition-all duration-500 ease-out cursor-pointer group ${
                  isActive
                    ? "flex-1 min-w-0 bg-white/[0.02]"
                    : "flex-none md:w-[105px] lg:w-[130px] xl:w-[145px] hover:bg-white/[0.01]"
                }`}
                role="button"
                tabIndex={0}
                aria-pressed={isActive}
                aria-label={`Select stage ${step.stepNumber}: ${step.title}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveStep(i);
                  }
                }}
              >
                {/* Step Number & Label Block */}
                <div className="flex flex-col items-start p-4 sm:p-5 lg:p-5 shrink-0">
                  {/* Indicator Line & Step Label */}
                  <div className="flex items-center gap-2 mb-2 sm:mb-3 max-w-full overflow-hidden">
                    <span
                      className={`h-[1.5px] transition-all duration-400 shrink-0 ${
                        isActive
                          ? "w-6 bg-[#FF5108] shadow-[0_0_8px_rgba(255,81,8,0.7)]"
                          : "w-2.5 bg-white/20 group-hover:bg-white/40"
                      }`}
                      aria-hidden="true"
                    />
                    <span
                      className={`text-[10px] sm:text-[11px] lg:text-[12px] font-[600] uppercase tracking-[0.18em] transition-colors duration-400 truncate ${
                        isActive
                          ? "text-[#FF5108]"
                          : "text-[#484A50] group-hover:text-[#777982]"
                      }`}
                    >
                      {step.stepLabel}
                    </span>
                  </div>

                  {/* Oversized Step Number */}
                  <span
                    className={`font-sans text-[48px] sm:text-[60px] md:text-[68px] lg:text-[84px] xl:text-[96px] font-[700] leading-none tracking-[-0.04em] transition-all duration-400 select-none ${
                      isActive
                        ? "text-[#F4F2ED] scale-100"
                        : "text-[#484A50] group-hover:text-[#666870]"
                    }`}
                  >
                    {step.stepNumber}
                  </span>
                </div>

                {/* Description Block immediately to the RIGHT of the active number */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-out flex-1 min-w-0 py-4 sm:py-5 lg:py-6 ${
                    isActive
                      ? "opacity-100 pl-2 pr-4 sm:pr-6 lg:pr-8"
                      : "max-w-0 opacity-0 pointer-events-none p-0"
                  }`}
                  aria-hidden={!isActive}
                >
                  <div className="w-full min-w-0">
                    <span className="font-mono text-[10px] sm:text-[11px] font-[600] text-[#FF5108] uppercase tracking-widest block mb-1">
                      STAGE 0{i + 1}
                    </span>
                    <h3 className="text-[18px] sm:text-[20px] md:text-[22px] lg:text-[25px] font-[700] text-[#F4F2ED] tracking-[-0.025em] mb-1.5 leading-[1.25]">
                      {step.title}
                    </h3>
                    <p className="text-[12.5px] sm:text-[13.5px] md:text-[14px] lg:text-[14.5px] text-[#92939B] leading-[1.65] font-[400] max-w-[520px]">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
