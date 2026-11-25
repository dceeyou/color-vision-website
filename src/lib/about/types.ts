export interface AboutHeroData {
  eyebrow: string;
  headingLine1: string;
  headingLine2: string;
  description: string;
}

export interface StoryParagraph {
  text: string;
}

export interface AboutStoryData {
  eyebrow: string;
  heading: string;
  highlightStatement: string;
  paragraphs: string[];
}

export interface PhilosophyPrinciple {
  number: string;
  title: string;
  description: string;
}

export interface AboutPhilosophyData {
  eyebrow: string;
  heading: string;
  principles: PhilosophyPrinciple[];
}

export interface AboutFounderData {
  eyebrow: string;
  name: string;
  role: string;
  location: string;
  experienceYears: string;
  foundedDate: string;
  bioParagraphs: string[];
  signatureText: string;
  imageAlt: string;
  imageSrc?: string;
}

export interface FounderQuoteData {
  quoteLine1: string;
  quoteHighlight: string;
  quoteLine2: string;
  supportingText: string;
}

export interface ExpertiseItem {
  number: string;
  title: string;
  description: string;
}

export interface AboutExpertiseData {
  eyebrow: string;
  heading: string;
  services: ExpertiseItem[];
}

export interface AboutCTAData {
  eyebrow: string;
  heading: string;
  description: string;
  primaryAction: {
    label: string;
    href: string;
  };
  secondaryAction: {
    label: string;
    href: string;
  };
}

export interface AboutPageData {
  hero: AboutHeroData;
  story: AboutStoryData;
  philosophy: AboutPhilosophyData;
  founder: AboutFounderData;
  founderQuote: FounderQuoteData;
  expertise: AboutExpertiseData;
  cta: AboutCTAData;
}
