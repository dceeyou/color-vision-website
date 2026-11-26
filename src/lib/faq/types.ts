export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface FAQData {
  eyebrow: string;
  heading: string;
  description: string;
  items: FAQItem[];
}
