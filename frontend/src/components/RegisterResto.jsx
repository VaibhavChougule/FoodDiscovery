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

    const registerResponse = await axios.post('http://127.0.0.1:3009/api/registerResto' , formData)
    console.log(registerResponse);

    
  }
  return (
    <>

    <div className='h-screen w-screen bg-slate-300 flex justify-center items-center'>
      
        <div className='h-3/5 w-2/4 bg-slate-400'>
          <div className='flex flex-row justify-center'>
            <p>Already Have an Account </p>
            <Link to={'/login'} className='text-blue-600'>"Login</Link>
          </div>
            
            <form action="/registerResto" method='post' className='flex flex-col p-3'>

              <input type="text" name="restoName" className='w-3/5 m-3' placeholder='Enter name of your Restorent' onChange={(e) =>{setRestoName(e.target.value)}} />

              <input type="text" name="address" className='w-3/5 m-3' placeholder='Enter Address of your Restorent' onChange={(e) =>{setrestoAddress(e.target.value)}}  />

              <input type="text" name="ownerName" className='w-3/5 m-3' placeholder='Enter name of Restorent Owner'  onChange={(e) =>{setrestoOwner(e.target.value)}} />

              <input type="number" name="ownerContact" className='w-3/5 m-3' placeholder='Enter Mobile No. of Restorent Owner' onChange={(e) =>{setownerContact(e.target.value)}}  />

              <input type="password" name="password" className='w-3/5 m-3' placeholder='Create Strong Password' onChange={(e) =>{setrestoPassword(e.target.value)}}  />

              <input type="button" onClick={handleRegister} name='' value="Register" className='bg-green-300 hover:bg-green-200 rounded w-3/5 m-3' />


            </form>
        </div>
    </div>
      
    </>
  )
}

export default RegisterResto
