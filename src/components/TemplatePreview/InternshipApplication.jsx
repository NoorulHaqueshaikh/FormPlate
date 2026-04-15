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
  GraduationCap,
  Briefcase,
  Calendar,
  Clock,
  FileText,
  Upload,
  MapPin,
  Globe,
} from "lucide-react";

const TEMPLATE_NAME = "internship-application";

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
    id: "event-registration",
    title: "Event Registration",
    description: "Manage attendee sign-ups and gather dietary requirements easily.",
    image: "/template-image/event-registration.png",
    href: "/templates/preview/event-registration",
  }
];

export default function InternshipApplication() {
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
    <div className="w-full min-h-screen bg-gray-50 p-4 md:p-8">
      

      {/* 1. TOP NAVIGATION */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 md:mb-8">
        <div className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors">
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
        ? "bg-gray-200 cursor-not-allowed"
        : isUsed
          ? "bg-gray-300 text-gray-600 cursor-not-allowed"
          : "bg-[#1e3a8a] hover:bg-[#172554] text-white"
    }
  `}
        >
          {checkingStatus ? (
            <span className="h-4 w-24 rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
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
        {/* 2. LEFT SIDE: TEMPLATE INFO */}
        <div className="lg:col-span-4 space-y-8 order-2 lg:order-1">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Internship Application
            </h1>

            <div className="space-y-6">
              <section>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  About this template
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  An easy-to-use internship form made for any type of business. 
                  Whether you need interns for the summer, co-ops, or training programs, 
                  this form helps you quickly get the skills and schedule details you need from students.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  What's included
                </h3>
                <ul className="space-y-3">
                  {[
                    "Candidate Contact Information",
                    "Education & Training Background",
                    "Internship Area of Interest",
                    "Availability & Start Date",
                    "Portfolio / Social Link Field",
                    "Resume & Cover Letter Uploads",
                  ].map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2.5 text-gray-600 text-sm md:text-base"
                    >
                      <CheckCircle2
                        size={18}
                        className="text-green-600 mt-0.5 shrink-0"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Ideal for
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Startups",
                    "Corporate Programs",
                    "Non-Profits",
                    "Agencies",
                    "Small Business",
                  ].map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs md:text-sm font-medium border border-blue-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* 3. RIGHT SIDE: FORM PREVIEW */}
        <div className="lg:col-span-8 order-1 lg:order-2">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden relative">
            {/* THE FORM CONTENT */}
            <div className="bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 p-4 md:p-10 relative overflow-hidden">
              {/* Decorative Blobs */}
              <div className="absolute top-0 left-0 w-64 h-64 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-x-1/2 translate-y-1/2"></div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/50 overflow-hidden relative z-10">
                {/* Form Header */}
                <div className="bg-gradient-to-r from-[#0f766e] to-[#0ea5e9] p-6 md:p-8 text-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
                  <h2 className="text-xl md:text-3xl font-bold text-white mb-2 relative z-10">
                    Internship Application
                  </h2>

                  <p className="text-teal-50 text-xs md:text-sm relative z-10">
                    We want to help build future leaders. Send in your details below to become part of our team.
                  </p>
                </div>

                {/* Form Fields */}
                <div className="p-5 md:p-8 space-y-8">
                  {/* SECTION 1: Personal Details */}
                  <section>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="bg-teal-100 p-2 rounded-lg text-teal-700">
                        <User size={20} />
                      </div>
                      <h3 className="text-lg font-bold text-gray-800">
                        Candidate Details
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div className="group">
                        <label className="block text-sm font-semibold text-gray-600 mb-2">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            className="w-full bg-white border text-slate-800 placeholder:text-slate-500 border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-100"
                            placeholder="First Name"
                          />
                          <input
                            type="text"
                            className="w-full bg-white border text-slate-800 placeholder:text-slate-500 border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-100"
                            placeholder="Last Name"
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="relative">
                          <label className="block text-sm font-semibold text-gray-600 mb-2">
                            Email Address{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <Mail
                            className="absolute left-3 top-9 text-gray-400"
                            size={16}
                          />
                          <input
                            type="email"
                            className="w-full bg-white border text-slate-800 placeholder:text-slate-500 border-gray-200 rounded-lg pl-9 pr-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-100"
                            placeholder="you@example.com"
                          />
                        </div>
                        <div className="relative">
                          <label className="block text-sm font-semibold text-gray-600 mb-2">
                            Phone
                          </label>
                          <Phone
                            className="absolute left-3 top-9 text-gray-400"
                            size={16}
                          />
                          <input
                            type="tel"
                            className="w-full bg-white border text-slate-800 placeholder:text-slate-500 border-gray-200 rounded-lg pl-9 pr-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-100"
                            placeholder="(555) 000-0000"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-4 md:mt-6">
                      <div className="relative">
                        <label className="block text-sm font-semibold text-gray-600 mb-2">
                          Portfolio / LinkedIn Profile
                        </label>
                        <Globe
                          className="absolute left-3 top-9 text-gray-400"
                          size={16}
                        />
                        <input
                          type="url"
                          className="w-full bg-white border text-slate-800 placeholder:text-slate-500 border-gray-200 rounded-lg pl-9 pr-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-100"
                          placeholder="https://"
                        />
                      </div>
                      <div className="relative">
                        <label className="block text-sm font-semibold text-gray-600 mb-2">
                          Current City
                        </label>
                        <MapPin
                          className="absolute left-3 top-9 text-gray-400"
                          size={16}
                        />
                        <input
                          type="text"
                          className="w-full bg-white border text-slate-800 placeholder:text-slate-500 border-gray-200 rounded-lg pl-9 pr-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-100"
                          placeholder="City, State"
                        />
                      </div>
                    </div>
                  </section>

                  <hr className="border-gray-100" />

                  {/* SECTION 2: Background / Education */}
                  <section>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="bg-blue-100 p-2 rounded-lg text-blue-700">
                        <GraduationCap size={20} />
                      </div>
                      <h3 className="text-lg font-bold text-gray-800">
                        Background
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div className="relative">
                        <label className="block text-sm font-semibold text-gray-600 mb-2">
                          Current Status
                        </label>
                        <select className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-600 outline-none focus:ring-2 focus:ring-blue-100">
                          <option>Student (University/College)</option>
                          <option>Recent Graduate</option>
                          <option>Career Switcher / Bootcamp</option>
                          <option>Other</option>
                        </select>
                      </div>

                      <div className="relative">
                        <label className="block text-sm font-semibold text-gray-600 mb-2">
                          Institution / School Name
                        </label>
                        <input
                          type="text"
                          className="w-full bg-white border text-slate-800 placeholder:text-slate-500 border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-100"
                          placeholder="e.g. State University"
                        />
                      </div>

                      <div className="relative">
                        <label className="block text-sm font-semibold text-gray-600 mb-2">
                          Field of Study / Major
                        </label>
                        <input
                          type="text"
                          className="w-full bg-white border text-slate-800 placeholder:text-slate-500 border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-100"
                          placeholder="e.g. Marketing, CS, Business"
                        />
                      </div>

                      <div className="relative">
                        <label className="block text-sm font-semibold text-gray-600 mb-2">
                          Graduation / Completion Date
                        </label>
                        <Calendar
                          className="absolute left-3 top-9 text-gray-400"
                          size={16}
                        />
                        <input
                          type="date"
                          className="w-full bg-white border text-slate-800 placeholder:text-slate-500 border-gray-200 rounded-lg pl-9 pr-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-100"
                        />
                      </div>
                      <div className="md:col-span-2">
  <label className="block text-sm font-semibold text-gray-600 mb-2">
    Skills <span className="text-red-500">*</span>
  </label>
  <input
    type="text"
    disabled
    className="w-full bg-white border text-slate-800 placeholder:text-slate-500 border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-100"
    placeholder="e.g. React, Excel, Canva, SEO"
  />
  <p className="text-xs text-gray-500 mt-1">
    Separate skills with commas
  </p>
</div>

                    </div>
                  </section>

                  <hr className="border-gray-100" />

                  {/* SECTION 3: Internship Preferences */}
                  <section>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="bg-purple-100 p-2 rounded-lg text-purple-700">
                        <Briefcase size={20} />
                      </div>
                      <h3 className="text-lg font-bold text-gray-800">
                        Preferences
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-2">
                          Area of Interest
                        </label>
                        <select className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-600 outline-none focus:ring-2 focus:ring-purple-100">
                          <option>Marketing & Sales</option>
                          <option>Engineering & IT</option>
                          <option>Design & Creative</option>
                          <option>Operations & Admin</option>
                          <option>Human Resources</option>
                          <option>Finance & Accounting</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-2">
                          Preferred Duration
                        </label>
                        <select className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-600 outline-none focus:ring-2 focus:ring-purple-100">
                          <option>3 Months (Summer)</option>
                          <option>6 Months</option>
                          <option>12 Months</option>
                          <option>Flexible</option>
                        </select>
                      </div>

                      <div className="relative md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-600 mb-2">
                          Available Start Date
                        </label>
                        <Calendar
                          className="absolute left-3 top-9 text-gray-400"
                          size={16}
                        />
                        <input
                          type="date"
                          className="w-full bg-white border border-gray-200 rounded-lg pl-9 pr-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-purple-100"
                        />
                      </div>
                    </div>
                  </section>

                  <hr className="border-gray-100" />

                  {/* SECTION 4: Documents (Replaced Transcript with Cover Letter) */}
                  <section>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="bg-orange-100 p-2 rounded-lg text-orange-700">
                        <FileText size={20} />
                      </div>
                      <h3 className="text-lg font-bold text-gray-800">
                        Documents
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      {/* Resume */}
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-center bg-gray-50/50 hover:bg-white transition-colors cursor-pointer">
                        <Upload size={20} className="text-teal-600 mb-2" />
                        <span className="text-gray-900 font-semibold text-sm">
  Upload Resume <span className="text-red-500">*</span>
</span>

                        <span className="text-xs text-gray-500 mt-1">
                          PDF or DOCX
                        </span>
                      </div>

                      {/* Cover Letter Text Area */}
                      <div className="flex flex-col h-full">
                        <label className="block text-sm font-semibold text-gray-600 mb-2">
                          Cover Letter
                        </label>
                        <textarea
                          className="flex-1 w-full bg-white border text-slate-800 placeholder:text-slate-500 border-gray-200 rounded-xl p-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-orange-100 resize-none"
                          placeholder="Tell us why you want to intern with us..."
                          rows={4}
                        ></textarea>
                      </div>
                    </div>
                  </section>

                  {/* Submit Button */}
                  <button className="w-full bg-gradient-to-r from-[#0f766e] to-[#0ea5e9] hover:from-[#0d9488] hover:to-[#0284c7] text-white py-3.5 rounded-xl font-bold shadow-lg transition-transform hover:-translate-y-0.5">
                    Submit Application
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= INTERNSHIP SEO SECTION ================= */}
<div className="max-w-7xl mx-auto mt-20 space-y-16">

  {/* INTRO */}
  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-12">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
      Predefined Internship Application Form with Public Link
    </h2>

    <div className="grid md:grid-cols-2 gap-8 text-gray-600 text-sm md:text-base leading-relaxed">
      <p>
        This intern application form is a completely built template made for businesses, 
        startups, schools, and training camps. You do not have to spend time editing or 
        changing the layout. Just click to create it and get a public web link to share right away.
      </p>

      <p>
        Students and job seekers can easily upload their school history, key skills, 
        available dates, and resumes using this clean form. Every application you receive 
        is kept safely inside your main dashboard so you can review them fast.
      </p>
    </div>
  </div>

  {/* HOW IT WORKS */}
  <div className="bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 rounded-2xl p-8 md:p-12 border border-gray-100">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
      How the Internship Application Form Works
    </h2>

    <div className="grid md:grid-cols-4 gap-6 text-center">
      {[
        "Hit the button to generate your internship form right away.",
        "Get a special web link that is completely ready to use.",
        "Send the link out to students, colleges, or job boards.",
        "Read and sort through all the student answers in your dashboard."
      ].map((step, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
        >
          <div className="w-10 h-10 mx-auto mb-4 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
            {index + 1}
          </div>
          <p className="text-gray-600 text-sm md:text-base">{step}</p>
        </div>
      ))}
    </div>
  </div>

  {/* BENEFITS */}
  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-12">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
      Why Use a Structured Internship Application Form?
    </h2>

    <div className="grid md:grid-cols-2 gap-6">
      {[
        "Collect the exact same details from every student",
        "Easily handle a large number of intern applications",
        "Keep cover letters and resumes neatly in one spot",
        "Perfect for college recruiting and summer programs",
        "Ready to use with zero setup or editing",
        "100% free to create and share online"
      ].map((benefit, index) => (
        <div
          key={index}
          className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg border border-gray-100"
        >
          <CheckCircle2 size={18} className="text-green-600 mt-1" />
          <span className="text-gray-700 text-sm md:text-base">
            {benefit}
          </span>
        </div>
      ))}
    </div>
  </div>

  {/* FAQ */}
  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-12 mb-10">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
      Frequently Asked Questions
    </h2>

    <div className="space-y-6 text-gray-600 text-sm md:text-base">
      <div>
        <h3 className="font-semibold text-gray-900 mb-2">
          Do I need to design the intern questionnaire from scratch?
        </h3>
        <p>
          No, our intern hiring template is already pre-configured with standard fields to capture candidate details and academic backgrounds uniformly. You bypass the form-building phase entirely.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-gray-900 mb-2">
          How do I distribute this application to potential interns?
        </h3>
        <p>
          Instantly upon selection, you receive a custom public URL. You can easily post this link on university job boards, LinkedIn, your company's career page, or send it directly to student networks.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-gray-900 mb-2">
          Where can I review the submitted student applications?
        </h3>
        <p>
          Every candidate's submission is automatically compiled into your private FormPlate workspace. You can easily screen, sort, and manage your entire intern pipeline without sorting through cluttered email inboxes.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-gray-900 mb-2">
          Does it cost anything to use this student recruitment tool?
        </h3>
        <p>
          No, generating the standalone application URL and organizing your intern candidates within the dashboard is completely free of charge.
        </p>
      </div>
    </div>
  </div>

  {/* ================= SECTION 5 — SIMILAR TEMPLATES ================= */}
  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-12 mb-10">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
      Explore Similar Templates
    </h2>
    <p className="text-gray-600 mb-8 text-sm md:text-base">
      Not exactly what you are looking for? Check out these related forms to find the perfect fit for your workflow.
    </p>

    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {SIMILAR_TEMPLATES.map((template) => (
        <li key={template.id} className="group flex flex-col h-full">
          <Link 
            href={template.href}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {/* Preview Image Area */}
            <div className="h-40 bg-gray-100 relative w-full border-b border-gray-100">
              <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-50">
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
            <div className="p-5 flex flex-col flex-1 bg-white group-hover:bg-gray-50 transition-colors">
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                {template.title}
              </h3>
              <p className="text-sm text-gray-500 mt-2 mb-4 flex-1 leading-relaxed">
                {template.description}
              </p>
              
              {/* Call to Action Link */}
              <div className="mt-auto flex items-center text-sm font-semibold text-blue-600 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
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
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>

            <div className="flex justify-center mb-5">
              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-green-600 text-2xl">✓</span>
              </div>
            </div>

            <h2 className="text-xl font-semibold text-center text-gray-900">
              Form created successfully
            </h2>

            <p className="text-sm text-gray-500 text-center mt-2 mb-6">
              Your internship application form is ready to collect submissions.
            </p>

            <label className="block text-xs font-medium text-gray-500 mb-2">
              Public form URL
            </label>

            <div className="bg-blue-50 border border-blue-100 rounded-lg px-3 py-2 flex items-center justify-between gap-2">
              <span className="text-sm text-gray-700 truncate">
                {createdForm.publicUrl}
              </span>
              <button
                onClick={() =>
                  navigator.clipboard.writeText(createdForm.publicUrl)
                }
                className="text-blue-700 text-xs font-medium"
              >
                Copy link
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
              <button
                onClick={() => window.open(createdForm.publicUrl, "_blank")}
                className="border border-gray-300 rounded-lg py-2.5 text-sm font-medium"
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