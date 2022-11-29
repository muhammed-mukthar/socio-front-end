import React, { useEffect, useState } from "react";
import "./notif.scss";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { Report } from "@mui/icons-material";
import moment from "moment";
import { makeRequest } from "../../axios/axios";
import { Result } from "postcss";
function Notif() {
  const { currentUser } = useContext(AuthContext);
  const [notification, setNotification] = useState([]);
  const [user, setUser] = useState({});
  useEffect(() => {
    makeRequest.get(`users/${currentUser._id}`).then((result) => {
      setNotification(result.data.notif);
      setUser(result.data);
    });
  }, []);
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
                    to={`/profile/${notif.user}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <img src={notif.profile} alt="" />
                  </Link>

                  <p>{notif.message}</p>
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
