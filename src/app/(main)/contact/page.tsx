import type { Metadata } from "next";
import { contactData } from "@/lib/contact/contactData";
import ContactHero from "@/components/contact/ContactHero";
import ContactForm from "@/components/contact/ContactForm";
import ContactInformation from "@/components/contact/ContactInformation";
import WhatHappensNext from "@/components/contact/WhatHappensNext";

export const metadata: Metadata = {
  title: "Contact Color Vision | Start a Project",
  description:
    "Have a project in mind? Contact Color Vision to discuss brand identity, UI/UX design, digital product design and creative design services.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Color Vision | Start a Project",
    description:
      "Have a project in mind? Contact Color Vision to discuss brand identity, UI/UX design, digital product design and creative design services.",
    url: "https://colorvision.lk/contact",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <main className="relative min-h-screen bg-[#08090D] text-[#F4F2ED] selection:bg-[#FF5108]/20 selection:text-[#FF5108]">
      {/* 1. Contact Hero */}
      <ContactHero data={contactData.hero} />

      {/* 2. Main Two-Column Contact Section */}
      <section
        id="inquiry"
        aria-label="Project Inquiry Form & Studio Information"
        className="relative w-full py-16 sm:py-20 md:py-24 pb-28 sm:pb-36 overflow-hidden"
      >
        {/* Subtle background ambient warmth */}
        <div
          className="pointer-events-none absolute right-0 top-1/3 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(255,81,8,0.035)_0%,transparent_70%)] blur-3xl"
          aria-hidden="true"
        />

        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Inquiry Form (Desktop 7 Cols) */}
            <div className="lg:col-span-7">
              <ContactForm data={contactData.form} />
            </div>

            {/* Right Column: Direct Info & Workflow (Desktop 5 Cols) */}
            <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
              <ContactInformation data={contactData.info} />
              <WhatHappensNext data={contactData.whatHappensNext} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
