import { useState } from "react";
// import { makeRequest } from "../../axios";
import "./update.scss";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import FormInput from "../../components/formInput/FormInput";
import axios from 'axios'
// import {useNavigate,Link} from 'react-router-dom'
import Swal from 'sweetalert2'
const Update = ({ setOpenUpdate, user }) => {
  // const navigate = useNavigate()
  const [values, setValues] = useState({
    username: "",
    email: "",
    city:"",
    desc:"",
    password: "",
    confirmPassword: "",
  });
const [error, setError] = useState(false);
  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: `${user.name}`,
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      label: "Username",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required:true
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: `${user.email}`,
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required:true
    }
    ,
    {
      id: 3,
      name: "city",
      type: "text",
      placeholder: `${user?.city}`,
      errorMessage: "Enter your city!",
      label: "City"
    },
    {
      id: 4,
      name: "desc",
      type: "text",
      placeholder: `${user?.desc}`,
      errorMessage: "Set your bio",
      label: "Bio"
    },
   
    {
      id: 5,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required:true
    },
    {
      id: 6,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match!",
      label: "Confirm Password",
      pattern: values.password,
      required:true
    },
  ];
  const {confirmPassword,...others} = values
 let details=others
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      await axios.put(`/users/${user._id}`,details).then((response) => {
        console.log('update success',response);
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
  // const [cover, setCover] = useState(null);
  // const [profile, setProfile] = useState(null);
  // const [texts, setTexts] = useState({
  //   email: user.email,
  //   password: user.password,
  //   name: user.name,
  //   city: user.city,
  //   website: user.website,
  // });

  // const upload = async (file) => {
  //   console.log(file)
  //   try {
  //     const formData = new FormData();
  //     formData.append("file", file);
  //     const res = await makeRequest.post("/upload", formData);
  //     return res.data;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const handleChange = (e) => {
  //   setTexts((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
  // };

  // const queryClient = useQueryClient();

  // const mutation = useMutation(
  //   (user) => {
  //     return makeRequest.put("/users", user);
  //   },
  //   {
  //     onSuccess: () => {
  //       // Invalidate and refetch
  //       queryClient.invalidateQueries(["user"]);
  //     },
  //   }
  // );

  // const handleClick = async (e) => {
  //   e.preventDefault();

  //   //TODO: find a better way to get image URL
    
  //   let coverUrl;
  //   let profileUrl;
  //   coverUrl = cover ? await upload(cover) : user.coverPic;
  //   profileUrl = profile ? await upload(profile) : user.profilePic;
    
  //   mutation.mutate({ ...texts, coverPic: coverUrl, profilePic: profileUrl });
  //   setOpenUpdate(false);
  //   setCover(null);
  //   setProfile(null);

  return (
    <div className="update">
      <div className="wrapper">
        <h1>Update Your Profile</h1>
        <div className="">
      <form onSubmit={handleSubmit}>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <span className="error">{error&&error}</span>
        <button>Update</button>
      </form>
    </div>
        {/* <form>
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
          <button onClick={handleClick}>Update</button>
        </form> */}
        <button className="close" onClick={() => setOpenUpdate(false)}>
          close
        </button>
      </div>
    </div>
  );
}
export default Update
