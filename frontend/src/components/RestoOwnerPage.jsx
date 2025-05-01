import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';

function RestoOwnerPage() {
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  console.log(day, month, year);

  const [loading, setLoading] = useState('hidden');
  const [items, setItems] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [editValue, setEditValue] = useState('');
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [restaurantInfo, setRestaurantInfo] = useState({
    name: "Delicious Eats",
    address: "123 Tasty Lane, Foodville",
    phone: "(555) 123-4567",
    hours: "Mon-Sat: 11am-10pm, Sun: 12pm-8pm",
    rating: 4.8
  });
  const itemInput = useRef();
  const list = useRef();

  // Show toast notification
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: '' });
    }, 3000);
  };

  // Add menu items to the list
  function addItems() {
    let val = itemInput.current.value.trim();
    if (!val) return;

    if (editIndex >= 0) {
      // Update item
      const updatedItems = [...items];
      updatedItems[editIndex] = val;
      setItems(updatedItems);
      setEditIndex(-1);
      setEditValue('');
      showToast('Item updated successfully', 'success');
    } else {
      // Add new item
      setItems([...items, val]);
      showToast('Item added successfully', 'success');
    }

    itemInput.current.value = '';
  }

  // Delete an item from the list
  function deleteItem(index) {
    const updatedItems = items.filter((item, i) => i !== index);
    setItems(updatedItems);
    showToast('Item deleted', 'info');
  }

  // Update item (edit mode)
  function updateItem(index) {
    setEditIndex(index);
    setEditValue(items[index]);
    itemInput.current.value = items[index];
  }

  useEffect(() => {
    // Function to extract cookie
    const getCookie = (name) => {
      const cookies = document.cookie.split(';');
      for (const cookie of cookies) {
        const [key, value] = cookie.trim().split('=');
        if (key === name) return value;
      }
      return null;
    };
  
    const ownerCookie = getCookie('owner');
  
    async function fetchRestaurantDetails() {
      console.log("called");
  
      if (!ownerCookie) return;
  
      try {
        const res = await axios.post(`${config.API_URL}/restaurantDetails`, {
          ck: ownerCookie,
        });
        setRestaurantInfo(res.data);
      } catch (error) {
        console.error('Error fetching restaurant details:', error);
        showToast('Could not fetch restaurant details', 'error');
      }
    }
  
    fetchRestaurantDetails();
  }, []);
  
  // Send menu card to backend to save
  async function saveMenuItems() {
    // Validate that there are items to save
    if (items.length === 0) {
      showToast('Please add menu items before saving', 'error');
      return;
    }

    setLoading('block');

    // Function to extract a specific cookie by name
    const getCookie = (name) => {
      const cookies = document.cookie.split(';');
      for (const cookie of cookies) {
        const [key, value] = cookie.trim().split('=');
        if (key === name) return value;
      }
      return null; // Return null if the cookie is not found
    };

    // Extract the 'owner' cookie
    const ownerCookie = getCookie('owner');
    console.log(ownerCookie, " Owner cookie");

    if (!ownerCookie) {
      showToast('Owner cookie not found. Please log in again', 'error');
      setLoading('hidden');
      return;
    }

    try {
      const menucardres = await axios.post(`${config.API_URL}/menuCard`, {
        menuCard: items,
        ck: ownerCookie,
      });
      console.log(menucardres);
      localStorage.setItem('lastMenu', items);
      showToast('Menu saved successfully', 'success');
      setItems([]);
    } catch (error) {
      showToast('Error while saving the menu', 'error');
      console.error(error);
    }

    setLoading('hidden');
  }

  let lastMenu = localStorage.getItem('lastMenu') || 'empty';
  let a = lastMenu.split(',');

  // Go back to home function
  function goBackHome() {
    window.location.href = '/'; // Change this to your home route if different
  }

  // Function to delete all cookies and log out
  function logout() {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }
    window.location.href = '/'; // Redirect to home after logging out
  }

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row items-start justify-center bg-gradient-to-br from-purple-200 via-pink-300 to-indigo-200 relative p-4 pt-24 pb-8">
      {/* Loading Spinner */}
      <div className={`${loading} fixed top-16 left-1/2 transform -translate-x-1/2 h-20 w-24 animate-pulse rounded-lg bg-gray-800 text-white text-center flex items-center justify-center font-bold text-xl shadow-lg z-50`}>
        Saving
      </div>

      {/* Toast Notification */}
      {toast.show && (
        <div className={`fixed top-24 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg z-50 flex items-center transition-all duration-300 ${
          toast.type === 'success' ? 'bg-green-500' : 
          toast.type === 'error' ? 'bg-red-500' : 
          toast.type === 'info' ? 'bg-blue-500' : 'bg-gray-700'
        } text-white`}>
          <span className="mr-2">
            {toast.type === 'success' ? '✓' : 
             toast.type === 'error' ? '✕' : 'ℹ'}
          </span>
          {toast.message}
        </div>
      )}

      <header className="bg-gradient-to-r from-indigo-600 to-purple-700 py-4 px-6 fixed w-screen top-0 z-50 shadow-lg">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <a href="/" className="flex items-center group">
                <span className="text-2xl font-extrabold text-white">
                  Food<span className="text-yellow-300">Discovery</span>
                </span>
                <svg
                  className="h-6 w-6 ml-2 text-yellow-300 group-hover:text-white transition-colors duration-300"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </header>
      {/* Restaurant Details */}
      <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-2xl mb-4 md:mb-0 md:mr-4 max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Restaurant Details</h2>
          <div className="flex gap-2">
            <button
              onClick={goBackHome}
              className="bg-blue-500 text-white px-3 py-1 text-sm rounded-lg shadow-md hover:bg-blue-600"
            >
              Home
            </button>
            <button
              onClick={logout}
              className="bg-red-500 text-white px-3 py-1 text-sm rounded-lg shadow-md hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
          <h3 className="text-xl font-bold text-center mb-4 text-gray-700">{restaurantInfo.RestoName}</h3>

          <div className="space-y-3">
            <div className="flex items-start">
              <span className="font-semibold w-20 text-gray-600">ID:</span>
              <span className="text-gray-800">{restaurantInfo.RestoId}</span>
            </div>
            <div className="flex items-start">
              <span className="font-semibold w-20 text-gray-600">Address:</span>
              <span className="text-gray-800">{restaurantInfo.RestoAddress}</span>
            </div>

            <div className="flex items-start">
              <span className="font-semibold w-20 text-gray-600">Phone:</span>
              <span className="text-gray-800">{restaurantInfo.OwnerContact}</span>
            </div>

            <div className="flex items-start">
              <span className="font-semibold w-20 text-gray-600">Owner:</span>
              <span className="text-gray-800">{restaurantInfo.RestoOwner}</span>
            </div>

            <div className="flex items-start">
              <span className="font-semibold w-20 text-gray-600">Premium:</span>
              <div className="flex items-center">
                <span className="text-yellow-500 mr-1">★</span>
                {/* <span className="text-gray-800">False</span> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Manager */}
      <div className="w-full md:w-2/3 bg-white p-6 rounded-lg shadow-2xl max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-6">
          Restaurant Menu Manager
        </h1>

        <div className="flex flex-col items-center mb-6">
          <input
            type="text"
            ref={itemInput}
            placeholder="Add or Edit Menu Item"
            className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-500 shadow-sm"
            autoFocus
            onKeyPress={(e) => {
              if (e.key === 'Enter') addItems();
            }}
          />
          <button
            onClick={addItems}
            className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md ${editIndex >= 0 ? 'bg-yellow-500 hover:bg-yellow-600' : ''}`}
          >
            {editIndex >= 0 ? 'Update Item' : 'Add Item'}
          </button>
        </div>

        {/* Fixed height container for menu items */}
        <div className="h-64 mb-6">
          <ol
            ref={list}
            className="bg-gray-200 p-4 rounded-lg shadow-md w-full text-gray-800 h-full overflow-y-auto"
          >
            {items.length > 0 ? (
              items.map((item, index) => (
                <li key={index} className="flex justify-between items-center bg-teal-500 text-white font-semibold rounded-md p-2 m-2 shadow-sm">
                  {index + 1}. {item}
                  <div>
                    <button
                      onClick={() => updateItem(index)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded-md ml-2 shadow-md hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteItem(index)}
                      className="bg-red-500 text-white px-2 py-1 rounded-md ml-2 shadow-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <p className="text-gray-600 italic text-center p-4">No menu items added yet. Add some items above.</p>
            )}
          </ol>
        </div>

        <button
          onClick={saveMenuItems}
          className={`w-full font-bold py-3 rounded-lg shadow-lg mb-6 ${
            items.length > 0 
              ? 'bg-green-500 hover:bg-green-600 text-white cursor-pointer'
              : 'bg-gray-400 text-gray-200 cursor-not-allowed'
          }`}
          disabled={items.length === 0}
        >
          {items.length > 0 ? 'Save Menu' : 'Add Items to Save Menu'}
        </button>

        <div className="bg-indigo-100 p-6 rounded-lg shadow-lg">
          <h2 className="font-bold text-lg mb-4">Your Previous Menu:</h2>
          {a.length > 0 && a[0] !== 'empty' ? (
            a.map((val, ind) => (
              <div
                key={ind}
                className="flex justify-between p-2 bg-gray-50 mb-2 rounded-md shadow-sm"
              >
                <span className="font-bold text-gray-700">{ind + 1}.</span>
                <span>{val}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-600 italic">No previous menu items found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default RestoOwnerPage;