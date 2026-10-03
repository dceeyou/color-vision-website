import Image from "next/image";
import Link from "next/link";
import { getAllProjects } from "@/lib/api";

export default async function Home() {
  // Fetch projects directly on the server via Headless WP
  const projects = await getAllProjects();

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Header */}
      <header className="flex justify-between items-center py-6 px-10 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center font-bold text-xl text-black">CV</div>
        </div>
        <nav className="hidden md:flex gap-8 text-sm uppercase tracking-widest text-muted">
          <Link href="#" className="hover:text-white transition">Home</Link>
          <Link href="#work" className="hover:text-white transition">Projects</Link>
          <Link href="#services" className="hover:text-white transition">Services</Link>
          <Link href="#about" className="hover:text-white transition">About</Link>
          <Link href="#contact" className="hover:text-white transition">Contact</Link>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section className="px-10 py-24 flex flex-col lg:flex-row items-center justify-between gap-16 min-h-[80vh]">
          <div className="lg:w-1/2 space-y-6 reveal-text">
            <p className="uppercase tracking-[0.3em] text-xs text-muted">Creative Studio</p>
            <h1 className="text-6xl md:text-8xl font-bold leading-tight">
              Design<br />
              <span className="text-accent">That Matters.</span>
            </h1>
            <p className="text-muted max-w-md text-lg">
              We are a creative agency dedicated to crafting compelling digital experiences that resonate and endure.
            </p>
            <div className="pt-4 flex gap-6 items-center">
              <Link href="#contact" className="bg-accent text-black px-8 py-4 font-bold uppercase tracking-wider rounded-full hover:bg-white transition">
                Let's Talk
              </Link>
              <Link href="#work" className="text-white uppercase tracking-wider text-sm hover:text-accent transition flex items-center gap-2">
                View Our Work <span className="text-accent">→</span>
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2 flex justify-center lg:justify-end reveal-text" style={{animationDelay: '0.2s'}}>
            {/* Placeholder for the intricate circular graphic */}
            <div className="w-[400px] h-[400px] rounded-full border border-accent/30 relative flex items-center justify-center bg-gradient-to-tr from-accent/10 to-transparent">
              <div className="w-[300px] h-[300px] rounded-full border-4 border-accent relative">
                <div className="absolute inset-0 m-auto w-[150px] h-[150px] bg-accent rotate-45 flex items-center justify-center">
                  <div className="w-[100px] h-[100px] bg-[#050505] -rotate-45" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="px-10 py-16 border-y border-white/10 flex flex-wrap justify-between gap-8 text-center md:text-left">
          <div>
            <h3 className="text-5xl font-bold mb-2">20+</h3>
            <p className="text-muted uppercase tracking-wider text-xs">Years of Excellence</p>
          </div>
          <div>
            <h3 className="text-5xl font-bold mb-2">10+</h3>
            <p className="text-muted uppercase tracking-wider text-xs">Awards Winning</p>
          </div>
          <div>
            <h3 className="text-5xl font-bold mb-2">5+</h3>
            <p className="text-muted uppercase tracking-wider text-xs">Countries Served</p>
          </div>
          <div>
            <h3 className="text-5xl font-bold mb-2">100%</h3>
            <p className="text-muted uppercase tracking-wider text-xs">Client Satisfaction</p>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="px-10 py-32 flex flex-col lg:flex-row gap-20">
          <div className="lg:w-1/3 space-y-4">
            <h2 className="text-5xl md:text-6xl font-bold leading-tight">
              Design for<br />
              <span className="text-accent">real-world<br />impact.</span>
            </h2>
          </div>
          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
            <div className="flex gap-6 border-t border-accent pt-6">
              <span className="text-accent font-bold text-xl">01</span>
              <div>
                <h4 className="text-2xl font-bold mb-4">Brand Identity</h4>
                <p className="text-muted">Crafting memorable identities that resonate and endure in a crowded marketplace.</p>
              </div>
            </div>
            <div className="flex gap-6 border-t border-white/20 pt-6 opacity-50 hover:opacity-100 transition">
              <span className="text-accent font-bold text-xl">02</span>
              <div>
                <h4 className="text-2xl font-bold mb-4">UI/UX Design</h4>
                <p className="text-muted">Designing intuitive, engaging interfaces that elevate the user experience.</p>
              </div>
            </div>
            <div className="flex gap-6 border-t border-white/20 pt-6 opacity-50 hover:opacity-100 transition">
              <span className="text-accent font-bold text-xl">03</span>
              <div>
                <h4 className="text-2xl font-bold mb-4">Web Design</h4>
                <p className="text-muted">Building scalable, performant, and beautiful websites.</p>
              </div>
            </div>
            <div className="flex gap-6 border-t border-white/20 pt-6 opacity-50 hover:opacity-100 transition">
              <span className="text-accent font-bold text-xl">04</span>
              <div>
                <h4 className="text-2xl font-bold mb-4">Product Strategy</h4>
                <p className="text-muted">Aligning business goals with user needs for lasting success.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Work Grid */}
        <section id="work" className="px-10 py-32 bg-[#0a0a0a]">
          <div className="flex justify-between items-end mb-16">
            <h2 className="text-5xl md:text-6xl font-bold">Work with a <span className="text-accent">purpose.</span></h2>
            <Link href="#" className="hidden md:flex text-accent uppercase tracking-wider text-sm hover:text-white transition items-center gap-2">
              View All Projects →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project: any, index: number) => (
              <div key={project.node.id} className={`group cursor-pointer ${index === 1 ? 'mt-12' : index === 2 ? 'mt-24' : ''}`}>
                <div className="aspect-[4/5] bg-[#111] overflow-hidden rounded-lg mb-6 relative">
                  <div className={`absolute inset-0 bg-gradient-to-${index % 2 === 0 ? 'br' : 'bl'} from-accent/20 to-black group-hover:scale-105 transition duration-700`} />
                  {/* Dynamic image rendering would go here once WP is connected */}
                </div>
                <h3 className="text-2xl font-bold mb-2">{project.node.title}</h3>
                <p className="text-muted uppercase text-xs tracking-wider">{project.node.projectFields?.category || 'Project'}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Process/Clarity */}
        <section className="px-10 py-32 overflow-hidden">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-6xl font-bold">Clarity <span className="text-accent">before creativity.</span></h2>
            <p className="text-muted max-w-2xl mx-auto mt-6">A meticulous approach to uncovering the truth of your brand before we start designing.</p>
          </div>

          <div className="max-w-5xl mx-auto space-y-32">
            {/* Step 1 */}
            <div className="flex flex-col md:flex-row items-center gap-16">
              <div className="md:w-1/2">
                <div className="aspect-square bg-[#0a0a0a] rounded-xl border border-white/5 relative overflow-hidden flex items-center justify-center">
                   <div className="w-32 h-32 bg-accent/20 border border-accent rotate-12 flex items-center justify-center"><span className="text-accent text-2xl font-bold">01</span></div>
                </div>
              </div>
              <div className="md:w-1/2 space-y-4">
                <span className="text-accent font-bold uppercase tracking-widest text-sm">Step 01</span>
                <h3 className="text-3xl font-bold">Understand and align.</h3>
                <p className="text-muted">We immerse ourselves in your world to understand the core challenges and opportunities.</p>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-16">
              <div className="md:w-1/2">
                <div className="aspect-square bg-[#0a0a0a] rounded-xl border border-white/5 relative overflow-hidden flex items-center justify-center">
                   <div className="w-32 h-32 bg-accent/20 border border-accent -rotate-12 flex items-center justify-center"><span className="text-accent text-2xl font-bold">02</span></div>
                </div>
              </div>
              <div className="md:w-1/2 space-y-4">
                <span className="text-accent font-bold uppercase tracking-widest text-sm">Step 02</span>
                <h3 className="text-3xl font-bold">Define the framework.</h3>
                <p className="text-muted">Defining the conceptual foundation and architectural framework for the design.</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col md:flex-row items-center gap-16">
              <div className="md:w-1/2">
                <div className="aspect-square bg-[#0a0a0a] rounded-xl border border-white/5 relative overflow-hidden flex items-center justify-center">
                   <div className="w-32 h-32 bg-accent/20 border border-accent rotate-45 flex items-center justify-center"><span className="text-accent text-2xl font-bold">03</span></div>
                </div>
              </div>
              <div className="md:w-1/2 space-y-4">
                <span className="text-accent font-bold uppercase tracking-widest text-sm">Step 03</span>
                <h3 className="text-3xl font-bold">Make it memorable.</h3>
                <p className="text-muted">Iterative design execution, balancing aesthetic beauty with functional precision.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact/CTA */}
        <section id="contact" className="px-10 py-32 bg-[#0a0a0a] flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/2 space-y-8">
            <div>
              <p className="uppercase tracking-widest text-muted text-sm mb-4">Have a project in mind?</p>
              <h2 className="text-6xl font-bold leading-tight">
                Let's make it<br />
                <span className="text-accent">remarkable.</span>
              </h2>
            </div>
            <p className="text-muted max-w-md">
              We're currently accepting new projects. Fill out the form or send us an email directly at <a href="mailto:hello@colorvision.studio" className="text-white hover:text-accent underline">hello@colorvision.studio</a>.
            </p>
          </div>
          
          <div className="lg:w-1/2">
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-muted mb-2">Name</label>
                  <input type="text" className="w-full bg-[#111] border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-accent transition" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-muted mb-2">Email</label>
                  <input type="email" className="w-full bg-[#111] border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-accent transition" placeholder="john@example.com" />
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-muted mb-2">Project Details</label>
                <textarea rows={4} className="w-full bg-[#111] border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-accent transition" placeholder="Tell us about your project..."></textarea>
              </div>
              <button type="submit" className="bg-accent text-black font-bold uppercase tracking-wider px-8 py-4 rounded-full hover:bg-white transition">
                Submit Inquiry
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="px-10 py-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center font-bold text-black text-xs">CV</div>
          <span className="font-bold tracking-widest text-white">COLOR VISION</span>
        </div>
        <div className="flex gap-8">
          <Link href="#" className="hover:text-white transition">Instagram</Link>
          <Link href="#" className="hover:text-white transition">Twitter</Link>
          <Link href="#" className="hover:text-white transition">LinkedIn</Link>
        </div>
        <p>&copy; {new Date().getFullYear()} Color Vision. All rights reserved.</p>
      </footer>
    </div>
  );
}
