"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Service } from "@/lib/wordpress/types";

export default function Services({ services: propServices }: { services?: Service[] }) {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<HTMLDivElement>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const fallbackServices: Service[] = [
    {
      id: "1",
      serviceNumber: "01",
      name: "Brand Identity",
      shortDescription: "A clear visual language that makes a brand distinctive, consistent, and easy to recognize.",
      longDescription: "A clear visual language that makes a brand distinctive, consistent, and easy to recognize.",
      category: "Branding",
      slug: "brand-identity",
    },
    {
      id: "2",
      serviceNumber: "02",
      name: "UI/UX Design",
      shortDescription: "Digital experiences shaped around real people, clear interactions, and purposeful journeys.",
      longDescription: "Digital experiences shaped around real people, clear interactions, and purposeful journeys.",
      category: "Design",
      slug: "ui-ux-design",
    },
    {
      id: "3",
      serviceNumber: "03",
      name: "Digital Product Design",
      shortDescription: "Structured product experiences that turn complex requirements into simple, useful interfaces.",
      longDescription: "Structured product experiences that turn complex requirements into simple, useful interfaces.",
      category: "Product",
      slug: "digital-product-design",
    },
    {
      id: "4",
      serviceNumber: "04",
      name: "Web Design",
      shortDescription: "Responsive digital experiences that balance brand character, usability, clarity, and conversion.",
      longDescription: "Responsive digital experiences that balance brand character, usability, clarity, and conversion.",
      category: "Web",
      slug: "web-design",
    },
    {
      id: "5",
      serviceNumber: "05",
      name: "Design Systems",
      shortDescription: "Flexible visual foundations that keep digital products consistent, scalable, and easier to evolve.",
      longDescription: "Flexible visual foundations that keep digital products consistent, scalable, and easier to evolve.",
      category: "Systems",
      slug: "design-systems",
    },
    {
      id: "6",
      serviceNumber: "06",
      name: "Visual Communication",
      shortDescription: "Purposeful visuals that make ideas easier to understand, remember, and connect with.",
      longDescription: "Purposeful visuals that make ideas easier to understand, remember, and connect with.",
      category: "Communication",
      slug: "visual-communication",
    },
  ];

  const services = propServices && propServices.length >= 6 ? propServices : fallbackServices;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isReduced) return;

    const ctx = gsap.context(() => {
      // Intro header reveal
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

      // Staggered reveal of service rows
      const rows = rowsRef.current?.querySelectorAll(".service-row");
      if (rows && rows.length > 0) {
        gsap.fromTo(
          rows,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: rowsRef.current,
              start: "top 80%",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Smooth scroll to contact section
  const handleServiceClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
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
      id="services"
      ref={containerRef}
      className="relative w-full bg-transparent py-24 md:py-32 lg:py-40 border-b border-white/[0.06]"
    >
      <div className="w-full max-w-[1280px] mx-auto px-4 md:px-6 lg:px-0">
        {/* Two-Column Introductory Composition */}
        <div
          ref={headerRef}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 lg:gap-16 mb-16 md:mb-24"
        >
          {/* Left Column: Eyebrow + Main Heading */}
          <div className="lg:w-7/12">
            <div className="flex items-center gap-2.5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5108] inline-block shadow-[0_0_8px_rgba(255,81,8,0.7)]" />
              <p className="uppercase tracking-[0.22em] text-[12px] md:text-[13px] font-[600] text-[#8E9098]">
                WHAT WE DO
              </p>
            </div>

            <h2 className="text-[44px] sm:text-[56px] md:text-[68px] lg:text-[76px] xl:text-[84px] font-[800] leading-[1.0] tracking-[-0.03em] select-none">
              <span className="text-[#F4F2ED] block">Design for</span>
              <span className="text-[#F4F2ED] block">real-world</span>
              <span className="text-[#FF5108] block">impact.</span>
            </h2>
          </div>

          {/* Right Column: Supporting Description */}
          <div className="lg:w-5/12 flex justify-start lg:justify-end pb-2">
            <p className="text-[#8E9098] text-[15px] sm:text-[16px] md:text-[17px] leading-[1.75] font-[400] max-w-[480px]">
              We bring strategy, creativity and thoughtful execution together to help businesses
              communicate clearly and move forward with confidence. Every project begins with
              understanding the problem before deciding what the solution should look like.
            </p>
          </div>
        </div>

        {/* Six Full-Width Editorial Service Rows */}
        <div ref={rowsRef} className="w-full border-t border-white/[0.08]">
          {services.map((service, idx) => {
            const isHovered = hoveredIdx === idx;
            const isDimmed = hoveredIdx !== null && hoveredIdx !== idx;

            return (
              <a
                key={service.id || idx}
                href="#contact"
                onClick={handleServiceClick}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`service-row group block w-full py-8 sm:py-10 md:py-12 border-b border-white/[0.08] transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF5108] relative hover:bg-white/[0.02] ${
                  isDimmed ? "opacity-35" : "opacity-100"
                } ${isHovered ? "border-white/[0.2]" : ""}`}
              >
                {/* Desktop & Tablet Layout (Horizontal Editorial Row) */}
                <div className="hidden md:flex items-center justify-between gap-6 lg:gap-12 w-full px-2 sm:px-4">
                  {/* Number */}
                  <span
                    className={`font-mono text-[13px] md:text-[14px] tracking-[0.18em] transition-colors duration-300 shrink-0 w-16 lg:w-20 ${
                      isHovered ? "text-[#FF7A24]" : "text-[#FF5108]"
                    }`}
                  >
                    {service.serviceNumber || `0${idx + 1}`}
                  </span>

                  {/* Service Title with subtle horizontal shift */}
                  <div className="w-5/12 lg:w-4/12 shrink-0">
                    <h3
                      className={`text-[28px] lg:text-[34px] xl:text-[38px] font-[800] tracking-[-0.02em] leading-tight transition-all duration-300 ${
                        isHovered
                          ? "text-[#FF5108] translate-x-2.5"
                          : "text-[#F4F2ED] translate-x-0"
                      }`}
                    >
                      {service.name}
                    </h3>
                  </div>

                  {/* Short Description */}
                  <div className="flex-1 max-w-[460px] pr-4">
                    <p
                      className={`text-[14px] lg:text-[15px] leading-[1.65] font-[400] transition-colors duration-300 ${
                        isHovered ? "text-[#F4F2ED]" : "text-[#8E9098]"
                      }`}
                    >
                      {service.shortDescription || service.longDescription}
                    </p>
                  </div>

                  {/* Arrow Indicator */}
                  <div className="shrink-0 w-12 flex justify-end">
                    <div
                      className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${
                        isHovered
                          ? "bg-[#FF5108] border-[#FF5108] text-[#08090D] shadow-md shadow-[#FF5108]/25"
                          : "border-white/15 text-white/50 bg-transparent"
                      }`}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`transition-transform duration-300 ${
                          isHovered ? "translate-x-0.5 -translate-y-0.5" : ""
                        }`}
                        aria-hidden="true"
                      >
                        <path
                          d="M1.5 12.5L12.5 1.5M12.5 1.5H3.5M12.5 1.5V10.5"
                          stroke="currentColor"
                          strokeWidth="1.75"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Mobile Layout */}
                <div className="md:hidden flex flex-col gap-3 px-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[12px] tracking-[0.16em] text-[#FF5108]">
                        {service.serviceNumber || `0${idx + 1}`}
                      </span>
                      <h3
                        className={`text-[22px] sm:text-[26px] font-[800] tracking-[-0.02em] leading-tight transition-colors duration-300 ${
                          isHovered ? "text-[#FF5108]" : "text-[#F4F2ED]"
                        }`}
                      >
                        {service.name}
                      </h3>
                    </div>

                    <div
                      className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 shrink-0 ${
                        isHovered
                          ? "bg-[#FF5108] border-[#FF5108] text-[#08090D]"
                          : "border-white/15 text-white/50 bg-transparent"
                      }`}
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          d="M1.5 12.5L12.5 1.5M12.5 1.5H3.5M12.5 1.5V10.5"
                          stroke="currentColor"
                          strokeWidth="1.75"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>

                  <p className="text-[#8E9098] text-[14px] leading-[1.6] pl-7 font-[400]">
                    {service.shortDescription || service.longDescription}
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
