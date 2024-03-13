import React, { useRef, useState } from 'react'
import axios from 'axios'

function RestoOwnerPage() {
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  console.log(day, month, year);


  //array of items in menu card card

  let [items, setItems] = useState([]);
  let menuItems = [];

  const itemInput = useRef()
  const list = useRef();


  //add menu items in the list
  function addItems() {
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
  async function saveMenuItems() {
    const menucardres = await axios.post('/api/menuCard', {
      menuCard: menuItems,
      ck: document.cookie
    })
    console.log(menucardres);
    localStorage.setItem('lastMenu', menuItems)
    alert("saved successfully")
    menuItems.length = 0;
    while (list.current.firstChild) {
      list.current.removeChild(list.current.firstChild);
    }
    location.reload();
  }

  async function showLastMenu() {

  }



  let lastMenu = localStorage.getItem('lastMenu') || 'empty';
  console.log(lastMenu);
  let a = lastMenu.split(',');
  console.log("spl", a);
  // let d = [];
  // let n = lastMenu.length;
  // let i = 0;
  // while(i < n){
  //   d.push(lastMenu[i]);
  // }
  return (
    <>
      <div className='h-screen w-screen flex justify-center'>
      <div className='h-96 w-3/4 bg-red-200 flex flex-col items-center p-6 rounded-md shadow-md'>
        <h1 className='text-2xl font-bold mb-4'>Name of Restaurant</h1>
        <input
          type="text"
          ref={itemInput}
          placeholder='Add items'
          className='w-2/4 p-2 rounded-sm mb-2'
        />
        <input
          type="button"
          value="Add"
          onClick={addItems}
          className='bg-blue-400 h-8 w-16 hover:bg-blue-500 mb-4'
        />

        <ol ref={list} className='bg-slate-500 p-2 mb-4'>
          {/* {a.map((val, ind) => (
            <li key={ind} className='text-white'>{val}</li>
          ))} */}
        </ol>

        <input
          type="button"
          value="Save"
          onClick={saveMenuItems}
          className='bg-green-400 h-8 w-16 hover:bg-green-500'
        />

        <div className='bg-slate-300 border-2 p-4 mt-4'>
          <h1 className='font-bold mb-2'>Your Previous Menu card is:</h1>

          {a.map((val, ind) => (
            <div key={ind} className='flex justify-between'>
              <span>{ind + 1}:</span>
              <span>{val}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  )
}

export default RestoOwnerPage
