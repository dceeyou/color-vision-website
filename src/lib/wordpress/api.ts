import { 
  SiteSettings, HeroContent, Stat, Service, 
  Project, ProcessStep, AboutContent, Testimonial, ContactContent 
} from './types';

const WP_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://cms.colorvision.lk';
const GRAPHQL_ENDPOINT = `${WP_URL}/graphql`;

/**
 * Universal fetch method for WordPress GraphQL API.
 * Includes graceful error handling if WP is unavailable.
 */
export async function fetchWP(query: string, variables: Record<string, unknown> = {}) {
  // If no URL is set or in mock mode, return null to trigger fallbacks
  if (WP_URL === 'https://cms.colorvision.lk' || !WP_URL) {
    return null; // Triggers fallback data
  }

  try {
    const res = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables }),
      next: {
        revalidate: 60, // Cache revalidation period in seconds
      }
    });

    if (!res.ok) {
      console.warn(`[WordPress API] Failed to fetch. Status: ${res.status}`);
      return null;
    }

    const json = await res.json();
    
    if (json.errors) {
      console.warn('[WordPress API] GraphQL Errors:', json.errors);
      return null;
    }
    
    return json.data;
  } catch (error) {
    console.warn('[WordPress API] Network error:', error);
    return null;
  }
}

// -------------------------------------------------------------
// Fallback Data Generators (Until WP is connected)
// -------------------------------------------------------------

export async function getSiteSettings(): Promise<SiteSettings> {
  const data = await fetchWP(`query { siteSettings { brandName tagline email location footerDescription copyrightText footerStatement } }`);
  if (data?.siteSettings) return data.siteSettings;
  
  return {
    brandName: "Color Vision",
    tagline: "Design That Matters.",
    email: "info@colorvision.lk",
    location: "Sri Lanka",
    footerDescription: "Independent design studio based in Sri Lanka, helping ambitious businesses turn ideas into clear brands, digital products, and meaningful experiences.",
    socialLinks: {
      instagram: "#",
      linkedin: "#",
      behance: "#",
      dribbble: "#"
    },
    copyrightText: "© Color Vision. All rights reserved.",
    footerStatement: "Ideas, made clear."
  };
}

export async function getHero(): Promise<HeroContent> {
  const data = await fetchWP(`query { hero { eyebrow heading highlightedText description primaryCtaLabel primaryCtaUrl secondaryCtaLabel secondaryCtaUrl } }`);
  if (data?.hero) return data.hero;
  
  return {
    eyebrow: "INDEPENDENT DESIGN STUDIO · SRI LANKA",
    heading: "We transform ideas",
    highlightedText: "into meaningful experiences.",
    description: "Color Vision brings strategy, creativity and thoughtful design together to shape distinctive brands, intuitive digital products and meaningful digital experiences.",
    primaryCtaLabel: "VIEW OUR WORK →",
    primaryCtaUrl: "#work",
    secondaryCtaLabel: "START A PROJECT →",
    secondaryCtaUrl: "#contact"
  };
}

export async function getAbout(): Promise<AboutContent> {
  const data = await fetchWP(`query { about { eyebrow heading highlightedHeading description secondaryDescription ctaLabel ctaUrl } }`);
  if (data?.about) return data.about;

  return {
    eyebrow: "ABOUT COLOR VISION",
    heading: "We turn ideas\ninto clear,\nexperiences.",
    highlightedHeading: "meaningful",
    description: "Color Vision is an independent design studio based in Sri Lanka, working across brand identity, UI/UX design, digital products, websites, design systems, and visual communication.",
    secondaryDescription: "We believe good design sits between what a business needs to achieve and what people need to understand. That's why we don't begin with colours, screens, or trends. We begin with the problem.",
    ctaLabel: "LET'S TALK ABOUT YOUR PROJECT",
    ctaUrl: "#contact"
  };
}

export async function getStats(): Promise<Stat[]> {
  // Mock fallback
  return [
    { id: "1", number: "15+", label: "AWARDS" },
    { id: "2", number: "40+", label: "BRANDS" },
    { id: "3", number: "99%", label: "SUCCESS" },
    { id: "4", number: "10+", label: "YEARS" }
  ];
}

export async function getServices(): Promise<Service[]> {
  return [
    {
      id: "1",
      serviceNumber: "01",
      name: "Brand Identity",
      shortDescription: "A clear visual language that makes a brand distinctive, consistent, and easy to recognize.",
      longDescription: "A clear visual language that makes a brand distinctive, consistent, and easy to recognize.",
      category: "Branding",
      slug: "brand-identity"
    },
    {
      id: "2",
      serviceNumber: "02",
      name: "UI/UX Design",
      shortDescription: "Digital experiences shaped around real people, clear interactions, and purposeful journeys.",
      longDescription: "Digital experiences shaped around real people, clear interactions, and purposeful journeys.",
      category: "Design",
      slug: "ui-ux-design"
    },
    {
      id: "3",
      serviceNumber: "03",
      name: "Digital Product Design",
      shortDescription: "Structured product experiences that turn complex requirements into simple, useful interfaces.",
      longDescription: "Structured product experiences that turn complex requirements into simple, useful interfaces.",
      category: "Product",
      slug: "digital-product-design"
    },
    {
      id: "4",
      serviceNumber: "04",
      name: "Web Design",
      shortDescription: "Responsive digital experiences that balance brand character, usability, clarity, and conversion.",
      longDescription: "Responsive digital experiences that balance brand character, usability, clarity, and conversion.",
      category: "Web",
      slug: "web-design"
    },
    {
      id: "5",
      serviceNumber: "05",
      name: "Design Systems",
      shortDescription: "Flexible visual foundations that keep digital products consistent, scalable, and easier to evolve.",
      longDescription: "Flexible visual foundations that keep digital products consistent, scalable, and easier to evolve.",
      category: "Systems",
      slug: "design-systems"
    },
    {
      id: "6",
      serviceNumber: "06",
      name: "Visual Communication",
      shortDescription: "Purposeful visuals that make ideas easier to understand, remember, and connect with.",
      longDescription: "Purposeful visuals that make ideas easier to understand, remember, and connect with.",
      category: "Communication",
      slug: "visual-communication"
    }
  ];
}

export async function getProjects(): Promise<Project[]> {
  const data = await fetchWP(`
    query AllProjects {
      projects(first: 20, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            id title slug
            projectFields { category }
          }
        }
      }
    }
  `);
  
  if (data?.projects?.edges?.length > 0) {
    // Transformer logic would go here
    return data.projects.edges.map((edge: { node: { id: string; title: string; slug: string; projectFields?: { category: string } } }) => ({
      id: edge.node.id,
      title: edge.node.title,
      slug: edge.node.slug,
      shortDescription: "",
      fullDescription: "",
      clientName: "",
      year: "2026",
      category: [edge.node.projectFields?.category || "Branding"],
      featuredImage: null,
      galleryImages: [],
      projectUrl: "",
      caseStudyUrl: "",
      servicesUsed: [],
      featuredProject: true
    }));
  }

  // Fallback Data
  return [
    {
      id: "elegant-ai",
      title: "Elegant AI",
      slug: "elegant-ai",
      category: ["UI/UX", "Digital", "UI/UX / Digital Product"],
      shortDescription: "A clearer digital experience for AI-powered technology, making complex capabilities easier to understand and use.",
      fullDescription: "A clearer digital experience for AI-powered technology, making complex capabilities easier to understand and use.",
      clientName: "Elegant AI Labs",
      year: "2025",
      featuredImage: null,
      galleryImages: [],
      projectUrl: "#contact",
      caseStudyUrl: "#contact",
      servicesUsed: ["Interface Design", "Product Strategy", "Design System"],
      featuredProject: true
    },
    {
      id: "vehicle-service-platform",
      title: "Vehicle Service Platform",
      slug: "vehicle-service-platform",
      category: ["UI/UX", "Digital", "UI/UX / Product Design"],
      shortDescription: "A connected product experience designed to simplify vehicle servicing workflows and everyday operations.",
      fullDescription: "A connected product experience designed to simplify vehicle servicing workflows and everyday operations.",
      clientName: "FleetMotion Mobility",
      year: "2025",
      featuredImage: null,
      galleryImages: [],
      projectUrl: "#contact",
      caseStudyUrl: "#contact",
      servicesUsed: ["Web Application", "Mobile Experience", "Service Design"],
      featuredProject: true
    },
    {
      id: "cr-cricket-bar",
      title: "CR Cricket Bar",
      slug: "cr-cricket-bar",
      category: ["Branding", "Graphic Design", "Brand Identity / Visual Design"],
      shortDescription: "A distinctive identity translating the energy of cricket culture into a bold and memorable brand.",
      fullDescription: "A distinctive identity translating the energy of cricket culture into a bold and memorable brand.",
      clientName: "CR Hospitality",
      year: "2024",
      featuredImage: null,
      galleryImages: [],
      projectUrl: "#contact",
      caseStudyUrl: "#contact",
      servicesUsed: ["Visual Identity", "Environmental Design", "Print & Signage"],
      featuredProject: false
    },
    {
      id: "goodly",
      title: "Goodly",
      slug: "goodly",
      category: ["Branding", "Graphic Design", "Brand Identity / Packaging"],
      shortDescription: "A fresh visual identity for a healthy snack brand, balancing an approachable personality with contemporary packaging design.",
      fullDescription: "A fresh visual identity for a healthy snack brand, balancing an approachable personality with contemporary packaging design.",
      clientName: "Goodly Organics",
      year: "2024",
      featuredImage: null,
      galleryImages: [],
      projectUrl: "#contact",
      caseStudyUrl: "#contact",
      servicesUsed: ["Brand Strategy", "Packaging System", "Visual Identity"],
      featuredProject: false
    },
    {
      id: "my-little-kevi",
      title: "My Little Kevi",
      slug: "my-little-kevi",
      category: ["UI/UX", "Digital", "UI/UX / Mobile"],
      shortDescription: "A thoughtful mobile experience designed around pregnancy tracking and everyday personal care.",
      fullDescription: "A thoughtful mobile experience designed around pregnancy tracking and everyday personal care.",
      clientName: "Kevi Healthcare",
      year: "2024",
      featuredImage: null,
      galleryImages: [],
      projectUrl: "#contact",
      caseStudyUrl: "#contact",
      servicesUsed: ["Mobile UI/UX", "User Research", "Interaction Design"],
      featuredProject: false
    },
    {
      id: "baps",
      title: "BAPS",
      slug: "baps",
      category: ["Branding", "Digital", "Graphic Design", "Branding / Web Design"],
      shortDescription: "A cohesive visual identity and digital presentation designed to establish a consistent brand experience.",
      fullDescription: "A cohesive visual identity and digital presentation designed to establish a consistent brand experience.",
      clientName: "BAPS Group",
      year: "2024",
      featuredImage: null,
      galleryImages: [],
      projectUrl: "#contact",
      caseStudyUrl: "#contact",
      servicesUsed: ["Brand Identity", "Web Experience", "Design Guidelines"],
      featuredProject: false
    }
  ];
}

export async function getProcessSteps(): Promise<ProcessStep[]> {
  return [
    {
      id: "1",
      stepNumber: "01",
      stepLabel: "DISCOVER",
      title: "Understand the challenge",
      description: "We learn about your business, audience, goals, competitors, challenges and opportunities. This gives us the context to understand what the project really needs."
    },
    {
      id: "2",
      stepNumber: "02",
      stepLabel: "DEFINE",
      title: "Find the right direction",
      description: "We bring the findings together, establish priorities and create a clear direction for the project."
    },
    {
      id: "3",
      stepNumber: "03",
      stepLabel: "DESIGN",
      title: "Explore the possibilities",
      description: "We translate ideas into concepts, wireframes, interfaces, identity systems and meaningful digital experiences."
    },
    {
      id: "4",
      stepNumber: "04",
      stepLabel: "REFINE",
      title: "Make the details count",
      description: "We review, test and refine the work to improve usability, clarity, consistency and visual quality."
    },
    {
      id: "5",
      stepNumber: "05",
      stepLabel: "DELIVER",
      title: "Ready for the real world",
      description: "We prepare the final assets, specifications and documentation for a smooth transition into production."
    }
  ];
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return [
    {
      id: "demo-1",
      clientName: "Client Partner [Demo Placeholder]",
      clientRole: "Product Director",
      companyName: "Fintech & Mobility Ecosystem",
      serviceCategory: "UI/UX & Product Design",
      testimonial: "Working with Color Vision brought clarity to our product structure from day one. Their team took the time to understand the underlying problem before touching a single wireframe, resulting in an interface that our users found genuinely intuitive.",
      clientPhoto: null,
      companyLogo: null,
      projectReference: "02 — Vehicle Service Platform"
    },
    {
      id: "demo-2",
      clientName: "Design Director [Demo Placeholder]",
      clientRole: "Brand Strategy Lead",
      companyName: "Digital Technology Group",
      serviceCategory: "Brand Identity & Design System",
      testimonial: "The visual identity and design system created by Color Vision gave our brand a distinct, enduring presence. Their disciplined approach to typography, layout, and purpose-driven design set a completely new benchmark for our team.",
      clientPhoto: null,
      companyLogo: null,
      projectReference: "01 — Elegant AI"
    },
    {
      id: "demo-3",
      clientName: "Founder & CEO [Demo Placeholder]",
      clientRole: "Executive Leadership",
      companyName: "Consumer Goods & Retail",
      serviceCategory: "Packaging & E-Commerce",
      testimonial: "Color Vision's collaborative process is remarkably focused and transparent. They transformed complex technical requirements into a clean, purposeful digital experience that scaled effortlessly across our entire platform.",
      clientPhoto: null,
      companyLogo: null,
      projectReference: "04 — Goodly Packaging & Web"
    },
    {
      id: "demo-4",
      clientName: "VP of Engineering [Demo Placeholder]",
      clientRole: "Platform Architecture",
      companyName: "Cloud Infrastructure Labs",
      serviceCategory: "Design Systems & Web",
      testimonial: "Their attention to technical feasibility and design system modularity saved us months of rework. Every component, token, and responsive state was documented with exceptional rigor and craft.",
      clientPhoto: null,
      companyLogo: null,
      projectReference: "03 — Enterprise Design System"
    },
    {
      id: "demo-5",
      clientName: "Managing Director [Demo Placeholder]",
      clientRole: "Brand Experience",
      companyName: "CR Hospitality Group",
      serviceCategory: "Brand Identity & Environmental",
      testimonial: "From spatial signage to digital touchpoints, Color Vision captured the raw energy of our concept and refined it into an unforgettable, cohesive brand world that customers constantly comment on.",
      clientPhoto: null,
      companyLogo: null,
      projectReference: "05 — CR Cricket Bar"
    },
    {
      id: "demo-6",
      clientName: "Head of Product [Demo Placeholder]",
      clientRole: "Mobile & Health",
      companyName: "CarePulse Health Technologies",
      serviceCategory: "UI/UX & Mobile Experience",
      testimonial: "Color Vision brought empathy and clarity to an intricate personal care workflow. Their design decisions were always backed by clear reasoning, resulting in rapid adoption and deep user trust.",
      clientPhoto: null,
      companyLogo: null,
      projectReference: "06 — My Little Kevi Mobile"
    }
  ];
}

export async function getContact(): Promise<ContactContent> {
  const data = await fetchWP(`query { contact { eyebrow heading highlightedHeading description ctaLabel email phone location formHeading formSuccessMessage } }`);
  if (data?.contact) return data.contact;

  return {
    eyebrow: "LET'S CREATE TOGETHER",
    heading: "Have a project in mind?\nLet's make it",
    highlightedHeading: "matter.",
    description: "Have an idea, a challenge, or a product that needs a clearer direction? Tell us what you're working on and what you're trying to solve. We'll bring strategy and purposeful design together to turn your idea into an experience people can understand, use, and remember.",
    ctaLabel: "SEND INQUIRY",
    email: "info@colorvision.lk",
    phone: "",
    location: "Colombo, Sri Lanka",
    formHeading: "Project Inquiry",
    formSuccessMessage: "Thanks for reaching out. We've received your project details and will get back to you soon."
  };
}
