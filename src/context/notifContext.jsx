import { createContext, useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
export const notifContext = createContext();
const notifhere = async () => {
    toast("you have a message", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
  };


export const NotifContextProvider = ({ children }) => {

  return (
    <NotifContextProvider.Provider value={{ notifhere }}>
      {children}
    </NotifContextProvider.Provider>
  );
};
