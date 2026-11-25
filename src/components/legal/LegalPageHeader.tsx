import Link from "next/link";

interface LegalPageHeaderProps {
  eyebrow: string;
  title: string;
  introduction: string;
  lastUpdated: string;
  readingTime: string;
  relatedLink?: {
    label: string;
    title: string;
    href: string;
  };
}

export default function LegalPageHeader({
  eyebrow,
  title,
  introduction,
  lastUpdated,
  readingTime,
  relatedLink,
}: LegalPageHeaderProps) {
  return (
    <header className="relative w-full pt-32 sm:pt-36 md:pt-40 pb-12 sm:pb-16 border-b border-white/[0.08]">
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Eyebrow */}
        <div className="flex items-center gap-2.5 mb-5 sm:mb-6">
          <span
            className="w-1.5 h-1.5 rounded-full bg-[#FF5108] inline-block shadow-[0_0_8px_rgba(255,81,8,0.8)]"
            aria-hidden="true"
          />
          <p className="uppercase tracking-[0.24em] text-[11px] sm:text-[12px] md:text-[13px] font-[600] text-[#8E9098]">
            {eyebrow}
          </p>
        </div>

        {/* Title */}
        <h1 className="text-[40px] sm:text-[52px] md:text-[64px] lg:text-[72px] font-[800] leading-[1.05] tracking-[-0.035em] text-[#F4F2ED] mb-6">
          {title}
        </h1>

        {/* Introduction */}
        <p className="text-[#B2B4BC] text-[17px] sm:text-[19px] md:text-[21px] leading-[1.6] font-[400] max-w-[780px] mb-8 sm:mb-10">
          {introduction}
        </p>

        {/* Metadata Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/[0.06] text-[12px] sm:text-[13px] font-mono text-[#737680]">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <span className="flex items-center gap-2">
              <span className="text-[#8E9098]">LAST UPDATED:</span>
              <span className="text-[#F4F2ED] font-[600]">{lastUpdated}</span>
            </span>
            <span className="text-white/[0.15] hidden sm:inline">•</span>
            <span className="flex items-center gap-2">
              <span className="text-[#8E9098]">READING TIME:</span>
              <span className="text-[#F4F2ED] font-[600]">{readingTime}</span>
            </span>
          </div>

          {relatedLink && (
            <Link
              href={relatedLink.href}
              className="inline-flex items-center gap-2 text-[#8E9098] hover:text-[#FF5108] transition-colors duration-200 group"
            >
              <span>{relatedLink.label}:</span>
              <span className="text-[#F4F2ED] group-hover:text-[#FF5108] font-[600] underline underline-offset-4 decoration-white/20 group-hover:decoration-[#FF5108]">
                {relatedLink.title} →
              </span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
