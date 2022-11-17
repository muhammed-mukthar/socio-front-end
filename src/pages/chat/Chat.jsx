import React, { useEffect, useState } from 'react'
import LogoSearch from '../../components/LogoSearch/LogoSearch'
import './chat.css'
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import { makeRequest } from '../../axios/axios';
import Conversation from '../../components/Conversation/Conversation';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { Link } from 'react-router-dom';
function Chat() {
    const { currentUser } = useContext(AuthContext);
    console.log(currentUser,'current');
    const [chats, setChats] = useState([]);
    const [currentChat,setCurrentChat]=useState(null)

    useEffect(() => {
        const getChats = async () => {
          try {
           const {data}=await makeRequest.get(`/conversation/${currentUser.id}`)
            setChats(data);
          } catch (error) {
            console.log(error);
          }
        };
        getChats();
      }, [currentUser.id]);

console.log(chats,'jjeee');
  return (
    <div className="Chat">
    {/* Left Side */}
    <div className="Left-side-chat">
   <LogoSearch/>
      <div className="Chat-container">
        <h2>Chats</h2>
        <div className="Chat-list">
            {
                chats.map((chats)=>(
                    <div onClick={()=>setCurrentChat(chats)}>
                        <Conversation
                      
                  data={chats}
                  currentUserId={currentUser.id}
                  key={chats._id}
                />
                    </div>

                ))
            }
         
         
            <div>
          
            </div>
      
        </div>
      </div>
    </div>

    {/* Right Side */}

    <div className="Right-side-chat">
      <div style={{ width: "20rem", alignSelf: "flex-end" }}>
      <div className="navIcons">
      <Link to="../home">
       <HomeOutlinedIcon/>
      </Link>
   
     < NotificationsOutlinedIcon/>
      <Link to="../chat">
       <ChatBubbleOutlineOutlinedIcon/>
      </Link>
    </div>

    <ChatBox chat={currentchat} currentUser={user._id}/>
      </div>
      
    </div>
  </div>
  )
}

export default Chat