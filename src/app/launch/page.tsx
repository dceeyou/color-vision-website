"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import LaunchCursor from "@/components/launch/LaunchCursor";
import LiquidBackgroundWebGL from "@/components/launch/LiquidBackgroundWebGL";
import LaunchCountdown from "@/components/launch/LaunchCountdown";


export default function LaunchPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hide global Navigation and Footer dynamically so we don't affect main site RootLayout
    const globalHeader = document.querySelector('header.fixed');
    const globalFooter = document.querySelector('footer.border-border-light');
    if (globalHeader) globalHeader.setAttribute('style', 'display: none !important');
    if (globalFooter) globalFooter.setAttribute('style', 'display: none !important');

    // Cinematic Entrance Sequence
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    
    // Initial states
    gsap.set(".reveal-grid", { opacity: 0 });
    gsap.set(".reveal-logo", { opacity: 0, x: -20 });
    gsap.set(".reveal-eyebrow", { opacity: 0, y: 10 });
    gsap.set(".reveal-headline-line", { opacity: 0, y: 30, rotationX: -20 });
    gsap.set(".reveal-desc", { opacity: 0, y: 20 });
    gsap.set(".reveal-countdown", { opacity: 0, y: 20 });
    gsap.set(".reveal-contact", { opacity: 0, y: 20 });

    // Sequence
    tl.to(".reveal-grid", { opacity: 1, duration: 2 }, 0.2)
      .to(".reveal-logo", { opacity: 1, x: 0, duration: 1.5 }, 0.5)
      .to(".reveal-eyebrow", { opacity: 1, y: 0, duration: 1 }, 0.8)
      .to(".reveal-headline-line", { opacity: 1, y: 0, rotationX: 0, duration: 1.2, stagger: 0.15 }, 1.0)
      .to(".reveal-desc", { opacity: 1, y: 0, duration: 1 }, 1.4)
      .to(".reveal-countdown", { opacity: 1, y: 0, duration: 1 }, 1.6)
      .to(".reveal-contact", { opacity: 1, y: 0, duration: 1 }, 1.8);

    return () => {
      // Restore on unmount just in case
      if (globalHeader) globalHeader.setAttribute('style', '');
      if (globalFooter) globalFooter.setAttribute('style', '');
    };
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen flex flex-col items-center justify-center bg-[#050608] text-foreground p-6 md:p-8 lg:p-12 relative overflow-hidden font-sans selection:bg-accent selection:text-black">
      
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
      <main className="flex-1 flex flex-col items-center justify-center text-center w-full max-w-5xl mx-auto z-10 w-full relative">

        {/* Typography */}
        <div className="space-y-6 flex flex-col items-center">
          <p className="reveal-eyebrow text-muted text-xs tracking-[0.3em] uppercase font-mono">
            Color Vision / 2026
          </p>
          
          <div className="flex flex-col items-center space-y-[-5px] md:space-y-[-10px] perspective-1000 mt-4">
            <div className="overflow-hidden pb-2 pt-2">
              <h1 className="reveal-headline-line text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight">
                Something
              </h1>
            </div>
            <div className="overflow-hidden pb-2 pt-2">
              <h1 className="reveal-headline-line text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight text-accent cursor-default">
                remarkable
              </h1>
            </div>
            <div className="overflow-hidden pb-2 pt-2">
              <h1 className="reveal-headline-line text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight">
                is coming.
              </h1>
            </div>
          </div>
          
          <p className="reveal-desc text-muted max-w-md mx-auto text-base md:text-lg mt-8">
            We&apos;re building a new digital experience. Worth the wait.
          </p>
        </div>

        <div className="reveal-countdown w-full flex justify-center mt-12 md:mt-20">
          <LaunchCountdown />
        </div>
        
        {/* Contact Section */}
        <div className="reveal-contact flex flex-col items-center gap-4 mt-16 font-mono text-xs tracking-widest text-muted uppercase">
          <span className="text-[10px] font-bold">Contact</span>
          <a href="mailto:info@colorvision.lk" className="hover:text-accent transition-colors">info@colorvision.lk</a>
          <a href="https://wa.me/94761428445" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors flex items-center gap-2">
            +94 76 142 8445 <span>(WhatsApp)</span>
          </a>
        </div>

      </main>
    </div>
  );
}
