import axios from 'axios'


export const makeRequest = axios.create({
    baseURL:"http://localhost:5000/api/",headers:{
        "authorization": "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        "x-refresh":JSON.parse(localStorage.getItem("user")).refreshToken
      }
})
export const makeRequestWithoutHeaders = axios.create({
    baseURL:"http://localhost:5000/api/",})