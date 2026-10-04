"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

import { Service } from "@/lib/wordpress/types";

export default function Services({ services: propServices }: { services?: Service[] }) {
  const services = propServices?.map(s => s.name) || [
    "Brand Identity",
    "UI/UX Design",
    "Digital Product Design",
    "Web Design",
    "Design Systems",
    "Visual Communication"
  ];
  const containerRef = useRef<HTMLDivElement>(null);
  const title1Ref = useRef<HTMLDivElement>(null);
  const title2Ref = useRef<HTMLDivElement>(null);
  const title3Ref = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal on scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        }
      });
      
      tl.fromTo([title1Ref.current, title2Ref.current, title3Ref.current],
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" }
      );
      
      tl.fromTo(".service-item",
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" },
        "-=0.4"
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={containerRef} className="px-6 md:px-12 py-32 flex flex-col lg:flex-row gap-20">
      
      <div className="lg:w-1/2 space-y-2 relative">
        {/* Subtle orange glow behind heading */}
        <div className="absolute -left-20 top-0 w-64 h-64 bg-accent/10 blur-[120px] pointer-events-none rounded-full" />
        
        <div className="overflow-hidden pb-2"><h2 ref={title1Ref} className="text-5xl md:text-7xl font-bold leading-tight">Design for</h2></div>
        <div className="overflow-hidden pb-2"><h2 ref={title2Ref} className="text-5xl md:text-7xl font-bold leading-tight text-accent">real-world</h2></div>
        <div className="overflow-hidden pb-2"><h2 ref={title3Ref} className="text-5xl md:text-7xl font-bold leading-tight text-accent">impact.</h2></div>
      </div>

      <div className="lg:w-1/2 flex flex-col pt-8">
        {services.map((srv, idx) => {
          const isActive = hoveredIndex === idx;
          const isDimmed = hoveredIndex !== null && hoveredIndex !== idx;
          
          return (
            <div 
              key={idx}
              className={`service-item group flex gap-8 items-center py-6 border-b border-border-light cursor-pointer transition-all duration-500 ${isDimmed ? 'opacity-30' : 'opacity-100'}`}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Animated indicator */}
              <div className={`w-[2px] bg-accent transition-all duration-300 ${isActive ? 'h-8' : 'h-0'}`} />
              
              <span className={`font-bold tracking-widest text-sm transition-colors duration-300 ${isActive ? 'text-accent' : 'text-muted'}`}>
                0{idx + 1}
              </span>
              
              <h4 className={`text-2xl md:text-3xl font-bold transition-transform duration-300 ${isActive ? 'translate-x-4 text-foreground' : 'text-muted'}`}>
                {srv}
              </h4>
            </div>
          );
        })}
      </div>
    </section>
  );
}
