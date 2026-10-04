"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import Image from "next/image";
import { Manrope } from "next/font/google";
import { HeroContent } from "@/lib/wordpress/types";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export default function Hero({ hero }: { hero?: HeroContent }) {
  const containerRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const title1Ref = useRef<HTMLDivElement>(null);
  const title2Ref = useRef<HTMLDivElement>(null);
  const pRef = useRef<HTMLParagraphElement>(null);
  const btnsRef = useRef<HTMLDivElement>(null);
  const graphicRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    // Initial Load Animation
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(eyebrowRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, 0.2);
    
    tl.fromTo(title1Ref.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 }, 0.3);
    
    tl.fromTo(title2Ref.current, 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 1 }, 
      0.4
    );

    tl.fromTo(pRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, 0.6);
    tl.fromTo(btnsRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, 0.7);

    tl.fromTo(graphicRef.current, { opacity: 0, scale: 0.98 }, { opacity: 1, scale: 1, duration: 2, ease: "power2.out" }, 0.4);
    
    if (!isReduced) {
      // Subtle mouse parallax for the graphic wrapper
      const onMouseMove = (e: MouseEvent) => {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        const dx = (e.clientX - cx) / cx;
        const dy = (e.clientY - cy) / cy;

        gsap.to(graphicRef.current, {
          x: dx * 15,
          y: dy * 15,
          ease: "power2.out",
          duration: 1
        });
      };
      
      window.addEventListener("mousemove", onMouseMove);
      return () => window.removeEventListener("mousemove", onMouseMove);
    }
  }, []);

  return (
    <section ref={containerRef} className={`relative w-full bg-[#08090D] overflow-hidden ${manrope.className}`}>
      <div className="w-full max-w-[1280px] mx-auto min-h-screen px-4 md:px-6 lg:px-0 pt-32 pb-24 grid grid-cols-4 lg:grid-cols-12 gap-x-[16px] lg:gap-x-[24px] items-center">
        
        {/* Left Content */}
        <div className="col-span-4 lg:col-span-7 z-10 flex flex-col justify-center">
          <p ref={eyebrowRef} className="uppercase tracking-[0.2em] text-[13px] font-[600] text-[#8E9098] mb-6">
            {hero?.eyebrow || "Creative Design Studio"}
          </p>
          
          <div className="space-y-[-5px] md:space-y-[-10px]">
            <div className="overflow-hidden pb-2">
              <h1 ref={title1Ref} className="text-[52px] md:text-[80px] lg:text-[100px] font-[800] leading-[1.0] text-[#FFFFFF] tracking-[-0.02em]">
                {hero?.heading?.split("\n")[0] || "Design"}
              </h1>
            </div>
            <div className="overflow-hidden pt-1 pb-2">
              <h1 ref={title2Ref} className="text-[52px] md:text-[80px] lg:text-[100px] font-[800] leading-[1.0] text-[#FF5108] tracking-[-0.02em]">
                {hero?.highlightedText || "That Matters."}
              </h1>
            </div>
          </div>

          <p ref={pRef} className="text-[#F4F2ED] opacity-90 max-w-[540px] text-[15px] md:text-[17px] leading-[1.65] mt-6">
            Color Vision is a design studio based in Sri Lanka, helping ambitious businesses turn ideas into clear brands, intuitive digital products, and meaningful experiences. From brand identity and UI/UX design to websites and digital products, we bring strategy, creativity, and thoughtful execution together to create work that has a reason to exist.
          </p>
          
          <div ref={btnsRef} className="mt-10 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center">
            <Link href="#work" className="bg-[#FF5108] text-[#08090D] px-8 py-4 font-[700] uppercase tracking-[0.05em] text-[13px] rounded-full hover:bg-[#FF6A2B] hover:-translate-y-0.5 transition-all duration-300">
              {hero?.primaryCtaLabel || "View Our Work →"}
            </Link>
            <Link href="#contact" className="border border-[#FF5108] text-[#FF5108] bg-transparent px-8 py-4 font-[700] uppercase tracking-[0.05em] text-[13px] rounded-full hover:bg-[#FF5108] hover:text-[#08090D] transition-colors duration-300">
              {hero?.secondaryCtaLabel || "Start A Project"}
            </Link>
          </div>
        </div>

        {/* Right Graphic */}
        <div className="col-span-4 lg:col-span-5 flex justify-center lg:justify-end items-center mt-16 lg:mt-0 z-0 pointer-events-none">
          <div ref={graphicRef} className="relative w-[320px] h-[320px] md:w-[450px] md:h-[450px] lg:w-[650px] lg:h-[650px] lg:-mr-[100px]">
             <Image 
               src="/hero-graphic.png" 
               alt="Color Vision Graphic" 
               fill 
               className="object-contain"
               priority
             />
          </div>
        </div>

      </div>
    </section>
  );
}
