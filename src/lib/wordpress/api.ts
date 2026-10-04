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
    eyebrow: "Creative Design Studio",
    heading: "Design\nThat",
    highlightedText: "Matters.",
    description: "Color Vision is a design studio based in Sri Lanka, helping ambitious businesses turn ideas into clear brands, intuitive digital products, and meaningful experiences. From brand identity and UI/UX design to websites and digital products, we bring strategy, creativity, and thoughtful execution together to create work that has a reason to exist.",
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
    { id: "1", serviceNumber: "01", name: "Brand Identity", shortDescription: "Visual language", longDescription: "A clear visual language that makes a brand distinctive, consistent, and easy to recognize.", category: "Branding", slug: "brand-identity" },
    { id: "2", serviceNumber: "02", name: "Digital Products", shortDescription: "Web & App Design", longDescription: "Interfaces that balance aesthetics with frictionless usability.", category: "Digital", slug: "digital-products" },
    { id: "3", serviceNumber: "03", name: "Creative Strategy", shortDescription: "Positioning", longDescription: "Defining the core purpose and direction before we draw a single pixel.", category: "Strategy", slug: "creative-strategy" }
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
    { id: "1", title: "Aura FinTech", slug: "aura-fintech", category: ["Brand", "UI/UX"], shortDescription: "", fullDescription: "", clientName: "", year: "2026", featuredImage: null, galleryImages: [], projectUrl: "", caseStudyUrl: "", servicesUsed: [], featuredProject: true },
    { id: "2", title: "Nexus System", slug: "nexus-system", category: ["Product", "Web"], shortDescription: "", fullDescription: "", clientName: "", year: "2026", featuredImage: null, galleryImages: [], projectUrl: "", caseStudyUrl: "", servicesUsed: [], featuredProject: true },
    { id: "3", title: "Horizon Ventures", slug: "horizon-ventures", category: ["Strategy", "Brand"], shortDescription: "", fullDescription: "", clientName: "", year: "2026", featuredImage: null, galleryImages: [], projectUrl: "", caseStudyUrl: "", servicesUsed: [], featuredProject: true }
  ];
}

export async function getProcessSteps(): Promise<ProcessStep[]> {
  return [
    { id: "1", stepNumber: "01", stepLabel: "DISCOVER", title: "Understand the challenge", description: "We learn about your business, audience, goals, and challenges to understand what the project really needs." },
    { id: "2", stepNumber: "02", stepLabel: "DEFINE", title: "Find the right direction", description: "Creating a solid blueprint and strategy." },
    { id: "3", stepNumber: "03", stepLabel: "DESIGN", title: "Explore the possibilities", description: "Crafting the visual identity and interface." },
    { id: "4", stepNumber: "04", stepLabel: "DELIVER", title: "Ready for the real world", description: "Launching and ensuring everything is perfect." }
  ];
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return [
    { id: "1", clientName: "Sarah Chen", clientRole: "Founder", companyName: "Nexus", testimonial: "Color Vision fundamentally transformed how our users perceive our product.", clientPhoto: null, companyLogo: null },
    { id: "2", clientName: "Marcus Thorne", clientRole: "Marketing Dir.", companyName: "Aura", testimonial: "The attention to detail is truly unmatched.", clientPhoto: null, companyLogo: null }
  ];
}
