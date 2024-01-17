import SvgIcons from '@/assets/SvgIcons'
import Sidebar from '@/components/Sidebar'
import React from 'react'

const page = () => {
  return (
    <div className='flex'>
    
    <Sidebar />
    <div className='container mx-auto px-4 py-10 w-full text-black'>
        <div className='flex gap-5 max-w-[500px] w-full '>
            <div className='flex py-1 shadow-md font-semibold text-sm gap-1 items-center border border-[#D9D9D9] px-2 rounded-md'>
            <SvgIcons.AddIcon />
         <button>New</button>
            </div>
            <div className='flex py-1 shadow-md font-semibold text-sm gap-1 items-center border border-[#D9D9D9] px-2 rounded-md'>
            <SvgIcons.Segments />
         <button>Segments</button>
            </div>
            <div className='flex py-1 shadow-md font-semibold text-sm gap-1 items-center border border-[#D9D9D9] px-2 rounded-md'>
            <SvgIcons.ExportIcon />
         <button>Export</button>
            </div>
        </div>

        <div className='w-full'>
            <ul className='flex gap-2 justify-around font-bold text-sm border bg-[#F6F8FA] w-full'>
                <li>First Name</li>
                <li>Last Name</li>
                <li>Company Email</li>
                <li>State</li>
                <li>City</li>
                <li>Country</li>
                <li>Title</li>
                <li>Level</li>
                <li>Company Size</li>
                <li>Exact Employees</li>
                <li>Company HQ State</li>
                <li>Compan</li>
            </ul>
        </div>
    </div>
    </div>
  )
}

export default page