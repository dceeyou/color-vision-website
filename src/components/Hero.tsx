"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const title1Ref = useRef<HTMLDivElement>(null);
  const title2Ref = useRef<HTMLDivElement>(null);
  const pRef = useRef<HTMLParagraphElement>(null);
  const btnsRef = useRef<HTMLDivElement>(null);
  const graphicRef = useRef<HTMLDivElement>(null);

  // For the interactive graphic
  const ring1 = useRef<HTMLDivElement>(null);
  const ring2 = useRef<HTMLDivElement>(null);
  const centerElem = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial Load Animation
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Text animations
    tl.fromTo(eyebrowRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, 0.2);
    
    // Split text reveal for "Design" and "That Matters."
    tl.fromTo(title1Ref.current, { opacity: 0, y: 80 }, { opacity: 1, y: 0, duration: 1 }, 0.3);
    
    // Clip-path reveal for the second line
    tl.fromTo(title2Ref.current, 
      { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)", y: 40 }, 
      { clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)", y: 0, duration: 1 }, 
      0.4
    );

    tl.fromTo(pRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, 0.6);
    tl.fromTo(btnsRef.current, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.8 }, 0.8);

    // Graphic animations
    tl.fromTo(graphicRef.current, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1.5, ease: "power2.out" }, 0.2);
    
    // Idle rotation
    gsap.to(ring1.current, { rotation: 360, duration: 40, repeat: -1, ease: "none" });
    gsap.to(ring2.current, { rotation: -360, duration: 60, repeat: -1, ease: "none" });

    // Mouse Parallax
    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (clientX - cx) / cx;
      const dy = (clientY - cy) / cy;

      gsap.to(graphicRef.current, {
        x: dx * 30,
        y: dy * 30,
        rotationX: dy * -10,
        rotationY: dx * 10,
        ease: "power2.out",
        duration: 1
      });

      gsap.to(ring1.current, { rotation: `+=${dx * 5}`, duration: 0.5, ease: "power1.out" });
      gsap.to(ring2.current, { rotation: `-=${dx * 5}`, duration: 0.5, ease: "power1.out" });
      gsap.to(centerElem.current, { y: dy * 20, x: dx * 10, duration: 0.5, ease: "power1.out" });
    };

    window.addEventListener("mousemove", onMouseMove);

    // Scroll animation for the graphic
    gsap.to(graphicRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.5,
      },
      y: 150,
      scale: 0.7,
      opacity: 0,
      rotation: 45
    });

    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen px-6 md:px-12 pt-32 pb-24 flex flex-col lg:flex-row items-center justify-between gap-16 overflow-hidden perspective-1000">
      
      {/* Left Content */}
      <div className="lg:w-1/2 z-10 space-y-6">
        <p ref={eyebrowRef} className="uppercase tracking-[0.3em] text-xs font-bold text-muted">Creative Design Studio</p>
        
        <div className="space-y-[-10px] sm:space-y-[-20px]">
          <div className="overflow-hidden pb-4">
            <h1 ref={title1Ref} className="text-[12vw] lg:text-[7vw] font-bold leading-none text-foreground">
              Design
            </h1>
          </div>
          <div className="overflow-hidden pt-2 pb-4">
            <h1 ref={title2Ref} className="text-[12vw] lg:text-[7vw] font-bold leading-none text-accent">
              That Matters.
            </h1>
          </div>
        </div>

        <p ref={pRef} className="text-muted max-w-lg text-lg leading-relaxed pt-6">
          We craft digital experiences that transcend the ordinary. An independent creative design studio shaping the future of visual communication and digital products.
        </p>
        
        <div ref={btnsRef} className="pt-8 flex gap-8 items-center">
          <Link href="#work" className="bg-accent text-background px-10 py-5 font-bold uppercase tracking-widest text-sm rounded-full hover:bg-white hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,77,0,0.4)]">
            View Work
          </Link>
          <Link href="#contact" className="text-foreground uppercase tracking-widest text-sm hover:text-accent transition-colors flex items-center gap-2 group">
            Let&apos;s Talk <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>

      {/* Right Graphic */}
      <div className="lg:w-1/2 w-full flex justify-center lg:justify-end z-0 h-[400px] lg:h-auto" style={{ transformStyle: 'preserve-3d' }}>
        <div ref={graphicRef} className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] flex items-center justify-center">
          
          {/* Glow */}
          <div className="absolute inset-0 m-auto w-[60%] h-[60%] bg-accent opacity-20 blur-[100px] rounded-full" />
          
          {/* Outer Crosshair / Technical grid */}
          <div className="absolute w-full h-[1px] bg-border-light" />
          <div className="absolute h-full w-[1px] bg-border-light" />
          
          {/* Outer Ring */}
          <div ref={ring1} className="absolute w-[90%] h-[90%] border border-border-light rounded-full border-dashed" />
          
          {/* Thick Orange Arc Ring */}
          <div ref={ring2} className="absolute w-[70%] h-[70%] border-[8px] border-transparent border-t-accent border-r-accent rounded-full opacity-90 shadow-[0_0_30px_rgba(255,77,0,0.3)]" />
          
          {/* Inner Grid Ring */}
          <div className="absolute w-[50%] h-[50%] border border-border-light rounded-full flex items-center justify-center">
            {/* Dots */}
            <div className="w-1.5 h-1.5 bg-accent rounded-full absolute -top-[3px]" />
            <div className="w-1.5 h-1.5 bg-accent rounded-full absolute -bottom-[3px]" />
            <div className="w-1.5 h-1.5 bg-accent rounded-full absolute -left-[3px]" />
            <div className="w-1.5 h-1.5 bg-accent rounded-full absolute -right-[3px]" />
          </div>

          {/* Central Element */}
          <div ref={centerElem} className="absolute flex flex-col gap-1 items-center justify-center mix-blend-screen">
             <div className="w-1 h-12 bg-accent shadow-[0_0_15px_#FF4D00]" />
             <div className="w-1 h-4 bg-accent/60" />
             <div className="w-1 h-2 bg-accent/30" />
          </div>
          
        </div>
      </div>
    </section>
  );
}
