import JobApplication from "@/components/TemplatePreview/JobApplication";
import Topbar from "@/components/Topbar";
import React from "react";

export const metadata = {
  title: "Predefined Job Application Form | Instant Shareable Link",
  description:
    "Skip the form builder. Use our predefined job application template to instantly generate a shareable hiring link. Collect resumes and track candidate submissions directly in your dashboard.",
  keywords: [
    "predefined job application form",
    "shareable hiring link",
    "ready to use employment form",
    "collect resumes online",
    "instant job form link",
    "candidate submission dashboard",
    "no edit recruitment form",
  ],

  alternates: {
    canonical:
      "https://form-plate.vercel.app/templates/preview/job-application",
  },
};

const schema = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Predefined Online Job Application Form",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "FormPlate provides a ready-to-use, predefined job application template. Employers can instantly generate a shareable public link and collect structured candidate submissions in a centralized dashboard without any building or editing.",
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
        name: "Can I customize or edit this job application form?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No, this is a strictly predefined job application template. It is already perfectly structured with the necessary fields for work history and resume uploads, meaning no editing is required. You simply select it and use it.",
        },
      },
      {
        "@type": "Question",
        name: "How do I collect job applications with this tool?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "When you select this ready-to-use template, the system instantly generates a unique, public shareable link. You just copy and paste this link onto your careers page, LinkedIn, or job boards to start getting submissions immediately.",
        },
      },
      {
        "@type": "Question",
        name: "Where do I view the submitted resumes and candidate details?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You do not need to sort through emails. All applicant submissions, including uploaded resumes and contact info, are automatically routed to your centralized FormPlate dashboard for easy and organized review.",
        },
      },
      {
        "@type": "Question",
        name: "Is this predefined job application link free to use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, using this predefined employment form, generating the shareable link, and tracking all candidate submissions in your dashboard is completely free.",
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