import SignIn from '@/components/auth/SignIn'
import React from 'react'

// 🚫 Prevent search engines from indexing auth page
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

export default function Page({ searchParams }) {
  const redirect = searchParams?.redirect || "/";

  return (
    <div>
      <SignIn redirect={redirect} />
    </div>
  );
}
