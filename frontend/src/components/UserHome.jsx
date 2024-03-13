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
            {/* <div onLoad={getDetails()}>Welcome</div> */}
            {
                details?.map((val, ind) => {
                    return (
                        <div className="bg-gray-200 p-4 m-1 border-2 border-slate-600 flex flex-row justify-evenly">
                            <div className="mb-4">
                                <p className="text-xl font-bold">Name: {val.name}</p>
                            </div>
                            <div>
                                <h1>
                                    Today`s Menu
                                </h1>
                                <ul className="list-disc pl-4">
                                    {
                                        val.menu.map((item, index) => {
                                            return (
                                                <li>{item}</li>
                                            )

                                        })
                                    }


                                </ul>
                            </div>
                            <div className="mb-4">
                                <p className="text-xl font-bold">Address: {val.address}</p>
                            </div>
                        </div>
                    )
                })
            }


        </>
    )
}

export default UserHome
