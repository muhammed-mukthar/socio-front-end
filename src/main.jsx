import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/authContext";
import { socket, SocketContext } from './context/socketContext';
import { DarkModeContextProvider } from "./context/darkModeContext";

import './index.css'
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    

    <SocketContext.Provider value={socket} >
      <AuthContextProvider>
      <DarkModeContextProvider>
        <App />
        </DarkModeContextProvider>
      </AuthContextProvider>
      </SocketContext.Provider>
  
  </React.StrictMode>
);
