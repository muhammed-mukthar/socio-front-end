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

  const [commentOpen, setCommentOpen] = useState(false);
  const [user, setUser] = useState({})
  const [menuOpen, setMenuOpen] = useState(false)

  const deleteMutation = useMutation(
    (postId) => {
      return makeRequest.delete("/posts/" + postId);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );
  useEffect(() => {
    makeRequest.get(`users/${post.userId}`).then((res)=>{
      setUser(res.data)
    }).catch((err)=>{console.log(err);})

  }, [post])
  const handleDelete = () => {
    deleteMutation.mutate(post._id);
  };

  //TEMPORARY
  async function unfollow(){
    await makeRequest.put(`users/${post.userId}/unfollow`);
   await queryClient.invalidateQueries(["user"]);
  await  queryClient.invalidateQueries(["posts"]);
  }
  async  function follow(){
    await makeRequest.put(`users/${post.userId}/follow`);
    queryClient.invalidateQueries(["user"]);
    queryClient.invalidateQueries(["posts"]);
  }
 async function handlelike(id){
   await makeRequest.put(`/posts/${id}/like`)
   queryClient.invalidateQueries(["posts"]);
  }
  // let followed=false
  // if (Array.isArray(user.followers)) {
  //    followed = user.followers.includes(currentUser._id);
  //   console.log(followed,'hhjhjhjh');
  // }
  return (
    <div key={post._id} className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
          <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
            <img src={user.profilePic} alt="" /></Link>
            <div className="details">
              <span>
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{user.name}</span> </Link> 
                {/* <span className="follow">
                  {console.log(user.followers?.includes(currentUser._id),'user followers',user.followers,'curre')}
                { post.userId != currentUser._id ? user.followers?.includes(currentUser._id)?<button onClick={unfollow}>following</button>:<button onClick={()=>{follow()}}>follow</button>:""}
                  </span> */}
                  </span>
              <span className="date">{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
          { post.userId === currentUser._id&&<MoreHorizIcon onClick={() => setMenuOpen(!menuOpen)} />}
          {menuOpen && post.userId === currentUser._id && (
            <button onClick={handleDelete}>delete</button>
          )}
        </div>
        <div className="content">
          <p>{post.desc}</p>
          <img src={post.img} alt="" />
        </div>
        <div className="info">
          <div className="item"  onClick={() => handlelike(post._id)}>
            {post.likes.includes(currentUser._id) ? <FavoriteOutlinedIcon style={{color:"red"}} /> : <FavoriteBorderOutlinedIcon />}
           {post.likes.length}
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
           {post.comments.length}
          </div>
         
        </div>
        {commentOpen && <Comments  post={post} user={user}/>}
      </div>
    </div>
  );
};

export default Post;
