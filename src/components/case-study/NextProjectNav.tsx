"use client";

import Link from "next/link";

interface NextProjectNavProps {
  nextProject?: {
    slug: string;
    title: string;
    category: string;
    subtitle?: string;
    year?: string;
  };
}

export default function NextProjectNav({ nextProject }: NextProjectNavProps) {
  if (!nextProject) return null;

  return (
    <section className="relative w-full py-24 sm:py-32 md:py-40 bg-[#08090D] border-t border-white/[0.12] overflow-hidden group">
      {/* Background Hover Aura */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, rgba(255, 81, 8, 0.12) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="w-full max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 relative z-10 text-center">
        {/* Eyebrow Label */}
        <span className="text-[12px] font-mono uppercase tracking-[0.28em] text-[#FF5108] font-[700] block mb-6">
          EXPLORE NEXT CASE STUDY →
        </span>

        {/* Big Next Project Link */}
        <Link
          href={`/work/${nextProject.slug}`}
          className="inline-block max-w-[960px] group-hover:-translate-y-1 transition-transform duration-500"
        >
          <h2 className="text-[44px] sm:text-[64px] md:text-[84px] lg:text-[96px] font-[800] leading-[1.0] tracking-[-0.04em] text-[#F4F2ED] group-hover:text-[#FF5108] transition-colors duration-300">
            {nextProject.title}
          </h2>

          <div className="flex items-center justify-center gap-3 mt-6 text-[13px] font-mono text-[#8E9098]">
            <span className="uppercase tracking-wider">{nextProject.category}</span>
            {nextProject.year && (
              <>
                <span>·</span>
                <span>{nextProject.year}</span>
              </>
            )}
          </div>

          {nextProject.subtitle && (
            <p className="mt-4 text-[16px] text-[#A6A8AE] max-w-[620px] mx-auto leading-relaxed">
              {nextProject.subtitle}
            </p>
          )}

          <div className="mt-8 inline-flex items-center gap-3 px-8 py-3.5 rounded-full border border-white/20 text-[#F4F2ED] group-hover:border-[#FF5108] group-hover:bg-[#FF5108] group-hover:text-[#08090D] font-[700] uppercase text-[12px] tracking-[0.12em] transition-all duration-300 shadow-lg">
            <span>VIEW CASE STUDY</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </div>
        </Link>
      </div>
    </section>
  );
}
