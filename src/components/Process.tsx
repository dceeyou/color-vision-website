"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { ProcessStep } from "@/lib/wordpress/types";

export default function Process({ steps: propSteps }: { steps?: ProcessStep[] }) {
  const steps = propSteps?.map(s => ({
    num: s.stepNumber,
    title: s.title,
    desc: s.description
  })) || [
    { num: "01", title: "Understand the challenge", desc: "Immersing in your world to uncover truths." },
    { num: "02", title: "Find the right direction", desc: "Defining the conceptual and architectural framework." },
    { num: "03", title: "Explore the possibilities", desc: "Iterative design execution balancing aesthetics." },
    { num: "04", title: "Make the details count", desc: "Meticulous detailing and polishing." },
    { num: "05", title: "Ready for the real world", desc: "Launch and observe the impact." },
  ];
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Line progress
      gsap.to(lineRef.current, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true,
        }
      });

      itemsRef.current.forEach((item, i) => {
        if(!item) return;
        const img = item.querySelector('.process-img');
        const text = item.querySelector('.process-text');
        const num = item.querySelector('.process-num');
        
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 60%",
            end: "bottom 40%",
            toggleActions: "play reverse play reverse",
          }
        });
        
        tl.to(img, { scale: 1, opacity: 1, duration: 0.6, ease: "power2.out" })
          .to(text, { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" }, "<")
          .to(num, { color: "#FF4D00", duration: 0.3 }, "<");
          
        // Image Parallax
        gsap.to(img, {
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: item,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });
      
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="px-6 md:px-12 py-32 relative" ref={containerRef}>
      <div className="text-center mb-32 relative z-10">
        <h2 className="text-5xl md:text-7xl font-bold">Clarity <span className="text-accent">before creativity.</span></h2>
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Progress Line */}
        <div className="absolute left-12 md:left-1/2 top-0 bottom-0 w-[1px] bg-border-light -translate-x-1/2 hidden md:block">
           <div ref={lineRef} className="w-full h-full bg-accent origin-top scale-y-0" />
        </div>

        <div className="space-y-40">
          {steps.map((step, i) => {
            const isEven = i % 2 === 0;
            return (
              <div 
                key={i} 
                ref={(el) => {itemsRef.current[i] = el}}
                className={`flex flex-col md:flex-row items-center gap-16 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Image side */}
                <div className="w-full md:w-1/2 flex justify-center perspective-1000">
                  <div className="process-img aspect-square w-full max-w-md bg-[#0a0a0a] border border-border-light rounded-xl scale-[0.92] opacity-50 relative overflow-hidden group cursor-pointer cursor-view">
                     <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 to-transparent group-hover:opacity-100 opacity-0 transition duration-500" />
                     {/* 3D Box Placeholder */}
                     <div className="absolute inset-0 m-auto w-32 h-32 border border-accent rotate-12 flex items-center justify-center group-hover:rotate-0 transition-all duration-700">
                       <span className="text-accent font-bold opacity-30 text-5xl">3D</span>
                     </div>
                  </div>
                </div>
                
                {/* Text side */}
                <div className={`w-full md:w-1/2 process-text opacity-40 ${isEven ? 'md:pl-16 transform -translate-x-8' : 'md:pr-16 md:text-right transform translate-x-8'}`}>
                  <span className="process-num text-3xl font-bold tracking-widest text-muted transition-colors duration-500">{step.num}</span>
                  <h3 className="text-3xl md:text-4xl font-bold mt-4 mb-4">{step.title}</h3>
                  <p className="text-muted text-lg">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
