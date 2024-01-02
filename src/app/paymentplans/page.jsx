'use client';
import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import env from '@/config';
// ... (existing code)

const PricingPlan = ({
  title,
  price,
  opportunities,
  features,
  priceId,
  isFreeTrial,
  freeTrialAvailed,
}) => {
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);

  const redirectToCheckout = async () => {
    if (isFreeTrial) {
      setSubscriptionStatus({ status: 'freeTrial' });
      let data = JSON.parse(localStorage.getItem('user'));

      console.log('data', data);
      const response = await axios.post(
        `${env.APIURL}/users/updateUser`,
        {
          userId: data._id,
        }
        
      );
      if (response.data.success) {
       
        localStorage.setItem('user',JSON.stringify(response.data.data))
        window.location.href = `${window.location.origin}/dashboard`;
      }
    } else {
      // Proceed with the regular subscription checkout for paid plans
      const stripe = await loadStripe(
        'pk_test_51OSccqJ7ffyJlYAYbAfBazurVIjvEm7ZHtWzrIa8VppnJtMzugDc2qlHKHeWFrkYEZRnTPTeqATSxLAHetssOuqD00SyibsY5F'
      );

      const { error, sessionId } = await stripe.redirectToCheckout({
        lineItems: [{ price: priceId, quantity: 1 }],
        mode: 'subscription',
        successUrl: `${window.location.origin}/dashboard`,
        cancelUrl: window.location.origin + '/cancel',
      });

      if (error) {
        console.error('Error redirecting to checkout:', error);
      } else {
        setSubscriptionStatus({ status: 'pending', sessionId });
      }
    }
  };

  const renderButton = () => {
    if (subscriptionStatus && subscriptionStatus.status === 'freeTrial') {
      return (
        <p className='text-sm text-gray-600 mt-2'>
          You are currently in a 7-day free trial.
        </p>
      );
    } else {
      if (freeTrialAvailed && title == 'Free Trial') {
        return (
          <p className='w-full text-center text-white border rounded bg-primary hover:text-white hover:shadow-xl transition duration-150 ease-in-out py-4 mt-4'>
            You have availed
          </p>
        );
      } else {
        return (
          <button
            onClick={redirectToCheckout}
            className='w-full text-white border rounded bg-primary hover:text-white hover:shadow-xl transition duration-150 ease-in-out py-4 mt-4'
            style={{
              pointerEvents:
                freeTrialAvailed && title == 'Free Trial' && 'none',
            }}
          >
            {isFreeTrial ? 'Start 7-Day Free Trial' : 'Get Started'}
          </button>
        );
      }
    }
  };

  return (
    <div className='w-full md:w-1/3 bg-white rounded-lg shadow hover:shadow-xl transition duration-100 ease-in-out p-6 md:mr-4 mb-10 md:mb-0'>
      <h3 className='text-gray-600 text-lg'>{title}</h3>
      <div className='text-gray-600 mt-1'>
        <div className='font-bold text-black text-4xl'>{price}</div> /Month
      </div>
      <p className='text-sm text-gray-600 mt-2'>
        Just {opportunities} cents per opportunity identified.
      </p>
      <div className='text-sm text-gray-600 mt-4'>
        {features.map((feature, index) => (
          <p key={index} className='my-2'>
            <span className='fa fa-check-circle mr-2 ml-1'></span> {feature}
          </p>
        ))}
        {subscriptionStatus && subscriptionStatus.status === 'pending' && (
          <p className='text-sm text-gray-600 mt-2'>Subscription pending...</p>
        )}
        {renderButton()}
      </div>
    </div>
  );
};

const Page = () => {
  const [freeTrialAvailed, setFreeTrialAvailed] = useState(false);
  useEffect(() => {
    let data = JSON.parse(localStorage.getItem('user'));
    if (data.freeTrialAvailed) setFreeTrialAvailed(true);
  }, []);
  const pricingPlans = [
    {
      title: 'Free Trial',
      price: '$0 USD',
      opportunities: '7',
      features: [
        '2,000 Visitors identified',
        'Demographic & Firmographic Data',
        'Direct Contact Information',
        'Custom Audience Exports',
      ],
      priceId: 'price_FREE_TRIAL_ID', // Replace with your actual price ID for the free trial
      isFreeTrial: true,
    },
    {
      title: 'Basic',
      price: '$399 USD',
      opportunities: '19',
      features: [
        '2,000 Visitors identified',
        'Demographic & Firmographic Data',
        'Direct Contact Information',
        'Custom Audience Exports',
      ],
      priceId: 'price_1OTP8VJ7ffyJlYAY56WbGqez', // Replace with your actual price ID
      isFreeTrial: false,
    },
    {
      title: 'Growth',
      price: '$999 USD',
      opportunities: '16',
      features: [
        '6,000 Visitors identified',
        'Demographic & Firmographic Data',
        'Direct Contact Information',
        'Custom Audience Exports',
      ],
      priceId: 'price_1OT5H2J7ffyJlYAYwkdrBkt7', // Replace with your actual price ID
      isFreeTrial: false,
    },
    {
      title: 'Enterprise',
      price: '$1900 USD',
      opportunities: '15',
      features: [
        '12,000 Visitors identified',
        'Demographic & Firmographic Data',
        'Direct Contact Information',
        'Custom Audience Exports',
      ],
      priceId: 'price_1OT5IwJ7ffyJlYAYog2RPYJf', // Replace with your actual price ID
      isFreeTrial: false,
    },
  ];

  return (
    <>
      <div
        className='container px-5 mx-auto'
        style={{ fontFamily: 'Lato, sans-serif' }}
      >
        <div className='text-center my-10'>
          <h1 className='font-bold text-5xl py-5 mb-2'>
            10x the opportunities from your website
          </h1>
          <h4 className='text-gray-600'>
            All plans have everything unlocked, choose how many visits you want
            to resolve.
          </h4>
        </div>

        <div className='flex flex-col gap-4 md:flex-row px-2 md:px-0'>
          {pricingPlans.map((plan, index) => (
            <PricingPlan
              key={index}
              {...plan}
              freeTrialAvailed={freeTrialAvailed}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Page;
