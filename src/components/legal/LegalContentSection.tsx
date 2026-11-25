import { LegalSection } from "@/lib/legal/types";

interface LegalContentSectionProps {
  section: LegalSection;
}

export default function LegalContentSection({ section }: LegalContentSectionProps) {
  return (
    <article
      id={section.id}
      className="scroll-mt-28 pb-12 sm:pb-16 mb-12 sm:mb-16 border-b border-white/[0.08] last:border-b-0 last:pb-0 last:mb-0"
    >
      {/* Section Eyebrow */}
      <span className="font-mono text-[11px] sm:text-[12px] font-[600] text-[#FF5108] uppercase tracking-[0.2em] block mb-2">
        {section.sectionNumber} / SECTION
      </span>

      {/* Section Heading */}
      <h2 className="text-[26px] sm:text-[32px] md:text-[36px] font-[800] tracking-[-0.03em] text-[#F4F2ED] mb-6 leading-[1.15]">
        {section.sectionNumber} — {section.title}
      </h2>

      {/* Section Main Prose */}
      {section.content && section.content.length > 0 && (
        <div className="space-y-4 max-w-[760px]">
          {section.content.map((paragraph, idx) => (
            <p
              key={idx}
              className="text-[#B2B4BC] text-[15px] sm:text-[16px] md:text-[16.5px] leading-[1.75] font-[400]"
            >
              {paragraph}
            </p>
          ))}
        </div>
      )}

      {/* Subsections */}
      {section.subsections && section.subsections.length > 0 && (
        <div className="mt-8 space-y-8 max-w-[760px]">
          {section.subsections.map((sub, sIdx) => (
            <div key={sIdx} className="space-y-3">
              <h3 className="text-[18px] sm:text-[20px] font-[700] text-[#F4F2ED] tracking-[-0.015em]">
                {sub.subtitle}
              </h3>

              {sub.paragraphs && sub.paragraphs.length > 0 && (
                <div className="space-y-3">
                  {sub.paragraphs.map((p, pIdx) => (
                    <p
                      key={pIdx}
                      className="text-[#B2B4BC] text-[15px] sm:text-[16px] leading-[1.75] font-[400]"
                    >
                      {p}
                    </p>
                  ))}
                </div>
              )}

              {sub.bulletPoints && sub.bulletPoints.length > 0 && (
                <ul className="space-y-2.5 pt-1 pl-1 list-none">
                  {sub.bulletPoints.map((point, bIdx) => (
                    <li
                      key={bIdx}
                      className="flex items-start gap-3 text-[#B2B4BC] text-[14.5px] sm:text-[15.5px] leading-[1.65]"
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-[#FF5108] shrink-0 mt-2"
                        aria-hidden="true"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Callout / Confirmation Box */}
      {section.callout && (
        <div className="mt-8 p-5 sm:p-6 rounded-lg bg-[#111218] border border-white/[0.10] max-w-[760px]">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#FF5108]" aria-hidden="true" />
            <h4 className="text-[12px] font-mono uppercase tracking-[0.16em] font-[700] text-[#F4F2ED]">
              {section.callout.title || "Confirmation Note"}
            </h4>
          </div>
          <p className="text-[13.5px] sm:text-[14.5px] leading-[1.65] text-[#8E9098] font-[400]">
            {section.callout.text}
          </p>
        </div>
      )}
    </article>
  );
}
