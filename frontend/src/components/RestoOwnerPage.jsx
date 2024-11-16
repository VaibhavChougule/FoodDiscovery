import React, { useRef, useState } from 'react';
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
  const itemInput = useRef();
  const list = useRef();

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
    } else {
      // Add new item
      setItems([...items, val]);
    }

    itemInput.current.value = '';
  }

  // Delete an item from the list
  function deleteItem(index) {
    const updatedItems = items.filter((item, i) => i !== index);
    setItems(updatedItems);
  }

  // Update item (edit mode)
  function updateItem(index) {
    setEditIndex(index);
    setEditValue(items[index]);
    itemInput.current.value = items[index];
  }

  // Send menu card to backend to save
  async function saveMenuItems() {
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
    console.log(ownerCookie , " Owner cokkie");
  
    if (!ownerCookie) {
      alert('Owner cookie not found. Please log in again.');
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
      alert('Saved successfully');
      setItems([]);
    } catch (error) {
      alert('Error while saving the menu. Please try again.');
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
    <>
      <div className='h-screen w-screen flex items-center justify-center bg-gradient-to-br from-purple-200 via-pink-300 to-indigo-200 relative'>
        <div className='absolute top-8 left-8 flex gap-4'>
          <button
            onClick={goBackHome}
            className='bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600'
          >
            Home
          </button>
          <button
            onClick={logout}
            className='bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600'
          >
            Logout
          </button>
        </div>

        <div
          className={`${loading} h-20 w-24 absolute top-16 animate-pulse rounded-lg bg-gray-800 text-white text-center flex items-center justify-center font-bold text-xl shadow-lg`}
        >
          Saving
        </div>

        <div className='w-4/5 max-w-2xl bg-white p-8 rounded-lg shadow-2xl'>
          <h1 className='text-3xl font-bold text-center mb-6'>
            Restaurant Menu Manager
          </h1>

          <div className='flex flex-col items-center mb-6'>
            <input
              type='text'
              ref={itemInput}
              placeholder='Add or Edit Menu Item'
              className='w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-500 shadow-sm'
              autoFocus
            />
            <button
              onClick={addItems}
              className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md ${editIndex >= 0 ? 'bg-yellow-500 hover:bg-yellow-600' : ''}`}
            >
              {editIndex >= 0 ? 'Update Item' : 'Add Item'}
            </button>
          </div>

          <ol
            ref={list}
            className='bg-gray-200 p-4 rounded-lg shadow-md mb-6 w-full text-gray-800 max-h-48 overflow-y-auto'
          >
            {items.map((item, index) => (
              <li key={index} className='flex justify-between items-center bg-teal-500 text-white font-semibold rounded-md p-2 m-2 shadow-sm'>
                {index + 1}. {item}
                <div>
                  <button
                    onClick={() => updateItem(index)}
                    className='bg-yellow-500 text-white px-2 py-1 rounded-md ml-2 shadow-md hover:bg-yellow-600'
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteItem(index)}
                    className='bg-red-500 text-white px-2 py-1 rounded-md ml-2 shadow-md hover:bg-red-600'
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ol>

          <button
            onClick={saveMenuItems}
            className='w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg shadow-lg mb-6'
          >
            Save Menu
          </button>

          <div className='bg-indigo-100 p-6 rounded-lg shadow-lg'>
            <h2 className='font-bold text-lg mb-4'>Your Previous Menu:</h2>
            {a.map((val, ind) => (
              <div
                key={ind}
                className='flex justify-between p-2 bg-gray-50 mb-2 rounded-md shadow-sm'
              >
                <span className='font-bold text-gray-700'>{ind + 1}.</span>
                <span>{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default RestoOwnerPage;
