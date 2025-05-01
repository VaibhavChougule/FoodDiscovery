import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {ChefHat, Star, Clock, Users } from 'lucide-react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

function AboutUs() {
  const [isVisible, setIsVisible] = useState({
    title: false,
    restaurantOwners: false,
    students: false,
    features: false
  });

  // Animation on scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const title = document.getElementById('title-section');
      const restaurantOwners = document.getElementById('restaurant-owners');
      const students = document.getElementById('students');
      const features = document.getElementById('features');

      if (title && isElementInViewport(title)) {
        setIsVisible(prev => ({ ...prev, title: true }));
      }
      if (restaurantOwners && isElementInViewport(restaurantOwners)) {
        setIsVisible(prev => ({ ...prev, restaurantOwners: true }));
      }
      if (students && isElementInViewport(students)) {
        setIsVisible(prev => ({ ...prev, students: true }));
      }
      if (features && isElementInViewport(features)) {
        setIsVisible(prev => ({ ...prev, features: true }));
      }
    };

    function isElementInViewport(el) {
      const rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fadeIn = (elementVisible) => 
    elementVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10";

  const features = [
    {
      icon: <ChefHat className="w-8 h-8 text-indigo-600" />,
      title: "Daily Menu Updates",
      description: "Restaurant owners can effortlessly update their daily specials and menu items."
    },
    {
      icon: <Star className="w-8 h-8 text-indigo-600" />,
      title: "Ratings & Reviews",
      description: "Users can rate and review meals to help others make informed decisions."
    },
    {
      icon: <Clock className="w-8 h-8 text-indigo-600" />,
      title: "Real-time Availability",
      description: "Get instant updates on food availability to avoid disappointment."
    },
    {
      icon: <Users className="w-8 h-8 text-indigo-600" />,
      title: "Community Recommendations",
      description: "Discover hidden gems recommended by local food enthusiasts."
    }
  ];

  const testimonials = [
    {
      name: "Sanket Patil",
      role: "Restaurant Owner",
      image: "/api/placeholder/80/80",
      quote: "FoodDiscovery has doubled our student customers since we joined the platform!"
    },
    {
      name: "Vaibhav Chougule",
      role: "College Student",
      image: "/api/placeholder/80/80",
      quote: "Finding affordable and good food near campus has never been easier!"
    }
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-white via-indigo-50 to-purple-50 mt-20">
        {/* Hero Section */}
        <div 
          id="title-section" 
          className={`relative overflow-hidden py-20 px-4 flex flex-col items-center text-center transition-all duration-1000 ${fadeIn(isVisible.title)}`}
        >
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-200 rounded-full opacity-30 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-200 rounded-full opacity-30 blur-3xl"></div>
          
          {/* <Motion className="text-indigo-600 w-16 h-16 mb-6" /> */}
          <h1 className="font-extrabold text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 mb-6">
            Connecting Food & People
          </h1>
          <p className="text-gray-700 text-xl md:text-2xl max-w-3xl mb-10">
            FoodDiscovery bridges the gap between delicious meals and hungry students, creating a community of food lovers and passionate restaurateurs.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/user" className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-full transition-all shadow-lg hover:shadow-xl">
              Find Restaurants
            </Link>
            <Link to="/register" className="bg-white hover:bg-gray-100 text-indigo-600 font-medium py-3 px-6 rounded-full border-2 border-indigo-600 transition-all shadow-lg hover:shadow-xl">
              Join as Restaurant
            </Link>
          </div>
        </div>

        {/* For Whom Section */}
        <div className="py-16 px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16">Who We Serve</h2>
            
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Restaurant Owners Card */}
              <div 
                id="restaurant-owners" 
                className={`flex-1 relative overflow-hidden bg-white rounded-2xl shadow-xl transition-all duration-1000 transform ${fadeIn(isVisible.restaurantOwners)}`}
              >
                <div className="h-48 bg-gradient-to-r from-indigo-600 to-indigo-400 flex items-center justify-center">
                  {/* <img src="/api/placeholder/400/320" alt="Restaurant owners" className="max-h-full object-cover" /> */}
                </div>
                <div className="p-8">
                  <h3 className="font-bold text-2xl text-indigo-700 mb-4">
                    For Restaurant Owners
                  </h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start">
                      <span className="text-indigo-600 mr-2">✓</span>
                      <span>Showcase your daily menu to nearby customers</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-indigo-600 mr-2">✓</span>
                      <span>Increase visibility with targeted local marketing</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-indigo-600 mr-2">✓</span>
                      <span>Receive valuable feedback to improve offerings</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-indigo-600 mr-2">✓</span>
                      <span>Build loyalty with student-focused promotions</span>
                    </li>
                  </ul>
                  <Link to="/register" className="inline-block mt-6 text-indigo-600 font-medium hover:text-indigo-800 hover:underline">
                    Register Your Restaurant →
                  </Link>
                </div>
              </div>

              {/* Students Card */}
              <div 
                id="students" 
                className={`flex-1 relative overflow-hidden bg-white rounded-2xl shadow-xl transition-all duration-1000 transform ${fadeIn(isVisible.students)}`}
              >
                <div className="h-48 bg-gradient-to-r from-pink-600 to-pink-400 flex items-center justify-center">
                  {/* <img src="/api/placeholder/400/320" alt="Students" className="max-h-full object-cover" /> */}
                </div>
                <div className="p-8">
                  <h3 className="font-bold text-2xl text-pink-700 mb-4">
                    For Students & Locals
                  </h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start">
                      <span className="text-pink-600 mr-2">✓</span>
                      <span>Discover affordable dining options near campus</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-pink-600 mr-2">✓</span>
                      <span>Browse daily menus before heading out</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-pink-600 mr-2">✓</span>
                      <span>Save favorites and receive special offers</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-pink-600 mr-2">✓</span>
                      <span>Share recommendations with friends</span>
                    </li>
                  </ul>
                  <Link to="/user" className="inline-block mt-6 text-pink-600 font-medium hover:text-pink-800 hover:underline">
                    Explore
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div 
          id="features" 
          className={`py-16 px-8 bg-indigo-700 transition-all duration-1000 ${fadeIn(isVisible.features)}`}
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-16">Key Features</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="font-bold text-xl text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="py-16 px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16">What People Say</h2>
            
            <div className="flex flex-col md:flex-row gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="flex-1 bg-gray-50 rounded-xl p-6 shadow-md">
                  <div className="flex items-center mb-4">
                    {/* <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4" /> */}
                    <div>
                      <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                      <p className="text-gray-500 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-16 px-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Transform Your Food Discovery?</h2>
            <p className="text-indigo-100 text-lg mb-8">Join thousands of satisfied users and restaurant partners.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/register" className="bg-white hover:bg-gray-100 text-indigo-600 font-medium py-3 px-8 rounded-full transition-all">
                Sign Up Now
              </Link>
              <Link to="/user" className="bg-transparent hover:bg-indigo-700 text-white font-medium py-3 px-8 rounded-full border-2 border-white transition-all">
                Explore
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default AboutUs;