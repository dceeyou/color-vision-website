/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Work({ projects }: { projects: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Minimal fallback projects if none provided
  const items = projects?.length > 0 ? projects : [
    { node: { id: 1, title: 'Aura FinTech', projectFields: { category: 'Brand / UI' } } },
    { node: { id: 2, title: 'Nexus System', projectFields: { category: 'Product' } } },
    { node: { id: 3, title: 'Horizon Ventures', projectFields: { category: 'Strategy' } } },
  ];

  useEffect(() => {
    // Reveal animation
    gsap.fromTo(".work-card-reveal", 
      { y: 60, opacity: 0 }, 
      { 
        y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 75%" } 
      }
    );
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, card: HTMLElement | null) => {
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    
    // Very subtle 3D tilt
    const rotX = ((y - cy) / cy) * -5;
    const rotY = ((x - cx) / cx) * 5;
    
    gsap.to(card, {
      rotationX: rotX,
      rotationY: rotY,
      duration: 0.5,
      ease: "power2.out",
      transformPerspective: 1000
    });
  };

  const handleMouseLeave = (card: HTMLElement | null) => {
    if (!card) return;
    gsap.to(card, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.8,
      ease: "power2.out"
    });
  };

  return (
    <section id="work" className="px-6 md:px-12 py-32" ref={containerRef}>
      <div className="flex justify-between items-end mb-16">
        <h2 className="text-5xl md:text-7xl font-bold">Work with <span className="text-accent">purpose.</span></h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {items.map((project, i) => {
          let cardRef: HTMLDivElement | null = null;
          return (
            <div 
              key={project.node.id} 
              ref={el => { cardRef = el; }}
              className={`work-card-reveal group cursor-view relative ${i === 1 ? 'md:mt-16' : i === 2 ? 'md:mt-32' : ''}`}
              onMouseMove={(e) => handleMouseMove(e, cardRef)}
              onMouseLeave={() => handleMouseLeave(cardRef)}
            >
              <div className="aspect-[3/4] bg-[#0a0a0a] border border-border-light overflow-hidden rounded-sm relative shadow-2xl transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_rgba(255,77,0,0.1)]">
                {/* Image Placeholder with subtle zoom */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent scale-100 group-hover:scale-105 transition-transform duration-700" />
                
                {/* Overlay glow */}
                <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 mix-blend-overlay transition duration-500 pointer-events-none" />
              </div>
              
              <div className="mt-6 flex justify-between items-start transition-transform duration-300 group-hover:translate-x-2">
                <div>
                  <p className="text-accent uppercase text-[10px] tracking-widest mb-2 font-bold">{project.node.projectFields?.category}</p>
                  <h3 className="text-2xl font-bold">{project.node.title}</h3>
                </div>
                <div className="w-8 h-8 rounded-full border border-border-light flex items-center justify-center transform group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-black transition-all duration-300">
                  <span className="text-sm">↗</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
