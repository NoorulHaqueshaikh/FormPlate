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
  MessageSquare,
  Send,
  Star,
  ThumbsUp,
  Layers,
} from "lucide-react";



const TEMPLATE_NAME = "feedback-form";

const API = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

export default function FeedbackForm() {
  const router = useRouter();

  const [showModal, setShowModal] = React.useState(false);
  const [createdForm, setCreatedForm] = React.useState(null);
  const [isUsed, setIsUsed] = React.useState(false);
  const [checkingStatus, setCheckingStatus] = React.useState(true);

  // 2. SCHEMA MARKUP
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "FormPlate Feedback Builder",
    applicationCategory: "BusinessApplication",
    description:
      "A flexible tool to create feedback forms for any professional or personal use case.",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
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
      // not logged in → ignore
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
              General Feedback Form
            </h1>

            <div className="space-y-6">
              <section>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Collect insights from anyone
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                  A truly universal feedback tool.{" "}
                  <strong>Use this template</strong> to gather opinions from
                  employees, clients, students, or event attendees. The fields
                  are designed to be neutral and professional for any industry.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  Versatile features
                </h3>
                <ul className="space-y-3">
                  {[
                    "Satisfaction Rating Scale",
                    "Multi-Purpose Category Selector",
                    "Anonymous Submission Ready",
                    "Open-Ended Response Area",
                    "Works for Internal & External Use",
                    "Mobile & Desktop Optimized",
                  ].map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2.5 text-slate-600 text-sm md:text-base"
                    >
                      {/* Purple checks to match theme */}
                      <CheckCircle2
                        size={18}
                        className="text-purple-600 mt-0.5 shrink-0"
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
                  {/* Purple-themed tags */}
                  {[
                    "Employee Surveys",
                    "Event Reviews",
                    "Product Feedback",
                    "Course Evaluation",
                    "General Suggestions",
                  ].map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs md:text-sm font-medium border border-purple-100"
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
            {/* THEME: Purple & Fuchsia Gradient */}
            <div className="bg-gradient-to-br from-fuchsia-50 via-purple-50 to-violet-50 p-4 md:p-10 relative overflow-hidden">
              {/* Decorative Blobs */}
              <div className="absolute top-0 left-0 w-64 h-64 bg-fuchsia-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-x-1/2 translate-y-1/2"></div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/50 overflow-hidden relative z-10">
                {/* Form Header */}
                <div className="bg-gradient-to-r from-fuchsia-600 to-purple-600 p-6 md:p-8 text-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
                  <h2 className="text-xl md:text-3xl font-bold text-white mb-2 relative z-10">
                    We Value Your Feedback
                  </h2>
                  <p className="text-fuchsia-100 text-xs md:text-sm relative z-10">
                    Your input helps us improve. Please share your thoughts
                    below.
                  </p>
                </div>

                {/* Form Fields */}
                <div className="p-5 md:p-8 space-y-8">
                  {/* SECTION 1: Rating & Category */}
                  <section>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="bg-fuchsia-100 p-2 rounded-lg text-fuchsia-700">
                        <Star size={20} />
                      </div>
                      <h3 className="text-lg font-bold text-slate-800">
                        Your Experience
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div className="relative">
                        <label className="block text-sm font-semibold text-slate-600 mb-2">
                          Overall Satisfaction
                        </label>
                        <ThumbsUp
                          className="absolute left-3 top-9 text-slate-400"
                          size={16}
                        />
                        <select className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-3 py-2.5 text-sm text-slate-600 outline-none focus:ring-2 focus:ring-fuchsia-100">
                          <option>Select a rating...</option>
                          <option>Very Satisfied</option>
                          <option>Satisfied</option>
                          <option>Neutral</option>
                          <option>Dissatisfied</option>
                          <option>Very Dissatisfied</option>
                        </select>
                      </div>

                      <div className="relative">
                        <label className="block text-sm font-semibold text-slate-600 mb-2">
                          Type of Feedback
                        </label>
                        <Layers
                          className="absolute left-3 top-9 text-slate-400"
                          size={16}
                        />
                        <select className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-3 py-2.5 text-sm text-slate-600 outline-none focus:ring-2 focus:ring-fuchsia-100">
                          <option>Suggestion / Idea</option>
                          <option>Compliment / Praise</option>
                          <option>Issue / Problem</option>
                          <option>Process Improvement</option>
                          <option>General Comment</option>
                          <option>Other</option>
                        </select>
                      </div>
                    </div>
                  </section>

                  <hr className="border-slate-100" />

                  {/* SECTION 2: Details */}
                  <section>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="bg-purple-100 p-2 rounded-lg text-purple-700">
                        <MessageSquare size={20} />
                      </div>
                      <h3 className="text-lg font-bold text-slate-800">
                        Details
                      </h3>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold text-slate-600 mb-2">
                          Subject <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-fuchsia-100 transition-all"
                          placeholder="Brief summary of your feedback"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-600 mb-2">
                          Description / Comments{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          className="w-full bg-white border border-slate-200 rounded-xl p-4 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-fuchsia-100 resize-none transition-all"
                          placeholder="Please describe your experience, suggestion, or issue in detail..."
                          rows={4}
                        ></textarea>
                      </div>
                    </div>
                  </section>

                  <hr className="border-slate-100" />

                  {/* SECTION 3: Contact Info (Optional) */}
                  <section>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="bg-violet-100 p-2 rounded-lg text-violet-700">
                        <User size={20} />
                      </div>
                      <h3 className="text-lg font-bold text-slate-800">
                        Contact Information (Optional)
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div className="group">
                        <label className="block text-sm font-semibold text-slate-600 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-purple-100 transition-all"
                          placeholder="John Doe"
                        />
                      </div>

                      <div className="relative">
                        <label className="block text-sm font-semibold text-slate-600 mb-2">
                          Email Address
                        </label>
                        <Mail
                          className="absolute left-3 top-9 text-slate-400"
                          size={16}
                        />
                        <input
                          type="email"
                          className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-purple-100 transition-all"
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="consent"
                        className="rounded border-slate-300 text-fuchsia-600 focus:ring-fuchsia-500"
                      />
                      <label
                        htmlFor="consent"
                        className="text-sm text-slate-500 cursor-pointer"
                      >
                        I am open to being contacted for follow-up questions.
                      </label>
                    </div>
                  </section>

                  {/* Submit Button (Fuchsia/Purple Gradient) */}
                  <button className="w-full bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-700 hover:to-purple-700 text-white py-3.5 rounded-xl font-bold shadow-lg transition-transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
                    <Send size={18} />
                    <span>Submit Feedback</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

{/* ================= FEEDBACK SEO SECTION ================= */}
<div className="max-w-7xl mx-auto mt-20 space-y-16">

  {/* INTRO */}
  <div className="bg-white rounded-2xl shadow-lg border border-purple-100 p-8 md:p-12">
    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
      Collect Structured Feedback with a Shareable Online Form
    </h2>

    <div className="grid md:grid-cols-2 gap-8 text-slate-600 text-sm md:text-base leading-relaxed">
      <p>
        This online feedback form helps you collect structured responses from
        employees, customers, students, or event attendees. The layout ensures
        consistent information so every submission is organized and easy to
        review.
      </p>

      <p>
        Once created, you receive a public shareable link that can be distributed
        through email, website, or internal communication channels. All
        feedback responses are stored securely in your dashboard.
      </p>
    </div>
  </div>

  {/* HOW IT WORKS */}
  <div className="bg-gradient-to-br from-fuchsia-50 via-purple-50 to-violet-50 rounded-2xl p-8 md:p-12 border border-purple-100">
    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 text-center">
      How the Online Feedback Form Works
    </h2>

    <div className="grid md:grid-cols-4 gap-6 text-center">
      {[
        "Create the feedback form instantly.",
        "Generate a public shareable link.",
        "Share the link with your audience.",
        "Review and manage responses in your submissions."
      ].map((step, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-sm p-6 border border-purple-100"
        >
          <div className="w-10 h-10 mx-auto mb-4 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
            {index + 1}
          </div>
          <p className="text-slate-600 text-sm md:text-base">
            {step}
          </p>
        </div>
      ))}
    </div>
  </div>

  {/* BENEFITS */}
  <div className="bg-white rounded-2xl shadow-lg border border-purple-100 p-8 md:p-12">
    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">
      Why Use a Structured Feedback Form?
    </h2>

    <div className="grid md:grid-cols-2 gap-6">
      {[
        "Collect consistent satisfaction ratings",
        "Standardize employee or customer input",
        "Avoid scattered email responses",
        "Centralized dashboard for all feedback",
        "Shareable public link for easy distribution",
        "Free and simple to deploy"
      ].map((benefit, index) => (
        <div
          key={index}
          className="flex items-start gap-3 bg-purple-50 p-4 rounded-lg border border-purple-100"
        >
          <CheckCircle2 size={18} className="text-purple-600 mt-1" />
          <span className="text-slate-700 text-sm md:text-base">
            {benefit}
          </span>
        </div>
      ))}
    </div>
  </div>

  {/* FAQ */}
  <div className="bg-white rounded-2xl shadow-lg border border-purple-100 p-8 md:p-12 mb-10">
    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">
      Frequently Asked Questions
    </h2>

    <div className="space-y-6 text-slate-600 text-sm md:text-base">
      <div>
        <h3 className="font-semibold text-slate-900 mb-2">
          Can I customize the feedback form fields?
        </h3>
        <p>
          No, this feedback form follows a structured layout to ensure
          consistent and comparable responses.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-slate-900 mb-2">
          How do I share the feedback form?
        </h3>
        <p>
          After creating the form, you receive a public link that can be shared
          internally or externally.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-slate-900 mb-2">
          Where are responses stored?
        </h3>
        <p>
          All feedback submissions are securely stored inside your submissions section
          where you can review and manage them easily.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-slate-900 mb-2">
          Is this feedback form free to use?
        </h3>
        <p>
          Yes, you can create and share this online feedback form at no cost.
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
              Your feedback form is ready to collect responses.
            </p>

            <label className="block text-xs font-medium text-slate-500 mb-2">
              Public form URL
            </label>

            <div className="bg-purple-50 border border-purple-100 rounded-lg px-3 py-2 flex items-center justify-between gap-2">
              <span className="text-sm text-slate-700 truncate">
                {createdForm.publicUrl}
              </span>
              <button
                onClick={() =>
                  navigator.clipboard.writeText(createdForm.publicUrl)
                }
                className="text-purple-700 text-xs font-medium"
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
