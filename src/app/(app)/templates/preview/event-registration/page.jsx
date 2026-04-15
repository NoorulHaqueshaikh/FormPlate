import Topbar from "@/components/Topbar";
import EventRegistration from "@/components/TemplatePreview/EventRegistration";
import React from "react";

export const metadata = {
  title: "Event Registration Form Template with Shareable Link",
  description:
    "Host your next event with zero setup. Use our predefined event registration form template to instantly get a shareable link and manage all RSVP submissions in one secure dashboard.",
  keywords: [
    "predefined event registration form",
    "ready to use event signup template",
    "event registration shareable link",
    "no code event rsvp form",
    "online attendee registration dashboard",
    "instant event form link",
    "collect event signups online",
  ],

  alternates: {
    canonical:
      "https://formplate.andicode.com/templates/preview/event-registration",
  },
};

const combinedSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "Event Registration Form Template with Shareable Link",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: "https://formplate.andicode.com/templates/preview/event-registration",
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
          name: "Do I need technical skills to build this event registration form?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Not at all. FormPlate provides a predefined event signup template. You do not need to drag-and-drop or edit any fields. Just select the template, and your form is instantly ready to accept attendees.",
          },
        },
        {
          "@type": "Question",
          name: "How do I invite attendees using this registration template?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The moment you select the template, FormPlate generates a custom, public shareable link. You can send this link to your guest list via email, post it on social media, or drop it in WhatsApp groups to start collecting RSVPs.",
          },
        },
        {
          "@type": "Question",
          name: "Where can I see the list of registered event attendees?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "All completed registrations and guest details are automatically routed to your centralized FormPlate dashboard. From there, you can easily track your guest count, view attendee information, and manage your event list.",
          },
        },
        {
          "@type": "Question",
          name: "Is it free to generate a link for this event signup form?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, using our ready-made event registration template, getting your unique sharing link, and tracking your RSVPs in the dashboard is completely free.",
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