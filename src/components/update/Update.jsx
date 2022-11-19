import { useState } from "react";
import { makeRequest } from "../../axios/axios";
import "./update.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import FormInput from "../../components/formInput/FormInput";
import axios from 'axios'
import {useNavigate,Link} from 'react-router-dom'
import Swal from 'sweetalert2'
const Update = ({ setOpenUpdate, user }) => {
  const navigate = useNavigate()
  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);
  // const [profilePic, setProfilePic] = useState(user.profilePic||"");
  // const [profilekey, setProfilekey] = useState(user.profilekey||"");
  // const [coverkey, setCoverkey] = useState(user.coverkey||"");
  // const [coverPic, setCoverPic] = useState(user.coverPic||"");
  // console.log(profilePic,coverPic,'coverpic');
  // const [values, setValues] = useState({
  //   username: "",
  //   email: "",
  //   city:"",
  //   desc:"",
  //   password: "",
  //   confirmPassword: "",
  // });
const [error, setError] = useState(false);
 
  const [texts, setTexts] = useState({
    email: user.email,
    password: user.password,
    name: user.name,
    city: user.city,
  });

 

let  profilePic=user.profilePic
let profilekey=user.profilekey
let coverkey=user.coverkey
let  coverPic=user.coverPic


  const handleSubmit = async(e) => {
    e.preventDefault();
    var formData = new FormData();
     if (profile) {
      formData.append("image", profile);
   const profileConfig=await  axios.post("http://localhost:5000/api/uploads/images", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            "x-refresh": JSON.parse(localStorage.getItem("user")).refreshToken,
          },
        })
        if(profileConfig){
          //    setProfilePic(profileConfig.data.location)
          // setProfilekey(profileConfig.data.key)
            profilePic=profileConfig.data.location
 profilekey=profileConfig.data.key
          // console.log(profileConfig.data,'profile config data',profileConfig.data.location,profileConfig.data.key);
        }
       
      
      }
      if(cover){
        formData.append("image", cover);
      const  coverConfig=  await   axios.post("http://localhost:5000/api/uploads/images", formData, {
               headers: {
                 "Content-Type": "multipart/form-data",
                 authorization:
                   "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
                 "x-refresh": JSON.parse(localStorage.getItem("user")).refreshToken,
               },
             })

             if(coverConfig){
              //   setCoverPic(coverConfig.data.location)
              // setCoverkey(coverConfig.data.key)
               coverkey=coverConfig.data.key
               coverPic=coverConfig.data.location
              // console.log(coverConfig.data,'coverConfig config data',coverConfig.data.location,coverConfig.data.key);
             }
            

            
      }
    try {
      console.log(profilePic,coverPic,'coverpi fsdkhjhfshkljfshlkfsac');
      let details={
        email: texts.email,
        password: texts.password,
        name: texts.name,
        city: texts.city,
        profilePic:profilePic,
        profilekey:profilekey,
        coverkey:coverkey,
        coverPic:coverPic
    
      }
      console.log(details,'details here');
       makeRequest.put(`users/${user._id}`,details).then((response) => {
        console.log('update success',response);
        queryClient.invalidateQueries(["user"]);
        setOpenUpdate(false)
    }).catch((err)=>{
     err.response.data.error?setError(err.response.data.error):setError(err.response.data.msg)
      
    })
    } catch (error) {
      setError(true)
      console.log(error);
    }
   console.log(error);
   if(error)
   {
    Swal.fire({
        title: 'Error!',
        text: `${error}`,
        icon: 'error',
        confirmButtonText: 'ok'
      })
   }

  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };




  const handleChange = (e) => {
    setTexts((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const queryClient = useQueryClient();

  // const mutation = useMutation(
  //   (user) => {
  //     return makeRequest.put("/users/", user);
  //   },
  //   {
  //     onSuccess: () => {
  //       // Invalidate and refetch

  //       queryClient.invalidateQueries(["user"]);
  //       setOpenUpdate(false);
  //     },
  //   }
  // );

//   const handleClick = async (e) => {
//     e.preventDefault();

//     //TODO: find a better way to get image URL
    
//     let coverUrl;
//     let profileUrl;
//     // coverUrl = cover ? await upload(cover) : user.coverPic;
//     // profileUrl = profile ? await upload(profile) : user.profilePic;
    
//     mutation.mutate({ ...texts });
  
//     setCover(null);
//     setProfile(null);
// }

  return (
    <div className="update">
    <div className="wrapper">
      <h1>Update Your Profile</h1>
      <form>
        <div className="files">
          <label htmlFor="cover">
            <span>Cover Picture</span>
            <div className="imgContainer">
              <img
                src={
                  cover
                    ? URL.createObjectURL(cover)
                    : "/upload/" + user.coverPic
                }
                alt=""
              />
              <CloudUploadIcon className="icon" />
            </div>
          </label>
          <input
            type="file"
            id="cover"
            style={{ display: "none" }}
            onChange={(e) => setCover(e.target.files[0])}
          />
          <label htmlFor="profile">
            <span>Profile Picture</span>
            <div className="imgContainer">
              <img
                src={
                  profile
                    ? URL.createObjectURL(profile)
                    : "/upload/" + user.profilePic
                }
                alt=""
              />
              <CloudUploadIcon className="icon" />
            </div>
          </label>
          <input
            type="file"
            id="profile"
            style={{ display: "none" }}
            onChange={(e) => setProfile(e.target.files[0])}
          />
        </div>
        <label>Email</label>
        <input
          type="text"
          value={texts.email}
          name="email"
          onChange={handleChange}
        />
        <label>Password</label>
        <input
          type="text"
          value={texts.password}
          name="password"
          onChange={handleChange}
        />
        <label>Name</label>
        <input
          type="text"
          value={texts.name}
          name="name"
          onChange={handleChange}
        />
        <label>Country / City</label>
        <input
          type="text"
          name="city"
          value={texts.city}
          onChange={handleChange}
        />
      
        <button onClick={handleSubmit}>Update</button>
      </form>
      <button className="close" onClick={() => setOpenUpdate(false)}>
        close
      </button>
    </div>
  </div>
  );
}
export default Update
