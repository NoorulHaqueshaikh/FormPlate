import Topbar from '@/components/Topbar'
import { Form } from 'lucide-react';
import React from 'react'
import FormData from '@/components/formData/FormData';

async function page({ params }) { 
    const { formId } = await params;
  return (
      <div>
        <Topbar title="Submissions" />
        <FormData formId={formId} />
    </div>
  )
}

export default page