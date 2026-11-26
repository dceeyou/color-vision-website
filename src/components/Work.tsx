"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Lock } from "lucide-react";
import { Project } from "@/lib/wordpress/types";

interface ExtendedProject extends Project {
  number: string;
  filterCategories: string[];
}

export default function Work({ projects: propProjects }: { projects?: Project[] }) {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const ctaBannerRef = useRef<HTMLDivElement>(null);

  const [activeFilter, setActiveFilter] = useState<string>("ALL");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Exact 6 projects defined per Color Vision creative specifications
  const defaultProjects: ExtendedProject[] = [
    {
      id: "elegant-ai",
      number: "01",
      title: "Elegant AI",
      slug: "elegant-ai",
      category: ["UI/UX", "Digital", "UI/UX / Digital Product"],
      filterCategories: ["ALL", "UI/UX", "DIGITAL"],
      shortDescription:
        "A clearer digital experience for AI-powered technology, making complex capabilities easier to understand and use.",
      fullDescription:
        "A clearer digital experience for AI-powered technology, making complex capabilities easier to understand and use.",
      clientName: "Elegant AI Labs",
      year: "2025",
      featuredImage: null,
      galleryImages: [],
      projectUrl: "/work/elegant-ai",
      caseStudyUrl: "/work/elegant-ai",
      servicesUsed: ["Interface Design", "Product Strategy", "Design System"],
      featuredProject: true,
    },
    {
      id: "vehicle-service-platform",
      number: "02",
      title: "Vehicle Service Platform",
      slug: "vehicle-service-platform",
      category: ["UI/UX", "Digital", "UI/UX / Product Design"],
      filterCategories: ["ALL", "UI/UX", "DIGITAL"],
      shortDescription:
        "A connected product experience designed to simplify vehicle servicing workflows and everyday operations.",
      fullDescription:
        "A connected product experience designed to simplify vehicle servicing workflows and everyday operations.",
      clientName: "FleetMotion Mobility",
      year: "2025",
      featuredImage: null,
      galleryImages: [],
      projectUrl: "/work/vehicle-service-platform",
      caseStudyUrl: "/work/vehicle-service-platform",
      servicesUsed: ["Web Application", "Mobile Experience", "Service Design"],
      featuredProject: true,
    },
    {
      id: "cr-cricket-bar",
      number: "03",
      title: "CR Cricket Bar",
      slug: "cr-cricket-bar",
      category: ["Branding", "Graphic Design", "Brand Identity / Visual Design"],
      filterCategories: ["ALL", "BRANDING", "GRAPHIC DESIGN"],
      shortDescription:
        "A distinctive identity translating the energy of cricket culture into a bold and memorable brand.",
      fullDescription:
        "A distinctive identity translating the energy of cricket culture into a bold and memorable brand.",
      clientName: "CR Hospitality",
      year: "2024",
      featuredImage: null,
      galleryImages: [],
      projectUrl: "/work/cr-cricket-bar",
      caseStudyUrl: "/work/cr-cricket-bar",
      servicesUsed: ["Visual Identity", "Environmental Design", "Print & Signage"],
      featuredProject: false,
    },
    {
      id: "goodly",
      number: "04",
      title: "Goodly",
      slug: "goodly",
      category: ["Branding", "Graphic Design", "Brand Identity / Packaging"],
      filterCategories: ["ALL", "BRANDING", "GRAPHIC DESIGN"],
      shortDescription:
        "A fresh visual identity for a healthy snack brand, balancing an approachable personality with contemporary packaging design.",
      fullDescription:
        "A fresh visual identity for a healthy snack brand, balancing an approachable personality with contemporary packaging design.",
      clientName: "Goodly Organics",
      year: "2024",
      featuredImage: null,
      galleryImages: [],
      projectUrl: "/work/goodly",
      caseStudyUrl: "/work/goodly",
      servicesUsed: ["Brand Strategy", "Packaging System", "Visual Identity"],
      featuredProject: true,
    },
    {
      id: "my-little-kevi",
      number: "05",
      title: "My Little Kevi",
      slug: "my-little-kevi",
      status: "COMING_SOON",
      category: ["UI/UX", "Digital", "UI/UX / Mobile"],
      filterCategories: ["ALL", "UI/UX", "DIGITAL"],
      shortDescription:
        "A thoughtful mobile experience designed around pregnancy tracking and everyday personal care.",
      fullDescription:
        "A thoughtful mobile experience designed around pregnancy tracking and everyday personal care.",
      clientName: "Kevi Healthcare",
      year: "2024",
      featuredImage: null,
      galleryImages: [],
      projectUrl: "/work/my-little-kevi",
      caseStudyUrl: "/work/my-little-kevi",
      servicesUsed: ["Mobile UI/UX", "User Research", "Interaction Design"],
      featuredProject: false,
    },
    {
      id: "baps",
      number: "06",
      title: "BAPS",
      slug: "baps",
      category: ["Branding", "Digital", "Graphic Design", "Branding / Web Design"],
      filterCategories: ["ALL", "BRANDING", "DIGITAL", "GRAPHIC DESIGN"],
      shortDescription:
        "A cohesive visual identity and digital presentation designed to establish a consistent brand experience.",
      fullDescription:
        "A cohesive visual identity and digital presentation designed to establish a consistent brand experience.",
      clientName: "BAPS Group",
      year: "2024",
      featuredImage: null,
      galleryImages: [],
      projectUrl: "/work/baps",
      caseStudyUrl: "/work/baps",
      servicesUsed: ["Brand Identity", "Web Experience", "Design Guidelines"],
      featuredProject: false,
      status: "COMING_SOON",
    },
  ];

  // Merge with passed props if available and ensure mapping consistency
  const allProjects = useMemo(() => {
    if (propProjects && propProjects.length >= 6) {
      return defaultProjects.map((dp, idx) => {
        const matchingProp = propProjects[idx];
        return {
          ...dp,
          ...(matchingProp || {}),
          number: `0${idx + 1}`,
          filterCategories: dp.filterCategories,
          status:
            matchingProp?.status !== undefined ? matchingProp.status : dp.status,
        };
      });
    }
    return defaultProjects;
  }, [propProjects]);

  // Categories list per specification
  const filterOptions = [
    { label: "ALL", count: allProjects.length },
    { label: "BRANDING", count: allProjects.filter((p) => p.filterCategories.includes("BRANDING")).length },
    { label: "UI/UX", count: allProjects.filter((p) => p.filterCategories.includes("UI/UX")).length },
    { label: "DIGITAL", count: allProjects.filter((p) => p.filterCategories.includes("DIGITAL")).length },
    { label: "GRAPHIC DESIGN", count: allProjects.filter((p) => p.filterCategories.includes("GRAPHIC DESIGN")).length },
  ];

  const filteredProjects = useMemo(() => {
    if (activeFilter === "ALL") return allProjects;
    return allProjects.filter((p) => p.filterCategories.includes(activeFilter));
  }, [activeFilter, allProjects]);

  // GSAP ScrollTrigger animation
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      // Intro header reveal
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
            },
          }
        );
      }

      // Project cards stagger
      const cards = contentRef.current?.querySelectorAll(".project-card");
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 80%",
            },
          }
        );
      }

      // Closing CTA Banner reveal
      if (ctaBannerRef.current) {
        gsap.fromTo(
          ctaBannerRef.current,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ctaBannerRef.current,
              start: "top 85%",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [filteredProjects]);

  // Smooth scroll to contact for project enquiry
  const handleScrollToContact = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    e.preventDefault();
    const target = document.getElementById("contact");
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Helper render for custom vector exhibition visuals
  const renderProjectVisual = (projectId: string, title: string) => {
    switch (projectId) {
      case "elegant-ai":
        return (
          <div className="w-full h-full bg-[#0A0C10] relative overflow-hidden flex items-center justify-center p-8 group-hover:bg-[#0D1017] transition-colors duration-500">
            {/* Coordinate Axis Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:36px_36px]" />
            <div className="absolute top-4 left-4 text-[10px] font-mono tracking-widest text-[#8E9098]">
              SYS // 01.E-AI
            </div>
            <div className="absolute top-4 right-4 text-[10px] font-mono tracking-widest text-[#FF5108]">
              LATENCY: 1.2ms
            </div>

            {/* Geometric Refractive Prism & Orbital Vector */}
            <svg
              viewBox="0 0 320 240"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full max-w-[280px] md:max-w-[340px] h-auto relative z-10 transition-transform duration-700 ease-out group-hover:scale-105"
            >
              <polygon
                points="160,30 260,90 260,190 160,230 60,190 60,90"
                stroke="#3B62FF"
                strokeWidth="1.2"
                strokeDasharray="6 4"
                opacity="0.4"
              />
              <polygon
                points="160,55 235,100 235,175 160,205 85,175 85,100"
                stroke="#FF5108"
                strokeWidth="1.5"
                fill="rgba(255,81,8,0.03)"
              />
              <line x1="160" y1="55" x2="160" y2="205" stroke="#FF5108" strokeWidth="1" opacity="0.6" />
              <line x1="85" y1="100" x2="235" y2="175" stroke="#3B62FF" strokeWidth="0.8" opacity="0.5" />
              <line x1="85" y1="175" x2="235" y2="100" stroke="#3B62FF" strokeWidth="0.8" opacity="0.5" />
              <circle cx="160" cy="130" r="16" fill="#08090D" stroke="#FF5108" strokeWidth="1.5" />
              <circle cx="160" cy="130" r="4" fill="#F4F2ED" />
            </svg>
          </div>
        );

      case "vehicle-service-platform":
        return (
          <div className="w-full h-full bg-[#0A0C10] relative overflow-hidden flex items-center justify-center p-6 group-hover:bg-[#0C0F15] transition-colors duration-500">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,81,8,0.06)_0%,transparent_70%)]" />
            <div className="absolute top-4 left-4 text-[10px] font-mono tracking-widest text-[#8E9098]">
              TELEMETRY // FLEET.OS
            </div>
            <div className="absolute bottom-4 right-4 text-[10px] font-mono tracking-widest text-[#FF5108]">
              STATUS: ACTIVE
            </div>

            {/* Diagnostic Pulse Path & Telemetry Waveform */}
            <svg
              viewBox="0 0 360 180"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full max-w-[320px] md:max-w-[380px] h-auto relative z-10 transition-transform duration-700 ease-out group-hover:scale-105"
            >
              <line x1="0" y1="90" x2="360" y2="90" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
              <line x1="0" y1="45" x2="360" y2="45" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" strokeDasharray="4 4" />
              <line x1="0" y1="135" x2="360" y2="135" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" strokeDasharray="4 4" />
              <path
                d="M10 90 H70 L90 60 L110 120 L130 35 L155 135 L170 90 H225 L245 70 L260 105 L275 90 H350"
                stroke="#FF5108"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="drop-shadow-[0_0_8px_rgba(255,81,8,0.5)]"
              />
              <circle cx="130" cy="35" r="4" fill="#F4F2ED" />
              <circle cx="260" cy="105" r="3" fill="#FF5108" />
            </svg>
          </div>
        );

      case "cr-cricket-bar":
        return (
          <div className="w-full h-full bg-[#090B0E] relative overflow-hidden flex items-center justify-center p-6 group-hover:bg-[#0C0E14] transition-colors duration-500">
            <div className="absolute top-4 left-4 text-[10px] font-mono tracking-widest text-[#8E9098]">
              SPATIAL // CR.03
            </div>
            <div className="absolute top-4 right-4 text-[10px] font-mono tracking-widest text-[#FF5108]">
              COLOMBO // SL
            </div>

            {/* Pitch Crease Geometry & Architectural Markings */}
            <svg
              viewBox="0 0 280 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full max-w-[260px] h-auto relative z-10 transition-transform duration-700 ease-out group-hover:scale-105"
            >
              <rect x="25" y="20" width="230" height="160" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
              <line x1="25" y1="100" x2="255" y2="100" stroke="#FF5108" strokeWidth="1.5" />
              <line x1="140" y1="20" x2="140" y2="180" stroke="#FF5108" strokeWidth="1" strokeDasharray="4 4" />
              <circle cx="140" cy="100" r="38" stroke="#F4F2ED" strokeWidth="1" opacity="0.4" />
              <circle cx="140" cy="100" r="8" fill="#FF5108" />
              <text x="40" y="55" fill="#F4F2ED" fontSize="15" fontWeight="800" fontFamily="monospace">
                MATCHDAY
              </text>
              <text x="40" y="74" fill="#FF5108" fontSize="10" fontWeight="600" letterSpacing="2">
                CR-001 // NIGHT
              </text>
            </svg>
          </div>
        );

      case "goodly":
        return (
          <div className="w-full h-full bg-[#0A0C10] relative overflow-hidden flex items-center justify-center p-6 group-hover:bg-[#0D1016] transition-colors duration-500">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
            <div className="absolute top-4 left-4 text-[10px] font-mono tracking-widest text-[#8E9098]">
              BRAND // GOODLY.ORG
            </div>
            <div className="absolute top-4 right-4 text-[10px] font-mono tracking-widest text-[#FF5108]">
              PACKAGING // V.04
            </div>

            {/* Tactile Packaging Contours & Seal */}
            <svg
              viewBox="0 0 420 180"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full max-w-[380px] md:max-w-[460px] h-auto relative z-10 transition-transform duration-700 ease-out group-hover:scale-105"
            >
              {/* Outer Packaging Die-Line */}
              <rect x="30" y="25" width="360" height="130" rx="4" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="4 4" />
              <rect x="45" y="40" width="330" height="100" rx="2" fill="rgba(255,81,8,0.03)" stroke="rgba(255,81,8,0.3)" strokeWidth="1" />
              
              {/* Organic wave contours */}
              <path
                d="M50 110 C 120 75, 180 135, 250 90 C 310 50, 340 100, 370 85"
                stroke="#FF5108"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M50 120 C 120 85, 180 145, 250 100 C 310 60, 340 110, 370 95"
                stroke="#3B62FF"
                strokeWidth="1"
                opacity="0.4"
                fill="none"
              />

              {/* Minimal Brand Seal */}
              <circle cx="100" cy="72" r="18" stroke="#FF5108" strokeWidth="1.5" />
              <circle cx="100" cy="72" r="5" fill="#F4F2ED" />
              <text x="130" y="70" fill="#F4F2ED" fontSize="13" fontWeight="700" letterSpacing="0.08em">
                GOODLY
              </text>
              <text x="130" y="85" fill="#8E9098" fontSize="9" fontWeight="500" letterSpacing="0.14em">
                NATURAL TASTE // FORM 04
              </text>
            </svg>
          </div>
        );

      case "my-little-kevi":
        return (
          <div className="w-full h-full bg-[#0A0C0F] relative overflow-hidden flex items-center justify-center p-6 group-hover:bg-[#0C0F15] transition-colors duration-500">
            <div className="absolute top-4 left-4 text-[10px] font-mono tracking-widest text-[#8E9098]">
              CARE // MLK.APP
            </div>
            <div className="absolute top-4 right-4 text-[10px] font-mono tracking-widest text-[#FF5108]">
              MOBILE // CYCLE 40W
            </div>

            {/* Gestational rhythm curves & concentric arcs */}
            <svg
              viewBox="0 0 280 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full max-w-[260px] h-auto relative z-10 transition-transform duration-700 ease-out group-hover:scale-105"
            >
              <rect x="50" y="20" width="180" height="160" rx="20" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
              <line x1="100" y1="35" x2="180" y2="35" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeLinecap="round" />
              <circle cx="140" cy="105" r="45" stroke="#FF5108" strokeWidth="1.2" strokeDasharray="3 3" />
              <circle cx="140" cy="105" r="30" fill="rgba(255,81,8,0.06)" stroke="#FF5108" strokeWidth="1.5" />
              <circle cx="140" cy="105" r="10" fill="#08090D" stroke="#F4F2ED" strokeWidth="1" />
              <circle cx="140" cy="105" r="3" fill="#FF5108" />
            </svg>
          </div>
        );

      case "baps":
        return (
          <div className="w-full h-full bg-[#0A0C0F] relative overflow-hidden flex items-center justify-center p-6 group-hover:bg-[#0C0F15] transition-colors duration-500">
            <div className="absolute top-4 left-4 text-[10px] font-mono tracking-widest text-[#8E9098]">
              SYSTEM // BAPS.DS
            </div>
            <div className="absolute top-4 right-4 text-[10px] font-mono tracking-widest text-[#FF5108]">
              TOKENS: 148 // SYNC
            </div>

            {/* Design Token Architecture & Component Grid */}
            <svg
              viewBox="0 0 280 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full max-w-[260px] h-auto relative z-10 transition-transform duration-700 ease-out group-hover:scale-105"
            >
              <rect x="35" y="35" width="85" height="55" rx="4" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
              <rect x="160" y="35" width="85" height="55" rx="4" stroke="#FF5108" strokeWidth="1.2" fill="rgba(255,81,8,0.05)" />
              <rect x="35" y="115" width="85" height="55" rx="4" stroke="#3B62FF" strokeWidth="1" opacity="0.6" />
              <rect x="160" y="115" width="85" height="55" rx="4" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
              
              <line x1="120" y1="62" x2="160" y2="62" stroke="#FF5108" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="77" y1="90" x2="77" y2="115" stroke="#FF5108" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="120" y1="142" x2="160" y2="142" stroke="#3B62FF" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
              
              <circle cx="140" cy="62" r="3" fill="#FF5108" />
              <circle cx="77" cy="102" r="3" fill="#FF5108" />
            </svg>
          </div>
        );

      default:
        return (
          <div className="w-full h-full bg-[#0A0C10] flex items-center justify-center p-8">
            <span className="text-[#8E9098] font-mono text-xs uppercase tracking-widest">{title}</span>
          </div>
        );
    }
  };

  // Helper to determine if a project allows navigation to a dedicated case study
  const isProjectNavigable = (p: ExtendedProject): boolean => p.status !== "COMING_SOON";

  // Reusable visual thumbnail renderer supporting Coming Soon treatment
  const renderCardThumbnail = (
    p: ExtendedProject,
    containerClasses: string,
    isHovered: boolean
  ) => {
    const isComingSoon = p.status === "COMING_SOON";

    return (
      <div
        className={`${containerClasses} rounded-lg overflow-hidden border border-white/[0.08] relative group/thumb select-none`}
      >
        {/* Base visual layer with persistent 5-8px blur on hover for Coming Soon */}
        <div
          className={`w-full h-full transition-transform duration-700 ease-out ${
            isComingSoon
              ? "filter blur-[6px] brightness-[0.80] scale-105 pointer-events-none"
              : isHovered
              ? "scale-105"
              : "scale-100"
          }`}
        >
          {renderProjectVisual(p.id, p.title)}
        </div>

        {/* Centred Coming Soon Lock & Label Overlay */}
        {isComingSoon && (
          <div className="absolute inset-0 bg-[#08090D]/50 flex flex-col items-center justify-center p-4 text-center z-10">
            {/* Centred lock icon with subtle #FF5108 accent and hover transition */}
            <div className="w-12 h-12 rounded-full bg-[#08090D]/90 border border-white/15 flex items-center justify-center text-[#FF5108] mb-2.5 shadow-lg group-hover:scale-110 group-hover:border-[#FF5108]/40 transition-all duration-300">
              <Lock className="w-5 h-5 stroke-[2]" />
            </div>
            {/* Clear COMING SOON label */}
            <span className="text-[11px] sm:text-[12px] font-mono uppercase tracking-[0.2em] font-[700] text-[#F4F2ED] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5108] inline-block shadow-[0_0_6px_rgba(255,81,8,0.8)]" />
              COMING SOON
            </span>
          </div>
        )}
      </div>
    );
  };

  // Reusable action footer matching status & navigation capability
  const renderCardFooter = (p: ExtendedProject, isHovered: boolean) => {
    const isComingSoon = p.status === "COMING_SOON";

    if (isComingSoon) {
      return (
        <div className="mt-8 pt-4 border-t border-white/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#8E9098]">
            <Lock className="w-3.5 h-3.5 text-[#FF5108]" />
            <span className="text-[12px] font-[600] uppercase tracking-[0.14em]">
              Coming Soon
            </span>
          </div>
          <div className="w-9 h-9 rounded-full border border-white/10 text-[#FF5108] bg-white/[0.02] flex items-center justify-center">
            <Lock className="w-3.5 h-3.5" />
          </div>
        </div>
      );
    }

    return (
      <div className="mt-8 pt-4 border-t border-white/[0.06] flex items-center justify-between">
        <span
          className={`text-[12px] font-[700] uppercase tracking-[0.14em] transition-colors duration-300 ${
            isHovered ? "text-[#FF5108]" : "text-[#8E9098]"
          }`}
        >
          Explore Case
        </span>
        <div
          className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 ${
            isHovered
              ? "bg-[#FF5108] border-[#FF5108] text-[#08090D] shadow-md shadow-[#FF5108]/20"
              : "border-white/20 text-[#8E9098] bg-transparent"
          }`}
        >
          <span className="text-sm font-bold transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            ↗
          </span>
        </div>
      </div>
    );
  };

  // Standard Two-Column Card Component (Used for Projects 02, 03, 05, 06 or filtered cards)
  const renderTwoColumnCard = (p: ExtendedProject) => {
    const isHovered = hoveredId === p.id;
    const isComingSoon = p.status === "COMING_SOON";

    const cardContent = (
      <>
        <div>
          {/* Visual Canvas with Status Overlay */}
          {renderCardThumbnail(p, "w-full aspect-[16/10] sm:aspect-[16/9] mb-8", isHovered)}

          {/* Number & Category Eyebrow */}
          <div className="flex items-center justify-between mb-3">
            <span
              className={`font-[800] text-[28px] sm:text-[32px] leading-none transition-colors duration-300 ${
                !isComingSoon && isHovered ? "text-[#FF5108]" : "text-white/20"
              }`}
            >
              {p.number}
            </span>
            <span className="text-[#FF5108] text-[11px] font-[600] uppercase tracking-[0.2em]">
              {p.category?.[2] || p.category?.[0]}
            </span>
          </div>

          {/* Project Title (Remains 100% sharp and readable) */}
          <h3
            className={`text-[26px] sm:text-[32px] font-[800] tracking-[-0.03em] leading-tight transition-all duration-300 ${
              !isComingSoon && isHovered ? "text-[#FF5108] translate-x-2" : "text-[#F4F2ED] translate-x-0"
            }`}
          >
            {p.title}
          </h3>

          {/* Project Description (Remains 100% sharp and readable) */}
          <p className="text-[#8E9098] text-[14px] sm:text-[15px] leading-[1.7] mt-3">
            {p.shortDescription}
          </p>

          {/* Deliverables / Tags */}
          {p.servicesUsed && (
            <div className="flex flex-wrap gap-2 mt-6">
              {p.servicesUsed.map((svc) => (
                <span
                  key={svc}
                  className="text-[11px] font-mono text-[#8E9098] px-2.5 py-1 rounded bg-white/[0.04] border border-white/[0.06]"
                >
                  {svc}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Action / Arrow / Lock Status Row */}
        {renderCardFooter(p, isHovered)}
      </>
    );

    const baseClassName = `project-card group block w-full p-6 sm:p-8 bg-[#08090D]/80 backdrop-blur-md border border-white/[0.1] ${
      !isComingSoon
        ? "hover:border-[#FF5108]/50 cursor-pointer"
        : "cursor-default border-white/[0.08]"
    } rounded-xl transition-all duration-500 relative focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF5108] flex flex-col justify-between shadow-[0_16px_40px_rgba(0,0,0,0.35)]`;

    if (!isComingSoon) {
      return (
        <Link
          key={p.id}
          href={`/work/${p.slug}`}
          onMouseEnter={() => setHoveredId(p.id)}
          onMouseLeave={() => setHoveredId(null)}
          className={baseClassName}
        >
          {cardContent}
        </Link>
      );
    }

    return (
      <div
        key={p.id}
        role="article"
        aria-disabled="true"
        onMouseEnter={() => setHoveredId(p.id)}
        onMouseLeave={() => setHoveredId(null)}
        className={baseClassName}
      >
        {cardContent}
      </div>
    );
  };

  // Project 01 Featured Full-Width Card
  const renderFeaturedProject01 = (p: ExtendedProject) => {
    const isHovered = hoveredId === p.id;
    const isComingSoon = p.status === "COMING_SOON";

    const cardContent = (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Metadata & Typography */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span
                className={`font-[800] text-[48px] md:text-[64px] leading-none transition-colors duration-300 ${
                  !isComingSoon && isHovered ? "text-[#FF5108]" : "text-white/20"
                }`}
              >
                {p.number}
              </span>
              <span className="text-[#FF5108] text-[11px] font-[600] uppercase tracking-[0.2em] px-2.5 py-1 rounded bg-[#FF5108]/10 border border-[#FF5108]/20">
                FEATURED WORK
              </span>
            </div>

            <p className="text-[#FF5108] uppercase text-[12px] font-[600] tracking-[0.18em] mb-2">
              {p.category?.[2] || p.category?.[0]}
            </p>

            <h3
              className={`text-[32px] sm:text-[42px] lg:text-[48px] font-[800] tracking-[-0.03em] leading-tight transition-all duration-300 ${
                !isComingSoon && isHovered ? "text-[#FF5108] translate-x-2" : "text-[#F4F2ED] translate-x-0"
              }`}
            >
              {p.title}
            </h3>

            <p className="text-[#8E9098] text-[14px] sm:text-[15px] leading-[1.7] mt-4 max-w-[420px]">
              {p.shortDescription}
            </p>

            {p.servicesUsed && (
              <div className="flex flex-wrap gap-2 mt-6">
                {p.servicesUsed.map((svc) => (
                  <span
                    key={svc}
                    className="text-[11px] font-mono text-[#8E9098] px-2.5 py-1 rounded bg-white/[0.04] border border-white/[0.06]"
                  >
                    {svc}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Action Row */}
          {!isComingSoon ? (
            <div className="mt-8 flex items-center gap-4">
              <span
                className={`text-[12px] font-[700] uppercase tracking-[0.14em] transition-colors duration-300 ${
                  isHovered ? "text-[#FF5108]" : "text-[#F4F2ED]"
                }`}
              >
                View Project Details
              </span>
              <div
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${
                  isHovered
                    ? "bg-[#FF5108] border-[#FF5108] text-[#08090D] shadow-md shadow-[#FF5108]/20"
                    : "border-white/20 text-[#8E9098] bg-transparent"
                }`}
              >
                <span className="text-base font-bold transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </div>
            </div>
          ) : (
            <div className="mt-8 flex items-center gap-2.5 text-[#8E9098]">
              <Lock className="w-4 h-4 text-[#FF5108]" />
              <span className="text-[12px] font-[600] uppercase tracking-[0.14em]">Coming Soon</span>
            </div>
          )}
        </div>

        {/* Right Column: Large Canvas Visual */}
        <div className="lg:col-span-7">
          {renderCardThumbnail(p, "w-full aspect-[4/3] sm:aspect-[16/10]", isHovered)}
        </div>
      </div>
    );

    const baseClassName = `project-card group block w-full p-6 sm:p-8 md:p-12 bg-[#08090D]/80 backdrop-blur-md border border-white/[0.1] ${
      !isComingSoon ? "hover:border-[#FF5108]/50 cursor-pointer" : "cursor-default border-white/[0.08]"
    } rounded-xl transition-all duration-500 relative focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF5108] shadow-[0_16px_40px_rgba(0,0,0,0.35)]`;

    if (!isComingSoon) {
      return (
        <Link
          key={p.id}
          href={`/work/${p.slug}`}
          onMouseEnter={() => setHoveredId(p.id)}
          onMouseLeave={() => setHoveredId(null)}
          className={baseClassName}
        >
          {cardContent}
        </Link>
      );
    }

    return (
      <div
        key={p.id}
        role="article"
        aria-disabled="true"
        onMouseEnter={() => setHoveredId(p.id)}
        onMouseLeave={() => setHoveredId(null)}
        className={baseClassName}
      >
        {cardContent}
      </div>
    );
  };

  // Project 04 Large Horizontal Feature Card
  const renderHorizontalFeature04 = (p: ExtendedProject) => {
    const isHovered = hoveredId === p.id;
    const isComingSoon = p.status === "COMING_SOON";

    const cardContent = (
      <>
        {/* Wide Panoramic Visual Canvas */}
        {renderCardThumbnail(p, "w-full aspect-[21/9] sm:aspect-[20/8] mb-8", isHovered)}

        {/* Horizontal Editorial Meta Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pt-4 border-t border-white/[0.06]">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <span
                className={`font-[800] text-[28px] md:text-[36px] transition-colors duration-300 ${
                  !isComingSoon && isHovered ? "text-[#FF5108]" : "text-white/30"
                }`}
              >
                {p.number}
              </span>
              <span className="text-[#FF5108] text-[11px] font-[600] uppercase tracking-[0.2em]">
                {p.category?.[2] || p.category?.[0]}
              </span>
              <span className="text-[#8E9098] font-mono text-[11px]">{p.year}</span>
            </div>

            <h3
              className={`text-[28px] sm:text-[36px] md:text-[42px] font-[800] tracking-[-0.03em] leading-tight transition-all duration-300 ${
                !isComingSoon && isHovered ? "text-[#FF5108] translate-x-2" : "text-[#F4F2ED] translate-x-0"
              }`}
            >
              {p.title}
            </h3>

            {p.servicesUsed && (
              <div className="flex flex-wrap gap-2 mt-4">
                {p.servicesUsed.map((svc) => (
                  <span
                    key={svc}
                    className="text-[11px] font-mono text-[#8E9098] px-2.5 py-1 rounded bg-white/[0.04] border border-white/[0.06]"
                  >
                    {svc}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="md:max-w-[460px] flex items-center justify-between gap-6 w-full md:w-auto">
            <p className="text-[#8E9098] text-[14px] sm:text-[15px] leading-[1.65]">
              {p.shortDescription}
            </p>
            {!isComingSoon ? (
              <div
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 shrink-0 ${
                  isHovered
                    ? "bg-[#FF5108] border-[#FF5108] text-[#08090D] shadow-md shadow-[#FF5108]/20"
                    : "border-white/20 text-[#8E9098] bg-transparent"
                }`}
              >
                <span className="text-base font-bold transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </div>
            ) : (
              <div className="w-10 h-10 rounded-full border border-white/10 text-[#FF5108] bg-white/[0.02] flex items-center justify-center shrink-0">
                <Lock className="w-4 h-4" />
              </div>
            )}
          </div>
        </div>
      </>
    );

    const baseClassName = `project-card group block w-full p-6 sm:p-8 md:p-12 bg-[#08090D]/80 backdrop-blur-md border border-white/[0.1] ${
      !isComingSoon ? "hover:border-[#FF5108]/50 cursor-pointer" : "cursor-default border-white/[0.08]"
    } rounded-xl transition-all duration-500 relative focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF5108] shadow-[0_16px_40px_rgba(0,0,0,0.35)]`;

    if (!isComingSoon) {
      return (
        <Link
          key={p.id}
          href={`/work/${p.slug}`}
          onMouseEnter={() => setHoveredId(p.id)}
          onMouseLeave={() => setHoveredId(null)}
          className={baseClassName}
        >
          {cardContent}
        </Link>
      );
    }

    return (
      <div
        key={p.id}
        role="article"
        aria-disabled="true"
        onMouseEnter={() => setHoveredId(p.id)}
        onMouseLeave={() => setHoveredId(null)}
        className={baseClassName}
      >
        {cardContent}
      </div>
    );
  };

  return (
    <section
      id="work"
      ref={containerRef}
      className="relative w-full bg-transparent py-24 md:py-32 lg:py-40 border-b border-white/[0.06]"
    >
      <div className="w-full max-w-[1280px] mx-auto px-4 md:px-6 lg:px-0">
        {/* Section Introduction */}
        <div
          ref={headerRef}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 lg:gap-16 mb-12 md:mb-16"
        >
          {/* Left Column: Eyebrow + Main Heading */}
          <div className="lg:w-7/12">
            <div className="flex items-center gap-2.5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5108] inline-block shadow-[0_0_8px_rgba(255,81,8,0.6)]" />
              <p className="uppercase tracking-[0.22em] text-[12px] md:text-[13px] font-[600] text-[#8E9098]">
                SELECTED WORK
              </p>
              <span className="text-[#737680] font-mono text-[11px] tracking-widest ml-1">
                (06 PROJECTS)
              </span>
            </div>

            <h2 className="text-[44px] sm:text-[56px] md:text-[68px] lg:text-[76px] xl:text-[84px] font-[800] leading-[1.0] tracking-[-0.03em] select-none">
              <span className="text-[#F4F2ED] block">Work with a</span>
              <span className="text-[#FF5108] block">purpose.</span>
            </h2>
          </div>

          {/* Right Column: Supporting Description */}
          <div className="lg:w-5/12 flex justify-start lg:justify-end pb-2">
            <p className="text-[#8E9098] text-[15px] sm:text-[16px] md:text-[17px] leading-[1.75] font-[400] max-w-[480px]">
              Every project starts with a different challenge. Some need a stronger identity.
              Some need a simpler digital experience. Others need a completely new way to
              communicate. Here are a few examples of how thoughtful design turns challenges into
              meaningful outcomes.
            </p>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2.5 sm:gap-3 md:gap-4 overflow-x-auto pb-4 mb-16 border-b border-white/[0.06] scrollbar-none">
          {filterOptions.map((f) => {
            const isActive = activeFilter === f.label;
            return (
              <button
                key={f.label}
                type="button"
                onClick={() => setActiveFilter(f.label)}
                className={`py-2 px-3.5 sm:px-4 rounded-full text-[11px] sm:text-[12px] md:text-[13px] font-[600] uppercase tracking-[0.14em] transition-all duration-300 shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF5108] flex items-center gap-2 ${
                  isActive
                    ? "bg-[#FF5108] text-[#08090D] shadow-md shadow-[#FF5108]/20"
                    : "bg-transparent text-[#8E9098] hover:text-[#F4F2ED] hover:bg-white/[0.04]"
                }`}
                aria-pressed={isActive}
              >
                <span>{f.label}</span>
                <span
                  className={`text-[10px] opacity-75 font-mono ${
                    isActive ? "text-[#08090D]" : "text-[#8E9098]"
                  }`}
                >
                  ({f.count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Editorial Portfolio Showcase: The Curated Index */}
        <div ref={contentRef} className="space-y-12 md:space-y-16">
          {activeFilter === "ALL" ? (
            <>
              {/* Row 1: Project 01 (Large featured project spanning full content width) */}
              {renderFeaturedProject01(allProjects[0])}

              {/* Row 2: Projects 02 & 03 (Two-column composition) */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                {renderTwoColumnCard(allProjects[1])}
                {renderTwoColumnCard(allProjects[2])}
              </div>

              {/* Row 3: Project 04 (Large horizontal feature spanning content width) */}
              {renderHorizontalFeature04(allProjects[3])}

              {/* Row 4: Projects 05 & 06 (Two-column composition) */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                {renderTwoColumnCard(allProjects[4])}
                {renderTwoColumnCard(allProjects[5])}
              </div>
            </>
          ) : (
            /* Filtered State: Dynamic Editorial Grid */
            <div className="space-y-12 md:space-y-16">
              {/* If Elegant AI is in filtered list, feature it */}
              {filteredProjects.find((p) => p.id === "elegant-ai") &&
                renderFeaturedProject01(filteredProjects.find((p) => p.id === "elegant-ai")!)}

              {/* If Goodly is in filtered list, render wide horizontal feature */}
              {filteredProjects.find((p) => p.id === "goodly") &&
                renderHorizontalFeature04(filteredProjects.find((p) => p.id === "goodly")!)}

              {/* Render all two-column cards together in a balanced 2-column grid */}
              {filteredProjects.filter((p) => p.id !== "elegant-ai" && p.id !== "goodly").length > 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                  {filteredProjects
                    .filter((p) => p.id !== "elegant-ai" && p.id !== "goodly")
                    .map((p) => renderTwoColumnCard(p))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Section Closing Banner */}
        <div
          ref={ctaBannerRef}
          className="mt-20 md:mt-28 lg:mt-32 p-8 sm:p-12 md:p-16 rounded-xl border border-white/[0.1] bg-[#08090D]/85 backdrop-blur-md shadow-[0_16px_40px_rgba(0,0,0,0.4)] flex flex-col md:flex-row items-start md:items-center justify-between gap-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(circle_at_top_right,rgba(255,81,8,0.08)_0%,transparent_70%)] pointer-events-none" />

          <div>
            <p className="text-[#8E9098] uppercase text-[12px] font-[600] tracking-[0.2em] mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5108]" />
              HAVE A PROJECT IN MIND?
            </p>
            <h3 className="text-[28px] sm:text-[36px] md:text-[44px] font-[800] text-[#F4F2ED] tracking-[-0.03em] leading-tight">
              Let&apos;s build something <span className="text-[#FF5108]">meaningful together.</span>
            </h3>
          </div>

          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 px-7 py-4 rounded-full bg-[#FF5108] text-[#08090D] font-[700] text-[13px] uppercase tracking-[0.16em] transition-all duration-300 hover:bg-[#F4F2ED] hover:shadow-[0_0_24px_rgba(255,81,8,0.4)] shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5108]"
          >
            <span>START A PROJECT</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
