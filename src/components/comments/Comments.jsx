import { useContext, useState } from "react";
import "./comments.scss";
import { AuthContext } from "../../context/authContext";
import { makeRequest } from "../../axios/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
const Comments = ({ post ,user}) => {
  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();
  //Temporary
  const [comment,Setcomment]=useState('')
  const comments =post.comments
const newComment={
  comments:comment,
  profile:currentUser.profilePic,
  name:currentUser.name
}

 async function postComment(postid){
  await  makeRequest.put(`/posts/${postid}/comment`,newComment)
  Setcomment('')
    queryClient.invalidateQueries(["posts"]);
  }

  return (
    <div className="comments">
      <div className="write">
     
        <img src={currentUser.profilePic} alt="" />
        <input type="text" value={comment} onChange={(e)=>{Setcomment(e.target.value)}} placeholder="write a comment" />
        <button  onClick={() => postComment(post._id)} >Send</button>
       
      </div>
      {comments.map((comment) => (
        <div key={comment._id} className="comment">
          <img src={comment.profile} alt="" />
          <div className="info">
            <span>{comment.name}</span>
            <p>{comment.comment}</p>
          </div>
          <span className="date">1 hour ago</span>
        </div>
      ))}
    </div>
  );
};

export default Comments;
