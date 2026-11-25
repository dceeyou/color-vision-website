"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { AboutHeroData } from "@/lib/about/types";

interface AboutHeroProps {
  data: AboutHeroData;
}

export default function AboutHero({ data }: AboutHeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (titleRef.current) {
        tl.fromTo(
          titleRef.current,
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 1 }
        );
      }

      if (textRef.current) {
        tl.fromTo(
          textRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.6"
        );
      }

      if (metaRef.current) {
        tl.fromTo(
          metaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.5"
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      aria-label="About Color Vision Hero"
      className="relative w-full pt-32 sm:pt-40 md:pt-48 pb-16 sm:pb-24 border-b border-white/[0.08] overflow-hidden"
    >
      {/* Subtle atmospheric ambient glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-[radial-gradient(circle_at_50%_10%,rgba(255,81,8,0.07)_0%,transparent_65%)] blur-3xl"
        aria-hidden="true"
      />

      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Eyebrow */}
        <div className="flex items-center gap-2.5 mb-6 sm:mb-8">
          <span
            className="w-1.5 h-1.5 rounded-full bg-[#FF5108] inline-block shadow-[0_0_8px_rgba(255,81,8,0.8)]"
            aria-hidden="true"
          />
          <p className="uppercase tracking-[0.24em] text-[11px] sm:text-[12px] md:text-[13px] font-[600] text-[#8E9098]">
            {data.eyebrow}
          </p>
        </div>

        {/* Main Heading */}
        <h1
          ref={titleRef}
          className="text-[40px] sm:text-[58px] md:text-[74px] lg:text-[88px] font-[800] leading-[1.02] tracking-[-0.035em] text-[#F4F2ED] max-w-[1080px] mb-8 sm:mb-10"
        >
          <span>{data.headingLine1}</span>
          <br />
          <span className="text-[#F4F2ED]">{data.headingLine2}</span>
        </h1>

        {/* Supporting Description */}
        <p
          ref={textRef}
          className="text-[#B2B4BC] text-[18px] sm:text-[21px] md:text-[23px] leading-[1.55] font-[400] max-w-[760px] mb-12 sm:mb-16"
        >
          {data.description}
        </p>

        {/* Studio Meta Strip */}
        <div
          ref={metaRef}
          className="pt-8 border-t border-white/[0.08] grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8"
        >
          <div>
            <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#737680] font-[600] mb-1.5">
              Founded
            </div>
            <div className="text-[14px] sm:text-[15px] font-[600] text-[#F4F2ED]">
              May 2020
            </div>
          </div>
          <div>
            <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#737680] font-[600] mb-1.5">
              Studio Base
            </div>
            <div className="text-[14px] sm:text-[15px] font-[600] text-[#F4F2ED]">
              Colombo, Sri Lanka
            </div>
          </div>
          <div>
            <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#737680] font-[600] mb-1.5">
              Discipline
            </div>
            <div className="text-[14px] sm:text-[15px] font-[600] text-[#F4F2ED]">
              Brand & Digital Products
            </div>
          </div>
          <div>
            <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#737680] font-[600] mb-1.5">
              Founder & Lead
            </div>
            <div className="text-[14px] sm:text-[15px] font-[600] text-[#F4F2ED]">
              Dilshan Udawatta
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
