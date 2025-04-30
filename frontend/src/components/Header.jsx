import React, { useState } from 'react';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-700 py-4 px-6 fixed w-screen top-0 z-50 shadow-lg">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center">
            <a href="/" className="flex items-center group">
              <span className="text-2xl font-extrabold text-white">
                Food<span className="text-yellow-300">Discovery</span>
              </span>
              <svg 
                className="h-6 w-6 ml-2 text-yellow-300 group-hover:text-white transition-colors duration-300" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
            </a>
          </div>

          {/* Hamburger Menu Button for Small Devices */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-white hover:text-yellow-300 focus:outline-none transition-colors duration-300"
            aria-label="Toggle Menu"
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Navigation Section - Desktop */}
          <nav className="hidden md:flex items-center space-x-4">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/register">Register/Login</NavLink>
            <NavLink href="/about">About Us</NavLink>
          </nav>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-2 bg-white bg-opacity-10 backdrop-blur-md rounded-lg">
            <nav className="flex flex-col space-y-2 p-2">
              <MobileNavLink href="/" onClick={toggleMenu}>Home</MobileNavLink>
              <MobileNavLink href="/register" onClick={toggleMenu}>Register/Login</MobileNavLink>
              <MobileNavLink href="/about" onClick={toggleMenu}>About Us</MobileNavLink>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

// Desktop Navigation Link Component
function NavLink({ href, children }) {
  return (
    <a
      href={href}
      className="relative text-white font-medium px-4 py-2 rounded-md overflow-hidden group"
    >
      <span className="relative z-10 transition-colors duration-300 group-hover:text-indigo-800">
        {children}
      </span>
      <span className="absolute bottom-0 left-0 w-full h-0 bg-yellow-300 transition-all duration-300 group-hover:h-full -z-0"></span>
    </a>
  );
}

// Mobile Navigation Link Component
function MobileNavLink({ href, children, onClick }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="text-white hover:text-yellow-300 font-medium px-4 py-2 block transition-colors duration-300 hover:bg-white hover:bg-opacity-10 rounded-md"
    >
      {children}
    </a>
  );
}

export default Header;