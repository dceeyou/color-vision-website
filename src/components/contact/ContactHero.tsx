"use client";

import React from "react";
import { ContactHeroData } from "@/lib/contact/types";

interface ContactHeroProps {
  data: ContactHeroData;
}

export default function ContactHero({ data }: ContactHeroProps) {
  return (
    <section
      aria-label="Contact Introduction"
      className="relative w-full pt-32 sm:pt-36 md:pt-44 pb-14 sm:pb-16 md:pb-20 border-b border-white/[0.06] overflow-hidden"
    >
      {/* Ambient background glow */}
      <div
        className="pointer-events-none absolute left-1/2 -top-24 -translate-x-1/2 w-[700px] h-[350px] bg-[radial-gradient(ellipse,rgba(255,81,8,0.06)_0%,transparent_70%)] blur-3xl"
        aria-hidden="true"
      />

      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.035] backdrop-blur-md mb-6 sm:mb-8">
          <span
            className="w-1.5 h-1.5 rounded-full bg-[#FF5108] inline-block shadow-[0_0_8px_rgba(255,81,8,0.8)] animate-pulse"
            aria-hidden="true"
          />
          <p className="uppercase tracking-[0.22em] text-[11px] sm:text-[12px] font-[600] text-[#8E9098]">
            {data.eyebrow}
          </p>
        </div>

        {/* Main Headline */}
        <h1 className="text-[40px] sm:text-[56px] md:text-[68px] lg:text-[76px] font-[800] tracking-[-0.035em] leading-[1.05] text-[#F4F2ED] max-w-4xl mx-auto">
          <span>{data.headingLine1} </span>
          <span className="block sm:inline font-editorial italic font-[400] text-[#FF5108]">
            {data.headingLine2}
          </span>
        </h1>

        {/* Supporting Description */}
        <p className="mt-6 sm:mt-8 text-[#92939B] text-[16px] sm:text-[17.5px] md:text-[18px] leading-[1.7] font-[400] max-w-2xl mx-auto">
          {data.description}
        </p>
      </div>
    </section>
  );
}
