import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import Work from "@/components/Work";
import Process from "@/components/Process";
import Statement from "@/components/Statement";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import { getAllProjects } from "@/lib/api";

export default async function Home() {
  const projects = await getAllProjects();

  return (
    <main className="flex flex-col">
      <Hero />
      <Stats />
      <Services />
      <Work projects={projects} />
      <Process />
      <Statement />
      <Testimonials />
      <Contact />
    </main>
  );
}
