import { QuoteBlockData } from "@/lib/types/caseStudy";

export default function QuoteBlock({ data }: { data: QuoteBlockData }) {
  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 py-16 sm:py-20 md:py-24">
      <div className="relative p-8 sm:p-12 md:p-16 rounded-3xl bg-[#11141A] border border-white/[0.08] overflow-hidden">
        {/* Subtle decorative background quote */}
        <span
          aria-hidden="true"
          className="absolute -top-10 right-8 font-serif text-[180px] sm:text-[220px] text-white/[0.03] select-none pointer-events-none leading-none"
        >
          “
        </span>

        <div className="relative z-10 max-w-[900px]">
          {/* Orange quote mark */}
          <span className="font-serif text-[48px] sm:text-[60px] text-[#FF5108] leading-none block mb-4 select-none">
            “
          </span>

          {/* Quotation text */}
          <blockquote className="m-0">
            <p className="text-[20px] sm:text-[24px] md:text-[28px] font-[500] leading-[1.4] text-[#F4F2ED] tracking-[-0.02em] mb-8">
              {data.quote}
            </p>
          </blockquote>

          {/* Attribution */}
          <div className="flex items-center gap-4 pt-6 border-t border-white/[0.08]">
            <div className="w-10 h-10 rounded-full bg-[#FF5108]/10 border border-[#FF5108]/30 flex items-center justify-center font-[700] text-[13px] text-[#FF5108]">
              {data.author
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")}
            </div>
            <div>
              <span className="text-[15px] font-[700] text-[#F4F2ED] block">
                {data.author}
              </span>
              <span className="text-[12.5px] text-[#8E9098] block">
                {data.role} {data.company && `· ${data.company}`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
