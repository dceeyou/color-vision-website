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
    eyebrow: "CREATIVE DESIGN STUDIO",
    heading: "Design\nThat",
    highlightedText: "Matters.",
    description: "Color Vision is an independent design studio based in Sri Lanka, helping ambitious businesses turn ideas into clear brands, intuitive digital products, and meaningful experiences.",
    primaryCtaLabel: "VIEW OUR WORK →",
    primaryCtaUrl: "#work",
    secondaryCtaLabel: "START A PROJECT",
    secondaryCtaUrl: "#contact"
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
      description: "We learn about your business, audience, goals, competitors, challenges, and opportunities. This gives us the context needed to understand what the project actually needs."
    },
    {
      id: "2",
      stepNumber: "02",
      stepLabel: "DEFINE",
      title: "Find the right direction",
      description: "We bring the findings together, establish priorities, structure the experience, and create a shared understanding of what success should look like."
    },
    {
      id: "3",
      stepNumber: "03",
      stepLabel: "DESIGN",
      title: "Explore the possibilities",
      description: "We translate strategy into visual and digital experiences through concepts, wireframes, interfaces, identity systems, and prototypes."
    },
    {
      id: "4",
      stepNumber: "04",
      stepLabel: "REFINE",
      title: "Make the details count",
      description: "We review, test, challenge, and refine the work to improve usability, clarity, consistency, and visual quality."
    },
    {
      id: "5",
      stepNumber: "05",
      stepLabel: "DELIVER",
      title: "Ready for the real world",
      description: "We prepare final assets, specifications, components, and documentation to help the work move confidently from design into production."
    }
  ];
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return [
    { id: "1", clientName: "Sarah Chen", clientRole: "Founder", companyName: "Nexus", testimonial: "Color Vision fundamentally transformed how our users perceive our product.", clientPhoto: null, companyLogo: null },
    { id: "2", clientName: "Marcus Thorne", clientRole: "Marketing Dir.", companyName: "Aura", testimonial: "The attention to detail is truly unmatched.", clientPhoto: null, companyLogo: null }
  ];
}
