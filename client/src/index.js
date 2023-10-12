import React from 'react';
import ReactDOM from 'react-dom/client';
import Login from "./components/Login"
import Signup  from './components/Signup';
import App from "./App";


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import CreateArea from './components/CreateArea';
const router = createBrowserRouter([
  {
    path: "/",
    element:   <Login/>

  },
  {
    path: "/signup",
    element: <Signup/>,
  },
    {
    path: "/home",
    element : <App/>
  
  },
      {
    path: "/create",
    element : <CreateArea/>
  
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

