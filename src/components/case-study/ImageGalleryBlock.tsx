import Image from "next/image";
import { ImageGalleryBlockData } from "@/lib/types/caseStudy";

export default function ImageGalleryBlock({ data }: { data: ImageGalleryBlockData }) {
  const is3Col = data.layout === "3-column";

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 py-16 sm:py-20 md:py-24">
      {(data.eyebrow || data.heading) && (
        <div className="mb-10 sm:mb-12">
          {data.eyebrow && (
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5108]" />
              <span className="text-[11px] font-mono uppercase tracking-[0.24em] text-[#FF5108] font-[700]">
                {data.eyebrow}
              </span>
            </div>
          )}
          {data.heading && (
            <h3 className="text-[28px] sm:text-[36px] font-[800] tracking-[-0.03em] text-[#F4F2ED]">
              {data.heading}
            </h3>
          )}
        </div>
      )}

      {/* Grid */}
      <div
        className={`grid gap-6 sm:gap-8 ${
          is3Col
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-1 md:grid-cols-2"
        }`}
      >
        {data.images.map((img, idx) => (
          <div
            key={idx}
            className="group relative rounded-2xl overflow-hidden border border-white/[0.12] bg-[#11141A] shadow-[0_8px_30px_rgba(0,0,0,0.5)] flex flex-col justify-between"
          >
            <div className="relative w-full aspect-[16/10] overflow-hidden">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            {img.caption && (
              <div className="p-4 bg-[#0C0E14] border-t border-white/[0.06] text-[12px] text-[#8E9098] font-mono">
                {img.caption}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
