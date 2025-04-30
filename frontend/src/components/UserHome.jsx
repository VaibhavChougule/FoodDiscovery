import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';
import Header from './Header';
import { Search, Star, X, MapPin, Clock } from 'lucide-react';
import { useParams } from 'react-router-dom';

function UserHome() {
  const [details, setDetails] = useState([]);
  const [searchTerm, setSearchTerm] = useState(null);
  const [status, setStatus] = useState('Loading....');
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const { location } = useParams();


  useEffect(() => {
    axios.get(`${config.API_URL}/getResto`)
      .then((response) => {
        setDetails(response.data);
        console.log(response.data);
        setStatus('');
        setSearchTerm(location)
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

  const filteredRestaurants = searchTerm?.trim()
  ? details.filter((restaurant) => {
      const lowerSearch = searchTerm.toLowerCase();
      return (
        restaurant.name.toLowerCase().includes(lowerSearch) ||
        restaurant.address.toLowerCase().includes(lowerSearch)
      );
    })
  : details;



  return (
    <div className="min-h-screen bg-gray-50 mt-20">
      <Header />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="relative mb-10 max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for restaurants..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pl-12 pr-4 py-4 rounded-xl border-none ring-1 ring-gray-200 shadow-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>

        {/* Status Message */}
        {status && (
          <h1 className="text-center text-lg font-semibold mb-6 text-gray-700">{status}</h1>
        )}

        {/* Restaurant List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.length > 0 ? (
            filteredRestaurants.map((restaurant, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                {/* Restaurant Card Header - Color based on index */}
                <div className={`h-20 ${index % 3 === 0 ? 'bg-gradient-to-r from-blue-500 to-purple-500' :
                    index % 3 === 1 ? 'bg-gradient-to-r from-green-500 to-teal-500' :
                      'bg-gradient-to-r from-orange-500 to-pink-500'
                  }`}>
                </div>

                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-2">{restaurant.name}</h2>

                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin size={16} className="mr-1" />
                    <span className="text-sm truncate">{restaurant.address}</span>
                  </div>

                  <button
                    onClick={() => handleRestaurantClick(restaurant)}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center transition-colors duration-300"
                  >
                    <span>View Menu</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            !status && <p className="text-center text-gray-500">No restaurants found matching your search.</p>
          )}
        </div>

        {/* Modal */}
        {showModal && selectedRestaurant && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 relative">
                <button
                  onClick={closeModal}
                  className="absolute right-4 top-4 bg-white bg-opacity-20 p-1 rounded-full hover:bg-opacity-30 transition"
                >
                  <X size={20} className="text-white" />
                </button>
                <h2 className="text-2xl font-bold text-white">{selectedRestaurant.name}</h2>
                <div className="flex items-center text-white text-opacity-90 mt-1">
                  <MapPin size={16} className="mr-1" />
                  <span className="text-sm">{selectedRestaurant.address}</span>
                </div>
              </div>

              {/* Menu Section */}
              <div className="px-6 py-4">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Today's Menu</h3>
                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <ul className="space-y-2">
                    {selectedRestaurant.menu.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center text-gray-700">
                        <div className="h-2 w-2 rounded-full bg-indigo-500 mr-2"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="text-sm text-gray-500 mb-6">
                  Last updated: {selectedRestaurant.LastUpdateDate}, {selectedRestaurant.LastUpdateTime}
                </div>

                {/* Rating */}
                <div className="mb-6">
                  <h3 className="text-center font-medium text-gray-700 mb-2">How would you rate this restaurant?</h3>
                  <div className="flex justify-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => handleRatingClick(star)}
                        className="focus:outline-none transition-transform hover:scale-110"
                      >
                        <Star
                          size={28}
                          className={`${star <= rating
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-gray-300'
                            } transition-colors`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col space-y-3 mt-4">
                  <button
                    onClick={submitFeedback}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                  >
                    Submit Feedback
                  </button>
                  <button
                    onClick={closeModal}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserHome;