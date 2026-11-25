"use client";

import { useEffect, useState, useCallback } from "react";
import { LegalSection } from "@/lib/legal/types";

interface LegalTableOfContentsProps {
  sections: LegalSection[];
}

export default function LegalTableOfContents({ sections }: LegalTableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id || "");
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);

  // Scroll spy to highlight current section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0% -60% 0%",
        threshold: 0,
      }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  const handleScrollTo = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();

    const performScroll = () => {
      const target = document.getElementById(id);
      if (target) {
        const navbarOffset = 96;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarOffset;
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
        setActiveId(id);
        // Update hash without jumping
        window.history.pushState(null, "", `#${id}`);
      }
    };

    if (isMobileOpen) {
      setIsMobileOpen(false);
      // Wait for mobile accordion collapse reflow before measuring scroll coordinate
      setTimeout(performScroll, 60);
    } else {
      performScroll();
    }
  }, [isMobileOpen]);

  const activeSectionTitle =
    sections.find((s) => s.id === activeId)?.title || sections[0]?.title;
  const activeSectionNumber =
    sections.find((s) => s.id === activeId)?.sectionNumber || sections[0]?.sectionNumber;

  return (
    <nav
      aria-label="Table of Contents"
      className="w-full"
    >
      {/* =========================================================================
          MOBILE VIEW: Compact Collapsible Accordion (< lg)
          ========================================================================= */}
      <div className="block lg:hidden w-full mb-8 rounded-lg bg-[#111218] border border-white/[0.10] overflow-hidden">
        <button
          type="button"
          onClick={() => setIsMobileOpen((prev) => !prev)}
          aria-expanded={isMobileOpen}
          aria-controls="mobile-toc-list"
          className="w-full px-4 py-3.5 flex items-center justify-between text-left text-[13px] font-mono text-[#F4F2ED] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF5108]"
        >
          <div className="flex items-center gap-2.5 truncate pr-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5108] shrink-0" aria-hidden="true" />
            <span className="text-[#8E9098] shrink-0">CONTENTS:</span>
            <span className="text-[#FF5108] font-[700] truncate">
              {activeSectionNumber} — {activeSectionTitle}
            </span>
          </div>
          <span
            className={`text-[#8E9098] text-[11px] transition-transform duration-200 shrink-0 ${
              isMobileOpen ? "rotate-180" : ""
            }`}
          >
            ▼
          </span>
        </button>

        {isMobileOpen && (
          <div
            id="mobile-toc-list"
            className="px-4 pb-4 pt-1 border-t border-white/[0.06] flex flex-col gap-1.5 max-h-[300px] overflow-y-auto"
          >
            {sections.map((s) => {
              const isActive = s.id === activeId;
              return (
                <a
                  key={`mobile-${s.id}`}
                  href={`#${s.id}`}
                  onClick={(e) => handleScrollTo(e, s.id)}
                  className={`text-[13px] py-1.5 px-2.5 rounded transition-colors duration-200 flex items-center gap-2.5 ${
                    isActive
                      ? "bg-[#FF5108]/10 text-[#FF5108] font-[600]"
                      : "text-[#8E9098] hover:text-[#F4F2ED] hover:bg-white/[0.03]"
                  }`}
                >
                  <span className="font-mono text-[11px] shrink-0 opacity-70">
                    {s.sectionNumber}
                  </span>
                  <span className="truncate">{s.title}</span>
                </a>
              );
            })}
          </div>
        )}
      </div>

      {/* =========================================================================
          DESKTOP VIEW: Sidebar Column (lg and up)
          ========================================================================= */}
      <div className="hidden lg:block pr-4">
        <div className="p-5 rounded-xl bg-[#111218]/50 border border-white/[0.08] backdrop-blur-sm">
          {/* Header */}
          <div className="flex items-center gap-2 pb-3.5 mb-3.5 border-b border-white/[0.06]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5108]" aria-hidden="true" />
            <p className="font-mono uppercase text-[11px] tracking-[0.2em] font-[600] text-[#8E9098]">
              TABLE OF CONTENTS
            </p>
          </div>

          {/* Section List */}
          <ol className="flex flex-col gap-1 list-none p-0 m-0">
            {sections.map((s) => {
              const isActive = s.id === activeId;
              return (
                <li key={`desktop-${s.id}`}>
                  <a
                    href={`#${s.id}`}
                    onClick={(e) => handleScrollTo(e, s.id)}
                    className={`group flex items-center gap-2.5 py-1.5 px-2.5 rounded-md text-[13px] transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF5108] ${
                      isActive
                        ? "bg-[#FF5108]/10 text-[#F4F2ED] font-[600]"
                        : "text-[#8E9098] hover:text-[#F4F2ED] hover:bg-white/[0.02]"
                    }`}
                  >
                    <span
                      className={`font-mono text-[11px] shrink-0 transition-colors duration-200 ${
                        isActive
                          ? "text-[#FF5108]"
                          : "text-[#555760] group-hover:text-[#8E9098]"
                      }`}
                    >
                      {s.sectionNumber}
                    </span>
                    <span className="truncate">{s.title}</span>
                    {isActive && (
                      <span className="ml-auto w-1 h-3 rounded-full bg-[#FF5108]" aria-hidden="true" />
                    )}
                  </a>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </nav>
  );
}
