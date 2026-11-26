import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Services from "@/components/Services";
import Work from "@/components/Work";
import Process from "@/components/Process";
import Statement from "@/components/Statement";
import Testimonials from "@/components/Testimonials";
import FAQSection from "@/components/home/FAQSection";
import ContinuousBackground from "@/components/ContinuousBackground";
import { getHero, getAbout, getServices, getProjects, getProcessSteps, getTestimonials } from "@/lib/wordpress/api";

export default async function Home() {
  const [hero, about, services, projects, processSteps, testimonials] = await Promise.all([
    getHero(),
    getAbout(),
    getServices(),
    getProjects(),
    getProcessSteps(),
    getTestimonials()
  ]);

  return (
    <main className="flex flex-col relative w-full overflow-hidden">
      <ContinuousBackground />
      <Hero hero={hero} />
      <Marquee />
      <Services services={services} />
      <Work projects={projects} />
      <Process steps={processSteps} />
      <Statement about={about} />
      <Testimonials testimonials={testimonials} />
      <FAQSection />
    </main>
  );
}
