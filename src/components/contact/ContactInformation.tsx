"use client";

import React from "react";
import { Mail, MessageSquare, MapPin, ArrowUpRight } from "lucide-react";
import { ContactInfoData } from "@/lib/contact/types";

interface ContactInformationProps {
  data: ContactInfoData;
}

export default function ContactInformation({ data }: ContactInformationProps) {
  return (
    <div className="rounded-2xl border border-white/[0.1] bg-[#111218] p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <div className="mb-6 pb-5 border-b border-white/[0.08]">
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#FF5108] font-[700]">
          DIRECT ACCESS
        </span>
        <h3 className="text-[22px] sm:text-[24px] font-[800] tracking-[-0.025em] text-[#F4F2ED] mt-1.5">
          {data.heading}
        </h3>
      </div>

      <div className="space-y-4">
        {/* Email Direct Channel */}
        <a
          href={`mailto:${data.email}`}
          className="group flex items-center justify-between p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-[#FF5108]/40 transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF5108]"
        >
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-10 h-10 rounded-lg bg-[#FF5108]/10 border border-[#FF5108]/20 flex items-center justify-center text-[#FF5108] shrink-0 group-hover:bg-[#FF5108] group-hover:text-[#08090D] transition-colors duration-300">
              <Mail className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="block text-[11px] font-mono uppercase tracking-wider text-[#737680]">
                Email Us
              </span>
              <span className="block text-[15px] font-[600] text-[#F4F2ED] group-hover:text-white transition-colors truncate">
                {data.email}
              </span>
            </div>
          </div>
          <ArrowUpRight className="w-4 h-4 text-[#737680] group-hover:text-[#FF5108] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
        </a>

        {/* WhatsApp Direct Channel */}
        <a
          href={data.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-[#25D366]/40 transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#25D366]"
        >
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-10 h-10 rounded-lg bg-[#25D366]/10 border border-[#25D366]/20 flex items-center justify-center text-[#25D366] shrink-0 group-hover:bg-[#25D366] group-hover:text-[#08090D] transition-colors duration-300">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="block text-[11px] font-mono uppercase tracking-wider text-[#737680]">
                Phone / WhatsApp
              </span>
              <span className="block text-[15px] font-[600] text-[#F4F2ED] group-hover:text-white transition-colors truncate">
                {data.phone}
              </span>
            </div>
          </div>
          <ArrowUpRight className="w-4 h-4 text-[#737680] group-hover:text-[#25D366] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
        </a>

        {/* Studio Location */}
        <div className="flex items-center gap-3.5 p-4 rounded-xl border border-white/[0.04] bg-white/[0.01]">
          <div className="w-10 h-10 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-[#8E9098] shrink-0">
            <MapPin className="w-4 h-4 text-[#FF5108]" />
          </div>
          <div>
            <span className="block text-[11px] font-mono uppercase tracking-wider text-[#737680]">
              Studio Location
            </span>
            <span className="block text-[15px] font-[600] text-[#F4F2ED]">
              {data.location}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
