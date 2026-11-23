"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import HeroVisual from "./HeroVisual";
import { HeroContent } from "@/lib/wordpress/types";

export default function Hero({ hero }: { hero?: HeroContent }) {
  const containerRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const title1Ref = useRef<HTMLHeadingElement>(null);
  const title2Ref = useRef<HTMLHeadingElement>(null);
  const pRef = useRef<HTMLParagraphElement>(null);
  const btnsRef = useRef<HTMLDivElement>(null);
  const visualWrapperRef = useRef<HTMLDivElement>(null);

  // Helper for smooth scrolling to sections
  const scrollToAnchor = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      const headerOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isReduced) {
      gsap.set([eyebrowRef.current, pRef.current, btnsRef.current, visualWrapperRef.current], {
        opacity: 1,
        y: 0,
      });
      gsap.set([title1Ref.current, title2Ref.current], {
        yPercent: 0,
      });
      return;
    }

    // Restrained progressive entrance animation on page load
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      eyebrowRef.current,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.6 },
      0.15
    )
      .fromTo(
        title1Ref.current,
        { yPercent: 110 },
        { yPercent: 0, duration: 0.85, ease: "power3.out" },
        0.25
      )
      .fromTo(
        title2Ref.current,
        { yPercent: 110 },
        { yPercent: 0, duration: 0.85, ease: "power3.out" },
        0.38
      )
      .fromTo(
        pRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.75 },
        0.58
      )
      .fromTo(
        btnsRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.7 },
        0.72
      )
      .fromTo(
        visualWrapperRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" },
        0.3
      );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#08090D] overflow-hidden"
    >
      <div className="w-full max-w-[1280px] mx-auto min-h-screen px-4 md:px-6 lg:px-0 pt-36 md:pt-40 lg:pt-44 pb-20 md:pb-28 lg:pb-32 grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-x-[16px] md:gap-x-[20px] lg:gap-x-[24px] items-center">
        {/* Left Content (Columns 1-7 on desktop) */}
        <div className="col-span-4 md:col-span-8 lg:col-span-7 z-10 flex flex-col justify-center">
          {/* Eyebrow */}
          <div ref={eyebrowRef} className="opacity-0 mb-6 flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5108] inline-block shadow-[0_0_8px_rgba(255,81,8,0.6)]" />
            <p className="uppercase tracking-[0.22em] text-[12px] md:text-[13px] font-[600] text-[#8E9098]">
              {hero?.eyebrow || "CREATIVE DESIGN STUDIO"}
            </p>
          </div>

          {/* Main Headline */}
          <div className="space-y-[-4px] sm:space-y-[-6px] md:space-y-[-8px] lg:space-y-[-10px] select-none">
            <div className="overflow-hidden pb-1">
              <h1
                ref={title1Ref}
                className="text-[54px] sm:text-[72px] md:text-[88px] lg:text-[104px] xl:text-[112px] font-[800] leading-[0.95] text-[#F4F2ED] tracking-[-0.03em]"
              >
                {hero?.heading?.split("\n")[0] || "Design"}
              </h1>
            </div>
            <div className="overflow-hidden pt-1 pb-2">
              <h1
                ref={title2Ref}
                className="text-[54px] sm:text-[72px] md:text-[88px] lg:text-[104px] xl:text-[112px] font-[800] leading-[0.95] text-[#FF5108] tracking-[-0.03em]"
              >
                {hero?.highlightedText || "That Matters."}
              </h1>
            </div>
          </div>

          {/* Supporting Studio Description */}
          <p
            ref={pRef}
            className="opacity-0 text-[#8E9098] text-[15px] sm:text-[16px] lg:text-[17px] leading-[1.7] max-w-[540px] mt-7 md:mt-8 font-[400]"
          >
            {hero?.description ||
              "Color Vision is an independent design studio based in Sri Lanka, helping ambitious businesses turn ideas into clear brands, intuitive digital products, and meaningful experiences."}
          </p>

          {/* CTA Buttons */}
          <div
            ref={btnsRef}
            className="opacity-0 mt-9 md:mt-11 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5"
          >
            <a
              href="#work"
              onClick={(e) => scrollToAnchor(e, "work")}
              className="inline-flex items-center justify-center gap-2 bg-[#FF5108] text-[#08090D] px-8 py-4 font-[700] uppercase tracking-[0.06em] text-[12px] md:text-[13px] rounded-full hover:bg-[#FF6622] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 shadow-lg shadow-[#FF5108]/20 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#FF5108]"
            >
              <span>{hero?.primaryCtaLabel || "VIEW OUR WORK"}</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href="#contact"
              onClick={(e) => scrollToAnchor(e, "contact")}
              className="inline-flex items-center justify-center border border-[#FF5108]/80 text-[#FF5108] bg-transparent px-8 py-4 font-[700] uppercase tracking-[0.06em] text-[12px] md:text-[13px] rounded-full hover:bg-[#FF5108] hover:text-[#08090D] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#FF5108]"
            >
              <span>{hero?.secondaryCtaLabel || "START A PROJECT"}</span>
            </a>
          </div>
        </div>

        {/* Right Abstract Geometric / Orbital Visual (Columns 8-12 on desktop) */}
        <div className="col-span-4 md:col-span-8 lg:col-span-5 flex justify-center lg:justify-end items-center mt-12 lg:mt-0 z-0">
          <div ref={visualWrapperRef} className="opacity-0">
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
