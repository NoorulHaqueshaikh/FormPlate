import FeedbackForm from "@/components/TemplatePreview/FeedbackForm";
import Topbar from "@/components/Topbar";
import React from "react";

export const metadata = {
  title: "Instant Customer Feedback Template & Dashboard Tracker",
  description:
    "Gather valuable client insights without building surveys from scratch. This pre-designed review collection tool gives you a fast, public URL to capture user satisfaction data and view it in a unified admin panel.",
  keywords: [
    "client satisfaction survey",
    "pre-built review collector",
    "voice of customer form",
    "product feedback link",
    "gather user opinions online",
    "automated feedback tracker",
    "predefined survey URL",
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
      name: "Client Feedback Collection Tool",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description:
        "FormPlate offers a pre-built feedback portal that allows businesses to generate a standalone link to capture user satisfaction metrics and route them to a private admin dashboard.",
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
          name: "Do I have to configure the survey questions myself?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "There is zero configuration needed. We have already structured the fields to capture essential client insights effectively. By choosing this template, you bypass the building phase and get straight to gathering data.",
          },
        },
        {
          "@type": "Question",
          name: "What is the best way to distribute this to my audience?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The system provides a standalone, clickable URL. It works perfectly as a hyperlink in your email signatures, embedded behind a 'Leave a Review' button on your site, or sent directly to users via SMS after a purchase or support interaction.",
          },
        },
        {
          "@type": "Question",
          name: "How do I read the incoming opinions and ratings?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Every time a user submits their thoughts, the data is instantly forwarded to your private admin panel. This gives you a clear, organized overview of customer sentiment without relying on messy email threads or spreadsheets.",
          },
        },
        {
          "@type": "Question",
          name: "Are there any hidden fees for collecting these insights?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No, gathering user opinions through this specific pre-made setup is provided at zero cost, including both the sharing URL and the tracking portal.",
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