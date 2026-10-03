"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Manrope } from "next/font/google";
import LaunchCursor from "@/components/launch/LaunchCursor";
import LiquidBackgroundWebGL from "@/components/launch/LiquidBackgroundWebGL";
import LaunchCountdown from "@/components/launch/LaunchCountdown";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export default function LaunchPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Cinematic Entrance Sequence
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    
    // Initial states
    gsap.set(".reveal-grid", { opacity: 0 });
    gsap.set(".reveal-logo", { opacity: 0, x: -20 });
    gsap.set(".reveal-eyebrow", { opacity: 0, y: 10 });
    gsap.set(".reveal-headline-line", { opacity: 0, y: 30, rotationX: -20 });
    gsap.set(".reveal-desc", { opacity: 0, y: 20 });
    gsap.set(".reveal-playful", { opacity: 0, y: 20 });
    gsap.set(".reveal-countdown", { opacity: 0, y: 20 });
    gsap.set(".reveal-contact", { opacity: 0, y: 20 });

    // Sequence
    tl.to(".reveal-grid", { opacity: 1, duration: 2 }, 0.2)
      .to(".reveal-logo", { opacity: 1, x: 0, duration: 1.5 }, 0.5)
      .to(".reveal-eyebrow", { opacity: 1, y: 0, duration: 1 }, 0.8)
      .to(".reveal-headline-line", { opacity: 1, y: 0, rotationX: 0, duration: 1.2, stagger: 0.15 }, 1.0)
      .to(".reveal-desc", { opacity: 1, y: 0, duration: 1 }, 1.4)
      .to(".reveal-playful", { opacity: 1, y: 0, duration: 1 }, 1.6)
      .to(".reveal-countdown", { opacity: 1, y: 0, duration: 1 }, 1.8)
      .to(".reveal-contact", { opacity: 1, y: 0, duration: 1 }, 2.0);

    return () => {};
  }, []);

  return (
    <div ref={containerRef} className={`min-h-screen flex flex-col items-center justify-center bg-[#050608] text-foreground p-6 md:p-8 lg:p-12 relative overflow-hidden selection:bg-accent selection:text-black ${manrope.className}`}>
      
      {/* Background System */}
      <div className="reveal-grid absolute inset-0 z-0 pointer-events-none">
        <LiquidBackgroundWebGL />
      </div>

      <LaunchCursor />

      {/* Header Logo */}
      <header className="absolute top-0 left-0 w-full z-10">
        <div className="reveal-logo absolute left-6 top-6 md:left-12 md:top-8">
          <div className="w-32 h-10 relative">
             <Image src="/logo.png" alt="Color Vision" fill className="object-contain object-left" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center text-center w-full max-w-5xl mx-auto z-10 w-full relative pt-12 md:pt-0">

        {/* Typography */}
        <div className="space-y-6 flex flex-col items-center">
          <p className="reveal-eyebrow text-[rgba(255,255,255,0.65)] text-xs tracking-[0.2em] uppercase font-[500]">
            Color Vision / 2026
          </p>
          
          <div className="flex flex-col items-center space-y-[-5px] md:space-y-[-10px] perspective-1000 mt-4 leading-none">
            <div className="overflow-hidden pb-2 pt-2">
              <h1 className="reveal-headline-line text-5xl md:text-7xl lg:text-8xl font-[800] tracking-tight uppercase text-white">
                The View Is
              </h1>
            </div>
            <div className="overflow-hidden pb-2 pt-2">
              <h1 className="reveal-headline-line text-5xl md:text-7xl lg:text-8xl font-[800] tracking-tight text-accent uppercase">
                Changing.
              </h1>
            </div>
          </div>
          
          <p className="reveal-desc font-[400] text-[15px] md:text-[18px] leading-[1.6] md:leading-[1.7] text-[rgba(255,255,255,0.65)] max-w-[600px] mx-auto mt-8">
            We&apos;re busy turning ideas into pixels, pixels into experiences, and experiences into something you&apos;ll actually want to look at.
          </p>

          <p className="reveal-playful font-[500] text-[13px] md:text-[15px] text-[rgba(255,255,255,0.4)] tracking-wide max-w-[600px] mx-auto mt-4">
            Just give us a little time. We&apos;re probably changing the color again.
          </p>
        </div>

        <div className="reveal-countdown w-full flex justify-center mt-12 md:mt-16">
          <LaunchCountdown />
        </div>
        
        {/* Contact Section */}
        <div className="reveal-contact flex flex-col items-center gap-3 mt-16 text-[13px] md:text-[15px] font-[500] text-[rgba(255,255,255,0.65)]">
          <a href="mailto:info@colorvision.lk" className="hover:text-accent transition-colors">info@colorvision.lk</a>
          <a href="https://wa.me/94761428445" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors flex items-center gap-2">
            +94 76 142 8445 <span className="text-[rgba(255,255,255,0.4)]">&middot; WhatsApp</span>
          </a>
        </div>

      </main>
    </div>
  );
}
