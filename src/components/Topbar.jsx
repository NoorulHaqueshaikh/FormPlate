"use client";

import React from "react";
import { Bell, Plus } from "lucide-react";

function Topbar({ title = "Dashboard" }) {
  return (
    <div
      className="
        w-full bg-white border-b border-gray-100
        px-4 py-3 md:px-8 md:py-4
        flex justify-between items-center
        sticky top-0 z-30
        hidden md:flex
      "
    >
      {/* Left: Title */}
      <h1 className="text-xl md:text-2xl font-bold text-gray-900">
        {title}
      </h1>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition"
        >
          <Bell size={20} strokeWidth={1.5} />
        </button>

        <button
          type="button"
          className="flex items-center gap-2 bg-[#1e3a8a] hover:bg-[#172554]
                     text-white px-4 py-2 rounded-lg font-medium
                     transition-colors shadow-sm text-sm"
        >
          <Plus size={16} strokeWidth={3} />
          <span>Create New Form</span>
        </button>
      </div>
    </div>
  );
}

export default Topbar;
