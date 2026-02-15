import React from "react";
import Topbar from "@/components/Topbar";
import Templates from "@/components/Templates";

export const metadata = {
  title:
    "FormPlate: Ready-to-Use Online Form Templates | Collect Submissions Instantly",
  description:
    "FormPlate provides structured online form templates like job application, contact, feedback, and event registration. Generate a public link and receive organized submissions in your dashboard instantly.",
  keywords: [
    "online form templates",
    "ready made forms",
    "collect submissions online",
    "form link generator",
    "structured form workflow",
    "form dashboard software",
    "no customization forms",
  ],
  openGraph: {
    title: "Ready-to-Use Online Form Templates",
    description:
      "Choose a template, share a link, and collect organized responses without building forms.",
    url: "https://yourdomain.com/templates",
    siteName: "FormPlate",
    type: "website",
  },
  alternates: {
    canonical: "https://yourdomain.com/templates",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "FormPlate Ready-to-Use Form Templates",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description:
        "FormPlate provides ready-to-use structured online form templates that generate shareable links and collect organized submissions directly into a centralized dashboard.",
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
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Do I need to design the form before using it?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Each form is already structured. You only create the form and start collecting submissions.",
          },
        },
        {
          "@type": "Question",
          name: "How do I share the form?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "After creating a template, a public link is generated instantly. You can send it anywhere such as website, email, or social media.",
          },
        },
        {
          "@type": "Question",
          name: "Where are responses stored?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "All submissions are stored inside your dashboard in a structured format so you can easily review and manage data.",
          },
        },
        {
          "@type": "Question",
          name: "Can I customize the fields?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. These templates are fixed-structure to ensure consistent and organized submissions.",
          },
        },
        {
          "@type": "Question",
          name: "Is FormPlate free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. You can create and share forms without any cost.",
          },
        },
      ],
    },
  ],
};


function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Topbar sits at the top of the content area */}
      <Topbar title="Templates" />
      <Templates />
    </>
  );
}

export default Page;
