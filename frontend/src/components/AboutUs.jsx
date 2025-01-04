import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header.jsx';

function AboutUs() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 flex flex-col items-center p-8">
        {/* Title Section */}
        <div className="mb-12 text-center w-full max-w-4xl">
          <h1 className="font-extrabold text-4xl md:text-5xl text-indigo-700 mb-4">
            What We Do...
          </h1>
          <p className="text-gray-600 text-lg md:text-xl">
            Empowering connections between restaurant owners and food enthusiasts.
          </p>
        </div>

        {/* Content Section */}
        <div className="flex flex-col lg:flex-row gap-8 w-full max-w-6xl">
          {/* Restaurant Owners Section */}
          <div className="flex-1 bg-white shadow-lg rounded-lg p-6 border-t-4 border-indigo-500">
            <h3 className="font-semibold text-2xl text-indigo-700 mb-4 font-serif">
              For Restaurant Owners
            </h3>
            <p className="text-gray-600 text-base leading-relaxed font-medium">
              We help restaurants share their daily menu with people and students living nearby. Along with showcasing the menu, our platform also displays the restaurant's address, making it easier for customers to find and enjoy meals.
            </p>
          </div>

          {/* Students and People Nearby Section */}
          <div className="flex-1 bg-white shadow-lg rounded-lg p-6 border-t-4 border-pink-500">
            <h3 className="font-semibold text-2xl text-pink-700 mb-4 font-serif">
              For Students and People Nearby
            </h3>
            <p className="text-gray-600 text-base leading-relaxed font-medium">
              The FoodDiscovery app simplifies the daily struggle of finding suitable food options for students. By providing a centralized platform with detailed menus, locations, and ratings, it saves valuable time and reduces effort. Students can discover nearby messes or restaurants that match their preferences, ensuring a hassle-free dining experience while focusing on their studies and activities.
            </p>
          </div>
        </div>
      </div>

      <footer className="w-full flex flex-col justify-center items-center text-slate-50 bg-zinc-800 p-4">
        <Link to="/" className="hover:text-slate-300 hover:underline mb-2">
          Home
        </Link>
        <p className="text-center text-sm">
          © {new Date().getFullYear()} FoodDiscovery. All rights reserved. Unauthorized use, reproduction, or distribution of this website’s content is strictly prohibited.
        </p>
      </footer>
    </>
  );
}

export default AboutUs;
