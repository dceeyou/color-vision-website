import Image from "next/image";
import { FullWidthImageBlockData } from "@/lib/types/caseStudy";

export default function FullWidthImageBlock({ data }: { data: FullWidthImageBlockData }) {
  return (
    <div className="w-full py-12 sm:py-16 md:py-20">
      <div className="relative w-full aspect-[21/9] sm:aspect-[24/9] border-y border-white/[0.12] bg-[#11141A]">
        <Image
          src={data.image.src}
          alt={data.image.alt}
          fill
          className="object-cover"
        />
      </div>
      {data.caption && (
        <div className="w-full max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 pt-3 text-right">
          <span className="text-[12px] text-[#8E9098] font-mono">
            {data.caption}
          </span>
        </div>
      )}
    </div>
  );
}
