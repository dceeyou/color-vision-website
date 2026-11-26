export interface ContactHeroData {
  eyebrow: string;
  headingLine1: string;
  headingLine2: string;
  description: string;
}

export interface ContactInfoData {
  heading: string;
  email: string;
  phone: string;
  whatsappUrl: string;
  location: string;
}

export interface WhatHappensNextStep {
  number: string;
  title: string;
  description: string;
}

export interface WhatHappensNextData {
  heading: string;
  steps: WhatHappensNextStep[];
}

export interface ContactFormData {
  heading: string;
  description: string;
  serviceOptions: string[];
  budgetOptions: string[];
}

export interface ContactPageData {
  hero: ContactHeroData;
  form: ContactFormData;
  info: ContactInfoData;
  whatHappensNext: WhatHappensNextData;
}
