import React, { useEffect, useState } from "react";
import InputEmoji from 'react-input-emoji'
import { makeRequest } from "../../axios/axios";
import "./chatbox.css";
import { format } from "timeago.js";
function ChatBox({ chat, currentUser,setSendMessage,receivedMessage }) {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);

  const [newMessage, setNewMessage] = useState("");

  const handleChange=(newMessage)=>{
    setNewMessage(newMessage)
  }

    // fetching data for header
    useEffect(() => {
      const userId = chat?.members?.find((id) => id !== currentUser);
      const getUserData = async () => {
        try {
          const { data } = await makeRequest.get(`users/${userId}`);
          setUserData(data);
          console.log(data, "data here");
        } catch (error) {
          console.log(error);
        }
      }
      if (chat !== null) getUserData();
    }, [chat, currentUser]);

    useEffect(() => {
      const fetchMessages = async () => {
        try {
          const { data } = await makeRequest(`/message/${chat._id}`);
          console.log(chat._id,'chat');
          setMessages(data);
          console.log(data,'chat data here');
        } catch (err) {
          console.log(err);
        }
      };
      if (chat !== null) fetchMessages();
    }, [chat]);

    

    useEffect(()=> {
      console.log("Message Arrived: ", receivedMessage)
      if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
        setMessages([...messages, receivedMessage]);
      }
    
    },[receivedMessage])


  



  const handleSend=async(e)=>{
    e.preventDefault();
    const message={
      senderId:currentUser,
      text:newMessage,
      conversationId:chat._id
    }
     const receiverId=chat.members.find((id)=>id !== currentUser);
     console.log(receiverId,'reciever I d');
    setSendMessage({...message,receiverId})
      //send to database
    try{
      const {data}=await makeRequest.post('/message',message)
      setMessages([...messages,data])
      setNewMessage("")

    }catch(err){
console.log(err);
    }
    
    //send message to socket
   

  }

  return (
    <>
      <div className="ChatBox-container">
        {chat ? (
          <>
            {/* chat-header */}
            <div className="chat-header">
              <div className="follower">
                <div>
                  <img
                    src={userData?.profilePic}
                    alt="Profile"
                    className="followerImage"
                    style={{ width: "50px", height: "50px" }}
                  />
                  <div className="name" style={{ fontSize: "0.9rem" }}>
                    <span>{userData?.name}</span>
                  </div>
                </div>
              </div>
              <hr
                style={{
                  width: "95%",
                  border: "0.1px solid #ececec",
                  marginTop: "20px",
                }}
              />
            </div>
            {/* chat-body */}
            <div className="chat-body">
              {messages.map((message) => (
                <>
                  <div ref={scroll}
                    className={
                      message.senderId === currentUser
                        ? "message own"
                        : "message"
                    }
                  >
                    <span>{message.text}</span>{" "}
                    <span>{format(message.createdAt)}</span>
                  </div>
                </>
              ))}
            </div>
            {/* chat-sender */}
            <div className="chat-sender">
              <div onClick={() => imageRef.current.click()}>+</div>
              <InputEmoji
                value={newMessage}
                onChange={handleChange}
              />
              <div className="send-button button" 
              onClick = {handleSend}
              >Send</div>
              <input
                type="file"
                name=""
                id=""
                style={{ display: "none" }}
                // ref={imageRef}
              />
            </div>{" "}
          </>
        ) : (
          <span className="chatbox-empty-message">
            Tap on a chat to start conversation...
          </span>
        )}
      </div>
    </>
  );
}

export default ChatBox;
