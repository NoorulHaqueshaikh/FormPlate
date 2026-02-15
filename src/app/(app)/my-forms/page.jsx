import React from 'react'
import MyForms from '@/components/MyForms';
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
        <Topbar title='My Forms' />
        <MyForms />
    </div>
  )
}

export default page