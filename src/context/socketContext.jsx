import {createContext} from "react";
import { io } from "socket.io-client";
import {  socketRequest } from '../axios/axios'
console.log(socketRequest,'socketi');
export const socket = io(socketRequest)
export const SocketContext = createContext();

  