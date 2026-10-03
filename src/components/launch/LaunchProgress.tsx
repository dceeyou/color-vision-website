"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";

export default function LaunchProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const envDate = process.env.NEXT_PUBLIC_LAUNCH_DATE;
    const launchDate = envDate ? new Date(envDate) : new Date("2026-12-01T00:00:00+05:30");
    const startDate = new Date("2026-09-01T00:00:00+05:30"); // Arbitrary start for progress

    const updateProgress = () => {
      const total = launchDate.getTime() - startDate.getTime();
      const elapsed = Date.now() - startDate.getTime();
      let percent = (elapsed / total) * 100;
      if (percent < 0) percent = 0;
      if (percent > 100) percent = 100;
      
      setProgress(percent);
    };

    updateProgress();
    const interval = setInterval(updateProgress, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const radius = 260; // Slightly larger than the Orb's 250 center
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  useEffect(() => {
    gsap.to(".progress-ring", {
      strokeDashoffset,
      duration: 1.5,
      ease: "power2.out"
    });
  }, [strokeDashoffset]);

  return (
    <div className="mt-16 flex flex-col items-center gap-4 reveal-item relative z-10">
      <div className="flex items-center gap-4">
        <span className="text-accent font-bold tracking-[0.2em] text-xs">
          LAUNCH PROGRESS
        </span>
        <span className="text-foreground font-mono text-sm">
          {progress.toFixed(2)}%
        </span>
      </div>
      
      {/* We apply the circular ring visually behind the orb in the page layout, 
          or we can render a minimal horizontal bar here for clarity on mobile.
          The prompt asked for a circular progress ring *around* the orbital system.
          We will export the ring calculation to be used in page.tsx if needed, 
          but drawing a horizontal one here is also good fallback. */}
      <div className="w-64 h-[1px] bg-border-light relative mt-2 md:hidden">
         <div className="absolute top-0 left-0 h-full bg-accent transition-all duration-500" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
