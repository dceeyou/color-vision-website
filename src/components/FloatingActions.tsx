"use client";

import { useEffect, useState, useCallback } from "react";

export default function FloatingActions() {
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);

  // Monitor scroll position with requestAnimationFrame throttle
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY || document.documentElement.scrollTop;
          setShowBackToTop(scrollY > 400);
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Smooth scroll to top
  const handleScrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: isReducedMotion ? "auto" : "smooth",
    });
  }, [isReducedMotion]);

  return (
    <aside
      aria-label="Floating website actions"
      className="fixed right-4 sm:right-6 md:right-8 bottom-5 sm:bottom-6 md:bottom-8 z-50 flex flex-col items-end gap-3 sm:gap-4 pointer-events-none pb-[env(safe-area-inset-bottom)] select-none"
    >
      {/* =========================================================================
          1. BACK TO TOP BUTTON (Floats above WhatsApp)
          ========================================================================= */}
      <button
        type="button"
        onClick={handleScrollToTop}
        aria-label="Scroll back to top of page"
        tabIndex={showBackToTop ? 0 : -1}
        className={`group inline-flex items-center gap-2.5 bg-[#08090D]/90 backdrop-blur-md border border-white/10 hover:border-[#FF5108]/60 shadow-[0_4px_20px_rgba(0,0,0,0.55)] pl-3.5 pr-2 py-1.5 rounded-full text-[#8E9098] hover:text-[#FF5108] uppercase tracking-[0.14em] text-[10px] sm:text-[11px] font-mono font-[600] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF5108] transition-all duration-300 ${
          showBackToTop
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-3 pointer-events-none"
        }`}
      >
        <span>BACK TO TOP</span>
        <div className="w-7 h-7 rounded-full border border-white/20 group-hover:border-[#FF5108] group-hover:bg-[#FF5108] group-hover:text-[#08090D] flex items-center justify-center transition-all duration-300">
          <span className="transition-transform duration-300 group-hover:-translate-y-0.5 font-bold text-xs">
            ↑
          </span>
        </div>
      </button>

      {/* =========================================================================
          2. FLOATING WHATSAPP BUTTON (Floats at bottom-right)
          ========================================================================= */}
      <div className="relative group pointer-events-auto">
        {/* Accessible Tooltip */}
        <span
          role="tooltip"
          className="absolute right-full mr-3.5 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-md bg-[#08090D]/95 border border-white/10 text-[#F4F2ED] text-[12px] font-[500] tracking-wide whitespace-nowrap shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 group-focus-within:opacity-100 transition-all duration-200 translate-x-1 group-hover:translate-x-0 group-focus-within:translate-x-0 hidden sm:block"
        >
          Chat with us on WhatsApp
        </span>

        <a
          href="https://wa.me/94761428445"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp (+94 76 142 8445)"
          className="w-12 h-12 md:w-[50px] md:h-[50px] rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-[0_4px_16px_rgba(37,211,102,0.35)] hover:shadow-[0_6px_24px_rgba(37,211,102,0.55)] transition-all duration-300 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-[#08090D]"
        >
          {/* Authentic WhatsApp Brand SVG Icon */}
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            className="w-6 h-6 fill-current transition-transform duration-300 group-hover:scale-105"
            aria-hidden="true"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.888 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </a>
      </div>
    </aside>
  );
}
