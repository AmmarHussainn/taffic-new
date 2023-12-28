// 'use client'
// import { authbanner } from '@/assets';
// import SvgIcons from '@/assets/SvgIcons';
// import Image from 'next/image';
// import React, { useState } from 'react';
// import axios from 'axios';
// const page = () => {
//   const [email, setEmail] = useState('');
//   const [businessName, setBusinessName] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [emailExists, setEmailExists] = useState(false);
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (password !== confirmPassword) {
//       console.error('Passwords do not match!');
//       return;
//     }
//     try {
//       const response = await axios.post('http://localhost:8080/users/register', {
//         email,
//         businessName,
//         password,
//       });
//       console.log('Registration successful:', response.data);
//     } catch (error) {
//       if (error.response) {
//         console.error('Registration failed:', error.response.data.message);

//             if (error.response.data.message.includes('User with this email already exists.')) {
//               setEmailExists(true);
//             } else {
//               setEmailExists(false);
//             }
//       } else if (error.request) {
//         console.error('No response received from the server.');
//       } else {
//         console.error('Error in request setup:', error.message);
//       }
//     }
//   };

//   return (
//     <>
//       <div className='min-h-screen flex flex-wrap-reverse  lg:flex-nowrap items-center justify-center gap-8  md:justify-start '>
//         <Image
//           src={authbanner}
//           alt='imagebanner'
//           className='w-full max-w-[100%] lg:max-w-[40%] h-[100vh]'
//         />
//         <form
//           className='bg-white  rounded px-8 pt-6 pb-8 mb-4 w-full max-w-[100%] lg:max-w-[50%]'
//           onSubmit={handleSubmit}
//         >
//           <p>We’re glad to have you! 👋</p>
//           <h2 className='text-2xl font-bold mb-6 '>Create your Account</h2>

//           <div className='mb-4 mt-7 relative'>
//             <label
//               className='block text-gray-700 text-sm font-bold mb-2'
//               htmlFor='email'
//             >
//               Email
//             </label>
//             {!emailExists ?  <div className='flex items-center absolute inset-y-0 top-7 right-5 pl-1'>
//               <SvgIcons.Correct className='h-6 w-6 text-gray-500' />
//             </div> : null
//             }

//             <input
//           className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
//             emailExists ? 'border-red-500' : ''
//           }`}
//           id='email'
//           type='text'
//           placeholder='Email'
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         {emailExists ? <p className='text-red-600 text-sm'>User with this email already exists. </p> : null}
//           </div>
//           <div className='mb-4 mt-7 relative'>
//             <label
//               className='block text-gray-700 text-sm font-bold mb-2'
//               htmlFor='businessname'
//             >
//               Business Name
//             </label>
//             <input
//               className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
//               id='businessname'
//               type='text'
//               placeholder='Acme Corp'
//               value={businessName}
//               onChange={(e) => setBusinessName(e.target.value)}
//             />
//           </div>

//           <div className='mb-4 relative'>
//             <label
//               className='block text-gray-700 text-sm font-bold mb-2'
//               htmlFor='password'
//             >
//               Password
//             </label>

//             <input
//               className=' shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
//               id='password'
//               type='password'
//               placeholder='Password'
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <div className='absolute right-5 top-9'>
//               <SvgIcons.Hidden className='h-6  w-6 text-gray-500' />
//             </div>
//           </div>
//           <div className='mb-6 relative'>
//             <label
//               className='block text-gray-700 text-sm font-bold mb-2'
//               htmlFor='ConfirmPassword'
//             >
//               Confirm Password
//             </label>

//             <input
//               className=' shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
//               id='confirmPassword'
//               type='password'
//               placeholder='Confirm Password'
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//             />
//             <div className='absolute right-5 top-9'>
//               <SvgIcons.Hidden className='h-6  w-6 text-gray-500' />
//             </div>
//           </div>

//           <button className='w-full bg-primary text-white py-3 rounded-md'>
//             Create Account
//           </button>
//         </form>
//       </div>
//     </>
//   );
// };

// export default page;

'use client';
import SvgIcons from '@/assets/SvgIcons';
import InstructionAlert from '@/components/InstructionAlert';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import CustomsModal from '@/components/CustomModal';
import { danger, wordPress } from '@/assets';
import { Hidden } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [selected, setSelected] = useState('All');
  const [show, setShow] = useState(false);
  let router = useRouter()


  useEffect(()=>{
    const token = localStorage.getItem('token')
    console.log('token in signup',token)
    if(!token){
      router.push('/')
    }

  },[])

  const CustomerModal = ({router}) => {
    console.log('CustomerModal', show);
    const [state, setState] = useState('installCode');
    let Pastedata = ` let firstTime=Date.now(),sepratecode=Math.floor(1e6+9e6*Math.random()),usercode=sessionStorage.getItem("t-d-labs-u-id")||Math.floor(1e6+9e6*Math.random()),ip;async function startTrackingTime(){ip=await fetch("http://ip-api.com/json").then((e=>e.json())).then((e=>e))}function stopTrackingTime(){sessionStorage.setItem("t-d-labs-u-id",usercode),fetch("https://agile-sierra-68640-c9fe32348d22.herokuapp.com/pixeltrack",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({firstTime:firstTime,endTime:Date.now(),timeSpent:Date.now()-firstTime,date:(new Date).toUTCString(),domain:new URL(window.location.href).hostname,pageName:new URL(window.location.href).pathname,sepratecode:sepratecode,ip:ip,userId:"Sp8732yibdisecialId",referrer:document.referrer,browser:navigator.userAgent.includes("Chrome")?"Chrome":"Safari",agent:/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)?"Mobile":"Desktop",usercode:Number(usercode)})})}startTrackingTime(),document.addEventListener("visibilitychange",()=>{"hidden"===document.visibilityState&&stopTrackingTime()}),window.addEventListener("blur",()=>{stopTrackingTime()}),window.addEventListener("beforeunload",()=>{stopTrackingTime(),console.log("Total time spent on page: "+totalTime/1e3+" seconds")});`;
    // let Pastedata = ` let firstTime=Date.now(),sepratecode=Math.floor(1e6+9e6*Math.random()),usercode=sessionStorage.getItem("t-d-labs-u-id")||Math.floor(1e6+9e6*Math.random()),ip;async function startTrackingTime(){ip=await fetch("http://ip-api.com/json").then((e=>e.json())).then((e=>e))}function stopTrackingTime(){sessionStorage.setItem("t-d-labs-u-id",usercode),fetch("http://localhost:8080/pixeltrack",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({firstTime:firstTime,endTime:Date.now(),timeSpent:Date.now()-firstTime,date:(new Date).toUTCString(),domain:new URL(window.location.href).hostname,pageName:new URL(window.location.href).pathname,sepratecode:sepratecode,ip:ip,userId:"${localStorage.getItem(
    //   'userId'
    // )}",referrer:document.referrer,browser:navigator.userAgent.includes("Chrome")?"Chrome":"Safari",agent:/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)?"Mobile":"Desktop",usercode:Number(usercode)})})}startTrackingTime(),document.addEventListener("visibilitychange",()=>{"hidden"===document.visibilityState&&stopTrackingTime()}),window.addEventListener("blur",()=>{stopTrackingTime()}),window.addEventListener("beforeunload",()=>{stopTrackingTime(),console.log("Total time spent on page: "+totalTime/1e3+" seconds")});`;

    return (
      <div>
        <div className='text-black font-inter text-xs font-bold leading-normal'>
          Install Deep Visitor on your site
        </div>
        <div className='flex justify-between mt-[23px] text-gray-300 font-inter text-xs font-normal leading-normal border-b-[1px] pb-[2px] border-gray-300'>
          <div className='w-1/2 flex '>
            <div
              className='flex justify-center items-center gap-[5px]'
              onClick={() => setState('installCode')}
            >
              <SvgIcons.Code /> Install Code
            </div>
            <div
              className='flex ml-[30px] justify-center items-center gap-[5px]'
              onClick={() => setState('Wordpress')}
            >
              <Image src={wordPress} alt='tdlogo' /> Wordpress
            </div>
          </div>
          <div
            className='w-1/2 flex justify-end gap-[5px]'
            onClick={() => setState('gethelp')}
          >
            <SvgIcons.Avatar /> Get Help
          </div>
        </div>
        <div className='mt-[12px] text-black font-inter text-xs font-normal leading-normal'>
          {state == 'installCode'
            ? 'Paste the code at the top of the head of every page you want to track visitors on. If you need help, reach out to our team in the chat bubble'
            : state == 'Wordpress'
            ? 'For WordPress, we recommend installing the Head, Footer and Post Injections plugin from Stefano Lissa. After installing and activating the plugin, navigate to the Settings -> Header and Footer in your WordPress dashboard. You’ll see a number of tabs in the plugin’s interface. Make sure to default ‘Head and Footer’ tab, then copy & pase the following code snippet. If you still cant figure it out, watch this video or go to the chat bubble'
            : 'Schedule a meeting below with one of our technical staff for help installing on your website! <br /> Make sure you have the login for the admin page of your website'}
        </div>

        <div
          onClick={() => {
            navigator.clipboard.writeText(Pastedata);
          }}
          className=' ml-auto w-fit p-2 cursor-pointer mt-[30px] rounded-xl text-white bg-[#5E81FF]'
        >
          copy to clipboard
        </div>

        <div
          style={{
            whiteSpace: 'none',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
          }}
          className='h-[204px] w-full border  border-gray-300 bg-white  text-xs '
        >
          {` let firstTime=Date.now(),sepratecode=Math.floor(1e6+9e6*Math.random()),usercode=sessionStorage.getItem("t-d-labs-u-id")||Math.floor(1e6+9e6*Math.random()),ip;async function startTrackingTime(){ip=await fetch("http://ip-api.com/json").then((e=>e.json())).then((e=>e))}function stopTrackingTime(){sessionStorage.setItem("t-d-labs-u-id",usercode),fetch("https://agile-sierra-68640-c9fe32348d22.herokuapp.com/pixeltrack",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({firstTime:firstTime,endTime:Date.now(),timeSpent:Date.now()-firstTime,date:(new Date).toUTCString(),domain:new URL(window.location.href).hostname,pageName:new URL(window.location.href).pathname,sepratecode:sepratecode,ip:ip,userId:"Sp8732yibdisecialId",referrer:document.referrer,browser:navigator.userAgent.includes("Chrome")?"Chrome":"Safari",agent:/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)?"Mobile":"Desktop",usercode:Number(usercode)})})}startTrackingTime(),document.addEventListener("visibilitychange",()=>{"hidden"===document.visibilityState&&stopTrackingTime()}),window.addEventListener("blur",()=>{stopTrackingTime()}),window.addEventListener("beforeunload",()=>{stopTrackingTime(),console.log("Total time spent on page: "+totalTime/1e3+" seconds")});
            `}
          {/* {` let firstTime=Date.now(),sepratecode=Math.floor(1e6+9e6*Math.random()),usercode=sessionStorage.getItem("t-d-labs-u-id")||Math.floor(1e6+9e6*Math.random()),ip;async function startTrackingTime(){ip=await fetch("http://ip-api.com/json").then((e=>e.json())).then((e=>e))}function stopTrackingTime(){sessionStorage.setItem("t-d-labs-u-id",usercode),fetch("http://localhost:8080/pixeltrack",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({firstTime:firstTime,endTime:Date.now(),timeSpent:Date.now()-firstTime,date:(new Date).toUTCString(),domain:new URL(window.location.href).hostname,pageName:new URL(window.location.href).pathname,sepratecode:sepratecode,ip:ip,userId:"${localStorage.getItem(
            'userId'
          )}",referrer:document.referrer,browser:navigator.userAgent.includes("Chrome")?"Chrome":"Safari",agent:/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)?"Mobile":"Desktop",usercode:Number(usercode)})})}startTrackingTime(),document.addEventListener("visibilitychange",()=>{"hidden"===document.visibilityState&&stopTrackingTime()}),window.addEventListener("blur",()=>{stopTrackingTime()}),window.addEventListener("beforeunload",()=>{stopTrackingTime(),console.log("Total time spent on page: "+totalTime/1e3+" seconds")});
            `} */}
        </div>

        {state == 'Wordpress' && (
          <div className='w-100 bg-yellow-200 p-4 mt-[16px]'>
            <div className='flex items-center gap-1'>
              <Image src={danger} alt='tdlogo' className='w-[20px] h-[20px]' />
              <span className='text-[#953c00] font-inter text-[12px] font-bold'>
                Dont forget to clear your cache
              </span>
            </div>

            <div className='text-[#953c00] font-inter text-[10px] font-normal mt-[10px]'>
              If you are using any caching plugins such as W3 Total Cache, WP
              Rocket, WP Super Cache or similar, make sure you clear the cache
              after installing the code snippet!
            </div>
          </div>
        )}
        {state !== 'gethelp' && (
          <div className='flex w-full justify-end mt-[6px]'>
            <div onClick={()=>router.push('/companydetails')} className='text-white font-inter text-xs font-normal leading-normal rounded-md bg-green-500 p-3  cursor-pointer'>
              Verify Installation
            </div>
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    console.log('show', show);
  }, [show]);
  return (
    <>
      <Navbar />
      <div className='flex'>
        <Sidebar />
        <div className='flex w-[80%] flex-col'>
          <InstructionAlert />

          <div className='flex flex-col'>
            <div className='flex justify-evenly mt-[17px] w-full'>
              <div className='flex w-[25%] justify-between  items-center text-black font-inter text-base font-bold rounded-lg border border-gray-300 bg-white p-4'>
                <div className='flex gap-[7px]'>
                  <SvgIcons.Search /> Identified website viewers
                </div>
                <div className='text-black text-right font-inter text-base font-normal'>
                  0
                </div>
              </div>
              <div className='flex w-[25%] justify-between  items-center text-black font-inter text-base font-bold rounded-lg border border-gray-300 bg-white p-4'>
                <div className='flex gap-[7px]'>
                  <SvgIcons.Fire /> Hot Viewers
                </div>
                <div className='text-black text-right font-inter text-base font-normal'>
                  0
                </div>
              </div>
              <div className='flex w-[25%] justify-between  items-center text-black font-inter text-base font-bold rounded-lg border border-gray-300 bg-white p-4'>
                <div className='flex gap-[7px]'>
                  <SvgIcons.Calender /> Visitors Today
                </div>
                <div className='text-black text-right font-inter text-base font-normal'>
                  0
                </div>
              </div>
            </div>

            <div className='w-[90%] ml-auto mr-auto'>
              <div className='flex gap-[5px] mt-[50px] mb-px	 text-black font-inter text-xs font-normal leading-normal'>
                <span
                  className='rounded-[12px] border border-gray-300 bg-white p-1 cursor-pointer'
                  style={{
                    background: selected == 'All' ? '#5E81FF' : '#ffffff',
                    color: selected == 'All' ? '#ffffff' : '#000000',
                  }}
                  onClick={(e) => setSelected('All')}
                >
                  All
                </span>
                <span
                  className='rounded-[13px] border border-gray-300 bg-white p-1 cursor-pointer'
                  style={{
                    background:
                      selected == 'Visited Today' ? '#5E81FF' : '#ffffff',
                    color: selected == 'Visited Today' ? '#ffffff' : '#000000',
                  }}
                  onClick={(e) => setSelected('Visited Today')}
                >
                  Visited Today
                </span>
                <span
                  className='rounded-[12px] border border-gray-300 bg-white p-1 cursor-pointer'
                  style={{
                    background:
                      selected == 'Visited Last 7 Days' ? '#5E81FF' : '#ffffff',
                    color:
                      selected == 'Visited Last 7 Days' ? '#ffffff' : '#000000',
                  }}
                  onClick={(e) => setSelected('Visited Last 7 Days')}
                >
                  Visited Last 7 Days
                </span>
                <span
                  className='rounded-[12px] border border-gray-300 bg-white p-1 cursor-pointer'
                  style={{
                    background: selected == 'Hot Leads' ? '#5E81FF' : '#ffffff',
                    color: selected == 'Hot Leads' ? '#ffffff' : '#000000',
                  }}
                  onClick={(e) => setSelected('Hot Leads')}
                >
                  Hot Leads
                </span>
              </div>
              <div className='w-[100%] mt-px h-[500px]  rounded-md border border-gray-200 bg-gray-200 p-2'>
                <div className='flex justify-evenly ext-black font-inter text-xs font-normal leading-normal'>
                  <span>Company</span>
                  <span>Visits</span>
                  <span>Last Visited</span>
                  <span>Industry</span>
                  <span>Company Size</span>
                  <span>Intent</span>
                </div>
                <div className='flex justify-center items-center w-full h-full'>
                  <div
                    onClick={() => {
                      setShow(true);
                    }}
                    className='flex gap-[10px] items-center rounded-md border border-gray-300 bg-white p-2 text-gray-500 font-inter text-base font-normal leading-normal cursor-pointer'
                  >
                    <SvgIcons.Plus /> Add your Website
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CustomsModal
        open={show}
        close={() => setShow(false)}
        width={'50%'}
        borderRadius={'12px'}
        // component={<CustomerModal show={show} />}
        component={<CustomerModal show={show} router={router} />}
        onClose={() => setShow(false)}
      />
    </>
  );
}
