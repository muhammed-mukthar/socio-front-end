import Post from "../post/Post";
import "./posts.scss";
import {useQuery} from '@tanstack/react-query'
import { makeRequest } from "../../axios/axios";
const Posts = ({userId}) => {

  const { isLoading, error, data } = useQuery(["posts"], () =>
  makeRequest.get(userId ?  `posts/profile/${userId}` : "posts/timeline/all").then((res) => {
    console.log(res,'response');
    const sortedPosts = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

    return sortedPosts;

  })
);
console.log(data,'post data here');
  return <div className="posts">
   {error?"no posts yet":
      (isLoading ? "loading...":(data.length>1?data?.filter(post=>{return post!=false}).map(post=>(
        <Post post={post} key={post._id}/>)
      ):<div style={{height:"100vh"}}>No posts yet</div>  ))
    }
 
  </div>;
};

export default Posts;
