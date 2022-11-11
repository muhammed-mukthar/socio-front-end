import Post from "../post/Post";
import "./posts.scss";
import {useQuery} from '@tanstack/react-query'
import { makeRequest } from "../../axios/axios";
const Posts = ({userId}) => {

  const { isLoading, error, data } = useQuery(["posts"], () =>
  makeRequest.get(userId ?  `posts/profile/${userId}` : "posts/timeline/all").then((res) => {
    console.log(res,'response');
    return res.data;
  })
);

  return <div className="posts">
   {error?"no posts yet":
      (isLoading ? "loading...":data.filter(post=>{return post!=false}).map(post=>(
        <Post post={post} key={post._id}/>
      )))
    }
 
  </div>;
};

export default Posts;
