"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const navLinks = [
    { name: "Work", href: "#work" },
    { name: "Services", href: "#services" },
    { name: "About Us", href: "#about" },
    { name: "Process", href: "#process" },
    { name: "Contact", href: "#contact" },
  ];

  // Configurable social destinations (kept clean and inactive until live handles are configured)
  const socialLinks = [
    { name: "Instagram", url: "#" },
    { name: "LinkedIn", url: "#" },
    { name: "Behance", url: "#" },
    { name: "Dribbble", url: "#" },
  ];

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const target = document.getElementById(id);
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
    <footer className="relative w-full bg-[#08090D] pt-20 md:pt-28 lg:pt-36 pb-12 md:pb-16 border-t border-white/[0.06] overflow-hidden">
      {/* Background Subtle Grid Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="relative w-full max-w-[1280px] mx-auto px-4 md:px-6 lg:px-0 z-10">
        {/* 1. TOP: Brand Introduction & Statement */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 lg:gap-16 mb-16 md:mb-24">
          <div className="max-w-2xl">
            {/* Studio Logo & Eyebrow */}
            <div className="flex items-center gap-4 mb-6">
              <Link href="/" className="inline-block relative w-32 h-8 transition-opacity duration-200 hover:opacity-80">
                <Image
                  src="/logo.png"
                  alt="Color Vision"
                  fill
                  className="object-contain object-left"
                />
              </Link>
              <div className="h-4 w-[1px] bg-white/[0.15] hidden sm:block" />
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF5108] inline-block shadow-[0_0_8px_rgba(255,81,8,0.6)]" />
                <p className="uppercase tracking-[0.22em] text-[11px] sm:text-[12px] font-[600] text-[#8E9098]">
                  INDEPENDENT DESIGN STUDIO · SRI LANKA
                </p>
              </div>
            </div>

            {/* Main Statement */}
            <h2 className="text-[36px] sm:text-[46px] md:text-[56px] lg:text-[64px] font-[800] tracking-[-0.03em] leading-tight select-none">
              <span className="text-[#F4F2ED]">Ideas, </span>
              <span className="text-[#FF5108]">made clear.</span>
            </h2>
          </div>

          {/* Supporting Description */}
          <div className="lg:max-w-md pb-2">
            <p className="text-[#8E9098] text-[15px] sm:text-[16px] leading-[1.75] font-[400]">
              Independent design studio based in Sri Lanka, helping ambitious businesses turn ideas
              into clear brands, digital products, and meaningful experiences.
            </p>
          </div>
        </div>

        {/* 2. MIDDLE: Three Navigation Columns */}
        <div className="pt-12 md:pt-16 pb-16 md:pb-24 border-t border-white/[0.08] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Column 1: Navigation (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <h3 className="text-[12px] font-mono uppercase tracking-[0.2em] text-[#737680] font-[600]">
              NAVIGATION
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleScrollToSection(e, link.href)}
                    className="group inline-flex items-center gap-2 text-[#8E9098] hover:text-[#F4F2ED] transition-colors duration-200 text-[15px] font-[500] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF5108] rounded"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF5108] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    <span className="transition-transform duration-200 group-hover:translate-x-1">
                      {link.name}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Social (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <h3 className="text-[12px] font-mono uppercase tracking-[0.2em] text-[#737680] font-[600]">
              SOCIAL
            </h3>
            <ul className="space-y-3">
              {socialLinks.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.url}
                    onClick={social.url === "#" ? (e) => e.preventDefault() : undefined}
                    target={social.url !== "#" ? "_blank" : undefined}
                    rel={social.url !== "#" ? "noopener noreferrer" : undefined}
                    className="group inline-flex items-center gap-2 text-[#8E9098] hover:text-[#F4F2ED] transition-colors duration-200 text-[15px] font-[500] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF5108] rounded"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF5108] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    <span className="transition-transform duration-200 group-hover:translate-x-1">
                      {social.name}
                    </span>
                    <span className="text-[12px] text-[#737680] group-hover:text-[#FF5108] transition-colors duration-200">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <h3 className="text-[12px] font-mono uppercase tracking-[0.2em] text-[#737680] font-[600]">
              CONTACT
            </h3>
            <div className="space-y-4 text-[15px]">
              <div>
                <a
                  href="mailto:info@colorvision.lk"
                  className="text-[#F4F2ED] hover:text-[#FF5108] transition-colors duration-200 font-[500] inline-block focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF5108] rounded"
                >
                  info@colorvision.lk
                </a>
              </div>
              <div>
                <a
                  href="tel:+94761428445"
                  className="text-[#8E9098] hover:text-[#FF5108] transition-colors duration-200 font-mono text-[14px] inline-block focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF5108] rounded"
                >
                  +94 76 142 8445
                </a>
              </div>
              <p className="text-[#8E9098] leading-[1.65] max-w-xs text-[14px]">
                Maguruboda Road, Dodangoda, Kalutara South, Sri Lanka
              </p>
            </div>
          </div>
        </div>

        {/* 3. BOTTOM: Oversized Brand Wordmark & Legal Row */}
        <div className="pt-12 md:pt-16 border-t border-white/[0.08]">
          {/* Oversized COLOR VISION Signature Wordmark */}
          <div className="w-full select-none overflow-hidden pb-8 sm:pb-12 text-center md:text-left">
            <span className="font-[900] tracking-[-0.04em] uppercase text-white/[0.06] hover:text-white/[0.1] transition-colors duration-700 text-[44px] sm:text-[72px] md:text-[104px] lg:text-[136px] xl:text-[156px] leading-[0.88] block text-nowrap">
              COLOR VISION
            </span>
          </div>

          {/* Legal Meta & Back-to-Top Controls */}
          <div className="pt-8 border-t border-white/[0.06] flex flex-col md:flex-row justify-between items-center gap-6 text-[12px] md:text-[13px] font-[500] text-[#737680]">
            {/* Copyright */}
            <div>
              <p>&copy; {new Date().getFullYear()} Color Vision. All rights reserved.</p>
            </div>

            {/* Privacy Policy & Terms */}
            <div className="flex items-center gap-6 sm:gap-8">
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="hover:text-[#F4F2ED] transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF5108] rounded"
              >
                Privacy Policy
              </a>
              <span className="text-white/[0.1]">•</span>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="hover:text-[#F4F2ED] transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF5108] rounded"
              >
                Terms and Conditions
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
