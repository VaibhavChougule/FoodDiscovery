import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

function RegisterResto() {
  const [restoName , setRestoName] = useState('');
  const [restoAddress , setrestoAddress] = useState('');
  const [restoOwner , setrestoOwner] = useState('');
  const [ownerContact , setownerContact] = useState('');
  const [restoPassword , setrestoPassword] = useState('');

  const navigate = useNavigate();

//if cookies already present then without login owner can acces dashboard
  useEffect(()=>{
    console.log(document.cookie)
    if(document.cookie[0] !== 'o'){
      console.log("login or register")
    }
    else{

    
    let ck = document.cookie.split('=');
    console.log("cok",ck[1] , "type" , typeof ck[1]);
    let rt = ck[1];
    console.log("rt" ,rt);
    let login = axios.post('https://food-discovery-server.vercel.app/api/verifyLogin' , {cok:rt});
    login.then((response)=>{
      console.log(response.data.status)
      if(response.data.status == true){
        navigate('/owner')
      }
      else{
        console.log(response.data.status)
        console.log("plz login")
      }
    })
    .catch((err)=>{
      console.log("error network "  , err)
    })
  }

  } , [])
  //checkLogin();

  const handleRegister =  ()=>{

    const formData = {
      restoName:restoName,
      restoAddress:restoAddress,
      restoOwner:restoOwner,
      ownerContact:ownerContact,
      restoPassword:restoPassword
    }

    const registerResponse = axios.post('https://food-discovery-server.vercel.app/api/registerResto' , formData)
    registerResponse
    .then((response) =>{
      console.log(response);
      location.reload();
      alert("successfully registered soon we will contact you.")
    })
    .catch((err) =>{
      alert("Error While Registering Plz try Again.." , err)
    })
    
    
    
  }
  return (
    <>

<div className='h-screen w-screen bg-slate-300 flex justify-center items-center'>
      <div className='h-3/5 w-full sm:w-2/4 bg-slate-400 rounded-md p-8'>
        <div className='flex flex-row justify-center mb-4'>
          <p className='text-gray-700 mr-2'>Already Have an Account </p>
          <Link to={'/login'} className='text-blue-600'>Login</Link>
        </div>

        <form className='flex flex-col'>
          <input
            type="text"
            name="restoName"
            className='w-full sm:w-3/5 p-2 mb-4 rounded'
            placeholder='Enter name of your Restaurant'
            onChange={(e) => { setRestoName(e.target.value) }}
          />

          <input
            type="text"
            name="address"
            className='w-full sm:w-3/5 p-2 mb-4 rounded'
            placeholder='Enter Address of your Restaurant'
            onChange={(e) => { setrestoAddress(e.target.value) }}
          />

          <input
            type="text"
            name="ownerName"
            className='w-full sm:w-3/5 p-2 mb-4 rounded'
            placeholder='Enter name of Restaurant Owner'
            onChange={(e) => { setrestoOwner(e.target.value) }}
          />

          <input
            type="number"
            name="ownerContact"
            className='w-full sm:w-3/5 p-2 mb-4 rounded'
            placeholder='Enter Mobile No. of Restaurant Owner'
            onChange={(e) => { setownerContact(e.target.value) }}
          />

          <input
            type="password"
            name="password"
            className='w-full sm:w-3/5 p-2 mb-4 rounded'
            placeholder='Create Strong Password'
            onChange={(e) => { setrestoPassword(e.target.value) }}
          />

          <input
            type="button"
            onClick={handleRegister}
            value="Register"
            className='bg-green-300 hover:bg-green-200 rounded w-full sm:w-3/5 p-2'
          />
        </form>
      </div>
    </div>
      
    </>
  )
}

export default RegisterResto
