"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Search, FileText, Link as LinkIcon, Briefcase, Calendar, Mail, Star, Check, Eye } from 'lucide-react';

const API = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

export default function MyForms() {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState(null);
  const [submissionCounts, setSubmissionCounts] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  const visualStyles = [
    { icon: FileText, color: "bg-blue-600" },
    { icon: Briefcase, color: "bg-purple-600" },
    { icon: Calendar, color: "bg-indigo-600" },
    { icon: Mail, color: "bg-pink-600" },
    { icon: Star, color: "bg-violet-600" },
  ];

  useEffect(() => {
    const initData = async () => {
      setLoading(true);
      await formsData();
      await fetchSubmissionsData();
      setLoading(false);
    };
    initData();
  }, []);

  const fetchSubmissionsData = async () => {
    try {
      const response = await axios.get(`${API}/form/submissions-data`, { withCredentials: true });
      if (response.data && response.data.success && Array.isArray(response.data.data)) {
        const counts = {};
        response.data.data.forEach(item => {
          if (item.form && item.form._id) {
            const count = Array.isArray(item.submissions) ? item.submissions.length : 0;
            counts[item.form._id] = count;
          }
        });
        setSubmissionCounts(counts);
      }
    } catch (error) {
      console.error("Error fetching submissions:", error);
    }
  };

  const formsData = async () => {
    try {
      const response = await axios.get(`${API}/form/user-forms`, { withCredentials: true });
      if (response.status === 200) {
        setForms(response.data.forms || []); 
      }
    } catch (error) {
      console.error("Error fetching forms:", error);
    }
  };

  const formatName = (name) => {
    if (!name) return "Untitled Form";
    return name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const timeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    
    let interval = seconds / 31536000;
    if (interval > 1) return `Created ${Math.floor(interval)} years ago`;
    interval = seconds / 2592000;
    if (interval > 1) return `Created ${Math.floor(interval)} months ago`;
    interval = seconds / 86400;
    if (interval > 1) return `Created ${Math.floor(interval)} days ago`;
    interval = seconds / 3600;
    if (interval > 1) return `Created ${Math.floor(interval)} hours ago`;
    interval = seconds / 60;
    if (interval > 1) return `Created ${Math.floor(interval)} minutes ago`;
    return "Created just now";
  };

  // --- FIXED COPY FUNCTION ---
  const handleCopyLink = (e, form) => {
    // 1. Stop propagation just in case
    if (e && e.stopPropagation) e.stopPropagation();

    // 2. Identify the ID to use
    const idToUse = form._id || form.formId;

    // 3. Safety Check: If no ID, stop (prevents "undefined" bug)
    if (!idToUse) return;

    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    // Prefer formId for URL if available, else _id
    const linkId = form.formId || form._id; 
    const link = `${origin}/${form.name}/${linkId}`;
    
    navigator.clipboard.writeText(link).then(() => {
      // 4. Set state to this specific ID
      setCopiedId(idToUse);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const getSubCount = (form) => {
    if (submissionCounts[form._id] !== undefined) return submissionCounts[form._id];
    if (submissionCounts[form.formId] !== undefined) return submissionCounts[form.formId];
    return 0;
  };

  const filteredForms = forms.filter(form => 
    formatName(form.name).toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4 md:p-10">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 md:mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">All Forms</h1>
          <p className="text-sm md:text-base text-gray-500 mt-1">Manage and track your active forms.</p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
            placeholder="Search forms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading your data...</div>
      ) : filteredForms.length === 0 ? (
        <div className="text-center py-12 text-gray-500 bg-white rounded-xl border border-gray-200">
            {searchQuery ? "No forms found matching your search." : "No forms found. Create one to get started!"}
        </div>
      ) : (
        <>
          {/* ========================================== */}
          {/* DESKTOP VIEW (Table) - Hidden on Mobile    */}
          {/* ========================================== */}
          <div className="hidden md:block bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-200 text-xs uppercase text-gray-500 font-semibold tracking-wider">
                  <th className="px-6 py-4">Form Name</th>
                  <th className="px-6 py-4 w-32">Status</th>
                  <th className="px-6 py-4 w-32 text-center">Submissions</th>
                  <th className="px-6 py-4 text-right w-48">Share</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredForms.map((form, index) => {
                  const style = visualStyles[index % visualStyles.length];
                  return (
                    <tr key={form._id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className={`p-2.5 rounded-lg text-white shadow-sm ${style.color}`}>
                            <style.icon size={20} />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{formatName(form.name)}</div>
                            <div className="text-xs text-gray-500 mt-0.5">{timeAgo(form.createdAt)}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center font-medium text-gray-700">
                        {getSubCount(form)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end">
                           {/* <button className="text-gray-400 hover:text-blue-600 transition-colors" title="View Submissions">
                              <Eye size={18} />
                           </button> */}
                           <button onClick={(e) => handleCopyLink(e, form)} className="text-gray-400 hover:text-gray-600 transition-colors mr-3.5" title="Copy Link">
                              {copiedId === (form._id || form.formId) ? <Check size={18} className="text-green-600" /> : <LinkIcon size={18} />}
                           </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* ========================================== */}
          {/* MOBILE VIEW (Cards) - Hidden on Desktop    */}
          {/* ========================================== */}
          <div className="md:hidden flex flex-col gap-4">
            {filteredForms.map((form, index) => {
              const style = visualStyles[index % visualStyles.length];
              return (
                <div key={form._id} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                  {/* Card Top: Icon + Name */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg text-white shadow-sm ${style.color}`}>
                        <style.icon size={18} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-sm">{formatName(form.name)}</h3>
                        <p className="text-xs text-gray-500">{timeAgo(form.createdAt)}</p>
                      </div>
                    </div>
                    {/* Status Badge in top right of card */}
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-green-100 text-green-700">
                      Active
                    </span>
                  </div>

                  {/* Card Middle: Stats */}
                  <div className="flex items-center justify-between py-3 border-t border-b border-gray-100 mb-3">
                    <span className="text-xs text-gray-500">Total Submissions</span>
                    <span className="text-sm font-bold text-gray-900">{getSubCount(form)}</span>
                  </div>

                  {/* Card Bottom: Actions */}
                  <div className="flex gap-2">
                    {/* <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-blue-50 text-blue-700 text-xs font-medium hover:bg-blue-100 transition-colors">
                      <Eye size={14} /> View
                    </button> */}
                    <button 
                      onClick={(e) => handleCopyLink(e, form)}
                      className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-gray-50 text-gray-700 text-xs font-medium hover:bg-gray-100 transition-colors"
                    >
                      {copiedId === (form._id || form.formId) ? (
                        <><Check size={14} className="text-green-600" /> Copied</>
                      ) : (
                        <><LinkIcon size={14} /> Copy Link</>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}