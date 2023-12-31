'use client';
import {
  billingicon,
  bracket,
  codebracket,
  companiesicon,
  controlicon,
  peoplesicon,
  settingicon,
  tdllogo,
  trafficdataicon,
} from '@/assets';
import Image from 'next/image';
import React, { useState } from 'react';
import ProgressBar from '@ramonak/react-progress-bar';

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const Menus = [
    { title: 'Companies', src: companiesicon },
    { title: 'People', src: peoplesicon },
    { title: 'Traffic Data', src: trafficdataicon },
    { title: 'Schedule', src: billingicon, gap: true },
    { title: 'Companies', src: bracket },
    { title: 'Settings', src: settingicon },
    { title: 'Files', src: billingicon, gap: true },
   
  ];

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  return (
    <>
      <div className='flex'>
        <div
          className={` ${
            open ? 'w-72' : 'w-20 '
          } bg-dark-purple h-screen p-5  pt-8 relative duration-300`}
        >
          <Image 
            src= {controlicon}
            className={`absolute cursor-pointer -right-3 top-24 w-7 border-dark-purple
           border-2 rounded-full  ${!open && 'rotate-180'}`}
            onClick={() => setOpen(!open)}
          />
          <div className='flex gap-x-4 items-center'>
            <Image
              src={tdllogo}
              className={`cursor-pointer duration-500 ${
                open && 'rotate-[360deg]'
              }`}
            />
            <h1
              className={`text-black origin-left font-medium text-xl duration-200 ${
                !open && 'scale-0'
              }`}
            >
              Traffic Data Labs
            </h1>
          </div>
          <ul className='pt-6 text-gray-400'>
            {Menus.map((Menu, index) => (
              <li
                key={index}
                className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white  text-sm items-center gap-x-4 
              ${Menu.gap ? 'mt-9' : 'mt-2'} ${
                  index === 0 && 'bg-light-white'
                } `}
              >
                {
                  console.log('Menu',Menu )
                }
                {Menu.title == 'Schedule' ? (
                  <>
                  <div className=' w-full' >

                    <ProgressBar
                      isLabelVisible={false}
                      completed={60}
                      bgColor='green'
                      height='10px'
                      width='100%'
                    />
                  {open&&  <p className='text-xs pt-3 text-gray-400'>400 of 1000 users identified</p>}
                  </div>
                  </>
                ) : (
                  <>
                   {Menu.title =="Files" ? (
                    <>
                    <div className='py-3 w-full bg=[#b0b6c3] shadow-md  flex items-center justify-center'>
                   <Image  src={codebracket}/>
                    </div>
                     </> 
                   ) : (
                    <>
                     <Image src={Menu.src} alt='img' />
                    <span
                      className={`${
                        !open && 'hidden'
                      } origin-left duration-200`}
                    >
                      {Menu.title}
                    </span>
                    </>
                   )}
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;