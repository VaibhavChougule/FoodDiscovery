import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function LoginResto() {

  const navigate = useNavigate()

  const [restoId , setRestoId] = useState(null)
  const [password , setPassword] = useState(null)

  const handleLogin = async()=>{
    alert(restoId)
    const loginCredentials ={
      restoId:restoId,
      password:password
    }
    alert("loging in")
      const restoLoginResponse = await axios.post('https://food-discovery-server.vercel.app/api/RestoLogin' , loginCredentials)
      console.log("restoLogin response" , restoLoginResponse)
      const token = restoLoginResponse.data.token;
      if(token == undefined){
        alert("token galt hai")
        console.log("token not provided")
      }
      else{
        document.cookie = `owner=${token}`;
      }
      alert('succesfull')
      navigate('/owner')
      //console.log("done");
  }
  return (
    <>
      <div className='h-screen w-screen bg-slate-300 flex justify-center items-center'>
  <div className='h-3/5 w-full sm:w-2/4 bg-slate-400 rounded-md shadow-md p-8'>
    <input
      type="text"
      onChange={(e) => { setRestoId(e.target.value) }}
      className='w-full p-2 mb-4 rounded'
      placeholder='Enter Id of your Restaurant'
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
