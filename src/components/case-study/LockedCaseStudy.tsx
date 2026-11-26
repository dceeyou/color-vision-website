"use client";

import React from "react";
import Link from "next/link";
import { Lock, ArrowLeft, ArrowUpRight } from "lucide-react";
import { CaseStudyProject } from "@/lib/types/caseStudy";

interface LockedCaseStudyProps {
  project: CaseStudyProject;
}

export default function LockedCaseStudy({ project }: LockedCaseStudyProps) {
  return (
    <section className="relative min-h-[90vh] bg-[#08090D] text-[#F4F2ED] pt-32 sm:pt-40 md:pt-44 pb-20 sm:pb-28 overflow-hidden select-none">
      {/* Ambient background glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-[radial-gradient(circle_at_50%_15%,rgba(255,81,8,0.08)_0%,transparent_65%)] blur-3xl"
        aria-hidden="true"
      />

      <div className="w-full max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Back navigation pill */}
        <div className="mb-8 sm:mb-12">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-[12px] font-mono tracking-wider uppercase text-[#8E9098] hover:text-[#FF5108] transition-colors duration-200 group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
            <span>Return to Selected Work</span>
          </Link>
        </div>

        {/* Header Eyebrow */}
        <div className="flex items-center gap-2.5 mb-5 sm:mb-6">
          <span
            className="w-1.5 h-1.5 rounded-full bg-[#FF5108] inline-block shadow-[0_0_8px_rgba(255,81,8,0.8)] animate-pulse"
            aria-hidden="true"
          />
          <p className="uppercase tracking-[0.24em] text-[11px] sm:text-[12px] font-mono font-[600] text-[#FF5108]">
            CASE STUDY IN DEVELOPMENT
          </p>
        </div>

        {/* Project Title */}
        <h1 className="text-[38px] sm:text-[54px] md:text-[68px] lg:text-[76px] font-[800] leading-[1.05] tracking-[-0.035em] text-[#F4F2ED] mb-6">
          {project.title}
        </h1>

        {/* Project Subtitle / Short Description */}
        <p className="text-[#B2B4BC] text-[17px] sm:text-[19px] md:text-[21px] leading-[1.6] font-[400] max-w-[760px] mb-12 sm:mb-16">
          {project.shortDescription}
        </p>

        {/* Locked Presentation Container Card */}
        <div className="relative rounded-2xl bg-[#111218]/90 border border-white/[0.12] p-8 sm:p-12 md:p-16 overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.55)]">
          {/* Subtle warm orange backlight */}
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#FF5108]/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-[680px]">
            {/* Status Icon Badge */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-[#08090D] border border-white/15 flex items-center justify-center text-[#FF5108] shadow-lg">
                <Lock className="w-5 h-5 stroke-[2]" />
              </div>
              <span className="px-3.5 py-1 rounded-full bg-[#08090D] border border-white/10 font-mono text-[11px] uppercase tracking-[0.2em] font-[700] text-[#F4F2ED]">
                COMING SOON
              </span>
            </div>

            {/* Explanation Prose */}
            <h3 className="text-[22px] sm:text-[26px] font-[700] tracking-[-0.02em] text-[#F4F2ED] mb-4">
              This case study is being prepared for presentation.
            </h3>

            <p className="text-[#92939B] text-[15px] sm:text-[16px] leading-[1.75] mb-8 sm:mb-10">
              Our design team is documenting the design process, interface systems, and creative outcomes for this project.
            </p>

            {/* Technical Specifications Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-6 border-t border-white/[0.08] text-[12px] font-mono mb-8">
              <div>
                <span className="text-[#737680] uppercase tracking-wider block mb-1">
                  Client
                </span>
                <span className="text-[#F4F2ED] font-[600] truncate block">
                  {project.client}
                </span>
              </div>
              <div>
                <span className="text-[#737680] uppercase tracking-wider block mb-1">
                  Year
                </span>
                <span className="text-[#F4F2ED] font-[600] block">
                  {project.year}
                </span>
              </div>
              <div>
                <span className="text-[#737680] uppercase tracking-wider block mb-1">
                  Discipline
                </span>
                <span className="text-[#F4F2ED] font-[600] truncate block">
                  {project.categories?.[0] || "UI/UX"}
                </span>
              </div>
              <div>
                <span className="text-[#737680] uppercase tracking-wider block mb-1">
                  Availability
                </span>
                <span className="text-[#FF5108] font-[700] block">
                  COMING SOON
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/#work"
                className="px-6 py-3.5 rounded-full bg-[#FF5108] text-[#08090D] font-[700] text-[12px] tracking-[0.14em] uppercase hover:bg-[#FF7A24] transition-all duration-300 shadow-[0_4px_20px_rgba(255,81,8,0.35)] flex items-center gap-2 group"
              >
                <span>Explore Available Work</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <Link
                href="/#contact"
                className="px-6 py-3.5 rounded-full border border-white/15 bg-white/[0.02] text-[#F4F2ED] font-[600] text-[12px] tracking-[0.14em] uppercase hover:border-[#FF5108]/60 hover:text-[#FF5108] transition-all duration-300 flex items-center gap-2 group"
              >
                <span>Inquire About A Similar Project</span>
                <ArrowUpRight className="w-4 h-4 opacity-60 transition-transform duration-200 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
