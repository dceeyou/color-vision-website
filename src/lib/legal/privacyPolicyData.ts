import { LegalPageData } from "./types";

export const privacyPolicyData: LegalPageData = {
  slug: "privacy-policy",
  eyebrow: "LEGAL / INFORMATION",
  title: "Privacy Policy",
  introduction:
    "Your privacy matters to us. This policy explains how Color Vision collects, uses and protects personal information when you visit our website or contact us about our services.",
  lastUpdated: "November 25, 2026",
  readingTime: "~6 min read",
  relatedLink: {
    label: "Related Agreement",
    title: "Terms & Conditions",
    href: "/terms-and-conditions",
  },
  sections: [
    {
      id: "introduction",
      sectionNumber: "01",
      title: "Introduction",
      content: [
        "This Privacy Policy outlines the practices of Color Vision (\"we,\" \"us,\" or \"our\") regarding the collection, processing, use, and protection of personal data provided through our website (colorvision.lk) or via direct studio correspondence.",
        "Color Vision is an independent creative and digital design studio based in Colombo, Sri Lanka, providing brand identity design, UI/UX design, digital product design, web development, design systems, and visual communication services.",
      ],
      callout: {
        type: "confirmation",
        title: "Studio Entity Disclosure",
        text: "Color Vision operates as an independent design studio headquartered in Colombo, Sri Lanka. If your formal business operates under a registered entity name or official company number, that confirmed registration detail should be verified here prior to regulatory filing.",
      },
    },
    {
      id: "information-we-collect",
      sectionNumber: "02",
      title: "Information We Collect",
      content: [
        "We collect only the personal information necessary to provide our design services, communicate effectively with clients and prospective partners, and operate our website reliably.",
      ],
      subsections: [
        {
          subtitle: "Information Voluntarily Provided by Visitors",
          paragraphs: [
            "When you submit a project inquiry through our online contact form, request a consultation, or email us directly, we collect the details you voluntarily furnish:",
          ],
          bulletPoints: [
            "Full name and professional title",
            "Email address",
            "Phone number or direct messaging handle (e.g., WhatsApp)",
            "Company name and website URL",
            "Project scope, budget parameters, and creative requirements",
            "Any additional attachments, design briefs, or background notes you include",
          ],
        },
        {
          subtitle: "Information Collected Automatically",
          paragraphs: [
            "When you browse our website, our hosting environment and edge network may log standard, non-personally identifiable technical telemetry necessary for routing and site security:",
          ],
          bulletPoints: [
            "Internet Protocol (IP) address",
            "Browser type, version, and operating system",
            "Referring website URL and exit pages",
            "Timestamps of requests and server response codes",
          ],
        },
      ],
    },
    {
      id: "how-we-use-information",
      sectionNumber: "03",
      title: "How We Use Information",
      content: [
        "Color Vision processes personal information strictly for legitimate commercial, operational, and client communication purposes. Specifically, your data is used to:",
      ],
      subsections: [
        {
          subtitle: "Core Uses",
          paragraphs: [],
          bulletPoints: [
            "Review and respond to incoming project inquiries and studio correspondence",
            "Evaluate project scope, feasibility, and deliver tailored design proposals",
            "Execute client agreements, project milestones, design handoffs, and invoicing",
            "Maintain the security, stability, and diagnostic performance of our website",
            "Comply with applicable legal, accounting, and tax recordkeeping obligations",
          ],
        },
        {
          subtitle: "No Marketing Exploitation",
          paragraphs: [
            "We do not sell, rent, monetize, or broker your personal information. We do not use your contact information for unsolicited mass marketing or automated email sequences without explicit, affirmative consent.",
          ],
        },
      ],
    },
    {
      id: "cookies-and-analytics",
      sectionNumber: "04",
      title: "Cookies & Analytics",
      content: [
        "We believe in minimal, privacy-conscious web design. Our current website implementation does not utilize invasive behavioral advertising pixels, cross-site social media tracking cookies, or third-party marketing tags.",
        "Essential technical storage (such as session headers and CDN cache keys) may be deployed strictly to enable responsive rendering, web font display, and security firewall operations.",
        "Should Color Vision implement privacy-first aggregate analytics in the future to understand general visitor counts or geographical distribution, this section will be updated with full disclosure of the tool and data retention parameters.",
      ],
      callout: {
        type: "notice",
        title: "Notice: Zero Analytics Cookies Currently Deployed",
        text: "Color Vision does not currently install analytics trackers, marketing pixels, or advertising beacons on your device. Any future deployment of privacy-focused aggregate analytics will be transparently disclosed here.",
      },
    },
    {
      id: "sharing-information",
      sectionNumber: "05",
      title: "Sharing Information",
      content: [
        "We treat your creative concepts and personal data with discretion. Information is shared only with trusted infrastructure providers essential to our studio operations under strict confidentiality obligations:",
      ],
      subsections: [
        {
          subtitle: "Service Providers & Infrastructure",
          paragraphs: [
            "Information may pass through or be securely stored by our verified operational infrastructure:",
          ],
          bulletPoints: [
            "Web Hosting & Edge Infrastructure (e.g., Vercel / Next.js edge platform)",
            "Transactional Email Routing Providers (e.g., Resend, standard SMTP mail systems)",
            "Professional Studio Communication Tools (e.g., official studio email and WhatsApp Business)",
          ],
        },
        {
          subtitle: "Legal & Regulatory Compliance",
          paragraphs: [
            "We may disclose personal data if required to do so by applicable law, court order, or authorized governmental authority, or where necessary to defend our legal rights, property, or client safety.",
          ],
        },
      ],
    },
    {
      id: "data-storage-and-security",
      sectionNumber: "06",
      title: "Data Storage and Security",
      content: [
        "We implement reasonable and industry-standard technical and organizational security measures to protect submitted information against unauthorized access, loss, misuse, or alteration.",
        "All data transmitted between your browser and our website is protected using Transport Layer Security (TLS/HTTPS) encryption.",
        "While we apply rigorous standards to protect our systems, no method of electronic storage or internet transmission can be certified as 100% impenetrable. Consequently, we cannot provide an absolute guarantee of total security against unforeseen security compromises.",
      ],
    },
    {
      id: "data-retention",
      sectionNumber: "07",
      title: "Data Retention",
      content: [
        "Color Vision retains personal data only for as long as is reasonably necessary to fulfill the specific purposes for which it was collected, including fulfilling client contractual agreements, addressing follow-up support, and complying with statutory accounting, tax, or legal requirements.",
        "Project inquiry records that do not result in an active client engagement are routinely reviewed and pruned from our active inboxes when no longer needed for business follow-up.",
      ],
    },
    {
      id: "your-privacy-rights",
      sectionNumber: "08",
      title: "Your Privacy Rights",
      content: [
        "Depending on your geographical location and applicable privacy laws, you may hold rights concerning the personal information we maintain about you, including:",
      ],
      subsections: [
        {
          subtitle: "Available Rights",
          paragraphs: [],
          bulletPoints: [
            "The right to request confirmation of whether we hold personal data concerning you",
            "The right to request a copy of the personal information you have provided to us",
            "The right to request the correction of inaccurate or incomplete records",
            "The right to request the deletion or erasure of your personal details, subject to overriding legal retention mandates",
          ],
        },
        {
          subtitle: "Exercising Your Rights",
          paragraphs: [
            "To submit a privacy inquiry or exercise your data rights, please email us directly at info@colorvision.lk with the subject line \"Data Privacy Request.\" We will verify your identity and review your request in accordance with applicable legal timelines.",
          ],
        },
      ],
    },
    {
      id: "third-party-links",
      sectionNumber: "09",
      title: "Third-Party Links",
      content: [
        "Our website may contain links to external third-party websites, portfolio platforms (such as Behance or Dribbble), client showcase URLs, or messaging providers (such as WhatsApp).",
        "Color Vision does not operate or control these third-party platforms. When you follow an external link, you leave our website and become subject to that operator's distinct privacy policies and terms. We encourage you to review their policies directly.",
      ],
    },
    {
      id: "policy-updates",
      sectionNumber: "10",
      title: "Policy Updates",
      content: [
        "We reserve the right to amend this Privacy Policy periodically to reflect changes in our design studio operations, website functionality, or applicable statutory standards.",
        "Any revisions will be posted directly to this page with an updated \"Last Updated\" revision date at the top of the policy. Continued use of our website following the publication of changes signifies your acknowledgment of the updated terms.",
      ],
    },
    {
      id: "contact",
      sectionNumber: "11",
      title: "Contact Information",
      content: [
        "If you have any questions, clarifications, or requests concerning this Privacy Policy or our studio data practices, please reach out directly through our verified studio channels:",
      ],
    },
  ],
};
