import React, { useEffect, useRef, useState } from "react";
import LogoSearch from "../../components/LogoSearch/LogoSearch";
import "./chat.css";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import { makeRequest } from "../../axios/axios";
import Conversation from "../../components/Conversation/Conversation";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { Link } from "react-router-dom";
import io from "socket.io-client";
import ChatBox from "../../components/ChatBox/ChatBox";
import NavIcons from "../../components/NavBarIcons/NavBarIcons";
import Swal from "sweetalert2";
function Chat() {
  const socket = useRef();
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [err, setErr] = useState("");
  const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  // Get the chat in chat section

  useEffect(() => {
    const getChats = async () => {
      try {
        const conversation = await makeRequest.get(
          `/conversation/${currentUser._id}`
        );
        setChats(conversation.data);
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Somethin happened please re-login",
          icon: "error",
          confirmButtonText: "ok",
        }).then(() => {
          localStorage.removeItem("user");
          localStorage.removeItem("authentication");

          setCurrentUser(false);
          navigate("/login");
        });
      }
    };
    getChats();
  }, [currentUser._id]);

  // Connect to Socket.io
  useEffect(() => {
    socket.current = io("ws://localhost:8800");
    socket.current.emit("new-user-add", currentUser._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(
        users
        // currentUser.following.filter((f) => {users.some((u) => u.userId === f)})
      );
    });
  }, [currentUser]);
  const checkOnlineStatus = (chat) => {
    const chatMembers = chat.members.find((member) => {
      return member !== currentUser._id ? member : "";
    });
    const online = onlineUsers.find((user) => {
      return user.userId == chatMembers;
    });
    return online ? true : false;
  };

  // Send Message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  // Get the message from socket server
  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      setReceivedMessage(data);
    });
  }, []);

  return (
    <>
      <div className="blur" style={{ top: "-18%", right: "0" }}></div>
      <div className="blur" style={{ top: "36%", left: "-8rem" }}></div>
      <div className="Chat">
        {/* Left Side */}
        <div className="Left-side-chat">
          <div className="searchIcon">
            {" "}
            <LogoSearch />
          </div>

          <div
            className="Chat-container"
            style={{
              height: "80vh",

              overflowY: "auto",
              backgroundColor: "#fff",
            }}
          >
            <h2 className="title">Chats</h2>

            <div className="Chat-list">
              {chats.map((chat) => (
                <div onClick={() => setCurrentChat(chat)}>
                  <Conversation
                    data={chat}
                    currentUserId={currentUser._id}
                    online={checkOnlineStatus(chat)}
                    // key={chat._id}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side */}

        <div className="Right-side-chat">
          <div style={{ width: "20rem", alignSelf: "flex-end" }}>
            <NavIcons />
          </div>

          <ChatBox
            chat={currentChat}
            currentUser={currentUser._id}
            setSendMessage={setSendMessage}
            receivedMessage={receivedMessage}
          />
        </div>
      </div>
      {/* // </div> */}
    </>
  );
}

export default Chat;
