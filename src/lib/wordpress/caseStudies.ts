import { CaseStudyProject } from "../types/caseStudy";

export const demoCaseStudies: Record<string, CaseStudyProject> = {
  "elegant-ai": {
    id: "elegant-ai",
    title: "Elegant AI",
    slug: "elegant-ai",
    subtitle: "A clearer digital experience for AI-powered technology, making complex autonomous agent capabilities intuitive to orchestrate.",
    shortDescription: "A clearer digital experience for AI-powered technology, making complex capabilities easier to understand and use.",
    fullDescription: "Elegant AI is an orchestration platform designed for software engineers and enterprise AI teams to build, inspect, and evaluate autonomous multi-agent pipelines. Color Vision was commissioned to architect the end-to-end design system, product interface, and visual communication from foundational discovery to production launch.",
    projectType: "UI/UX & Digital Product Design",
    industry: "Artificial Intelligence & Developer Tools",
    client: "Elegant AI Labs (San Francisco)",
    year: "2025",
    duration: "14 Weeks",
    projectStatus: "Launched & Active",
    featured: true,
    displayOrder: 1,

    categories: ["UI/UX", "Digital", "Design Systems"],
    services: [
      "User Interface Design",
      "Product Strategy",
      "Design System Architecture",
      "Interactive Prototyping",
      "Information Architecture"
    ],
    toolsAndTechnologies: ["Figma", "React", "TypeScript", "Tailwind CSS", "GSAP"],
    projectTeam: [
      { role: "Lead Product Designer", name: "Color Vision Studio" },
      { role: "Design Director", name: "D. Perera" },
      { role: "Platform Engineer", name: "K. Vance" }
    ],
    projectCredits: [
      { label: "Client Partner", value: "Elegant AI Labs" },
      { label: "Deliverables", value: "Design System, Web Application, Component Library" },
      { label: "Timeline", value: "Q4 2024 – Q1 2025" }
    ],

    thumbnailImage: {
      src: "/case-studies/elegant-ai-hero.svg",
      alt: "Elegant AI Multi-Agent Canvas Interface",
      aspectRatio: "16/9"
    },
    heroImage: {
      src: "/case-studies/elegant-ai-hero.svg",
      alt: "Elegant AI Canvas Workspace Hero Preview",
      caption: "The production agent orchestration canvas displaying real-time telemetry, agent nodes, and throughput metrics.",
      aspectRatio: "16/9"
    },
    galleryImages: [
      {
        src: "/case-studies/elegant-ai-hero.svg",
        alt: "Agent Topology Explorer",
        caption: "Node Inspector view displaying latency, state memory, and context window allocation."
      },
      {
        src: "/case-studies/elegant-ai-redesign.svg",
        alt: "Streaming Telemetry Dashboard",
        caption: "Real-time task failure rate and execution telemetry ribbon."
      }
    ],

    seoTitle: "Elegant AI Case Study — UI/UX & Product Design | Color Vision",
    seoDescription: "Explore how Color Vision designed an intuitive visual canvas and design system for Elegant AI, transforming complex multi-agent workflows into a seamless product experience.",
    ogImage: "/case-studies/elegant-ai-hero.svg",

    sections: [
      {
        id: "meta-overview",
        type: "project_metadata",
        data: {
          client: "Elegant AI Labs",
          industry: "Generative AI & Developer Tools",
          year: "2025",
          duration: "14 Weeks",
          services: ["Product Strategy", "UI/UX Design", "Design Systems", "Prototyping"],
          tools: ["Figma", "React", "Tailwind CSS", "GSAP"],
          liveUrl: "https://colorvision.lk/work/elegant-ai"
        }
      },
      {
        id: "intro-vision",
        type: "rich_text",
        data: {
          eyebrow: "01 — THE VISION",
          heading: "Bridging Raw Intelligence and Human Intuition",
          subheading: "AI developer tooling has historically suffered from terminal overload and unreadable JSON streams.",
          content: [
            "As generative models evolved from single-prompt completions to complex multi-agent collaborative networks, developers found themselves managing asynchronous agent loops without visual visibility into state failure modes.",
            "Our objective was straightforward yet technically demanding: build a visual orchestration canvas that gives developers total control over agent execution paths while making telemetry instantly digestible at a glance."
          ]
        }
      },
      {
        id: "two-col-challenge",
        type: "two_column_content",
        data: {
          layout: "text-left",
          eyebrow: "02 — THE CHALLENGE",
          heading: "Turning Dense Graph Traversal into Spatial Clarity",
          content: [
            "Before our collaboration, developers used command-line log outputs to diagnose circular dependencies and token spikes. Debugging a 6-agent chain took hours of manual stack trace correlation.",
            "Color Vision introduced a spatial canvas with directional energy conduits that visually communicate agent heartbeat, confidence intervals, and token consumption live."
          ],
          bullets: [
            "Eliminate multi-second terminal log delays with visual state indicators.",
            "Establish unified design tokens supporting both dense data grids and expansive canvas views.",
            "Create accessible color indicators for rapid failure detection."
          ],
          media: {
            src: "/case-studies/elegant-ai-redesign.svg",
            alt: "Visual Canvas Architecture Design",
            caption: "Spatial node architecture replacing terminal logs with structured visual cards."
          }
        }
      },
      {
        id: "key-metrics",
        type: "statistics",
        data: {
          eyebrow: "IMPACT & RESULTS",
          heading: "Demonstrated Velocity Across Enterprise Engineering Teams",
          items: [
            {
              value: "4.8x",
              label: "Pipeline Setup Velocity",
              description: "Engineers scaffolded autonomous agent graphs in minutes rather than days."
            },
            {
              value: "62%",
              label: "Reduction in Debugging Time",
              description: "Visual node telemetry pinpointed circular prompt loops immediately."
            },
            {
              value: "99.4%",
              label: "Token Classification Accuracy",
              description: "Color Vision design system token coverage across all desktop UI modules."
            },
            {
              value: "18ms",
              label: "Interface Latency",
              description: "Optimized canvas rendering handling 200+ simultaneous live streaming nodes."
            }
          ]
        }
      },
      {
        id: "comparison-slider",
        type: "before_after",
        data: {
          eyebrow: "03 — INTERACTION EVOLUTION",
          heading: "From Terminal Overload to Visual Flow Canvas",
          description: "Drag the slider to compare the legacy terminal CLI interface with the modern Color Vision visual canvas experience.",
          beforeImage: {
            src: "/case-studies/elegant-ai-legacy.svg",
            alt: "Legacy Command Line Interface with raw JSON outputs"
          },
          afterImage: {
            src: "/case-studies/elegant-ai-redesign.svg",
            alt: "Modern Visual Flow Canvas with interactive node metrics"
          },
          beforeLabel: "BEFORE: TERMINAL LOGS",
          afterLabel: "AFTER: VISUAL CANVAS",
          caption: "Side-by-side comparison illustrating how complex agent execution graphs were brought into a structured visual hierarchy."
        }
      },
      {
        id: "quote-stakeholder",
        type: "quote",
        data: {
          quote: "The visual identity and design system created by Color Vision gave our platform an enduring, premier presence. Their disciplined approach to typography, layout, and purpose-driven design set a completely new benchmark for our team.",
          author: "Design Director [Demo Placeholder]",
          role: "Brand Strategy Lead",
          company: "Digital Technology Group"
        }
      },
      {
        id: "gallery-exploration",
        type: "image_gallery",
        data: {
          eyebrow: "04 — COMPONENT EXPLORATION",
          heading: "Design System Foundations & Micro-Interactions",
          layout: "2-column",
          images: [
            {
              src: "/case-studies/elegant-ai-hero.svg",
              alt: "Node Inspector and Telemetry Details",
              caption: "Adaptive inspector drawers display token throughput and step latency without obscuring the canvas."
            },
            {
              src: "/case-studies/elegant-ai-redesign.svg",
              alt: "Component System Tokens",
              caption: "Dark-mode technical components engineered for high contrast and zero visual fatigue."
            }
          ]
        }
      },
      {
        id: "final-summary",
        type: "rich_text",
        data: {
          eyebrow: "05 — CONCLUSION",
          heading: "A Scalable Framework for Future AI Autonomy",
          content: [
            "Elegant AI now serves developer teams with an interface that feels as deliberate and crafted as the underlying machine learning models it orchestrates.",
            "By establishing a cohesive component ecosystem, the team was able to ship three major feature updates post-launch without breaking design coherence or introducing visual debt."
          ]
        }
      },
      {
        id: "section-divider",
        type: "spacer_divider",
        data: {
          spacing: "medium",
          showDivider: true
        }
      }
    ],

    nextProject: {
      slug: "goodly",
      title: "Goodly",
      category: "Branding / Packaging",
      subtitle: "A fresh visual identity for a healthy snack brand, balancing approachable personality with contemporary packaging design.",
      year: "2024"
    },
    previousProject: {
      slug: "cr-cricket-bar",
      title: "CR Cricket Bar",
      category: "Brand Identity / Visual Design"
    }
  },

  "goodly": {
    id: "goodly",
    title: "Goodly",
    slug: "goodly",
    subtitle: "An approachable visual identity and packaging system designed to bring contemporary warmth to wholesome, sustainable snacking.",
    shortDescription: "A fresh visual identity for a healthy snack brand, balancing an approachable personality with contemporary packaging design.",
    fullDescription: "Goodly is a modern consumer brand focused on organic plant-protein snacks crafted from unrefined ingredients. Color Vision was tasked with developing the brand strategy, naming language, visual identity, and sustainable packaging architecture to help Goodly stand out on competitive boutique retail shelves.",
    projectType: "Brand Identity & Packaging",
    industry: "Consumer Goods & Health Food",
    client: "Goodly Organics (Colombo & Melbourne)",
    year: "2024",
    duration: "10 Weeks",
    projectStatus: "In Retail Distribution",
    featured: true,
    displayOrder: 2,

    categories: ["Branding", "Packaging", "Visual Design"],
    services: [
      "Brand Strategy & Positioning",
      "Visual Identity System",
      "Packaging Design & Substrate Specification",
      "Typography & Iconography",
      "Print Collateral & Guidelines"
    ],
    toolsAndTechnologies: ["Figma", "Illustrator", "Photoshop", "Print Specification"],
    projectTeam: [
      { role: "Brand Identity Lead", name: "Color Vision Studio" },
      { role: "Packaging Specialist", name: "S. Alwis" }
    ],
    projectCredits: [
      { label: "Client Partner", value: "Goodly Organics" },
      { label: "Deliverables", value: "Brand Guidelines, 3-Variant Pouch Architecture, Retail Shipper Boxes" },
      { label: "Timeline", value: "Q2 2024 – Q3 2024" }
    ],

    thumbnailImage: {
      src: "/case-studies/goodly-hero.svg",
      alt: "Goodly Organic Snack Pouch Lineup",
      aspectRatio: "16/9"
    },
    heroImage: {
      src: "/case-studies/goodly-hero.svg",
      alt: "Goodly Packaging System Showcase",
      caption: "The complete 3-variant pouch architecture using tactile unbleached paper substrates and bold editorial typography.",
      aspectRatio: "16/9"
    },
    galleryImages: [
      {
        src: "/case-studies/goodly-hero.svg",
        alt: "Goodly 3-Variant Pouch System",
        caption: "Distinct flavor differentiation achieved through warm earth pigments and crisp typographic hierarchies."
      }
    ],

    seoTitle: "Goodly Case Study — Brand Identity & Packaging | Color Vision",
    seoDescription: "Discover how Color Vision crafted the brand identity and packaging architecture for Goodly, balancing sustainable materials with bold, modern typography.",
    ogImage: "/case-studies/goodly-hero.svg",

    sections: [
      {
        id: "goodly-metadata",
        type: "project_metadata",
        data: {
          client: "Goodly Organics",
          industry: "Consumer Packaged Goods & Health Food",
          year: "2024",
          duration: "10 Weeks",
          services: ["Brand Strategy", "Packaging System", "Visual Identity", "Retail Collateral"],
          tools: ["Figma", "Adobe Illustrator", "Tactile Print Production"],
          liveUrl: "https://colorvision.lk/work/goodly"
        }
      },
      {
        id: "goodly-overview",
        type: "rich_text",
        data: {
          eyebrow: "01 — THE BRIEF",
          heading: "Honest Ingredients Deserve Honest Packaging",
          subheading: "Health food aisles are cluttered with either clinical nutritional charts or cartoonish health claims.",
          content: [
            "Goodly wanted to chart a third path: an editorial, design-led packaging system that communicates clean, unrefined nourishment through tactile materials, generous whitespace, and disciplined typography.",
            "Our approach stripped away superficial marketing badges, putting the ingredient clarity, product weight, and flavor personality directly in focus."
          ]
        }
      },
      {
        id: "goodly-hero-media",
        type: "full_width_image",
        data: {
          image: {
            src: "/case-studies/goodly-hero.svg",
            alt: "Goodly Sustainable Pouch Architecture"
          },
          caption: "Custom matte tactile pouch substrates engineered with 100% compostable barrier films."
        }
      },
      {
        id: "goodly-strategy",
        type: "two_column_content",
        data: {
          layout: "text-right",
          eyebrow: "02 — MATERIALITY & COLOR",
          heading: "Grounded Pigments Reflecting Raw Harvest Ingredients",
          content: [
            "Each product variant is anchored by an organic earthen hue: Deep Roasted Umber for Raw Cacao, Warm Dune for Sea Salt, and Sun-baked Terracotta for Smoked Almond.",
            "The packaging uses uncoated, FSC-certified compostable kraft paper, providing a natural tactile grain that customers instantly feel when picking a pouch off the shelf."
          ],
          bullets: [
            "Zero virgin plastics utilized in secondary shipping cartons.",
            "Color Vision signature orange seal accent used as the brand's quality badge.",
            "Bilingual regulatory typography set in high-legibility Manrope."
          ],
          media: {
            src: "/case-studies/goodly-hero.svg",
            alt: "Color and Substrate Study for Goodly",
            caption: "Tactile substrate color pairing ensuring instant 5-meter shelf recognition."
          }
        }
      },
      {
        id: "goodly-statistics",
        type: "statistics",
        data: {
          eyebrow: "RETAIL OUTCOMES",
          heading: "Measurable Impact in Boutique Retail Spaces",
          items: [
            {
              value: "100%",
              label: "Compostable Materials",
              description: "Zero landfill footprint for all primary and secondary packaging units."
            },
            {
              value: "+38%",
              label: "Retail Buyer Placements",
              description: "Secured placement in 42 premium grocers within the first 60 days."
            },
            {
              value: "3 Lines",
              label: "Unified Product System",
              description: "Modular grid system ready for seasonal and line extensions."
            }
          ]
        }
      },
      {
        id: "goodly-quote",
        type: "quote",
        data: {
          quote: "Color Vision's collaborative process is remarkably focused and transparent. They transformed complex technical requirements into a clean, purposeful brand experience that scaled effortlessly across our entire packaging lineup.",
          author: "Founder & CEO [Demo Placeholder]",
          role: "Executive Leadership",
          company: "Consumer Goods & Retail"
        }
      },
      {
        id: "goodly-conclusion",
        type: "rich_text",
        data: {
          eyebrow: "03 — CONCLUSION",
          heading: "A Purpose-Driven Packaging Architecture",
          content: [
            "Goodly launched in regional retail markets to immediate customer praise. The bold typographic signature gave the brand instant recognition against multinational legacy snacks.",
            "The modular design framework now serves as the blueprint for upcoming beverage and breakfast cereal releases."
          ]
        }
      },
      {
        id: "goodly-divider",
        type: "spacer_divider",
        data: {
          spacing: "medium",
          showDivider: true
        }
      }
    ],

    nextProject: {
      slug: "elegant-ai",
      title: "Elegant AI",
      category: "UI/UX / Digital Product",
      subtitle: "A clearer digital experience for AI-powered technology, making complex autonomous agent capabilities intuitive to orchestrate.",
      year: "2025"
    },
    previousProject: {
      slug: "vehicle-service-platform",
      title: "Vehicle Service Platform",
      category: "UI/UX / Product Design"
    }
  },

  "vehicle-service-platform": {
    id: "vehicle-service-platform",
    title: "Vehicle Service Platform",
    slug: "vehicle-service-platform",
    subtitle: "A connected product experience designed to simplify vehicle servicing workflows and everyday mobility operations.",
    shortDescription: "A connected product experience designed to simplify vehicle servicing workflows and everyday operations.",
    fullDescription: "FleetMotion Vehicle Service Platform unites automotive workshops, fleet managers, and vehicle owners into a singular, transparent digital ecosystem. Color Vision designed the comprehensive tablet and desktop interface architecture.",
    projectType: "UI/UX & Connected Platform",
    industry: "Automotive & Fleet Mobility",
    client: "FleetMotion Mobility",
    year: "2025",
    duration: "12 Weeks",
    projectStatus: "In Beta Deployment",
    featured: true,
    displayOrder: 3,

    categories: ["UI/UX", "Digital", "Service Design"],
    services: ["Web Application", "Mobile Experience", "Service Design", "Interface Architecture"],
    toolsAndTechnologies: ["Figma", "React", "TypeScript", "Tailwind CSS"],
    projectTeam: [
      { role: "Lead UI/UX Designer", name: "Color Vision Studio" }
    ],
    projectCredits: [
      { label: "Client Partner", value: "FleetMotion Mobility" },
      { label: "Deliverables", value: "Technician Tablet App, Fleet Manager Dashboard" }
    ],

    thumbnailImage: {
      src: "/case-studies/elegant-ai-redesign.svg",
      alt: "Vehicle Service Platform Interface",
      aspectRatio: "16/9"
    },
    heroImage: {
      src: "/case-studies/elegant-ai-redesign.svg",
      alt: "Vehicle Service Platform Dashboard",
      caption: "Real-time maintenance diagnostics and technician dispatch system.",
      aspectRatio: "16/9"
    },
    galleryImages: [],

    seoTitle: "Vehicle Service Platform Case Study — UI/UX | Color Vision",
    seoDescription: "Explore how Color Vision built a streamlined interface architecture for FleetMotion's connected vehicle service platform.",
    ogImage: "/case-studies/elegant-ai-redesign.svg",

    sections: [
      {
        id: "vsp-metadata",
        type: "project_metadata",
        data: {
          client: "FleetMotion Mobility",
          industry: "Automotive & Fleet Mobility",
          year: "2025",
          duration: "12 Weeks",
          services: ["Web Application", "Mobile Experience", "Service Design"],
          tools: ["Figma", "React", "TypeScript"],
          liveUrl: "https://colorvision.lk/work/vehicle-service-platform"
        }
      },
      {
        id: "vsp-overview",
        type: "rich_text",
        data: {
          eyebrow: "01 — THE OBJECTIVE",
          heading: "Clarity in High-Paced Workshop Environments",
          content: [
            "Vehicle service bays are loud, fast-paced, and physically demanding. Technicians needed an interface with large touch targets, high-contrast diagnostic indicators, and zero redundant steps.",
            "Color Vision designed an intuitive tablet interface that allows technicians to log multi-point inspections in under 3 minutes with automated photographic proof."
          ]
        }
      },
      {
        id: "vsp-metrics",
        type: "statistics",
        data: {
          eyebrow: "MEASURED EFFICIENCY",
          heading: "Operational Improvements Across Active Bays",
          items: [
            { value: "45%", label: "Faster Check-ins", description: "Customer intake reduced from 12 mins to under 7 mins." },
            { value: "98.2%", label: "Inspection Compliance", description: "Zero skipped safety checkpoints recorded." }
          ]
        }
      },
      {
        id: "vsp-quote",
        type: "quote",
        data: {
          quote: "Working with Color Vision brought clarity to our product structure from day one. Their team took the time to understand the underlying problem before touching a single wireframe, resulting in an interface that our users found genuinely intuitive.",
          author: "Client Partner [Demo Placeholder]",
          role: "Product Director",
          company: "Fintech & Mobility Ecosystem"
        }
      }
    ],

    nextProject: {
      slug: "cr-cricket-bar",
      title: "CR Cricket Bar",
      category: "Branding / Visual Design",
      subtitle: "A distinctive identity translating the energy of cricket culture into a bold and memorable brand.",
      year: "2024"
    },
    previousProject: {
      slug: "goodly",
      title: "Goodly",
      category: "Branding / Packaging"
    }
  },

  "cr-cricket-bar": {
    id: "cr-cricket-bar",
    title: "CR Cricket Bar",
    slug: "cr-cricket-bar",
    subtitle: "A distinctive hospitality identity translating the raw energy of cricket culture into a bold, typographic brand experience.",
    shortDescription: "A distinctive identity translating the energy of cricket culture into a bold and memorable brand.",
    fullDescription: "CR Cricket Bar is an upscale sports dining and social venue in Colombo. Color Vision developed the spatial environmental graphics, brand mark, menu systems, and digital promotional collateral.",
    projectType: "Brand Identity & Spatial",
    industry: "Hospitality & Sports Entertainment",
    client: "CR Hospitality",
    year: "2024",
    duration: "8 Weeks",
    projectStatus: "Completed",
    featured: false,
    displayOrder: 4,

    categories: ["Branding", "Graphic Design", "Environmental"],
    services: ["Visual Identity", "Environmental Design", "Print & Signage", "Menu Systems"],
    toolsAndTechnologies: ["Figma", "Illustrator", "Typography"],
    projectTeam: [
      { role: "Brand Identity Lead", name: "Color Vision Studio" }
    ],
    projectCredits: [
      { label: "Client Partner", value: "CR Hospitality" },
      { label: "Deliverables", value: "Signage, Brand Guidelines, Match Day Digital Assets" }
    ],

    thumbnailImage: {
      src: "/case-studies/goodly-hero.svg",
      alt: "CR Cricket Bar Brand Identity",
      aspectRatio: "16/9"
    },
    heroImage: {
      src: "/case-studies/goodly-hero.svg",
      alt: "CR Cricket Bar Spatial Graphics",
      caption: "Bold typographic stadium graphics combined with premium hospitality finishes.",
      aspectRatio: "16/9"
    },
    galleryImages: [],

    seoTitle: "CR Cricket Bar Case Study — Brand Identity | Color Vision",
    seoDescription: "Explore how Color Vision captured the energy of cricket culture for CR Cricket Bar's brand identity and spatial graphics.",
    ogImage: "/case-studies/goodly-hero.svg",

    sections: [
      {
        id: "cr-metadata",
        type: "project_metadata",
        data: {
          client: "CR Hospitality",
          industry: "Hospitality & Entertainment",
          year: "2024",
          duration: "8 Weeks",
          services: ["Visual Identity", "Environmental Design", "Print & Signage"],
          tools: ["Adobe Illustrator", "Typography"],
          liveUrl: "https://colorvision.lk/work/cr-cricket-bar"
        }
      },
      {
        id: "cr-overview",
        type: "rich_text",
        data: {
          eyebrow: "01 — THE CONCEPT",
          heading: "Honoring Tradition, Reimagined with Modern Punch",
          content: [
            "Cricket in Sri Lanka is more than a sport; it is an electric national passion. Our goal was to avoid cliché sporting tropes and instead draw inspiration from vintage test cricket scorecards and stadium typography.",
            "The outcome is a confident, energetic visual world that feels equally appropriate for afternoon dining and high-energy night matches."
          ]
        }
      },
      {
        id: "cr-quote",
        type: "quote",
        data: {
          quote: "From spatial signage to digital touchpoints, Color Vision captured the raw energy of our concept and refined it into an unforgettable, cohesive brand world that customers constantly comment on.",
          author: "Managing Director [Demo Placeholder]",
          role: "Brand Experience",
          company: "CR Hospitality Group"
        }
      }
    ],

    nextProject: {
      slug: "elegant-ai",
      title: "Elegant AI",
      category: "UI/UX / Digital Product",
      subtitle: "A clearer digital experience for AI-powered technology.",
      year: "2025"
    },
    previousProject: {
      slug: "vehicle-service-platform",
      title: "Vehicle Service Platform",
      category: "UI/UX / Product Design"
    }
  }
};
