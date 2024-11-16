import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';

function ControllPanel() {
  const [loading, setLoading] = useState('animate-pulse');
  const [req, setReq] = useState([{ RestoName: "nothing" }]);
  const [deleting, setDeleting] = useState([]); // Tracks entries being rejected

  useEffect(() => {
    // Function to extract a specific cookie by name
    const getCookie = (name) => {
      const cookies = document.cookie.split(';');
      for (const cookie of cookies) {
        const [key, value] = cookie.trim().split('=');
        if (key === name) return value;
      }
      return null; // Return null if the cookie is not found
    };
  
    // Extract the 'uid' cookie
    const uidCookie = getCookie('uid');
  
    if (!uidCookie) {
      console.log('UID cookie not found. Please log in again.');
      return;
    }
  
    const params = { ck: uidCookie };
  
    // Verify admin with the extracted UID cookie
    const verify = axios.post(`${config.API_URL}/verifyAdmin`, params);
    verify.then((d) => {
      if (d.data.status === 'success') {
        const data = axios.get(`${config.API_URL}/registerResto`);
        data.then((data) => {
          setLoading('animate-none');
          setReq(data.data);
        }).catch(() => {
          console.log('Cannot get pending requests from server');
        });
      }
    }).catch((err) => {
      console.log('Went wrong', err);
    });
  }, []);
  

  async function handleAccept(e, ele) {
    const acceptedResto = {
      RestoName: ele.RestoName,
      RestoId: ele.OwnerContact,
      RestoAddress: ele.RestoAddress,
      RestoOwner: ele.RestoOwner,
      OwnerContact: ele.OwnerContact,
      RestoPassword: ele.RestoPassword,
    };
    const acceptResponse = await axios.post(`${config.API_URL}/verifiedResto`, acceptedResto);
    console.log(acceptResponse);
    location.reload();
  }

  async function handleReject(e, ele) {
    setDeleting((prev) => [...prev, ele.OwnerContact]); // Start animation
    setTimeout(async () => {
      const rejectResponse = await axios.post(`${config.API_URL}/rejectedResto`, { RestoId: ele.OwnerContact });
      console.log(rejectResponse);
      setReq((prevReq) => prevReq.filter((r) => r.OwnerContact !== ele.OwnerContact)); // Remove the rejected item
    }, 500); // Wait for the fade-out animation before removing
  }

  const AdminLogout = () => {
    document.cookie = "uid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    location.reload();
    window.location.href = "/";
  };

  return (
    <>
      <div className='min-h-screen bg-gradient-to-r from-gray-100 to-gray-300 p-8'>
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold text-gray-800'>Admin Dashboard</h1>
        </div>

        {/* Pending Requests Section */}
        <div className='grid gap-8'>
          {req.map((ele, index) => (
            <div
              key={index}
              className={`bg-white shadow-lg rounded-lg p-6 transition-all duration-500 ${
                deleting.includes(ele.OwnerContact) ? 'opacity-0 scale-95' : 'opacity-100'
              } ${loading}`}
            >
              <table className='w-full border-collapse'>
                <thead>
                  <tr className='bg-gray-100'>
                    <th className='py-3 px-4 border border-gray-200 text-left text-gray-600'>Restaurant Name</th>
                    <th className='py-3 px-4 border border-gray-200 text-left text-gray-600'>Address</th>
                    <th className='py-3 px-4 border border-gray-200 text-left text-gray-600'>Owner</th>
                    <th className='py-3 px-4 border border-gray-200 text-left text-gray-600'>Contact</th>
                    <th className='py-3 px-4 border border-gray-200 text-center text-gray-600'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className='bg-gray-50 hover:bg-gray-100'>
                    <td className='py-3 px-4 border border-gray-200'>{ele['RestoName']}</td>
                    <td className='py-3 px-4 border border-gray-200'>{ele['RestoAddress']}</td>
                    <td className='py-3 px-4 border border-gray-200'>{ele['RestoOwner']}</td>
                    <td className='py-3 px-4 border border-gray-200'>{ele['OwnerContact']}</td>
                    <td className='py-3 px-4 border border-gray-200 text-center'>
                      <button
                        className='bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded mr-2'
                        onClick={(e) => handleAccept(e, ele)}
                      >
                        Accept
                      </button>
                      <button
                        className='bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded'
                        onClick={(e) => handleReject(e, ele)}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>

        {/* Logout Button */}
        <div className='fixed top-4 right-4'>
          <button
            className='bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-6 rounded-lg shadow-lg'
            onClick={AdminLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default ControllPanel;
