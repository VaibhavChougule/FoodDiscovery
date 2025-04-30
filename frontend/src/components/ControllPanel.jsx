import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';

function ControllPanel() {
  const [loading, setLoading] = useState('animate-pulse');
  const [req, setReq] = useState([]);
  const [animating, setAnimating] = useState(null); // Tracks entry being animated

  useEffect(() => {
    const getCookie = (name) => {
      const cookies = document.cookie.split(';');
      for (const cookie of cookies) {
        const [key, value] = cookie.trim().split('=');
        if (key === name) return value;
      }
      return null;
    };

    const uidCookie = getCookie('uid');
    if (!uidCookie) {
      console.log('UID cookie not found. Please log in again.');
      return;
    }

    const params = { ck: uidCookie };
    axios.post(`${config.API_URL}/verifyAdmin`, params)
      .then((d) => {
        if (d.data.status === 'success') {
          axios.get(`${config.API_URL}/registerResto`)
            .then((data) => {
              setLoading('');
              setReq(data.data);
            })
            .catch(() => {
              console.log('Cannot get pending requests from server');
            });
        }
      })
      .catch((err) => {
        console.log('Went wrong', err);
      });
  }, []);

  const handleAccept = async (e, ele) => {
    setAnimating(ele.OwnerContact);
    const acceptedResto = {
      RestoName: ele.RestoName,
      RestoId: ele.OwnerContact,
      RestoAddress: ele.RestoAddress,
      RestoOwner: ele.RestoOwner,
      OwnerContact: ele.OwnerContact,
      RestoPassword: ele.RestoPassword,
    };

    setTimeout(async () => {
      await axios.post(`${config.API_URL}/verifiedResto`, acceptedResto);
      setReq((prevReq) => prevReq.filter((r) => r.OwnerContact !== ele.OwnerContact));
      setAnimating(null);
    }, 500); // Animation duration
  };

  const handleReject = async (e, ele) => {
    setAnimating(ele.OwnerContact);
    setTimeout(async () => {
      await axios.post(`${config.API_URL}/rejectedResto`, { RestoId: ele.OwnerContact });
      setReq((prevReq) => prevReq.filter((r) => r.OwnerContact !== ele.OwnerContact));
      setAnimating(null);
    }, 500); // Animation duration
  };

  const AdminLogout = () => {
    document.cookie = "uid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    location.reload();
    window.location.href = "/";
  };

  return (
    <>
      <div className='min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-8'>
        {/* Header section with animated title */}
        <div className='relative flex justify-between items-center mb-10'>
          <div className='animate-fadeIn'>
            <h1 className='text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600'>
              Admin Dashboard
            </h1>
            <div className='h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 mt-2 rounded-full'></div>
          </div>

          {/* Animated logout button */}
          <button
            className='relative inline-flex items-center px-6 py-3 overflow-hidden font-medium text-white bg-red-600 rounded-lg shadow-md group hover:bg-red-500 transition-all duration-300 ease-out transform hover:-translate-y-1 hover:shadow-lg'
            onClick={AdminLogout}
          >
            <span className='absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:-translate-x-4'>
              <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'></path>
              </svg>
            </span>
            <span className='relative'>Logout</span>
          </button>
        </div>

        {/* Pending Requests Section */}
        <div className='mb-6'>
          <h2 className='text-2xl font-bold text-gray-700'>Pending Restaurant Requests</h2>
          <p className='text-gray-500 mt-1'>Review and manage restaurant registration applications</p>
        </div>

        {/* Requests Grid */}
        <div className='grid gap-6'>
          {req.length === 0 ? (
            <div className='flex flex-col items-center justify-center p-12 bg-white bg-opacity-70 backdrop-blur-sm rounded-lg shadow-lg animate-pulse'>
              <svg className='w-16 h-16 text-gray-400' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
              </svg>
              <h3 className='mt-4 text-xl font-medium text-gray-900'>No pending requests</h3>
              <p className='mt-2 text-gray-600'>All restaurant registration requests have been processed.</p>
            </div>
          ) : (
            req.map((ele, index) => (
              <div
                key={index}
                className={`bg-white backdrop-blur-sm shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out transform hover:shadow-xl ${
                  animating === ele.OwnerContact ? 'opacity-0 scale-95' : 'opacity-100 hover:-translate-y-1'
                } ${loading}`}
              >
                <div className='p-5 border-b border-gray-100'>
                  <h3 className='text-xl font-semibold text-gray-800'>{ele.RestoName}</h3>
                  <p className='text-sm text-gray-500'>Registration Request #{index + 1}</p>
                </div>
                
                <div className='p-5'>
                  <div className='grid grid-cols-1 lg:grid-cols-4 gap-4'>
                    <div>
                      <div className='text-sm font-medium text-gray-500'>Restaurant Name</div>
                      <div className='mt-1 text-gray-800'>{ele.RestoName}</div>
                    </div>
                    
                    <div>
                      <div className='text-sm font-medium text-gray-500'>Restaurant Address</div>
                      <div className='mt-1 text-gray-800'>{ele.RestoAddress}</div>
                    </div>
                    
                    <div>
                      <div className='text-sm font-medium text-gray-500'>Owner Name</div>
                      <div className='mt-1 text-gray-800'>{ele.RestoOwner}</div>
                    </div>
                    
                    <div>
                      <div className='text-sm font-medium text-gray-500'>Contact Number</div>
                      <div className='mt-1 text-gray-800'>{ele.OwnerContact}</div>
                    </div>
                  </div>
                </div>
                
                <div className='bg-gray-50 px-5 py-4 flex justify-end space-x-3'>
                  <button
                    className='inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 transform hover:scale-105 shadow'
                    onClick={(e) => handleAccept(e, ele)}
                  >
                    <svg className='mr-2 h-4 w-4' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M5 13l4 4L19 7' />
                    </svg>
                    Accept
                  </button>
                  <button
                    className='inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300 transform hover:scale-105 shadow'
                    onClick={(e) => handleReject(e, ele)}
                  >
                    <svg className='mr-2 h-4 w-4' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' />
                    </svg>
                    Reject
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Add global styles for animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-in-out;
        }
      `}</style>
    </>
  );
}

export default ControllPanel;