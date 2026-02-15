import SignIn from '@/components/auth/SignIn'
import React from 'react'

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
        <SignIn/>
    </div>
  )
}

export default page