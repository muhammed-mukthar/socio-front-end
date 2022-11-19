import "./leftBar.scss";

import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import NewspaperOutlinedIcon from '@mui/icons-material/NewspaperOutlined';
import LibraryMusicOutlinedIcon from '@mui/icons-material/LibraryMusicOutlined';
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

import { AuthContext } from "../../context/authContext";
import { useContext } from "react";

const LeftBar = () => {
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
    <div className="leftBar">
      <div className="container">
        <div className="menu">
        
            {/* <img
              src={currentUser.profilePic}
              alt=""
            />

            <span>{currentUser.name}</span> */}
             <div className='leftTopBar '>
      <div className='hallo'>

            <div className="user">
            <img src={currentUser.profilePic} alt="" /> 
            <h1>{currentUser.name}</h1>
        </div>
        <div className="about">
        <div className='followers' >
            <span>Followers</span>
            <h1>{currentUser.followers.length}</h1>
          </div>
          <div className='followers' >
            <span>Posts</span>
            <h1>100</h1>
          </div>
          <div className='followings'>
            <span>Followings</span>
            <h1>{currentUser.following.length}</h1>
          </div>
        
          </div>
          </div>
          </div>
          <div className="items">
          <Link  to={`/profile/${currentUser._id}`} style={{textDecoration:"none",color: "inherit"}} >
                <PermIdentityOutlinedIcon className='icon'/>
                <span>Profile</span>
                </Link>
            </div>
            <div className='items'>
            <Link  to={`/chat`} style={{textDecoration:"none",color: "inherit"}} >
                <ChatBubbleOutlineOutlinedIcon className='icon'/>
                <span>Chats</span>
                </Link>
            </div>
            <div className='items'>
            <Link to='/news' style={{textDecoration:"none",color: "inherit"}} >
                <NewspaperOutlinedIcon className='icon'/>
              
                <span>News</span>
               </Link>
            </div>
           
         
            <div className='items'>
            <Link to='/notification' style={{textDecoration:"none",color: "inherit"}} >
                <NotificationsOutlinedIcon className='icon'/>
             
                <span>Notification</span>
                </Link>
            </div>
          
            <div className="item" onClick={()=>{handleLogout()}}>
                <LogoutOutlinedIcon className='icon'/>
                <span>Logout</span>
            </div>
         
        </div>
        <hr />
      
       
      </div>
    </div>
  );
};

export default LeftBar;
