import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'


const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate() 

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async() => {
    window.confirm('Are you sure to login')
    // Add your login logic here
    console.log('Logging in with:', { username, password });
    const AdminLoginResponse = await axios.post('http://127.0.0.1:3009/api/AdminLogin' , {username:username , password:password})
    console.log("response" , AdminLoginResponse.data)
     
    if(AdminLoginResponse.data.verification == true){
        //useNavigate().push()
        //document.cookie =  AdminLoginResponse.data.token;
        document.cookie = `uid=${AdminLoginResponse.data.token}`
        navigate('/admin/panel')
    }
    else{
        alert("wrong id or password")
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Admin Login</h1>
      <form style={styles.form}>
        <label style={styles.label} htmlFor="username">
          Username:
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={handleUsernameChange}
          style={styles.input}
          className='border-2 border-black rounded-sm'
        />

        <label style={styles.label} htmlFor="password">
          Password:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          style={styles.input}
          className='border-2 border-black rounded-sm'
        />

        <button type="button" onClick={handleLogin} style={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  heading: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
  },
  label: {
    marginBottom: '8px',
  },
  input: {
    padding: '8px',
    marginBottom: '16px',
  },
  button: {
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default LoginPage;