import { ProjectMetadataBlockData } from "@/lib/types/caseStudy";

export default function ProjectMetadataBlock({ data }: { data: ProjectMetadataBlockData }) {
  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 py-10 sm:py-12 border-b border-white/[0.08]">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
        {/* Client */}
        <div>
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#8E9098] block mb-2">
            CLIENT
          </span>
          <span className="text-[15px] sm:text-[16px] font-[700] text-[#F4F2ED]">
            {data.client}
          </span>
        </div>

        {/* Industry */}
        <div>
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#8E9098] block mb-2">
            INDUSTRY
          </span>
          <span className="text-[15px] sm:text-[16px] font-[700] text-[#F4F2ED]">
            {data.industry}
          </span>
        </div>

        {/* Year & Duration */}
        <div>
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#8E9098] block mb-2">
            YEAR &amp; DURATION
          </span>
          <span className="text-[15px] sm:text-[16px] font-[700] text-[#F4F2ED]">
            {data.year} · {data.duration}
          </span>
        </div>

        {/* Services & Deliverables */}
        <div>
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#8E9098] block mb-2">
            DELIVERABLES
          </span>
          <div className="flex flex-wrap gap-1.5">
            {data.services.map((svc) => (
              <span
                key={svc}
                className="text-[12px] font-mono text-[#F4F2ED] bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.08]"
              >
                {svc}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
