"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { BeforeAfterBlockData } from "@/lib/types/caseStudy";

export default function BeforeAfterBlock({ data }: { data: BeforeAfterBlockData }) {
  const [sliderPos, setSliderPos] = useState<number>(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef<boolean>(false);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percent);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handlePointerDown = () => {
    isDraggingRef.current = true;
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    handleMove(e.clientX);
  };

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 py-16 sm:py-20 md:py-24">
      {/* Block Header */}
      <div className="max-w-[780px] mb-8 sm:mb-10">
        {data.eyebrow && (
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5108]" />
            <span className="text-[11px] font-mono uppercase tracking-[0.24em] text-[#FF5108] font-[700]">
              {data.eyebrow}
            </span>
          </div>
        )}
        {data.heading && (
          <h3 className="text-[28px] sm:text-[38px] md:text-[44px] font-[800] leading-[1.1] tracking-[-0.03em] text-[#F4F2ED] mb-3">
            {data.heading}
          </h3>
        )}
        {data.description && (
          <p className="text-[15px] sm:text-[16px] text-[#8E9098] leading-[1.7]">
            {data.description}
          </p>
        )}
      </div>

      {/* Interactive Slider Container */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerMove={handlePointerMove}
        onTouchMove={handleTouchMove}
        className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden border border-white/[0.12] bg-[#11141A] select-none cursor-ew-resize shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
      >
        {/* Layer 2: AFTER Image (Bottom layer) */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={data.afterImage.src}
            alt={data.afterImage.alt}
            fill
            className="object-cover"
          />
          {data.afterLabel && (
            <span className="absolute bottom-5 right-5 z-10 px-3 py-1 rounded bg-[#08090D]/80 backdrop-blur-md border border-white/10 font-mono text-[11px] font-[700] tracking-wider text-[#FF5108]">
              {data.afterLabel}
            </span>
          )}
        </div>

        {/* Layer 1: BEFORE Image (Clipped top layer) */}
        <div
          className="absolute inset-0 w-full h-full overflow-hidden"
          style={{ width: `${sliderPos}%` }}
        >
          <div className="relative w-full h-full" style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : "100%" }}>
            <Image
              src={data.beforeImage.src}
              alt={data.beforeImage.alt}
              fill
              className="object-cover"
            />
            {data.beforeLabel && (
              <span className="absolute bottom-5 left-5 z-10 px-3 py-1 rounded bg-[#08090D]/80 backdrop-blur-md border border-white/10 font-mono text-[11px] font-[700] tracking-wider text-[#F4F2ED]">
                {data.beforeLabel}
              </span>
            )}
          </div>
        </div>

        {/* Draggable Divider Handle */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-[#FF5108] shadow-[0_0_12px_rgba(255,81,8,0.8)] z-20 pointer-events-none"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#08090D] border-2 border-[#FF5108] flex items-center justify-center text-[#FF5108] text-[10px] font-bold shadow-lg">
            ⇄
          </div>
        </div>
      </div>

      {data.caption && (
        <p className="mt-3 text-center text-[12px] font-mono text-[#8E9098]">
          {data.caption}
        </p>
      )}
    </div>
  );
}
