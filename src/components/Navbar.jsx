import { tdllogo } from '@/assets'
import Image from 'next/image'
import React from 'react'

const Navbar = () => {
  return (
    <div className='flex h-[8vh] w-full '>
    <Image  src={tdllogo} alt='tdlogo' className='w-[20%] h-[40px] mt-4 px-6   '/>
     <div className='w-[80%] h-full bg-primary'></div>
    </div>
  )
}

export default Navbar