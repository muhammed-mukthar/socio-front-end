import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import {  makeRequest} from "../axios/axios";
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  

  const login =async (inputs) => {
   
   const res=await axios.post(`http://localhost:5000/api/auth/login`,inputs)
   console.log(currentUser,'current user');
   if(res.data.message){
    return res.data
  ;
   }else{
      setCurrentUser(res.data)
   }
  };


  const refetchuser =async (userId) => {
   
    const res=await makeRequest.get(`users/${userId}`)
 
       setCurrentUser(res.data)
   
   };

  useEffect(() => {
    
       localStorage.setItem("user", JSON.stringify(currentUser));
       if(currentUser?.accessToken && currentUser?.refreshToken){
              localStorage.setItem("authentication", JSON.stringify({accessToken:currentUser?.accessToken,refreshToken:currentUser?.refreshToken}));
       }
 
    
   
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login ,refetchuser ,setCurrentUser}}>
      {children}
    </AuthContext.Provider>
  );
};
