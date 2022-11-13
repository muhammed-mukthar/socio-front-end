import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useContext, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../context/authContext";
import moment from "moment";
import { makeRequest } from "../../axios/axios";
import { ModeComment } from "@mui/icons-material";

const Post = ({ post }) => {
  const {currentUser} = useContext(AuthContext)

  const queryClient = useQueryClient();
  console.log(post,'posts here');
  const [commentOpen, setCommentOpen] = useState(false);
  const [user, setUser] = useState({})
//   const { isLoading, error, data } = useQuery(["posts"], () =>
//   makeRequest.get(userId ?  `posts/profile/${userId}` : "posts/timeline/all").then((res) => {
//     console.log(res,'response');
//     return res.data;
//   })
// );
  useEffect(() => {
    makeRequest.get(`users/${post.userId}`).then((res)=>{
      setUser(res.data)
    }).catch((err)=>{console.log(err);})

  }, [post])
  console.log(user);
  //TEMPORARY
  
 async function handlelike(id){
   await makeRequest.put(`/posts/${id}/like`)
   queryClient.invalidateQueries(["posts"]);
  }

  return (
    <div key={post._id} className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            
            <img src={user.profilePic} alt="" />
            <div className="details">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{user.name}</span>
              </Link>
              <span className="date">{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
          <MoreHorizIcon />
        </div>
        <div className="content">
          <p>{post.desc}</p>
          <img src={post.img} alt="" />
        </div>
        <div className="info">
          <div className="item"  onClick={() => handlelike(post._id)}>
            {post.likes.includes(currentUser.id) ? <FavoriteOutlinedIcon style={{color:"red"}} /> : <FavoriteBorderOutlinedIcon />}
           {post.likes.length}
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            12 Comments
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {commentOpen && <Comments  />}
      </div>
    </div>
  );
};

export default Post;
