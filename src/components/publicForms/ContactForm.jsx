"use client";

import React, { useState } from 'react';
import axios from 'axios';
import {
  User,
  Mail,
  Phone,
  MessageSquare,
  HelpCircle,
  AlertCircle,
  Send,
  Loader2 
} from "lucide-react";


const API = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

export default function ContactFormPage({ formId }) {
  

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    topic: 'General Inquiry',
    priority: 'Normal',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      
      const response = await axios.post(`${API}/form/contact-form`, { 
        ...formData,
        formId 
      });

      if (response.status === 200 || response.status === 201) {
        setStatus('success');
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          topic: 'General Inquiry',
          priority: 'Normal',
          subject: '',
          message: ''
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ----------------------------------------------------------------------
  // DEFINING STYLES HERE TO ENSURE CONSISTENCY & FIX MOBILE PLACEHOLDERS
  // ----------------------------------------------------------------------
  // Fix: added 'text-slate-900', 'placeholder:text-slate-500', and 'placeholder:opacity-100'
  const baseInputStyles = "w-full bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-500 placeholder:opacity-100 outline-none focus:ring-2 focus:ring-orange-100 transition-all";
  
  // Standard input (padding left/right normal)
  const standardInputClass = `${baseInputStyles} px-3 py-2.5`;
  
  // Icon input (padding left larger for icon)
  const iconInputClass = `${baseInputStyles} pl-10 pr-3 py-2.5`;
  // ----------------------------------------------------------------------

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center p-4 md:p-10 relative overflow-hidden">

      {/* Decorative Blobs */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

      {/* MAIN FORM CARD */}
      <div className="w-full max-w-3xl bg-white/80 backdrop-blur-sm rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] ring-1 ring-black/5 border border-white/60 overflow-hidden relative z-10">

        {/* Form Header */}
        <div className="bg-gradient-to-r from-orange-500 to-amber-600 p-6 md:p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
          <h1 className="text-xl md:text-3xl font-bold text-white mb-2 relative z-10">
            Get in Touch
          </h1>
          <p className="text-orange-50 text-xs md:text-sm relative z-10">
            We are here to help. Send us a message and we&apos;ll respond ASAP.
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 md:p-8 space-y-8">

          {/* SECTION 1: Your Information */}
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
                  required
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  type="text"
                  className={standardInputClass}
                  placeholder="John Doe"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
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
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-4">
              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-2">
                  Phone Number (Optional)
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
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
              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-2">
                  Topic / Reason
                </label>
                <div className="relative">
                  <HelpCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <select 
                    name="topic"
                    value={formData.topic}
                    onChange={handleChange}
                    className={iconInputClass}
                  >
                    <option>General Inquiry</option>
                    <option>Customer Support</option>
                    <option>Sales & Pricing</option>
                    <option>Partnership Proposal</option>
                    <option>Feedback / Suggestion</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-2">
                  Priority Level
                </label>
                <div className="relative">
                  <AlertCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <select 
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className={iconInputClass}
                  >
                    <option>Normal</option>
                    <option>Low</option>
                    <option>High / Urgent</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-4 md:mt-6">
              <label className="block text-sm font-semibold text-slate-600 mb-2">
                Subject <span className="text-red-500">*</span>
              </label>
              <input
                required
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                type="text"
                className={standardInputClass}
                placeholder="Brief summary of your request"
              />
            </div>

            <div className="mt-4 md:mt-6">
              <label className="block text-sm font-semibold text-slate-600 mb-2">
                Your Message <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                name="message"
                value={formData.message}
                onChange={handleChange}
                className={`${standardInputClass} p-4 resize-none`}
                placeholder="How can we help you today? Please provide as much detail as possible..."
                rows={5}
              ></textarea>
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* Feedback Messages */}
          {status === 'success' && (
            <div className="p-4 bg-green-50 text-green-700 border border-green-200 rounded-lg text-sm text-center font-medium">
              Message sent successfully! We will get back to you soon.
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
            className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white py-3.5 rounded-xl font-bold shadow-lg transition-transform hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Sending...</span>
              </>
            ) : (
              <>
                <Send size={18} />
                <span>Send Message</span>
              </>
            )}
          </button>

        </form>
      </div>
    </div>
  );
}