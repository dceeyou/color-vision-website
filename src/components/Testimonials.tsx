"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Testimonial } from "@/lib/wordpress/types";

interface TestimonialsProps {
  testimonials?: Testimonial[];
}

export default function Testimonials({ testimonials: propTestimonials }: TestimonialsProps) {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const carouselContainerRef = useRef<HTMLDivElement>(null);

  // 6 Structured demonstration reviews clearly identified as placeholder client reviews
  const defaultTestimonials: Testimonial[] = useMemo(
    () => [
      {
        id: "demo-1",
        clientName: "Client Partner [Demo Placeholder]",
        clientRole: "Product Director",
        companyName: "Fintech & Mobility Ecosystem",
        serviceCategory: "UI/UX & Product Design",
        testimonial:
          "Working with Color Vision brought clarity to our product structure from day one. Their team took the time to understand the underlying problem before touching a single wireframe, resulting in an interface that our users found genuinely intuitive.",
        clientPhoto: null,
        companyLogo: null,
        projectReference: "02 — Vehicle Service Platform",
      },
      {
        id: "demo-2",
        clientName: "Design Director [Demo Placeholder]",
        clientRole: "Brand Strategy Lead",
        companyName: "Digital Technology Group",
        serviceCategory: "Brand Identity & Design System",
        testimonial:
          "The visual identity and design system created by Color Vision gave our brand a distinct, enduring presence. Their disciplined approach to typography, layout, and purpose-driven design set a completely new benchmark for our team.",
        clientPhoto: null,
        companyLogo: null,
        projectReference: "01 — Elegant AI",
      },
      {
        id: "demo-3",
        clientName: "Founder & CEO [Demo Placeholder]",
        clientRole: "Executive Leadership",
        companyName: "Consumer Goods & Retail",
        serviceCategory: "Packaging & E-Commerce",
        testimonial:
          "Color Vision's collaborative process is remarkably focused and transparent. They transformed complex technical requirements into a clean, purposeful digital experience that scaled effortlessly across our entire platform.",
        clientPhoto: null,
        companyLogo: null,
        projectReference: "04 — Goodly Packaging & Web",
      },
      {
        id: "demo-4",
        clientName: "VP of Engineering [Demo Placeholder]",
        clientRole: "Platform Architecture",
        companyName: "Cloud Infrastructure Labs",
        serviceCategory: "Design Systems & Web",
        testimonial:
          "Their attention to technical feasibility and design system modularity saved us months of rework. Every component, token, and responsive state was documented with exceptional rigor and craft.",
        clientPhoto: null,
        companyLogo: null,
        projectReference: "03 — Enterprise Design System",
      },
      {
        id: "demo-5",
        clientName: "Managing Director [Demo Placeholder]",
        clientRole: "Brand Experience",
        companyName: "CR Hospitality Group",
        serviceCategory: "Brand Identity & Environmental",
        testimonial:
          "From spatial signage to digital touchpoints, Color Vision captured the raw energy of our concept and refined it into an unforgettable, cohesive brand world that customers constantly comment on.",
        clientPhoto: null,
        companyLogo: null,
        projectReference: "05 — CR Cricket Bar",
      },
      {
        id: "demo-6",
        clientName: "Head of Product [Demo Placeholder]",
        clientRole: "Mobile & Health",
        companyName: "CarePulse Health Technologies",
        serviceCategory: "UI/UX & Mobile Experience",
        testimonial:
          "Color Vision brought empathy and clarity to an intricate personal care workflow. Their design decisions were always backed by clear reasoning, resulting in rapid adoption and deep user trust.",
        clientPhoto: null,
        companyLogo: null,
        projectReference: "06 — My Little Kevi Mobile",
      },
    ],
    []
  );

  const rawTestimonials =
    propTestimonials && propTestimonials.length >= 3
      ? propTestimonials
      : defaultTestimonials;

  const count = rawTestimonials.length;

  // Triplicate array for seamless, jump-free infinite horizontal loop:
  // [Set 0 (0..N-1), Set 1 (0..N-1), Set 2 (0..N-1)]
  const repeatedItems = useMemo(
    () => [...rawTestimonials, ...rawTestimonials, ...rawTestimonials],
    [rawTestimonials]
  );

  // Carousel state
  const [currentIndex, setCurrentIndex] = useState<number>(count);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(true);
  const [containerWidth, setContainerWidth] = useState<number>(1280);
  const [dragOffset, setDragOffset] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [timerResetKey, setTimerResetKey] = useState<number>(0);

  // Environmental visibility states for strictly sanctioned pause conditions
  const [isSectionVisible, setIsSectionVisible] = useState<boolean>(true);
  const [isDocumentVisible, setIsDocumentVisible] = useState<boolean>(true);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);

  // Refs to prevent stale closures and race conditions
  const currentIndexRef = useRef<number>(currentIndex);
  currentIndexRef.current = currentIndex;

  const dragStartXRef = useRef<number | null>(null);
  const isAnimatingRef = useRef<boolean>(false);
  const transitionSafetyTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Measure container width responsively via ResizeObserver
  useEffect(() => {
    if (!carouselContainerRef.current) return;
    const el = carouselContainerRef.current;
    const updateSize = () => {
      setContainerWidth(el.clientWidth);
    };
    updateSize();

    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(el);

    return () => resizeObserver.disconnect();
  }, []);

  // Track browser document visibility (pause only when tab is hidden)
  useEffect(() => {
    const handleVisibility = () => {
      const visible = document.visibilityState === "visible";
      setIsDocumentVisible(visible);
    };

    setIsDocumentVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  // Track prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleMotionChange);
      return () => mediaQuery.removeEventListener("change", handleMotionChange);
    }
  }, []);

  // IntersectionObserver to detect when testimonials section is in viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsSectionVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.05, rootMargin: "60px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Responsive card and gap measurements:
  // Desktop: 3 complete cards + partial preview (~3.35 visible)
  // Tablet: 2 complete cards + partial preview (~2.25 visible)
  // Mobile: 1 complete card + partial preview (~1.18 visible)
  const gap = containerWidth < 640 ? 16 : 24;
  let visibleCards = 3.35;
  if (containerWidth < 640) {
    visibleCards = 1.18;
  } else if (containerWidth < 1024) {
    visibleCards = 2.25;
  }

  const cardWidth = Math.max(
    280,
    Math.floor((containerWidth - Math.floor(visibleCards) * gap) / visibleCards)
  );
  const stepWidth = cardWidth + gap;

  // Handle seamless infinite wrap-around on transition end
  const handleTransitionEnd = useCallback(() => {
    if (transitionSafetyTimerRef.current) {
      clearTimeout(transitionSafetyTimerRef.current);
      transitionSafetyTimerRef.current = null;
    }

    isAnimatingRef.current = false;
    const current = currentIndexRef.current;

    // If we advanced past the second set, quietly jump back to the middle set
    if (current >= count * 2) {
      setIsTransitioning(false);
      setCurrentIndex(current - count);
    }
    // If we stepped back past the first set, quietly jump forward to the middle set
    else if (current < count) {
      setIsTransitioning(false);
      setCurrentIndex(current + count);
    }
  }, [count]);

  // Navigation callbacks
  const goToNext = useCallback(() => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
    setTimerResetKey((prev) => prev + 1);

    // Safety timeout in case transitionend event is missed
    if (transitionSafetyTimerRef.current) {
      clearTimeout(transitionSafetyTimerRef.current);
    }
    transitionSafetyTimerRef.current = setTimeout(() => {
      handleTransitionEnd();
    }, 850);
  }, [handleTransitionEnd]);

  const goToPrev = useCallback(() => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
    setTimerResetKey((prev) => prev + 1);

    // Safety timeout in case transitionend event is missed
    if (transitionSafetyTimerRef.current) {
      clearTimeout(transitionSafetyTimerRef.current);
    }
    transitionSafetyTimerRef.current = setTimeout(() => {
      handleTransitionEnd();
    }, 850);
  }, [handleTransitionEnd]);

  // Jump to specific logical index (0 to count - 1)
  const goToLogicalIndex = (targetLogical: number) => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setIsTransitioning(true);
    const currentLogical = ((currentIndexRef.current % count) + count) % count;
    const diff = targetLogical - currentLogical;
    setCurrentIndex((prev) => prev + diff);
    setTimerResetKey((prev) => prev + 1);

    if (transitionSafetyTimerRef.current) {
      clearTimeout(transitionSafetyTimerRef.current);
    }
    transitionSafetyTimerRef.current = setTimeout(() => {
      handleTransitionEnd();
    }, 850);
  };

  // Determine active autoplay condition:
  // PAUSED ONLY IF:
  // 1. Browser tab is hidden (!isDocumentVisible)
  // 2. Carousel is outside viewport (!isSectionVisible)
  // 3. User enabled prefers-reduced-motion (isReducedMotion)
  // 4. User is actively dragging with touch/pointer (isDragging)
  // Cursor hover NEVER stops autoplay.
  const isAutoplayRunning =
    isSectionVisible && isDocumentVisible && !isReducedMotion && !isDragging;

  // Single reliable interval timer synchronized with reset trigger
  useEffect(() => {
    if (!isAutoplayRunning) {
      return;
    }

    const interval = setInterval(() => {
      goToNext();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [isAutoplayRunning, timerResetKey, goToNext]);

  // Touch and pointer dragging interactions
  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    dragStartXRef.current = e.clientX;
    setIsDragging(true);
    setIsTransitioning(false);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (dragStartXRef.current === null) return;
    const currentX = e.clientX;
    const diff = currentX - dragStartXRef.current;
    setDragOffset(diff);
  };

  const handlePointerUp = () => {
    if (dragStartXRef.current === null) return;
    const finalOffset = dragOffset;
    dragStartXRef.current = null;
    setIsDragging(false);
    setIsTransitioning(true);
    setDragOffset(0);

    // Swipe threshold: 40px
    if (finalOffset < -40) {
      goToNext();
    } else if (finalOffset > 40) {
      goToPrev();
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goToNext();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      goToPrev();
    }
  };

  // GSAP Entrance Reveal
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
            },
          }
        );
      }

      if (carouselContainerRef.current) {
        gsap.fromTo(
          carouselContainerRef.current,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power2.out",
            scrollTrigger: {
              trigger: carouselContainerRef.current,
              start: "top 80%",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Compute active logical index for indicators (0 to count - 1)
  const activeLogicalIndex = ((currentIndex % count) + count) % count;

  // Track transform position
  const currentTranslateX = -(currentIndex * stepWidth) + dragOffset;

  return (
    <section
      id="testimonials"
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label="Client Testimonials and Reviews"
      className="relative w-full bg-[#08090D] py-24 md:py-32 lg:py-40 border-b border-white/[0.08] overflow-hidden focus-visible:outline-none"
    >
      <div className="w-full max-w-[1280px] mx-auto px-4 md:px-6 lg:px-0">
        {/* =========================================================================
            SECTION INTRODUCTION & CONTROLS
            ========================================================================= */}
        <div
          ref={headerRef}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 lg:gap-16 mb-14 md:mb-18"
        >
          {/* Left Column: Eyebrow + Main Heading */}
          <div className="lg:w-7/12">
            <div className="flex items-center gap-2.5 mb-5 sm:mb-6">
              <span
                className="w-1.5 h-1.5 rounded-full bg-[#FF5108] inline-block shadow-[0_0_8px_rgba(255,81,8,0.7)]"
                aria-hidden="true"
              />
              <p className="uppercase tracking-[0.24em] text-[11px] sm:text-[12px] md:text-[13px] font-[600] text-[#8E9098]">
                FROM THE PEOPLE WE WORK WITH
              </p>
              <span className="text-[#737680] font-mono text-[10px] sm:text-[11px] tracking-widest ml-1 hidden sm:inline-block">
                (06 REVIEWS)
              </span>
            </div>

            <h2 className="text-[38px] sm:text-[50px] md:text-[60px] lg:text-[68px] xl:text-[76px] font-[800] leading-[1.05] tracking-[-0.03em] select-none">
              <span className="text-[#F4F2ED] block">Good work speaks</span>
              <span className="text-[#FF5108] block">for itself.</span>
            </h2>
          </div>

          {/* Right Column: Supporting Description & Navigation Arrows */}
          <div className="lg:w-5/12 flex flex-col items-start lg:items-end justify-between gap-6 pb-1">
            <p className="text-[#8E9098] text-[15px] sm:text-[16px] md:text-[17px] leading-[1.7] font-[400] max-w-[480px] lg:text-right">
              Good work starts with a strong collaboration. We value clear communication,
              thoughtful ideas, and lasting relationships built through every project.
            </p>

            {/* Carousel Controls: Slide Counter + Arrows */}
            <div className="flex items-center gap-4 sm:gap-5 self-start lg:self-end mt-2">
              {/* Slide Counter */}
              <div className="flex items-center gap-1.5 text-[12px] sm:text-[13px] font-mono tracking-wider text-[#8E9098] select-none">
                <span className="font-[700] text-[#F4F2ED]">
                  {String(activeLogicalIndex + 1).padStart(2, "0")}
                </span>
                <span className="text-white/20">/</span>
                <span>{String(count).padStart(2, "0")}</span>
              </div>

              {/* Prev & Next Buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={goToPrev}
                  aria-label="Previous testimonial"
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-white/12 bg-[#11141A] text-[#F4F2ED] hover:border-[#FF5108] hover:text-[#FF5108] hover:bg-[#FF5108]/10 active:scale-95 flex items-center justify-center transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5108]"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={goToNext}
                  aria-label="Next testimonial"
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-white/12 bg-[#11141A] text-[#F4F2ED] hover:border-[#FF5108] hover:text-[#FF5108] hover:bg-[#FF5108]/10 active:scale-95 flex items-center justify-center transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5108]"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            AUTO-ANIMATING HORIZONTAL CAROUSEL TRACK
            ========================================================================= */}
        <div
          ref={carouselContainerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          className="relative w-full cursor-grab active:cursor-grabbing select-none overflow-hidden rounded-2xl"
          style={{ touchAction: "pan-y" }}
        >
          <div
            onTransitionEnd={handleTransitionEnd}
            style={{
              display: "flex",
              gap: `${gap}px`,
              transform: `translate3d(${currentTranslateX}px, 0, 0)`,
              transition: isTransitioning
                ? "transform 700ms cubic-bezier(0.22, 1, 0.36, 1)"
                : "none",
              willChange: "transform",
            }}
          >
            {repeatedItems.map((item, idx) => {
              const itemLogicalIndex = idx % count;
              const isCurrentCard = itemLogicalIndex === activeLogicalIndex;

              // Clean client monogram initials
              const initials =
                item.clientName
                  .replace(/\[.*?\]/g, "")
                  .trim()
                  .split(" ")
                  .slice(0, 2)
                  .map((w) => w[0])
                  .join("")
                  .toUpperCase() || "CV";

              return (
                <div
                  key={`${item.id}-${idx}`}
                  style={{
                    width: `${cardWidth}px`,
                    flexShrink: 0,
                  }}
                  className={`group relative rounded-2xl bg-[#11141A] border transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between min-h-[380px] sm:min-h-[400px] ${
                    isCurrentCard
                      ? "border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.45)]"
                      : "border-white/[0.08] hover:border-[#FF5108]/40 hover:bg-[#131722]"
                  }`}
                >
                  {/* Top Content: Category & Quote Icon */}
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-6">
                      {/* Service Category */}
                      <span className="text-[10px] sm:text-[11px] font-[600] uppercase tracking-[0.16em] text-[#FF5108] bg-[#FF5108]/10 px-2.5 py-1 rounded-full border border-[#FF5108]/20 truncate">
                        {item.serviceCategory || "Design & Strategy"}
                      </span>

                      {/* Small orange quote mark icon */}
                      <div
                        className="w-7 h-7 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center shrink-0 text-[#FF5108] group-hover:border-[#FF5108]/30 transition-colors"
                        aria-hidden="true"
                      >
                        <svg
                          className="w-3.5 h-3.5 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>
                      </div>
                    </div>

                    {/* Testimonial Quote Text */}
                    <blockquote className="m-0">
                      <p className="text-[#F4F2ED] text-[14.5px] sm:text-[15.5px] leading-[1.68] font-[400] tracking-[-0.01em]">
                        “{item.testimonial}”
                      </p>
                    </blockquote>
                  </div>

                  {/* Bottom Metadata & Divider */}
                  <div className="mt-8">
                    {/* Fine horizontal divider */}
                    <div className="w-full h-px bg-white/[0.08] mb-5 group-hover:bg-white/[0.12] transition-colors" />

                    {/* Client info row */}
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        {/* Client Avatar or Monogram */}
                        <div className="w-10 h-10 rounded-full bg-white/[0.05] border border-white/12 flex items-center justify-center font-[700] text-[12px] text-[#F4F2ED] shrink-0 group-hover:border-[#FF5108]/40 transition-colors shadow-inner">
                          {initials}
                        </div>

                        {/* Client Name & Role */}
                        <div className="flex flex-col min-w-0">
                          <span className="text-[13.5px] sm:text-[14.5px] font-[700] text-[#F4F2ED] truncate">
                            {item.clientName}
                          </span>
                          <span className="text-[11.5px] sm:text-[12px] text-[#8E9098] font-[400] truncate">
                            {item.clientRole} ·{" "}
                            <span className="text-[#A6A8AE]">{item.companyName}</span>
                          </span>
                        </div>
                      </div>

                      {/* Demo Badge */}
                      <span className="text-[9px] font-mono tracking-widest text-[#737680] uppercase px-1.5 py-0.5 border border-white/10 rounded shrink-0">
                        DEMO
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            BOTTOM PROGRESS BAR & PAGINATION INDICATORS
            ========================================================================= */}
        <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/[0.06]">
          {/* Dots Indicator */}
          <div className="flex items-center gap-2">
            {rawTestimonials.map((_, i) => (
              <button
                key={`dot-${i}`}
                type="button"
                onClick={() => goToLogicalIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF5108] ${
                  i === activeLogicalIndex
                    ? "w-8 bg-[#FF5108]"
                    : "w-2 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>

          {/* Autoplay status hint with animated progress bar */}
          <div className="flex items-center gap-4 text-[11px] sm:text-[12px] text-[#737680] font-mono">
            {/* Animated progress bar line */}
            <div className="w-20 sm:w-28 h-1 bg-white/10 rounded-full overflow-hidden relative">
              <div
                key={timerResetKey}
                className={`h-full bg-[#FF5108] rounded-full ${
                  isAutoplayRunning ? "animate-carousel-progress" : "opacity-30"
                }`}
                style={{
                  animationPlayState: isAutoplayRunning ? "running" : "paused",
                }}
              />
            </div>

            {/* Live Autoplay status indicator */}
            <div className="flex items-center gap-2 px-1.5 py-0.5 select-none">
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isAutoplayRunning
                    ? "bg-[#FF5108] shadow-[0_0_8px_rgba(255,81,8,0.8)] animate-pulse"
                    : "bg-[#737680]"
                }`}
                aria-hidden="true"
              />
              <span className="uppercase tracking-wider font-[600]">
                {isAutoplayRunning ? "RUNNING" : "PAUSED"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
