import React, { useEffect, useRef, useState } from 'react'
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
import io from 'socket.io-client'
import ChatBox from '../../components/ChatBox/ChatBox';
function Chat() {
  const socket=useRef()
    const { currentUser } = useContext(AuthContext);
    console.log(currentUser,'current');
    const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  // Get the chat in chat section
  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await makeRequest.get(`/conversation/${currentUser._id}`)
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [currentUser._id]);

  // Connect to Socket.io
  useEffect(() => {
    socket.current = io("ws://localhost:8800");
    socket.current.emit("new-user-add", currentUser._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [currentUser]);
  const checkOnlineStatus=(chat)=>{
    console.log(currentUser,'current user');
    console.log(chat ,"chat is here bro");
    const chatMembers= chat.members.find((member)=>{
     return (member !== currentUser._id) ? member :""
      console.log( member !== currentUser._id,'jfsdhjshjkhfsd');
    })
    console.log(chatMembers,'chat members here guys');
    const online=onlineUsers.find((user)=>{
     return user.userId==chatMembers
    
      console.log(user,'user here fjdjhksahkjfshkdf' );
    })
    console.log(online,chatMembers,onlineUsers,'log here online');
    return online? true:false
  }

  // Send Message to socket server
  useEffect(() => {
    if (sendMessage!==null) {
      socket.current.emit("send-message", sendMessage);}
  }, [sendMessage]);


  // Get the message from socket server
  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      console.log(data)
      setReceivedMessage(data);
    }
    );
  }, []);


  return (
    <div className="Chat">
    {/* Left Side */}
    <div className="Left-side-chat">
   <LogoSearch/>
      <div className="Chat-container">
        <h2>Chats</h2>
        <div className="Chat-list">
            {
                chats.map((chat)=>(
                    <div onClick={()=>setCurrentChat(chat)}>
                        <Conversation
                      
                  data={chat}
                  currentUserId={currentUser._id}
                  online={checkOnlineStatus(chat)}
                  // key={chat._id}
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
      <Link to="/">
       <HomeOutlinedIcon/>
      </Link>
   
     < NotificationsOutlinedIcon/>
      <Link to="/chat">
       <ChatBubbleOutlineOutlinedIcon/>
      </Link>
    </div>

    <ChatBox chat={currentChat} currentUser={currentUser._id} setSendMessage={setSendMessage}  receivedMessage={receivedMessage} />
      </div>
      
    </div>
  </div>
  )
}

export default Chat