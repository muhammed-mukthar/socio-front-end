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
  const [values, setValues] = useState({
    username: "",
    email: "",
    city:"",
    desc:"",
    password: "",
    confirmPassword: "",
  });
const [error, setError] = useState(false);
 
  const [texts, setTexts] = useState({
    email: user.email,
    password: user.password,
    name: user.name,
    city: user.city,
    website: user.website,
  });
  const {password,...others} = texts
 let details=others
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
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
  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);
  



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
        <label>Website</label>
        <input
          type="text"
          name="website"
          value={texts.website}
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
