import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import config from '../config';
function LoginResto() {

  const navigate = useNavigate()

  const [restoId , setRestoId] = useState(null)
  const [password , setPassword] = useState(null)

  const [loading , setLoading] = useState('hidden')

  const handleLogin = async()=>{
    alert(restoId)
    const loginCredentials ={
      restoId:restoId,
      password:password
    }
    //alert("loging in")
    setLoading('block')
      const restoLoginResponse = await axios.post( `${config.API_URL}/RestoLogin`, loginCredentials)
      //'https://food-discovery-server.vercel.app/api/'
      console.log("restoLogin response" , restoLoginResponse)
      const token = restoLoginResponse.data.token;
      if(token == undefined){
        alert("Wrong Login Credentials")
        console.log("token not provided")
        setLoading("hidden");
      }
      else{
        document.cookie = `owner=${token}`;
        
        navigate('/owner')
      }
      
      //console.log("done");
  }
  return (
    <>
    {/* */}
      <div className='h-screen w-screen bg-slate-300 flex justify-center items-center'>
        <div className={` ${loading} h-20 w-24 absolute animate-ping rounded-lg bg-indigo-500 text-center flex items-center justify-center font-bold`}>Logging In</div>
  <div className='h-3/5 w-full sm:w-2/4 bg-slate-400 rounded-md shadow-md p-8'>
    <input
      type="text"
      onChange={(e) => { setRestoId(e.target.value) }}
      className='w-full p-2 mb-4 rounded'
      placeholder='Enter Id of your Restaurant(Use registered mobile no. as ID)'
    />

    <input
      type="password"
      onChange={(e) => { setPassword(e.target.value) }}
      className='w-full p-2 mb-4 rounded'
      placeholder='Enter Password'
    />

    <input
      type="button"
      value="Login"
      onClick={handleLogin}
      className='bg-green-300 hover:bg-green-200 rounded w-full p-2'
    />
  </div>
</div>


    </>
  )
}

export default LoginResto
