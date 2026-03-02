import ContactForm from "@/components/TemplatePreview/ContactForm";
import Topbar from "@/components/Topbar";
import { Contact } from "lucide-react";
import React from "react";

export const metadata = {
  title:
    "Template Contact Form with Shareable Link || Collect Submissions in Dashboard",
  description:
    "Create a predefined contact form instantly. Generate a public link and collect structured contact messages in your dashboard. No customization required.",
  keywords: [
    "predefined contact form",
    "online contact form with submissions",
    "contact form shareable link",
    "collect messages online",
    "contact form submission dashboard",
    "ready to use contact form template",
  ],

  alternates: {
    canonical: "https://formplate.andicode.com/templates/preview/contact-form",
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
      "FormPlate provides a free predefined online contact form that allows businesses to generate a shareable link and collect structured contact messages in a centralized dashboard.",
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
        name: "Can I edit the contact form structure?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No, this is a predefined contact form template designed to collect consistent and structured messages without customization.",
        },
      },
      {
        "@type": "Question",
        name: "How do I share the contact form?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "After creating the form, you receive a public link that can be shared on your website, social media, or via email.",
        },
      },
      {
        "@type": "Question",
        name: "Where are contact messages stored?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "All contact submissions are securely stored in your dashboard where you can review and manage inquiries.",
        },
      },
      {
        "@type": "Question",
        name: "Is this contact form free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, you can create and share this predefined contact form at no cost.",
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
