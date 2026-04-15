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
  Briefcase,
  FileText,
  Calendar,
  Upload,
  MapPin,
  Globe,
  DollarSign,
  Clock,
  Award,
} from "lucide-react";

const TEMPLATE_NAME = "job-application";

const API = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

export default function JobApplication() {
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
    <div className="w-full min-h-screen bg-gray-50 p-4 md:p-8">
      {/* 1. TOP NAVIGATION BAR */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 md:mb-8">
        <div className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors">
          <ArrowLeft size={20} />
          <Link href="/" className="font-medium">
            Back to Templates
          </Link>
        </div>

        {/* Button with Check Icon */}
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
              Job Application Form
            </h1>

            <div className="space-y-6">
              <section>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  About this template
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  A comprehensive, professionally designed job application form.
                  It goes beyond basic contact info to capture critical
                  candidate data upfront, helping you filter applicants faster.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  What's included
                </h3>
                <ul className="space-y-3">
                  {[
                    "Personal & Contact Details",
                    "Online Presence (LinkedIn/Portfolio)",
                    "Role & Salary Expectations",
                    "Experience & Start Date Calculator",
                    "Resume & Cover Letter Uploads",
                    "Skills & Certifications Field",
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
                    "HR Departments",
                    "Recruiters",
                    "SaaS Companies",
                    "Enterprises",
                    "Startups",
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
            {/* FIX: Reverted to p-4 md:p-10 to match Internship Page structure exactly. 
                This brings the form up naturally. */}
            <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4 md:p-10 relative overflow-hidden">
              {/* Decorative Blobs */}
              <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-x-1/2 translate-y-1/2"></div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/50 overflow-hidden relative z-10">
                {/* Form Header */}
                <div className="bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] p-6 md:p-8 text-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
                  <h2 className="text-xl md:text-3xl font-bold text-white mb-2 relative z-10">
                    Job Application
                  </h2>

                  <p className="text-blue-100 text-xs md:text-sm relative z-10">
                    Join our team! Please fill out the details below.
                  </p>
                </div>

                {/* Form Fields */}
                <div className="p-5 md:p-8 space-y-8">
                  {/* SECTION 1: Personal Details */}
                  <section>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="bg-blue-100 p-2 rounded-lg text-blue-700">
                        <User size={20} />
                      </div>
                      <h3 className="text-lg font-bold text-gray-800">
                        Personal Details
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
                            className="w-full bg-white text-slate-800 placeholder:text-slate-500 border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-100"
                            placeholder="First Name"
                          />
                          <input
                            type="text"
                            className="w-full bg-white text-slate-800 placeholder:text-slate-500 border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-100"
                            placeholder="Last Name"
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="relative">
                          <label className="block text-sm font-semibold text-gray-600 mb-2">
                            Email
                          </label>
                          <Mail
                            className="absolute left-3 top-9 text-gray-400"
                            size={16}
                          />
                          <input
                            type="email"
                            className="w-full bg-white text-slate-800 placeholder:text-slate-500 border border-gray-200 rounded-lg pl-9 pr-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-100"
                            placeholder="email@example.com"
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
                            className="w-full bg-white border text-slate-800 placeholder:text-slate-500 border-gray-200 rounded-lg pl-9 pr-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-100"
                            placeholder="(555) 000-0000"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-4 md:mt-6">
                      <div className="relative">
                        <label className="block text-sm font-semibold text-gray-600 mb-2">
                          Current Address
                        </label>
                        <MapPin
                          className="absolute left-3 top-9 text-gray-400"
                          size={16}
                        />
                        <input
                          type="text"
                          className="w-full bg-white border text-slate-800 placeholder:text-slate-500 border-gray-200 rounded-lg pl-9 pr-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-100"
                          placeholder="City, State"
                        />
                      </div>
                      <div className="relative">
                        <label className="block text-sm font-semibold text-gray-600 mb-2">
                          Website / LinkedIn
                        </label>
                        <Globe
                          className="absolute left-3 top-9 text-gray-400"
                          size={16}
                        />
                        <input
                          type="url"
                          className="w-full bg-white border text-slate-800 placeholder:text-slate-500 border-gray-200 rounded-lg pl-9 pr-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-100"
                          placeholder="https://"
                        />
                      </div>
                    </div>
                  </section>

                  <hr className="border-gray-100" />

                  {/* SECTION 2: Job Preferences */}
                  <section>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="bg-purple-100 p-2 rounded-lg text-purple-700">
                        <Briefcase size={20} />
                      </div>
                      <h3 className="text-lg font-bold text-gray-800">
                        Job Preferences
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-2">
                          Role Applying For{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <select className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-600 outline-none focus:ring-2 focus:ring-purple-100">
                          <option>Select a role...</option>
                          <option>Management</option>
                          <option>Sales & Marketing</option>
                          <option>Technical / Engineering</option>
                          <option>Creative / Design</option>
                        </select>
                      </div>

                      <div className="relative">
                        <label className="block text-sm font-semibold text-gray-600 mb-2">
                          Expected Salary
                        </label>
                        <DollarSign
                          className="absolute left-3 top-9 text-gray-400"
                          size={16}
                        />
                        <input
                          type="text"
                          className="w-full bg-white border text-slate-800 placeholder:text-slate-500 border-gray-200 rounded-lg pl-9 pr-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-purple-100"
                          placeholder="e.g. 50,000"
                        />
                      </div>

                      <div className="relative">
                        <label className="block text-sm font-semibold text-gray-600 mb-2">
                          Earliest Start Date
                        </label>
                        <Calendar
                          className="absolute left-3 top-9  text-gray-400"
                          size={16}
                        />
                        <input
                          type="date"
                          className="w-full bg-white border border-gray-200 rounded-lg pl-9 pr-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-purple-100"
                        />
                      </div>

                      <div className="relative">
                        <label className="block text-sm font-semibold text-gray-600 mb-2">
                          Total Experience (Years)
                        </label>
                        <Clock
                          className="absolute left-3 top-9 text-gray-400"
                          size={16}
                        />
                        <input
                          type="number"
                          className="w-full bg-white border text-slate-800 placeholder:text-slate-500 border-gray-200 rounded-lg pl-9 pr-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-purple-100"
                          placeholder="e.g. 3"
                        />
                      </div>
                    </div>

                    <div className="mt-6 relative">
                      <label className="block text-sm font-semibold text-gray-600 mb-2">
                        Key Skills or Certifications
                      </label>
                      <Award
                        className="absolute left-3 top-9 text-gray-400"
                        size={16}
                      />
                      <input
                        type="text"
                        className="w-full bg-white border text-slate-800 placeholder:text-slate-500 border-gray-200 rounded-lg pl-9 pr-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-purple-100"
                        placeholder="e.g. PMP, CPR Certified..."
                      />
                    </div>
                  </section>

                  <hr className="border-gray-100" />

                  {/* SECTION 3: Documents */}
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
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-center bg-gray-50/50 hover:bg-white transition-colors cursor-pointer">
                        <div className="bg-white p-3 rounded-full shadow-sm mb-3">
                          <Upload size={20} className="text-blue-600" />
                        </div>
                        <span className="text-gray-900 font-semibold text-sm">
                          Upload Resume
                        </span>
                        <span className="text-xs text-gray-500 mt-1">
                          PDF or DOCX
                        </span>
                      </div>

                      <div className="flex flex-col h-full">
                        <label className="block text-sm font-semibold text-gray-600 mb-2">
                          Cover Letter
                        </label>
                        <textarea
                          className="flex-1 w-full bg-white border text-slate-800 placeholder:text-slate-500 border-gray-200 rounded-xl p-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-orange-100 resize-none"
                          placeholder="Tell us why you're a great fit..."
                          rows={4}
                        ></textarea>
                      </div>
                    </div>
                  </section>

                  {/* Submit Button */}
                  <button className="w-full bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] hover:from-[#172554] hover:to-[#1d4ed8] text-white py-3.5 rounded-xl font-bold shadow-lg transition-transform hover:-translate-y-0.5">
                    Submit Application
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= SEO INFORMATION SECTION ================= */}
      <div className="max-w-7xl mx-auto mt-20 space-y-16">
        {/* SECTION 1 — INTRO CARD */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Predefined Job Application Form with Shareable Link
          </h2>

          <div className="grid md:grid-cols-2 gap-8 text-gray-600 text-sm md:text-base leading-relaxed">
            <p>
              This job application form is a ready-to-use predefined template
              designed to help companies collect job applications online in a
              structured format. There is no need to edit or customize fields.
              Simply create the form and share the public link with candidates.
            </p>

            <p>
              Every submission is stored securely in your dashboard, allowing
              you to review applicant details, resumes, and supporting documents
              in one centralized place without manual sorting.
            </p>
          </div>
        </div>

        {/* SECTION 2 — HOW IT WORKS */}
        <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl p-8 md:p-12 border border-gray-100">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
            How the Job Application Form Works
          </h2>

          <div className="grid md:grid-cols-4 gap-6 text-center">
            {[
              "Create the predefined job application form instantly.",
              "Generate a public shareable job application link.",
              "Share the link with candidates via email or website.",
              "View and manage all submissions in your dashboard.",
            ].map((step, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
              >
                <div className="w-10 h-10 mx-auto mb-4 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <p className="text-gray-600 text-sm md:text-base">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 3 — BENEFITS */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
            Why Use a Predefined Job Application Form?
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              "No form editing required",
              "Standardized applicant information",
              "Resume and document upload support",
              "Centralized submission dashboard",
              "Free and easy to share",
              "Structured data collection for faster review",
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

        {/* SECTION 4 — FAQ */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-12 mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6 text-gray-600 text-sm md:text-base">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Can I customize or edit this job application form?
              </h3>
              <p>
                No, this is a strictly predefined job application template. It is already perfectly structured with the necessary fields for work history and resume uploads, meaning no editing is required. You simply select it and use it.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                How do I collect job applications with this tool?
              </h3>
              <p>
                When you select this ready-to-use template, the system instantly generates a unique, public shareable link. You just copy and paste this link onto your careers page, LinkedIn, or job boards to start getting submissions immediately.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Where do I view the submitted resumes and candidate details?
              </h3>
              <p>
                You do not need to sort through emails. All applicant submissions, including uploaded resumes and contact info, are automatically routed to your centralized FormPlate dashboard for easy and organized review.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Is this predefined job application link free to use?
              </h3>
              <p>
                Yes, using this predefined employment form, generating the shareable link, and tracking all candidate submissions in your dashboard is completely free.
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
              Your job application form is ready to collect submissions.
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