import InternshipApplication from '@/components/publicForms/InternshipApplication'
import { Inter } from 'next/font/google'
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

async function page({params}) {
  const { formId } = await params;
  return (
    <div>
        <InternshipApplication formId={formId}/>
    </div>
  )
}

export default page