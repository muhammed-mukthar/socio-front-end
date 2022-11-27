import React from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import Home from "../../img/home.png";
import Noti from "../../img/noti.png";
import Comment from "../../img/comment.png";
import { UilSetting } from "@iconscout/react-unicons";
import { Link } from "react-router-dom";

const NavIcons = () => {
  return (
    <div className="navIcons" style={{display:"flex",justifyContent:"space-between"}}>
      {/* <Link to="/">
        <img src={Home} alt="" />
      </Link>
      <UilSetting />
      <img src={Noti} alt="" />
      <Link to="/chat">
        <img src={Comment} alt="" />
      </Link> */}

       <Link to="/">
            <HomeOutlinedIcon  style={{color:"black"}} />
          </Link>

          <NotificationsOutlinedIcon style={{color:"black"}}/>
          <Link to="/chat">
            <ChatBubbleOutlineOutlinedIcon  style={{color:"black"}} />
          </Link>
    </div>
  );
};

export default NavIcons;
