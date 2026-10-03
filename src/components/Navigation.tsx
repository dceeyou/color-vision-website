"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      gsap.to(menuRef.current, { y: 0, opacity: 1, duration: 0.6, ease: "power3.inOut" });
      gsap.fromTo(menuItemsRef.current, 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, delay: 0.3, ease: "power2.out" }
      );
      document.body.style.overflow = "hidden";
    } else {
      gsap.to(menuRef.current, { y: "-100%", opacity: 0, duration: 0.6, ease: "power3.inOut" });
      document.body.style.overflow = "";
    }
  }, [menuOpen]);

  const links = [
    { label: "Work", href: "#work" },
    { label: "Services", href: "#services" },
    { label: "Process", href: "#process" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" }
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[#050608]/80 backdrop-blur-md border-b border-white/10 py-4' : 'bg-transparent py-6'} px-6 md:px-12 flex justify-between items-center`}>
        <Link href="/" className="flex items-center gap-3 group z-50">
          <div className="relative w-32 h-10 group-hover:scale-105 transition-transform">
            <Image src="/logo.png" alt="Color Vision" fill className="object-contain object-left" />
          </div>
        </Link>
        
        <nav className="hidden md:flex gap-8 text-xs font-bold uppercase tracking-widest text-muted">
          {links.map((link) => (
            <Link key={link.label} href={link.href} className="relative group hover:text-foreground transition-colors py-2">
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <button 
          className="md:hidden z-50 text-foreground"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </header>

      {/* Mobile Menu */}
      <div 
        ref={menuRef}
        className="fixed inset-0 bg-[#050608] z-40 flex flex-col justify-center items-center -translate-y-full opacity-0"
      >
        <div className="absolute inset-0 bg-accent/5 blur-[100px] rounded-full scale-150 pointer-events-none" />
        <nav className="flex flex-col gap-8 text-center">
          {links.map((link, i) => (
            <Link 
              key={link.label} 
              href={link.href} 
              ref={el => { menuItemsRef.current[i] = el; }}
              onClick={() => setMenuOpen(false)}
              className="text-4xl font-bold uppercase hover:text-accent transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
