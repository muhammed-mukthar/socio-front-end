import "./leftBar.scss";
import Friends from "../../assets/1.png";
import Groups from "../../assets/2.png";
import Market from "../../assets/3.png";
import Watch from "../../assets/4.png";
import Memories from "../../assets/5.png";
import Events from "../../assets/6.png";
import Gaming from "../../assets/7.png";
import Gallery from "../../assets/8.png";
import Videos from "../../assets/9.png";
import Messages from "../../assets/10.png";
import Tutorials from "../../assets/11.png";
import Courses from "../../assets/12.png";
import Fund from "../../assets/13.png";
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import NewspaperOutlinedIcon from '@mui/icons-material/NewspaperOutlined';
import LibraryMusicOutlinedIcon from '@mui/icons-material/LibraryMusicOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'

import { AuthContext } from "../../context/authContext";
import { useContext } from "react";

const LeftBar = () => {
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
    
        window.location.replace('/login');
      } else if (result.isDenied) {
        
      }
    })
    
  
  };

  const { currentUser } = useContext(AuthContext);
console.log(currentUser,'currentUser');
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
            <h1>100</h1>
          </div>
          <div className='followers' >
            <span>Posts</span>
            <h1>100</h1>
          </div>
          <div className='followings'>
            <span>Followings</span>
            <h1>100</h1>
          </div>
        
          </div>
          </div>
          </div>
          <div className="items">
                <PermIdentityOutlinedIcon className='icon'/>
                <span>Profile</span>
            </div>
            <div className='items'>
                <ChatBubbleOutlineOutlinedIcon className='icon'/>
                <span>Chats</span>
            </div>
            <div className='items'>
             
                <NewspaperOutlinedIcon className='icon'/>
              
                <span>News</span>
               
            </div>
            <div className='items'>
             
                <MovieCreationIcon className='icon'/>
           
                <span>Movies</span>
           
            </div>
            <div className='items'>
           
                <LibraryMusicOutlinedIcon className='icon'/>
             
                <span>Music</span>
             
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
