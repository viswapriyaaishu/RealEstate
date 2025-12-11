import { useState } from 'react'
import "./App.scss"
import { Navbar } from './components/Navbar/Navbar'
import { Homepage } from './routes/Homepage/Homepage'
import {createBrowserRouter,Route,RouterProvider,Link} from "react-router-dom"
import { Layout, ProtectedLayout } from './routes/Layout/Layout'
import { Listpage } from './routes/Listpage/Listpage'
import { Listitem } from './routes/Listitem/Listitem'
import { Profile } from './routes/Profile/Profile'
import { Signin } from './routes/Signin/Signin'
import { Signup } from './routes/Signup/Signup'
import { ProfileUpdate } from './routes/ProfileUpdate/ProfileUpdate'
import { Addpost } from './routes/Addpost/Addpost'
import { postloader, postsloader, profileloader } from './loaders/loader.jsx'

function App() {
 
const router=createBrowserRouter([
  {
    path:"/",
    element:<Layout></Layout>,
    children:[
      {
        index:true,
        element:<Homepage></Homepage>
      },{
        path:"list",
        element:<Listpage></Listpage>,
        loader:postsloader
      },
      {
        path:"list/:id",
        element:<Listitem></Listitem>,
        loader:postloader
      },
      {
        path:"signin",
        element:<Signin></Signin>
      },
      {
        path:"signup",
        element:<Signup></Signup>
      }
      
    ]
  },
  {
    path:"/",
    element:<ProtectedLayout></ProtectedLayout>,
    children:[
      {
        path:"profile",
        element:<Profile></Profile>,
        loader:profileloader
      },
      {
        path:"profile/update",
        element:<ProfileUpdate></ProfileUpdate>
      },
      {
        path:"addpost",
        element:<Addpost></Addpost>
      }
    ]
  }
])
  return (
    <div className="appcon">
     <RouterProvider router={router}></RouterProvider>
     
    </div>
  )
}

export default App
