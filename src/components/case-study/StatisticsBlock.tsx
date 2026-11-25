import { StatisticsBlockData } from "@/lib/types/caseStudy";

export default function StatisticsBlock({ data }: { data: StatisticsBlockData }) {
  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 py-16 sm:py-20">
      {/* Header if provided */}
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

      {/* Grid of Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {data.items.map((stat, i) => (
          <div
            key={i}
            className="p-6 sm:p-7 rounded-2xl bg-[#11141A] border border-white/[0.08] hover:border-[#FF5108]/40 transition-colors"
          >
            <span className="text-[44px] sm:text-[54px] lg:text-[60px] font-[800] leading-none tracking-[-0.04em] text-[#FF5108] block mb-3 font-mono">
              {stat.value}
            </span>
            <h4 className="text-[15px] sm:text-[16px] font-[700] text-[#F4F2ED] mb-2">
              {stat.label}
            </h4>
            {stat.description && (
              <p className="text-[12.5px] sm:text-[13px] text-[#8E9098] leading-[1.6]">
                {stat.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
