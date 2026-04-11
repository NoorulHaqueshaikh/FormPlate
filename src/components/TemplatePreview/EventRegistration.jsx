"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
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
  Ticket,
  Users,
  MessageSquare,
  Info,
} from "lucide-react";

const TEMPLATE_NAME = "event-registration";

const API = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

// UPDATED ARRAY WITH IMAGE PATHS FROM YOUR HOME PAGE
const SIMILAR_TEMPLATES = [
  {
    id: "contact-form",
    title: "Contact Form",
    description: "A simple, effective way for visitors to get in touch with you.",
    image: "/template-image/contact.png",
    href: "/templates/preview/contact-form", 
  },
  {
    id: "feedback-form",
    title: "Feedback Form",
    description: "Gather feedback on customer experiences to improve your services.",
    image: "/template-image/feedback.png",
    href: "/templates/preview/feedback-form",
  },
  {
    id: "job-application",
    title: "Job Application",
    description: "Collect resumes, cover letters, and candidate details efficiently.",
    image: "/template-image/job-application.png",
    href: "/templates/preview/job-application",
  },
  {
    id: "internship-application",
    title: "Internship Application",
    description: "Streamline your student recruitment process with this structured form.",
    image: "/template-image/internship.png",
    href: "/templates/preview/internship-application",
  }
];

export default function EventRegistration() {
  const router = useRouter();

  const [showModal, setShowModal] = React.useState(false);
  const [createdForm, setCreatedForm] = React.useState(null);
  const [isUsed, setIsUsed] = React.useState(false);
  const [checkingStatus, setCheckingStatus] = React.useState(true);

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

          setIsUsed(true);
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
      

      {/* TOP NAVIGATION */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 md:mb-8">
        <div className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors">
          <ArrowLeft size={20} />
          <Link href="/" className="font-medium">
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
              <span>Template Already Active</span>
            </>
          ) : (
            <>
              <Check size={20} />
              <span>Launch This Template</span>
            </>
          )}
        </button>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT SIDE: SAAS PRODUCT INFO */}
        <div className="lg:col-span-4 space-y-8 order-2 lg:order-1">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Event Registration Form
            </h1>

            <div className="space-y-6">
              <section>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  One form, any event
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                  Whether you are throwing a small get-together or hosting a massive business summit,{" "}
                  <strong>use this template</strong> to keep track of your attendees with ease. 
                  The questions are set up to work for any occasion, skipping complicated terms so you can gather RSVPs right away.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  Universal features
                </h3>
                <ul className="space-y-3">
                  {[
                    "Basic Guest Contact Details",
                    "Ticket or RSVP Choices",
                    "Group Size and Headcount",
                    "Box for Special Requests",
                    "Date and Time Options",
                    "Automatic Email Receipts",
                  ].map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2.5 text-slate-600 text-sm md:text-base"
                    >
                      <CheckCircle2
                        size={18}
                        className="text-emerald-600 mt-0.5 shrink-0"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  Works for
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Weddings",
                    "Conferences",
                    "Webinars",
                    "Concerts",
                    "Fundraisers",
                    "Private Parties",
                  ].map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs md:text-sm font-medium border border-emerald-100"
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
            {/* THEME: Emerald & Green Gradient */}
            <div className="bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 p-4 md:p-10 relative overflow-hidden">
              {/* Decorative Blobs */}
              <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-x-1/2 translate-y-1/2"></div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/50 overflow-hidden relative z-10">
                {/* Form Header */}
                <div className="bg-gradient-to-r from-emerald-600 to-green-600 p-6 md:p-8 text-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
                  <h2 className="text-xl md:text-3xl font-bold text-white mb-2 relative z-10">
                    Event Registration
                  </h2>

                  <p className="text-emerald-100 text-xs md:text-sm relative z-10">
                    We can't wait to see you! Please fill in your information below to save your seat.
                  </p>
                </div>

                {/* Form Fields */}
                <div className="p-5 md:p-8 space-y-8">
                  {/* SECTION 1: Main Contact */}
                  <section>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="bg-emerald-100 p-2 rounded-lg text-emerald-700">
                        <User size={20} />
                      </div>
                      <h3 className="text-lg font-bold text-slate-800">
                        Your Information
                      </h3>
                    </div>

                    {/* Name Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div className="group">
                        <label className="block text-sm font-semibold text-slate-600 mb-2">
                          First Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          className="w-full bg-white border border-slate-200 text-slate-800 placeholder:text-slate-500 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-100 transition-all"
                          placeholder="First Name"
                        />
                      </div>
                      <div className="group">
                        <label className="block text-sm font-semibold text-slate-600 mb-2">
                          Last Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          className="w-full bg-white border text-slate-800 placeholder:text-slate-500 border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-100 transition-all"
                          placeholder="Last Name"
                        />
                      </div>
                    </div>

                    {/* Email & Phone Row (NEW: Added Phone) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-4">
                      <div className="relative">
                        <label className="block text-sm font-semibold text-slate-600 mb-2">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <Mail
                          className="absolute left-3 top-9 text-slate-400"
                          size={16}
                        />
                        <input
                          type="email"
                          className="w-full bg-white border text-slate-800 placeholder:text-slate-500 border-slate-200 rounded-lg pl-9 pr-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-100 transition-all"
                          placeholder="email@address.com"
                        />
                      </div>
                      <div className="relative">
                        <label className="block text-sm font-semibold text-slate-600 mb-2">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <Phone
                          className="absolute left-3 top-9 text-slate-400"
                          size={16}
                        />
                        <input
                          type="tel"
                          className="w-full bg-white border text-slate-800 placeholder:text-slate-500 border-slate-200 rounded-lg pl-9 pr-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-100 transition-all"
                          placeholder="(555) 000-0000"
                        />
                      </div>
                    </div>
                  </section>

                  <hr className="border-slate-100" />

                  {/* SECTION 2: Registration Details */}
                  <section>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="bg-green-100 p-2 rounded-lg text-green-700">
                        <Ticket size={20} />
                      </div>
                      <h3 className="text-lg font-bold text-slate-800">
                        Registration Details
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      {/* Generic Ticket/Type Selector */}
                      <div className="relative">
                        <label className="block text-sm font-semibold text-slate-600 mb-2">
                          Registration Type
                        </label>
                        <select className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-600 outline-none focus:ring-2 focus:ring-emerald-100">
                          <option>General Admission</option>
                          <option>VIP / Premium Access</option>
                          <option>Virtual / Online Only</option>
                          <option>Student / Discounted</option>
                          <option>RSVP No (Can't make it)</option>
                        </select>
                      </div>

                      {/* Number of People */}
                      <div className="relative">
                        <label className="block text-sm font-semibold text-slate-600 mb-2">
                          Total Attendees
                        </label>
                        <Users
                          className="absolute left-3 top-9 text-slate-400"
                          size={16}
                        />
                        <input
                          type="number"
                          min="1"
                          className="w-full bg-white border text-slate-800 placeholder:text-slate-500 border-slate-200 rounded-lg pl-9 pr-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-100 transition-all"
                          placeholder="1"
                        />
                      </div>
                    </div>
                  </section>

                  <hr className="border-slate-100" />

                  {/* SECTION 3: Additional Notes (Universal) */}
                  <section>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="bg-teal-100 p-2 rounded-lg text-teal-700">
                        <MessageSquare size={20} />
                      </div>
                      <h3 className="text-lg font-bold text-slate-800">
                        Additional Needs
                      </h3>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-600 mb-2">
                        Special Requests{" "}
                        <span className="font-normal text-slate-400">
                          (Dietary, Accessibility, Music Requests, etc.)
                        </span>
                      </label>
                      <textarea
                        className="w-full bg-white border border-slate-200 rounded-xl p-4 text-sm text-slate-800 placeholder:text-slate-600 outline-none focus:ring-2 focus:ring-emerald-100 resize-none transition-all"
                        placeholder="Please let us know if you have any specific requirements..."
                        rows={3}
                      ></textarea>
                    </div>

                    <div className="mt-4 flex items-start gap-2">
                      <Info size={16} className="text-emerald-600 mt-0.5" />
                      <span className="text-xs text-slate-500">
                        A quick confirmation message will be sent to the email you entered above.
                      </span>
                    </div>
                  </section>

                  {/* Submit Button (Emerald Gradient) */}
                  <button className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white py-3.5 rounded-xl font-bold shadow-lg transition-transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
                    <Check size={18} />
                    <span>Confirm Registration</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= SEO INFORMATION SECTION ================= */}
<div className="max-w-7xl mx-auto mt-20 space-y-16">

  {/* SECTION 1 — INTRO */}
  <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8 md:p-12">
    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
      Event Registration Form Template with Shareable Link
    </h2>

    <div className="grid md:grid-cols-2 gap-8 text-slate-600 text-sm md:text-base leading-relaxed">
      <p>
        Our online event sign-up template makes it simple for hosts to gather guest information using a quick, shareable web link. 
        It is built to handle everything from large conferences and charity drives to private weddings and virtual workshops.
      </p>

      <p>
        As soon as you create it, every RSVP is safely saved right in your dashboard. 
        This provides a single, organized place to view your guest list, ticket choices, 
        and specific needs without having to manage messy spreadsheets.
      </p>
    </div>
  </div>

  {/* SECTION 2 — HOW IT WORKS */}
  <div className="bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 rounded-2xl p-8 md:p-12 border border-slate-100">
    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 text-center">
      How the Event Registration Form Works
    </h2>

    <div className="grid md:grid-cols-4 gap-6 text-center">
      {[
        "Generate your custom event form in seconds.",
        "Get a public link that is ready to share.",
        "Send the link out to all your expected guests.",
        "Track and organize every RSVP directly from your dashboard."
      ].map((step, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-sm p-6 border border-slate-100"
        >
          <div className="w-10 h-10 mx-auto mb-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
            {index + 1}
          </div>
          <p className="text-slate-600 text-sm md:text-base">{step}</p>
        </div>
      ))}
    </div>
  </div>

  {/* SECTION 3 — BENEFITS */}
  <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8 md:p-12">
    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">
      Why Use This Event Registration Form?
    </h2>

    <div className="grid md:grid-cols-2 gap-6">
      {[
        "Gather the exact details you need from every guest",
        "Perfect for both virtual and in-person gatherings",
        "Includes a direct web link to easily share anywhere",
        "Keep your entire guest list neatly in one place",
        "Smooth and simple for both hosts and visitors",
        "100% free to set up and distribute"
      ].map((benefit, index) => (
        <div
          key={index}
          className="flex items-start gap-3 bg-slate-50 p-4 rounded-lg border border-slate-100"
        >
          <CheckCircle2 size={18} className="text-emerald-600 mt-1" />
          <span className="text-slate-700 text-sm md:text-base">
            {benefit}
          </span>
        </div>
      ))}
    </div>
  </div>

  {/* SECTION 4 — FAQ */}
<div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8 md:p-12 mb-10">
  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">
    Frequently Asked Questions
  </h2>

  <div className="space-y-6 text-slate-600 text-sm md:text-base">

    <div>
      <h3 className="font-semibold text-slate-900 mb-2">
        Can I use this event registration form for any type of event?
      </h3>
      <p>
        Yes. This template is designed for universal use including conferences,
        weddings, webinars, fundraisers, workshops, and private gatherings.
      </p>
    </div>

    <div>
      <h3 className="font-semibold text-slate-900 mb-2">
        How do I share the event registration form?
      </h3>
      <p>
        After creating the form, you receive a public shareable link that can be
        sent to attendees via email, social media, or your website.
      </p>
    </div>

    <div>
      <h3 className="font-semibold text-slate-900 mb-2">
        Where can I see the registrations?
      </h3>
      <p>
        All event registrations are stored securely inside your dashboard,
        allowing you to manage attendees in one centralized location.
      </p>
    </div>

    <div>
      <h3 className="font-semibold text-slate-900 mb-2">
        Is this event registration form free to use?
      </h3>
      <p>
        Yes. You can create and share the event registration form at no cost.
      </p>
    </div>

  </div>
</div>

  {/* ================= SECTION 5 — SIMILAR TEMPLATES (UPDATED WITH IMAGES) ================= */}
  <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8 md:p-12 mb-10">
    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
      Explore Similar Templates
    </h2>
    <p className="text-slate-600 mb-8 text-sm md:text-base">
      Need to collect a different kind of information? Browse through these other ready-to-use form templates to find exactly what you need.
    </p>

    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {SIMILAR_TEMPLATES.map((template) => (
        <li key={template.id} className="group flex flex-col h-full">
          <Link 
            href={template.href}
            className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {/* Preview Image Area */}
            <div className="h-40 bg-slate-100 relative w-full border-b border-slate-100">
              <div className="absolute inset-0 flex items-center justify-center text-slate-400 bg-slate-50">
                <span className="text-sm font-medium">Preview Image</span>
              </div>
              <Image
                src={template.image}
                alt={`${template.title} Template`}
                fill
                className="object-cover md:object-top md:pt-0.4 relative z-10"
              />
            </div>
            
            {/* Card Text Content */}
            <div className="p-5 flex flex-col flex-1 bg-white group-hover:bg-slate-50 transition-colors">
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                {template.title}
              </h3>
              <p className="text-sm text-slate-500 mt-2 mb-4 flex-1 leading-relaxed">
                {template.description}
              </p>
              
              {/* Call to Action Link */}
              <div className="mt-auto flex items-center text-sm font-semibold text-emerald-600 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                View Template <ArrowLeft size={16} className="ml-1 rotate-180" />
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
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
              Your new event sign-up page is now live.
            </p>

            <label className="block text-xs font-medium text-slate-500 mb-2">
              Public form URL
            </label>

            <div className="bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-2 flex items-center justify-between gap-2">
              <span className="text-sm text-slate-700 truncate">
                {createdForm.publicUrl}
              </span>
              <button
                onClick={() =>
                  navigator.clipboard.writeText(createdForm.publicUrl)
                }
                className="text-emerald-700 text-xs font-medium"
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