"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { AboutHeroData } from "@/lib/about/types";

interface AboutHeroProps {
  data: AboutHeroData;
}

export default function AboutHero({ data }: AboutHeroProps) {
  const line1Full = data.headingLine1;
  const line2Full = data.headingLine2;

  // Typewriter Animation State
  const [displayedLine1, setDisplayedLine1] = useState<string>("");
  const [displayedLine2, setDisplayedLine2] = useState<string>("");
  const [cursorLine, setCursorLine] = useState<1 | 2>(1);
  const [showCursor, setShowCursor] = useState<boolean>(true);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const timersRef = useRef<NodeJS.Timeout[]>([]);

  // Smooth scroll handler for hero CTA buttons with sticky navbar offset
  const handleScrollToAnchor = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
      e.preventDefault();
      const cleanId = targetId.replace("#", "");
      const targetElement = document.getElementById(cleanId);
      if (targetElement) {
        const navbarOffset = 96;
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          navbarOffset;
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
        window.history.pushState(null, "", `#${cleanId}`);
      }
    },
    []
  );

  useEffect(() => {
    // Check prefers-reduced-motion
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) {
      setDisplayedLine1(line1Full);
      setDisplayedLine2(line2Full);
      setShowCursor(false);
      setIsFinished(true);
      return;
    }

    const timers = timersRef.current;
    let accumulatedTime = 250; // Initial brief pause before typing begins

    // 1. Type Line 1 character by character
    const charDelayLine1 = 52; // ms per character (within 45–65ms)
    for (let i = 1; i <= line1Full.length; i++) {
      const timeout = setTimeout(() => {
        setDisplayedLine1(line1Full.slice(0, i));
      }, accumulatedTime);
      timers.push(timeout);
      accumulatedTime += charDelayLine1;
    }

    // 2. Pause between lines (approx 420ms, within 350–500ms)
    const linePause = 420;
    accumulatedTime += linePause;

    // Switch cursor to line 2
    const cursorSwitchTimeout = setTimeout(() => {
      setCursorLine(2);
    }, accumulatedTime - 100);
    timers.push(cursorSwitchTimeout);

    // 3. Type Line 2 character by character
    const charDelayLine2 = 50; // ms per character
    for (let j = 1; j <= line2Full.length; j++) {
      const timeout = setTimeout(() => {
        setDisplayedLine2(line2Full.slice(0, j));
      }, accumulatedTime);
      timers.push(timeout);
      accumulatedTime += charDelayLine2;
    }

    // 4. Headline complete: brief cursor linger before removal
    accumulatedTime += 400;
    const finishTimeout = setTimeout(() => {
      setIsFinished(true);
      setShowCursor(false);
    }, accumulatedTime);
    timers.push(finishTimeout);

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [line1Full, line2Full]);

  return (
    <section
      aria-label="About Color Vision Hero"
      className="relative w-full pt-32 sm:pt-40 md:pt-48 pb-16 sm:pb-24 border-b border-white/[0.08] overflow-hidden"
    >
      {/* Subtle atmospheric ambient glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-[radial-gradient(circle_at_50%_10%,rgba(255,81,8,0.07)_0%,transparent_65%)] blur-3xl"
        aria-hidden="true"
      />

      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Eyebrow */}
        <div className="flex items-center gap-2.5 mb-6 sm:mb-8">
          <span
            className="w-1.5 h-1.5 rounded-full bg-[#FF5108] inline-block shadow-[0_0_8px_rgba(255,81,8,0.8)]"
            aria-hidden="true"
          />
          <p className="uppercase tracking-[0.24em] text-[11px] sm:text-[12px] md:text-[13px] font-[600] text-[#8E9098]">
            {data.eyebrow}
          </p>
        </div>

        {/* =========================================================================
            MAIN HEADLINE WITH ZERO-LAYOUT-SHIFT TYPEWRITER ANIMATION
            ========================================================================= */}
        <h1 className="relative max-w-[1080px] mb-8 sm:mb-10">
          {/* Accessible Screen-Reader Headline */}
          <span className="sr-only">
            {line1Full} {line2Full}
          </span>

          {/* Visual Display: Grid Stack prevents Cumulative Layout Shift (CLS = 0) */}
          <span className="grid grid-cols-1" aria-hidden="true">
            {/* Invisible ghost layout layer reserving exact multi-line space */}
            <span className="invisible pointer-events-none select-none col-start-1 row-start-1 text-[40px] sm:text-[58px] md:text-[74px] lg:text-[88px] font-[800] leading-[1.02] tracking-[-0.035em]">
              <span>{line1Full}</span>
              <br />
              <span>{line2Full}</span>
            </span>

            {/* Animating typed text layer */}
            <span className="col-start-1 row-start-1 text-[40px] sm:text-[58px] md:text-[74px] lg:text-[88px] font-[800] leading-[1.02] tracking-[-0.035em] text-[#F4F2ED]">
              {/* Line 1 */}
              <span>{displayedLine1}</span>
              {cursorLine === 1 && showCursor && (
                <span
                  className="inline-block w-[2.5px] sm:w-[3.5px] h-[0.85em] bg-[#FF5108] align-baseline ml-1.5 sm:ml-2 animate-pulse shadow-[0_0_8px_rgba(255,81,8,0.8)] relative -bottom-[0.02em]"
                  aria-hidden="true"
                />
              )}
              <br />

              {/* Line 2 */}
              <span className="text-[#F4F2ED]">{displayedLine2}</span>
              {cursorLine === 2 && showCursor && (
                <span
                  className="inline-block w-[2.5px] sm:w-[3.5px] h-[0.85em] bg-[#FF5108] align-baseline ml-1.5 sm:ml-2 animate-pulse shadow-[0_0_8px_rgba(255,81,8,0.8)] relative -bottom-[0.02em]"
                  aria-hidden="true"
                />
              )}
            </span>
          </span>
        </h1>

        {/* =========================================================================
            SUPPORTING CONTENT REVEAL (Revealed after typewriter finishes)
            ========================================================================= */}
        <div
          className={`transition-all duration-700 ease-out ${
            isFinished
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-3 pointer-events-none"
          }`}
        >
          {/* Supporting Description */}
          <p className="text-[#B2B4BC] text-[18px] sm:text-[21px] md:text-[23px] leading-[1.55] font-[400] max-w-[760px] mb-8 sm:mb-10">
            {data.description}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-5 mb-12 sm:mb-16">
            {data.primaryAction && (
              <a
                href={data.primaryAction.href}
                onClick={(e) =>
                  handleScrollToAnchor(e, data.primaryAction!.href)
                }
                className="px-7 py-3.5 rounded-full bg-[#FF5108] text-[#08090D] font-[700] text-[12px] sm:text-[13px] tracking-[0.14em] uppercase hover:bg-[#FF7A24] transition-all duration-300 shadow-[0_4px_20px_rgba(255,81,8,0.35)] hover:shadow-[0_6px_28px_rgba(255,81,8,0.5)] flex items-center gap-2 group"
              >
                <span>{data.primaryAction.label}</span>
                <ArrowDown className="w-4 h-4 transition-transform duration-200 group-hover:translate-y-0.5" />
              </a>
            )}

            {data.secondaryAction && (
              <a
                href={data.secondaryAction.href}
                onClick={(e) =>
                  handleScrollToAnchor(e, data.secondaryAction!.href)
                }
                className="px-7 py-3.5 rounded-full border border-white/15 bg-white/[0.02] text-[#F4F2ED] font-[600] text-[12px] sm:text-[13px] tracking-[0.14em] uppercase hover:border-[#FF5108]/60 hover:text-[#FF5108] transition-all duration-300 flex items-center gap-2 group"
              >
                <span>{data.secondaryAction.label}</span>
                <ArrowUpRight className="w-4 h-4 opacity-60 transition-transform duration-200 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            )}
          </div>

          {/* Studio Meta Strip */}
          <div className="pt-8 border-t border-white/[0.08] grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            <div>
              <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#737680] font-[600] mb-1.5">
                Founded
              </div>
              <div className="text-[14px] sm:text-[15px] font-[600] text-[#F4F2ED]">
                May 2020
              </div>
            </div>
            <div>
              <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#737680] font-[600] mb-1.5">
                Studio Base
              </div>
              <div className="text-[14px] sm:text-[15px] font-[600] text-[#F4F2ED]">
                Colombo, Sri Lanka
              </div>
            </div>
            <div>
              <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#737680] font-[600] mb-1.5">
                Discipline
              </div>
              <div className="text-[14px] sm:text-[15px] font-[600] text-[#F4F2ED]">
                Brand & Digital Products
              </div>
            </div>
            <div>
              <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#737680] font-[600] mb-1.5">
                Founder & Lead
              </div>
              <div className="text-[14px] sm:text-[15px] font-[600] text-[#F4F2ED]">
                Dilshan Udawatta
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
