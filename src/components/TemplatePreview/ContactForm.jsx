"use client";
import React from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AuthChecking } from "@/utils/auth/AuthChecking";
import { createFormFromTemplate } from "@/utils/forms/CreatingTemplate";

import {
  ArrowLeft,
  Check,
  CheckCircle2,
  User,
  Mail,
  Phone,
  MessageSquare,
  Send,
  HelpCircle,
  AlertCircle,
} from "lucide-react";

// 1. SEO CONFIGURATION
export const metadata = {
  title: "Free Online Contact Form Builder | Create & Share in Seconds",
  description:
    "Create a professional contact form for your business instantly. No coding required. Customize fields, share your link, and start collecting submissions today.",
  keywords: [
    "online contact form builder",
    "free form creator",
    "lead generation form",
    "saas contact form",
    "customer support ticket system",
    "no-code form builder",
  ],
  openGraph: {
    title: "Create Your Professional Contact Form",
    description:
      "Start collecting leads and support tickets instantly with this ready-to-use template.",
    type: "website",
    url: "https://formflow.com/templates/preview/contact-form",
    siteName: "FormFlow",
    locale: "en_US",
  },
  alternates: {
    canonical: "https://formflow.com/templates/contact-form",
  },
};

const TEMPLATE_NAME = "contact-form";

const API = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

export default function ContactForm() {
  const router = useRouter();

  const [showModal, setShowModal] = React.useState(false);
  const [createdForm, setCreatedForm] = React.useState(null);
  const [isUsed, setIsUsed] = React.useState(false);
  const [checkingStatus, setCheckingStatus] = React.useState(true);

  // 2. SCHEMA MARKUP
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "FormFlow Contact Form Builder",
    applicationCategory: "BusinessApplication",
    description:
      "An online tool to create professional contact forms and collect submissions instantly.",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    featureList:
      "Real-time notifications, Spam protection, Dashboard analytics",
  };

  React.useEffect(() => {
    checkTemplateUsage();
  }, []);

  const checkTemplateUsage = async () => {
    try {
      const res = await axios.get(`${API}/form/templates-used/check`, {
        withCredentials: true,
      });

      if (res.data?.success) {
        const used = res.data.forms.some((form) => form.name === TEMPLATE_NAME);
        setIsUsed(used);
      }
    } catch (error) {
      // user not logged in → ignore
    } finally {
      setCheckingStatus(false);
    }
  };

  const useTemplateHandler = async () => {
    if (isUsed) return;

    try {
      const isLoggedIn = await AuthChecking();

      if (isLoggedIn) {
        const res = await createFormFromTemplate(TEMPLATE_NAME);

        if (res?.success) {
          const publicUrl = `${window.location.origin}/${res.formName}/${res.formId}`;

          setCreatedForm({
            formId: res.formId,
            formName: res.formName,
            publicUrl,
          });

          setIsUsed(true); // 🔥 instant UI update
          setShowModal(true);
        }
      }
    } catch (error) {
      const currentPath = window.location.pathname + window.location.search;

      router.push(`/signin?redirect=${encodeURIComponent(currentPath)}`);
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 p-4 md:p-8">
      {/* Inject Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* TOP NAVIGATION */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 md:mb-8">
        <div className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors">
          <ArrowLeft size={20} />
          <Link href="/templates" className="font-medium">
            Back to Templates
          </Link>
        </div>

        <button
          onClick={useTemplateHandler}
          disabled={checkingStatus || isUsed}
          className={`flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg font-bold shadow-md transition-all w-full md:w-auto
    ${
      checkingStatus
        ? "bg-slate-200 cursor-not-allowed"
        : isUsed
          ? "bg-slate-300 text-slate-600 cursor-not-allowed"
          : "bg-[#1e3a8a] hover:bg-[#172554] text-white"
    }
  `}
        >
          {checkingStatus ? (
            <span className="h-4 w-24 rounded bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 animate-pulse" />
          ) : isUsed ? (
            <>
              <CheckCircle2 size={18} />
              <span>Template already used</span>
            </>
          ) : (
            <>
              <Check size={20} />
              <span>Use This Template</span>
            </>
          )}
        </button>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT SIDE: SAAS PRODUCT INFO */}
        <div className="lg:col-span-4 space-y-8 order-2 lg:order-1">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              General Contact Form
            </h1>

            <div className="space-y-6">
              <section>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Start collecting messages
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                  Launch a professional contact channel for your audience in
                  seconds.
                  <strong>Use this template</strong> to create a live form,
                  generate a shareable link, and manage all your incoming
                  messages from your centralized dashboard.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  Powerful features
                </h3>
                <ul className="space-y-3">
                  {[
                    "Instant Email Notifications",
                    "Share via Direct Link or Embed",
                    "Spam Protection Included",
                    "Auto-Reply to Senders",
                    "Export Data to CSV/Excel",
                    "Works on Mobile & Desktop",
                  ].map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2.5 text-slate-600 text-sm md:text-base"
                    >
                      {/* Orange checks to match theme */}
                      <CheckCircle2
                        size={18}
                        className="text-orange-600 mt-0.5 shrink-0"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  Perfect for
                </h3>
                <div className="flex flex-wrap gap-2">
                  {/* Orange-themed tags */}
                  {[
                    "Customer Support",
                    "Sales Inquiries",
                    "Feedback Collection",
                    "Event Questions",
                    "Client Onboarding",
                  ].map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-xs md:text-sm font-medium border border-orange-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: FORM PREVIEW */}
        <div className="lg:col-span-8 order-1 lg:order-2">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden relative">
            {/* THE FORM CONTENT */}
            {/* 3. NEW THEME: Orange & Amber Gradient */}
            <div className="bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 p-4 md:p-10 relative overflow-hidden">
              {/* Decorative Blobs */}
              <div className="absolute top-0 left-0 w-64 h-64 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-x-1/2 translate-y-1/2"></div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/50 overflow-hidden relative z-10">
                {/* Form Header */}
                <div className="bg-gradient-to-r from-orange-500 to-amber-600 p-6 md:p-8 text-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
                  <h2 className="text-xl md:text-3xl font-bold text-white mb-2 relative z-10">
  Get in Touch
</h2>

                  <p className="text-orange-50 text-xs md:text-sm relative z-10">
                    We are here to help. Send us a message and we'll respond
                    ASAP.
                  </p>
                </div>

                {/* Form Fields */}
                <div className="p-5 md:p-8 space-y-8">
                  {/* SECTION 1: Who You Are */}
                  <section>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="bg-orange-100 p-2 rounded-lg text-orange-700">
                        <User size={20} />
                      </div>
                      <h3 className="text-lg font-bold text-slate-800">
                        Your Information
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div className="group">
                        <label className="block text-sm font-semibold text-slate-600 mb-2">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-orange-100 transition-all"
                          placeholder="John Doe"
                        />
                      </div>

                      <div className="space-y-4">
                        <div className="relative">
                          <label className="block text-sm font-semibold text-slate-600 mb-2">
                            Email Address{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <Mail
                            className="absolute left-3 top-9 text-slate-400"
                            size={16}
                          />
                          <input
                            type="email"
                            className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-orange-100 transition-all"
                            placeholder="you@example.com"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-4">
                      <div className="relative">
                        <label className="block text-sm font-semibold text-slate-600 mb-2">
                          Phone Number (Optional)
                        </label>
                        <Phone
                          className="absolute left-3 top-9 text-slate-400"
                          size={16}
                        />
                        <input
                          type="tel"
                          className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-orange-100 transition-all"
                          placeholder="(555) 000-0000"
                        />
                      </div>
                    </div>
                  </section>

                  <hr className="border-slate-100" />

                  {/* SECTION 2: Message Details */}
                  <section>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="bg-amber-100 p-2 rounded-lg text-amber-700">
                        <MessageSquare size={20} />
                      </div>
                      <h3 className="text-lg font-bold text-slate-800">
                        Message Details
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div className="relative">
                        <label className="block text-sm font-semibold text-slate-600 mb-2">
                          Topic / Reason
                        </label>
                        <HelpCircle
                          className="absolute left-3 top-9 text-slate-400"
                          size={16}
                        />
                        <select className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-3 py-2.5 text-sm text-slate-600 outline-none focus:ring-2 focus:ring-orange-100">
                          <option>General Inquiry</option>
                          <option>Customer Support</option>
                          <option>Sales & Pricing</option>
                          <option>Partnership Proposal</option>
                          <option>Feedback / Suggestion</option>
                          <option>Other</option>
                        </select>
                      </div>

                      <div className="relative">
                        <label className="block text-sm font-semibold text-slate-600 mb-2">
                          Priority Level
                        </label>
                        <AlertCircle
                          className="absolute left-3 top-9 text-slate-400"
                          size={16}
                        />
                        <select className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-3 py-2.5 text-sm text-slate-600 outline-none focus:ring-2 focus:ring-orange-100">
                          <option>Normal</option>
                          <option>Low</option>
                          <option>High / Urgent</option>
                        </select>
                      </div>
                    </div>

                    <div className="mt-4 md:mt-6">
                      <label className="block text-sm font-semibold text-slate-600 mb-2">
                        Subject <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-orange-100 transition-all"
                        placeholder="Brief summary of your request"
                      />
                    </div>

                    <div className="mt-4 md:mt-6">
                      <label className="block text-sm font-semibold text-slate-600 mb-2">
                        Your Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        className="w-full bg-white border border-slate-200 rounded-xl p-4 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-orange-100 resize-none transition-all"
                        placeholder="How can we help you today? Please provide as much detail as possible..."
                        rows={5}
                      ></textarea>
                    </div>
                  </section>

                  <hr className="border-slate-100" />

                  {/* Submit Button (Orange/Amber Gradient) */}
                  <button className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white py-3.5 rounded-xl font-bold shadow-lg transition-transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
                    <Send size={18} />
                    <span>Send Message</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= CONTACT SEO SECTION ================= */}
<div className="max-w-7xl mx-auto mt-20 space-y-16">

  {/* INTRO */}
  <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8 md:p-12">
    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
      Predefined Online Contact Form with Shareable Link
    </h2>

    <div className="grid md:grid-cols-2 gap-8 text-slate-600 text-sm md:text-base leading-relaxed">
      <p>
        This contact form is a ready-to-use predefined template designed
        for businesses, startups, agencies, and service providers.
        There is no need to edit or customize the structure.
        Simply create the form and generate a public contact form link.
      </p>

      <p>
        Visitors can submit inquiries, support requests, or feedback
        through a structured contact form. All messages are securely
        stored inside your dashboard for organized review and response.
      </p>
    </div>
  </div>

  {/* HOW IT WORKS */}
  <div className="bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 rounded-2xl p-8 md:p-12 border border-slate-100">
    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 text-center">
      How the Contact Form Works
    </h2>

    <div className="grid md:grid-cols-4 gap-6 text-center">
      {[
        "Click 'Use This Template' to create your contact form.",
        "A public contact form link is generated instantly.",
        "Share the link on your website or social media.",
        "View and manage all contact submissions in your submissions."
      ].map((step, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-sm p-6 border border-slate-100"
        >
          <div className="w-10 h-10 mx-auto mb-4 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center font-bold">
            {index + 1}
          </div>
          <p className="text-slate-600 text-sm md:text-base">{step}</p>
        </div>
      ))}
    </div>
  </div>

  {/* BENEFITS */}
  <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8 md:p-12">
    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">
      Why Use a Structured Contact Form?
    </h2>

    <div className="grid md:grid-cols-2 gap-6">
      {[
        "Collect standardized contact information",
        "Organize customer messages in one dashboard",
        "Avoid lost emails and scattered inquiries",
        "Free and easy to share",
        "No customization required",
        "Centralized message management"
      ].map((benefit, index) => (
        <div
          key={index}
          className="flex items-start gap-3 bg-slate-50 p-4 rounded-lg border border-slate-100"
        >
          <CheckCircle2 size={18} className="text-orange-600 mt-1" />
          <span className="text-slate-700 text-sm md:text-base">
            {benefit}
          </span>
        </div>
      ))}
    </div>
  </div>

  {/* FAQ */}
  <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8 md:p-12 mb-10">
    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">
      Frequently Asked Questions
    </h2>

    <div className="space-y-6 text-slate-600 text-sm md:text-base">
      <div>
        <h3 className="font-semibold text-slate-900 mb-2">
          Can I edit the contact form structure?
        </h3>
        <p>
          No, this is a predefined contact form template designed to collect
          consistent and structured messages without customization.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-slate-900 mb-2">
          How do I share the contact form?
        </h3>
        <p>
          After creating the form, you receive a public link that can be
          shared on your website, social media, or via email.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-slate-900 mb-2">
          Where are contact messages stored?
        </h3>
        <p>
          All contact submissions are securely stored in your submissions section
          where you can review and manage inquiries.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-slate-900 mb-2">
          Is this contact form free?
        </h3>
        <p>
          Yes, you can create and share this predefined contact form at no cost.
        </p>
      </div>
    </div>
  </div>

</div>

      {showModal && createdForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 sm:p-8 shadow-xl relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              ✕
            </button>

            <div className="flex justify-center mb-5">
              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-green-600 text-2xl">✓</span>
              </div>
            </div>

            <h2 className="text-xl font-semibold text-center text-slate-900">
              Form created successfully
            </h2>

            <p className="text-sm text-slate-500 text-center mt-2 mb-6">
              Your contact form is ready to collect messages.
            </p>

            <label className="block text-xs font-medium text-slate-500 mb-2">
              Public form URL
            </label>

            <div className="bg-orange-50 border border-orange-100 rounded-lg px-3 py-2 flex items-center justify-between gap-2">
              <span className="text-sm text-slate-700 truncate">
                {createdForm.publicUrl}
              </span>
              <button
                onClick={() =>
                  navigator.clipboard.writeText(createdForm.publicUrl)
                }
                className="text-orange-700 text-xs font-medium"
              >
                Copy link
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
              <button
                onClick={() => window.open(createdForm.publicUrl, "_blank")}
                className="border border-slate-300 rounded-lg py-2.5 text-sm font-medium"
              >
                View live form
              </button>

              <button
                onClick={() => router.push("/submissions")}
                className="bg-[#1e3a8a] hover:bg-[#172554] text-white rounded-lg py-2.5 text-sm font-medium"
              >
                Open submissions
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
