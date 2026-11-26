"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Sparkles } from "lucide-react";
import { AboutFounderData } from "@/lib/about/types";

interface FounderProfileProps {
  data: AboutFounderData;
}

export default function FounderProfile({ data }: FounderProfileProps) {
  const containerRef = useRef<HTMLElement>(null);
  const imageColRef = useRef<HTMLDivElement>(null);
  const bioColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      if (imageColRef.current && bioColRef.current) {
        gsap.fromTo(
          imageColRef.current,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
            },
          }
        );

        gsap.fromTo(
          bioColRef.current,
          { opacity: 0, x: 30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="founder"
      ref={containerRef}
      aria-label="Founder Profile"
      className="relative w-full py-20 sm:py-28 md:py-36 border-b border-white/[0.08] overflow-hidden"
    >
      {/* Ambient background glow */}
      <div
        className="pointer-events-none absolute -left-32 top-1/3 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(255,81,8,0.06)_0%,transparent_70%)] blur-3xl"
        aria-hidden="true"
      />

      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* =========================================================================
              LEFT COLUMN: Founder Portrait / Architectural Studio Placeholder
              ========================================================================= */}
          <div
            ref={imageColRef}
            className="lg:col-span-5 lg:sticky lg:top-28"
          >
            <div className="relative rounded-2xl bg-[#111218] border border-white/[0.12] p-6 sm:p-8 overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
              {/* Subtle orange accent glow behind portrait */}
              <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-[#FF5108]/15 blur-3xl pointer-events-none group-hover:bg-[#FF5108]/25 transition-colors duration-500" />

              {/* Portrait Frame */}
              <div className="relative aspect-[3/4] w-full rounded-xl bg-[#08090D] border border-white/[0.08] flex flex-col justify-between p-4 sm:p-5 overflow-hidden group/portrait shadow-[inset_0_0_40px_rgba(0,0,0,0.8)]">
                {/* Real Founder Portrait Photograph */}
                <Image
                  src={data.imageSrc || "/founder/dilshan-udawatta.webp"}
                  alt={data.imageAlt || "Dilshan Udawatta — Founder and Lead Designer of Color Vision."}
                  fill
                  priority
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 45vw, 420px"
                  className="object-cover object-[50%_18%] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />

                {/* Subtle dark cinematic gradients to ensure framing clarity & badge legibility */}
                <div
                  className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#08090D]/80 via-[#08090D]/20 to-transparent pointer-events-none"
                  aria-hidden="true"
                />
                <div
                  className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#08090D]/90 via-[#08090D]/30 to-transparent pointer-events-none"
                  aria-hidden="true"
                />

                {/* Top Meta Header */}
                <div className="relative z-10 flex items-center justify-between border-b border-white/[0.08] pb-2.5 backdrop-blur-[2px]">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF5108] animate-pulse" />
                    <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#F4F2ED]/90">
                      STUDIO PORTRAIT
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-[#8E9098]">
                    REF // DU-01
                  </span>
                </div>

                {/* Bottom Spec Footer */}
                <div className="relative z-10 pt-2.5 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-[#B2B4BC] backdrop-blur-[2px]">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-[#FF5108]" />
                    <span>{data.location || "Colombo, LK"}</span>
                  </span>
                  <span>Est. {data.foundedDate || "May 2020"}</span>
                </div>
              </div>

              {/* Founder Quick Credentials Card */}
              <div className="mt-5 pt-4 border-t border-white/[0.06] grid grid-cols-2 gap-3 text-center">
                <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                  <div className="font-mono text-[11px] text-[#737680] uppercase tracking-wider">
                    Experience
                  </div>
                  <div className="text-[14px] font-[700] text-[#F4F2ED] mt-0.5">
                    8+ Years
                  </div>
                </div>
                <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                  <div className="font-mono text-[11px] text-[#737680] uppercase tracking-wider">
                    Discipline
                  </div>
                  <div className="text-[14px] font-[700] text-[#F4F2ED] mt-0.5">
                    UI/UX & Brand
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* =========================================================================
              RIGHT COLUMN: Biography & Editorial Story
              ========================================================================= */}
          <div ref={bioColRef} className="lg:col-span-7 space-y-8">
            {/* Eyebrow & Name Header */}
            <div>
              <div className="flex items-center gap-2.5 mb-4 sm:mb-5">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-[#FF5108] inline-block shadow-[0_0_8px_rgba(255,81,8,0.8)]"
                  aria-hidden="true"
                />
                <p className="uppercase tracking-[0.24em] text-[11px] sm:text-[12px] md:text-[13px] font-[600] text-[#8E9098]">
                  {data.eyebrow}
                </p>
              </div>

              <h2 className="text-[36px] sm:text-[48px] md:text-[56px] font-[800] leading-[1.05] tracking-[-0.035em] text-[#F4F2ED] mb-3">
                {data.name}
              </h2>

              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-[#FF5108]/10 border border-[#FF5108]/20 text-[#FF5108] text-[12px] font-mono tracking-wider uppercase font-[600]">
                  {data.role}
                </span>
                <span className="text-[13px] text-[#8E9098]">
                  Color Vision Studio
                </span>
              </div>
            </div>

            {/* Biography Prose (5 Paragraphs) */}
            <div className="space-y-5 text-[#B2B4BC] text-[15.5px] sm:text-[17px] leading-[1.8] font-[400]">
              {data.bioParagraphs.map((para, idx) => (
                <p key={idx} className={idx === 0 ? "text-[#F4F2ED] text-[17px] sm:text-[18.5px] leading-[1.7] font-[500]" : ""}>
                  {para}
                </p>
              ))}
            </div>

            {/* Editorial Typographic Signature Treatment */}
            <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <p className="font-editorial italic text-[34px] sm:text-[42px] leading-[1] text-[#F4F2ED] select-none">
                  {data.signatureText}
                </p>
                <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#8E9098] mt-2">
                  Founder & Creative Lead · Color Vision
                </p>
              </div>

              <div className="flex items-center gap-2 text-[12px] text-[#737680] font-mono">
                <Sparkles className="w-3.5 h-3.5 text-[#FF5108]" />
                <span>Intentional Design Leadership</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
