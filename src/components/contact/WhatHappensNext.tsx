"use client";

import React from "react";
import { WhatHappensNextData } from "@/lib/contact/types";

interface WhatHappensNextProps {
  data: WhatHappensNextData;
}

export default function WhatHappensNext({ data }: WhatHappensNextProps) {
  return (
    <div className="rounded-2xl border border-white/[0.1] bg-[#111218] p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <div className="mb-6 pb-5 border-b border-white/[0.08]">
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#FF5108] font-[700]">
          OUR WORKFLOW
        </span>
        <h3 className="text-[22px] sm:text-[24px] font-[800] tracking-[-0.025em] text-[#F4F2ED] mt-1.5">
          {data.heading}
        </h3>
      </div>

      <div className="space-y-6">
        {data.steps.map((step, idx) => (
          <div key={step.number} className="flex items-start gap-4">
            <span className="font-mono text-[13px] text-[#FF5108] font-[700] px-2.5 py-1 rounded bg-[#FF5108]/10 border border-[#FF5108]/20 shrink-0 mt-0.5">
              {step.number}
            </span>
            <div>
              <h4 className="text-[16px] font-[700] text-[#F4F2ED] tracking-[-0.01em]">
                {step.title}
              </h4>
              <p className="text-[14px] text-[#92939B] leading-relaxed mt-1">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-5 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-[#737680]">
        <span>Transparent Communication</span>
        <span>Thoughtful Partnerships</span>
      </div>
    </div>
  );
}
