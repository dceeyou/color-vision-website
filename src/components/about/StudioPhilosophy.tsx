"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AboutPhilosophyData } from "@/lib/about/types";

interface StudioPhilosophyProps {
  data: AboutPhilosophyData;
}

export default function StudioPhilosophy({ data }: StudioPhilosophyProps) {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) return;

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
      ref={containerRef}
      aria-label="Color Vision Philosophy"
      className="relative w-full py-20 sm:py-28 md:py-32 border-b border-white/[0.08] overflow-hidden"
    >
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="max-w-[780px] mb-14 sm:mb-20">
          <div className="flex items-center gap-2.5 mb-4 sm:mb-5">
            <span
              className="w-1.5 h-1.5 rounded-full bg-[#FF5108] inline-block shadow-[0_0_8px_rgba(255,81,8,0.8)]"
              aria-hidden="true"
            />
            <p className="uppercase tracking-[0.24em] text-[11px] sm:text-[12px] md:text-[13px] font-[600] text-[#8E9098]">
              {data.eyebrow}
            </p>
          </div>

          <h2 className="text-[32px] sm:text-[44px] md:text-[54px] font-[800] leading-[1.1] tracking-[-0.03em] text-[#F4F2ED]">
            {data.heading}
          </h2>
        </div>

        {/* 4 Structured Editorial Principles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8">
          {data.principles.map((principle) => (
            <div
              key={principle.number}
              className="group relative pt-6 border-t border-white/[0.12] hover:border-[#FF5108] transition-colors duration-300"
            >
              {/* Number Label */}
              <div className="font-mono text-[13px] sm:text-[14px] font-[700] text-[#FF5108] mb-4 flex items-center justify-between">
                <span>{principle.number}</span>
                <span className="w-1 h-1 rounded-full bg-[#FF5108] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Title */}
              <h3 className="text-[17px] sm:text-[18px] md:text-[19px] font-[700] uppercase tracking-[0.04em] text-[#F4F2ED] mb-3 leading-[1.3] group-hover:text-[#FF5108] transition-colors duration-200">
                {principle.title}
              </h3>

              {/* Description */}
              <p className="text-[#8E9098] group-hover:text-[#B2B4BC] transition-colors duration-200 text-[14.5px] sm:text-[15px] leading-[1.65] font-[400]">
                {principle.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
