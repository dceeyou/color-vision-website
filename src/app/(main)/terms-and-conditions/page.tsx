import type { Metadata } from "next";
import { termsAndConditionsData } from "@/lib/legal/termsAndConditionsData";
import LegalPageHeader from "@/components/legal/LegalPageHeader";
import LegalTableOfContents from "@/components/legal/LegalTableOfContents";
import LegalContentSection from "@/components/legal/LegalContentSection";
import { LegalContactCard } from "@/components/legal/LegalContactCard";

export const metadata: Metadata = {
  title: "Terms & Conditions | Color Vision — Digital Design Studio",
  description:
    "Review the terms, conditions, intellectual property rights, and commercial policies governing the use of Color Vision's website and creative services.",
  alternates: {
    canonical: "/terms-and-conditions",
  },
  openGraph: {
    title: "Terms & Conditions | Color Vision",
    description:
      "Review the terms, conditions, intellectual property rights, and commercial policies governing the use of Color Vision's website and creative services.",
    url: "https://colorvision.lk/terms-and-conditions",
    type: "website",
  },
};

export default function TermsAndConditionsPage() {
  return (
    <div className="relative min-h-screen bg-[#08090D] text-[#F4F2ED] selection:bg-[#FF5108]/20 selection:text-[#FF5108]">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[radial-gradient(circle_at_50%_0%,rgba(255,81,8,0.06),transparent_70%)]" />

      {/* Page Header */}
      <LegalPageHeader
        eyebrow={termsAndConditionsData.eyebrow}
        title={termsAndConditionsData.title}
        introduction={termsAndConditionsData.introduction}
        lastUpdated={termsAndConditionsData.lastUpdated}
        readingTime={termsAndConditionsData.readingTime}
        relatedLink={termsAndConditionsData.relatedLink}
      />

      {/* Main Grid Area */}
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          {/* Table of Contents Column */}
          <aside className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
            <LegalTableOfContents sections={termsAndConditionsData.sections} />
          </aside>

          {/* Section Prose Area */}
          <main className="lg:col-span-8">
            <div className="space-y-4">
              {termsAndConditionsData.sections.map((section) => (
                <div key={section.id}>
                  <LegalContentSection section={section} />
                  {section.id === "contact" && (
                    <LegalContactCard
                      email="info@colorvision.lk"
                      whatsapp="+94 76 142 8445"
                      location="Colombo, Sri Lanka"
                      note="Direct inquiries regarding commercial engagement terms, master service agreements, or copyright licensing."
                    />
                  )}
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
