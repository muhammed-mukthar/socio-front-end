import React, { useEffect, useState } from "react";
import "./notif.scss";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { Report } from "@mui/icons-material";
import moment from "moment";
import { makeRequest } from "../../axios/axios";
import { Result } from "postcss";
function FollowingList() {
  const { currentUser } = useContext(AuthContext);
  const [following, setFollowing] = useState([]);
  const [user, setUser] = useState({});
  useEffect(() => {
   
    let allfollowingUsers = [];
    // console.log(currentUser, "current user");
    makeRequest.get(`users/${currentUser._id}`).then((result) => {
      result.data.following.map((e) => {
        // console.log(e, "jejejj");
        makeRequest.get(`users/${e}`).then((result) => {
          // allfollowingUsers.push(result.data);
          setFollowing(prev => {
            return [...prev,result.data]
          });
        });
      });
    

    });
    console.log(1);

  }, []);
console.log(following,'following');
  return (
    <div className="followingList">
      <div className="container">
        <div className="item">
          <span>Latest Activities</span>
          {following.map((f) => {
      
            return (
              <div className="user">
                {/* {console.log(following, "following list here")} */}

                {/* {console.log(f, "here is some data")} */}
                <div className="userInfo">
                  <Link
                    to={`/profile/${f._id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <img src={f.profilePic} alt="" />
                  </Link>
                  <p>{f.name}</p>
                </div>
                {/* <span> {moment(notif.createdAt).fromNow()}</span> */}
              </div>
            );
          })
          }

          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <p>
                <span>Jane Doe</span> changed their cover picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FollowingList;
