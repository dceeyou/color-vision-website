"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import LaunchCursor from "@/components/launch/LaunchCursor";
import LiquidBackgroundWebGL from "@/components/launch/LiquidBackgroundWebGL";
import LaunchCountdown from "@/components/launch/LaunchCountdown";
import LaunchProgress from "@/components/launch/LaunchProgress";

export default function LaunchPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Cinematic Entrance Sequence
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    
    // Initial states
    gsap.set(".reveal-grid", { opacity: 0 });
    gsap.set(".reveal-logo", { opacity: 0, x: -20 });
    gsap.set(".reveal-status", { opacity: 0, x: 20 });
    gsap.set(".reveal-orb", { opacity: 0, scale: 0.8 });
    gsap.set(".reveal-eyebrow", { opacity: 0, y: 10 });
    gsap.set(".reveal-headline-line", { opacity: 0, y: 30, rotationX: -20 });
    gsap.set(".reveal-desc", { opacity: 0, y: 20 });
    gsap.set(".reveal-countdown", { opacity: 0, y: 20 });
    gsap.set(".reveal-progress", { opacity: 0, y: 20 });
    gsap.set(".reveal-footer", { opacity: 0, y: 20 });

    // Sequence
    tl.to(".reveal-grid", { opacity: 1, duration: 2 }, 0.2)
      .to(".reveal-logo", { opacity: 1, x: 0, duration: 1.5 }, 0.5)
      .to(".reveal-status", { opacity: 1, x: 0, duration: 1.5 }, 0.6)
      .to(".reveal-orb", { opacity: 1, scale: 1, duration: 2 }, 0.8)
      .to(".reveal-eyebrow", { opacity: 1, y: 0, duration: 1 }, 1.2)
      .to(".reveal-headline-line", { opacity: 1, y: 0, rotationX: 0, duration: 1.2, stagger: 0.15 }, 1.4)
      .to(".reveal-desc", { opacity: 1, y: 0, duration: 1 }, 1.8)
      .to(".reveal-countdown", { opacity: 1, y: 0, duration: 1 }, 2.0)
      .to(".reveal-progress", { opacity: 1, y: 0, duration: 1 }, 2.2)
      .to(".reveal-footer", { opacity: 1, y: 0, duration: 1 }, 2.4);

  }, []);

  return (
    <div ref={containerRef} className="min-h-screen flex flex-col justify-between bg-[#050608] text-foreground p-6 md:p-8 lg:p-12 relative overflow-hidden font-sans selection:bg-accent selection:text-black">
      
      {/* Background System */}
      <div className="reveal-grid absolute inset-0 z-0 pointer-events-none">
        <LiquidBackgroundWebGL />
      </div>

      <LaunchCursor />

      {/* Header */}
      <header className="flex justify-between items-start z-10 w-full relative">
        <div className="reveal-logo md:absolute md:left-12 md:top-8 left-6 top-6">
          <div className="w-32 h-10 relative">
             <Image src="/logo.png" alt="Color Vision" fill className="object-contain object-left" />
          </div>
        </div>
        
        <div className="reveal-status md:absolute md:right-12 md:top-8 right-6 top-6 flex flex-col items-end text-xs tracking-widest uppercase font-mono text-muted">
          <div className="flex items-center gap-2 text-foreground mb-1">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_8px_#FF4D00]" />
            <span>BUILDING</span>
          </div>
          <span>CV-001</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center text-center w-full max-w-5xl mx-auto z-10 my-16 md:my-0">

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
              <h1 className="reveal-headline-line text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight text-accent transition-all duration-500 hover:-translate-y-[2px] hover:tracking-wide hover:drop-shadow-[0_0_20px_rgba(255,77,0,0.6)] cursor-default">
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

        <div className="reveal-progress w-full flex justify-center">
          <LaunchProgress />
        </div>

      </main>

      {/* Contact Section */}
      <div className="reveal-footer flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12 z-10 w-full relative pt-12 pb-8 font-mono text-xs tracking-widest text-muted">
        <a href="mailto:info@colorvision.lk" className="hover:text-accent transition-colors cursor-hover">info@colorvision.lk</a>
        <a href="https://wa.me/94761428445" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors cursor-hover flex items-center gap-2">
          +94 76 142 8445 <span>(WhatsApp)</span>
        </a>
      </div>

      {/* Footer */}
      <footer className="reveal-footer flex flex-col md:flex-row justify-between items-center text-[10px] tracking-widest text-muted uppercase font-mono z-10 w-full relative pt-8 border-t border-white/10 md:border-none md:pt-0 pb-6 md:pb-0">
        <span className="mb-4 md:mb-0">Creative Design Studio</span>
        <span className="hidden md:inline text-accent">Launch / 001</span>
        <span>&copy; {new Date().getFullYear()} Color Vision</span>
      </footer>
    </div>
  );
}
