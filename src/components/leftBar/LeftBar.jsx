import React from 'react'
import Diversity3Icon from '@mui/icons-material/Diversity3';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import './leftbar.scss'
function LeftBar() {
  return (
   
<div className="leftBar">
      <div className="container">
        <div className="menu">
          <div className="user">
            <img
              src="https://images.pexels.com/photos/5638835/pexels-photo-5638835.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
            />
            <span>Mukthar</span>
          </div>
          <div className="item">
            <img src="https://images.pexels.com/photos/5638835/pexels-photo-5638835.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
            <span>Friends</span>
          </div>
          <div className="item">
            <img src="https://images.pexels.com/photos/5638835/pexels-photo-5638835.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
            <span>Groups</span>
          </div>
          <div className="item">
            <img src="https://images.pexels.com/photos/5638835/pexels-photo-5638835.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
            <span>Marketplace</span>
          </div>
          <div className="item">
            <img src="https://images.pexels.com/photos/5638835/pexels-photo-5638835.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
            <span>Watch</span>
          </div>
          <div className="item">
            <img src="https://images.pexels.com/photos/5638835/pexels-photo-5638835.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
            <span>Memories</span>
          </div>
        </div>
        <hr />
       
      
      </div>
    </div>

  )
}

export default LeftBar