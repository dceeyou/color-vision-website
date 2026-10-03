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

  useEffect(() => {
    gsap.to(".progress-fill", {
      width: `${progress}%`,
      duration: 1.5,
      ease: "power2.out"
    });
  }, [progress]);

  return (
    <div className="mt-20 flex flex-col items-center gap-4 reveal-item relative z-10 w-full max-w-lg">
      <div className="flex items-center gap-4">
        <span className="text-accent font-bold tracking-[0.2em] text-xs">
          LAUNCH PROGRESS
        </span>
        <span className="text-foreground font-mono text-sm">
          {progress.toFixed(2)}%
        </span>
      </div>
      
      <div className="w-full h-[1px] bg-border-light relative mt-2">
         <div className="progress-fill absolute top-0 left-0 h-full bg-accent" style={{ width: '0%' }} />
      </div>
    </div>
  );
}
