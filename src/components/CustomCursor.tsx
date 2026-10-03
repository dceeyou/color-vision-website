"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(true);

  useEffect(() => {
    // Detect touch
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      setIsTouch(false);
      document.body.classList.add("custom-cursor-active");
    }

    if (isTouch) return;

    const dot = dotRef.current;
    const ring = ringRef.current;

    // Set GSAP quickSetters for high performance cursor
    const xDotSet = gsap.quickSetter(dot, "x", "px");
    const yDotSet = gsap.quickSetter(dot, "y", "px");
    const xRingSet = gsap.quickSetter(ring, "x", "px");
    const yRingSet = gsap.quickSetter(ring, "y", "px");

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      xDotSet(clientX);
      yDotSet(clientY);
      
      // Ring lags slightly behind
      gsap.to(ring, {
        x: clientX,
        y: clientY,
        duration: 0.15,
        ease: "power2.out"
      });
    };

    window.addEventListener("mousemove", onMouseMove);

    // Handle interactive hover states
    const interactiveElements = document.querySelectorAll("a, button, input, textarea, .cursor-hover");
    const viewElements = document.querySelectorAll(".cursor-view");
    const dragElements = document.querySelectorAll(".cursor-drag");

    const onEnterHover = () => {
      gsap.to(ring, { scale: 1.5, backgroundColor: "rgba(255, 77, 0, 0.1)", borderColor: "#FF4D00", duration: 0.3 });
      gsap.to(dot, { backgroundColor: "#FF4D00", scale: 0, duration: 0.3 });
    };
    
    const onLeaveHover = () => {
      gsap.to(ring, { scale: 1, backgroundColor: "transparent", borderColor: "rgba(255,255,255,0.3)", duration: 0.3 });
      gsap.to(dot, { backgroundColor: "#fff", scale: 1, duration: 0.3 });
      if(textRef.current) textRef.current.innerText = "";
    };

    const onEnterView = () => {
      gsap.to(ring, { scale: 2.5, backgroundColor: "#FF4D00", borderColor: "#FF4D00", duration: 0.3 });
      gsap.to(dot, { scale: 0, duration: 0.3 });
      if(textRef.current) {
        textRef.current.innerText = "VIEW";
        gsap.to(textRef.current, { opacity: 1, duration: 0.2 });
      }
    };

    const onLeaveView = () => {
      onLeaveHover();
      if(textRef.current) gsap.to(textRef.current, { opacity: 0, duration: 0.2 });
    };

    interactiveElements.forEach(el => {
      el.addEventListener("mouseenter", onEnterHover);
      el.addEventListener("mouseleave", onLeaveHover);
    });

    viewElements.forEach(el => {
      el.addEventListener("mouseenter", onEnterView);
      el.addEventListener("mouseleave", onLeaveView);
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.body.classList.remove("custom-cursor-active");
      interactiveElements.forEach(el => {
        el.removeEventListener("mouseenter", onEnterHover);
        el.removeEventListener("mouseleave", onLeaveHover);
      });
      viewElements.forEach(el => {
        el.removeEventListener("mouseenter", onEnterView);
        el.removeEventListener("mouseleave", onLeaveView);
      });
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <>
      <div 
        ref={ringRef} 
        className="fixed top-0 left-0 w-8 h-8 border border-white/30 rounded-full pointer-events-none z-[10000] -ml-4 -mt-4 flex items-center justify-center transition-colors"
      >
        <div ref={textRef} className="text-[#050608] text-[8px] font-bold tracking-widest opacity-0 select-none"></div>
      </div>
      <div 
        ref={dotRef} 
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[10001] -ml-[3px] -mt-[3px]"
      />
    </>
  );
}
