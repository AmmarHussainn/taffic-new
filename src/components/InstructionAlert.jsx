import { instructioncrossicon } from '@/assets'
import Image from 'next/image'
import React from 'react'

const InstructionAlert = () => {
  return (
    <>
    <div className='bg-[#FFC42B] w-full flex justify-evenly  h-[40px] mx-auto'>
 <p className='text-sm font-medium text-center my-auto'>It appears you haven’t installed the tracking code. Live Mentions wont work until your connect it</p>
  <button className='bg-white rounded-xl text-[#979797] py-1 px-4 my-1'>Instructions</button>
  <Image src={instructioncrossicon} alt='instructioncrossicon' className='w-[40px] h-[40px]'/>
    </div>
    </>
  )
}

export default InstructionAlert