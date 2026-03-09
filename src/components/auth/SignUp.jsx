'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Layout, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';

// API Base URL
const API = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';

export default function SignUp({redirect}) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });

  // UI State
  const [loading, setLoading] = useState(false);


  const googleLogin = () => {
 const redirectUrl = redirect || "/";


  window.location.href =
    `${API}/auth/google?redirect=${encodeURIComponent(redirectUrl)}`;
};

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 1. Basic Frontend Validation
    if (!formData.fullName || !formData.email || !formData.password) {
      toast.error('All fields are required.');
      setLoading(false);
      return;
    }

    // 2. Strong Password Validation (Industry Standard)
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

    if (!strongPasswordRegex.test(formData.password)) {
      toast.error(
        'Password must be 8+ chars with uppercase, number & special char.',
        { duration: 4000 }
      );
      setLoading(false);
      return;
    }

    try {
      // 3. Send Request to Backend
      const response = await axios.post(`${API}/auth/signup`, {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password
      });

      // 4. Handle Success
      toast.success('Account created successfully! Redirecting...');
      console.log('User created:', response.data);
      
      // Clear form
      setFormData({ fullName: '', email: '', password: '' });

      // 5. Redirect to Sign In page after 1.5 seconds
      setTimeout(() => {
        router.push('/signin');
      }, 1500);

    } catch (err) {
      // 6. Handle Backend Errors
      if (err.response) {
        toast.error(err.response.data.message || 'Something went wrong.');
      } else if (err.request) {
        toast.error('Unable to connect to the server. Check your internet.');
      } else {
        toast.error('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 md:p-6">
      
      {/* Toast Container Positioned to Top-Right */}
      <Toaster position="top-right" reverseOrder={false} />

      <div className="w-full max-w-md md:max-w-lg bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden transition-all duration-300 ease-in-out">
        <div className="p-8 md:p-10">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-[#1e3a8a] text-white rounded-xl mb-4 shadow-lg shadow-blue-900/20">
              <Layout size={24} strokeWidth={2.5} />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Create your account</h1>
            <p className="text-slate-500 text-sm md:text-base">
              Start using ready-made forms in minutes
            </p>
          </div>

          {/* Google Button */}
          <button onClick={googleLogin} className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium py-3 rounded-xl transition-all mb-8 group">
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
              <span className="bg-white px-3 text-slate-400 font-medium tracking-wider">Or sign up with email</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
              <div className="relative">
                <input 
                  type="text" 
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-full bg-white border border-slate-200 rounded-lg pl-3 pr-3 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all disabled:bg-slate-50 disabled:text-slate-400" 
                  placeholder="John Doe" 
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email address</label>
              <div className="relative">
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-full bg-white border border-slate-200 rounded-lg pl-3 pr-3 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all disabled:bg-slate-50 disabled:text-slate-400" 
                  placeholder="name@company.com" 
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-full bg-white border border-slate-200 rounded-lg pl-3 pr-10 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all font-sans disabled:bg-slate-50 disabled:text-slate-400" 
                  placeholder="At least 8 characters" 
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none disabled:opacity-50"
                  disabled={loading}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Must contain 8+ chars, uppercase, number & special char.
              </p>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-[#1e3a8a] hover:bg-[#172554] text-white font-bold py-3 rounded-lg shadow-md transition-all hover:shadow-lg mt-2 text-sm md:text-base disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Creating Account...</span>
                </>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="mt-8 text-center text-sm text-slate-600">
            Already have an account?{' '}
            <Link href="/signin" className="text-[#1e3a8a] font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
      
      {/* Footer copyright */}
      <div className="mt-8 text-slate-400 text-xs text-center">
        &copy; {new Date().getFullYear()} FormPlate. All rights reserved.
      </div>
    </div>
  );
}