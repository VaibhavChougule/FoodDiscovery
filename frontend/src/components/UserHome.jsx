import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';

function UserHome() {
  const [details, setDetails] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [status, setStatus] = useState('Loading....');

  useEffect(() => {
    axios.get(`${config.API_URL}/getResto`)
      .then((response) => {
        setDetails(response.data);
        setStatus('');
      })
      .catch((error) => {
        setStatus('Network Error, please check your internet connection...');
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRestaurants = details.filter((restaurant) => {
    return restaurant.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search for restaurants..."
            value={searchTerm}
            onChange={handleSearch}
            className="border border-gray-300 rounded-lg p-3 w-full max-w-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <h1 className='text-center text-xl font-semibold mb-4'>{status}</h1>

        {filteredRestaurants.length > 0 ? (
          filteredRestaurants.map((restaurant, index) => (
            <div key={index} className="bg-white p-6 mb-6 border border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
              <h2 className="text-2xl font-bold text-indigo-700 mb-2">{restaurant.name}</h2>
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-1">Today's Menu</h3>
                <ul className="list-disc pl-5 text-gray-700">
                  {restaurant.menu.map((item, itemIndex) => (
                    <li key={itemIndex} className="mb-1">{item}</li>
                  ))}
                </ul>
              </div>
              <p className="text-lg font-semibold text-indigo-700">Address: {restaurant.address}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No restaurants found</p>
        )}
      </div>
    </div>
  );
}

export default UserHome;
