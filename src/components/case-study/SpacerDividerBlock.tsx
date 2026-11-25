import { SpacerDividerBlockData } from "@/lib/types/caseStudy";

export default function SpacerDividerBlock({ data }: { data: SpacerDividerBlockData }) {
  const heightClasses =
    data.spacing === "large"
      ? "py-16 sm:py-24"
      : data.spacing === "small"
      ? "py-6 sm:py-8"
      : "py-10 sm:py-14";

  return (
    <div className={`w-full max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 ${heightClasses}`}>
      {data.showDivider && (
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />
      )}
    </div>
  );
}
