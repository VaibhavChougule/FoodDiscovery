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
      const restoLoginResponse = await axios.post('http://127.0.0.1:3009/api/RestoLogin' , loginCredentials)
      console.log("restoLogin response" , restoLoginResponse)
      const token = restoLoginResponse.data.token;
      if(token == undefined){
        console.log("token not provided")
      }
      else{
        document.cookie = `owner=${token}`;
      }

      navigate('/owner')
      //console.log("done");
  }
  return (
    <>
      <div className='h-screen w-screen bg-slate-300 flex justify-center items-center'>
      
      <div className='h-3/5 w-2/4 bg-slate-400'>
        
          
          

            <input type="text"  onChange={(e)=>{setRestoId(e.target.value)}}  className='w-3/5 m-3' placeholder='Enter Id of your Restorent' />

            <input type="password"  onChange={(e)=>{setPassword(e.target.value)}} className='w-3/5 m-3' placeholder='Enter Password' />

            <input type="button"  value="Login" onClick={handleLogin} className='bg-green-300 hover:bg-green-200 rounded w-3/5 m-3' />


          
      </div>
  </div>
    </>
  )
}

export default LoginResto
