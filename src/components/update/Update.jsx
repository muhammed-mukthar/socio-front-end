import { useContext, useState } from "react";
import { fileRequest, makeRequest } from "../../axios/axios";
import "./update.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import FormInput from "../../components/formInput/FormInput";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/authContext";

const Update = ({ setOpenUpdate, user }) => {
  const navigate = useNavigate();
  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);

  const [error, setError] = useState(false);

  const [texts, setTexts] = useState({
    email: user.email,
    password: user.password,
    name: user.name,
    city: user.city,
  });

  const { refetchuser } = useContext(AuthContext);

  let profilePic = user.profilePic;
  let profilekey = user.profilekey;
  let coverkey = user.coverkey;
  let coverPic = user.coverPic;

  const handleSubmit = async (e) => {
    e.preventDefault();
    var formData = new FormData();
    if (profile) {
      formData.append("image", profile);
      const profileConfig = await fileRequest.post(
        "/uploads/images",
        formData);
      if (profileConfig) {
        //    setProfilePic(profileConfig.data.location)
        // setProfilekey(profileConfig.data.key)
        profilePic = profileConfig.data.location;
        profilekey = profileConfig.data.key;
        // console.log(profileConfig.data,'profile config data',profileConfig.data.location,profileConfig.data.key);
      }
    }
    if (cover) {
      formData.append("image", cover);
      const coverConfig = await fileRequest.post(
        "/uploads/images",
        formData,
      );

      if (coverConfig) {
        //   setCoverPic(coverConfig.data.location)
        // setCoverkey(coverConfig.data.key)
        coverkey = coverConfig.data.key;
        coverPic = coverConfig.data.location;
        // console.log(coverConfig.data,'coverConfig config data',coverConfig.data.location,coverConfig.data.key);
      }
    }
    try {
      console.log(profilePic, coverPic, "coverpi fsdkhjhfshkljfshlkfsac");
      let details = {
        email: texts.email,
        password: texts.password,
        name: texts.name,
        city: texts.city,
        profilePic: profilePic,
        profilekey: profilekey,
        coverkey: coverkey,
        coverPic: coverPic,
      };
      console.log(details, "details here");
      makeRequest
        .put(`users/${user._id}`, details)
        .then((response) => {
          console.log("update success", response);
          refetchuser(user._id);
          queryClient.invalidateQueries(["user"]);

          setOpenUpdate(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      setError(true);
      console.log(error);
    }
    console.log(error);
    if (error) {
      Swal.fire({
        title: "Error!",
        text: `${error}`,
        icon: "error",
        confirmButtonText: "ok",
      });
    }
  };

  const handleChange = (e) => {
    setTexts((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const queryClient = useQueryClient();

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
              accept=".png, .jpeg, .jpg"
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
              accept=".png, .jpeg, .jpg"
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
};
export default Update;
