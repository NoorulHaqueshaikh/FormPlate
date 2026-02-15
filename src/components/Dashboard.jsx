"use client";
import React, { useEffect, useState } from 'react';
import { MoreHorizontal, FileText, Users, BarChart3, Loader2, Calendar } from 'lucide-react';
import axios from 'axios';

const API = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalForms: 0,
    totalSubmissions: 0,
    todaysSubmissions: 0
  });
  const [recentForms, setRecentForms] = useState([]);

  useEffect(() => {
    fetchSubmissionsData();
  }, []);

  const fetchSubmissionsData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API}/form/submissions-data`, { withCredentials: true });
      
      if (response.status === 200 && response.data.success) {
        processDashboardData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  // --- Helper Functions ---

  const toTitleCase = (str) => {
    if (!str) return "Untitled Form";
    return str
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const processDashboardData = (apiData) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to midnight today

    let globalSubmissions = 0;
    let todayCount = 0;

    // 1. Process Forms for Table & Stats
    const processedForms = apiData.map((item) => {
      const form = item.form;
      const submissions = item.submissions || [];
      const subCount = submissions.length;

      // Update global counters
      globalSubmissions += subCount;
      
      // Count submissions from today
      const todaySubs = submissions.filter(sub => new Date(sub.createdAt) >= today).length;
      todayCount += todaySubs;

      return {
        id: form._id,
        name: toTitleCase(form.formName),
        status: "Active", // Defaulting to Active as API doesn't have status yet
        responses: subCount,
        createdRaw: new Date(form.createdAt), // For sorting
        created: formatDate(form.createdAt),
      };
    });

    // 2. Sort by Created Date (Newest First)
    const sortedForms = processedForms.sort((a, b) => b.createdRaw - a.createdRaw);

    setStats({
      totalForms: apiData.length,
      totalSubmissions: globalSubmissions,
      todaysSubmissions: todayCount
    });
    setRecentForms(sortedForms);
  };

  return (
    // Wrapper to match the gray background and padding
    <div className="w-full min-h-screen bg-gray-50 p-4 md:p-10">
      
      {/* 1. Greeting Section */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Have a nice day</h1>
        {/* <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Good morning, Alex</h1> */}
        <p className="text-gray-500 mt-1">Here's what's happening with your forms today.</p>
      </div>

      {/* 2. Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-10">
        
        {/* Card 1: Total Forms */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <span className="text-gray-500 font-medium text-sm">Total Forms Created</span>
            <div className="bg-[#6366f1] p-2 rounded-lg text-white">
              <FileText size={20} />
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {loading ? "-" : stats.totalForms}
            </div>
            <div className="text-sm font-medium text-green-500">Active now</div>
          </div>
        </div>

        {/* Card 2: Total Submissions */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <span className="text-gray-500 font-medium text-sm">Total Submissions</span>
            <div className="bg-[#6366f1] p-2 rounded-lg text-white">
              <Users size={20} />
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {loading ? "-" : stats.totalSubmissions.toLocaleString()}
            </div>
            <div className="text-sm font-medium text-green-500">All time</div>
          </div>
        </div>

        {/* Card 3: Today's Submissions */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <span className="text-gray-500 font-medium text-sm">Today's Submissions</span>
            <div className="bg-[#6366f1] p-2 rounded-lg text-white">
              <BarChart3 size={20} />
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {loading ? "-" : stats.todaysSubmissions}
            </div>
            <div className="text-sm font-medium text-gray-500">Since midnight</div>
          </div>
        </div>
      </div>

      {/* 3. Recent Forms Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Recent Forms</h2>
          {/* <button className="text-sm font-medium text-blue-700 hover:text-blue-900">View All</button> */}
        </div>

        {/* ========================================== */}
        {/* DESKTOP VIEW (Table) - Hidden on Mobile    */}
        {/* ========================================== */}
        <div className="hidden md:block bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100 text-xs uppercase text-gray-500 font-semibold tracking-wider">
                  <th className="px-6 py-4">Form Name</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Responses</th>
                  <th className="px-6 py-4">Created</th>
                  <th className="px-6 py-4 text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                
                {loading ? (
                   <tr>
                      <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                          <div className="flex flex-col items-center justify-center gap-2">
                              <Loader2 className="animate-spin text-blue-500" size={24} />
                              <span>Loading dashboard...</span>
                          </div>
                      </td>
                   </tr>
                ) : recentForms.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                      No forms found. Create your first form!
                    </td>
                  </tr>
                ) : (
                  recentForms.slice(0, 5).map((form) => (
                    <tr key={form.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {form.name}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                          {form.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {form.responses}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {form.created}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-gray-400 hover:text-gray-600">
                          <MoreHorizontal size={20} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}

              </tbody>
            </table>
          </div>
        </div>

        {/* ========================================== */}
        {/* MOBILE VIEW (Cards) - Hidden on Desktop    */}
        {/* ========================================== */}
        <div className="md:hidden flex flex-col gap-4">
            {loading ? (
                <div className="text-center py-12 text-gray-500 bg-white rounded-xl border border-gray-200">
                     <div className="flex flex-col items-center justify-center gap-2">
                        <Loader2 className="animate-spin text-blue-500" size={24} />
                        <span>Loading...</span>
                    </div>
                </div>
            ) : recentForms.length === 0 ? (
                <div className="text-center py-12 text-gray-500 bg-white rounded-xl border border-gray-200">
                     No forms found.
                </div>
            ) : (
                recentForms.slice(0, 5).map((form) => (
                    <div key={form.id} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                        {/* Header: Name + Menu */}
                        <div className="flex items-start justify-between mb-3">
                            <div>
                                <h3 className="font-semibold text-gray-900">{form.name}</h3>
                                <span className="inline-flex items-center px-2 py-0.5 mt-2 rounded-full text-[10px] font-medium bg-green-100 text-green-700">
                                    {form.status}
                                </span>
                            </div>
                            <button className="text-gray-400">
                                <MoreHorizontal size={20} />
                            </button>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-gray-100 my-3"></div>

                        {/* Footer Stats */}
                        <div className="flex items-center justify-between text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                                <Users size={16} />
                                <span>{form.responses} Responses</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar size={16} />
                                <span>{form.created}</span>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>

      </div>

    </div>
  );
}