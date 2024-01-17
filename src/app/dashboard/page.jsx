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
import CustomCopytoClip from '@/components/CopyToClip';
import env from '@/config';
import axios from 'axios';

export default function Home() {
  const [selected, setSelected] = useState('All');
  const [show, setShow] = useState(false);
  const [showverify, setShowverify] = useState(false);
  const [domain, setDomain] = useState();
  let router = useRouter();

  useEffect(() => {
    let token = localStorage.getItem('token') || false;
    if (token == false) {
      router.push('/');
    }
    let user = JSON.parse(localStorage.getItem('user'))
    const apiUrl = `${env.APIURL}/getUser`;
    axios
      .get(apiUrl , {
        params: {
          userId: user._id
        }
      })
      .then((response) => {
        localStorage.setItem('user',JSON.stringify(response.data.data))
        if (!response.data.data?.subscription || response.data.data?.subscription?.payment_status !== 'paid' || response.data.data?.subscription.expires_at < Date.now()) router.push('/paymentplans');
      })
      .catch((error) => {
        setError(error.message);
      });
    console.log('user',user)
   
  }, []);

  const CustomerModal = ({ router, showverify, setShowverify }) => {
    console.log('CustomerModal', show);
    const [state, setState] = useState('installCode');
    let user = JSON.parse(localStorage.getItem('user'));
    console.log('useruser', user);
    let Pastedata = ` <script>let firstTime=Date.now(),sepratecode=Math.floor(1e6+9e6*Math.random()),usercode=sessionStorage.getItem("t-d-labs-u-id")||Math.floor(1e6+9e6*Math.random()),ip;async function startTrackingTime(){ip=await fetch("http://ip-api.com/json").then((e=>e.json())).then((e=>e))}function stopTrackingTime(){sessionStorage.setItem("t-d-labs-u-id",usercode),fetch("https://agile-sierra-68640-c9fe32348d22.herokuapp.com/pixeltrack",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({firstTime:firstTime,endTime:Date.now(),timeSpent:Date.now()-firstTime,date:(new Date).toUTCString(),domain:new URL(window.location.href).hostname,pageName:new URL(window.location.href).pathname,sepratecode:sepratecode,ip:ip,userId:"${user._id}",referrer:document.referrer,browser:navigator.userAgent.includes("Chrome")?"Chrome":"Safari",agent:/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)?"Mobile":"Desktop",usercode:Number(usercode)})})}startTrackingTime(),document.addEventListener("visibilitychange",()=>{"hidden"===document.visibilityState&&stopTrackingTime()}),window.addEventListener("blur",()=>{stopTrackingTime()}),window.addEventListener("beforeunload",()=>{stopTrackingTime(),console.log("Total time spent on page: "+totalTime/1e3+" seconds")});</script>`;
    let calendlyData = `<!-- Calendly inline widget begin -->
    <div class="calendly-inline-widget" data-url="https://calendly.com/jack-km0/pixel-installation" style="min-width:320px;height:700px;"></div>
<script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async></script>
<!-- Calendly inline widget end -->`
    return (
      <div>
        <div className='text-black font-inter text-xs font-bold leading-normal'>
          Install Deep Visitor on your site
        </div>
        <div className='flex justify-between mt-[23px] text-gray-300 font-inter text-xs font-normal leading-normal border-b-[1px] pb-[2px] border-gray-300'>
          <div className='w-1/2 flex '>
            <div
              className='flex justify-center items-center gap-[5px] cursor-pointer'
              onClick={() => setState('installCode')}
            >
              <SvgIcons.Code /> Install Code
            </div>
            <div
              className='flex ml-[30px] justify-center items-center gap-[5px] cursor-pointer'
              onClick={() => setState('Wordpress')}
            >
              <Image src={wordPress} alt='tdlogo' /> Wordpress
            </div>
          </div>
          <div
            className='w-1/2 flex justify-end gap-[5px] cursor-pointer'
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
            : <p>Schedule a meeting below with one of our technical staff for help installing on your website! <div> Make sure you have the login for the admin page of your website </div> </p>}
             
        </div>

        <div
       
          className=' ml-auto w-fit p-2 cursor-pointer mt-[30px] rounded-xl text-white bg-[#5E81FF]'
        >
          <CustomCopytoClip data={ state == 'gethelp' ? calendlyData :  Pastedata} />
        </div>

        <div
          style={{
            whiteSpace: 'none',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
          }}
          className='h-[204px] w-full border  mt-1 border-gray-300 bg-white  text-xs '
        >
          {state == 'gethelp' ? <div > 
           {calendlyData}
          
          </div> : Pastedata}
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
          <div className='flex w-full justify-end mt-[6px] '>
            <div
              onClick={() => setShowverify(true)}
              className='text-white font-inter text-xs font-normal leading-normal rounded-md bg-green-500 p-3  cursor-pointer'
            >
              Verify Installation
            </div>
          </div>
        )}
      </div>
    );
  };
  const VerifyModal = ({ router, setDomain, domain }) => {
    const [verificationMessage, setVerificationMessage] = useState("");
  
    const handleVerifyChange = (e) => {
      setDomain(e.target.value);
    };
  
    const isDomainValid = () => {
      // Regular expression to check for a dot in the domain
      const dotRegex = /\./;
      return dotRegex.test(domain);
    };
  
    const installationCheck = () => {
      const apiUrl = `${env.APIURL}/installationCheck`;
  
      axios
        .get(apiUrl, {
          params: {
            domain: domain,
          },
        })
        .then((response) => {
          console.log('Domain response', response);
  
          if (response.data.success) {
            router.push('/companydetails');
          } else {
            setVerificationMessage("You didn't have installed the pixel on your website");
          }
        });
    };
  
    return (
      <>
        <div>
          <h3 className='text-sm font-semibold'>Install Deep Visitor on your site</h3>
          <p className='text-xs py-5'>1. Please enter the URL of the site your install the TDL pixel to.</p>
          <input
            className='w-full border px-3 py-2 rounded-md'
            type='text'
            autoFocus={true}
            placeholder='www.yourwebsite.com'
            value={domain}
            onChange={handleVerifyChange}
          />
          <p className='text-xs py-5'>
            2. Click the verify button below and check to see if your pixel is installed.
            <span className='font-semibold'> Please make sure to save your website updates.</span>
          </p>
          <button
            onClick={installationCheck}
            className='bg-[#4EB76E] text-white px-7 rounded-md py-2'
            disabled={!isDomainValid()} // Disable the button if the domain is invalid
          >
            Verify
          </button>
  
          {verificationMessage && <p>{verificationMessage}</p>}
        </div>
      </>
    );
  };
  

  return (
    <>
      {/* <Navbar /> */}
      <div className='flex'>
        <Sidebar />
        <div className='flex w-full flex-col'>
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
        component={
          <CustomerModal
            show={show}
            setShowverify={setShowverify}
            showverify={showverify}
            router={router}
          />
        }
        onClose={() => setShow(false)}
      />
      <CustomsModal
        open={showverify}
        close={() => setShowverify(false)}
        width={'50%'}
        borderRadius={'12px'}
        component={
          <VerifyModal
            show={showverify}
            setDomain={setDomain}
            domain={domain}
            router={router}
          />
        }
        onClose={() => setShowverify(false)}
      />
    </>
  );
}
