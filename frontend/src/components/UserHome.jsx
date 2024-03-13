import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react';

function UserHome() {

    //let details;
    const [details, setDetails] = useState([]);


    useEffect(() => {
        axios.get('/api/getResto')
            .then((info) => {
                console.log("info", info);
                setDetails(info.data);
            })
            .catch((err) => {
                console.log("erroer", err);
            })


    }, [])

    // async function getDetails(){
    //     console.log("hello");
    //     let info = await axios.get('http://localhost:3009/api/getResto');
    //    //location.reload();
    //     console.log("info",info);
    //     details = info.data
    //     console.log("details",details);
    //     console.log("type "  , typeof details);

    // }



    console.log(details);
    return (
        <>
           <div className="container mx-auto my-4">
      {details.map((val, ind) => (
        <div key={ind} className="bg-gray-200 p-6 mb-6 border-2 border-slate-600 rounded-md shadow-md">
          <div className="mb-4">
            <p className="text-2xl font-bold text-indigo-800">Name: {val.name}</p>
          </div>
          <div>
            <h1 className="text-lg font-semibold mb-2">Today's Menu</h1>
            <ul className="list-disc pl-4">
              {val.menu.map((item, index) => (
                <li key={index} className="text-gray-700">{item}</li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <p className="text-2xl font-bold text-indigo-800">Address: {val.address}</p>
          </div>
        </div>
      ))}
    </div>


        </>
    )
}

export default UserHome
