"use client";

import React from "react";

export default function Marquee() {
  const items = [
    "STRATEGY",
    "IDENTITY",
    "DIGITAL",
    "EXPERIENCE",
    "PURPOSEFUL DESIGN",
  ];

  // We repeat the sequence to ensure an unbroken, seamless continuous loop across all screen sizes
  const repeatedItems = [...items, ...items, ...items, ...items];

  return (
    <section
      aria-label="Studio Capabilities Marquee"
      className="relative w-full bg-[#08090D] overflow-hidden py-10 md:py-14 lg:py-16 border-y border-white/[0.08] select-none"
    >
      {/* Subtle edge fade masks for smooth editorial entrance/exit */}
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 z-10 pointer-events-none bg-gradient-to-r from-[#08090D] to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 z-10 pointer-events-none bg-gradient-to-l from-[#08090D] to-transparent" />

      {/* Marquee Track */}
      <div className="w-full flex overflow-hidden">
        <div className="animate-marquee flex items-center shrink-0">
          {repeatedItems.map((item, index) => (
            <div key={index} className="flex items-center shrink-0">
              <span className="text-[38px] sm:text-[52px] md:text-[68px] lg:text-[86px] xl:text-[96px] font-[800] uppercase tracking-[-0.03em] leading-none text-[#F4F2ED] hover:text-[#FF5108] transition-colors duration-300 px-4 sm:px-6 md:px-8">
                {item}
              </span>
              
              {/* Precision 4-Point Geometric Star Separator */}
              <span className="px-2 sm:px-4 md:px-6 flex items-center justify-center shrink-0">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 text-[#FF5108] shrink-0 drop-shadow-[0_0_6px_rgba(255,81,8,0.5)]"
                  aria-hidden="true"
                >
                  <path
                    d="M10 0L12.4 7.6L20 10L12.4 12.4L10 20L7.6 12.4L0 10L7.6 7.6L10 0Z"
                    fill="#FF5108"
                  />
                </svg>
              </span>
            </div>
          ))}
        </div>

        {/* Duplicate Track for Flawless Seamless Loop */}
        <div className="animate-marquee flex items-center shrink-0" aria-hidden="true">
          {repeatedItems.map((item, index) => (
            <div key={`dup-${index}`} className="flex items-center shrink-0">
              <span className="text-[38px] sm:text-[52px] md:text-[68px] lg:text-[86px] xl:text-[96px] font-[800] uppercase tracking-[-0.03em] leading-none text-[#F4F2ED] hover:text-[#FF5108] transition-colors duration-300 px-4 sm:px-6 md:px-8">
                {item}
              </span>
              
              {/* Precision 4-Point Geometric Star Separator */}
              <span className="px-2 sm:px-4 md:px-6 flex items-center justify-center shrink-0">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 text-[#FF5108] shrink-0 drop-shadow-[0_0_6px_rgba(255,81,8,0.5)]"
                  aria-hidden="true"
                >
                  <path
                    d="M10 0L12.4 7.6L20 10L12.4 12.4L10 20L7.6 12.4L0 10L7.6 7.6L10 0Z"
                    fill="#FF5108"
                  />
                </svg>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
