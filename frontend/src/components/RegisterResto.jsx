import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

function RegisterResto() {
  const [restoName , setRestoName] = useState('');
  const [restoAddress , setrestoAddress] = useState('');
  const [restoOwner , setrestoOwner] = useState('');
  const [ownerContact , setownerContact] = useState('');
  const [restoPassword , setrestoPassword] = useState('');

  const handleRegister = async ()=>{

    const formData = {
      restoName:restoName,
      restoAddress:restoAddress,
      restoOwner:restoOwner,
      ownerContact:ownerContact,
      restoPassword:restoPassword
    }

    const registerResponse = await axios.post('/api/registerResto' , formData)
    console.log(registerResponse);
    alert("successfully registered soon we will contact you.")

    
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
            type="submit"
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
