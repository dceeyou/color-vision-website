"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import gsap from "gsap";

export default function LaunchPage() {
  const [timeLeft, setTimeLeft] = useState({ days: 12, hours: 8, minutes: 43, seconds: 27 });

  useEffect(() => {
    // Simple countdown logic
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        if (seconds > 0) { seconds--; }
        else {
          seconds = 59;
          if (minutes > 0) { minutes--; }
          else {
            minutes = 59;
            if (hours > 0) { hours--; }
            else { hours = 23; if (days > 0) days--; }
          }
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    // Enter animation
    gsap.fromTo(".reveal", 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power3.out" }
    );

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#050608] text-foreground p-6 md:p-12 relative overflow-hidden font-mono selection:bg-accent selection:text-black">
      
      {/* Background Grid & Noise */}
      <div className="tech-grid absolute inset-0 opacity-10" />
      <div className="noise-overlay" />
      
      {/* Subtle Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 blur-[150px] rounded-full pointer-events-none" />

      {/* Header */}
      <header className="flex justify-between items-start text-xs tracking-[0.2em] uppercase reveal">
        <div className="flex items-center gap-4">
          <span className="text-accent border border-accent/30 px-3 py-1">[ COLOR VISION ]</span>
        </div>
        <div className="flex items-center gap-2 text-muted">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span>BUILDING CV-001</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center text-center my-20 z-10">
        
        {/* Abstract ASCII/Orbital Graphic */}
        <div className="mb-16 relative w-64 h-64 flex items-center justify-center reveal">
           <div className="absolute inset-0 border border-border-light rounded-full border-dashed animate-[spin_60s_linear_infinite]" />
           <div className="absolute w-[80%] h-[80%] border border-accent/30 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
           
           <div className="flex flex-col items-center text-[10px] tracking-widest text-muted">
             <div className="w-[1px] h-8 bg-accent/50 mb-2" />
             <span className="mb-1 text-accent">ORBITAL</span>
             <span>LAUNCH SYSTEM</span>
             <div className="w-[1px] h-8 bg-accent/50 mt-2" />
           </div>
        </div>

        {/* Typography */}
        <div className="space-y-6 reveal">
          <p className="text-accent text-xs tracking-[0.3em] uppercase">Color Vision / 2026</p>
          <h1 className="text-5xl md:text-7xl font-bold font-sans tracking-tight">
            Something<br/>
            <span className="text-accent">remarkable</span><br/>
            is coming.
          </h1>
          <p className="text-muted max-w-sm mx-auto text-sm font-sans">
            We're building a new digital experience. Worth the wait.
          </p>
        </div>

        {/* Countdown */}
        <div className="flex gap-6 md:gap-12 mt-16 reveal">
          {[
            { label: "DAYS", val: timeLeft.days },
            { label: "HOURS", val: timeLeft.hours },
            { label: "MINUTES", val: timeLeft.minutes },
            { label: "SECONDS", val: timeLeft.seconds },
          ].map(time => (
            <div key={time.label} className="flex flex-col items-center">
              <span className="text-3xl md:text-5xl font-light text-foreground">{time.val.toString().padStart(2, '0')}</span>
              <span className="text-[10px] tracking-widest text-muted mt-2">{time.label}</span>
            </div>
          ))}
        </div>

        {/* Progress */}
        <div className="mt-16 flex items-center gap-4 text-xs tracking-widest reveal">
          <div className="w-4 h-4 rounded-full border-2 border-accent border-r-transparent animate-spin" />
          <span className="text-accent font-bold">67% LAUNCH</span>
        </div>
      </main>

      {/* Footer */}
      <footer className="flex justify-between items-end text-[10px] tracking-widest text-muted uppercase reveal">
        <span>Creative Design Studio</span>
        <span className="hidden md:inline text-accent">Launch / 001</span>
        <span>&copy; Color Vision</span>
      </footer>
    </div>
  );
}
