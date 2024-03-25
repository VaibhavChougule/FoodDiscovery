import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserHome() {
  const [details, setDetails] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('/api/getResto')
      .then((response) => {
        setDetails(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // const handleSearch = (event) => {
  //   setSearchTerm(event.target.value);
  // };

  // const filteredRestaurants = details.filter((restaurant) => {
  //   return restaurant.name.toLowerCase().includes(searchTerm.toLowerCase());
  // });

  return (
    <>
           <div className="container mx-auto my-4">
      {details.map((val, ind) => (
        <div key={ind} className="bg-gray-200 p-6 mb-6 border-2 border-slate-600 rounded-md shadow-md">
          <div className="mb-4">
            <p className="text-2xl font-bold text-indigo-800">Name: {val.name}</p>
          </div>
          <div>
            <h1 className="text-lg font-semibold mb-2">Today's Menu</h1>
            <ul className="list-disc pl-4">
              {val.menu.map((item, index) => (
                <li key={index} className="text-gray-700">{item}</li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <p className="text-2xl font-bold text-indigo-800">Address: {val.address}</p>
          </div>
        </div>
      ))}
    </div>


        </>
  );
}

export default UserHome;
