"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function LaunchOrb() {
  const orbRef = useRef<HTMLDivElement>(null);
  const ring1 = useRef<SVGCircleElement>(null);
  const ring2 = useRef<SVGCircleElement>(null);
  const ring3 = useRef<SVGGElement>(null);
  const particles = useRef<SVGGElement>(null);
  const centerPulse = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    if (!isReduced) {
      // Rotation animations
      gsap.to(ring1.current, { rotation: 360, duration: 60, repeat: -1, ease: "none", transformOrigin: "50% 50%" });
      gsap.to(ring2.current, { rotation: -360, duration: 45, repeat: -1, ease: "none", transformOrigin: "50% 50%" });
      gsap.to(ring3.current, { rotation: 360, duration: 30, repeat: -1, ease: "none", transformOrigin: "50% 50%" });
      gsap.to(particles.current, { rotation: 360, duration: 20, repeat: -1, ease: "none", transformOrigin: "50% 50%" });

      // Breathing glow
      gsap.to(centerPulse.current, { r: 15, opacity: 0.8, duration: 2, yoyo: true, repeat: -1, ease: "power1.inOut" });

      // Mouse Parallax via requestAnimationFrame/quickTo
      const xTo = gsap.quickTo(orbRef.current, "rotationY", { ease: "power3", duration: 0.6 });
      const yTo = gsap.quickTo(orbRef.current, "rotationX", { ease: "power3", duration: 0.6 });
      const xTrans = gsap.quickTo(orbRef.current, "x", { ease: "power3", duration: 0.6 });
      const yTrans = gsap.quickTo(orbRef.current, "y", { ease: "power3", duration: 0.6 });

      const onMouseMove = (e: MouseEvent) => {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        const dx = (e.clientX - cx) / cx; // -1 to 1
        const dy = (e.clientY - cy) / cy; // -1 to 1

        xTo(dx * 6); // Max 6 deg
        yTo(-dy * 6); // Max 6 deg
        xTrans(dx * 10); // Max 10px
        yTrans(dy * 10);
      };

      window.addEventListener("mousemove", onMouseMove);
      return () => window.removeEventListener("mousemove", onMouseMove);
    }
  }, []);

  return (
    <div 
      className="relative w-full max-w-[300px] md:max-w-[500px] aspect-square flex items-center justify-center cursor-interact"
      style={{ perspective: 1000 }}
    >
      {/* Background orange glow */}
      <div className="absolute inset-0 m-auto w-[60%] h-[60%] bg-accent opacity-20 blur-[100px] rounded-full pointer-events-none" />
      
      <div ref={orbRef} className="w-full h-full relative" style={{ transformStyle: 'preserve-3d' }}>
        <svg viewBox="0 0 500 500" className="w-full h-full overflow-visible">
          <defs>
            <radialGradient id="glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FF4D00" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FF4D00" stopOpacity="0" />
            </radialGradient>
            <filter id="noise">
              <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
              <feColorMatrix type="matrix" values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.1 0" />
            </filter>
          </defs>

          {/* Noise layer */}
          <circle cx="250" cy="250" r="240" fill="transparent" filter="url(#noise)" opacity="0.4" />

          {/* Crosshair / Radial Lines */}
          <line x1="250" y1="0" x2="250" y2="500" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="5,5" />
          <line x1="0" y1="250" x2="500" y2="250" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="5,5" />
          
          <line x1="73.2" y1="73.2" x2="426.8" y2="426.8" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          <line x1="73.2" y1="426.8" x2="426.8" y2="73.2" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />

          {/* Concentric Rings */}
          <circle cx="250" cy="250" r="240" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          
          <circle ref={ring1} cx="250" cy="250" r="200" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="4 12" />
          
          <circle ref={ring2} cx="250" cy="250" r="160" fill="none" stroke="#FF4D00" strokeWidth="2" strokeDasharray="100 20 20 20" opacity="0.8" />
          
          <g ref={ring3}>
            <circle cx="250" cy="250" r="120" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="4" />
            <circle cx="250" cy="130" r="4" fill="#FF4D00" />
            <circle cx="250" cy="370" r="4" fill="#FF4D00" />
          </g>

          {/* Orbiting Particles */}
          <g ref={particles}>
            <circle cx="250" cy="50" r="2" fill="#fff" />
            <circle cx="450" cy="250" r="3" fill="#FF4D00" />
            <circle cx="100" cy="350" r="1.5" fill="#fff" />
          </g>

          {/* Center Glow */}
          <circle cx="250" cy="250" r="30" fill="url(#glow)" />
          <circle ref={centerPulse} className="center-pulse-node" cx="250" cy="250" r="10" fill="#FF4D00" />
          <circle cx="250" cy="250" r="4" fill="#fff" />

          {/* Technical Markers & Labels */}
          <g fill="#8D8D8D" fontSize="10" fontFamily="monospace" letterSpacing="2">
            <text x="255" y="45">CV-001</text>
            <text x="45" y="245">SIGNAL</text>
            <text x="410" y="245">SYSTEM</text>
            <text x="255" y="465">BUILD</text>
            <text x="110" y="120">2026</text>
            <text x="350" y="380">READY</text>
          </g>

          <g stroke="rgba(255,255,255,0.4)" strokeWidth="1">
            <path d="M 245 40 L 255 40" />
            <path d="M 245 460 L 255 460" />
            <path d="M 40 245 L 40 255" />
            <path d="M 460 245 L 460 255" />
          </g>
        </svg>
      </div>
    </div>
  );
}
