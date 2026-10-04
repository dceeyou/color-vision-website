"use client";

import { useEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Stat } from "@/lib/wordpress/types";

export default function Stats({ stats: propStats }: { stats?: Stat[] }) {
  const stats = useMemo(() => propStats?.map(s => {
    const valMatch = s.number.match(/^(\d+)/);
    const value = valMatch ? parseInt(valMatch[1], 10) : 0;
    const suffix = s.number.replace(/^\d+/, '');
    return { value, suffix, label: s.label };
  }) || [
    { value: 20, suffix: "+", label: "Projects" },
    { value: 10, suffix: "+", label: "Years" },
    { value: 5, suffix: "+", label: "Awards" },
    { value: 100, suffix: "%", label: "Commitment" },
  ], [propStats]);
  const containerRef = useRef<HTMLDivElement>(null);
  const numRefs = useRef<(HTMLHeadingElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      numRefs.current.forEach((el, index) => {
        if (!el) return;
        const targetVal = stats[index].value;
        const obj = { val: 0 };
        
        gsap.to(obj, {
          val: targetVal,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
          onUpdate: () => {
            el.innerText = Math.floor(obj.val) + stats[index].suffix;
          }
        });
      });

      // Divider horizontal animation
      gsap.fromTo(".stat-divider", 
        { scaleX: 0 }, 
        { 
          scaleX: 1, 
          duration: 1.5, 
          ease: "power3.inOut", 
          stagger: 0.2,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          } 
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [stats]);

  return (
    <section ref={containerRef} className="px-6 md:px-12 py-16 relative">
      <div className="stat-divider absolute top-0 left-0 w-full h-[1px] bg-border-light origin-left" />
      <div className="stat-divider absolute bottom-0 left-0 w-full h-[1px] bg-border-light origin-left" />
      
      <div className="flex flex-wrap justify-between items-center gap-10 max-w-7xl mx-auto py-8">
        {stats.map((stat, i) => (
          <div key={i} className="text-center md:text-left flex-1 min-w-[120px]">
            <h3 
              ref={(el) => {numRefs.current[i] = el}} 
              className="text-5xl md:text-6xl font-bold mb-3 text-foreground"
            >
              0{stat.suffix}
            </h3>
            <p className="text-muted font-bold tracking-[0.2em] text-xs uppercase">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
