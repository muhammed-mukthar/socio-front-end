import { Login } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import { makeRequest } from '../../axios/axios'
import './conversation.css'
const Conversation=({data,currentUserId,online})=> {
    const [userData,setUserData]=useState(null)
    useEffect(() => {
        const userId=data.members.find((id)=>id!==currentUserId)
        console.log(userId,'hallo guys');
      const getUserData=async()=>{
        try{
            const {data}=await makeRequest.get(`users/${userId}`)
            setUserData(data)
            console.log(data,'hallo guys');
        }catch(err){
            console.log(err);
        }
       
      }
      getUserData()
    
      
    }, [])
    
  return (
    <>
  <div className="follower conversation">
    <div >
      {online && <div className='online-dot'></div>}
        {/* <div className="online-dot"></div> */}
        <img src={userData?.profilePic} alt="" className='followerImage' style={{ width: "50px", height: "50px" }} />
        <div className="name" style={{fontSize: '0.8rem'}}>
            <span>{userData?.name} </span>
            {/* <span style={{color: online?"#51e200":""}}>{online? "Online" : "Offline"}</span> */}
            <span>{online?"online":"offline"}</span>
          </div>
    </div>
  </div>
  <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
</>
  )
}

export default Conversation