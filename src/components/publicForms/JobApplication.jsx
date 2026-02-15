"use client";

import React, { useState, useRef } from "react";
import axios from "axios";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  Briefcase,
  DollarSign,
  Calendar,
  Clock,
  Award,
  FileText,
  Upload,
  Loader2,
  CheckCircle2,
} from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

export default function JobApplication({ formId }) {
  // 1. Form State
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    website: "",
    role: "",
    salary: "",
    startDate: "",
    experience: "",
    skills: "",
    coverLetter: "",
    resume: null,
  });

  // 2. UI State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);
  const fileInputRef = useRef(null);

  // 3. Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const maxSize = 5 * 1024 * 1024;

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    // ❌ Size validation
    if (file.size > maxSize) {
      alert("File size must be less than 5MB.");

      e.target.value = null; // reset input
      setFormData((prev) => ({ ...prev, resume: null })); // 🔥 reset state

      return;
    }

    // ❌ Type validation
    if (!allowedTypes.includes(file.type)) {
      alert("Only PDF or DOC/DOCX files are allowed.");

      e.target.value = null;
      setFormData((prev) => ({ ...prev, resume: null })); // 🔥 reset state

      return;
    }

    // ✅ Valid file
    setFormData((prev) => ({ ...prev, resume: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    const dataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      dataToSend.append(key, formData[key]);
    });

    dataToSend.append("formId", formId); // Include formId in the payload

    if (!formData.resume) {
      alert("Resume is required.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.post(
        `${API}/form/job-application`,
        dataToSend,
      );

      if (response.status === 200 || response.status === 201) {
        setStatus("success");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          address: "",
          website: "",
          role: "",
          salary: "",
          startDate: "",
          experience: "",
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

  // Shared Styles (Mobile Fixes Applied)
  const inputBase =
    "w-full bg-white border border-gray-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-500 placeholder:opacity-100 outline-none focus:ring-2 focus:ring-blue-100 transition-all";
  const standardInput = `${inputBase} px-3 py-2.5`;
  const iconInput = `${inputBase} pl-10 pr-3 py-2.5`; // pl-10 gives room for centered icon

  return (
    // OUTER CONTAINER: Fixed Gradient + dvh
    <div className="min-h-dvh w-full flex items-center justify-center p-4 md:p-10 relative overflow-hidden bg-indigo-50">
      {/* Fixed Background Layer */}
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 -z-20 h-full w-full"></div>

      {/* Decorative Blobs */}
      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-blue-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2 pointer-events-none -z-10"></div>
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-purple-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-x-1/2 translate-y-1/2 pointer-events-none -z-10"></div>

      {/* MAIN CARD: Floating Shadow */}
      <div className="w-full max-w-3xl bg-white/80 backdrop-blur-sm rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/50 overflow-hidden relative z-10 my-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] p-6 md:p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
          <h1 className="text-xl md:text-3xl font-bold text-white mb-2 relative z-10">
            Job Application
          </h1>
          <p className="text-blue-100 text-xs md:text-sm relative z-10">
            Join our team! Please fill out the details below.
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 md:p-8 space-y-8">
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
                    required
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    type="text"
                    className={standardInput}
                    placeholder="First Name"
                  />
                  <input
                    required
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    type="text"
                    className={standardInput}
                    placeholder="Last Name"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">
                    Email <span className="text-red-500">*</span>
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
                      className={iconInput}
                      placeholder="email@example.com"
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
                      className={iconInput}
                      placeholder="(555) 000-0000"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-4 md:mt-6">
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">
                  Current Address
                </label>
                <div className="relative">
                  <MapPin
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={16}
                  />
                  <input
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    type="text"
                    className={iconInput}
                    placeholder="City, State"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">
                  Website / LinkedIn
                </label>
                <div className="relative">
                  <Globe
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={16}
                  />
                  <input
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    type="url"
                    className={iconInput}
                    placeholder="https://"
                  />
                </div>
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
                  Role Applying For <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  type="text"
                  className={standardInput}
                  placeholder="e.g. Frontend Developer"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">
                  Expected Salary
                </label>
                <div className="relative">
                  <DollarSign
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={16}
                  />
                  <input
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    type="text"
                    className={iconInput}
                    placeholder="e.g. 50,000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">
                  Earliest Start Date
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
                    className={iconInput}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">
                  Total Experience (Years)
                </label>
                <div className="relative">
                  <Clock
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={16}
                  />
                  <input
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    type="number"
                    className={iconInput}
                    placeholder="e.g. 3"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Key Skills or Certifications
              </label>
              <div className="relative">
                <Award
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <input
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  type="text"
                  className={iconInput}
                  placeholder="e.g. PMP, CPR Certified..."
                />
              </div>
            </div>
          </section>

          <hr className="border-gray-100" />

          {/* SECTION 3: Documents */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-orange-100 p-2 rounded-lg text-orange-700">
                <FileText size={20} />
              </div>
              <h3 className="text-lg font-bold text-gray-800">Documents</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {/* File Upload */}
              <div
                onClick={() => fileInputRef.current.click()}
                className={`border-2 border-dashed ${formData.resume ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-gray-50/50"} rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-white transition-colors cursor-pointer`}
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
                    <CheckCircle2 size={24} className="text-blue-600 mb-2" />
                    <span className="text-blue-900 font-semibold text-sm truncate max-w-full px-2">
                      {formData.resume.name}
                    </span>
                    <span className="text-xs text-blue-600 mt-1">
                      Click to change
                    </span>
                  </>
                ) : (
                  <>
                    <div className="bg-white p-3 rounded-full shadow-sm mb-3">
                      <Upload size={20} className="text-blue-600" />
                    </div>
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
                  className="flex-1 w-full bg-white border border-gray-200 rounded-xl p-3 text-sm text-gray-900 placeholder:text-gray-500 placeholder:opacity-100 outline-none focus:ring-2 focus:ring-orange-100 resize-none transition-all"
                  placeholder="Tell us why you're a great fit..."
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
            className="w-full bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] hover:from-[#172554] hover:to-[#1d4ed8] text-white py-3.5 rounded-xl font-bold shadow-lg transition-transform hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
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
