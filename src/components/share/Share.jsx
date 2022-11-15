import "./share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { makeRequest } from "../../axios/axios";
import axios from 'axios'
const Share = () => {
  const queryClient = useQueryClient();
  const [file, setFile] = useState(null)


  const [desc, setDesc] = useState("")
  const {currentUser} = useContext(AuthContext)

  
  // const queryClient = useQueryClient();
  // const mutation = useMutation(
  //   (newPost) => {
  //     return makeRequest.post("posts", newPost);
  //   },
  //   {
  //     onSuccess: () => {
  //       // Invalidate and refetch
  //       queryClient.invalidateQueries(["posts"]);
  //     },
  //   }
  // );
  // const handleClick = (e)=>{
  //  e.preventDefault()
  //  mutation.mutate({desc})
  // }

  const handleClick=async(e)=>{
    e.preventDefault()
    var formData = new FormData();
// var imagefile = document.querySelector('#file');
formData.append("image", file);
 axios.post('http://localhost:5000/api/uploads/images', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      "authorization": "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      "x-refresh":JSON.parse(localStorage.getItem("user")).refreshToken
    }
}).then(async(result)=>{
  console.log(result.data,'file upload is here guys');
  console.log(result.data.location,result.data.key,'the resultn are here sgfjgfjj');
  const location=result.data.location
  const keydata=result.data.key
  const postDetails={
    desc:desc,
    img:location,
    key:keydata
  }
 await makeRequest.post('posts',postDetails)
 queryClient.invalidateQueries(["posts"]);
  console.log('request send');
})
  }


  
  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
          <img
            src={currentUser.profilePic}
            alt=""
          />
          <input type="text" placeholder={`What's on your mind ${currentUser.name}?`} onChange={e=>setDesc(e.target.value)}/>
        </div>
        <div className="right">
        {file && (
              <img className="file"  alt="" src={URL.createObjectURL(file)} />
            )}
        </div>
        </div>
       
        <hr />
        <div className="bottom">
          <div className="left">
            <input type="file" id="file" style={{display:"none"}} onChange={e=>setFile(e.target.files[0])}/>
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <img src={Map} alt="" />
              <span>Add Place</span>
            </div>
            <div className="item">
              <img src={Friend} alt="" />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            <button onClick={handleClick}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
