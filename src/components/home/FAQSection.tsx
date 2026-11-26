"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqData as defaultFaqData } from "@/lib/faq/faqData";
import { FAQData } from "@/lib/faq/types";

interface FAQSectionProps {
  data?: FAQData;
}

export default function FAQSection({ data = defaultFaqData }: FAQSectionProps) {
  // Allow multiple answers to be open independently
  const [openIds, setOpenIds] = useState<Set<string>>(new Set([data.items[0]?.id || "faq-01"]));

  const toggleItem = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Split into two columns for desktop (3 questions per column)
  const midpoint = Math.ceil(data.items.length / 2);
  const leftColumnItems = data.items.slice(0, midpoint);
  const rightColumnItems = data.items.slice(midpoint);

  const renderFAQItem = (item: (typeof data.items)[0], index: number) => {
    const isOpen = openIds.has(item.id);
    const triggerId = `faq-trigger-${item.id}`;
    const panelId = `faq-panel-${item.id}`;

    return (
      <div
        key={item.id}
        className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
          isOpen
            ? "border-[#FF5108]/35 bg-white/[0.035] shadow-[0_12px_36px_rgba(0,0,0,0.4)]"
            : "border-white/[0.08] bg-white/[0.02] hover:border-white/[0.16] hover:bg-white/[0.03]"
        }`}
      >
        <button
          type="button"
          id={triggerId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => toggleItem(item.id)}
          className="w-full text-left flex items-start justify-between p-6 sm:p-7 gap-4 transition-colors duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5108] focus-visible:ring-inset rounded-2xl cursor-pointer"
        >
          <div className="flex items-start gap-4">
            <span className="font-mono text-[12px] text-[#FF5108] tracking-wider font-[700] pt-1 shrink-0">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-[17px] sm:text-[18px] md:text-[19px] font-[700] tracking-[-0.015em] text-[#F4F2ED] group-hover:text-white transition-colors duration-200 leading-[1.35]">
              {item.question}
            </span>
          </div>

          <div
            className={`w-8 h-8 rounded-full border border-white/[0.1] bg-white/[0.03] flex items-center justify-center shrink-0 mt-0.5 transition-all duration-300 group-hover:border-[#FF5108]/50 ${
              isOpen ? "bg-[#FF5108]/15 border-[#FF5108]/40" : ""
            }`}
          >
            <ChevronDown
              className={`w-4 h-4 text-[#FF5108] transition-transform duration-300 ease-out ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
              aria-hidden="true"
            />
          </div>
        </button>

        <div
          id={panelId}
          role="region"
          aria-labelledby={triggerId}
          className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${
            isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="px-6 pb-6 sm:px-7 sm:pb-7 pt-1 text-[#92939B] text-[15px] sm:text-[16px] leading-[1.75] font-[400] border-t border-white/[0.04]">
              {item.answer}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section
      id="faq"
      aria-label="Frequently Asked Questions"
      className="relative w-full bg-[#08090D] py-24 md:py-32 lg:py-36 border-b border-white/[0.06] overflow-hidden select-none scroll-mt-24"
    >
      {/* Ambient background glow */}
      <div
        className="pointer-events-none absolute -right-32 top-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[radial-gradient(circle,rgba(255,81,8,0.04)_0%,transparent_70%)] blur-3xl"
        aria-hidden="true"
      />

      <div className="w-full max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl mb-14 md:mb-18">
          <div className="flex items-center gap-2.5 mb-5 sm:mb-6">
            <span
              className="w-1.5 h-1.5 rounded-full bg-[#FF5108] inline-block shadow-[0_0_8px_rgba(255,81,8,0.7)]"
              aria-hidden="true"
            />
            <p className="uppercase tracking-[0.24em] text-[11px] sm:text-[12px] md:text-[13px] font-[600] text-[#8E9098]">
              {data.eyebrow}
            </p>
          </div>

          <h2 className="text-[36px] sm:text-[46px] md:text-[54px] font-[800] tracking-[-0.035em] text-[#F4F2ED] leading-[1.08]">
            {data.heading}
          </h2>

          <p className="text-[#92939B] text-[15.5px] sm:text-[17px] leading-[1.75] font-[400] mt-5">
            {data.description}
          </p>
        </div>

        {/* Two-Column Desktop / Single-Column Mobile Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          {/* Left Column (Q1 - Q3) */}
          <div className="flex flex-col gap-5 sm:gap-6">
            {leftColumnItems.map((item, idx) => renderFAQItem(item, idx))}
          </div>

          {/* Right Column (Q4 - Q6) */}
          <div className="flex flex-col gap-5 sm:gap-6">
            {rightColumnItems.map((item, idx) => renderFAQItem(item, idx + midpoint))}
          </div>
        </div>
      </div>
    </section>
  );
}
