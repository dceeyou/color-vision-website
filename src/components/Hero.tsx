"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import Image from "next/image";
import { HeroContent } from "@/lib/wordpress/types";

export default function Hero({ hero }: { hero?: HeroContent }) {
  const containerRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const title1Ref = useRef<HTMLHeadingElement>(null);
  const title2Ref = useRef<HTMLHeadingElement>(null);
  const pRef = useRef<HTMLParagraphElement>(null);
  const btnsRef = useRef<HTMLDivElement>(null);
  const graphicContainerRef = useRef<HTMLDivElement>(null);
  const graphicFloatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isReduced) {
      // Ensure everything is immediately visible if reduced motion is requested
      gsap.set([eyebrowRef.current, pRef.current, btnsRef.current, graphicContainerRef.current], {
        opacity: 1,
        y: 0,
      });
      gsap.set([title1Ref.current, title2Ref.current], {
        yPercent: 0,
      });
      return;
    }

    // Initial progressive entrance animation
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      eyebrowRef.current,
      { opacity: 0, y: 16 },
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
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.75 },
        0.58
      )
      .fromTo(
        btnsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7 },
        0.72
      )
      .fromTo(
        graphicContainerRef.current,
        { opacity: 0, scale: 0.94 },
        { opacity: 1, scale: 1, duration: 1.4, ease: "power2.out" },
        0.3
      );

    // Subtle continuous breathing / floating animation for the abstract graphic
    const floatAnim = gsap.to(graphicFloatRef.current, {
      y: -10,
      scale: 1.015,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Restrained mouse parallax for depth
    const onMouseMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;

      gsap.to(graphicContainerRef.current, {
        x: dx * 12,
        y: dy * 12,
        duration: 1.2,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    return () => {
      tl.kill();
      floatAnim.kill();
      window.removeEventListener("mousemove", onMouseMove);
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
              {hero?.eyebrow || "Creative Design Studio"}
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

          {/* Studio Introduction Description */}
          <p
            ref={pRef}
            className="opacity-0 text-[#8E9098] text-[15px] sm:text-[16px] lg:text-[17px] leading-[1.7] max-w-[540px] mt-7 md:mt-8 font-[400]"
          >
            {hero?.description ||
              "Color Vision is a design studio based in Sri Lanka, helping ambitious businesses turn ideas into clear brands, intuitive digital products, and meaningful experiences. From brand identity and UI/UX design to websites and digital products, we bring strategy, creativity, and thoughtful execution together to create work that has a reason to exist."}
          </p>

          {/* CTA Buttons */}
          <div
            ref={btnsRef}
            className="opacity-0 mt-9 md:mt-11 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5"
          >
            <Link
              href={hero?.primaryCtaUrl || "#work"}
              className="inline-flex items-center justify-center gap-2 bg-[#FF5108] text-[#08090D] px-8 py-4 font-[700] uppercase tracking-[0.06em] text-[12px] md:text-[13px] rounded-full hover:bg-[#FF6622] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 shadow-lg shadow-[#FF5108]/20 group"
            >
              <span>{hero?.primaryCtaLabel || "View Our Work"}</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
            <Link
              href={hero?.secondaryCtaUrl || "#contact"}
              className="inline-flex items-center justify-center border border-[#FF5108]/80 text-[#FF5108] bg-transparent px-8 py-4 font-[700] uppercase tracking-[0.06em] text-[12px] md:text-[13px] rounded-full hover:bg-[#FF5108] hover:text-[#08090D] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
            >
              <span>{hero?.secondaryCtaLabel || "Start A Project"}</span>
            </Link>
          </div>
        </div>

        {/* Right Graphic (Columns 8-12 on desktop) */}
        <div className="col-span-4 md:col-span-8 lg:col-span-5 flex justify-center lg:justify-end items-center mt-12 lg:mt-0 z-0">
          <div
            ref={graphicContainerRef}
            className="opacity-0 relative w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] md:w-[460px] md:h-[460px] lg:w-[560px] lg:h-[560px] xl:w-[620px] xl:h-[620px] lg:-mr-10 xl:-mr-14 pointer-events-none select-none"
          >
            {/* Subtle ambient orange radial glow behind technical graphic */}
            <div className="absolute inset-0 bg-[#FF5108]/10 blur-[90px] md:blur-[110px] rounded-full scale-75 pointer-events-none" />

            <div ref={graphicFloatRef} className="relative w-full aspect-square">
              <Image
                src="/hero-graphic.png"
                alt="Color Vision Geometric Structure"
                fill
                priority
                sizes="(max-width: 640px) 300px, (max-width: 1024px) 460px, 620px"
                className="object-contain relative z-10"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
