import React from 'react'
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from 'react-router-dom';
import "./navbar.scss";
function NavBar() {
  return (
    <div className="navbar">
    <div className="left">
      <Link to="/" style={{ textDecoration: "none" }}>
        <span>Socio</span>
      </Link>
      <HomeOutlinedIcon />
      <DarkModeOutlinedIcon/>
    
      <GridViewOutlinedIcon />
      <div className="search">
        <SearchOutlinedIcon />
        <input type="text" placeholder="Search..." />
      </div>
    </div>
    <div className="right">
      <PersonOutlinedIcon />
      <EmailOutlinedIcon />
      <NotificationsOutlinedIcon />
      <div className="user">
        <img
          src="https://images.pexels.com/photos/5638835/pexels-photo-5638835.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />
        <span>Mukthar</span>
      </div>
    </div>
  </div>
  )
}

export default NavBar