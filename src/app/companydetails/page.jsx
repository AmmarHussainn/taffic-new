'use client';
import {
  backarrow,
  eyeicon,
  googleicon,
  jobicon,
  linkedin,
  safari,
  snitcherlogo,
} from '@/assets';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import CustomModal from '@/components/CustomModal';
import SvgIcons from '@/assets/SvgIcons';
import axios from 'axios';
import Flag from 'react-flags-select';
// import 'react-flags-select/css/react-flags-select.css';
import { US } from 'country-flag-icons/react/3x2';

const Page = () => {
  const [activeTab, setActiveTab] = useState('timeline');
  const [showModel, setShowModel] = useState(true);
  const [show, setShow] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const monthsOfYear = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    // Add any additional functionality you want to execute when a tab is clicked
  };

  useEffect(() => {
    const apiUrl = 'https://agile-sierra-68640-c9fe32348d22.herokuapp.com/userDetals';
    axios
      .get(apiUrl)
      .then((response) => {
        const codeMaxTimeMap = new Map();
        response.data.data.forEach((data) => {
          const { sepratecode, timeSpent } = data;
          if (
            !codeMaxTimeMap.has(sepratecode) ||
            timeSpent > codeMaxTimeMap.get(sepratecode).timeSpent
          ) {
            codeMaxTimeMap.set(sepratecode, { ...data });
          }
        });

        const result = Array.from(codeMaxTimeMap.values());

        const groupedData = result.reduce((acc, entry, index) => {
          const { usercode } = entry;
          if (!acc[usercode]) {
            acc[usercode] = [];
          }
          acc[usercode].push({ index, data: entry });
          return acc;
        }, {});

        for (const key in groupedData) {
          if (groupedData.hasOwnProperty(key)) {
            groupedData[key].sort((a, b) => {
              const dateA = new Date(a.data.date).getTime();
              const dateB = new Date(b.data.date).getTime();
              return dateA - dateB;
            });
          }
        }
        const dataArray = Object.values(groupedData).map((data) => ({
          ...data,
        }));
        console.log('groupedData', dataArray);
        setData(dataArray);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  const CustomerModal = () => {
    return (
      <>
        <div className=' container max-w-[650px] w-full '>
          <div className='flex justify-end w-full '>
            <SvgIcons.Close />
          </div>
          <h2 className='text-3xl font-bold'>Jack Caspino</h2>
          <div className='flex justify-start gap-4 items-start mt-2 border-b-2 py-6'>
            <button
              onClick={() => handleTabClick('timeline')}
              className='bg-primary text-black px-2 py-[2px] text-sm border rounded-2xl'
            >
              Contact Details
            </button>
            <button
              onClick={() => handleTabClick('timeline')}
              className='bg-primary text-black px-2 py-[2px] text-sm border rounded-2xl'
            >
              Contact Details
            </button>
            <button
              onClick={() => handleTabClick('timeline')}
              className='bg-primary text-black px-2 py-[2px] text-sm border rounded-2xl'
            >
              Contact Details
            </button>
          </div>

          <div className='max-w-[400px] py-5 px-10 w-full'>
            <div className='flex gap-20'>
              <p>Email</p>
              <p>jcaspino@gmail.com</p>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      {/* <Navbar /> */}
      <div className='flex w-full mt-5'>
        <Sidebar />
        <div className='container mx-auto px-5 w-full'>
          <div className='flex w-full justify-between items-center my-1'>
            <Image
              src={backarrow}
              alt='backarrow'
              className='w-[80px]  h-[20px]'
            />
            <div className=' flex max-w-[180px] w-full justify-evenly items-center'>
              <div className=' border rounded-lg  p-1'>
                <Image src={googleicon} alt='searchicon' className='w-8 h-6' />
              </div>
              <Image src={linkedin} alt='linkedin' className='w-10 h-8' />
              <Image src={safari} alt='safari' className='w-10 h-8' />
            </div>
          </div>
          <div className='flex w-[100%] justify-between'>
            <div className='w-[30%] rounded-md bg-[#f6f6f6db] p-4  '>
              <div className='flex justify-start gap-7 my-7 items-center'>
                <Image src={snitcherlogo} alt='snitcherlog' className='w-16' />
                <div>
                  <h2 className='text-xl'>Snitcher</h2>
                  <div className='flex '>
                    <Image
                      src={jobicon}
                      alt='jobicon'
                      className='w-[20px] h-[20px]'
                    />
                    <p>IT Company</p>
                  </div>
                </div>
              </div>
              <div className='max-w-[300px] w-full border p-2'>
                <div className='flex justify-start gap-3 items-center'>
                  <Image
                    src={eyeicon}
                    alt='eyeicon'
                    className='ml-2 w-[24px] h-[24px]'
                  />
                  <p>Visited 2 Times</p>
                </div>
              </div>
            </div>
            <div className='w-[65%]'>
              <div className='flex gap-2 px-4'>
                <button
                  onClick={() => handleTabClick('timeline')}
                  className={`text-black ${
                    activeTab === 'timeline'
                      ? 'bg-primary , text-white'
                      : 'bg-white , text-black'
                  } px-1 text-sm rounded-xl border`}
                >
                  Timeline
                </button>
                <button
                  onClick={() => handleTabClick('contact')}
                  className={`text-black ${
                    activeTab === 'contact'
                      ? 'bg-primary , text-white'
                      : 'bg-white , text-black'
                  } px-1 text-sm rounded-xl border`}
                >
                  Contact
                </button>
              </div>

              <div className='w-[100%] bg-[#f6f6f6db] rounded-md p-[22px] mt-[22px]'>
                {data &&
                  data.length > 0 &&
                  data.map((ele, idx) => {
                    return (
                      <div className=' w-[100%]  mb-[20px] bg-white   rounded-md  p-5 px-3'>
                        {console.log('ele', ele)}
                        <div className='flex gap-2 w-[100%] justify-between items-center px-2 py-2 bg-white '>
                          <div className='flex gap-2 items-center'>
                            <p className='text-4xl'>
                              {new Date(ele[0].data.date).getDate()}
                            </p>
                            <div>
                              <p>
                                {
                                  daysOfWeek[
                                    new Date(ele[0].data.date).getDay()
                                  ]
                                }
                              </p>
                              <p>
                                {
                                  monthsOfYear[
                                    new Date(ele[0].data.date).getMonth()
                                  ]
                                }
                                , {new Date(ele[0].data.date).getFullYear()}
                              </p>
                            </div>
                          </div>
                          <div>
                            {/* <p>7:24 PM</p> */}
                            <p>
                              {new Intl.DateTimeFormat('en-US', {
                                hour: 'numeric',
                                minute: 'numeric',
                                hour12: true,
                              }).format(new Date(ele[0].data.date))}
                            </p>
                          </div>

                          <div className='flex items-center gap-4'>
                            {ele[0].data?.ip?.countryCode && (
                              <img
                                src={`https://flagsapi.com/${ele[0].data.ip.countryCode}/flat/24.png`}
                                alt='uslogo'
                                width={24}
                                height={24}
                                className='w-[24px] h-[20px]'
                              />
                            )}
                            <p>{ele[0].data?.ip?.country}</p>
                          </div>

                          <div className=' px-2 py-1 border border-solid'>
                            Jack Caspino
                          </div>
                        </div>

                        <div className='w-[80%] bg-white mx-auto  grid grid-cols-4 text-[#979797] place-content-between place-items-center gap-3'>
                          <div className='bg-[#f7f7f7] text-[#979797]  w-[100%] rounded-md p-2'>
                            <p className='text-[10px] text-center'>Client</p>
                            <p className='text-[10px] pt-10 text-center'>
                              {ele[0].data?.browser}, {ele[0].data?.agent}
                            </p>
                          </div>
                          <div className='bg-[#f7f7f7] text-[#979797]  w-[100%] rounded-md p-2'>
                            <p className='text-[10px] text-center'>Referrer</p>
                            <p className='text-[10px] pt-10 text-center'>
                              {ele[0].data?.referrer ? 'reffered' : 'direct'}
                            </p>
                          </div>
                          <div className='bg-[#f7f7f7] text-[#979797]  w-[100%] rounded-md p-2'>
                            <p className='text-[10px] text-center'>
                              Pages Viewed
                            </p>
                            <p className='text-[10px] pt-10 text-center'>
                              {Object.keys(ele).length}
                            </p>
                          </div>
                          <div className='bg-[#f7f7f7] text-[#979797]  w-[100%] rounded-md p-2'>
                            <p className='text-[10px] text-center'>
                              Time Spent
                            </p>
                            <p className='text-[10px] pt-10 text-center'>
                              {
                               parseInt( Object.values(ele)
                                  .map((data) => ({ ...data }))
                                  .reduce(
                                    (total, current) => total + current.data.timeSpent,
                                    0
                                  ) / (1000 * 60)) + 'mins'
                                }
                                
                              
                              {/* // 'mins' */}
                            </p>
                          </div>
                        </div>
                        {Object.values(ele)
                          .map((data) => ({ ...data }))
                          .map((newEle, id) => (
                            <div className='w-[80%] bg-white border border-solid border-gray-300 rounded-md my-2 mx-auto   text-black  '>
                              <p className=' px-3 py-2 text-xl'>
                                {newEle.data.pageName == '/' ? newEle.data.domain:newEle.data.pageName.replace('/', '')}
                              </p>
                              <p className='text-[#979797] px-3'>
                                For {newEle.data.timeSpent / 1000} seconds
                              </p>
                            </div>
                          ))}
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <CustomModal
        open={showModel}
        close={() => setShowModel(false)}
        width={'50%'}
        borderRadius={'12px'}
        component={<CustomerModal show={show} />}
      />
    </>
  );
};

export default Page;
