import ContactForm from "@/components/TemplatePreview/ContactForm";
import Topbar from "@/components/Topbar";
import { Contact } from "lucide-react";
import React from "react";

export const metadata = {
  title: "Ready-to-Use Contact Form Template | Instant Shareable Link",
  description:
    "Skip the complex form builders. Use our predefined contact form template to instantly generate a shareable link and manage all customer submissions in one secure dashboard.",
  keywords: [
    "predefined contact form",
    "ready to use contact form template",
    "contact form shareable link",
    "no code contact form",
    "online contact form with dashboard",
    "instant contact form link",
    "collect contact messages online",
  ],
  alternates: {
    canonical: "https://form-plate.vercel.app/templates/preview/contact-form",
  },
};

const schema = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Template Online Contact Form",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "FormPlate provides a free, ready-to-use online contact form that allows businesses to instantly generate a shareable link and collect structured messages in a centralized dashboard.",
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
        name: "Do I need to build or edit this contact form before using it?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No setup or editing is required. FormPlate offers predefined contact form templates. You simply select the template, get your shareable link, and start collecting responses immediately without dealing with complicated drag-and-drop builders.",
        },
      },
      {
        "@type": "Question",
        name: "How do I share this online contact form with my customers?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Once you select the predefined template, you will instantly receive a unique, public shareable link. You can paste this link directly on your website, social media profiles, Linktree, or in email newsletters to start collecting messages.",
        },
      },
      {
        "@type": "Question",
        name: "Where do the contact form submissions go?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "All contact form responses are automatically collected and securely organized in your FormPlate dashboard. You can easily view, track, and manage all your customer inquiries in one centralized location without needing a separate database.",
        },
      },
      {
        "@type": "Question",
        name: "Can I use this predefined contact form template for free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, FormPlate allows you to use this ready-made contact form template, generate a custom public link, and manage your incoming submissions in the dashboard completely for free.",
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
        <Topbar title="Contact Form" />
        <ContactForm />
      </div>
    </>
  );
}

export default page;