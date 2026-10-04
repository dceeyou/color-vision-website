"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { AboutContent } from "@/lib/wordpress/types";

export default function Statement({ about }: { about?: AboutContent }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
        }
      });

      tl.fromTo(".stmt-line", 
        { y: 100, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out" }
      );
      
      tl.fromTo(".stmt-accent-line", 
        { scaleX: 0 }, 
        { scaleX: 1, duration: 1, ease: "power3.inOut" }, 
        "-=0.6"
      );

      tl.fromTo(".stmt-p",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.4"
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="px-6 md:px-12 py-32 flex justify-center items-center relative" ref={containerRef}>
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-4xl w-full">
        <div className="overflow-hidden pb-4"><h2 className="stmt-line text-5xl md:text-8xl font-bold leading-tight">{about?.heading?.split('\n')[0] || "We turn ideas"}</h2></div>
        <div className="overflow-hidden pb-4"><h2 className="stmt-line text-5xl md:text-8xl font-bold leading-tight">{about?.heading?.split('\n')[1] || "into clear,"}</h2></div>
        <div className="overflow-hidden pb-4">
          <h2 className="stmt-line text-5xl md:text-8xl font-bold leading-tight text-accent relative inline-block">
            {about?.highlightedHeading || "memorable"}
            <div className="stmt-accent-line absolute -bottom-2 left-0 w-full h-[3px] bg-accent origin-left" />
          </h2>
        </div>
        <div className="overflow-hidden pb-4"><h2 className="stmt-line text-5xl md:text-8xl font-bold leading-tight">{about?.heading?.split('\n')[2] || "experiences."}</h2></div>
        
        <p className="stmt-p mt-10 text-muted max-w-xl text-lg md:text-xl">
          {about?.description || "By stripping away the unnecessary, we reveal the essential. Every visual decision serves a strategic goal, crafted with a relentless attention to detail."}
        </p>
      </div>
    </section>
  );
}
