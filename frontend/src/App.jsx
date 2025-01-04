import React from "react"
import LandingPage from "./components/LandingPage"
import LoginResto from "./components/LoginResto"
import RegisterResto from "./components/RegisterResto"
import UserHome from "./components/UserHome"
import { Link } from "react-router-dom"
import Header from "./components/Header.jsx"



function App() {
  return (
    <>
      <div className="bg-[url('./assets/homepage.webp')] bg-cover bg-center h-screen w-screen overflow-hidden">
        {/* Header */}
        <Header/>

        {/* Main Content */}
        <main className="flex flex-col items-center justify-center text-center h-full px-4">
          <div className="flex flex-col items-center justify-center text-center px-4 py-6 bg-gray-800 rounded-md">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mx-4 text-white">
              Welcome to FoodDiscovery
            </h1>

            <p className="text-sm sm:text-lg md:text-xl text-gray-200 mb-6 max-w-2xl">
              Explore and connect with restaurants like never before. Your one-stop destination for food discovery!
            </p>

            {/* Location Selector */}
            <div className="mb-6">
              <label
                htmlFor="location"
                className="block text-white text-sm font-medium mb-2"
              >
                Select Your Location
              </label>
              <select
                id="location"
                className="px-4 py-2 rounded-md text-gray-700 font-semibold border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                <option value="demo-location">Sinhgad Campus</option>
                {/* Add more options here */}
              </select>
            </div>

            <Link to={"/user"}
              href="#explore"
              className="px-6 py-3 bg-yellow-300 text-purple-700 font-semibold rounded-full shadow-lg hover:bg-yellow-400 transition"
            >
              Explore Now
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}





export default App
