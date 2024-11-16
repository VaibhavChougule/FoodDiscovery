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
      <div className='min-h-screen bg-gradient-to-r from-gray-100 to-gray-300 p-8'>
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold text-gray-800'>Admin Dashboard</h1>
        </div>

        {/* Pending Requests Section */}
        <div className='grid gap-8'>
          {req.length === 0 ? (
            <div className='text-center text-gray-600'>Loading..</div>
          ) : (
            req.map((ele, index) => (
              <div
                key={index}
                className={`bg-white shadow-lg rounded-lg p-6 transition-all duration-500 ${
                  animating === ele.OwnerContact ? 'opacity-0 scale-95' : 'opacity-100'
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
                      <td className='py-3 px-4 border border-gray-200'>{ele.RestoName}</td>
                      <td className='py-3 px-4 border border-gray-200'>{ele.RestoAddress}</td>
                      <td className='py-3 px-4 border border-gray-200'>{ele.RestoOwner}</td>
                      <td className='py-3 px-4 border border-gray-200'>{ele.OwnerContact}</td>
                      <td className='py-3 px-4 border border-gray-200 text-center'>
                        <button
                          className='bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded mr-2 transition-transform transform hover:scale-105'
                          onClick={(e) => handleAccept(e, ele)}
                        >
                          Accept
                        </button>
                        <button
                          className='bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded transition-transform transform hover:scale-105'
                          onClick={(e) => handleReject(e, ele)}
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))
          )}
        </div>

        {/* Logout Button */}
        <div className='fixed top-4 right-4'>
          <button
            className='bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105'
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
