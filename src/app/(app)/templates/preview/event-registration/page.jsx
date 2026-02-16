import Topbar from "@/components/Topbar";
import EventRegistration from "@/components/TemplatePreview/EventRegistration";
import React from "react";

export const metadata = {
  title: "Event Registration Form Template with Shareable Link",

  description:
    "Create a ready-to-use event registration form and generate a public link instantly. Collect attendee details and manage event registrations from your dashboard.",

  keywords: [
    "event registration form template",
    "online event signup form",
    "event registration form with link",
    "collect event registrations online",
    "event attendee registration form",
    "free event registration form",
  ],
};

const combinedSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "Event Registration Form Template with Shareable Link",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: "https://form-plate.vercel.app/templates/preview/event-registration",
      description:
        "FormPlate provides a ready-to-use event registration form template that allows organizers to generate a public link and collect structured attendee registrations in a centralized dashboard.",
      isAccessibleForFree: true,
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
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Can I customize the event registration form?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No, this event registration form follows a structured template to ensure consistent attendee data collection.",
          },
        },
        {
          "@type": "Question",
          name: "How do I share the event registration form?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "After creating the form, a public registration link is generated instantly. You can share it via email, social media, or your website.",
          },
        },
        {
          "@type": "Question",
          name: "Where are event registrations stored?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "All attendee registrations are securely stored in your dashboard where you can review and manage submissions.",
          },
        },
        {
          "@type": "Question",
          name: "Is this event registration form free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, you can create and share this event registration form at no cost.",
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
        <Topbar title="Event Registration Form" />
        <EventRegistration />
      </div>
    </>
  );
}

export default page;
