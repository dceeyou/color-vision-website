"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { AboutCTAData } from "@/lib/about/types";

interface AboutCTAProps {
  data: AboutCTAData;
}

export default function AboutCTA({ data }: AboutCTAProps) {
  const containerRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardRef.current,
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
      aria-label="Closing Call to Action"
      className="relative w-full py-24 sm:py-32 md:py-40 bg-[#08090D] overflow-hidden"
    >
      {/* Ambient background lighting */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[radial-gradient(circle,rgba(255,81,8,0.08)_0%,transparent_65%)] blur-3xl"
        aria-hidden="true"
      />

      <div className="w-full max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div ref={cardRef} className="space-y-6 sm:space-y-8">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5108]" />
            <span className="font-mono uppercase text-[11px] sm:text-[12px] tracking-[0.24em] font-[600] text-[#8E9098]">
              {data.eyebrow}
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-[36px] sm:text-[52px] md:text-[64px] font-[800] leading-[1.05] tracking-[-0.035em] text-[#F4F2ED] max-w-[850px] mx-auto">
            {data.heading}
          </h2>

          {/* Description */}
          <p className="text-[#B2B4BC] text-[16px] sm:text-[18px] md:text-[20px] leading-[1.65] font-[400] max-w-[620px] mx-auto">
            {data.description}
          </p>

          {/* Action Buttons */}
          <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
            {/* Primary Action */}
            <Link
              href={data.primaryAction.href}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#FF5108] text-[#08090D] font-[700] text-[13px] tracking-[0.14em] uppercase hover:bg-[#FF7A24] transition-all duration-300 shadow-[0_4px_24px_rgba(255,81,8,0.35)] hover:shadow-[0_6px_32px_rgba(255,81,8,0.5)] flex items-center justify-center gap-2 group"
            >
              <span>{data.primaryAction.label}</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            {/* Secondary Action */}
            <Link
              href={data.secondaryAction.href}
              className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/15 bg-white/[0.02] text-[#F4F2ED] font-[600] text-[13px] tracking-[0.14em] uppercase hover:border-[#FF5108]/60 hover:text-[#FF5108] transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <span>{data.secondaryAction.label}</span>
              <ArrowUpRight className="w-4 h-4 opacity-60 transition-transform duration-200 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
