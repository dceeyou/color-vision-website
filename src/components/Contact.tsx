"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Contact() {
  const btnRef = useRef<HTMLButtonElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);

  const handleBtnMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!btnRef.current || !arrowRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    gsap.to(btnRef.current, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.6,
      ease: "power2.out"
    });
    
    gsap.to(arrowRef.current, {
      x: 5,
      duration: 0.3
    });
  };

  const handleBtnMouseLeave = () => {
    if (!btnRef.current || !arrowRef.current) return;
    gsap.to(btnRef.current, {
      x: 0,
      y: 0,
      duration: 1,
      ease: "elastic.out(1, 0.3)"
    });
    gsap.to(arrowRef.current, {
      x: 0,
      duration: 0.3
    });
  };

  return (
    <section id="contact" className="px-6 md:px-12 py-32 flex flex-col lg:flex-row gap-16 relative">
      <div className="absolute inset-0 bg-[#000] z-[-1]" />
      
      <div className="lg:w-1/2 space-y-6">
        <p className="uppercase tracking-widest text-muted text-sm mb-4">Have a project in mind?</p>
        <h2 className="text-5xl md:text-7xl font-bold leading-tight">
          Let's make it<br />
          <span className="text-accent">remarkable.</span>
        </h2>
        <p className="text-muted max-w-md pt-4">
          We&apos;re currently accepting new projects. Fill out the form or send us an email directly at <a href="mailto:info@colorvision.lk" className="text-foreground hover:text-accent underline transition-colors">info@colorvision.lk</a>.
        </p>
      </div>
      
      <div className="lg:w-1/2">
        <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group relative">
              <input type="text" id="name" className="w-full bg-transparent border-b border-white/20 py-4 text-foreground focus:outline-none focus:border-accent transition-colors peer placeholder-transparent" placeholder="Name" />
              <label htmlFor="name" className="absolute left-0 top-4 text-muted text-sm transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:text-accent peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:text-xs uppercase tracking-wider">Name</label>
            </div>
            <div className="group relative">
              <input type="email" id="email" className="w-full bg-transparent border-b border-white/20 py-4 text-foreground focus:outline-none focus:border-accent transition-colors peer placeholder-transparent" placeholder="Email" />
              <label htmlFor="email" className="absolute left-0 top-4 text-muted text-sm transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:text-accent peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:text-xs uppercase tracking-wider">Email</label>
            </div>
          </div>
          
          <div className="group relative">
            <input type="text" id="project" className="w-full bg-transparent border-b border-white/20 py-4 text-foreground focus:outline-none focus:border-accent transition-colors peer placeholder-transparent" placeholder="Project Type" />
            <label htmlFor="project" className="absolute left-0 top-4 text-muted text-sm transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:text-accent peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:text-xs uppercase tracking-wider">Project Type</label>
          </div>

          <div className="group relative pt-4">
            <textarea id="message" rows={1} className="w-full bg-transparent border-b border-white/20 py-4 text-foreground focus:outline-none focus:border-accent transition-colors peer placeholder-transparent resize-none" placeholder="Message"></textarea>
            <label htmlFor="message" className="absolute left-0 top-8 text-muted text-sm transition-all peer-focus:top-0 peer-focus:text-xs peer-focus:text-accent peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs uppercase tracking-wider">Message</label>
          </div>
          
          <div className="pt-8">
            <button 
              ref={btnRef}
              onMouseMove={handleBtnMouseMove}
              onMouseLeave={handleBtnMouseLeave}
              type="submit" 
              className="bg-accent text-background font-bold uppercase tracking-widest text-sm px-10 py-5 rounded-full hover:bg-white transition-colors duration-300 flex items-center gap-4"
            >
              Start a conversation
              <span ref={arrowRef} className="block">→</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
