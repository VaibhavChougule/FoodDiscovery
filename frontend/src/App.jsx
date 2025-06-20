import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./components/Header.jsx";
import RestaurantHighlight from "./components/RestaurantHighlight.jsx";
import FeaturesSection from "./components/FeaturesSection.jsx";
import Footer from "./components/Footer.jsx";
import bgImage from "./assets/Image.png";


function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [restaurantsVisible, setRestaurantsVisible] = useState(false);

  // Location input state & suggestions
  const [location, setLocation] = useState("");
  const serviceableLocations = ["sinhgad", "pune"]; // Renamed for clarity
  const [filteredSuggestions, setFilteredSuggestions] = useState([]); // State for filtered suggestions
  const [showDropdown, setShowDropdown] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Set initial animations after component mounts
    setIsLoaded(true);

    // Stagger the animations for different sections
    const searchTimer = setTimeout(() => setSearchVisible(true), 1000); // Increased delay
    const restaurantsTimer = setTimeout(() => setRestaurantsVisible(true), 1400); // Increased delay after search

    return () => {
      clearTimeout(searchTimer);
      clearTimeout(restaurantsTimer);
    };
  }, []);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setLocation(inputValue);
    setError(""); // Clear error on new input

    if (inputValue.length > 0) {
      const filtered = serviceableLocations.filter(loc =>
        loc.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowDropdown(true);

      // Check if the input exactly matches a serviceable location
      const isExactMatch = serviceableLocations.some(loc => loc.toLowerCase() === inputValue.toLowerCase());

      if (!isExactMatch) {
        // If not an exact match, and no suggestions are found, or input is entirely different
        // We provide the specific error message
        if (filtered.length === 0 && inputValue.length > 0) {
          setError(`Sorry, we only serve **${serviceableLocations.join(' and ')}**. Please try one of these!`);
        } else if (filtered.length > 0) {
          setError(""); // If there are suggestions, don't show general "not serviceable" error
        }
        // If filtered.length is 0 but inputValue is also empty, error is already cleared above
      } else {
        setError(""); // Clear error if it becomes an exact match
      }

    } else {
      setFilteredSuggestions([]);
      setShowDropdown(false);
      setError(""); // No error if input is empty
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setLocation(suggestion);
    setFilteredSuggestions([]); // Clear suggestions after selection
    setShowDropdown(false);
    setError(""); // Clear any error
  };

  const handleFindFood = () => {
    const loc = location.trim().toLowerCase();
    if (!serviceableLocations.includes(loc)) {
      setError(`Sorry, we only serve **${serviceableLocations.join(' and ')}**. Please select one from the suggestions.`);
    } else {
      setError("");
      console.log("Searching for", loc);
      window.location.href = `/user/${location}`;
    }
  };

  return (
    <div className="bg-white min-h-screen overflow-x-hidden">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section
        style={{ backgroundImage: `url(${bgImage})` }}
        className="relative bg-no-repeat bg-cover bg-center min-h-screen flex items-center justify-center py-24"
      >
        {/* Overlay for readability on background image */}
        <div className="absolute inset-0 bg-black opacity-60"></div>

        <div className="container mx-auto text-center relative z-10 px-4">
          {/* Main Title - Animated per word */}
          <h1
            className="text-3xl sm:text-5xl md:text-6xl font-bold text-sky-400 mb-4 font-serif"
          >
            {"Discover Delicious Food Near You".split(" ").map((word, index) => (
              <span
                key={index}
                className={`inline-block transition-all duration-700 ease-out transform
                            ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}
                            ${index === 0 ? 'delay-0' : `delay-${index * 100}`} `}
              >
                {word}{" "}
              </span>
            ))}
          </h1>
          {/* Subtitle - Subtle fade-in */}
          <p
            className={`text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 max-w-xl mx-auto font-mono
                        transition-all duration-700 delay-500 transform ease-out
                        ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          >
            Explore a wide variety of restaurants and cuisines tailored to your location.
            Find your next favorite meal today!
          </p>

          {/* Search Input with Suggestions */}
          <div
            className={`flex items-center justify-center mb-6
                        transition-all duration-700 transform ease-out
                        ${searchVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'}`}
          >
            <div className="relative z-20 bg-white rounded-md shadow-md p-2 md:p-3 hover:shadow-lg transition-shadow duration-300 w-full max-w-md">
              <div className="relative flex items-center">
                <svg
                  className="w-5 h-5 text-gray-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <div className="relative w-full">
                  <input
                    type="text"
                    value={location}
                    onChange={handleInputChange}
                    onFocus={() => location.length > 0 && setFilteredSuggestions(serviceableLocations.filter(loc => loc.toLowerCase().includes(location.toLowerCase())))}
                    onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
                    placeholder="Enter your location"
                    className="py-2 px-3 md:px-4 text-gray-700 focus:outline-none w-full"
                  />
                  {showDropdown && filteredSuggestions.length > 0 && (
                    <ul className="absolute bg-white border border-gray-200 mt-1 rounded shadow z-50 w-full animate-fadeInUpSmall">
                      {filteredSuggestions.map((suggestion) => (
                        <li
                          key={suggestion}
                          onMouseDown={() => handleSuggestionClick(suggestion)}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <button
                  onClick={handleFindFood}
                  className="bg-yellow-400 text-purple-700 font-semibold rounded-md px-4 py-2 ml-2 hover:bg-yellow-500 transition-colors duration-300 transform hover:scale-105"
                >
                  SEARCH
                </button>
              </div>
              {error && (
                <p className="text-red-500 mt-2 text-left animate-shake text-sm font-medium">
                  {/* Safely render bold for specific parts of the message */}
                  {error.split('**').map((part, i) => i % 2 === 1 ? <b key={i}>{part}</b> : part)}
                </p>
              )}
            </div>
          </div>

          <p
            className={`z-10 text-sm text-gray-300
                        transition-all duration-700 delay-600 transform ease-out
                        ${searchVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          >
            Or <Link to="/user" className="text-yellow-400 hover:underline hover:text-yellow-300 transition-colors duration-300">browse all restaurants</Link>
          </p>
        </div>
      </section>

      {/* Highlighted Restaurants Section */}
      <section
        className={`py-12 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl shadow-2xl overflow-hidden
                    transition-all duration-1000 transform ease-out
                    ${restaurantsVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
      >
        <div className="container mx-auto px-6 lg:px-8">
          {/* Title Section */}
          <div className="text-center mb-12">
            <h2 className="text-5xl font-extrabold text-purple-800 tracking-tight leading-tight">
              Discover Our <span className="text-purple-600">Featured Restaurants</span>
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Hand-picked culinary gems waiting to delight your taste buds.
            </p>
            <hr className="border-t-2 border-purple-300 w-24 mx-auto mt-6" />
          </div>

          {/* Restaurants Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 my-10">
            {[
              { name: "Hotel Atithi", location: "Sinhgad Road, Minakshipuram", image: "./assets/image.jpg", rating: 4.5, delay: "delay-100" },
              { name: "Yash Hotel", location: "Sinhgad College Campus", image: "./assets/image (1).jpg", rating: 4.8, delay: "delay-200" },
              { name: "Hotel Vaishnavi and Restaurant", location: "Polyhub, Sinhgad Campus", image: "./assets/image.jpg", rating: 4.2, delay: "delay-300" },
              { name: "Durvankur", location: "Near Golden Touch Gym", image: "./assets/image.jpg", rating: 4.2, delay: "delay-400" }
            ].map((restaurant, index) => (
              <div
                key={index}
                className={`transition-all duration-700 transform ${restaurant.delay}
                            ${restaurantsVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
                            bg-white rounded-xl shadow-lg hover:shadow-2xl hover:scale-105
                            flex flex-col overflow-hidden cursor-pointer group`}
              >
                <RestaurantHighlight
                  name={restaurant.name}
                  location={restaurant.location}
                  image={restaurant.image}
                  rating={restaurant.rating}
                />
              </div>
            ))}
          </div>

          {/* View All Button */}
          <div
            className={`text-center mt-12
                        transition-all duration-700 delay-500 transform ease-out
                        ${restaurantsVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          >
            <Link
              to="/user"
              className="inline-flex items-center px-8 py-4 bg-purple-600 text-white font-semibold text-xl rounded-full
                         shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-300
                         transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              View All Restaurants
              <svg className="ml-3 h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <div
        className={`transition-all duration-700 delay-700 transform ease-out
                    ${restaurantsVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
      >
        <FeaturesSection />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;