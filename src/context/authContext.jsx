import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import {  makeRequestWithoutHeaders } from "../axios/axios";
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login =async (inputs) => {
    console.log('inputs here',inputs);
   const res=await makeRequestWithoutHeaders.post(`auth/login`,inputs)
   console.log(res.data);
   await setCurrentUser(res.data)
  };
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};
