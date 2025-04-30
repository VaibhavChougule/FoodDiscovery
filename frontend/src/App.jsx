import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./components/Header.jsx";
import RestaurantHighlight from "./components/RestaurantHighlight.jsx";
import FeaturesSection from "./components/FeaturesSection.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [restaurantsVisible, setRestaurantsVisible] = useState(false);

  // Location input state & suggestions
  const [location, setLocation] = useState("");
  const suggestions = ["sinhgad", "pune"];
  const [showDropdown, setShowDropdown] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Set initial animations after component mounts
    setIsLoaded(true);

    // Stagger the animations for different sections
    const searchTimer = setTimeout(() => setSearchVisible(true), 400);
    const restaurantsTimer = setTimeout(() => setRestaurantsVisible(true), 800);

    return () => {
      clearTimeout(searchTimer);
      clearTimeout(restaurantsTimer);
    };
  }, []);

  const handleInputChange = (e) => {
    setLocation(e.target.value);
    if (error) setError("");
  };

  const handleSuggestionClick = (suggestion) => {
    setLocation(suggestion);
    setShowDropdown(false);
    setError("");
  };

  const handleFindFood = () => {
    const loc = location.trim().toLowerCase();
    if (!suggestions.includes(loc)) {
      setError("Location isn't serviceable");
    } else {
      setError("");
      // TODO: Add your serviceable-location search logic here
      console.log("Searching for", loc);
      window.location.href = `/user/${location}`
    }
  };

  return (
    <div className="bg-white min-h-screen overflow-x-hidden">
      {/* Header */}
      <Header />

      {/* Spacer */}
      <div className="h-20"></div>

      {/* Hero Section */}
      <section className="bg-[url(/assets/image.png)] bg-no-repeat bg-cover py-24 relative">
        <div className="absolute rounded-lg"></div>
        <div className="container mx-auto text-center relative z-10 px-4">
          <h1
            className={`text-3xl sm:text-5xl md:text-6xl font-bold text-sky-400 mb-4 font-serif
                      transition-all duration-700 transform
                      ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          >
            Discover Delicious Food Near You
          </h1>
          <p
            className={`text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 max-w-xl mx-auto font-mono
                      transition-all duration-700 delay-100 transform
                      ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          >
            Explore a wide variety of restaurants and cuisines tailored to your location.
            Find your next favorite meal today!
          </p>

          {/* Search Input with Suggestions */}
          <div
            className={`flex items-center justify-center mb-6
                       transition-all duration-500 transform
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
                    onFocus={() => setShowDropdown(true)}
                    onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
                    placeholder="Enter your location"
                    className="py-2 px-3 md:px-4 text-gray-700 focus:outline-none w-full"
                  />
                  {showDropdown && (
                    <ul className="absolute bg-white border border-gray-200 mt-1 rounded shadow z-50">
                      {suggestions.map((suggestion) => (
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
              {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>
          </div>

          <p
            className={`z-10 text-sm text-gray-300
                      transition-all duration-700 delay-200 transform
                      ${searchVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          >
            Or <Link to="/user" className="text-yellow-400 hover:underline hover:text-yellow-300 transition-colors duration-300">browse all restaurants</Link>
          </p>
        </div>
      </section>

      {/* Highlighted Restaurants Section */}
      <section
        className={`py-4 bg-white md:m-1
                  transition-all duration-700 transform
                  ${restaurantsVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
      >
        <hr className="border-t border-gray-500 my-2"/>
        <div className="">
          <h2 className="text-2xl font-bold text-black text-center animate-pulse">
            Today's Trending 🔥
          </h2>
          <hr className="border-t border-gray-500 my-2"/>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mx-4 my-4">
            {[
              { name: "Hotel Atithi", cuisine: "Sinhgad road, Minakshipuram", image: "./assets/image.jpg", rating: 4.5, delay: "delay-100" },
              { name: "Yash Hotel", cuisine: "Sinhgad College campus", image: "./assets/image (1).jpg", rating: 4.8, delay: "delay-200" },
              { name: "Hotel Vaishnavi and Restaurant ", cuisine: "Polyhub, sinhgad campus", image: "./assets/image.jpg", rating: 4.2, delay: "delay-300" },
              { name: "Durvankur", cuisine: "Near Golden Touch Gym", image: "./assets/image.jpg", rating: 4.2, delay: "delay-400" }
            ].map((restaurant, index) => (
              <div
                key={index}
                className={`transition-all duration-700 transform ${restaurant.delay} 
                          ${restaurantsVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              >
                <RestaurantHighlight
                  name={restaurant.name}
                  cuisine={restaurant.cuisine}
                  image={restaurant.image}
                  rating={restaurant.rating}
                />
              </div>
            ))}
          </div>
          <div
            className={`text-center mt-6
                      transition-all duration-700 delay-500 transform
                      ${restaurantsVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          >
            <Link
              to="/user"
              className="text-yellow-400 hover:text-yellow-500 hover:underline font-semibold transition-colors duration-300 inline-block hover:scale-105 transform"
            >
              View All Restaurants
            </Link>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <div
        className={`transition-all duration-700 delay-700 transform
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
