import Post from "../post/Post";
import "./posts.scss";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios/axios";
import Swal from 'sweetalert2'
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

const Posts = ({ userId }) => {
  console.log(userId, "user id in post");
  const { currentUser,setCurrentUser } = useContext(AuthContext);
  const { isLoading, error, data } = useQuery(["posts"], () =>
    makeRequest
      .get(userId ? `posts/profile/${userId}` : "posts/timeline/all")
      .then((res) => {
        console.log(res, "response");
        if (res.data.length > 1) {
          const sortedPosts = res.data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          return sortedPosts;
        } else {
          console.log("i am right here");
          return res.data;
        }

        console.log("i am inside");
      }).catch((err)=>{
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
      })
  );
  console.log(data, "post data here");
  return (
    <div className="posts">
      {error ? (
        "no posts yet"
      ) : isLoading ? (
        "loading..."
      ) : data.length >= 1 ? (
        data
          ?.filter((post) => {
            return post != false;
          })
          .map((post) => <Post post={post} key={post._id} />)
      ) : (
        <div style={{ height: "100vh" }}>No posts yet</div>
      )}
    </div>
  );
};

export default Posts;
