"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "@/components/Sidebar";

const API = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

export default function AppLayout({ children }) {
  const [user, setUser] = useState(null);


  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${API}/auth/me`, {
          withCredentials: true,
        });

        setUser(res.data.user); // logged in
      } catch (err) {
        setUser(null); // not logged in → totally fine
      } 
    };

    checkAuth();
  }, []);

  

  return (
    <>
      <Sidebar user={user}/>
      <main className="md:ml-64 min-h-screen pt-16 md:pt-0">
        {children}
      </main>
    </>
  );
}

