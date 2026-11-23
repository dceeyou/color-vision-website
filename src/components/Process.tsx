"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProcessStep } from "@/lib/wordpress/types";

export default function Process({ steps: propSteps }: { steps?: ProcessStep[] }) {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const desktopLineRef = useRef<HTMLDivElement>(null);
  const mobileLineRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  // Exact 5 process steps defined in Color Vision specifications
  const steps: ProcessStep[] = propSteps && propSteps.length >= 5 ? propSteps : [
    {
      id: "1",
      stepNumber: "01",
      stepLabel: "DISCOVER",
      title: "Understand the challenge",
      description:
        "We learn about your business, audience, goals, competitors, challenges, and opportunities. This gives us the context needed to understand what the project actually needs.",
    },
    {
      id: "2",
      stepNumber: "02",
      stepLabel: "DEFINE",
      title: "Find the right direction",
      description:
        "We bring the findings together, establish priorities, structure the experience, and create a shared understanding of what success should look like.",
    },
    {
      id: "3",
      stepNumber: "03",
      stepLabel: "DESIGN",
      title: "Explore the possibilities",
      description:
        "We translate strategy into visual and digital experiences through concepts, wireframes, interfaces, identity systems, and prototypes.",
    },
    {
      id: "4",
      stepNumber: "04",
      stepLabel: "REFINE",
      title: "Make the details count",
      description:
        "We review, test, challenge, and refine the work to improve usability, clarity, consistency, and visual quality.",
    },
    {
      id: "5",
      stepNumber: "05",
      stepLabel: "DELIVER",
      title: "Ready for the real world",
      description:
        "We prepare final assets, specifications, components, and documentation to help the work move confidently from design into production.",
    },
  ];

  // GSAP ScrollTrigger setup
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      // Intro header reveal
      if (headerRef.current && !isReduced) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
            },
          }
        );
      }

      // Desktop Timeline Progress Line (Scrubbed orange fill)
      if (desktopLineRef.current && !isReduced) {
        gsap.fromTo(
          desktopLineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 45%",
              end: "bottom 75%",
              scrub: 0.5,
            },
          }
        );
      }

      // Mobile Timeline Progress Line
      if (mobileLineRef.current && !isReduced) {
        gsap.fromTo(
          mobileLineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 45%",
              end: "bottom 75%",
              scrub: 0.5,
            },
          }
        );
      }

      // Scroll-controlled Step Activation & Content Reveal
      stepRefs.current.forEach((el, index) => {
        if (!el) return;

        // Step active state trigger
        ScrollTrigger.create({
          trigger: el,
          start: "top 55%",
          end: "bottom 45%",
          onEnter: () => setActiveStepIndex(index),
          onEnterBack: () => setActiveStepIndex(index),
        });

        // Step entrance transition
        if (!isReduced) {
          const content = el.querySelector(".step-content");
          const visual = el.querySelector(".step-visual");
          gsap.fromTo(
            [content, visual],
            { opacity: 0.25, y: 25 },
            {
              opacity: 1,
              y: 0,
              duration: 0.65,
              ease: "power2.out",
              scrollTrigger: {
                trigger: el,
                start: "top 75%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Step 01: DISCOVER Illustration
  const renderDiscoverVisual = (isActive: boolean) => (
    <div className="w-full h-full relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px]" />
      <div className="absolute top-3 left-4 text-[10px] font-mono tracking-widest text-[#8E9098]">
        PHASE // 01.DISCOVER
      </div>
      <div className={`absolute top-3 right-4 text-[10px] font-mono tracking-widest transition-colors duration-300 ${
        isActive ? "text-[#FF5108]" : "text-[#737680]"
      }`}>
        {isActive ? "STATUS: RESEARCHING" : "INSIGHTS // CONTEXT"}
      </div>

      <svg
        viewBox="0 0 320 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-[300px] h-auto relative z-10"
      >
        {/* Radar concentric guide arcs */}
        <circle cx="160" cy="110" r="85" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="4 4" />
        <circle
          cx="160"
          cy="110"
          r="58"
          stroke={isActive ? "#FF5108" : "rgba(255,255,255,0.08)"}
          strokeWidth="1"
          strokeDasharray="5 3"
          className={isActive ? "animate-[spin_18s_linear_infinite] origin-center" : ""}
          opacity={isActive ? 0.6 : 0.3}
        />
        <circle cx="160" cy="110" r="30" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />

        {/* Connected Knowledge Nodes */}
        <line x1="85" y1="65" x2="160" y2="110" stroke={isActive ? "#FF5108" : "rgba(255,255,255,0.12)"} strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
        <line x1="235" y1="65" x2="160" y2="110" stroke={isActive ? "#FF5108" : "rgba(255,255,255,0.12)"} strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
        <line x1="80" y1="155" x2="160" y2="110" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
        <line x1="240" y1="155" x2="160" y2="110" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />

        {/* Node 1: AUDIENCE */}
        <circle cx="85" cy="65" r="5" fill="#08090D" stroke={isActive ? "#FF5108" : "#8E9098"} strokeWidth="1.5" />
        <circle cx="85" cy="65" r="2" fill={isActive ? "#FF5108" : "#8E9098"} />
        <text x="50" y="52" fill="#8E9098" fontSize="9" fontWeight="600" fontFamily="monospace" letterSpacing="0.08em">
          AUDIENCE
        </text>

        {/* Node 2: GOALS */}
        <circle cx="235" cy="65" r="5" fill="#08090D" stroke={isActive ? "#FF5108" : "#8E9098"} strokeWidth="1.5" />
        <circle cx="235" cy="65" r="2" fill={isActive ? "#FF5108" : "#8E9098"} />
        <text x="215" y="52" fill="#8E9098" fontSize="9" fontWeight="600" fontFamily="monospace" letterSpacing="0.08em">
          GOALS
        </text>

        {/* Node 3: SIGNALS */}
        <circle cx="80" cy="155" r="4" fill="#08090D" stroke="#8E9098" strokeWidth="1" />
        <text x="45" y="172" fill="#737680" fontSize="8" fontWeight="500" fontFamily="monospace">
          SIGNALS
        </text>

        {/* Node 4: MARKET */}
        <circle cx="240" cy="155" r="4" fill="#08090D" stroke="#8E9098" strokeWidth="1" />
        <text x="220" y="172" fill="#737680" fontSize="8" fontWeight="500" fontFamily="monospace">
          MARKET
        </text>

        {/* Center Focal Lens / Magnifier */}
        <circle
          cx="160"
          cy="110"
          r="26"
          stroke="#FF5108"
          strokeWidth="1.8"
          fill="rgba(255,81,8,0.06)"
          className={isActive ? "drop-shadow-[0_0_10px_rgba(255,81,8,0.5)]" : ""}
        />
        <line x1="178" y1="128" x2="202" y2="152" stroke="#FF5108" strokeWidth="2.5" strokeLinecap="round" />
        
        {/* Crosshair inside Lens */}
        <line x1="145" y1="110" x2="175" y2="110" stroke="#F4F2ED" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.6" />
        <line x1="160" y1="95" x2="160" y2="125" stroke="#F4F2ED" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.6" />
        <circle cx="160" cy="110" r="3.5" fill="#FF5108" className={isActive ? "animate-pulse" : ""} />
      </svg>
    </div>
  );

  // Step 02: DEFINE Illustration
  const renderDefineVisual = (isActive: boolean) => (
    <div className="w-full h-full relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,81,8,0.04)_0%,transparent_70%)]" />
      <div className="absolute top-3 left-4 text-[10px] font-mono tracking-widest text-[#8E9098]">
        PHASE // 02.DEFINE
      </div>
      <div className={`absolute top-3 right-4 text-[10px] font-mono tracking-widest transition-colors duration-300 ${
        isActive ? "text-[#FF5108]" : "text-[#737680]"
      }`}>
        {isActive ? "TARGET: LOCKED" : "ALIGNMENT // STRATEGY"}
      </div>

      <svg
        viewBox="0 0 320 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-[300px] h-auto relative z-10"
      >
        {/* Bullseye Strategy Target */}
        <circle cx="160" cy="100" r="75" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="4 4" />
        <circle cx="160" cy="100" r="50" stroke={isActive ? "#FF5108" : "rgba(255,255,255,0.1)"} strokeWidth="1.2" strokeDasharray="6 3" opacity="0.6" />
        <circle cx="160" cy="100" r="26" stroke="#FF5108" strokeWidth="1.5" fill="rgba(255,81,8,0.06)" />
        <circle cx="160" cy="100" r="6" fill="#08090D" stroke="#FF5108" strokeWidth="1.5" />
        <circle cx="160" cy="100" r="2" fill="#F4F2ED" className={isActive ? "animate-ping" : ""} />

        {/* Branching Roadmap Vectors */}
        <path
          d="M160 185 L160 145"
          stroke={isActive ? "#FF5108" : "rgba(255,255,255,0.2)"}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M160 155 L105 130"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="1"
          strokeDasharray="3 3"
        />
        <path
          d="M160 155 L215 130"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="1"
          strokeDasharray="3 3"
        />

        {/* Decision Nodes */}
        <circle cx="105" cy="130" r="4" fill="#08090D" stroke="#8E9098" strokeWidth="1" />
        <text x="60" y="145" fill="#8E9098" fontSize="8" fontWeight="600" fontFamily="monospace">
          PRIORITIES
        </text>

        <circle cx="215" cy="130" r="4" fill="#08090D" stroke="#8E9098" strokeWidth="1" />
        <text x="195" y="145" fill="#8E9098" fontSize="8" fontWeight="600" fontFamily="monospace">
          STRUCTURE
        </text>

        {/* Core Objective Tag */}
        <rect x="110" y="180" width="100" height="20" rx="3" fill="#08090D" stroke={isActive ? "#FF5108" : "rgba(255,255,255,0.15)"} strokeWidth="1" />
        <text x="122" y="193" fill={isActive ? "#FF5108" : "#8E9098"} fontSize="8" fontWeight="700" fontFamily="monospace" letterSpacing="0.08em">
          SHARED SUCCESS
        </text>
      </svg>
    </div>
  );

  // Step 03: DESIGN Illustration
  const renderDesignVisual = (isActive: boolean) => (
    <div className="w-full h-full relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px]" />
      <div className="absolute top-3 left-4 text-[10px] font-mono tracking-widest text-[#8E9098]">
        PHASE // 03.DESIGN
      </div>
      <div className={`absolute top-3 right-4 text-[10px] font-mono tracking-widest transition-colors duration-300 ${
        isActive ? "text-[#FF5108]" : "text-[#737680]"
      }`}>
        {isActive ? "SYSTEM: ITERATING" : "PROTOTYPES // UI/UX"}
      </div>

      <svg
        viewBox="0 0 320 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-[300px] h-auto relative z-10"
      >
        {/* Main Interface Frame */}
        <rect x="45" y="35" width="230" height="150" rx="6" stroke="rgba(255,255,255,0.15)" strokeWidth="1.2" fill="#08090D" />
        
        {/* Window controls header */}
        <line x1="45" y1="55" x2="275" y2="55" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        <circle cx="60" cy="45" r="2.5" fill="#FF5108" />
        <circle cx="70" cy="45" r="2.5" fill="rgba(255,255,255,0.25)" />
        <circle cx="80" cy="45" r="2.5" fill="rgba(255,255,255,0.25)" />

        {/* Wireframe Hero blocks */}
        <rect x="60" y="70" width="95" height="8" rx="2" fill="#F4F2ED" />
        <rect x="60" y="84" width="70" height="4" rx="1.5" fill="#8E9098" />
        
        {/* CTA Button */}
        <rect x="60" y="98" width="45" height="14" rx="3" fill="#FF5108" className={isActive ? "drop-shadow-[0_0_8px_rgba(255,81,8,0.5)]" : ""} />
        
        {/* Wireframe Right Visual Frame */}
        <rect x="175" y="70" width="85" height="52" rx="4" stroke={isActive ? "#FF5108" : "rgba(255,255,255,0.15)"} strokeWidth="1" strokeDasharray="4 3" fill="rgba(255,81,8,0.03)" />
        <line x1="175" y1="70" x2="260" y2="122" stroke="rgba(255,81,8,0.15)" strokeWidth="0.8" />
        <line x1="175" y1="122" x2="260" y2="70" stroke="rgba(255,81,8,0.15)" strokeWidth="0.8" />

        {/* Modular Card Row */}
        <rect x="60" y="132" width="60" height="38" rx="3" stroke="rgba(255,255,255,0.1)" fill="rgba(255,255,255,0.02)" />
        <rect x="130" y="132" width="60" height="38" rx="3" stroke="rgba(255,255,255,0.1)" fill="rgba(255,255,255,0.02)" />
        <rect x="200" y="132" width="60" height="38" rx="3" stroke="rgba(255,255,255,0.1)" fill="rgba(255,255,255,0.02)" />

        {/* Interactive Pointer Cursor */}
        <g className={isActive ? "translate-x-1 translate-y-1 transition-transform duration-700 ease-in-out" : ""}>
          <polygon points="95,108 95,124 100,120 106,128 109,126 103,118 110,118" fill="#F4F2ED" stroke="#08090D" strokeWidth="1" />
        </g>
      </svg>
    </div>
  );

  // Step 04: REFINE Illustration
  const renderRefineVisual = (isActive: boolean) => (
    <div className="w-full h-full relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,81,8,0.05)_0%,transparent_60%)]" />
      <div className="absolute top-3 left-4 text-[10px] font-mono tracking-widest text-[#8E9098]">
        PHASE // 04.REFINE
      </div>
      <div className={`absolute top-3 right-4 text-[10px] font-mono tracking-widest transition-colors duration-300 ${
        isActive ? "text-[#FF5108]" : "text-[#737680]"
      }`}>
        {isActive ? "CALIBRATING // 100%" : "PRECISION // AUDIT"}
      </div>

      <svg
        viewBox="0 0 320 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-[300px] h-auto relative z-10"
      >
        {/* Outer technical calibration frame with corner markers */}
        <rect x="40" y="30" width="240" height="160" rx="4" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        <line x1="35" y1="30" x2="45" y2="30" stroke="#FF5108" strokeWidth="1.5" />
        <line x1="40" y1="25" x2="40" y2="35" stroke="#FF5108" strokeWidth="1.5" />
        <line x1="275" y1="30" x2="285" y2="30" stroke="#FF5108" strokeWidth="1.5" />
        <line x1="280" y1="25" x2="280" y2="35" stroke="#FF5108" strokeWidth="1.5" />

        {/* Precision Slider 1: KERNING */}
        <text x="65" y="58" fill="#8E9098" fontSize="8" fontWeight="600" fontFamily="monospace" letterSpacing="0.08em">
          KERNING &amp; TYPE // 0.12
        </text>
        <line x1="65" y1="70" x2="205" y2="70" stroke="rgba(255,255,255,0.15)" strokeWidth="3" strokeLinecap="round" />
        <line x1="65" y1="70" x2="165" y2="70" stroke="#FF5108" strokeWidth="3" strokeLinecap="round" />
        <circle cx="165" cy="70" r="6" fill="#08090D" stroke="#FF5108" strokeWidth="2" className={isActive ? "drop-shadow-[0_0_6px_rgba(255,81,8,0.7)]" : ""} />

        {/* Precision Slider 2: CONTRAST */}
        <text x="65" y="100" fill="#8E9098" fontSize="8" fontWeight="600" fontFamily="monospace" letterSpacing="0.08em">
          WCAG CONTRAST // AAA
        </text>
        <line x1="65" y1="112" x2="205" y2="112" stroke="rgba(255,255,255,0.15)" strokeWidth="3" strokeLinecap="round" />
        <line x1="65" y1="112" x2="185" y2="112" stroke="#FF5108" strokeWidth="3" strokeLinecap="round" />
        <circle cx="185" cy="112" r="6" fill="#08090D" stroke="#FF5108" strokeWidth="2" className={isActive ? "drop-shadow-[0_0_6px_rgba(255,81,8,0.7)]" : ""} />

        {/* Precision Slider 3: GRID SPACING */}
        <text x="65" y="142" fill="#8E9098" fontSize="8" fontWeight="600" fontFamily="monospace" letterSpacing="0.08em">
          TOKEN GRID // 8PT
        </text>
        <line x1="65" y1="154" x2="205" y2="154" stroke="rgba(255,255,255,0.15)" strokeWidth="3" strokeLinecap="round" />
        <line x1="65" y1="154" x2="150" y2="154" stroke="#FF5108" strokeWidth="3" strokeLinecap="round" />
        <circle cx="150" cy="154" r="6" fill="#08090D" stroke="#FF5108" strokeWidth="2" className={isActive ? "drop-shadow-[0_0_6px_rgba(255,81,8,0.7)]" : ""} />

        {/* Audit Verification Seal */}
        <circle cx="245" cy="112" r="18" fill="rgba(255,81,8,0.06)" stroke="#FF5108" strokeWidth="1.2" />
        <path d="M239 112 L243 116 L252 107" stroke="#F4F2ED" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <text x="228" y="142" fill={isActive ? "#FF5108" : "#8E9098"} fontSize="8" fontWeight="700" fontFamily="monospace">
          PASSED
        </text>
      </svg>
    </div>
  );

  // Step 05: DELIVER Illustration
  const renderDeliverVisual = (isActive: boolean) => (
    <div className="w-full h-full relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px]" />
      <div className="absolute top-3 left-4 text-[10px] font-mono tracking-widest text-[#8E9098]">
        PHASE // 05.DELIVER
      </div>
      <div className={`absolute top-3 right-4 text-[10px] font-mono tracking-widest transition-colors duration-300 ${
        isActive ? "text-[#FF5108]" : "text-[#737680]"
      }`}>
        {isActive ? "DEPLOY: READY" : "PRODUCTION // V1.0"}
      </div>

      <svg
        viewBox="0 0 320 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-[300px] h-auto relative z-10"
      >
        {/* Production Package Crate */}
        <rect x="40" y="40" width="240" height="145" rx="6" stroke={isActive ? "#FF5108" : "rgba(255,255,255,0.15)"} strokeWidth="1.2" fill="rgba(255,81,8,0.03)" />
        <line x1="40" y1="70" x2="280" y2="70" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4 4" />
        
        {/* Organized Production Bundles */}
        {/* Bundle 1: ASSETS */}
        <rect x="55" y="85" width="46" height="42" rx="3" stroke="rgba(255,255,255,0.15)" fill="#08090D" />
        <text x="64" y="104" fill="#FF5108" fontSize="8" fontWeight="700" fontFamily="monospace">
          ASSETS
        </text>
        <text x="67" y="116" fill="#8E9098" fontSize="7" fontWeight="500" fontFamily="monospace">
          .SVG/PNG
        </text>

        {/* Bundle 2: TOKENS */}
        <rect x="110" y="85" width="46" height="42" rx="3" stroke="rgba(255,255,255,0.15)" fill="#08090D" />
        <text x="119" y="104" fill="#F4F2ED" fontSize="8" fontWeight="700" fontFamily="monospace">
          TOKENS
        </text>
        <text x="122" y="116" fill="#8E9098" fontSize="7" fontWeight="500" fontFamily="monospace">
          SYSTEM
        </text>

        {/* Bundle 3: SPECS */}
        <rect x="165" y="85" width="46" height="42" rx="3" stroke="rgba(255,255,255,0.15)" fill="#08090D" />
        <text x="178" y="104" fill="#8E9098" fontSize="8" fontWeight="700" fontFamily="monospace">
          SPECS
        </text>
        <text x="175" y="116" fill="#737680" fontSize="7" fontWeight="500" fontFamily="monospace">
          DEV/QA
        </text>

        {/* Bundle 4: DOCS */}
        <rect x="220" y="85" width="46" height="42" rx="3" stroke="rgba(255,255,255,0.15)" fill="#08090D" />
        <text x="233" y="104" fill="#F4F2ED" fontSize="8" fontWeight="700" fontFamily="monospace">
          DOCS
        </text>
        <text x="231" y="116" fill="#8E9098" fontSize="7" fontWeight="500" fontFamily="monospace">
          GUIDE
        </text>

        {/* Delivery / Launch Indicator Trajectory */}
        <path
          d="M160 170 L160 145 M160 145 L153 152 M160 145 L167 152"
          stroke="#FF5108"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={isActive ? "animate-bounce" : ""}
        />

        {/* Status Badge */}
        <text x="100" y="160" fill={isActive ? "#FF5108" : "#8E9098"} fontSize="8" fontWeight="700" fontFamily="monospace" letterSpacing="0.08em">
          HANDOFF CONFIRMED // LIVE
        </text>
      </svg>
    </div>
  );

  // Helper dispatcher for step illustrations
  const renderIllustration = (index: number, isActive: boolean) => {
    switch (index) {
      case 0:
        return renderDiscoverVisual(isActive);
      case 1:
        return renderDefineVisual(isActive);
      case 2:
        return renderDesignVisual(isActive);
      case 3:
        return renderRefineVisual(isActive);
      case 4:
        return renderDeliverVisual(isActive);
      default:
        return null;
    }
  };

  return (
    <section
      id="process"
      ref={containerRef}
      className="relative w-full bg-[#08090D] py-24 md:py-32 lg:py-40 border-b border-white/[0.08]"
    >
      <div className="w-full max-w-[1280px] mx-auto px-4 md:px-6 lg:px-0">
        {/* Section Introduction */}
        <div
          ref={headerRef}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 lg:gap-16 mb-20 md:mb-28 lg:mb-36"
        >
          {/* Left Column: Eyebrow + Main Heading */}
          <div className="lg:w-7/12">
            <div className="flex items-center gap-2.5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5108] inline-block shadow-[0_0_8px_rgba(255,81,8,0.6)]" />
              <p className="uppercase tracking-[0.22em] text-[12px] md:text-[13px] font-[600] text-[#8E9098]">
                OUR PROCESS
              </p>
              <span className="text-[#737680] font-mono text-[11px] tracking-widest ml-1">
                (05 PHASES)
              </span>
            </div>

            <h2 className="text-[44px] sm:text-[56px] md:text-[68px] lg:text-[76px] xl:text-[84px] font-[800] leading-[1.0] tracking-[-0.03em] select-none">
              <span className="text-[#F4F2ED] block">Clarity before</span>
              <span className="text-[#FF5108] block">creativity.</span>
            </h2>
          </div>

          {/* Right Column: Supporting Description */}
          <div className="lg:w-5/12 flex justify-start lg:justify-end pb-2">
            <p className="text-[#8E9098] text-[15px] sm:text-[16px] md:text-[17px] leading-[1.75] font-[400] max-w-[480px]">
              Great design rarely starts with the first visual idea. It starts by understanding the
              problem. Our process gives every project enough space to ask the right questions,
              explore the right opportunities, and make confident design decisions.
            </p>
          </div>
        </div>

        {/* Editorial Process Journey: Central Timeline Structure */}
        <div className="relative w-full">
          {/* Central Vertical Baseline (Desktop only) */}
          <div className="hidden lg:block absolute left-1/2 top-8 bottom-8 w-[2px] -translate-x-1/2 bg-white/[0.08] z-0">
            <div
              ref={desktopLineRef}
              className="w-full h-full bg-[#FF5108] origin-top scale-y-0 shadow-[0_0_14px_rgba(255,81,8,0.6)]"
            />
          </div>

          {/* Left Vertical Baseline (Tablet & Mobile only) */}
          <div className="lg:hidden absolute left-5 sm:left-6 top-6 bottom-6 w-[2px] -translate-x-1/2 bg-white/[0.08] z-0">
            <div
              ref={mobileLineRef}
              className="w-full h-full bg-[#FF5108] origin-top scale-y-0 shadow-[0_0_14px_rgba(255,81,8,0.6)]"
            />
          </div>

          {/* Timeline Step Items */}
          <div className="space-y-20 sm:space-y-28 md:space-y-36 lg:space-y-40">
            {steps.map((step, idx) => {
              const isActive = activeStepIndex === idx;
              const isPast = activeStepIndex > idx;
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={step.id || idx}
                  ref={(el) => {
                    stepRefs.current[idx] = el;
                  }}
                  className="relative group"
                >
                  {/* CENTRAL NUMBERED TIMELINE NODE (Desktop: Centered) */}
                  <div
                    className={`hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full items-center justify-center font-mono font-bold text-[14px] transition-all duration-500 select-none ${
                      isActive
                        ? "bg-[#FF5108] text-[#08090D] scale-110 shadow-[0_0_24px_rgba(255,81,8,0.8)] border-2 border-[#FF5108]"
                        : isPast
                        ? "bg-[#08090D] text-[#FF5108] border-2 border-[#FF5108] shadow-[0_0_10px_rgba(255,81,8,0.3)] scale-100"
                        : "bg-[#08090D] text-[#737680] border border-white/[0.15] scale-95"
                    }`}
                  >
                    <span>{step.stepNumber}</span>
                    {isActive && (
                      <span className="absolute -inset-1.5 rounded-full border border-[#FF5108]/50 animate-ping opacity-60 pointer-events-none" />
                    )}
                  </div>

                  {/* LEFT NUMBERED TIMELINE NODE (Mobile / Tablet) */}
                  <div
                    className={`lg:hidden absolute left-5 sm:left-6 top-0 -translate-x-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center font-mono font-bold text-[12px] transition-all duration-500 select-none ${
                      isActive
                        ? "bg-[#FF5108] text-[#08090D] scale-105 shadow-[0_0_16px_rgba(255,81,8,0.8)] border-2 border-[#FF5108]"
                        : isPast
                        ? "bg-[#08090D] text-[#FF5108] border-2 border-[#FF5108] scale-100"
                        : "bg-[#08090D] text-[#737680] border border-white/[0.15] scale-95"
                    }`}
                  >
                    <span>{step.stepNumber}</span>
                  </div>

                  {/* STEP CONTENT & ILLUSTRATION CONTAINER */}
                  {/* On Mobile/Tablet: Left aligned to timeline */}
                  {/* On Desktop: Alternating left/right 2-column layout */}
                  <div className="pl-14 sm:pl-16 lg:pl-0 grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-24">
                    {/* Content Column */}
                    <div
                      className={`step-content flex flex-col justify-center ${
                        isEven
                          ? "lg:order-1 lg:pr-12 xl:pr-16"
                          : "lg:order-2 lg:pl-12 xl:pl-16"
                      }`}
                    >
                      <div className="max-w-[480px]">
                        {/* Step Number & Label Eyebrow */}
                        <div className="flex items-center gap-2 mb-3">
                          <span
                            className={`font-mono text-[12px] font-[700] tracking-[0.2em] uppercase transition-colors duration-300 ${
                              isActive ? "text-[#FF5108]" : "text-[#8E9098]"
                            }`}
                          >
                            {step.stepNumber} / {step.stepLabel}
                          </span>
                        </div>

                        {/* Step Heading */}
                        <h3
                          className={`text-[28px] sm:text-[34px] md:text-[38px] lg:text-[42px] font-[800] tracking-[-0.03em] leading-tight transition-colors duration-300 ${
                            isActive ? "text-[#F4F2ED]" : "text-[#F4F2ED]/80"
                          }`}
                        >
                          {step.title}
                        </h3>

                        {/* Step Description */}
                        <p className="text-[#8E9098] text-[15px] sm:text-[16px] md:text-[17px] leading-[1.75] mt-4 font-[400]">
                          {step.description}
                        </p>
                      </div>
                    </div>

                    {/* Illustration Column */}
                    <div
                      className={`step-visual w-full flex items-center justify-center ${
                        isEven
                          ? "lg:order-2 lg:pl-12 xl:pl-16"
                          : "lg:order-1 lg:pr-12 xl:pr-16"
                      }`}
                    >
                      <div
                        className={`w-full max-w-[480px] aspect-[4/3] rounded-xl border bg-[#0A0C10] p-6 sm:p-8 relative transition-all duration-500 overflow-hidden ${
                          isActive
                            ? "border-[#FF5108]/40 shadow-[0_0_30px_rgba(255,81,8,0.08)] bg-[#0C0F15]"
                            : "border-white/[0.08] hover:border-white/[0.15]"
                        }`}
                      >
                        {renderIllustration(idx, isActive)}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
