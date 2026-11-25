export interface LegalSubsection {
  subtitle: string;
  paragraphs: string[];
  bulletPoints?: string[];
}

export interface LegalSectionCallout {
  type: "note" | "info" | "confirmation" | "notice";
  title?: string;
  text: string;
}

export interface LegalSection {
  id: string;
  sectionNumber: string;
  title: string;
  content: string[];
  subsections?: LegalSubsection[];
  callout?: LegalSectionCallout;
}

export interface LegalPageData {
  slug: string;
  eyebrow: string;
  title: string;
  introduction: string;
  lastUpdated: string;
  readingTime: string;
  sections: LegalSection[];
  relatedLink: {
    label: string;
    title: string;
    href: string;
  };
}
