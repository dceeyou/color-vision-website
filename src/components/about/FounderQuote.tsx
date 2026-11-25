"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FounderQuoteData } from "@/lib/about/types";

interface FounderQuoteProps {
  data: FounderQuoteData;
}

export default function FounderQuote({ data }: FounderQuoteProps) {
  const containerRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      if (quoteRef.current) {
        gsap.fromTo(
          quoteRef.current,
          { opacity: 0, scale: 0.98, y: 30 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: quoteRef.current,
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
      aria-label="Founder Design Philosophy Statement"
      className="relative w-full py-20 sm:py-28 md:py-36 border-b border-white/[0.08] bg-[#050609] overflow-hidden"
    >
      {/* Ambient background glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse,rgba(255,81,8,0.06)_0%,transparent_70%)] blur-3xl"
        aria-hidden="true"
      />

      <div className="w-full max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div ref={quoteRef} className="space-y-8 sm:space-y-10">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5108]" />
            <span className="font-mono uppercase text-[11px] tracking-[0.2em] font-[600] text-[#8E9098]">
              DESIGN PHILOSOPHY
            </span>
          </div>

          {/* Main Statement with Instrument Serif Accent */}
          <blockquote className="text-[30px] sm:text-[44px] md:text-[54px] lg:text-[60px] font-[800] leading-[1.12] tracking-[-0.03em] text-[#F4F2ED] max-w-[960px] mx-auto">
            <span>&ldquo;{data.quoteLine1} {data.quoteLine2} </span>
            <span className="font-editorial italic font-[400] text-[#FF5108]">
              {data.quoteHighlight}
            </span>
            <span>&rdquo;</span>
          </blockquote>

          {/* Supporting Text */}
          <p className="text-[#B2B4BC] text-[16px] sm:text-[18px] md:text-[20px] leading-[1.65] font-[400] max-w-[720px] mx-auto">
            {data.supportingText}
          </p>

          {/* Attribution */}
          <div className="pt-4 flex items-center justify-center gap-3 text-[12px] font-mono tracking-wider text-[#8E9098] uppercase">
            <span>Dilshan Udawatta</span>
            <span className="text-[#FF5108]">•</span>
            <span>Founder & Lead Designer</span>
          </div>
        </div>
      </div>
    </section>
  );
}
