import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import config from '../config';
import Header from './Header.jsx';
import { X, LogIn } from 'lucide-react';

function LoginResto() {
  const navigate = useNavigate();
  const [restoId, setRestoId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [validationErrors, setValidationErrors] = useState({ restoId: '', password: '' });

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

  const validateForm = () => {
    let isValid = true;
    const errors = { restoId: '', password: '' };

    if (!restoId?.trim()) {
      errors.restoId = 'Restaurant ID is required';
      isValid = false;
    } else if (!/^\d{10}$/.test(restoId)) {
      errors.restoId = 'Restaurant ID must be a 10-digit number';
      isValid = false;
    }

    if (!password?.trim()) {
      errors.password = 'Password is required';
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }

    const loginCredentials = {
      restoId,
      password,
    };
    
    setLoading(true);
    
    try {
      const restoLoginResponse = await axios.post(
        `${config.API_URL}/RestoLogin`,
        loginCredentials
      );
      
      const token = restoLoginResponse.data.token;
      
      if (!token) {
        showToast('Wrong login credentials. Please try again.');
      } else {
        showToast('Login successful!', 'success');
        document.cookie = `owner=${token}`;
        
        // Navigate after a short delay to show success message
        setTimeout(() => {
          navigate('/owner');
        }, 1500);
      }
    } catch (error) {
      console.error('Login error:', error);
      showToast('Error during login. Please try again.');
    } finally {
      setLoading(false);
    }
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
    <div className="min-h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <Header />
      
      <div className="flex justify-center items-center min-h-screen py-4 px-4 sm:px-6 lg:px-8 mt-12">
        <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-indigo-700 mb-2">Restaurant Login</h2>
            <p className="text-sm text-gray-600 border-b pb-4">Access your restaurant dashboard</p>
          </div>
          
          <div className="mt-6">
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
              <div>
                <label htmlFor="restoId" className="block text-sm font-medium text-gray-700">
                  Restaurant ID
                </label>
                <div className="mt-1">
                  <input
                    id="restoId"
                    type="text"
                    value={restoId}
                    onChange={(e) => {
                      // Only allow numeric input
                      const value = e.target.value.replace(/[^0-9]/g, '');
                      setRestoId(value);
                      if (validationErrors.restoId) {
                        setValidationErrors({...validationErrors, restoId: ''});
                      }
                    }}
                    maxLength={10}
                    className={`appearance-none block w-full px-3 py-3 border ${
                      validationErrors.restoId ? 'border-red-300 ring-1 ring-red-500' : 'border-gray-300'
                    } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                    placeholder="Enter 10-digit mobile number"
                  />
                  {validationErrors.restoId && (
                    <p className="mt-1 text-sm text-red-600">{validationErrors.restoId}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (validationErrors.password) {
                        setValidationErrors({...validationErrors, password: ''});
                      }
                    }}
                    className={`appearance-none block w-full px-3 py-3 border ${
                      validationErrors.password ? 'border-red-300 ring-1 ring-red-500' : 'border-gray-300'
                    } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                    placeholder="Enter your password"
                  />
                  {validationErrors.password && (
                    <p className="mt-1 text-sm text-red-600">{validationErrors.password}</p>
                  )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 transition-all duration-300"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <svg
                        className="animate-spin h-5 w-5 text-white mr-2"
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
                      Logging in...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <LogIn size={18} className="mr-2" />
                      Login
                    </div>
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className="text-center mt-6">
            <div className="text-sm text-gray-600 space-y-2">
              <p className="font-medium text-gray-700">Demo Credentials</p>
              <p>
                Demo ID: <span className="font-semibold">9322705181</span>
              </p>
              <p>
                Demo Password: <span className="font-semibold">2034</span>
              </p>
              <div className="mt-4 bg-indigo-50 text-indigo-700 px-4 py-3 rounded-lg shadow-sm">
                <p className="italic">
                  If you have registered with your details, go to{' '}
                  <Link to="/AdminLogin" className="text-blue-600 hover:text-blue-800 font-medium underline">
                    Admin Dashboard
                  </Link>{' '}
                  and click Accept, then try <span className="font-bold">login</span>.
                </p>
              </div>
            </div>
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

export default LoginResto;