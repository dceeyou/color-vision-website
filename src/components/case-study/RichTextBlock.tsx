import { RichTextBlockData } from "@/lib/types/caseStudy";

export default function RichTextBlock({ data }: { data: RichTextBlockData }) {
  const isCenter = data.alignment === "center";

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 py-16 sm:py-20 md:py-24">
      <div className={`max-w-[840px] ${isCenter ? "mx-auto text-center" : ""}`}>
        {/* Eyebrow */}
        {data.eyebrow && (
          <div className={`flex items-center gap-2 mb-4 ${isCenter ? "justify-center" : ""}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5108]" />
            <span className="text-[11px] font-mono uppercase tracking-[0.24em] text-[#FF5108] font-[700]">
              {data.eyebrow}
            </span>
          </div>
        )}

        {/* Main Heading */}
        {data.heading && (
          <h2 className="text-[32px] sm:text-[42px] md:text-[50px] font-[800] leading-[1.08] tracking-[-0.03em] text-[#F4F2ED] mb-6 text-balance">
            {data.heading}
          </h2>
        )}

        {/* Subheading */}
        {data.subheading && (
          <p className="text-[17px] sm:text-[19px] leading-[1.6] text-[#A6A8AE] font-[500] mb-8">
            {data.subheading}
          </p>
        )}

        {/* Paragraphs */}
        <div className="space-y-6 text-[15px] sm:text-[16.5px] leading-[1.75] text-[#8E9098]">
          {data.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {/* Optional Bullet Points */}
        {data.bullets && data.bullets.length > 0 && (
          <ul className="mt-8 space-y-3 pl-4 border-l-2 border-[#FF5108]/40">
            {data.bullets.map((bullet, idx) => (
              <li key={idx} className="text-[14.5px] sm:text-[15.5px] text-[#A6A8AE] leading-relaxed">
                {bullet}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
