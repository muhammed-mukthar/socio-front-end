import axios from 'axios'

const url=import.meta.env.VITE_AXIOS_URL
const socketUrl=import.meta.env.VITE_SOCKET_URL
const header=  JSON.parse(localStorage.getItem("authentication"))?{
    "authorization": "Bearer " + JSON.parse(localStorage.getItem("authentication")).accessToken,
    "x-refresh":JSON.parse(localStorage.getItem("authentication")).refreshToken,
    

  }:{
  

  }
  const fileheader= JSON.parse(localStorage.getItem("authentication"))?{
    "Content-Type": "multipart/form-data",
    "authorization": "Bearer " + JSON.parse(localStorage.getItem("authentication")).accessToken,
    "x-refresh":JSON.parse(localStorage.getItem("authentication")).refreshToken,
  }:{
  }
export const makeRequest =  axios.create({
    baseURL:url,
headers:header
})

export const fileRequest  =  axios.create({
  baseURL:url,
headers:fileheader
})

export const socketRequest=socketUrl