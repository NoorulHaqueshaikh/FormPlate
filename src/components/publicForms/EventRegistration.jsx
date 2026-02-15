"use client";

import React, { useState } from "react";
import axios from "axios";
import {
  User,
  Mail,
  Phone,
  Ticket,
  Users,
  Calendar,
  MessageSquare,
  Info,
  Check,
  Loader2,
  CheckCircle2,
} from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

export default function EventRegistration({ formId }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    regType: "General Admission",
    attendees: 1,
    specialRequests: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    // Basic Validation

    try {
      const response = await axios.post(`${API}/form/event-registration`, {
        ...formData,
        formId,
      });

      if (response.status === 200 || response.status === 201) {
        setStatus("success");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          regType: "General Admission",
          attendees: 1,
          specialRequests: "",
        });
      }
    } catch (error) {
      console.error("Error registering:", error);
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Shared Styles for Inputs (Fixes mobile gray text issue)
  const inputBase =
    "w-full bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-500 placeholder:opacity-100 outline-none focus:ring-2 focus:ring-emerald-100 transition-all";
  const standardInput = `${inputBase} px-3 py-2.5`;
  const iconInput = `${inputBase} pl-9 pr-3 py-2.5`;

  return (
    // OUTER CONTAINER: Fixed Gradient Background + Mobile Height Fix (dvh)
    <div className="min-h-dvh w-full flex items-center justify-center p-4 md:p-10 relative overflow-hidden bg-emerald-50">
      {/* Fixed Background Layer */}
      <div className="fixed inset-0 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 -z-20 h-full w-full"></div>

      {/* Decorative Blobs */}
      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-emerald-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2 pointer-events-none -z-10"></div>
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-green-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-x-1/2 translate-y-1/2 pointer-events-none -z-10"></div>

      {/* MAIN CARD: Floating Shadow Effect */}
      <div className="w-full max-w-3xl bg-white/80 backdrop-blur-sm rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/50 overflow-hidden relative z-10 my-auto">
        {/* Form Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-green-600 p-6 md:p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
          <h1 className="text-xl md:text-3xl font-bold text-white mb-2 relative z-10">
            Event Registration
          </h1>
          <p className="text-emerald-100 text-xs md:text-sm relative z-10">
            We are excited to have you! Please fill out the details below.
          </p>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="p-5 md:p-8 space-y-8">
          {/* SECTION 1: Personal Info */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-emerald-100 p-2 rounded-lg text-emerald-700">
                <User size={20} />
              </div>
              <h3 className="text-lg font-bold text-slate-800">
                Your Information
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="group">
                <label className="block text-sm font-semibold text-slate-600 mb-2">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  type="text"
                  className={standardInput}
                  placeholder="First Name"
                />
              </div>
              <div className="group">
                <label className="block text-sm font-semibold text-slate-600 mb-2">
                  Last Name <span className="text-red-500">*</span>
                </label>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-4">
              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    size={16}
                  />
                  <input
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    className={iconInput}
                    placeholder="email@address.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    size={16}
                  />
                  <input
                    required
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
              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-2">
                  Registration Type
                </label>
                <select
                  name="regType"
                  value={formData.regType}
                  onChange={handleChange}
                  className={standardInput}
                >
                  <option>General Admission</option>
                  <option>VIP / Premium Access</option>
                  <option>Virtual / Online Only</option>
                  <option>Student / Discounted</option>
                  <option>RSVP No (Can&apos;t make it)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-2">
                  Total Attendees
                </label>
                <div className="relative">
                  <Users
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    size={16}
                  />
                  <input
                    name="attendees"
                    value={formData.attendees}
                    onChange={handleChange}
                    type="number"
                    min="1"
                    className={iconInput}
                    placeholder="1"
                  />
                </div>
              </div>
            </div>

           

          </section>

          <hr className="border-slate-100" />

          {/* SECTION 3: Additional Notes */}
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
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleChange}
                className={`${standardInput} p-4 resize-none`}
                placeholder="Please let us know if you have any specific requirements..."
                rows={3}
              ></textarea>
            </div>

            <div className="mt-4 flex items-start gap-2">
              <Info
                size={16}
                className="text-emerald-600 mt-0.5 flex-shrink-0"
              />
              <span className="text-xs text-slate-500">
                We will send a confirmation email to the address provided above.
              </span>
            </div>
          </section>

          {/* Feedback Messages */}
          {status === "success" && (
            <div className="p-4 bg-green-50 text-green-700 border border-green-200 rounded-lg text-sm text-center font-medium flex items-center justify-center gap-2">
              <CheckCircle2 size={18} />
              Registration successful! See you there.
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
            className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white py-3.5 rounded-xl font-bold shadow-lg transition-transform hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Check size={18} />
                <span>Confirm Registration</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
