import Link from "next/link";

export default function CaseStudyNotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-32 bg-[#08090D]">
      <span className="text-[12px] font-mono uppercase tracking-[0.28em] text-[#FF5108] mb-4">
        404 // CASE STUDY NOT FOUND
      </span>
      <h1 className="text-[44px] sm:text-[60px] md:text-[72px] font-[800] text-[#F4F2ED] tracking-[-0.03em] mb-6">
        Project Not Located
      </h1>
      <p className="text-[16px] text-[#8E9098] max-w-[500px] mb-10 leading-relaxed">
        The case study you are looking for does not exist, has been archived, or is currently under curation.
      </p>
      <Link
        href="/#work"
        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#FF5108] text-[#08090D] font-[700] uppercase text-[12px] tracking-[0.1em] hover:bg-[#FF6622] transition-colors"
      >
        <span>← RETURN TO SELECTED WORK</span>
      </Link>
    </div>
  );
}
