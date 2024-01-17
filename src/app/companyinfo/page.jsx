'use client';
import SvgIcons from '@/assets/SvgIcons';

import Sidebar from '@/components/Sidebar';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import CustomsModal from '@/components/CustomModal';

import { useRouter } from 'next/navigation';

import env from '@/config';
import axios from 'axios';

export default function Home() {
  const [selected, setSelected] = useState('All');
  const [uniqueIPs, setUniqueIPs] = useState([]);
  const [showverify, setShowverify] = useState(false);
  const [error, setError] = useState(null);
  const [apiToken, setApiToken] = useState(null);
  const [selectedUserData, setSelectedUserData] = useState(null);

  let router = useRouter();

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const tokenResponse = await axios.post(
          'https://aws-prod-auth-service.bigdbm.com/oauth2/token',
          new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: '7v4rd46bl3l2r29ocl1845i8jm',
            client_secret: 'ca8b8e7l912k8m5sk9rbfmmjkpgpfvifuh4lc67j3kag3c3r560',
            scope: 'GetDataBy/B2BIp',
          }),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        );

        setApiToken(tokenResponse.data.access_token);

      } catch (tokenError) {
        setError(tokenError.message);
      }
    };

    fetchAccessToken();
  }, []);

  useEffect(() => {
    if (apiToken) {
      const fetchDataFromSecondApi = async () => {
        try {
          console.log(apiToken ,"I am atocken");
          const response = await axios.post(
            'https://aws-prod-b2b-api.bigdbm.com/GetDataBy/B2BIp',
            {
              RequestId: '2sadasq122131',
              ObjectList: uniqueIPs.map((ipEntry) => ipEntry.ip),
              OutputId: 3,
              PageNumber: 1,
            },
            {
              headers: {
                Authorization: `Bearer ${apiToken}`,
                'Content-Type': 'application/json',
              },
            }
          );

          // Handle the data received from the second API
          console.log('Data from second API:', response.data);
        } catch (secondApiError) {
          setError(secondApiError.message);
        }
      };

      fetchDataFromSecondApi();
    }
  }, [apiToken, uniqueIPs]);

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem('user'));
    const apiUrl = `${env.APIURL}/userDetals`;

    const fetchUserData = async () => {
      console.log('called');

      try {
        const response = await axios.get(apiUrl, {
          params: {
            userId: user._id,
          },
        });
        const userData = response.data.data;

        let uniqueUserCodes = [];

        for (const [index, visitData] of userData.entries()) {
          console.log('index', index);

          // Check if visitData.ip.query exists
          if (visitData.ip && visitData.ip.query) {
            const existingIndex = uniqueUserCodes.findIndex(
              (entry) => entry.usercode === visitData.usercode
            );

            if (existingIndex === -1) {
              // Usercode is not present, add a new entry
              uniqueUserCodes.push({
                usercode: visitData.usercode,
                ip: visitData.ip.query,
                last_visited: visitData.firstTime,
              });
            } else {
              // Usercode is present, check and update if necessary
              if (
                uniqueUserCodes[existingIndex].last_visited <
                visitData.firstTime
              ) {
                uniqueUserCodes[existingIndex] = {
                  usercode: visitData.usercode,
                  ip: visitData.ip.query,
                  last_visited: visitData.firstTime,
                };
              }
            }
          }
        }

        console.log('uniqueUserCodes', uniqueUserCodes);
        let ipCountMap = {};
        uniqueUserCodes.forEach((entry) => {
          if (entry.ip) {
            ipCountMap[entry.ip] = (ipCountMap[entry.ip] || 0) + 1;
            if (
              !ipCountMap[entry.ip + '_last_visited'] ||
              entry.last_visited > ipCountMap[entry.ip + '_last_visited']
            ) {
              ipCountMap[entry.ip + '_last_visited'] = entry.last_visited;
            }
          }
        });
        let resultArray = Object.entries(ipCountMap)
          .filter(([key]) => key.includes('_last_visited'))
          .map(([key, last_visited]) => ({
            ip: key.replace('_last_visited', ''),
            count: ipCountMap[key.replace('_last_visited', '')],
            last_visited,
          }));

        console.log(resultArray);

        console.log('resultArray', resultArray);

        setUniqueIPs(resultArray);
      } catch (error) {
        setError(error.message);
      }
    };

    // Call the function to fetch user data
    fetchUserData();
  }, []);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const monthNames = [
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

    const month = monthNames[date.getMonth()];
    const day = date.getDate();

    return `${month} ${day}`;
  };

  const VerifyModal = ({ show, router }) => {
    console.log(selectedUserData, 'I am usercode');
    return (
      <>
        {show && (
          <div>
            {selectedUserData && (
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
              Professional Details
            </button>
            <button
              onClick={() => handleTabClick('timeline')}
              className='bg-primary text-black px-2 py-[2px] text-sm border rounded-2xl'
            >
              Visit History
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
            )}
          </div>

          
        )}
      </>
    );
  };
  const handleUserClick = (userData) => {
    setSelectedUserData(userData);
    setShowverify(true);
  };

  return (
    <>
      {/* <Navbar /> */}
      <div className='flex'>
        <Sidebar />
        <div className='flex w-full flex-col'>
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
                <div className='flex w-full justify-between px-20 text-black font-inter items-center text-xs font-normal leading-normal'>
                  <span>Company</span>
                  <span>Visits</span>
                  <span>Last Visited</span>
                  <span>Company</span>
                  <span>Title</span>
                  <span>Contact Info</span>
                  <span>Intent</span>
                </div>
                {/* <div className='flex bg-white justify-evenly items-center w-full my-2 rounded-lg h-[20%]'>

                
                  <span>John Caspino</span>
                  <span className='border bg-primary rounded-full text-white p-1'>
                    22
                  </span>
                  <span className='border bg-primary rounded-full px-2 text-white'>
                    November 22
                  </span>
                  <span>Microsoft</span>
                  <span>Data Analyst</span>
                  <div className='flex gap-3'>
                    <SvgIcons.Envelope />
                    <SvgIcons.Call />
                  </div>
                  <div>intent</div>
                  <div>as</div>
                </div> */}

                {uniqueIPs.map((entry, index) => (
                  <div
                    key={index}
                    onClick={() => handleUserClick(entry)}
                    className='flex bg-white justify-evenly cursor-pointer items-center w-full my-2 rounded-lg h-[20%]'
                  >
                    <span>{entry.usercode}</span>
                    <span className='border bg-primary rounded-full text-white px-2 text-center'>
                      {entry.count}
                    </span>
                    <span className='border bg-primary rounded-full px-2 text-white'>
                      {formatDate(entry.last_visited)}
                    </span>
                    {/* Replace the following lines with the actual data from the API */}
                    <span>{/* Company Name */}</span>
                    <span>{/* Title */}</span>
                    <div className='flex gap-3'>
                      <SvgIcons.Envelope />
                      <SvgIcons.Call />
                    </div>
                    <div>{/* Intent */}</div>
                    <div>{/* Additional Data */}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <CustomsModal
        open={showverify}
        close={() => setShowverify(false)}
        width={'50%'}
        borderRadius={'12px'}
        component={<VerifyModal show={showverify} router={router} />}
        onClose={() => setShowverify(false)}
      />
    </>
  );
}
