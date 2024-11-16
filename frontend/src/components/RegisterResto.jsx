import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../config';

function RegisterResto() {
  const [restoName, setRestoName] = useState('');
  const [restoAddress, setRestoAddress] = useState('');
  const [restoOwner, setRestoOwner] = useState('');
  const [ownerContact, setOwnerContact] = useState('');
  const [restoPassword, setRestoPassword] = useState('');

  const navigate = useNavigate();

  // Check if cookies are present to redirect to dashboard if logged in
  useEffect(() => {
    if (document.cookie && document.cookie.startsWith('o=')) {
      const ck = document.cookie.split('=');
      const rt = ck[1];
      axios.post(`${config.API_URL}/verifyLogin`, { cok: rt })
        .then((response) => {
          if (response.data.status === true) {
            navigate('/owner');
          }
        })
        .catch((err) => {
          console.error('Error verifying login:', err);
        });
    }
  }, [navigate]);

  const handleRegister = () => {
    const formData = {
      restoName,
      restoAddress,
      restoOwner,
      ownerContact,
      restoPassword,
    };

    // Check if all fields are filled
    for (let key in formData) {
      if (formData[key].trim().length === 0) {
        alert('All fields are mandatory.');
        return;
      }
    }

    // Validate phone number length
    if (ownerContact.length !== 10) {
      alert('Mobile number must be exactly 10 digits.');
      return;
    }

    // Validate password length
    if (restoPassword.length <= 3) {
      alert('Password length must be 4 or More.');
      return;
    }

    axios.post(`${config.API_URL}/registerResto`, formData)
      .then(() => {
        alert('Successfully registered. We will contact you soon.');
        navigate('/login');
      })
      .catch((err) => {
        alert('Error while registering. Please try again.');
        console.error('Registration error:', err);
      });
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex justify-center items-center">
      <div className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 bg-white rounded-lg shadow-xl p-8">
        <div className="flex justify-center mb-6">
          <p className="text-gray-600 mr-2">Already have an account?</p>
          <Link to="/login" className="text-indigo-600 hover:underline font-semibold">Login</Link>
        </div>

        <form className="flex flex-col">
          <input
            type="text"
            name="restoName"
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter name of your restaurant"
            value={restoName}
            onChange={(e) => setRestoName(e.target.value)}
          />

          <input
            type="text"
            name="address"
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter address of your restaurant"
            value={restoAddress}
            onChange={(e) => setRestoAddress(e.target.value)}
          />

          <input
            type="text"
            name="ownerName"
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter name of restaurant owner"
            value={restoOwner}
            onChange={(e) => setRestoOwner(e.target.value)}
          />

          <input
            type="text"
            name="ownerContact"
            maxLength="10"
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter mobile number of restaurant owner"
            value={ownerContact}
            onChange={(e) => setOwnerContact(e.target.value)}
          />

          <input
            type="password"
            name="password"
            className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Create strong password"
            value={restoPassword}
            onChange={(e) => setRestoPassword(e.target.value)}
          />

          <button
            type="button"
            onClick={handleRegister}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg shadow-lg"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterResto;
