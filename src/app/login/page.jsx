import { authbanner } from '@/assets'
import SvgIcons from '@/assets/SvgIcons'
import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <>
     <div className="min-h-screen flex flex-wrap-reverse  lg:flex-nowrap items-center justify-center gap-8  md:justify-start ">
       
        <Image 
          src={authbanner}
          alt="imagebanner"
          className="w-full max-w-[100%] lg:max-w-[50%] h-[100vh]"
        />
        <div className="bg-white  rounded px-8 pt-6 pb-8 mb-4 w-full max-w-[100%] lg:max-w-[50%]">
            <p>We’re glad to have you! 👋</p>
          <h2 className="text-2xl font-bold mb-6 ">Create your Account</h2>

          <div className="mb-4 mt-7 relative">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <div className="flex items-center absolute inset-y-0 top-7 right-5 pl-1">
              <SvgIcons.Correct className="h-6 w-6 text-gray-500" />
            </div>
            <input
              className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              placeholder="Email"
            />
          </div>
          
          <div className="mb-4 relative">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            
            <input
              className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
            />
            <div className="absolute right-5 top-9">
              <SvgIcons.Hidden className="h-6  w-6 text-gray-500" />
            </div>
          </div>
        

           <button className='w-full bg-primary text-white py-3 rounded-md'>Login</button>

        
        </div>
      </div>
    </>
  )
}

export default page