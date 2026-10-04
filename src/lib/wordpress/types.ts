export interface SiteSettings {
  brandName: string;
  tagline: string;
  email: string;
  location: string;
  footerDescription: string;
  socialLinks: {
    instagram: string;
    linkedin: string;
    behance: string;
    dribbble: string;
  };
  copyrightText: string;
  footerStatement: string;
}

export interface HeroContent {
  eyebrow: string;
  heading: string;
  highlightedText: string;
  description: string;
  primaryCtaLabel: string;
  primaryCtaUrl: string;
  secondaryCtaLabel: string;
  secondaryCtaUrl: string;
}

export interface Stat {
  id: string;
  number: string;
  label: string;
}

export interface Service {
  id: string;
  serviceNumber: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  category: string;
  slug: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  clientName: string;
  year: string;
  category: string[];
  featuredImage: string | null;
  galleryImages: string[];
  projectUrl: string;
  caseStudyUrl: string;
  servicesUsed: string[];
  featuredProject: boolean;
}

export interface ProcessStep {
  id: string;
  stepNumber: string;
  stepLabel: string;
  title: string;
  description: string;
}

export interface AboutContent {
  eyebrow: string;
  heading: string;
  highlightedHeading: string;
  description: string;
  secondaryDescription: string;
  ctaLabel: string;
  ctaUrl: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  clientRole: string;
  companyName: string;
  testimonial: string;
  clientPhoto: string | null;
  companyLogo: string | null;
}

export interface ContactContent {
  eyebrow: string;
  heading: string;
  highlightedHeading: string;
  description: string;
  ctaLabel: string;
  email: string;
  phone: string;
  location: string;
  formHeading: string;
  formSuccessMessage: string;
}
