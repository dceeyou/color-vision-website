"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Testimonial } from "@/lib/wordpress/types";

export default function Testimonials({
  testimonials: propTestimonials,
}: {
  testimonials?: Testimonial[];
}) {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const quoteContainerRef = useRef<HTMLDivElement>(null);
  const touchStartXRef = useRef<number | null>(null);

  // Exact 3 structured demo slots clearly identified as placeholder client reviews
  const defaultTestimonials: Testimonial[] = [
    {
      id: "demo-1",
      clientName: "Client Partner [Demo Placeholder]",
      clientRole: "Product Director",
      companyName: "Fintech & Mobility Ecosystem",
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
      testimonial:
        "Color Vision's collaborative process is remarkably focused and transparent. They transformed complex technical requirements into a clean, purposeful digital experience that scaled effortlessly across our entire platform.",
      clientPhoto: null,
      companyLogo: null,
      projectReference: "04 — Goodly Packaging & Web",
    },
  ];

  const testimonials =
    propTestimonials && propTestimonials.length >= 3
      ? propTestimonials
      : defaultTestimonials;

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [autoPlayEnabled, setAutoPlayEnabled] = useState<boolean>(true);
  const [isHoveredOrFocused, setIsHoveredOrFocused] = useState<boolean>(false);

  // Navigation handlers
  const goToNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 450);
  }, [isAnimating, testimonials.length]);

  const goToPrev = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 450);
  }, [isAnimating, testimonials.length]);

  const goToIndex = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 450);
    // User manual action pauses further autoplay
    setAutoPlayEnabled(false);
  };

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLElement>) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        setAutoPlayEnabled(false);
        goToNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setAutoPlayEnabled(false);
        goToPrev();
      }
    },
    [goToNext, goToPrev]
  );

  // Touch / Swipe navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartXRef.current - touchEndX;

    // Minimum swipe threshold: 45px
    if (Math.abs(diffX) > 45) {
      setAutoPlayEnabled(false);
      if (diffX > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
    touchStartXRef.current = null;
  };

  // Autoplay with generous 8s interval & respect for reduced-motion
  useEffect(() => {
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced || !autoPlayEnabled || isHoveredOrFocused) return;

    const timer = setInterval(() => {
      // Pause if browser tab is not active
      if (document.hidden) return;
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 8500);

    return () => clearInterval(timer);
  }, [autoPlayEnabled, isHoveredOrFocused, testimonials.length]);

  // GSAP initial reveal
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

      if (quoteContainerRef.current) {
        gsap.fromTo(
          quoteContainerRef.current,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power2.out",
            scrollTrigger: {
              trigger: quoteContainerRef.current,
              start: "top 80%",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const activeTestimonial = testimonials[currentIndex];
  const progressPercent = ((currentIndex + 1) / testimonials.length) * 100;

  return (
    <section
      id="testimonials"
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHoveredOrFocused(true)}
      onMouseLeave={() => setIsHoveredOrFocused(false)}
      onFocus={() => setIsHoveredOrFocused(true)}
      onBlur={() => setIsHoveredOrFocused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Client Testimonials and Reviews"
      className="relative w-full bg-[#08090D] py-24 md:py-32 lg:py-40 border-b border-white/[0.08] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF5108]/50"
    >
      <div className="w-full max-w-[1280px] mx-auto px-4 md:px-6 lg:px-0">
        {/* Section Introduction */}
        <div
          ref={headerRef}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 lg:gap-16 mb-16 md:mb-24"
        >
          {/* Left Column: Eyebrow + Main Heading */}
          <div className="lg:w-7/12">
            <div className="flex items-center gap-2.5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5108] inline-block shadow-[0_0_8px_rgba(255,81,8,0.6)]" />
              <p className="uppercase tracking-[0.22em] text-[12px] md:text-[13px] font-[600] text-[#8E9098]">
                FROM THE PEOPLE WE WORK WITH
              </p>
              <span className="text-[#737680] font-mono text-[11px] tracking-widest ml-1">
                (03 CLIENT VOICES)
              </span>
            </div>

            <h2 className="text-[40px] sm:text-[52px] md:text-[62px] lg:text-[72px] xl:text-[80px] font-[800] leading-[1.05] tracking-[-0.03em] select-none">
              <span className="text-[#F4F2ED] block">Good work speaks</span>
              <span className="text-[#FF5108] block">for itself.</span>
            </h2>
          </div>

          {/* Right Column: Supporting Description */}
          <div className="lg:w-5/12 flex justify-start lg:justify-end pb-2">
            <p className="text-[#8E9098] text-[15px] sm:text-[16px] md:text-[17px] leading-[1.75] font-[400] max-w-[480px]">
              Good work starts with a strong collaboration. We value clear communication,
              thoughtful ideas, and lasting relationships built through every project.
            </p>
          </div>
        </div>

        {/* Editorial Testimonial Stage */}
        <div
          ref={quoteContainerRef}
          className="relative pt-8 pb-12 border-t border-b border-white/[0.08]"
        >
          {/* Top Technical Header Row */}
          <div className="flex items-center justify-between mb-8 md:mb-12">
            {/* Distinctive Orange Quotation Mark */}
            <div className="flex items-center gap-4">
              <span
                aria-hidden="true"
                className="font-serif text-[#FF5108] text-[54px] sm:text-[64px] md:text-[76px] leading-none select-none -mb-6 -mt-2 transition-transform duration-300"
              >
                “
              </span>
              <div className="h-6 w-[1px] bg-white/[0.1] hidden sm:block" />
              <span className="text-[11px] font-mono text-[#8E9098] uppercase tracking-widest hidden sm:inline-block">
                COLLABORATIVE STORY
              </span>
            </div>

            {/* Position Tracker Badge */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF5108]" />
                <span className="font-mono text-[11px] font-[700] text-[#F4F2ED] tracking-wider">
                  0{currentIndex + 1}
                </span>
                <span className="text-[#737680] font-mono text-[11px]">/</span>
                <span className="font-mono text-[11px] text-[#8E9098] tracking-wider">
                  0{testimonials.length}
                </span>
              </div>
            </div>
          </div>

          {/* The Large Expressive Quotation */}
          <div className="min-h-[180px] sm:min-h-[200px] md:min-h-[220px] flex items-center">
            <blockquote
              key={activeTestimonial.id}
              className={`text-[21px] sm:text-[26px] md:text-[32px] lg:text-[36px] xl:text-[40px] font-[600] text-[#F4F2ED] leading-[1.4] sm:leading-[1.38] tracking-[-0.02em] max-w-[1100px] transition-all duration-500 ease-out ${
                isAnimating
                  ? "opacity-0 -translate-y-2"
                  : "opacity-100 translate-y-0"
              }`}
            >
              &ldquo;{activeTestimonial.testimonial}&rdquo;
            </blockquote>
          </div>

          {/* Attribution & Metadata Row */}
          <div
            className={`mt-10 sm:mt-14 pt-8 border-t border-white/[0.06] flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all duration-500 ease-out ${
              isAnimating ? "opacity-30" : "opacity-100"
            }`}
          >
            {/* Client Identity & Affiliation */}
            <div>
              <div className="flex items-center gap-3 mb-1">
                <p className="text-[16px] sm:text-[18px] md:text-[19px] font-[700] text-[#F4F2ED] tracking-[-0.01em]">
                  {activeTestimonial.clientName}
                </p>
                {activeTestimonial.projectReference && (
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#FF5108] bg-[#FF5108]/10 border border-[#FF5108]/20 px-2.5 py-0.5 rounded">
                    {activeTestimonial.projectReference}
                  </span>
                )}
              </div>
              <p className="text-[13px] sm:text-[14px] text-[#8E9098] font-[400]">
                {activeTestimonial.clientRole} —{" "}
                <span className="text-[#F4F2ED]/80 font-[500]">
                  {activeTestimonial.companyName}
                </span>
              </p>
            </div>

            {/* Verification / Demo Notice */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-[#737680] uppercase tracking-widest">
                DEMO SPEC // VERIFIED PARTNERSHIP
              </span>
            </div>
          </div>
        </div>

        {/* Navigation & Progress Rail */}
        <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          {/* Progress Indicator Track */}
          <div className="flex items-center gap-4">
            <span className="text-[11px] font-mono text-[#8E9098] tracking-widest uppercase">
              INDEX
            </span>
            <div className="w-32 sm:w-48 h-[2px] bg-white/[0.08] relative rounded-full overflow-hidden">
              <div
                className="h-full bg-[#FF5108] transition-all duration-500 ease-out shadow-[0_0_8px_rgba(255,81,8,0.7)]"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Numbered Step Selectors & Prev / Next Arrows */}
          <div className="flex items-center gap-4 sm:gap-6 self-end sm:self-auto">
            {/* Numbered Buttons */}
            <div className="flex items-center gap-2" role="tablist" aria-label="Testimonial Slots">
              {testimonials.map((_, idx) => {
                const isActive = currentIndex === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`View testimonial 0${idx + 1}`}
                    onClick={() => goToIndex(idx)}
                    className={`font-mono text-[12px] sm:text-[13px] font-[600] px-2.5 py-1 rounded transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF5108] ${
                      isActive
                        ? "text-[#FF5108] bg-[#FF5108]/10 border border-[#FF5108]/30 shadow-sm"
                        : "text-[#737680] hover:text-[#F4F2ED] bg-transparent"
                    }`}
                  >
                    0{idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Arrow Controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setAutoPlayEnabled(false);
                  goToPrev();
                }}
                aria-label="Previous testimonial"
                className="w-10 h-10 rounded-full border border-white/20 text-[#8E9098] hover:text-[#08090D] hover:bg-[#FF5108] hover:border-[#FF5108] flex items-center justify-center transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF5108] shadow-sm hover:shadow-[0_0_12px_rgba(255,81,8,0.3)]"
              >
                <span className="text-sm font-bold">←</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setAutoPlayEnabled(false);
                  goToNext();
                }}
                aria-label="Next testimonial"
                className="w-10 h-10 rounded-full border border-white/20 text-[#8E9098] hover:text-[#08090D] hover:bg-[#FF5108] hover:border-[#FF5108] flex items-center justify-center transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF5108] shadow-sm hover:shadow-[0_0_12px_rgba(255,81,8,0.3)]"
              >
                <span className="text-sm font-bold">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
