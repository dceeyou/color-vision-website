"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function LaunchCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(true);

  useEffect(() => {
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches && !isReduced) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsTouch(false);
      document.body.classList.add("custom-cursor-active");
    }

    if (isTouch || isReduced) return;

    const dot = dotRef.current;
    const ring = ringRef.current;

    const xDotSet = gsap.quickSetter(dot, "x", "px");
    const yDotSet = gsap.quickSetter(dot, "y", "px");

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      xDotSet(clientX);
      yDotSet(clientY);
      
      gsap.to(ring, {
        x: clientX,
        y: clientY,
        duration: 0.15,
        ease: "power2.out"
      });
    };

    window.addEventListener("mousemove", onMouseMove);

    const interactiveElements = document.querySelectorAll("a, button, input, .cursor-hover");
    const orbElements = document.querySelectorAll(".cursor-interact");

    const onEnterHover = () => {
      gsap.to(ring, { scale: 1.5, backgroundColor: "rgba(255, 77, 0, 0.1)", borderColor: "#FF4D00", duration: 0.3 });
      gsap.to(dot, { backgroundColor: "#FF4D00", scale: 0, duration: 0.3 });
      if(textRef.current) {
        textRef.current.innerText = "VIEW";
        gsap.to(textRef.current, { opacity: 1, duration: 0.2 });
      }
    };
    
    const onLeaveHover = () => {
      gsap.to(ring, { scale: 1, backgroundColor: "transparent", borderColor: "rgba(255,255,255,0.3)", duration: 0.3 });
      gsap.to(dot, { backgroundColor: "#fff", scale: 1, duration: 0.3 });
      if(textRef.current) gsap.to(textRef.current, { opacity: 0, duration: 0.2 });
    };

    const onEnterInteract = () => {
      gsap.to(ring, { scale: 2.5, backgroundColor: "rgba(255, 77, 0, 0.05)", borderColor: "#FF4D00", duration: 0.3 });
      gsap.to(dot, { scale: 0, duration: 0.3 });
      if(textRef.current) {
        textRef.current.innerText = "INTERACT";
        gsap.to(textRef.current, { opacity: 1, duration: 0.2 });
      }
    };

    interactiveElements.forEach(el => {
      el.addEventListener("mouseenter", onEnterHover);
      el.addEventListener("mouseleave", onLeaveHover);
    });

    orbElements.forEach(el => {
      el.addEventListener("mouseenter", onEnterInteract);
      el.addEventListener("mouseleave", onLeaveHover);
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.body.classList.remove("custom-cursor-active");
      interactiveElements.forEach(el => {
        el.removeEventListener("mouseenter", onEnterHover);
        el.removeEventListener("mouseleave", onLeaveHover);
      });
      orbElements.forEach(el => {
        el.removeEventListener("mouseenter", onEnterInteract);
        el.removeEventListener("mouseleave", onLeaveHover);
      });
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <div className="hidden md:block">
      <div 
        ref={ringRef} 
        className="fixed top-0 left-0 w-10 h-10 border border-white/30 rounded-full pointer-events-none z-[10000] -ml-5 -mt-5 flex items-center justify-center transition-colors"
      >
        <div ref={textRef} className="text-accent text-[8px] font-bold tracking-widest opacity-0 select-none drop-shadow-md"></div>
      </div>
      <div 
        ref={dotRef} 
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[10001] -ml-[3px] -mt-[3px]"
      />
    </div>
  );
}
