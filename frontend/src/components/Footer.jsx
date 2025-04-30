import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 text-center">
      <div className="container mx-auto px-4">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} FoodDiscovery. All rights reserved.
        </p>
        {/* You can add more links or information here */}
      </div>
    </footer>
  );
}

export default Footer;