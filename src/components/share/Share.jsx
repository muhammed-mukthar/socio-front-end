import "./share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { ToastContainer, toast } from 'react-toastify';
import { fileRequest, makeRequest } from "../../axios/axios";
import axios from "axios";
import Swal from "sweetalert2";
const Share = ({ toast }) => {
  const queryClient = useQueryClient();
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const handleClick = async (e) => {
    try {
      e.preventDefault();
      if (file || desc) {
        var formData = new FormData();
        if (file) {
      
          formData.append("image", file);
          fileRequest
            .post("/uploads/images", formData)
            .then(async (result) => {
              console.log(result.data, "file upload is here guys");
              console.log(
                result.data.location,
                result.data.key,
                "the resultn are here "
              );
              const location = result.data.location;
              const keydata = result.data.key;
              const postDetails = {
                desc: desc,
                img: location,
                key: keydata,
              };
              await makeRequest.post("posts", postDetails);
              queryClient.invalidateQueries(["posts"]);
              console.log("request send");
              setDesc("");
              setFile(null);
            });
        } else {
          const postDetails = {
            desc: desc,
          };
          await makeRequest.post("posts", postDetails);
          queryClient.invalidateQueries(["posts"]);
          console.log("request send");
          setDesc("");
        }
      } else {
        toast.error("No content has been added", {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (err) {
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
    }
  };

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
            <img src={currentUser.profilePic} alt="" />
            <input
              type="text"
              placeholder={`What's on your mind ${currentUser.name}?`}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <div className="right">
            {file && (
              <img className="file" alt="" src={URL.createObjectURL(file)} />
            )}
          </div>
        </div>

        <hr />
        <div className="bottom">
          <div className="left">
            <input
              type="file"
              id="file"
              accept=".png, .jpeg,??.jpg"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
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
