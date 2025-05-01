import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../config';
import Header from './Header';
import { X } from 'lucide-react';

function RegisterResto() {
  const [restoName, setRestoName] = useState('');
  const [restoAddress, setRestoAddress] = useState('');
  const [restoOwner, setRestoOwner] = useState('');
  const [ownerContact, setOwnerContact] = useState('');
  const [restoPassword, setRestoPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  const navigate = useNavigate();

  useEffect(() => {
    if (document.cookie && document.cookie.startsWith('o=')) {
      const ck = document.cookie.split('=');
      const rt = ck[1];
      axios
        .post(`${config.API_URL}/verifyLogin`, { cok: rt })
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

  // Show toast notification
  const showToast = (message, type = 'error') => {
    setToast({ show: true, message, type });
    
    // Auto hide toast after 5 seconds
    setTimeout(() => {
      setToast({ show: false, message: '', type: '' });
    }, 5000);
  };

  // Hide toast notification
  const hideToast = () => {
    setToast({ show: false, message: '', type: '' });
  };

  const handleRegister = () => {
    const formData = {
      restoName,
      restoAddress,
      restoOwner,
      ownerContact,
      restoPassword,
    };

    for (let key in formData) {
      if (formData[key].trim().length === 0) {
        showToast('All fields are mandatory.');
        return;
      }
    }

    if (ownerContact.length !== 10) {
      showToast('Mobile number must be exactly 10 digits.');
      return;
    }

    if (restoPassword.length <= 3) {
      showToast('Password length must be 4 or more.');
      return;
    }

    setLoading(true);
    axios
      .post(`${config.API_URL}/registerResto`, formData)
      .then(() => {
        showToast('Successfully registered! We will contact you soon.', 'success');
        
        // Navigate after a short delay so user can see the success message
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      })
      .catch((err) => {
        showToast('Error while registering. Please try again.');
        console.error('Registration error:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Toast component
  const Toast = ({ message, type, onClose }) => {
    const bgColor = type === 'success' ? 'bg-green-100 border-green-500 text-green-800' : 'bg-red-100 border-red-500 text-red-800';
    const icon = type === 'success' ? (
      <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    ) : (
      <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
    );

    return (
      <div className={`fixed bottom-4 right-4 flex items-center p-4 mb-4 border-l-4 rounded-md shadow-md ${bgColor} animate-fade-in-up max-w-md`}>
        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 mr-3">
          {icon}
        </div>
        <div className="text-sm font-medium">{message}</div>
        <button 
          type="button" 
          className="ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex h-8 w-8 hover:bg-gray-200 hover:bg-opacity-25" 
          onClick={onClose}
        >
          <X size={16} />
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-full bg-gradient-to-br from-orange-100 to-indigo-100">
      <Header />
      <div className="flex justify-center items-center min-h-screen py-4 px-4 sm:px-6 lg:px-8 mt-12">
        <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Restaurant Registration</h2>
            <p className="text-sm text-gray-600 border-b pb-4">Join our platform and grow your business</p>
          </div>
          
          <div className="mt-6">
            <form className="space-y-3">
              <div>
                <label htmlFor="restoName" className="block text-sm font-medium text-gray-700">
                  Restaurant Name
                </label>
                <div className="mt-1">
                  <input
                    id="restoName"
                    name="restoName"
                    type="text"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter name of your restaurant"
                    value={restoName}
                    onChange={(e) => setRestoName(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Restaurant Address
                </label>
                <div className="mt-1">
                  <input
                    id="address"
                    name="address"
                    type="text"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter address of your restaurant"
                    value={restoAddress}
                    onChange={(e) => setRestoAddress(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="ownerName" className="block text-sm font-medium text-gray-700">
                  Owner Name
                </label>
                <div className="mt-1">
                  <input
                    id="ownerName"
                    name="ownerName"
                    type="text"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter name of restaurant owner"
                    value={restoOwner}
                    onChange={(e) => setRestoOwner(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="ownerContact" className="block text-sm font-medium text-gray-700">
                  Mobile Number
                </label>
                <div className="mt-1">
                  <input
                    id="ownerContact"
                    name="ownerContact"
                    type="text"
                    maxLength="10"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter 10-digit mobile number"
                    value={ownerContact}
                    onChange={(e) => {
                      // Only allow numeric input
                      const value = e.target.value.replace(/[^0-9]/g, '');
                      setOwnerContact(value);
                    }}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Create a strong password (4+ characters)"
                    value={restoPassword}
                    onChange={(e) => setRestoPassword(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <button
                  type="button"
                  onClick={handleRegister}
                  disabled={loading}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
                >
                  {loading ? (
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      ></path>
                    </svg>
                  ) : (
                    'Register Restaurant'
                  )}
                </button>
              </div>
            </form>
          </div>
          
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Toast notification */}
      {toast.show && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={hideToast} 
        />
      )}

      {/* Add keyframes for animation */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default RegisterResto;