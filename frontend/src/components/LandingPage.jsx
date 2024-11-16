import React from 'react';
import { Link } from 'react-router-dom';

function handleAdminLogin() {
  console.log("CLICK LOGIN ADMIN");

  // Delete all cookies
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }

  window.location.href = "/AdminLogin";
}

function LandingPage() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-indigo-300 via-purple-300 to-pink-300 flex justify-center items-center relative">
        {/* Admin login button at the top-right */}
        <button
          className="absolute top-4 right-4 bg-red-600 hover:bg-red-500 text-white font-semibold px-6 py-2 rounded-full shadow-md transition-transform transform hover:scale-105"
          onClick={handleAdminLogin}
        >
          Admin Login
        </button>

        {/* Main container */}
        <div className="bg-white p-12 rounded-xl shadow-2xl w-full max-w-lg md:max-w-4xl">
          {/* Logo */}
          <div className="text-center mb-8">
            {/* <img src="/logo.png" alt="FoodDiscovery Logo" className="mx-auto h-16 w-auto mb-4" /> */}
            <h1 className="text-5xl font-bold text-gray-900 mb-4">FoodDiscovery</h1>
          </div>

          {/* Welcome text */}
          <div className="text-center mb-8">
            <p className="text-lg text-gray-600">Connecting food lovers and restaurant owners directly!</p>
          </div>

          <div className="flex flex-col md:flex-row gap-12 justify-between">
            {/* Owner section */}
            <div className="md:w-1/2">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">For Restaurant Owners</h2>
              <p className="text-gray-600 mb-4">Are you a restaurant owner? Register your restaurant and share your menu with thousands of food lovers. Let us help you reach your customers directly.</p>
              <Link to="/register">
                <button className="bg-blue-600 hover:bg-blue-500 rounded-md px-6 py-3 text-white w-full md:w-auto shadow-lg transition-transform transform hover:scale-105">
                  Restaurant Owner
                </button>
              </Link>
            </div>

            {/* User section */}
            <div className="md:w-1/2">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">For Users</h2>
              <p className="text-gray-600 mb-4">Looking for the best restaurants around you? Explore the registered restaurants, their daily menus, and more—all at one place!</p>
              <Link to="/user">
                <button className="bg-teal-500 hover:bg-teal-400 rounded-md px-6 py-3 text-white w-full md:w-auto shadow-lg transition-transform transform hover:scale-105">
                  User
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
