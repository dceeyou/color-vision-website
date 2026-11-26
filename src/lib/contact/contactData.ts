import { ContactPageData } from "./types";

export const contactData: ContactPageData = {
  hero: {
    eyebrow: "START A CONVERSATION / CONTACT",
    headingLine1: "Have an idea?",
    headingLine2: "Let's make it matter.",
    description:
      "Tell us about your project, the challenge you're facing or the experience you want to create. Let's start with a conversation and explore what's possible.",
  },
  form: {
    heading: "Tell us about your project.",
    description:
      "Share a few details about what you're working on. The more we understand your goals, the better we can understand how to help.",
    serviceOptions: [
      "Brand Identity Design",
      "UI/UX Design",
      "Digital Product Design",
      "Web Design",
      "Design Systems",
      "Visual Communication",
      "Something Else",
    ],
    budgetOptions: [
      "< $5,000",
      "$5,000 – $10,000",
      "$10,000 – $25,000",
      "$25,000+",
      "Flexible / Undisclosed",
    ],
  },
  info: {
    heading: "Prefer a direct conversation?",
    email: "info@colorvision.lk",
    phone: "+94 76 142 8445",
    whatsappUrl: "https://wa.me/94761428445",
    location: "Sri Lanka",
  },
  whatHappensNext: {
    heading: "What happens next?",
    steps: [
      {
        number: "01",
        title: "Share your idea",
        description:
          "Tell us about your business, goals and project requirements.",
      },
      {
        number: "02",
        title: "Initial review",
        description:
          "We'll review the information you provide to understand the project.",
      },
      {
        number: "03",
        title: "Start a conversation",
        description:
          "If the project is a suitable fit, we'll discuss the next steps.",
      },
    ],
  },
};
