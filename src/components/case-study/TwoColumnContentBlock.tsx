import Image from "next/image";
import { TwoColumnContentBlockData } from "@/lib/types/caseStudy";

export default function TwoColumnContentBlock({ data }: { data: TwoColumnContentBlockData }) {
  const isTextRight = data.layout === "text-right";

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 py-16 sm:py-20 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        {/* Text Column */}
        <div className={`lg:col-span-5 ${isTextRight ? "lg:order-2" : "lg:order-1"}`}>
          {data.eyebrow && (
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5108]" />
              <span className="text-[11px] font-mono uppercase tracking-[0.24em] text-[#FF5108] font-[700]">
                {data.eyebrow}
              </span>
            </div>
          )}

          <h3 className="text-[28px] sm:text-[36px] md:text-[42px] font-[800] leading-[1.12] tracking-[-0.03em] text-[#F4F2ED] mb-6">
            {data.heading}
          </h3>

          <div className="space-y-5 text-[15px] sm:text-[16px] leading-[1.75] text-[#8E9098]">
            {data.content.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {data.bullets && data.bullets.length > 0 && (
            <ul className="mt-6 space-y-2.5">
              {data.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-2.5 text-[14px] text-[#A6A8AE]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF5108] mt-2 shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Media Column */}
        <div className={`lg:col-span-7 ${isTextRight ? "lg:order-1" : "lg:order-2"}`}>
          <div className="relative w-full rounded-2xl overflow-hidden border border-white/[0.12] bg-[#11141A] shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
            <div className="relative w-full aspect-[16/10]">
              <Image
                src={data.media.src}
                alt={data.media.alt || data.heading}
                fill
                className="object-cover"
              />
            </div>
            {data.caption && (
              <div className="px-5 py-3 bg-[#0C0E14] border-t border-white/[0.06] text-[11.5px] text-[#8E9098] font-mono">
                {data.caption}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
