"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AboutContent } from "@/lib/wordpress/types";

export default function Statement({ about }: { about?: AboutContent }) {
  const containerRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const accentLineRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  // Exact studio copy per Color Vision design specifications
  const studioParagraphs = [
    "Color Vision is an independent design studio based in Sri Lanka, working across brand identity, UI/UX design, digital products, websites, design systems, and visual communication.",
    "We believe good design sits between what a business needs to achieve and what people need to understand. That's why we don't begin with colours, screens, or trends. We begin with the problem.",
    "From a new business finding its identity to an established team improving a complex digital product, we bring strategic thinking and hands-on design together to create work that is clear, distinctive, and useful.",
    "Our work is designed to work in the real world — across screens, teams, markets, and cultures.",
  ];

  // GSAP ScrollTrigger animation
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      // Heading reveal on scroll
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current.querySelectorAll(".about-heading-line"),
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%",
            },
          }
        );
      }

      // Expanding orange accent line
      if (accentLineRef.current) {
        gsap.fromTo(
          accentLineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.9,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 80%",
            },
          }
        );
      }

      // Abstract geometric visual reveal
      if (visualRef.current) {
        gsap.fromTo(
          visualRef.current,
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.85,
            ease: "power2.out",
            scrollTrigger: {
              trigger: visualRef.current,
              start: "top 80%",
            },
          }
        );
      }

      // Staggered paragraph reveal
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current.querySelectorAll(".about-paragraph"),
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            stagger: 0.14,
            ease: "power2.out",
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 80%",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Smooth scroll to contact for project enquiry
  const handleScrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById("contact");
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative w-full bg-transparent py-24 md:py-32 lg:py-40 border-b border-white/[0.06]"
    >
      <div className="w-full max-w-[1280px] mx-auto px-4 md:px-6 lg:px-0">
        {/* Section Eyebrow */}
        <div className="flex items-center gap-2.5 mb-8 md:mb-12">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF5108] inline-block shadow-[0_0_8px_rgba(255,81,8,0.6)]" />
          <p className="uppercase tracking-[0.22em] text-[12px] md:text-[13px] font-[600] text-[#8E9098]">
            {about?.eyebrow || "ABOUT COLOR VISION"}
          </p>
          <span className="text-[#737680] font-mono text-[11px] tracking-widest ml-1">
            (THE STUDIO)
          </span>
        </div>

        {/* Two-Column Editorial Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-start">
          {/* Left Column: Expressive Headline & Geometric Symbol Detail */}
          <div className="lg:col-span-6 xl:col-span-7 flex flex-col justify-between">
            <div ref={headingRef}>
              <h2 className="text-[38px] sm:text-[48px] md:text-[56px] lg:text-[64px] xl:text-[72px] font-[800] leading-[1.08] tracking-[-0.03em] select-none">
                <span className="about-heading-line block text-[#F4F2ED]">
                  We turn ideas
                </span>
                <span className="about-heading-line block text-[#F4F2ED]">
                  into clear,
                </span>
                <span className="about-heading-line relative inline-block text-[#FF5108]">
                  meaningful
                  <div
                    ref={accentLineRef}
                    className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-[2px] sm:h-[3px] bg-[#FF5108] origin-left shadow-[0_0_8px_rgba(255,81,8,0.6)]"
                  />
                </span>
                <span className="about-heading-line block text-[#F4F2ED]">
                  experiences.
                </span>
              </h2>
            </div>

            {/* Subtle Abstract Geometric Visual Element */}
            <div
              ref={visualRef}
              className="mt-12 sm:mt-16 lg:mt-20 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
            >
              <div className="flex items-center gap-4">
                {/* SVG Abstract Geometric Studio Seal */}
                <div className="w-14 h-14 rounded-lg border border-white/[0.08] bg-[#0A0C10] flex items-center justify-center p-2.5 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,81,8,0.1)_0%,transparent_70%)]" />
                  <svg
                    viewBox="0 0 60 60"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full relative z-10"
                  >
                    <polygon
                      points="30,8 52,30 30,52 8,30"
                      stroke="#FF5108"
                      strokeWidth="1.2"
                      fill="rgba(255,81,8,0.05)"
                    />
                    <polygon
                      points="30,16 44,30 30,44 16,30"
                      stroke="rgba(255,255,255,0.2)"
                      strokeWidth="0.8"
                      strokeDasharray="2 2"
                    />
                    <circle cx="30" cy="30" r="4" fill="#F4F2ED" />
                    <line x1="30" y1="2" x2="30" y2="58" stroke="rgba(255,255,255,0.08)" strokeWidth="0.6" />
                    <line x1="2" y1="30" x2="58" y2="30" stroke="rgba(255,255,255,0.08)" strokeWidth="0.6" />
                  </svg>
                </div>

                <div>
                  <p className="text-[#F4F2ED] font-[700] text-[13px] tracking-wide uppercase">
                    COLOR VISION // STUDIO
                  </p>
                  <p className="text-[#8E9098] font-mono text-[11px] tracking-wider mt-0.5">
                    COORDINATES: 6.9271° N, 79.8612° E
                  </p>
                </div>
              </div>

              {/* Minimal Brand Seal Indicator */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.06] bg-white/[0.02]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF5108] animate-pulse" />
                <span className="text-[#8E9098] font-mono text-[10px] tracking-widest uppercase">
                  ACTIVE STUDIO
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Paragraphs & Studio Action */}
          <div ref={contentRef} className="lg:col-span-6 xl:col-span-5 flex flex-col justify-between">
            <div className="space-y-6 sm:space-y-7">
              {studioParagraphs.map((paragraph, idx) => (
                <p
                  key={idx}
                  className={`about-paragraph leading-[1.75] font-[400] ${
                    idx === 0
                      ? "text-[#F4F2ED]/95 text-[16px] sm:text-[17px] md:text-[18px] font-[500] leading-[1.7]"
                      : "text-[#8E9098] text-[14px] sm:text-[15px] md:text-[16px]"
                  }`}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Studio Metadata Badges & CTA Navigation Link */}
            <div className="mt-10 sm:mt-12 pt-8 border-t border-white/[0.06]">
              {/* Metadata Pills */}
              <div className="flex flex-wrap gap-2.5 mb-8">
                <span className="text-[11px] font-mono text-[#8E9098] px-3 py-1 rounded bg-white/[0.03] border border-white/[0.06]">
                  COLOMBO, SRI LANKA
                </span>
                <span className="text-[11px] font-mono text-[#8E9098] px-3 py-1 rounded bg-white/[0.03] border border-white/[0.06]">
                  INDEPENDENT STUDIO
                </span>
                <span className="text-[11px] font-mono text-[#8E9098] px-3 py-1 rounded bg-white/[0.03] border border-white/[0.06]">
                  GLOBAL REACH
                </span>
              </div>

              {/* Direct Action Link */}
              <Link
                href="/contact"
                className="group inline-flex items-center gap-4 text-[#F4F2ED] hover:text-[#FF5108] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF5108] rounded"
              >
                <span className="text-[13px] md:text-[14px] font-[700] uppercase tracking-[0.16em]">
                  {about?.ctaLabel || "LET'S TALK ABOUT YOUR PROJECT"}
                </span>
                <div className="w-9 h-9 rounded-full border border-white/20 group-hover:border-[#FF5108] group-hover:bg-[#FF5108] group-hover:text-[#08090D] flex items-center justify-center transition-all duration-300 shadow-sm group-hover:shadow-[0_0_12px_rgba(255,81,8,0.3)]">
                  <span className="text-sm font-bold transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export { Statement as About };
