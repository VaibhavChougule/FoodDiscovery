import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import config from '../config';

function LoginResto() {
  const navigate = useNavigate();
  const [restoId, setRestoId] = useState(null);
  const [password, setPassword] = useState(null);
  const [loading, setLoading] = useState('hidden');

  const handleLogin = async () => {
    const loginCredentials = {
      restoId: restoId,
      password: password,
    };
    setLoading('block');
    try {
      const restoLoginResponse = await axios.post(
        `${config.API_URL}/RestoLogin`,
        loginCredentials
      );
      const token = restoLoginResponse.data.token;
      if (!token) {
        alert('Wrong Login Credentials');
        setLoading('hidden');
      } else {
        document.cookie = `owner=${token}`;
        navigate('/owner');
      }
    } catch (error) {
      alert('Error during login. Please try again.');
      setLoading('hidden');
    }
  };

  return (
    <>
      <div className="h-screen w-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex justify-center items-center">
        <div
          className={` ${loading} h-20 w-24 absolute animate-bounce rounded-lg bg-white shadow-lg text-indigo-700 text-center flex items-center justify-center font-bold`}
        >
          Logging In
        </div>
        <div className="h-3/5 w-full sm:w-1/3 bg-white rounded-xl shadow-xl p-8">
          <h1 className="text-2xl font-bold text-center mb-6 text-indigo-700">
            Restaurant Login
          </h1>
          <input
            type="text"
            onChange={(e) => setRestoId(e.target.value)}
            className="w-full p-3 mb-4 rounded-lg border-2 border-indigo-300 focus:outline-none focus:border-indigo-500"
            placeholder="Enter Restaurant ID (Registered mobile number)"
          />

          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-4 rounded-lg border-2 border-indigo-300 focus:outline-none focus:border-indigo-500"
            placeholder="Enter Password"
          />

          <button
            onClick={handleLogin}
            className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg w-full p-3 font-semibold shadow-lg transition-all duration-300"
          >
            Login
          </button>

          <div className="text-center mt-6 text-sm text-gray-600">
            <p>
              Demo ID: <span className="font-semibold">9322705181</span>
            </p>
            <p>
              Demo Password: <span className="font-semibold">2034</span>
            </p>
            <p className="mt-4 bg-indigo-100 text-indigo-700 px-2 py-1 rounded-lg shadow-sm italic">
              If you have registered with your details, go to{' '}
              <Link to="/AdminLogin" className="text-blue-500 underline">
                Admin Dashboard
              </Link>{' '}
              and click Accept, then try <b>login</b>.
            </p>

          </div>
        </div>
      </div>
    </>
  );
}

export default LoginResto;
