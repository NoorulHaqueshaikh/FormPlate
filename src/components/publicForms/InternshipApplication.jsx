"use client";

import React, { useState, useRef } from "react";
import axios from "axios";
import {
  User,
  Mail,
  Phone,
  Globe,
  MapPin,
  GraduationCap,
  Calendar,
  Briefcase,
  FileText,
  Upload,
  Loader2,
  CheckCircle2,
} from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

export default function InternshipApplication({ formId }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    portfolio: "",
    city: "",
    currentStatus: "Student (University/College)",
    school: "",
    major: "",
    gradDate: "",
    interest: "Marketing & Sales",
    duration: "3 Months (Summer)",
    startDate: "",
    coverLetter: "",
    skills: "",
    resume: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const maxSize = 5 * 1024 * 1024; // 5MB

  // Size check
  if (file.size > maxSize) {
    alert("File size must be less than 5MB.");
    e.target.value = null;
    return;
  }

  // MIME type check
  const allowedTypes = [
    "application/pdf",
    "application/msword", // .doc
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document" // .docx
  ];

  if (!allowedTypes.includes(file.type)) {
    alert("Only PDF or DOC/DOCX files are allowed.");
    e.target.value = null;
    return;
  }

  setFormData((prev) => ({ ...prev, resume: file }));
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    // 🔥 Resume validation
    if (!formData.resume) {
      alert("Resume is required.");
      setIsSubmitting(false);
      return;
    }

    const dataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      dataToSend.append(key, formData[key]);
    });
    dataToSend.append("formId", formId);

    try {
      const response = await axios.post(
        `${API}/form/internship-application`,
        dataToSend,
      );

      if (response.status === 200 || response.status === 201) {
        setStatus("success");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          portfolio: "",
          city: "",
          currentStatus: "Student (University/College)",
          school: "",
          major: "",
          gradDate: "",
          interest: "Marketing & Sales",
          duration: "3 Months (Summer)",
          startDate: "",
          skills: "",
          coverLetter: "",
          resume: null,
        });
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Shared class for all inputs
  const inputClass =
    "w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-500 placeholder:opacity-100 outline-none focus:ring-2 focus:ring-teal-100 transition-all";
  const iconInputClass =
    "w-full bg-white border border-gray-200 rounded-lg pl-9 pr-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-500 placeholder:opacity-100 outline-none focus:ring-2 focus:ring-teal-100 transition-all";

  return (
    // OUTER CONTAINER
    <div className="min-h-dvh w-full flex items-center justify-center p-4 md:p-10 relative overflow-hidden bg-teal-50">
      {/* Fixed Background Layer */}
      <div className="fixed inset-0 bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 -z-20 h-full w-full"></div>

      {/* Decorative Blobs */}
      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-teal-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2 pointer-events-none -z-10"></div>
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-blue-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-x-1/2 translate-y-1/2 pointer-events-none -z-10"></div>

      {/* MAIN CARD: Changed max-w-4xl to max-w-3xl for reduced width */}
      <div className="w-full max-w-3xl bg-white/80 backdrop-blur-sm rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/50 overflow-hidden relative z-10 my-auto">
        {/* Form Header */}
        <div className="bg-gradient-to-r from-[#0f766e] to-[#0ea5e9] p-6 md:p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
          <h1 className="text-xl md:text-3xl font-bold text-white mb-2 relative z-10">
            Internship Application
          </h1>
          <p className="text-teal-50 text-xs md:text-sm relative z-10">
            We are looking for future leaders. Apply now to join our program.
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 md:p-8 space-y-8">
          {/* SECTION 1: Candidate Details */}
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
                    required
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    type="text"
                    className={inputClass}
                    placeholder="First Name"
                  />
                  <input
                    required
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    type="text"
                    className={inputClass}
                    placeholder="Last Name"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={16}
                    />
                    <input
                      required
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      type="email"
                      className={iconInputClass}
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">
                    Phone
                  </label>
                  <div className="relative">
                    <Phone
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={16}
                    />
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      type="tel"
                      className={iconInputClass}
                      placeholder="(555) 000-0000"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-4 md:mt-6">
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">
                  Portfolio / LinkedIn Profile
                </label>
                <div className="relative">
                  <Globe
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={16}
                  />
                  <input
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={handleChange}
                    type="url"
                    className={iconInputClass}
                    placeholder="https://"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">
                  Current City
                </label>
                <div className="relative">
                  <MapPin
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={16}
                  />
                  <input
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    type="text"
                    className={iconInputClass}
                    placeholder="City, State"
                  />
                </div>
              </div>
            </div>
          </section>

          <hr className="border-gray-100" />

          {/* SECTION 2: Background */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-100 p-2 rounded-lg text-blue-700">
                <GraduationCap size={20} />
              </div>
              <h3 className="text-lg font-bold text-gray-800">Background</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">
                  Current Status
                </label>
                <select
                  name="currentStatus"
                  value={formData.currentStatus}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option>Student (University/College)</option>
                  <option>Recent Graduate</option>
                  <option>Career Switcher / Bootcamp</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">
                  Institution / School Name
                </label>
                <input
                  name="school"
                  value={formData.school}
                  onChange={handleChange}
                  type="text"
                  className={inputClass}
                  placeholder="e.g. State University"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">
                  Field of Study / Major
                </label>
                <input
                  name="major"
                  value={formData.major}
                  onChange={handleChange}
                  type="text"
                  className={inputClass}
                  placeholder="e.g. Marketing, CS, Business"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">
                  Graduation / Completion Date
                </label>
                <div className="relative">
                  <Calendar
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={16}
                  />
                  <input
                    name="gradDate"
                    value={formData.gradDate}
                    onChange={handleChange}
                    type="date"
                    className={iconInputClass}
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-600 mb-2">
                  Skills <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  type="text"
                  className={inputClass}
                  placeholder="e.g. React, Excel, Canva, SEO"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Separate skills with commas
                </p>
              </div>
            </div>
          </section>

          <hr className="border-gray-100" />

          {/* SECTION 3: Preferences */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-purple-100 p-2 rounded-lg text-purple-700">
                <Briefcase size={20} />
              </div>
              <h3 className="text-lg font-bold text-gray-800">Preferences</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">
                  Area of Interest
                </label>
                <select
                  name="interest"
                  value={formData.interest}
                  onChange={handleChange}
                  className={inputClass}
                >
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
                <select
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option>3 Months (Summer)</option>
                  <option>6 Months</option>
                  <option>12 Months</option>
                  <option>Flexible</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-600 mb-2">
                  Available Start Date
                </label>
                <div className="relative">
                  <Calendar
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={16}
                  />
                  <input
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    type="date"
                    className={iconInputClass}
                  />
                </div>
              </div>
            </div>
          </section>

          <hr className="border-gray-100" />

          {/* SECTION 4: Documents */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-orange-100 p-2 rounded-lg text-orange-700">
                <FileText size={20} />
              </div>
              <h3 className="text-lg font-bold text-gray-800">Documents</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {/* Resume Upload - Functional */}
              <div
                onClick={() => fileInputRef.current.click()}
                className={`border-2 border-dashed ${formData.resume ? "border-teal-500 bg-teal-50" : "border-gray-300 bg-gray-50/50"} rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-white transition-colors cursor-pointer`}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                />

                {formData.resume ? (
                  <>
                    <CheckCircle2 size={24} className="text-teal-600 mb-2" />
                    <span className="text-teal-900 font-semibold text-sm truncate max-w-full px-2">
                      {formData.resume.name}
                    </span>
                    <span className="text-xs text-teal-600 mt-1">
                      Click to change
                    </span>
                  </>
                ) : (
                  <>
                    <Upload size={20} className="text-teal-600 mb-2" />
                    <span className="text-gray-900 font-semibold text-sm">
                      Upload Resume <span className="text-red-500">*</span>
                    </span>

                    <span className="text-xs text-gray-500 mt-1">
                      PDF or DOCX
                    </span>
                  </>
                )}
              </div>

              {/* Cover Letter */}
              <div className="flex flex-col h-full">
                <label className="block text-sm font-semibold text-gray-600 mb-2">
                  Cover Letter
                </label>
                <textarea
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleChange}
                  className="flex-1 w-full bg-white border border-gray-200 rounded-xl p-3 text-sm text-gray-900 placeholder:text-gray-500 placeholder:opacity-100 outline-none focus:ring-2 focus:ring-teal-100 resize-none transition-all"
                  placeholder="Tell us why you want to intern with us..."
                  rows={4}
                ></textarea>
              </div>
            </div>
          </section>

          {/* Feedback Messages */}
          {status === "success" && (
            <div className="p-4 bg-green-50 text-green-700 border border-green-200 rounded-lg text-sm text-center font-medium">
              Application submitted successfully! Good luck.
            </div>
          )}
          {status === "error" && (
            <div className="p-4 bg-red-50 text-red-700 border border-red-200 rounded-lg text-sm text-center font-medium">
              Something went wrong. Please check your connection and try again.
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-[#0f766e] to-[#0ea5e9] hover:from-[#0d9488] hover:to-[#0284c7] text-white py-3.5 rounded-xl font-bold shadow-lg transition-transform hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Submitting...</span>
              </>
            ) : (
              <span>Submit Application</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
