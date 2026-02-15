import JobApplication from "@/components/TemplatePreview/JobApplication";
import Topbar from "@/components/Topbar";
import React from "react";

export const metadata = {
  title:
    "Predefined Online Job Application Form | Shareable Link & Submission Dashboard",

  description:
    "Create and share a predefined online job application form with a public link. Collect structured job applications and view all submissions in your dashboard. No customization required.",

  keywords: [
    "predefined job application form",
    "online job application form",
    "shareable job application form link",
    "collect job applications online",
    "job application submission dashboard",
    "ready to use job application form",
    "job application form with submissions",
  ],
};

const schema = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Predefined Online Job Application Form",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "FormPlate provides a free predefined online job application form that allows companies to generate a shareable link and collect structured job application submissions in a centralized dashboard.",
    brand: {
      "@type": "Brand",
      name: "FormPlate",
    },
    provider: {
      "@type": "Organization",
      name: "FormPlate",
      url: "https://your-real-domain.com",
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
        name: "Can I edit the job application form structure?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No, this is a predefined job application template designed to collect consistent and structured applicant information without customization.",
        },
      },
      {
        "@type": "Question",
        name: "How do I share the job application form?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Once created, you receive a public shareable link that can be sent to candidates or embedded on your website.",
        },
      },
      {
        "@type": "Question",
        name: "Where are submissions stored?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "All job application submissions are securely stored inside your dashboard for easy access and review.",
        },
      },
      {
        "@type": "Question",
        name: "Is this job application form free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, this predefined job application form can be created and shared without cost.",
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
        <Topbar title="Job Application" />
        <JobApplication />
      </div>
    </>
  );
}

export default page;
