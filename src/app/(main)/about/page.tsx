import type { Metadata } from "next";
import { aboutData } from "@/lib/about/aboutData";
import AboutHero from "@/components/about/AboutHero";
import StudioStory from "@/components/about/StudioStory";
import StudioPhilosophy from "@/components/about/StudioPhilosophy";
import FounderProfile from "@/components/about/FounderProfile";
import FounderQuote from "@/components/about/FounderQuote";
import ExpertiseGrid from "@/components/about/ExpertiseGrid";
import Process from "@/components/Process";
import AboutCTA from "@/components/about/AboutCTA";

export const metadata: Metadata = {
  title: "About Us — Studio Story & Founder | Color Vision",
  description:
    "Learn about Color Vision, an independent creative design studio founded by Dilshan Udawatta. Explore our design philosophy, story, services, and intentional approach.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Us — Studio Story & Founder | Color Vision",
    description:
      "Learn about Color Vision, an independent creative design studio founded by Dilshan Udawatta. Explore our design philosophy, story, services, and intentional approach.",
    url: "https://colorvision.lk/about",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-[#08090D] text-[#F4F2ED] selection:bg-[#FF5108]/20 selection:text-[#FF5108]">
      {/* 1. Hero */}
      <AboutHero data={aboutData.hero} />

      {/* 2. Our Story */}
      <StudioStory data={aboutData.story} />

      {/* 3. Our Philosophy */}
      <StudioPhilosophy data={aboutData.philosophy} />

      {/* 4. Founder Profile — Main Feature */}
      <FounderProfile data={aboutData.founder} />

      {/* 5. Founder's Design Philosophy Quote */}
      <FounderQuote data={aboutData.founderQuote} />

      {/* 6. What We Do / Expertise */}
      <ExpertiseGrid data={aboutData.expertise} />

      {/* 7. How We Work / Process (Reusing existing interactive component) */}
      <Process />

      {/* 8. Closing Call to Action */}
      <AboutCTA data={aboutData.cta} />
    </main>
  );
}
