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
    const { currentUser } = useContext(AuthContext);
    console.log(currentUser,'current');
    const [chats, setChats] = useState([]);
    const [sendMessage, setSendMessage] = useState(null);
    const [currentChat,setCurrentChat]=useState(null)
    const [receivedMessage, setReceivedMessage] = useState(null);
    const [onlineUsers,setOnlineUsers]=useState([])
    const socket=useRef()

    



    



    useEffect(()=>{
      socket.current=io('http://localhost:8800')
      socket.current.emit('new-user-add',currentUser.id)
      socket.current.on('get-users',(users)=>{
        setOnlineUsers(users)
     
      })
    },[currentUser])
    

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

      //send to socket server
    
  useEffect(() => {
    if (sendMessage!==null) {
      socket.current.emit("send-message", sendMessage);}
  }, [sendMessage]);

    


    //recieve 
    useEffect(() => {
      socket.current.on("recieve-message", (data) => {
        console.log(data)
        setReceivedMessage(data);
      }
  
      );
    }, []);
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

    <ChatBox chat={currentChat} currentUser={currentUser.id} setSendMessage={setSendMessage}  receivedMessage={receivedMessage} />
      </div>
      
    </div>
  </div>
  )
}

export default Chat