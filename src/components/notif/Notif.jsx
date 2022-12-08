import React, { useEffect, useState } from "react";
import "./notif.scss";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { Report } from "@mui/icons-material";
import moment from "moment";
import { makeRequest } from "../../axios/axios";
import { Result } from "postcss";
import { useQueryClient } from "@tanstack/react-query";
function Notif() {
  const { currentUser } = useContext(AuthContext);
  const [notification, setNotification] = useState([]);
  const [user, setUser] = useState({});
  useEffect(() => {
    
  }, []);

  const queryClient = useQueryClient()

  const getNotifications = () => {
    makeRequest.get(`notif/${currentUser._id}`).then((result) => {
      setNotification(result.data);
      setUser(result.data);
    });
  }

  useEffect(() => {
      getNotifications()
      const updateStatus = () => {
          try {
              makeRequest.put(`/notif/${currentUser._id}`, { isVisited: true })
                  .then((response) => {
                      console.log(response);
                      queryClient.invalidateQueries({ queryKey: ['notifications'] })
                  }).catch((error) => console.log(error))
          } catch (error) {
              console.log(error);
          }
      }
      updateStatus()

  }, [])

  console.log(notification, "notification here body");
  return (
    <div className="notif">
      <div className="container">
        <div className="item">
          <span>Latest Activities</span>
          {notification ? (
            notification.map((notif) => (
              <div className="user">
                <div className="userInfo">
                  <Link
                    to={`/profile/${notif.sender}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <img src={notif.profile} alt="" />
                  </Link>

                  <p>{notif.message}</p>
                  {notif.postPic?
                    <img src={notif.postPic} alt="" />
                  :""}
                </div>
                <span> {moment(notif.createdAt).fromNow()}</span>
              </div>
            ))
          ) : (
            <div className="user">
              <div className="userInfo">
                <img src={user.profilePic} alt="" />
                <p>welcome to socio</p>
              </div>
              <span> recently</span>
            </div>
          )}
         
         
        </div>
      </div>
    </div>
  );
}

export default Notif;
