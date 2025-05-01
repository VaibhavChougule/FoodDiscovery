import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 text-center">
      <div className="container mx-auto px-4">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} FoodDiscovery. All rights reserved.
        </p>
        <p className="text-sm">
          Designed and Developed by <a href="https://www.linkedin.com/in/vaibhavchougule475" className='underline text-yellow-400'>Vaibhav Chougule</a>
        </p>
        {/* You can add more links or information here */}
      </div>
    </footer>
  );
}

export default Footer;