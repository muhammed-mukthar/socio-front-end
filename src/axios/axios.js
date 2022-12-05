import axios from 'axios'



const header=await JSON.parse(localStorage.getItem("authentication"))?{
    "authorization": "Bearer " + JSON.parse(localStorage.getItem("authentication")).accessToken,
    "x-refresh":JSON.parse(localStorage.getItem("authentication")).refreshToken,
    

  }:{
  

  }
export const makeRequest =  axios.create({
    baseURL:"http://localhost:5000/api/",
headers:header
})
