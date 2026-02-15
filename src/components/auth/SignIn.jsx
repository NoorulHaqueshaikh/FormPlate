"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // For redirection
import { Layout, Eye, EyeOff, Loader2 } from "lucide-react"; // Added Loader2
import axios from "axios";
import { Toaster, toast } from "react-hot-toast"; // Import Toast
import { useSearchParams } from "next/navigation";

// API Base URL
const API = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

export default function SignIn() {
  const router = useRouter();

  // State Management
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();

  // Form Data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Validation Errors State
  const [errors, setErrors] = useState({});

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  // Validation Logic
  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email address is required";
    if (!formData.password) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const submitHandle = async (e) => {
    e.preventDefault();

    // 1. Run Validation
    if (!validateForm()) return;

    setLoading(true);

    try {
      // 2. API Call
      const response = await axios.post(
        `${API}/auth/signin`,
        {
          email: formData.email,
          password: formData.password,
        },
        { withCredentials: true },
      );

      // 3. Handle Success (200 OK)
      if (response.data.success) {
        toast.success(response.data.message || "Signin successful!");

        // 🔁 Handle redirect
        const redirectUrl = searchParams.get("redirect");

        setTimeout(() => {
          if (redirectUrl && redirectUrl.startsWith("/")) {
            router.push(redirectUrl);
          } else {
            router.push("/");
          }
        }, 800);
      }
    } catch (error) {
      // 4. Handle Errors (401, 500, etc.)
      console.log(error);
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // SEO Schema (Kept as is)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Action",
    name: "Login",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://formflow.com/sign-in",
      inLanguage: "en-US",
      actionPlatform: [
        "http://schema.org/DesktopWebPlatform",
        "http://schema.org/MobileWebPlatform",
      ],
    },
    object: {
      "@type": "WebApplication",
      name: "FormFlow",
    },
  };

 const googleLogin = () => {
  const redirectUrl = searchParams.get("redirect") || "/";

  window.location.href =
    `${API}/auth/google?redirect=${encodeURIComponent(redirectUrl)}`;
};


  return (
    <div className="w-full min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 md:p-6">
      {/* Toast Notification Container */}
      <Toaster position="top-right" reverseOrder={false} />

      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="w-full max-w-md md:max-w-lg bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden transition-all duration-300 ease-in-out">
        <div className="p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-[#1e3a8a] text-white rounded-xl mb-4 shadow-lg shadow-blue-900/20">
              <Layout size={24} strokeWidth={2.5} />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
              Welcome back
            </h1>
            <p className="text-slate-500 text-sm md:text-base">
              Sign in to create and manage your forms
            </p>
          </div>

          {/* Google Button */}
          <button
            onClick={googleLogin}
            type="button"
            className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium py-3 rounded-xl transition-all mb-8 group"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* Divider */}
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-3 text-slate-400 font-medium tracking-wider">
                Or sign in with email
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={submitHandle} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Email address
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full bg-white border rounded-lg pl-3 pr-3 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-100 transition-all 
                    ${errors.email ? "border-red-500 focus:border-red-500" : "border-slate-200 focus:border-blue-400"}`}
                  placeholder="name@company.com"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full bg-white border rounded-lg pl-3 pr-10 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-100 transition-all font-sans
                    ${errors.password ? "border-red-500 focus:border-red-500" : "border-slate-200 focus:border-blue-400"}`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}

              <div className="flex justify-end mt-2">
                <Link
                  href="/forgot-password"
                  className="text-xs font-medium text-slate-500 hover:text-[#1e3a8a] transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            {/* Submit Button */}
            <button
              disabled={loading}
              className="w-full bg-[#1e3a8a] hover:bg-[#172554] disabled:bg-[#1e3a8a]/70 text-white font-bold py-3 rounded-lg shadow-md transition-all hover:shadow-lg mt-2 text-sm md:text-base flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="mt-8 text-center text-sm text-slate-600">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-[#1e3a8a] font-semibold hover:underline"
            >
              Sign up for free
            </Link>
          </p>
        </div>
      </div>

      {/* Footer copyright */}
      <div className="mt-8 text-slate-400 text-xs text-center">
        &copy; {new Date().getFullYear()} FormFlow. All rights reserved.
      </div>
    </div>
  );
}
