"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const menuRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      // Detect active section on scroll
      const sections = ["work", "services", "process", "about", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            return;
          }
        }
      }
      if (window.scrollY < 200) {
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      gsap.to(menuRef.current, { y: 0, opacity: 1, duration: 0.5, ease: "power3.inOut" });
      gsap.fromTo(
        menuItemsRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.08, delay: 0.2, ease: "power2.out" }
      );
      document.body.style.overflow = "hidden";
    } else {
      gsap.to(menuRef.current, { y: "-100%", opacity: 0, duration: 0.4, ease: "power3.inOut" });
      document.body.style.overflow = "";
    }
  }, [menuOpen]);

  const links = [
    { label: "Work", href: "#work", id: "work" },
    { label: "Services", href: "#services", id: "services" },
    { label: "Process", href: "#process", id: "process" },
    { label: "About", href: "#about", id: "about" },
    { label: "Contact", href: "#contact", id: "contact" }
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#08090D]/85 backdrop-blur-md border-b border-white/[0.08] py-4 shadow-xl shadow-black/20"
            : "bg-transparent py-6 md:py-8 border-b border-transparent"
        }`}
      >
        <div className="w-full max-w-[1280px] mx-auto px-4 md:px-6 lg:px-0 flex justify-between items-center">
          {/* Logo aligned with grid */}
          <Link href="/" className="flex items-center group z-50 focus:outline-none">
            <div className="transition-transform duration-300 group-hover:opacity-90">
              <Image
                src="/logo.png"
                alt="Color Vision"
                width={160}
                height={63}
                className="h-8 md:h-9 w-auto object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10 text-[12px] md:text-[13px] font-[600] uppercase tracking-[0.16em]">
            {links.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`relative py-1.5 transition-colors duration-200 group ${
                    isActive ? "text-[#FF5108]" : "text-[#8E9098] hover:text-[#F4F2ED]"
                  }`}
                >
                  <span>{link.label}</span>
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] bg-[#FF5108] transition-all duration-300 ease-out ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden z-50 p-2 text-[#F4F2ED] hover:text-[#FF5108] transition-colors focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </header>

      {/* Mobile Full-Screen Menu */}
      <div
        ref={menuRef}
        className="fixed inset-0 bg-[#08090D] z-40 flex flex-col justify-center items-center -translate-y-full opacity-0 pointer-events-none data-[open=true]:pointer-events-auto"
        data-open={menuOpen}
      >
        <div className="absolute inset-0 bg-[#FF5108]/5 blur-[120px] rounded-full scale-125 pointer-events-none" />
        <nav className="flex flex-col gap-7 text-center relative z-10">
          {links.map((link, i) => {
            const isActive = activeSection === link.id;
            return (
              <Link
                key={link.label}
                href={link.href}
                ref={(el) => {
                  menuItemsRef.current[i] = el;
                }}
                onClick={() => setMenuOpen(false)}
                className={`text-3xl font-[700] uppercase tracking-tight transition-colors duration-200 ${
                  isActive ? "text-[#FF5108]" : "text-[#F4F2ED] hover:text-[#FF5108]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
