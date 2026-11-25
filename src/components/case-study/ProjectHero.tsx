"use client";

import Link from "next/link";
import Image from "next/image";
import { CaseStudyProject } from "@/lib/types/caseStudy";

interface ProjectHeroProps {
  project: CaseStudyProject;
}

export default function ProjectHero({ project }: ProjectHeroProps) {
  const hasHeroMedia = !!project.heroImage?.src || !!project.heroVideo?.src;

  return (
    <section className="relative w-full pt-32 sm:pt-36 md:pt-40 pb-12 md:pb-16 bg-[#08090D] border-b border-white/[0.08] overflow-hidden">
      {/* Background Ambient Glow */}
      <div
        className="absolute top-1/4 -right-[15%] w-[600px] h-[600px] rounded-full pointer-events-none opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(255, 81, 8, 0.25) 0%, transparent 70%)",
          filter: "blur(90px)",
        }}
        aria-hidden="true"
      />

      <div className="w-full max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Navigation Breadcrumb / Back link */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-[12px] font-mono tracking-widest text-[#8E9098] hover:text-[#FF5108] uppercase transition-colors group"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
            <span>BACK TO WORK</span>
          </Link>

          {/* Project Year & Status */}
          <div className="flex items-center gap-3">
            <span className="text-[12px] font-mono text-[#737680]">{project.year}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5108]" />
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#8E9098]">
              {project.projectType}
            </span>
          </div>
        </div>

        {/* Hero Title and Subtitle */}
        <div className="max-w-[980px]">
          {/* Categories Pill Badge */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.categories.map((cat) => (
              <span
                key={cat}
                className="text-[10px] sm:text-[11px] font-[700] uppercase tracking-[0.18em] text-[#FF5108] bg-[#FF5108]/10 border border-[#FF5108]/20 px-3 py-1 rounded-full"
              >
                {cat}
              </span>
            ))}
          </div>

          {/* Main Title */}
          <h1 className="text-[44px] sm:text-[60px] md:text-[76px] lg:text-[88px] font-[800] leading-[1.02] tracking-[-0.035em] text-[#F4F2ED] mb-6 sm:mb-8 text-balance">
            {project.title}
          </h1>

          {/* Subtitle / Narrative */}
          <p className="text-[#A6A8AE] text-[17px] sm:text-[20px] md:text-[22px] leading-[1.55] font-[400] max-w-[820px] text-balance">
            {project.subtitle || project.shortDescription}
          </p>
        </div>

        {/* Hero Media Display (if provided) */}
        {hasHeroMedia && (
          <div className="mt-12 sm:mt-16 md:mt-20 relative w-full rounded-2xl overflow-hidden border border-white/[0.12] bg-[#11141A] shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
            {project.heroImage && (
              <div className="relative w-full aspect-[16/9] sm:aspect-[21/9]">
                <Image
                  src={project.heroImage.src}
                  alt={project.heroImage.alt || project.title}
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            )}
            {project.heroImage?.caption && (
              <div className="px-6 py-3.5 bg-[#0C0E14] border-t border-white/[0.06] flex items-center justify-between text-[12px] text-[#8E9098] font-mono">
                <span>{project.heroImage.caption}</span>
                <span className="text-[#FF5108]">FIGURE 1.0</span>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
