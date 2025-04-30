import React from 'react';
import {
  FaSearch,
  FaStar,
  FaShoppingCart,
  FaMapMarkerAlt,
} from 'react-icons/fa'; // Example icons - you might need to install react-icons

function FeaturesSection() {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-8">
          Why Choose FoodDiscovery?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="bg-yellow-100 text-yellow-600 rounded-full p-4 inline-block mb-4">
              <FaSearch size={24} />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Easy Restaurant Search
            </h3>
            <p className="text-gray-600">
              Quickly find restaurants based on cuisine, location, and more.
            </p>
          </div>
          <div>
            <div className="bg-green-100 text-green-600 rounded-full p-4 inline-block mb-4">
              <FaStar size={24} />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Read Reviews & Ratings
            </h3>
            <p className="text-gray-600">
              See what other food lovers have to say about local eateries.
            </p>
          </div>
          <div>
            <div className="bg-blue-100 text-blue-600 rounded-full p-4 inline-block mb-4">
              <FaShoppingCart size={24} />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Order Online
            </h3>
            <p className="text-gray-600">
              Conveniently place orders from your favorite restaurants.
            </p>
          </div>
          <div>
            <div className="bg-red-100 text-red-600 rounded-full p-4 inline-block mb-4">
              <FaMapMarkerAlt size={24} />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Discover Local Gems
            </h3>
            <p className="text-gray-600">
              Explore new and exciting restaurants in your area.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;