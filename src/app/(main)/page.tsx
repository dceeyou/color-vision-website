import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import Work from "@/components/Work";
import Process from "@/components/Process";
import Statement from "@/components/Statement";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import { getHero, getStats, getServices, getProjects, getProcessSteps, getTestimonials } from "@/lib/wordpress/api";

export default async function Home() {
  const [hero, stats, services, projects, processSteps, testimonials] = await Promise.all([
    getHero(),
    getStats(),
    getServices(),
    getProjects(),
    getProcessSteps(),
    getTestimonials()
  ]);

  return (
    <main className="flex flex-col">
      <Hero hero={hero} />
      <Stats stats={stats} />
      <Services services={services} />
      <Work projects={projects} />
      <Process steps={processSteps} />
      <Statement />
      <Testimonials testimonials={testimonials} />
      <Contact />
    </main>
  );
}
