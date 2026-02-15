"use client";

import React, { useState } from 'react';
import axios from 'axios';
import {
  Star,
  ThumbsUp,
  Layers,
  MessageSquare,
  User,
  Mail,
  Send,
  Loader2,
  CheckCircle2
} from "lucide-react";



const API = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";


export default function FeedbackForm({formId}) {
  // 1. Form State
  const [formData, setFormData] = useState({
    satisfaction: 'Select a rating...',
    feedbackType: 'Suggestion / Idea',
    subject: '',
    description: '',
    fullName: '',
    email: '',
    consent: false
  });

  // 2. UI State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // null | 'success' | 'error'

  // 3. Handlers
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    // Basic Validation
    if (formData.satisfaction === 'Select a rating...') {
      alert("Please select a satisfaction rating.");
      setIsSubmitting(false);
      return;
    }

    try {
      
      const response = await axios.post(`${API}/form/feedback-form`,{ ...formData, formId });

      if (response.status === 200 || response.status === 201) {
        setStatus('success');
        setFormData({
          satisfaction: 'Select a rating...',
          feedbackType: 'Suggestion / Idea',
          subject: '',
          description: '',
          fullName: '',
          email: '',
          consent: false
        });
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Shared Styles for Consistency & Mobile Fixes
  const inputBase = "w-full bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-500 placeholder:opacity-100 outline-none focus:ring-2 focus:ring-fuchsia-100 transition-all";
  const standardInput = `${inputBase} px-3 py-2.5`;
  const iconInput = `${inputBase} pl-9 pr-3 py-2.5`;

  return (
    // OUTER CONTAINER: Fixed Gradient Background + Mobile Height Fix (dvh)
    <div className="min-h-dvh w-full flex items-center justify-center p-4 md:p-10 relative overflow-hidden bg-fuchsia-50">
      
      {/* Fixed Background Layer */}
      <div className="fixed inset-0 bg-gradient-to-br from-fuchsia-50 via-purple-50 to-violet-50 -z-20 h-full w-full"></div>

      {/* Decorative Blobs */}
      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-fuchsia-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2 pointer-events-none -z-10"></div>
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-purple-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-x-1/2 translate-y-1/2 pointer-events-none -z-10"></div>

      {/* MAIN CARD: Floating Shadow Effect */}
      <div className="w-full max-w-3xl bg-white/80 backdrop-blur-sm rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/50 overflow-hidden relative z-10 my-auto">
        
        {/* Form Header */}
        <div className="bg-gradient-to-r from-fuchsia-600 to-purple-600 p-6 md:p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
          <h1 className="text-xl md:text-3xl font-bold text-white mb-2 relative z-10">
            We Value Your Feedback
          </h1>
          <p className="text-fuchsia-100 text-xs md:text-sm relative z-10">
            Your input helps us improve. Please share your thoughts below.
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 md:p-8 space-y-8">
          
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
              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-2">
                  Overall Satisfaction
                </label>
                <div className="relative">
                  <ThumbsUp className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <select 
                    name="satisfaction"
                    value={formData.satisfaction}
                    onChange={handleChange}
                    className={iconInput}
                  >
                    <option disabled>Select a rating...</option>
                    <option>Very Satisfied</option>
                    <option>Satisfied</option>
                    <option>Neutral</option>
                    <option>Dissatisfied</option>
                    <option>Very Dissatisfied</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-2">
                  Type of Feedback
                </label>
                <div className="relative">
                  <Layers className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <select 
                    name="feedbackType"
                    value={formData.feedbackType}
                    onChange={handleChange}
                    className={iconInput}
                  >
                    <option>Suggestion / Idea</option>
                    <option>Compliment / Praise</option>
                    <option>Issue / Problem</option>
                    <option>Process Improvement</option>
                    <option>General Comment</option>
                    <option>Other</option>
                  </select>
                </div>
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
                  required
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  type="text"
                  className={standardInput}
                  placeholder="Brief summary of your feedback"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-2">
                  Description / Comments <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className={`${standardInput} p-4 resize-none`}
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
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  type="text"
                  className={standardInput}
                  placeholder="John Doe"
                />
              </div>

              <div className="relative">
                <label className="block text-sm font-semibold text-slate-600 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    className={iconInput}
                    placeholder="you@example.com"
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <input
                type="checkbox"
                id="consent"
                name="consent"
                checked={formData.consent}
                onChange={handleChange}
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

          {/* Feedback Messages */}
          {status === 'success' && (
            <div className="p-4 bg-green-50 text-green-700 border border-green-200 rounded-lg text-sm text-center font-medium flex items-center justify-center gap-2">
              <CheckCircle2 size={18} />
              Feedback submitted successfully! Thank you.
            </div>
          )}
          {status === 'error' && (
             <div className="p-4 bg-red-50 text-red-700 border border-red-200 rounded-lg text-sm text-center font-medium">
              Something went wrong. Please check your connection and try again.
            </div>
          )}

          {/* Submit Button */}
          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-700 hover:to-purple-700 text-white py-3.5 rounded-xl font-bold shadow-lg transition-transform hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Submitting...</span>
              </>
            ) : (
               <>
                <Send size={18} />
                <span>Submit Feedback</span>
               </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}