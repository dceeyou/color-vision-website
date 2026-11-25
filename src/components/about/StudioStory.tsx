"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AboutStoryData } from "@/lib/about/types";

interface StudioStoryProps {
  data: AboutStoryData;
}

export default function StudioStory({ data }: StudioStoryProps) {
  const containerRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingRef.current,
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
      id="story"
      ref={containerRef}
      aria-label="Color Vision Story"
      className="relative w-full py-20 sm:py-28 md:py-32 border-b border-white/[0.08] overflow-hidden scroll-mt-28"
    >
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div ref={headingRef} className="max-w-[780px] mb-12 sm:mb-16">
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

        {/* Editorial Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Large Editorial Highlight Statement */}
          <div className="lg:col-span-5 space-y-6">
            <blockquote className="border-l-2 border-[#FF5108] pl-6 sm:pl-8 py-2">
              <p className="font-editorial italic text-[24px] sm:text-[28px] md:text-[32px] leading-[1.3] text-[#F4F2ED]">
                &ldquo;{data.highlightStatement}&rdquo;
              </p>
            </blockquote>

            <div className="pt-4 pl-6 sm:pl-8 flex items-center gap-4 text-[12px] font-mono tracking-wider text-[#8E9098] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5108]" />
              <span>Independent Studio · Established 2020</span>
            </div>
          </div>

          {/* Right Column: Story Prose */}
          <div className="lg:col-span-7 space-y-6 text-[#B2B4BC] text-[16px] sm:text-[17.5px] leading-[1.78] font-[400]">
            {data.paragraphs.map((paragraph, idx) => (
              <p key={idx} className="first:text-[#F4F2ED] first:font-[500]">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
