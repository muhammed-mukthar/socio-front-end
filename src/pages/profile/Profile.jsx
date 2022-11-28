import "./profile.scss";
// import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
// import LinkedInIcon from "@mui/icons-material/LinkedIn";
// import InstagramIcon from "@mui/icons-material/Instagram";
// import PinterestIcon from "@mui/icons-material/Pinterest";
// import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios/axios";
import { useLocation, useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import Update from "../../components/update/Update";
import { useState } from "react";

const Profile = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const { currentUser,refetchuser } = useContext(AuthContext);
  
  const queryClient = useQueryClient();
 
  const { id } = useParams()
  const userId = id;
  useEffect(()=>{
    queryClient.invalidateQueries(["user"]);
  
  },[userId])
   const { isLoading, error, data } = useQuery(["user"], () =>
    makeRequest.get("users/" + userId).then((res) => {
      return res.data;
    })
  )

  console.log(userId,'userIdhere');
 

 

 
async function unfollow(){
  await makeRequest.put(`users/${userId}/unfollow`);
refetchuser(currentUser._id)
  queryClient.invalidateQueries(["user"]);
}
async  function follow(){
  await makeRequest.put(`users/${userId}/follow`);
  refetchuser(currentUser._id)
  console.log('i am here');
  await makeRequest.get(`/conversation/find/${currentUser._id}/${userId}`)
  .then(async (response) => {
    console.log('i am here1');
    if (response.data.message) {
      console.log('i am here2');
      await makeRequest
        .post(`/conversation/`, {
          senderId: currentUser._id,
          receiverId: userId,
        })
        .then(async () => {
          console.log('i am here3');
        console.log('conversation created');
        });
      }})
  queryClient.invalidateQueries(["user"]);
}
  
console.log(data,'data here');
  return (
    <div className="profile">
      {isLoading ? (
        "loading"
      ) : (
        <>
          <div className="images">
            <img src={data?.coverPic} alt="" className="cover" />
            <img src={data?.profilePic} alt="" className="profilePic" />
          </div>
          <div className="profileContainer">
            <div className="uInfo">
              <div className="left">
              <div className="info">
                  <div className="item">
                    <PlaceIcon />
                    <span>{data?.city}</span>
                  </div>
                  <div className="item">
                    <LanguageIcon />
                    <span>{data?.email}</span>
                  </div>
                </div>
                
              
              </div>
              <div className="center">
         
                <span>{data?.name}</span>
                {userId === currentUser._id ?<button onClick={() => setOpenUpdate(true)}>update</button>
                :
                <span >
                        
                  {data?.followers.includes(currentUser._id)?<button onClick={unfollow}>following</button>:<button onClick={()=>{follow()}}>follow</button>}
                  </span>
                }
              
              </div>
              <div className="right">
                <EmailOutlinedIcon />
                <MoreVertIcon />
              </div>
            </div>
            <Posts userId={userId} key={userId}/>
          </div>
        </>
      )}
      {openUpdate && (console.log(openUpdate,"opened"),<Update setOpenUpdate={setOpenUpdate} user={data} />)}
    </div>
  );
};

export default Profile;
