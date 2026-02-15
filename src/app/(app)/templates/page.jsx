import React from 'react'
import Templates from '@/components/Templates';
import Topbar from '@/components/Topbar';
import { Bell, Plus } from "lucide-react";


function page() {
  return (
    <div>
        <Topbar title='Templates' />
        <Templates />
    </div>
  )
}

export default page