import { Login } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import { makeRequest } from '../../axios/axios'
import './conversation.css'
const Conversation=({data,currentUserId,online})=> {
    const [userData,setUserData]=useState(null)
    useEffect(() => {
        const userId=data.members.find((id)=>id!==currentUserId)
      const getUserData=async()=>{
        try{
            const {data}=await makeRequest.get(`users/${userId}`)
            setUserData(data)
        }catch(err){
        }
       
      }
      getUserData()
    
      
    }, [])
    
  return (
    <>
  <div className="follower conversation">
    <div  >
      {online && <div className='online-dot'></div>}
        {/* <div className="online-dot"></div> */}
        <div className="userdesc">
        <img src={userData?.profilePic} alt="Profile" className='followerImage' style={{ width: "50px", height: "50px" }} />
        <div className="name" >
            <span style={{fontSize:"20px",fontWeight:"600"}}>{userData?.name} </span>
            {/* <span style={{color: online?"#51e200":""}}>{online? "Online" : "Offline"}</span> */}
            <span  style={{fontSize:"10px",color: online?"#51e200":""}}>{online?"online":"offline"}</span>
          </div>
          </div>
    </div>
  </div>
  <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
</>
  )
}

export default Conversation