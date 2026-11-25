import type { Metadata } from "next";
import { privacyPolicyData } from "@/lib/legal/privacyPolicyData";
import LegalPageHeader from "@/components/legal/LegalPageHeader";
import LegalTableOfContents from "@/components/legal/LegalTableOfContents";
import LegalContentSection from "@/components/legal/LegalContentSection";
import { LegalContactCard } from "@/components/legal/LegalContactCard";

export const metadata: Metadata = {
  title: "Privacy Policy | Color Vision — Digital Design Studio",
  description:
    "Learn how Color Vision collects, uses, and safeguards your personal data when you interact with our website and studio services.",
  alternates: {
    canonical: "/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | Color Vision",
    description:
      "Learn how Color Vision collects, uses, and safeguards your personal data when you interact with our website and studio services.",
    url: "https://colorvision.lk/privacy-policy",
    type: "website",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="relative min-h-screen bg-[#08090D] text-[#F4F2ED] selection:bg-[#FF5108]/20 selection:text-[#FF5108]">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[radial-gradient(circle_at_50%_0%,rgba(255,81,8,0.06),transparent_70%)]" />

      {/* Page Header */}
      <LegalPageHeader
        eyebrow={privacyPolicyData.eyebrow}
        title={privacyPolicyData.title}
        introduction={privacyPolicyData.introduction}
        lastUpdated={privacyPolicyData.lastUpdated}
        readingTime={privacyPolicyData.readingTime}
        relatedLink={privacyPolicyData.relatedLink}
      />

      {/* Main Grid Area */}
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          {/* Table of Contents Column */}
          <aside className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
            <LegalTableOfContents sections={privacyPolicyData.sections} />
          </aside>

          {/* Section Prose Area */}
          <main className="lg:col-span-8">
            <div className="space-y-4">
              {privacyPolicyData.sections.map((section) => (
                <div key={section.id}>
                  <LegalContentSection section={section} />
                  {section.id === "contact" && (
                    <LegalContactCard
                      email="info@colorvision.lk"
                      whatsapp="+94 76 142 8445"
                      location="Colombo, Sri Lanka"
                      note="Direct legal correspondence regarding privacy, data rights, or record corrections."
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
