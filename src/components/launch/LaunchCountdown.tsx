"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

export default function LaunchCountdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, isLive: false });
  const prevSeconds = useRef(0);

  useEffect(() => {
    // Determine launch date from env or fallback to Dec 1, 2026
    const envDate = process.env.NEXT_PUBLIC_LAUNCH_DATE;
    const launchDate = envDate ? new Date(envDate) : new Date("2026-12-01T00:00:00+05:30");
    
    const calculateTime = () => {
      const now = new Date();
      const diff = launchDate.getTime() - now.getTime();

      if (diff <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, isLive: true };
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      return { days, hours, minutes, seconds, isLive: false };
    };

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTimeLeft(calculateTime());

    const timer = setInterval(() => {
      const newTime = calculateTime();
      setTimeLeft(newTime);
      
      if (newTime.seconds !== prevSeconds.current && !newTime.isLive) {
        prevSeconds.current = newTime.seconds;
        
        // Trigger micro-interactions on seconds change
        const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (!isReduced) {
          gsap.fromTo(".sec-val", 
            { y: 10, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" }
          );
          
          gsap.fromTo(".center-pulse-node",
            { r: 15 },
            { r: 10, duration: 0.4, ease: "power2.out", overwrite: "auto" }
          );
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (timeLeft.isLive) {
    return (
      <div className="mt-12 reveal-item">
        <h2 className="text-4xl md:text-6xl font-bold tracking-widest text-accent">WE&apos;RE LIVE.</h2>
      </div>
    );
  }

  const timeBlocks = [
    { label: "DAYS", val: timeLeft.days, class: "day-val" },
    { label: "HOURS", val: timeLeft.hours, class: "hour-val" },
    { label: "MINUTES", val: timeLeft.minutes, class: "min-val" },
    { label: "SECONDS", val: timeLeft.seconds, class: "sec-val" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 mt-12 reveal-item">
      {timeBlocks.map((time) => (
        <div key={time.label} className="flex flex-col items-center">
          <div className="overflow-hidden h-[60px] md:h-[80px] flex items-center justify-center">
             <span className={`${time.class} text-5xl md:text-7xl font-bold font-sans text-foreground inline-block`}>
               {time.val.toString().padStart(2, '0')}
             </span>
          </div>
          <span className="text-[10px] tracking-[0.2em] text-muted mt-2 uppercase">{time.label}</span>
        </div>
      ))}
    </div>
  );
}
