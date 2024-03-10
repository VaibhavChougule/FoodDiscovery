import React, { useRef, useState } from 'react'
import axios from 'axios'

function RestoOwnerPage() {
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  console.log(day , month , year);


  //array of items in menu card card

  let [items , setItems] = useState([]);
  let menuItems = [];

  const itemInput  = useRef()
  const list = useRef();


  //add menu items in the list
  function addItems(){
    let val = itemInput.current.value
    console.log(val);
    menuItems.push(val);
    
    console.log(menuItems);
    let li = document.createElement('li');
    li.style.backgroundColor = 'white'
    li.style.margin = '2px'
    li.innerHTML = menuItems[menuItems.length - 1];
    console.log(list.current)
    list.current.appendChild(li);
    //list.current
    
  }

  // async function restorentOwner(){
  //   const res = await axios.post('http://127.0.0.1:3009/api/seeOwner' , {ck:document.cookie});
  //   console.log(res);
  // }

  // async function addMenuCard(){
  //   let cookie = document.cookie

    
  // 





  //send menu card to backend to save
  async function saveMenuItems(){
    const menucardres = await axios.post('http://127.0.0.1:3009/api/menuCard' , {
      menuCard:menuItems,
      ck:document.cookie
       } )
    console.log(menucardres);
    localStorage.setItem('lastMenu' , menuItems)
    alert("saved successfully")
    menuItems.length = 0;
    while(list.current.firstChild){
      list.current.removeChild(list.current.firstChild);
    }
    location.reload();
  }

  async function showLastMenu(){

  }



  let lastMenu = localStorage.getItem('lastMenu') || ['empty'];
  console.log(lastMenu);
  let a = lastMenu.split(',');
  console.log("spl" , a);
  // let d = [];
  // let n = lastMenu.length;
  // let i = 0;
  // while(i < n){
  //   d.push(lastMenu[i]);
  // }
  return (
    <>
      {/* <div>
        <h1>Data:{`${day}-${month}-${year}`}</h1>
        <button onClick={restorentOwner}>send cookie</button>
      </div> */}

      <div className='min-h-96 w-3/4 bg-red-200 flex flex-col items-center'>
      <h1>Name of Restorent</h1>
      <input type="text"
      ref={itemInput}
        name="" id="" placeholder='add items' className='w-2/4 rounded-sm' />
      <input 
        type="button"
        value="add" 
        onClick={addItems}
        className='bg-blue-400 h-8 w-16 hover:bg-blue-500' />

        <ol ref={list}
        className='bg-slate-500 p-2'>

        </ol>

        <input type="button" value="Save"
          onClick={saveMenuItems} />



        <div className='bg-slate-300 border-2 '>
        <h1 className='font-bold'>Your Previous Menu card is:</h1>
      
        {
          a.map((val , ind) =>{
            return(
            <table className=''>
      {/* <thead>
        <tr>
          <th>SR NO.</th>
          <th>items</th>
         
        </tr>
      </thead> */}
      <tbody>
        <tr>
          <td>{ind+1}:</td>
          <td>{val}</td>
          
        </tr>
      </tbody>
    </table>
            )
          })
        }
      </div>
</div>
    </>
  )
}

export default RestoOwnerPage
