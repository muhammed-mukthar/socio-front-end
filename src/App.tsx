import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Login from './pages/login/Login'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import Register from './pages/register/Register';
function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login/>,
    },  {
      path: "/register",
      element: <Register/>
    },
  ]);

  return (
    <div className="App">
  <RouterProvider router={router} />
    </div>
  )
}

export default App
