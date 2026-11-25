import Image from "next/image";
import { SingleImageBlockData } from "@/lib/types/caseStudy";

export default function SingleImageBlock({ data }: { data: SingleImageBlockData }) {
  const widthClasses =
    data.widthOption === "compact"
      ? "max-w-[840px]"
      : data.widthOption === "wide"
      ? "max-w-[1400px]"
      : "max-w-[1100px]";

  return (
    <div className={`w-full mx-auto px-4 md:px-6 lg:px-8 py-12 sm:py-16 ${widthClasses}`}>
      <div className="relative rounded-2xl overflow-hidden border border-white/[0.12] bg-[#11141A] shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
        <div className="relative w-full aspect-[16/9]">
          <Image
            src={data.image.src}
            alt={data.image.alt}
            fill
            className="object-cover"
          />
        </div>
        {data.image.caption && (
          <div className="px-6 py-3.5 bg-[#0C0E14] border-t border-white/[0.06] text-[12px] text-[#8E9098] font-mono">
            {data.image.caption}
          </div>
        )}
      </div>
    </div>
  );
}
