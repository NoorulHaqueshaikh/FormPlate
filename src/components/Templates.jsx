"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AuthChecking } from "@/utils/auth/AuthChecking";
import { createFormFromTemplate } from "@/utils/forms/CreatingTemplate.js";
import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

export default function Templates() {
  const router = useRouter();

  const [showModal, setShowModal] = React.useState(false);
  const [createdForm, setCreatedForm] = React.useState(null);
  const [usedTemplates, setUsedTemplates] = React.useState([]);
  const [copied, setCopied] = React.useState(false);
  const [loadingTemplateStatus, setLoadingTemplateStatus] =
    React.useState(true);

  useEffect(() => {
    templateUsedOrNot();
  }, []);

  // Static template data (add more anytime)
  const templates = [
    {
      id: 1,
      slug: "job-application",
      title: "Job Application",
      description:
        "Collect resumes, cover letters, and candidate details efficiently.",
      image: "/template-image/job-application.png",
    },
    {
      id: 2,
      slug: "internship-application",
      title: "Internship Application",
      description:
        "Streamline your student recruitment process with this structured form.",
      image: "/template-image/internship.png",
    },
    {
      id: 3,
      slug: "contact-form",
      title: "Contact Form",
      description:
        "A simple, effective way for visitors to get in touch with you.",
      image: "/template-image/contact.png",
    },
    {
      id: 4,
      slug: "feedback-form",
      title: "Feedback Form",
      description:
        "Gather feedback on customer experiences to improve your services.",
      image: "/template-image/feedback.png",
    },
    {
      id: 5,
      slug: "event-registration",
      title: "Event Registration",
      description:
        "Manage attendee sign-ups and gather dietary requirements easily.",
      image: "/template-image/event-registration.png",
    },
  ];

  const authStatus = async (templateSlug) => {
    try {
      // 🔐 Check auth via utils
      const isLoggedIn = await AuthChecking();

      if (isLoggedIn) {
        const res = await createFormFromTemplate(templateSlug);

        if (res?.success) {
          const publicUrl = `${window.location.origin}/${res.formName}/${res.formId}`;

          setCreatedForm({
            formId: res.formId,
            formName: res.formName,
            publicUrl,
          });

          setUsedTemplates((prev) => [...prev, res.formName]);
          setShowModal(true);
        }
      }
    } catch (error) {
      const currentPath = window.location.pathname + window.location.search;

      router.push(`/signin?redirect=${encodeURIComponent(currentPath)}`);
    }
  };

  const templateUsedOrNot = async () => {
    try {
      const response = await axios.get(`${API}/form/templates-used/check`, {
        withCredentials: true,
      });

      if (response.data?.success) {
        const usedNames = response.data.forms.map((form) => form.name);
        setUsedTemplates(usedNames);
      }
    } catch (error) {
      setUsedTemplates([]);
    } finally {
      setLoadingTemplateStatus(false); // ✅ IMPORTANT
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6 md:p-10">
      {/* Header */}
      {/* Page Intro */}
      <div className="mb-10 max-w-3xl">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Ready-to-Use Online Form Templates
        </h1>

        <p className="text-gray-500 mt-2 text-sm md:text-base">
          Choose a workflow and start collecting submissions instantly — no form
          setup required.
        </p>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => {
          const isUsed = usedTemplates.includes(template.slug);

          return (
            <div
              key={template.id}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
            >
              {/* Preview Image */}
              <div className="h-48 bg-gray-100 relative w-full border-b border-gray-100">
                {/* Placeholder (use image later if you want) */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-50">
                  <span className="text-sm font-medium">Preview Image</span>
                </div>

                <Image
                  src={template.image}
                  alt={template.title}
                  fill
                  className="object-cover md:object-top md:pt-0.4"
                />
              </div>

              {/* Card Content */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-gray-900">
                  {template.title}
                </h3>

                <p className="text-sm text-gray-500 mt-2 mb-6 flex-1 leading-relaxed">
                  {template.description}
                </p>

                {/* Actions */}
                <div className="flex items-center gap-3 mt-auto">
                  {/* Use Template */}
                  {loadingTemplateStatus ? (
                    // 🔄 Skeleton (shown while backend data is loading)
                    <div className="flex-1 h-[44px] rounded-lg relative overflow-hidden bg-gray-200">
                      <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
                    </div>
                  ) : (
                    // ✅ Real button (shown after data arrives)
                    <button
                      type="button"
                      disabled={isUsed}
                      onClick={() => authStatus(template.slug)}
                      className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm
      ${
        isUsed
          ? "bg-gray-300 text-gray-600 cursor-not-allowed"
          : "bg-[#1e3a8a] hover:bg-[#172554] text-white"
      }
    `}
                    >
                      {isUsed ? "Template used" : "Use Template"}
                    </button>
                  )}

                  {/* Preview */}
                  <button
                    type="button"
                    onClick={() =>
                      router.push(`/templates/preview/${template.slug}`)
                    }
                    className="flex-1 bg-white border border-gray-300
                       hover:bg-gray-50 text-gray-700 py-2.5
                       rounded-lg text-sm font-medium transition-colors"
                  >
                    Preview
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Product Explanation Section */}
      <div className="max-w-6xl mt-20">
        {/* Heading */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
            Simple data collection without form building
          </h2>
          <p className="text-gray-500 mt-2 max-w-3xl">
            Use ready-structured workflows to collect organized submissions. No
            designing fields, no setup, just share and receive responses.
          </p>
        </div>

        {/* How it works */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white border rounded-xl p-6">
            <div className="text-blue-900 font-semibold mb-2">
              1. Choose a template
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Pick a form designed for a real use case like hiring, feedback,
              registration, or inquiries.
            </p>
          </div>

          <div className="bg-white border rounded-xl p-6">
            <div className="text-blue-900 font-semibold mb-2">
              2. Share the link
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Instantly generate a public form URL and send it to applicants,
              users, or participants.
            </p>
          </div>

          <div className="bg-white border rounded-xl p-6">
            <div className="text-blue-900 font-semibold mb-2">
              3. View submissions
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              All responses appear in a structured dashboard, ready to review
              without sorting.
            </p>
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-white border rounded-xl p-6 md:p-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Why structured templates work better
          </h3>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-y-3 text-gray-700 text-sm">
            <div>• Consistent response format</div>
            <div>• No incomplete fields</div>
            <div>• Faster review process</div>
            <div>• Clean dashboard data</div>
            <div>• No configuration needed</div>
            <div>• Ready in seconds</div>
          </div>

          <p className="text-gray-600 text-sm mt-6 leading-relaxed max-w-3xl">
            Unlike customizable form builders, these templates enforce a fixed
            structure, making submissions easier to compare and manage. Ideal
            when process matters more than design flexibility.
          </p>
        </div>
      </div>

      {/* ================= FAQ SECTION ================= */}
      <div className="mt-20">
        <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-10 shadow-sm">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-10 text-center">
            Frequently Asked Questions
          </h2>

          <div className="divide-y divide-gray-200">
            {/* Q1 */}
            <div className="py-6 grid md:grid-cols-3 gap-4">
              <h3 className="font-semibold text-gray-900">
                Do I need to design the form before using it?
              </h3>
              <p className="md:col-span-2 text-gray-600 leading-relaxed">
                No. Each form is already structured. You only create the form
                and start collecting submissions.
              </p>
            </div>

            {/* Q2 */}
            <div className="py-6 grid md:grid-cols-3 gap-4">
              <h3 className="font-semibold text-gray-900">
                How do I share the form?
              </h3>
              <p className="md:col-span-2 text-gray-600 leading-relaxed">
                After creating a template, a public link is generated instantly.
                You can send it anywhere — website, email, or social media.
              </p>
            </div>

            {/* Q3 */}
            <div className="py-6 grid md:grid-cols-3 gap-4">
              <h3 className="font-semibold text-gray-900">
                Where are responses stored?
              </h3>
              <p className="md:col-span-2 text-gray-600 leading-relaxed">
                All submissions are stored inside your submissions section in a
                structured format so you can easily review and manage data.
              </p>
            </div>

            {/* Q4 */}
            <div className="py-6 grid md:grid-cols-3 gap-4">
              <h3 className="font-semibold text-gray-900">
                Can I customize the fields?
              </h3>
              <p className="md:col-span-2 text-gray-600 leading-relaxed">
                No. These templates are intentionally fixed-structure to ensure
                consistent and organized submissions.
              </p>
            </div>

            {/* Q5 */}
            <div className="py-6 grid md:grid-cols-3 gap-4">
              <h3 className="font-semibold text-gray-900">
                Is FormPlate free?
              </h3>
              <p className="md:col-span-2 text-gray-600 leading-relaxed">
                Yes. You can create and share forms without any cost.
              </p>
            </div>
          </div>
        </div>
      </div>

      {showModal && createdForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 sm:p-8 shadow-xl relative">
            {/* Close */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>

            {/* Success icon */}
            <div className="flex justify-center mb-5">
              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-green-600 text-2xl">✓</span>
              </div>
            </div>

            <h2 className="text-xl font-semibold text-center text-gray-900">
              Form created successfully
            </h2>

            <p className="text-sm text-gray-500 text-center mt-2 mb-6">
              Your {createdForm.formName.replace("-", " ")} has been generated
              and is ready to collect submissions.
            </p>

            {/* URL label */}
            <label className="block text-xs font-medium text-gray-500 mb-2">
              Public form URL
            </label>

            {/* URL box */}
            <div className="bg-blue-50 border border-blue-100 rounded-lg px-3 py-2 flex items-center justify-between gap-2">
              <span className="text-sm text-gray-700 truncate">
                {createdForm.publicUrl}
              </span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(createdForm.publicUrl);
                  setCopied(true);

                  setTimeout(() => {
                    setCopied(false);
                  }, 2000);
                }}
                className="text-blue-700 text-xs font-medium whitespace-nowrap"
              >
                {copied ? "Copied!" : "Copy link"}
              </button>
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
              <button
                onClick={() => window.open(createdForm.publicUrl, "_blank")}
                className="flex items-center justify-center gap-2 border border-gray-300 
rounded-lg py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-50"
              >
                View live form
              </button>

              <button
                onClick={() => router.push("/submissions")}
                className="flex items-center justify-center gap-2 bg-[#1e3a8a] hover:bg-[#172554] text-white rounded-lg py-2.5 text-sm font-medium"
              >
                Open submissions
              </button>
            </div>

            {/* Settings link */}
            <div className="mt-4 text-center">
              <button
                onClick={() =>
                  router.push(`/forms/${createdForm.formId}/settings`)
                }
                className="text-sm text-gray-500 hover:text-[#1e3a8a] flex items-center justify-center gap-1 mx-auto"
              >
                Configure form settings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
