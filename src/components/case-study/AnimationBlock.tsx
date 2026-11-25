import { AnimationBlockData } from "@/lib/types/caseStudy";

export default function AnimationBlock({ data }: { data: AnimationBlockData }) {
  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 py-16 sm:py-20">
      <div className="p-8 sm:p-12 rounded-2xl bg-[#11141A] border border-white/[0.12] text-center">
        {data.title && (
          <h3 className="text-[24px] sm:text-[30px] font-[800] text-[#F4F2ED] mb-3">
            {data.title}
          </h3>
        )}
        {data.description && (
          <p className="text-[14px] text-[#8E9098] max-w-[600px] mx-auto mb-8">
            {data.description}
          </p>
        )}
        {/* Interactive / CSS Animated Graphic */}
        <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-[#FF5108]/30 animate-ping opacity-40" />
          <div className="w-36 h-36 rounded-full border-2 border-[#FF5108] flex items-center justify-center bg-[#FF5108]/10 shadow-[0_0_24px_rgba(255,81,8,0.4)]">
            <span className="font-mono text-[12px] font-[700] text-[#FF5108] tracking-widest uppercase">
              ANIMATION
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
