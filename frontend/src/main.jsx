import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter , RouterProvider} from 'react-router-dom'
import LandingPage from './components/LandingPage.jsx'
import UserHome from './components/UserHome.jsx'
import RegisterResto from './components/RegisterResto.jsx'
import LoginResto from './components/LoginResto.jsx'
import ControllPanel from './components/ControllPanel.jsx'
import AdminLogin from './components/AdminLogin.jsx'
import RestoOwnerPage from './components/RestoOwnerPage.jsx'
import AboutUs from './components/AboutUs.jsx'

const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>
  },
  {
    path:'user',
    element:<UserHome/>
  },
  {
    path:'user/:location',
    element:<UserHome/>
  },
  {
    path:'About',
    element:<AboutUs/>
  },
  {
    path:'register',
    element:<RegisterResto/>
  },
  {
    path:'login',
    element:<LoginResto/>
  },
  {
    path:'admin/panel',
    element:<ControllPanel/>
  },{
    path:'AdminLogin',
    element:<AdminLogin/>
  },
  {
    path:'owner',
    element:<RestoOwnerPage/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  
    <RouterProvider router = {router}/>
  
)
