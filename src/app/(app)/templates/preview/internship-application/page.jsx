import Topbar from "@/components/Topbar";
import { Inter } from "next/font/google";
import React from "react";
import InternshipApplication from "@/components/TemplatePreview/InternshipApplication";

export const metadata = {
  title: "Pre-Built Internship Application Form | Instant Hiring Link",
  description:
    "Streamline your student hiring process. Deploy our ready-made internship application template instantly, get a standalone URL, and track all candidate submissions in one organized dashboard.",
  keywords: [
    "internship recruitment form",
    "student internship application link",
    "pre-built intern hiring form",
    "collect student applications online",
    "intern applicant tracker dashboard",
    "university hiring template",
    "no code internship form",
  ],

  alternates: {
    canonical:
      "https://formplate.andicode.com/templates/preview/internship-application",
  },
};

const schema = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Predefined Online Internship Application Form",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "FormPlate provides a pre-configured student recruitment tool that allows businesses to generate a direct application link and manage incoming intern profiles in a unified dashboard.",
    brand: {
      "@type": "Brand",
      name: "FormPlate",
    },
    provider: {
      "@type": "Organization",
      name: "FormPlate",
      url: "https://formplate.andicode.com",
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
        name: "Do I need to design the intern questionnaire from scratch?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No, our intern hiring template is already pre-configured with standard fields to capture candidate details and academic backgrounds uniformly. You bypass the form-building phase entirely.",
        },
      },
      {
        "@type": "Question",
        name: "How do I distribute this application to potential interns?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Instantly upon selection, you receive a custom public URL. You can easily post this link on university job boards, LinkedIn, your company's career page, or send it directly to student networks.",
        },
      },
      {
        "@type": "Question",
        name: "Where can I review the submitted student applications?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Every candidate's submission is automatically compiled into your private FormPlate workspace. You can easily screen, sort, and manage your entire intern pipeline without sorting through cluttered email inboxes.",
        },
      },
      {
        "@type": "Question",
        name: "Does it cost anything to use this student recruitment tool?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No, generating the standalone application URL and organizing your intern candidates within the dashboard is completely free of charge.",
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