import { useContext, useState } from "react";
import "./comments.scss";
import { AuthContext } from "../../context/authContext";
import { makeRequest } from "../../axios/axios";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Swal from "sweetalert2";
import moment from "moment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
const Comments = ({ post, user }) => {
  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();
  //Temporary
  const [comment, Setcomment] = useState("");
  const comments = post.comments;
  const newComment = {
    comments: comment,
    profile: currentUser.profilePic,
    name: currentUser.name,
  };

  async function DeleteComment(postid, commentId) {
    Swal.fire({
      title: "Do you want to Delete comment?",

      showCancelButton: true,
      confirmButtonText: "Yes",

      customClass: {
        actions: "my-actions",
        cancelButton: "order-1 right-gap",
        confirmButton: "order-2",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        await makeRequest.put(`/posts/${postid}/uncomment`, {
          commentId: commentId,
        });
        queryClient.invalidateQueries(["posts"]);
      } else if (result.isDenied) {
      }
    });
  }

  async function postComment(postid) {
    if(newComment.comments.trim().length >2 && newComment.comments!=null){

    
    await makeRequest.put(`/posts/${postid}/comment`, newComment);
    Setcomment("");
    queryClient.invalidateQueries(["posts"]);
  }
}

  return (
    <div className="comments">
      <div className="write">
        <img src={currentUser.profilePic} alt="" />
        <input
          type="text"
          value={comment}
          onChange={(e) => {
            Setcomment(e.target.value);
          }}
          placeholder="write a comment"
        />
        <button onClick={() => postComment(post._id)}>Send</button>
      </div>
      {comments.map((comment) => (
        <div key={comment._id} className="comment">
          <img src={comment.profile} alt="" />
          <div className="info">
            <span>{comment.name}</span>
            <p>{comment.comment}</p>
            
          </div>
          <span className="date">{moment(comment.createdAt).fromNow()}</span>
          {currentUser._id == comment.user ? (
            <span
              className="date"
              onClick={() => {
                DeleteComment(post._id, comment._id);
              }}
            >
              <DeleteOutlineOutlinedIcon />
            </span>
          ) : (
            ""
          )}
        </div>
      ))}
    </div>
  );
};

export default Comments;
