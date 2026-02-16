import Topbar from "@/components/Topbar";
import { Inter } from "next/font/google";
import React from "react";
import InternshipApplication from "@/components/TemplatePreview/InternshipApplication";

export const metadata = {
  title: "Online Internship Application Form with Shareable Link & Dashboard",

  description:
    "Create and share a predefined online internship application form with a public link. Collect structured internship applications and view all submissions in your dashboard. No customization required.",

  keywords: [
    "predefined internship application form",
    "online internship application form",
    "internship application form link",
    "collect internship applications online",
    "internship submission dashboard",
    "ready to use internship application form",
    "internship form with submissions",
  ],
};

const schema = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Predefined Online Internship Application Form",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "FormPlate provides a free predefined online internship application form that allows organizations to generate a shareable link and collect structured internship applications in a centralized dashboard.",
    brand: {
      "@type": "Brand",
      name: "FormPlate",
    },
    provider: {
      "@type": "Organization",
      name: "FormPlate",
      url: "https://form-plate.vercel.app",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
  },

  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Can I edit the internship application form structure?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No, this is a predefined internship application template designed to collect structured and consistent applicant information.",
        },
      },
      {
        "@type": "Question",
        name: "How do I share the internship application form?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "After creating the form, you receive a public link that can be shared via email, website, or campus announcements.",
        },
      },
      {
        "@type": "Question",
        name: "Where are internship submissions stored?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "All internship applications are securely stored inside your dashboard where you can review and manage candidate details.",
        },
      },
      {
        "@type": "Question",
        name: "Is this internship application form free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, you can create and share this predefined internship application form at no cost.",
        },
      },
    ],
  },
];

function page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div>
        <Topbar title="Internship Application" />
        <InternshipApplication />
      </div>
    </>
  );
}

export default page;
