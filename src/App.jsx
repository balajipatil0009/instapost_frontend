import "./App.css";
import React from 'react';
import Home from "./componunts/Home";
import AddPost from "./componunts/AddPosts";
import Login from "./componunts/Login"
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Resister from "./componunts/Resister";


const router = createBrowserRouter([
  {
    path:"/",
    element:<Home/>
  },{
    path:"/login",
    element:<Login/>
  },
  {
    path:"/addPost",
    element:<AddPost/>
  },
  {
    path:"/resister",
    element:<Resister/>
  }
])


function App() {
  return (
    <>
         <RouterProvider router={router}/>
    </>
  );
}

export default App;
