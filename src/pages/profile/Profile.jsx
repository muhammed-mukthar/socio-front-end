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
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import Update from "../../components/update/Update";
import { useState } from "react";

const Profile = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const userId = useLocation().pathname.split("/")[2]
  const { isLoading, error, data } = useQuery(["user"], () =>
    makeRequest.get("users/" + userId).then((res) => {
  
      return res.data;
    })
  )

  const queryClient = useQueryClient();

 
async function unfollow(){
  await makeRequest.put(`users/${userId}/unfollow`);
  queryClient.invalidateQueries(["user"]);
}
async  function follow(){
  await makeRequest.put(`users/${userId}/follow`);
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
            <img src={data.coverPic} alt="" className="cover" />
            <img src={data.profilePic} alt="" className="profilePic" />
          </div>
          <div className="profileContainer">
            <div className="uInfo">
              <div className="left">
              <div className="info">
                  <div className="item">
                    <PlaceIcon />
                    <span>{data.city}</span>
                  </div>
                  <div className="item">
                    <LanguageIcon />
                    <span>{data.email}</span>
                  </div>
                </div>
                
              
              </div>
              <div className="center">
         
                <span>{data.name}</span>
                {userId == currentUser.id ?<button onClick={() => setOpenUpdate(true)}>update</button>
                :
                <span >
                         {console.log(data.followers.includes(currentUser.id),'what the fuck happened',currentUser.id,'dadsa',data.followers)}
                  {data.followers.includes(currentUser.id)?<button onClick={unfollow}>following</button>:<button onClick={follow}>follow</button>}
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
