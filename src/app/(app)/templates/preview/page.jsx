import TemplatePreview from '@/components/TemplatePreview/TemplatePreview'
import React from 'react'
import Topbar from '@/components/Topbar';

function page() {
  return (
    <div>
        <Topbar title='Preview' />
        <TemplatePreview/>
    </div>
  )
}

export default page