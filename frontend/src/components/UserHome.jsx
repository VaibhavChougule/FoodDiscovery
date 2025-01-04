import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';
import Header from './Header';

function UserHome() {
  const [details, setDetails] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [status, setStatus] = useState('Loading....');
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  useEffect(() => {
    axios.get(`${config.API_URL}/getResto`)
      .then((response) => {
        setDetails(response.data);
        console.log(response.data);
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

  const handleRestaurantClick = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedRestaurant(null);
    setRating(0);
    setFeedbackMessage('');
  };

  const handleRatingClick = (star) => {
    setRating(star);
  };

  const submitFeedback = async () => {
    if (rating === 0) {
      alert('Please select a rating before submitting.');
      return;
    }

    const feedbackData = {
      restaurantId: selectedRestaurant._id,
      rating,
    };

    try {
      //await axios.post(`${config.API_URL}/submitFeedback`, feedbackData);
      alert('Thank you for your feedback!');
      closeModal();
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Failed to submit feedback. Please try again.');
    }
  };

  const filteredRestaurants = details.filter((restaurant) => {
    return restaurant.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-gradient-to-r from-orange-300 to-orange-200">
      <Header/>
      <div className="max-w-4xl mx-auto px-6 py-4">
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search for restaurants..."
            value={searchTerm}
            onChange={handleSearch}
            className="border border-gray-300 rounded-lg p-3 w-full max-w-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <h1 className="text-center text-xl font-semibold mb-4">{status}</h1>

        {filteredRestaurants.length > 0 ? (
          filteredRestaurants.map((restaurant, index) => (
            <div
              key={index}
              className="bg-pink-100 p-4 mb-4 border border-gray-300 rounded-lg shadow-md flex justify-between items-center hover:bg-indigo-100 transition duration-200"
            >
              <h2 className="text-xl font-semibold text-indigo-700">
                {restaurant.name}
              </h2>
              <button
                onClick={() => handleRestaurantClick(restaurant)}
                className="text-sm text-white bg-blue-500 hover:bg-blue-600 rounded-lg px-4 py-2 shadow-md transition duration-300"
              >
                Open
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600"></p>
        )}

        {/* Modal */}
        {showModal && selectedRestaurant && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-purple-100 w-11/12 max-w-lg p-6 rounded-lg shadow-lg border-2 border-green-500">
              <h2 className="text-2xl font-bold text-indigo-700 mb-4">
                {selectedRestaurant.name}
              </h2>
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Today's Menu</h3>
                <ul className="list-disc pl-5 text-gray-800 space-y-2 text-lg">
                  {selectedRestaurant.menu.map((item, itemIndex) => (
                    <li key={itemIndex} className="mb-1">{item}</li>
                  ))}
                </ul>
              </div>
              <p className='font-serif'>Last Update:{selectedRestaurant.LastUpdateDate+",  "+selectedRestaurant.LastUpdateTime}</p>
              <p className="text-lg font-semibold text-indigo-700 mb-4">
                Address: {selectedRestaurant.address}
              </p>

              {/* Star Rating */}
              <div className="flex justify-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRatingClick(star)}
                    className={`text-2xl ${
                      star <= rating ? 'text-yellow-500' : 'text-gray-300'
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>

              <button
                onClick={submitFeedback}
                className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg w-full p-3 font-semibold shadow-lg transition-all duration-300"
              >
                Submit Feedback
              </button>
              <button
                onClick={closeModal}
                className="mt-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg w-full p-3 font-semibold shadow-lg transition-all duration-300"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserHome;
