import React, { useEffect, useState } from 'react'
import axios from 'axios';

function ControllPanel() {

   
   
  // let verification = false;

  // const verifyCookie = async()=>{
  //   const verificationRes = await axios.get('http://127.0.0.1:3009/api/AdminLogin')
  //   console.log(verificationRes)
  // }
  

  let pendingReq;

   const [name , setName] = useState('');

   const [req , setReq] = useState([{RestoName:"nothing"}])

   useEffect(()=>{

    const ck = document.cookie;
   console.log("cookies is",ck)
   console.log(ck.split('=')[1])
   let cok = ck.split('=')[1]

   console.log("spllited",ck.split(4))

   const params = {
    //ck:document.cookie
    ck:cok
   }
   console.log("params" , params)

   const verify = axios.post('http://127.0.0.1:3009/api/verifyAdmin' , params )
   verify.then((d)=>{
    console.log("verify status" , d.data.status)
    if(d.data.status == "success"){

      const data = axios.get('http://127.0.0.1:3009/api/registerResto')
 data.then((data) =>{
    console.log("data:",data.data);
    setReq(data.data)
    setName(data.data[0].RestoName)
    console.log("type" , typeof data)
    console.log("req" , req)
    //pendingReq = data.data[0].RestoName;
    
  })
  .catch((err) =>{
    console.log("can not get pending req from server")
  })


    }

   })
   .catch((err) =>{
    console.log("went wrong" , err)
   })

  
//   const data = axios.get('http://127.0.0.1:3009/api/registerResto')
//  data.then((data) =>{
//     console.log("data:",data.data);
//     setReq(data.data)
//     setName(data.data[0].RestoName)
//     console.log("type" , typeof data)
//     console.log("req" , req)
//     //pendingReq = data.data[0].RestoName;
    
//   })
//   .catch((err) =>{
//     console.log("can not get pending req from server")
//   })

} , [])

async function handleAccept(e , ele){
  console.log('value' , ele )
  const acceptedResto = {
    RestoName:ele.RestoName,
    RestoId:ele.OwnerContact,
    RestoAddress:ele.RestoAddress,
    RestoOwner:ele.RestoOwner,
    OwnerContact:ele.OwnerContact,
    RestoPassword:ele.RestoPassword
  }
  const acceptResponse = await axios.post('http://127.0.0.1:3009/api/verifiedResto' , acceptedResto);
  console.log(acceptResponse);
  location.reload();
  
  
  
}

async function handleReject(e , ele){
  console.log(ele);
  const rejectResponse = await axios.post('http://127.0.0.1:3009/api/rejectedResto' , {RestoId:ele.OwnerContact});
  console.log(rejectResponse);
  location.reload();
}

let AdminLogout = ()=>{
  console.log("deltein cookie");
  document.cookie = "uid=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  location.reload()
}

  return (
    <>
    
    
       {
        
        req.map((ele, index) => (
          <div key={index} className='h-16 w-2/4 bg-slate-100'>
            <table className='m-6' border={2}>
              <tbody>
              <tr className='bg-slate-100 border-2 border-red-500'>
                <th className='border-2 border-black'>RestoName</th>
                <th className='border-2 border-black'>RestoAddress</th>
                <th className='border-2 border-black'>RestoOwner</th>
                <th className='border-2 border-black'>OwnerContact</th>
                <th className='border-2 border-black'>Accept</th>
                <th className='border-2 border-black'>Reject</th>
              </tr>
              <tr>
                <td className='border-2 border-black'>{ele['RestoName']}</td>
                <td className='border-2 border-black'>{ele['RestoAddress']}</td>
                <td className='border-2 border-black'>{ele['RestoOwner']}</td>
                <td className='border-2 border-black'>{ele['OwnerContact']}</td>
                <td className='border-2 border-black'><button className='bg-blue-700 rounded-sm hover:bg-blue-600 p-1 font-bold' onClick={(e)=>{handleAccept(e ,  ele)}}>Accept</button></td>
                <td className='border-2 border-black'><button className='bg-blue-700 rounded-sm hover:bg-blue-600 p-1 font-bold' onClick={(e)=>{handleReject(e , ele)}}>Reject</button></td>
              </tr>
              </tbody>
            </table>

            

            
          </div>
        ))

        
       }
      <div className='absolute top-3 right-4'>
              <button className='bg-red-700 rounded-sm hover:bg-red-600 p-1 font-bold' onClick={AdminLogout}>LOGOUT</button>
      </div>
      
    </>
  )
}

export default ControllPanel
