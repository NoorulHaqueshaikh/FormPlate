import Dashboard from '@/components/Dashboard'
import React from 'react'
import Topbar from '@/components/Topbar';

// 🚫 Prevent search engines from indexing dashboard
export const metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "none",
      "max-snippet": -1,
    },
  },
};

function page() {
  return (
    <div>
        <Topbar title="Dashboard" />
        <Dashboard />
    </div>
  )
}

export default page