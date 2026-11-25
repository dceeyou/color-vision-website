"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const pathname = usePathname();
  const isHomePage = pathname === "/" || pathname === "";

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const menuRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  const links = [
    { label: "Work", href: "/#work", id: "work" },
    { label: "Services", href: "/#services", id: "services" },
    { label: "About", href: "/about", id: "about" },
    { label: "Process", href: "/#process", id: "process" },
    { label: "Contact", href: "/#contact", id: "contact" },
  ];

  // Helper for smooth anchor scrolling with header offset
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === "/about") {
      if (pathname === "/about") {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
      if (menuOpen) {
        setMenuOpen(false);
      }
      return;
    }

    const targetId = href.replace(/^\/?#/, "");
    if (pathname === "/" || pathname === "") {
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
        setActiveSection(targetId);
      }
    }

    if (menuOpen) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Track active section for navigation highlighting
      const sections = ["work", "services", "about", "process", "contact"];
      const scrollPosition = window.scrollY + 250;

      for (const sectionId of sections) {
        let el = document.getElementById(sectionId);
        if (!el) {
          if (sectionId === "about") {
            const all = document.querySelectorAll("main > section");
            if (all.length >= 6) el = all[5] as HTMLElement;
          } else if (sectionId === "process") {
            const all = document.querySelectorAll("main > section");
            if (all.length >= 5) el = all[4] as HTMLElement;
          }
        }

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

  // Keyboard accessibility: ESC key closes mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (menuOpen) {
      if (isReduced) {
        gsap.set(menuRef.current, { y: 0, opacity: 1 });
      } else {
        gsap.to(menuRef.current, { y: 0, opacity: 1, duration: 0.45, ease: "power3.inOut" });
        gsap.fromTo(
          menuItemsRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.35, stagger: 0.06, delay: 0.15, ease: "power2.out" }
        );
      }
      document.body.style.overflow = "hidden";
    } else {
      if (isReduced) {
        gsap.set(menuRef.current, { y: "-100%", opacity: 0 });
      } else {
        gsap.to(menuRef.current, { y: "-100%", opacity: 0, duration: 0.35, ease: "power3.inOut" });
      }
      document.body.style.overflow = "";
    }
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
          scrolled
            ? "bg-[#08090D]/90 backdrop-blur-md border-white/[0.08] py-4 shadow-xl shadow-black/50"
            : "bg-[#08090D]/40 backdrop-blur-sm border-white/[0.04] py-6 md:py-7"
        }`}
      >
        <div className="w-full max-w-[1280px] mx-auto px-4 md:px-6 lg:px-0 flex justify-between items-center">
          {/* Logo aligned with grid */}
          <Link
            href="/"
            className="flex items-center group z-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF5108] rounded"
          >
            <div className="transition-opacity duration-200 group-hover:opacity-85">
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

          {/* Desktop Right Navigation */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-7 lg:gap-8 text-[12px] md:text-[13px] uppercase tracking-[0.14em]"
          >
            {links.map((link) => {
              const isActive =
                pathname === "/about"
                  ? link.id === "about"
                  : activeSection === link.id;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`relative py-1 font-[600] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF5108] rounded group ${
                    isActive ? "text-[#FF5108]" : "text-[#92939B] hover:text-[#F4F2ED]"
                  }`}
                >
                  <span>{link.label}</span>
                  {/* Subtle active/hover indicator */}
                  <span
                    className={`absolute -bottom-1 left-0 h-[1.5px] bg-[#FF5108] transition-all duration-300 ease-out ${
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
            className="md:hidden z-50 p-2 text-[#F4F2ED] hover:text-[#FF5108] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF5108] rounded"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Full-Screen Navigation Drawer */}
      <div
        ref={menuRef}
        className="fixed inset-0 bg-[#08090D] z-40 flex flex-col justify-center items-center -translate-y-full opacity-0 pointer-events-none data-[open=true]:pointer-events-auto"
        data-open={menuOpen}
        aria-hidden={!menuOpen}
      >
        <div className="absolute inset-0 bg-[#FF5108]/[0.04] blur-[120px] rounded-full scale-125 pointer-events-none" />
        <nav className="flex flex-col gap-6 text-center relative z-10">
          {links.map((link, i) => {
            const isActive =
              pathname === "/about"
                ? link.id === "about"
                : activeSection === link.id;
            return (
              <Link
                key={link.label}
                href={link.href}
                ref={(el) => {
                  menuItemsRef.current[i] = el;
                }}
                onClick={(e) => scrollToSection(e, link.href)}
                className={`text-2xl sm:text-3xl font-[700] uppercase tracking-tight transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF5108] px-4 py-2 ${
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
