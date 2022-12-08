import { useEffect, useState } from "react";
import "./rightBar.scss";
import { useContext} from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../context/authContext";
import { makeRequest } from "../../axios/axios";
import moment from "moment";
import { Link } from "react-router-dom";
const RightBar = () => {
  const queryClient = useQueryClient();

  const {currentUser,refetchuser} = useContext(AuthContext)
  const [suggesteduser, setSuggestedUser] = useState([])
  const [status, setStatus] = useState(false)
  const [notification, setNotification] = useState([]);
  const [user, setUser] = useState({});
  useEffect(()=>{
    makeRequest.get(`users/suggestedusers`).then((res)=>{
      console.log(res.data,'data fhhsjkdahfsdhjkskfdhhjfsdl');
      setSuggestedUser(res.data)
    }).catch((err)=>{console.log(err);}) 
  },[status,currentUser])

  useEffect(() => {
    makeRequest.get(`notif/${currentUser._id}`).then((result) => {
      setNotification(result.data)
      setUser(result.data);
    });
  }, []);
console.log(suggesteduser,'suggested user');
  async  function handlefollow(id){
    await makeRequest.put(`users/${id}/follow`);
    refetchuser(currentUser._id)
    setStatus(!status)
    await makeRequest.get(`/conversation/find/${currentUser._id}/${id}`)
    .then(async (response) => {
      console.log('i am here1');
      if (response.data.message) {
        console.log('i am here2');
        await makeRequest
          .post(`/conversation/`, {
            senderId: currentUser._id,
            receiverId: id,
          })
          .then(async () => {
            console.log('i am here3');
          console.log('conversation created');
          });
        }})
    queryClient.invalidateQueries(["posts"]);
  }

  
  return (
    <div className="rightBar">
      <div className="container">
        <div className="item follow">
          <span>Suggestions For You</span>
          {suggesteduser.filter(sugestUser=>{return sugestUser._id!=currentUser._id}).map( (sugestUser)=>{return  <div key={sugestUser._id} className="user">
          <Link
                to={`/profile/${sugestUser._id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
            <div className="userInfo">
              <img
                src={sugestUser.profilePic}
                alt=""
              />
              <span>{sugestUser.name}</span>
            </div>
            </Link>
           <span><div className="buttons">
            
              <button onClick={()=>{handlefollow(sugestUser._id)}}>follow</button>
            
            </div></span>
          </div>})}
       
        
          
      
        </div>
        <div className="item">
          <span>Latest Activities</span>
          {notification ? (
            notification.map((notif,index) => (
              <div key={index} className="user">
                <div className="userInfo">
                  <Link
                    to={`/profile/${notif.sender}`}
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
                <img src={user.profilePic?user.profilePic:"https://vectorified.com/images/default-profile-picture-icon-3.png"} alt="" />
                <p>welcome to socio</p>
              </div>
              <span> recently</span>
            </div>
          )}
      
        </div>
      </div>
    </div>
  );
};

export default RightBar;
