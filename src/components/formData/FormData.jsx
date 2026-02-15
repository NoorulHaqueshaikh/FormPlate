"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { 
  Search, 
  Download, 
  Settings, 
  ExternalLink, 
  X, 
  FileText, 
  User, 
  Mail,
  Loader2,
  Eye,
  ArrowLeft,
  Maximize2,
  Calendar
} from 'lucide-react';

const API = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

export default function FormData({ formId }) {
  const router = useRouter();

  // State
  const [loading, setLoading] = useState(true);
  const [formName, setFormName] = useState("");
  const [submissions, setSubmissions] = useState([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Modal State
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Preview State (Image or PDF)
  const [previewFile, setPreviewFile] = useState(null); 

  useEffect(() => {
    if (formId) {
      fetchFormSubmissions();
    }
  }, [formId]);

  // --- Search Logic ---
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredSubmissions(submissions);
    } else {
      const lowerQuery = searchQuery.toLowerCase();
      const filtered = submissions.filter(sub => {
        const name = getApplicantName(sub);
        return name.toLowerCase().includes(lowerQuery);
      });
      setFilteredSubmissions(filtered);
    }
  }, [searchQuery, submissions]);

  const fetchFormSubmissions = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${API}/form/specific-form`, 
        { formId },
        { withCredentials: true }
      );
      
      if (response.status === 200 && response.data.success) {
        setFormName(response.data.form?.formName || "Untitled Form");
        setSubmissions(response.data.submissions || []);
        setFilteredSubmissions(response.data.submissions || []);
      }
    } catch (error) {
      console.error("Error fetching form data:", error);
    } finally {
      setLoading(false);
    }
  };

  // --- Helpers ---
  const formatFormName = (name) => {
    if (!name) return "Untitled Form";
    return name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const formatLabel = (key) => {
    const label = key.replace(/([A-Z])/g, ' $1').trim();
    if (label.toLowerCase().includes('resume url')) return "Resume";
    if (label.toLowerCase() === 'url') return "Link";
    return label;
  };

  const getApplicantName = (sub) => {
    if (sub.fullName) return sub.fullName;
    if (sub.firstName && sub.lastName) return `${sub.firstName} ${sub.lastName}`;
    if (sub.firstName) return sub.firstName;
    if (sub.name) return sub.name;
    return "Anonymous";
  };

  const getApplicantEmail = (sub) => {
    return sub.email || sub.emailAddress || "No email";
  };

  const getSummaryField = (sub) => {
    const priorityKeys = ['role', 'position', 'jobTitle', 'subject', 'topic', 'company', 'interest', 'city'];
    for (const key of priorityKeys) {
      if (sub[key]) return { label: key, value: sub[key] };
    }
    return { label: 'ID', value: sub._id?.slice(-6) || "..." };
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
  };

  const formatReadableDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString; 
    return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(date);
  };

  const getFileType = (url) => {
    if (typeof url !== 'string') return null;
    const cleanUrl = url.toLowerCase();
    if (cleanUrl.match(/\.(jpeg|jpg|gif|png|webp|bmp|svg)$/)) return 'image';
    if (cleanUrl.match(/\.(pdf)$/)) return 'pdf';
    if (cleanUrl.includes('pdf')) return 'pdf';
    return 'other';
  };

  const isDateString = (value) => {
    if (typeof value !== 'string') return false;
    return /^\d{4}-\d{2}-\d{2}/.test(value) && !isNaN(Date.parse(value));
  };

  const downloadCSV = () => {
    if (submissions.length === 0) return;
    const unwantedKeys = ['__v', 'userId', 'formId', '_id', 'updatedAt'];
    const headers = Object.keys(submissions[0]).filter(k => !unwantedKeys.includes(k));

    const csvRows = submissions.map(row => {
      return headers.map(header => {
        let val = row[header] || '';
        if (header === 'createdAt' || isDateString(val)) val = formatReadableDate(val);
        if (header.toLowerCase().includes('phone') || header.toLowerCase().includes('mobile')) val = `'${val}`;
        return `"${String(val).replace(/"/g, '""')}"`;
      }).join(',');
    });

    const csvContent = [headers.join(','), ...csvRows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${formName.replace(/\s+/g, '_')}_submissions.csv`;
    link.click();
  };

  const handleViewSubmission = (sub) => {
    setSelectedSubmission(sub);
    setIsModalOpen(true);
  };

  const StatusBadge = ({ status }) => {
    const styles = {
      New: "bg-blue-50 text-blue-700 border-blue-200",
      "Under Review": "bg-yellow-50 text-yellow-700 border-yellow-200",
      Interview: "bg-green-50 text-green-700 border-green-200",
      Rejected: "bg-gray-100 text-gray-600 border-gray-200",
    };
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status] || styles["New"]}`}>
        {status || "New"}
      </span>
    );
  };

  const isEmpty = (value) => {
     if (value === null || value === undefined) return true;
     if (typeof value === 'string' && value.trim() === '') return true;
     if (Array.isArray(value) && value.length === 0) return true;
     return false;
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4 md:p-10">
      
      {/* Header */}
      <div className="flex flex-col gap-6 mb-8">
        <div>
            <button 
                onClick={() => router.push('/submissions')}
                className="group flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mb-3"
            >
                <ArrowLeft size={20} className="text-gray-400 group-hover:text-gray-900 group-hover:-translate-x-1 transition-all" />
                <span className="text-lg font-medium text-gray-600 group-hover:text-gray-900">Back to Submissions</span>
            </button>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{formatFormName(formName)}</h1>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Search by applicant name..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                />
            </div>
            <div className="flex items-center gap-3">
                <button onClick={downloadCSV} className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium shadow-sm w-full md:w-auto">
                    <Download size={16} /> Export CSV
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-2 bg-[#1e3a8a] text-white rounded-lg hover:bg-[#172554] transition-colors text-sm font-medium shadow-sm w-full md:w-auto">
                    <Settings size={16} /> Settings
                </button>
            </div>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
            <Loader2 className="animate-spin text-blue-600 mb-4" size={32} />
            <span>Loading submissions...</span>
        </div>
      ) : filteredSubmissions.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center text-gray-500 shadow-sm">
            <p>{searchQuery ? "No results found." : "No submissions found."}</p>
        </div>
      ) : (
        <>
        {/* Desktop Table */}
        <div className="hidden md:block bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500 font-semibold">
                    <th className="px-6 py-4">Applicant Name</th>
                    <th className="px-6 py-4">Summary</th>
                    <th className="px-6 py-4">Date Applied</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                    {filteredSubmissions.map((sub) => {
                        const name = getApplicantName(sub);
                        const email = getApplicantEmail(sub);
                        const summary = getSummaryField(sub);
                        return (
                        <tr key={sub._id} className="hover:bg-gray-50/50 transition-colors group">
                            <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">
                                {getInitials(name)}
                                </div>
                                <div>
                                <div className="font-medium text-gray-900">{name}</div>
                                <div className="text-gray-500 text-xs">{email}</div>
                                </div>
                            </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="text-gray-900 font-medium capitalize truncate max-w-[150px]">
                                {summary.value}
                                </div>
                                <div className="text-xs text-gray-400 capitalize">{formatLabel(summary.label)}</div>
                            </td>
                            <td className="px-6 py-4 text-gray-600">{formatReadableDate(sub.createdAt)}</td>
                            <td className="px-6 py-4"><StatusBadge status={sub.status} /></td>
                            <td className="px-6 py-4 text-right">
                            <button onClick={() => handleViewSubmission(sub)} className="inline-flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-medium text-gray-600 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all">
                                <Eye size={14} /> View
                            </button>
                            </td>
                        </tr>
                        );
                    })}
                </tbody>
            </table>
            </div>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden flex flex-col gap-4">
            {filteredSubmissions.map((sub) => {
                const name = getApplicantName(sub);
                const email = getApplicantEmail(sub);
                const summary = getSummaryField(sub);
                return (
                    <div key={sub._id} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">
                                    {getInitials(name)}
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-900">{name}</div>
                                    <div className="text-xs text-gray-500">{email}</div>
                                </div>
                            </div>
                            <StatusBadge status={sub.status} />
                        </div>
                        <div className="grid grid-cols-2 gap-4 py-3 border-t border-b border-gray-100 mb-3">
                            <div>
                                <span className="text-[10px] uppercase text-gray-400 font-semibold">Applied</span>
                                <div className="text-sm text-gray-700">{formatReadableDate(sub.createdAt)}</div>
                            </div>
                            <div>
                                <span className="text-[10px] uppercase text-gray-400 font-semibold">{formatLabel(summary.label)}</span>
                                <div className="text-sm text-gray-700 capitalize truncate">{summary.value}</div>
                            </div>
                        </div>
                        <button onClick={() => handleViewSubmission(sub)} className="w-full flex items-center justify-center gap-2 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg text-sm font-medium transition-colors border border-gray-200">
                            <Eye size={16} /> View Details
                        </button>
                    </div>
                );
            })}
        </div>
        </>
      )}

      {/* Submission Details Modal */}
      {isModalOpen && selectedSubmission && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={() => setIsModalOpen(false)}></div>
          
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50/50">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Submission Details</h2>
                <p className="text-sm text-gray-500 mt-1">Submitted on {formatReadableDate(selectedSubmission.createdAt)}</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"><X size={20} /></button>
            </div>

            <div className="p-6 overflow-y-auto custom-scrollbar space-y-6">
              
              {/* Profile Card with fixed wrapping */}
              <div className="flex items-start gap-4 p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-lg shrink-0">
                  {getInitials(getApplicantName(selectedSubmission))}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-bold text-gray-900 break-words">{getApplicantName(selectedSubmission)}</h3>
                  <div className="flex flex-col gap-1 mt-1 text-sm text-gray-600">
                      {/* EMAIL FIX: break-all added here */}
                      <span className="flex items-center gap-2 break-all">
                        <Mail size={14} className="shrink-0" /> {getApplicantEmail(selectedSubmission)}
                      </span>
                      {selectedSubmission.phone && !isEmpty(selectedSubmission.phone) && (
                        <span className="flex items-center gap-2">
                           <User size={14} className="shrink-0" /> {selectedSubmission.phone}
                        </span>
                      )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {Object.entries(selectedSubmission).map(([key, value]) => {
                    const ignore = ['_id', 'userId', 'formId', '__v', 'updatedAt', 'firstName', 'lastName', 'fullName', 'email', 'phone', 'resumePublicId', 'createdAt'];
                    if (ignore.includes(key)) return null;
                    if (isEmpty(value)) return null;

                    if (key.toLowerCase().includes('resume') || key.toLowerCase().includes('file') || key.toLowerCase().includes('url') || key.toLowerCase().includes('photo')) {
                       const fileType = getFileType(value);
                       return (
                         <div key={key} className="col-span-full">
                           <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">{formatLabel(key)}</label>
                           {fileType === 'image' && (
                               <div className="group relative w-full md:w-64 h-48 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 cursor-pointer shadow-sm hover:shadow-md transition-all" onClick={() => setPreviewFile({ type: 'image', url: value })}>
                                    <img src={value} alt="Preview" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                                        <div className="bg-white/90 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"><Maximize2 className="text-gray-700" size={20} /></div>
                                    </div>
                               </div>
                           )}
                           {fileType === 'pdf' && (
                               <div onClick={() => setPreviewFile({ type: 'pdf', url: value })} className="group relative w-full md:w-64 h-32 bg-red-50 rounded-lg border border-red-100 cursor-pointer flex flex-col items-center justify-center gap-2 hover:bg-red-100 transition-colors">
                                    <FileText className="text-red-500" size={32} />
                                    <span className="text-xs font-medium text-red-700">Click to View PDF</span>
                                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"><ExternalLink size={14} className="text-red-400" /></div>
                               </div>
                           )}
                           {fileType === 'other' && (
                               <a href={value} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-blue-600 hover:text-blue-800 hover:border-blue-300 transition-colors w-full group">
                                 <div className="p-2 bg-blue-100 rounded text-blue-600 group-hover:bg-blue-200 transition-colors"><ExternalLink size={20} /></div>
                                 <div className="flex-1 min-w-0">
                                    <div className="font-medium truncate underline decoration-dotted underline-offset-2">Open Link</div>
                                    <div className="text-xs text-gray-400 truncate">{value}</div>
                                 </div>
                               </a>
                           )}
                         </div>
                       );
                    }
                    const isDate = key.toLowerCase().includes('date') || key.toLowerCase().includes('dob') || isDateString(value);
                    const displayValue = isDate ? formatReadableDate(value) : value.toString();
                    return (
                      <div key={key} className={displayValue.length > 50 ? "col-span-full" : ""}>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">{formatLabel(key)}</label>
                        <div className="p-3 bg-gray-50 border border-gray-100 rounded-lg text-gray-800 text-sm break-words whitespace-pre-wrap leading-relaxed flex items-center gap-2">
                          {isDate && <Calendar size={14} className="text-gray-400" />} {displayValue}
                        </div>
                      </div>
                    );
                 })}
              </div>
            </div>
            <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3">
               <button onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* FULL SCREEN PREVIEW MODAL */}
      {previewFile && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-sm p-2 md:p-8 animate-in fade-in duration-200">
              <div className="absolute top-4 right-4 z-50 flex gap-2">
                 <a href={previewFile.url} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-md"><Download size={24} /></a>
                 <button className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-md" onClick={() => setPreviewFile(null)}><X size={24} /></button>
              </div>
              <div className="w-full h-full max-w-6xl max-h-full flex items-center justify-center relative">
                  {previewFile.type === 'image' ? (
                      <img src={previewFile.url} alt="Full Preview" className="max-w-full max-h-full object-contain rounded-md shadow-2xl" />
                  ) : (
                      <object data={previewFile.url} type="application/pdf" className="w-full h-full rounded-lg bg-white shadow-2xl">
                         <div className="flex flex-col items-center justify-center h-full bg-white text-gray-500 gap-4">
                            <p>Unable to display PDF inline.</p>
                            <a href={previewFile.url} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Download PDF</a>
                         </div>
                      </object>
                  )}
              </div>
          </div>
      )}
    </div>
  );
}