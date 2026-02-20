"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation"; // Import this to get current URL
import { useRouter } from "next/navigation";
import axios from "axios";

import {
  LayoutDashboard,
  LayoutTemplate,
  FileText,
  Inbox,
  Menu,
  X,
} from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

export default function Sidebar({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    // Removed hardcoded 'active: true' property
    { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { name: "Templates", icon: LayoutTemplate, href: "/" },
    { name: "My Forms", icon: FileText, href: "/my-forms" },
    { name: "Submissions", icon: Inbox, href: "/submissions" },
  ];

  // console.log("Sidebar received user:", user); // Debugging line to check user prop
  const logoutUser = async () => {
    try {
      const response = await axios.post(`${API}/auth/logout`, {}, { withCredentials: true });
      if (response.status === 200) {
        router.push("/signin");
      } else {
        console.error("Logout failed:", response);
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  }


  // Generate name avator when missing avatar URL
const getInitials = (name) => {
  if (!name) return "";
  const words = name.trim().split(" ");
  if (words.length === 1) {
    return words[0][0].toUpperCase();
  }
  return (
    words[0][0].toUpperCase() +
    words[words.length - 1][0].toUpperCase()
  );
};

// Random background colors
const colors = [

  "bg-blue-900",
];

// Pick random color
const avatarBgColor =
  colors[user?.name?.charCodeAt(0) % colors.length] || "bg-gray-500";


  return (
    <>
      {/* --- Mobile Menu Bar (Fixed at top) --- */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-100 px-4 flex items-center justify-between z-50">
        <div className="flex items-center gap-2">
          <div className="bg-blue-900 p-1.5 rounded-lg">
            <div className="border border-dashed border-white w-4 h-4"></div>
          </div>
          <span className="text-xl font-bold text-gray-900">FormPlate</span>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-600 focus:outline-none"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* --- Sidebar Container --- */}
      <aside
        className={`
          fixed left-0 z-40 w-64 bg-white border-r border-gray-100 shadow-sm md:shadow-none
          transform transition-transform duration-300 ease-in-out flex flex-col
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 
          /* Mobile: Top is 16 (below header), Bottom is 0. */
          top-16 bottom-0
          /* Desktop: Top is 0, Bottom is 0. */
          md:top-0 md:bottom-0
        `}
      >
        {/* Logo Section (Desktop Only) */}
        <div className="hidden md:flex items-center gap-3 px-6 py-6 mb-2">
          <div className="bg-blue-900 p-2 rounded-lg">
            <div className="border-2 border-dashed border-white w-5 h-5 opacity-80"></div>
          </div>
          <span className="text-xl font-bold text-gray-900 tracking-tight">
            FormPlate
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 space-y-2 mt-4 md:mt-0 overflow-y-auto">
          {navItems.map((item) => {
            // Determine if this item is active by comparing href with current pathname
            const isActive =
  item.name === "Templates"
    ? pathname === "/" || pathname.startsWith("/templates")
    : pathname === item.href || pathname.startsWith(item.href + "/");

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)} // Close sidebar on mobile when clicked
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors
                  ${
                    isActive
                      ? "bg-blue-900 text-white shadow-md" // Active Style
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900" // Inactive Style
                  }
                `}
              >
                <item.icon size={20} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* User Profile Section (Fixed at Bottom) */}
        <div className="p-4 border-t border-gray-100 mt-auto bg-white">
          {!mounted ? (
            // ⏳ Skeleton until hydration completes
            <div className="flex items-center gap-3 px-2 animate-pulse">
              <div className="w-10 h-10 rounded-full bg-gray-300 shrink-0" />
              <div className="flex flex-col gap-1">
                <div className="w-24 h-3 bg-gray-300 rounded" />
                <div className="w-16 h-2 bg-gray-200 rounded" />
              </div>
            </div>
          ) : user ? (
  <div className="relative px-2">
    {/* CLICKABLE USER AREA */}
    <button
      type="button"
      onClick={() => setUserMenuOpen((prev) => !prev)}
      className="flex items-center gap-3 w-full text-left"
    >
     <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 flex items-center justify-center text-white font-semibold text-sm">
  {user.avatar ? (
    <Image
      src={user.avatar}
      alt={user.name}
      width={40}
      height={40}
      className="object-cover"
    />
  ) : (
    <div
      className={`w-full h-full flex items-center justify-center ${
        avatarBgColor
      }`}
    >
      {getInitials(user.name)}
    </div>
  )}
</div>


      <div className="flex flex-col">
        <span className="text-sm font-semibold text-gray-900">
          {user.name}
        </span>
        <span className="text-xs text-gray-500">Free Plan</span>
      </div>
    </button>

    {/* POPUP */}
    {userMenuOpen && (
      <div className="absolute bottom-14 left-2 right-2 bg-blue-900 rounded-lg shadow-lg z-50">

        <button
          onClick={logoutUser}
          className="w-full px-4 py-2 text-sm text-white hover:bg-blue-800 rounded-lg text-left"

        >
          Logout
        </button>
      </div>
    )}
  </div>
) : null}

        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
