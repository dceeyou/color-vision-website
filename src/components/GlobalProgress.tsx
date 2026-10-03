"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function GlobalProgress() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    gsap.to(progressRef.current, {
      scaleY: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.1
      }
    });
  }, []);

  return (
    <div className="fixed right-0 top-0 w-1 h-screen bg-white/5 z-50">
      <div 
        ref={progressRef}
        className="w-full h-full bg-accent origin-top scale-y-0"
      />
    </div>
  );
}
