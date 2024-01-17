'use client';
import Sidebar from '@/components/Sidebar';
import ProgressBar from '@ramonak/react-progress-bar';
import React, { useState } from 'react';

const page = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log('Form data submitted:', formData);
  };

  return (
    <>
      <div className='flex'>
        <Sidebar />
        <div className='w-[100%] flex flex-col py-10 justify-center'>
          <div className='max-w-[700px] w-full bg-[#F6F6F6] p-3 mx-auto'>
            <div className=' border-b-2 '>
              <h2 className='py-3 font-bold'>Profile</h2>
            </div>
            <div className=' flex py-5  items-center gap-4'>
              <div className='w-full'>
                <label
                  htmlFor='firstName'
                  className='block text-sm font-medium text-gray-600'
                >
                  First Name
                </label>
                <input
                  type='text'
                  id='firstName'
                  name='firstName'
                  value={formData.firstName}
                  onChange={handleChange}
                  className='mt-1 p-2 border w-full rounded-md'
                />
              </div>
              <div className='w-full'>
                <label
                  htmlFor='lastName'
                  className='block text-sm font-medium text-gray-600'
                >
                  LastName
                </label>
                <input
                  type='text'
                  id='lastName'
                  name='lastName'
                  value={formData.lastName}
                  onChange={handleChange}
                  className='mt-1 p-2 border w-full rounded-md'
                />
              </div>
            </div>

            <label
              htmlFor='email'
              className='block text-sm font-medium text-gray-600'
            >
              Email
            </label>
            <input
              type='email'
              id='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              className='mt-1 p-2 border w-full rounded-md'
            />
            <button
              onClick={handleSave}
              className='bg-blue-500 text-white px-4 py-2 my-5 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300'
            >
              Save
            </button>
          </div>

          <div className='max-w-[700px] w-full my-6 bg-[#F6F6F6] p-3 mx-auto'>
            <div className=' border-b-2 '>
              <h2 className='py-3 font-bold'>Security</h2>
            </div>
            <div className=' flex py-5  items-center gap-4'>
              <div className='w-full'>
                <label
                  htmlFor='firstName'
                  className='block text-sm font-medium text-gray-600'
                >
                  New Password
                </label>
                <input
                  type='password'
                  id='password'
                  name='Password'
                  className='mt-1 p-2 border w-full rounded-md'
                />
              </div>
              <div className='w-full'>
                <label
                  htmlFor='confirmPassword'
                  className='block text-sm font-medium text-gray-600'
                >
                  ConfirmPassword
                </label>
                <input
                  type='password'
                  id='confirmpassword'
                  name='confirmpassword'
                  className='mt-1 p-2 border w-full rounded-md'
                />
              </div>
            </div>

            <button
              onClick={handleSave}
              className='bg-blue-500 text-white px-4 py-2 my-5 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300'
            >
              Save
            </button>
          </div>

          <div className='max-w-[700px] w-full my-6 bg-[#F6F6F6] p-3 mx-auto'>
            <div className=' border-b-2 '>
              <h2 className='py-3 font-bold'>Billing</h2>
            </div>
            <div className='flex justify-between  gap-8 py-6'>
              <div className=' w-[90%]'>
                <ProgressBar
                  isLabelVisible={false}
                  completed={60}
                  bgColor='green'
                  height='10px'
                  width='100%'
                />
                <p className='text-xs pt-3 text-gray-400'>
                  400 of 1000 users identified
                </p>
                <div className='flex gap-3 items-center py-5'>
                <button className='bg-primary text-white px-3 py-1 rounded-md'>Upgrade</button>
                <button className='bg-red-600 text-white px-3 py-1 rounded-md'>Cancel</button>
                </div>

              


              </div>

              <div className='w-full'>
                <p> Payment method here & update button </p>
              </div>
            </div>

            <div className='grid w-full  grid-cols-4 place-content-between place-items-center  '>
                <div className='bg-white w-[150px] px-2 rounded-md py-2 text-center'>
                   <p className='font-semibold'>Basic</p>
                   <button className='bg-primary text-white px-2 mt-20 rounded-lg py-1'>Downgrade</button>
                </div>
                <div className='bg-white w-[150px] px-2 rounded-md py-2 text-center'>
                   <p className='font-semibold'>Regular</p>
                   <button className='bg-[#D2D2D2] text-white px-2 mt-20 rounded-lg py-1'>Current</button>
                </div>
                <div className='bg-white w-[150px] px-2 rounded-md py-2 text-center'>
                   <p className='font-semibold'>Advanced</p>
                   <button className='bg-primary text-white px-2 mt-20 rounded-lg py-1'>Upgrade</button>
                </div>
                <div className='bg-white w-[150px] px-2 rounded-md py-2 text-center'>
                   <p className='font-semibold'>Agency/Unlimited</p>
                   <button className='bg-primary text-white px-2 mt-20 rounded-lg py-1'>Schedule</button>
                </div>
                </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
