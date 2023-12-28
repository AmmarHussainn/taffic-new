'use client';
import {
  billingicon,
  companiesicon,
  peoplesicon,
  pixelicon,
  settingicon,
  trafficdataicon,
} from '@/assets';
import Image from 'next/image';
import React, { useState } from 'react';
import ProgressBar from '@ramonak/react-progress-bar';

const Sidebar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  return (
    <>
      <div className='max-w-[20%] h-[92vh] w-full  border '>
        <div className='flex flex-col h-full justify-between w-[100%]'>
          <div className='py-7 px-2'>
            <div className='flex px-7 py-2 gap-3  '>
              <Image src={companiesicon} alt='companiesicon' />
              Companies
            </div>
            <div className='flex px-7 py-5 gap-3  '>
              <Image
                src={peoplesicon}
                className='w-[20px] h-[20px] mr-2'
                alt='peoplesicon'
              />
              People
            </div>
            <div className='flex px-7 py-2 gap-3  '>
              <Image src={trafficdataicon} alt='trafficdataicon' />
              Traffic Data
            </div>
          </div>

          <div>
            <div className='w-[170px] mx-7 my-4'>
              <p>Usage</p>
              <ProgressBar
                isLabelVisible={false}
                completed={60}
                bgColor='green'
                height='10px'
                width='100%'
              />
              <p className='text-[12px] pt-2 text-[#AAAAAA]'>
                {' '}
                400 of 1000 users identified
              </p>
            </div>
            <div>
              <div className='mx-7'>
                <div class='relative inline-block text-left'>
                  <div className='w-[170px]'>
                    <button
                      type='button'
                      class='inline-flex w-full justify-between gap-x-1.5 rounded-md bg-gray-200 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                      id='menu-button'
                      aria-expanded='true'
                      aria-haspopup='true'
                      onClick={toggleDropdown}
                    >
                      Options
                      <svg
                        class='-mr-1 h-5 w-5 text-black'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                        aria-hidden='true'
                      >
                        <path
                          fill-rule='evenodd'
                          d='M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z'
                          clip-rule='evenodd'
                        />
                      </svg>
                    </button>
                  </div>

               {  isDropdownOpen && <div
                    class='absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
                    role='menu'
                    aria-orientation='vertical'
                    aria-labelledby='menu-button'
                    tabindex='-1'
                  >
                    <div class='py-1' role='none'>
                      <a
                        href='#'
                        class='text-gray-700 block px-4 py-2 text-sm'
                        role='menuitem'
                        tabindex='-1'
                        id='menu-item-0'
                      >
                        Account settings
                      </a>
                      <a
                        href='#'
                        class='text-gray-700 block px-4 py-2 text-sm'
                        role='menuitem'
                        tabindex='-1'
                        id='menu-item-1'
                      >
                        Support
                      </a>
                      <a
                        href='#'
                        class='text-gray-700 block px-4 py-2 text-sm'
                        role='menuitem'
                        tabindex='-1'
                        id='menu-item-2'
                      >
                        License
                      </a>
                      <form method='POST' action='#' role='none'>
                        <button
                          type='submit'
                          class='text-gray-700 block w-full px-4 py-2 text-left text-sm'
                          role='menuitem'
                          tabindex='-1'
                          id='menu-item-3'
                        >
                          Sign out
                        </button>
                      </form>
                    </div>
                  </div>}
                </div>
              </div>

              <div className='py-7 px-2'>
                <div className='flex px-7 py-2 gap-3  '>
                  <Image src={pixelicon} alt='pixelicon' />
                  Pixel Settings
                </div>
                <div className='flex px-7 py-5 gap-3  '>
                  <Image
                    src={settingicon}
                    className='w-[20px] h-[20px] '
                    alt='settingicon'
                  />
                  Account Settings
                </div>
                <div className='flex px-7 py-2 gap-3  '>
                  <Image
                    src={billingicon}
                    alt='billingicon'
                    className='w-[20px] h-[20px]'
                  />
                  Billing
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
