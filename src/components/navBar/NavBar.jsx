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
import Swal from "sweetalert2";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { SocketContext } from "../../context/socketContext";

import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import { makeRequest } from "../../axios/axios";

const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const socket = useContext(SocketContext);
  
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);
  const [count, setCount] = useState(0);
  const [userData, setUserData] = useState("");
  const [searchWord, setSearchWord] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery(["notifications"], () => {
    return makeRequest
      .get(`/notif/${currentUser._id}`)
      .then(({ data }) => {
        setNotifications(data);
        
        return data;
        
      })
      .catch((error) => console.log(error));
      
  });
  useEffect(() => {
    try {
      console.log("effect called");
      socket.on("getNotification", (data) => {
        console.log("effect called  sdfgdfg");

        queryClient.invalidateQueries(["notifications"]);
      });
   
    } catch (error) {
      console.log(error);
    }
  }, [socket]);

  useEffect(() => {
    notifications &&
      setCount(notifications.filter((e) => e.isVisited === false).length);
  }, [notifications])
 
  const handleChange = async (e) => {
    const searchWord = e.target.value;
    setSearchWord(searchWord);
    makeRequest
      .post(`/users/filteruser`, { search: searchWord })
      .then(async ({ data }) => {
        // .catch((error) => console.log(error))
        // .then(async()=>{
        console.log(data);
        data && setFilteredData(data);
        console.log(filteredData, "filter data");
      });
  };
  const handleLogout = () => {
    Swal.fire({
      title: "Do you want to logout?",

      showCancelButton: true,
      confirmButtonText: "Yes",

      customClass: {
        actions: "my-actions",
        cancelButton: "order-1 right-gap",
        confirmButton: "order-2",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("user");
        localStorage.removeItem("authentication");
        setCurrentUser("");
        navigate("/login");
      } else if (result.isDenied) {
      }
    });
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
          style={{
            textDecoration: "none",
            cursor: "pointer",
            color: "inherit",
          }}
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
          {count > 0 && (
            <span className="-ml-2 absolute px-1.5 py-0.5 bg-red-600 text-white rounded-full text-xs">
              {" "}
              {count}
            </span>
          )}
          <span className="md:hidden pl-3 text-white"></span>
        </Link>
        <SearchOutlinedIcon />
        <input
          type="text"
          id="search-navbar"
          value={searchWord}
          onChange={handleChange}
          placeholder="Find people..."
        />
        {searchWord && (
          <div className="absolute top-[-11rem] bg-gray-300 md:w-4/12  rounded-2xl mt-56">
            <ul className="relative">
              {filteredData.length > 0 ? (
                filteredData.map((user) => (
                  <Link
                    to={`/profile/${user._id}`}
                    onClick={() => setSearchWord("")}
                    key={user._id}
                    className="flex flex-wrap gap-2 items-center p-3 hover:bg-gray-200 border-b border-gray-200"
                  >
                    <img
                      src={user?.profilePic}
                      alt={user?.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <p>{user?.name}</p>
                  </Link>
                ))
              ) : (
                <li className="p-3 hover:bg-gray-300 border-b rounded-b-lg border-gray-200">
                  No results found
                </li>
              )}
            </ul>
          </div>
        )}
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
