"use client";
import React, { useEffect, useState } from 'react';
import { Search, ArrowRight, Loader2, Trophy, ArrowLeft, Eye } from 'lucide-react'; 
import axios from 'axios';
import { useRouter } from 'next/navigation';

const API = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

export default function Submissions() {
  const router = useRouter();

  // 1. State Management
  const [loading, setLoading] = useState(true);
  const [formSubmissions, setFormSubmissions] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [stats, setStats] = useState([
    { label: "Total Responses", value: "0", subtext: null },
    { label: "New This Week", value: "0", subtext: "Since Monday" },
    { label: "Most Popular Form", value: "-", subtext: "No data yet" },
  ]);

  useEffect(() => {
    fetchSubmissionsData();
  }, []);

  const fetchSubmissionsData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API}/form/submissions-data`, { withCredentials: true });
      
      if (response.status === 200 && response.data.success) {
        processData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching submissions:", error);
    } finally {
      setLoading(false);
    }
  };

  // --- Helper Functions ---

  const toTitleCase = (str) => {
    if (!str) return "Untitled Form";
    return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const timeAgo = (dateString) => {
    if (!dateString) return "No submissions";
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 60) return "Just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days === 1) return "Yesterday";
    return `${days}d ago`;
  };

  const processData = (apiData) => {
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - (24 * 60 * 60 * 1000)); 
    const sevenDaysAgo = new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000)); 

    let totalGlobalResponses = 0;
    let newThisWeekCount = 0;
    let maxSubmissions = -1;
    let mostPopularName = "None";

    const mappedRows = apiData.map((item) => {
      const form = item.form;
      const submissions = item.submissions || [];
      const subCount = submissions.length;
      
      totalGlobalResponses += subCount;
      const weekCount = submissions.filter(sub => new Date(sub.createdAt) > sevenDaysAgo).length;
      newThisWeekCount += weekCount;

      if (subCount > maxSubmissions) {
        maxSubmissions = subCount;
        mostPopularName = toTitleCase(form.formName);
      }

      const newCount24h = submissions.filter(sub => new Date(sub.createdAt) > oneDayAgo).length;

      let lastSubmissionText = "No submissions";
      if (submissions.length > 0) {
        const sorted = [...submissions].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        lastSubmissionText = timeAgo(sorted[0].createdAt);
      }

      return {
        id: form._id,
        name: toTitleCase(form.formName),
        created: formatDate(form.createdAt),
        total: subCount,
        newCount: newCount24h, 
        lastSubmission: lastSubmissionText,
      };
    });

    setFormSubmissions(mappedRows);
    setStats([
      { label: "Total Responses", value: totalGlobalResponses.toLocaleString(), subtext: null },
      { label: "New This Week", value: newThisWeekCount.toString(), subtext: "Last 7 days" },
      { 
        label: "Most Popular Form", 
        value: maxSubmissions > 0 ? mostPopularName : "No Data", 
        subtext: maxSubmissions > 0 ? `${maxSubmissions} all-time responses` : "Waiting for submissions" 
      },
    ]);
  };

  // --- Search Filtering Logic ---
  const filteredItems = formSubmissions.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4 md:p-10">
      
      {/* Page Header */}
      <div className="mb-6 md:mb-8">
        <button 
            onClick={() => router.push('/dashboard')}
            className="group flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mb-4"
        >
            <ArrowLeft size={20} className="text-gray-400 group-hover:text-gray-900 group-hover:-translate-x-1 transition-all" />
            <span className="text-lg font-medium text-gray-600 group-hover:text-gray-900">Back to Dashboard</span>
        </button>

        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Submissions</h1>
        <p className="text-gray-500 mt-2 text-sm md:text-base">View and manage incoming responses across all your forms.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-10">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
            {index === 2 && (
               <div className="absolute top-4 right-4 text-yellow-500 opacity-20">
                  <Trophy size={48} />
               </div>
            )}
            <h3 className="text-sm font-medium text-gray-500 mb-2">{stat.label}</h3>
            <div className={`text-3xl font-bold text-gray-900 ${index === 2 ? 'truncate pr-2' : ''}`}>
                {stat.value}
            </div>
            {stat.subtext && (
              <p className="text-xs text-gray-400 mt-2">{stat.subtext}</p>
            )}
          </div>
        ))}
      </div>

      {/* Main Content Area - Desktop (Table with Container) */}
      <div className="hidden md:block bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        
        {/* Section Header with Search */}
        <div className="p-6 border-b border-gray-200 flex flex-row items-center justify-between gap-4">
          <h2 className="text-lg font-bold text-gray-900">Submissions by Form</h2>
          
          <div className="relative w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm bg-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search by form name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-500">
              <Loader2 className="animate-spin text-blue-500 mb-4" size={32} />
              <span>Loading submissions...</span>
            </div>
        ) : filteredItems.length === 0 ? (
            <div className="px-6 py-12 text-center text-gray-500">
              {searchQuery ? "No forms found matching your search." : "No forms found."}
            </div>
        ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500 font-bold tracking-wider">
                    <th className="px-6 py-4">Form Name</th>
                    <th className="px-6 py-4 w-32">Total</th>
                    <th className="px-6 py-4 w-32">New</th>
                    <th className="px-6 py-4 w-48">Last Submission</th>
                    <th className="px-6 py-4 text-right w-24"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredItems.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-semibold text-gray-900">{item.name}</div>
                          <div className="text-xs text-gray-400 mt-1">{item.created}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-700 font-medium">{item.total}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${item.newCount > 0 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                          {item.newCount > 0 ? `+${item.newCount} New` : '0 New'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{item.lastSubmission}</td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => router.push(`/submissions/${item.id}`)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors bg-white"
                        >
                          <span>View</span>
                          <ArrowRight size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
        )}
      </div>

      {/* ================================================= */}
      {/* MOBILE VIEW (Cards) - No Container, Direct Layout */}
      {/* ================================================= */}
      <div className="md:hidden">
          {/* Mobile Search - Outside the cards */}
          <div className="mb-4">
             <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                   <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                   type="text"
                   className="block w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-xl text-sm bg-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                   placeholder="Search forms..."
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                />
             </div>
          </div>

          {loading ? (
             <div className="flex flex-col items-center justify-center py-10 text-gray-500">
                <Loader2 className="animate-spin text-blue-500 mb-2" size={24} />
                <span className="text-sm">Loading...</span>
             </div>
          ) : filteredItems.length === 0 ? (
             <div className="text-center py-10 text-gray-500 text-sm bg-white rounded-xl border border-gray-200">
                No forms found.
             </div>
          ) : (
             <div className="flex flex-col gap-4">
                {filteredItems.map((item) => (
                   <div key={item.id} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col">
                      
                      {/* Top Row: Initials + Name + Badge */}
                      <div className="flex items-start gap-3 mb-4">
                         <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-lg shrink-0">
                            {getInitials(item.name)}
                         </div>
                         <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-gray-900 truncate">{item.name}</h3>
                            <p className="text-xs text-gray-500 truncate">{item.created}</p>
                         </div>
                         <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-medium border shrink-0 ${item.newCount > 0 ? 'bg-blue-50 text-blue-600 border-blue-200' : 'bg-gray-50 text-gray-500 border-gray-200'}`}>
                            {item.newCount > 0 ? 'New' : 'Active'}
                         </span>
                      </div>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                             <p className="text-[10px] uppercase font-semibold text-gray-400 mb-0.5">TOTAL</p>
                             <p className="text-sm font-medium text-gray-900">{item.total} Responses</p>
                          </div>
                          <div>
                             <p className="text-[10px] uppercase font-semibold text-gray-400 mb-0.5">LAST SUBMISSION</p>
                             <p className="text-sm font-medium text-gray-900">{item.lastSubmission}</p>
                          </div>
                      </div>

                      {/* Button */}
                      <button 
                         onClick={() => router.push(`/submissions/${item.id}`)}
                         className="w-full flex items-center justify-center gap-2 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                      >
                         <Eye size={16} />
                         View Details
                      </button>
                   </div>
                ))}
             </div>
          )}
      </div>

    </div>
  );
}