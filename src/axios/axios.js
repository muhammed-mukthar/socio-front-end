import axios from 'axios'

const url="http://localhost:5000/api/"

const header=await JSON.parse(localStorage.getItem("authentication"))?{
    "authorization": "Bearer " + JSON.parse(localStorage.getItem("authentication")).accessToken,
    "x-refresh":JSON.parse(localStorage.getItem("authentication")).refreshToken,
    

  }:{
  

  }
  const fileheader=await JSON.parse(localStorage.getItem("authentication"))?{
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
