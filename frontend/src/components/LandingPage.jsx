import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function handleAdminLogin() {
  console.log("CLICK LOGIN ADMIN");
  //const navigate = useNavigate();
  // Delete all cookies
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }

  //navigate('/AdminLogin')
  window.location.href = "/AdminLogin"
}

function LandingPage() {
  //const navigate = useNavigate();

//   const handleClick = () => {
//     handleAdminLogin();
//     navigate('/AdminLogin');
//   };

  return (
    <>
      <div className='min-h-screen bg-slate-400 flex justify-center items-center relative'>
        <button
          className='absolute top-4 right-4 bg-red-500 hover:bg-red-400 text-white font-semibold px-4 py-2 rounded-lg'
          onClick={handleAdminLogin}
        >
          Admin Login
        </button>
        <div className='bg-slate-300 p-8 rounded-lg shadow-lg md:w-2/4 sm:w-full'>
          <div className='text-center mb-8'>
            <h1 className='text-3xl font-bold text-gray-800 mb-2'>Welcome!</h1>
            <p className='text-lg text-gray-600'>Choose your role:</p>
          </div>
          <div className='mb-4'>
            <h1 className='text-xl font-semibold text-gray-700 mb-2 md:text-left'>I am a Restaurant Owner</h1>
            <Link to='/register'>
              <button className='bg-blue-500 hover:bg-blue-400 rounded-lg px-4 py-2 text-white w-full md:w-auto'>
                Owner
              </button>
            </Link>
          </div>
          <div className='mb-4'>
            <h1 className='text-xl font-semibold text-gray-700 mb-2 md:text-left'>I am a User</h1>
            <Link to='/user'>
              <button className='bg-blue-500 hover:bg-blue-400 rounded-lg px-4 py-2 text-white w-full md:w-auto'>
                User
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
