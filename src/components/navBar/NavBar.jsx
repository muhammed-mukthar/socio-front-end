import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import Swal from 'sweetalert2'

import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";

const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser,setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate()
  const handleLogout = () => {
    Swal.fire({
      title: 'Do you want to logout?',
     
      showCancelButton: true,
      confirmButtonText: 'Yes',
    
      customClass: {
        actions: 'my-actions',
        cancelButton: 'order-1 right-gap',
        confirmButton: 'order-2',
       
      }
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("user");
        localStorage.removeItem("authentication");
        setCurrentUser('')
        navigate('/login');
      } else if (result.isDenied) {
        
      }
    })
    
  
  };

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>Socio</span>
        </Link>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <HomeOutlinedIcon />
        </Link>

        {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} />
        ) : (
          <DarkModeOutlinedIcon onClick={toggle} />
        )}
        <div
         style={{ textDecoration: "none",cursor:"pointer", color: "inherit" }}
          className="item"
          onClick={() => {
            handleLogout();
          }}
        >
          <LogoutOutlinedIcon className="icon" />
        </div>
        <div className="item">
          <Link
            to={`/chat`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ChatBubbleOutlineOutlinedIcon className="icon" />
          </Link>
        </div>
      </div>
      <div className="right">
        {/* <PersonOutlinedIcon /> */}
        {/* <EmailOutlinedIcon /> */}
        <Link
          to="/notification"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <NotificationsOutlinedIcon />
        </Link>

        <Link
          to={`/profile/${currentUser._id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div className="user">
            <img src={currentUser.profilePic} alt="" />
            <span>{currentUser.name}</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
