import FeedbackForm from "@/components/TemplatePreview/FeedbackForm";
import Topbar from "@/components/Topbar";
import React from "react";

export const metadata = {
  title: "Online Feedback Form with Shareable Link & Submission Dashboard",

  description:
    "Create a ready-to-use online feedback form and generate a public link instantly. Collect structured customer feedback and manage all responses in your centralized dashboard.",

  keywords: [
    "online feedback form",
    "customer feedback form template",
    "collect feedback online",
    "feedback form with submissions",
    "feedback form shareable link",
    "structured feedback collection",
  ],

  alternates: {
    canonical:
      "https://formplate.andicode.com/templates/preview/feedback-form",
  },
};

const combinedSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "Online Feedback Form with Shareable Link",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description:
        "FormPlate provides a ready-to-use online feedback form that allows organizations to generate a public link and collect structured feedback submissions in a centralized dashboard.",
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
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Can I edit the feedback form structure?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No, this is a predefined feedback form template designed to collect structured and consistent responses without customization.",
          },
        },
        {
          "@type": "Question",
          name: "How do I share the feedback form?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "After creating the form, a public shareable link is generated instantly. You can share it via email, website, or social media.",
          },
        },
        {
          "@type": "Question",
          name: "Where are feedback responses stored?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "All feedback submissions are securely stored in your dashboard where you can review and manage responses.",
          },
        },
        {
          "@type": "Question",
          name: "Is this feedback form free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, you can create and share this predefined feedback form at no cost.",
          },
        },
      ],
    },
  ],
};

function page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema) }}
      />

      <div>
        <Topbar title="Feedback Form" />
        <FeedbackForm />
      </div>
    </>
  );
}

export default page;
