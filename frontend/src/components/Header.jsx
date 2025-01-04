import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="flex flex-col md:flex-row items-center text-center md:justify-between px-4 py-3 bg-purple-700 bg-opacity-75">
      {/* Logo Section */}
      <div className="flex items-center justify-between w-full md:w-auto">
        <span className="text-lg md:text-xl font-bold text-white">
          FoodDiscovery
        </span>
        {/* Hamburger Menu Button for Small Devices */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-yellow-300 hover:text-white focus:outline-none"
          aria-label="Toggle Menu"
        >
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* Navigation Section */}
      <nav
        className={`${
          isMenuOpen ? 'flex' : 'hidden'
        } flex-col md:flex md:flex-row md:items-center md:space-x-6 space-y-2 md:space-y-0 mt-4 md:mt-0`}
      >
        <Link
          to="/"
          className="text-base md:text-lg text-yellow-300 hover:text-white transition"
        >
          Home
        </Link>
        <Link
          to="/register"
          className="text-base md:text-lg text-yellow-300 hover:text-white transition"
        >
          Register/Login
        </Link>
        <Link
          to="/about"
          className="text-base md:text-lg text-yellow-300 hover:text-white transition"
        >
          About Us
        </Link>
      </nav>
    </header>
  );
}

export default Header;
