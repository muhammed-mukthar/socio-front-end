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
import Swal from "sweetalert2";

const Profile = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const { currentUser, refetchuser, setCurrentUser } = useContext(AuthContext);

  const queryClient = useQueryClient();

  const { id } = useParams();
  const userId = id;
  useEffect(() => {
    queryClient.invalidateQueries(["user"]);
  }, [userId]);
  const { isLoading, error, data } = useQuery(["user"], () =>
    makeRequest.get("users/" + userId).then((res) => {
      return res.data;
    })
  );

  async function unfollow() {
    try {
      await makeRequest.put(`users/${userId}/unfollow`);
      refetchuser(currentUser._id);
      queryClient.invalidateQueries(["user"]);
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: "Somethin happened please re-login",
        icon: "error",
        confirmButtonText: "ok",
      }).then(() => {
        localStorage.removeItem("user");
        localStorage.removeItem("authentication");

        setCurrentUser(false);
        navigate("/login");
      });
    }
  }
  async function follow() {
    try {
      await makeRequest.put(`users/${userId}/follow`);
      refetchuser(currentUser._id);

      await makeRequest
        .get(`/conversation/find/${currentUser._id}/${userId}`)
        .then(async (response) => {
          if (response.data.message) {
            await makeRequest
              .post(`/conversation/`, {
                senderId: currentUser._id,
                receiverId: userId,
              })
              .then(async () => {
                console.log("user conversation created");
              });
          }
        });
      queryClient.invalidateQueries(["user"]);
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: "Somethin happened please re-login",
        icon: "error",
        confirmButtonText: "ok",
      }).then(() => {
        localStorage.removeItem("user");
        localStorage.removeItem("authentication");

        setCurrentUser(false);
        navigate("/login");
      });
    }
  }

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
                {userId === currentUser._id ? (
                  <button onClick={() => setOpenUpdate(true)}>update</button>
                ) : (
                  <span>
                    {data?.followers.includes(currentUser._id) ? (
                      <button onClick={unfollow}>following</button>
                    ) : (
                      <button
                        onClick={() => {
                          follow();
                        }}
                      >
                        follow
                      </button>
                    )}
                  </span>
                )}
              </div>
              <div className="right">
                <div className="item">
                  <span>followers:{data.followers.length}</span>
                </div>
                <div className="item">
                  <span>following:{data.following.length}</span>
                </div>
              </div>
            </div>
            {userId === currentUser._id ||
            data?.followers.includes(currentUser._id) ? (
              <Posts userId={userId} key={userId} />
            ) : (
              "follow user to view the post"
            )}
          </div>
        </>
      )}
      {openUpdate &&
        (console.log(openUpdate, "opened"),
        (<Update setOpenUpdate={setOpenUpdate} user={data} />))}
    </div>
  );
};

export default Profile;
