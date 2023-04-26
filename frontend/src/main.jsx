import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import About from './routes/About'
import Home from './routes/Home'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap'


const router = createBrowserRouter([
  {
  path:'/',
  element:<Home/>
  },
  {
    path:'/about',
    element: <About />
    }
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
   <RouterProvider router={router}/>
  </React.StrictMode>
);
