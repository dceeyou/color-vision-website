import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Services from "@/components/Services";
import Work from "@/components/Work";
import Stats from "@/components/Stats";
import Process from "@/components/Process";
import Statement from "@/components/Statement";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import { getHero, getAbout, getStats, getServices, getProjects, getProcessSteps, getTestimonials, getContact } from "@/lib/wordpress/api";

export default async function Home() {
  const [hero, about, stats, services, projects, processSteps, testimonials, contact] = await Promise.all([
    getHero(),
    getAbout(),
    getStats(),
    getServices(),
    getProjects(),
    getProcessSteps(),
    getTestimonials(),
    getContact()
  ]);

  return (
    <main className="flex flex-col">
      <Hero hero={hero} />
      <Marquee />
      <Services services={services} />
      <Work projects={projects} />
      <Stats stats={stats} />
      <Process steps={processSteps} />
      <Statement about={about} />
      <Testimonials testimonials={testimonials} />
      <Contact contact={contact} />
    </main>
  );
}
