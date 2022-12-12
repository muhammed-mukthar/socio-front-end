import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useContext, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../context/authContext";
import moment from "moment";
import { makeRequest } from "../../axios/axios";
import { ModeComment } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import Modal from "react-modal";
import Swal from "sweetalert2";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { SocketContext } from "../../context/socketContext";
const Post = ({ post }) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  const { currentUser } = useContext(AuthContext);

  const queryClient = useQueryClient();
  const socket = useContext(SocketContext);
  const [commentOpen, setCommentOpen] = useState(false);
  const [user, setUser] = useState({});
  const [menuOpen, setMenuOpen] = useState(false);

  const [updateOpen, setUpdateOpen] = useState(false);
  const [desc, setDesc] = useState("");
  const [liked, setLiked] = useState(
    post.likes.includes(currentUser._id) ? true : false
  );
  const [report, setReport] = useState("other");
  const [err, setErr] = useState(null);
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }
  const deleteMutation = useMutation(
    (postId) => {
      return makeRequest.delete("/posts/" + postId);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );
  useEffect(() => {
    makeRequest
      .get(`users/${post.userId}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(post.likes, currentUser._id);
    post.likes.includes(currentUser._id) ? setLiked(true) : setLiked(false);
  }, [post]);
  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(post._id);
        queryClient.invalidateQueries(["posts"]);
      }
    });
  };

  const handleUpdate = () => {
    // e.preventDefault()
    if (desc) {
      makeRequest.put(`posts/${post._id}`, { desc }).then((res) => {
        setUpdateOpen(!updateOpen);
        queryClient.invalidateQueries(["posts"]);
      });
    } else {
      setDesc(null);
      setUpdateOpen(!updateOpen);
    }
  };

  const handleReport = () => {
    makeRequest
      .put(`posts/${post._id}/report`, { reason: report })
      .then((res) => {
        Swal.fire({
          title: "Reported!",
          text: "Thanks for reporting",
          icon: "success",
          confirmButtonText: "ok",
        });
        closeModal();
        setDesc("");
        setMenuOpen(false);
        setErr(false);
      })
      .catch((err) => {
        console.log(err, "error happened");
        // setErr(err)
      });

    // }
    // else{
    //   setErr("Please specify reason")
    // }
  };
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }
  function handlelike() {
    makeRequest.put(`/posts/${post._id}/like`).then(() => {
      queryClient.invalidateQueries(["posts"]);
      if(post.userId !== currentUser._id){
      socket.emit('send-notification', {
        senderId:currentUser?._id,
        recieverId:post.userId,
        desc:`${currentUser?.name} Liked your post `
      })
    }
    });
  }
  function closeModal() {
    setIsOpen(false);
  }
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleUpdate();
    }
  };

  console.log(user.name);
  return (
    <div key={post._id} className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <Link
              to={`/profile/${post.userId}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <img src={user.profilePic} alt="" />
            </Link>
            <div className="details">
              <span>
                <Link
                  to={`/profile/${post.userId}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <span className="names">{user.name}</span>{" "}
                </Link>
              </span>
              <span className="date">{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
          {/* {post.userId === currentUser._id && (
            <MoreHorizIcon onClick={() => setMenuOpen(!menuOpen)} />
          )} */}
          {/* {menuOpen && post.userId === currentUser._id && (
            <button onClick={handleDelete}>delete</button>
          )} */}
          <MoreHorizIcon
            onClick={() => {
              setMenuOpen(!menuOpen);
              updateOpen && setUpdateOpen(!updateOpen);
            }}
            style={{ cursor: "pointer" }}
          />
          {post.userId === currentUser._id
            ? menuOpen &&
              post.userId === currentUser._id && (
                <>
                  <button onClick={handleDelete}>
                    <span>
                      <DeleteIcon />
                    </span>
                  </button>
                  <button
                    onClick={handleUpdate}
                    style={{ top: "4rem", backgroundColor: "blue" }}
                  >
                    {" "}
                    <span>
                      <DriveFileRenameOutlineIcon />
                    </span>
                  </button>
                </>
              )
            : menuOpen && (
                <button
                  onClick={openModal}
                  style={{ backgroundColor: "orange" }}
                >
                  Report{" "}
                </button>
              )}
          {updateOpen && (
            <>
              <input
                type="text"
                placeholder="update description"
                onChange={(e) => setDesc(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </>
          )}
          <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Report</h2>
            <CloseIcon onClick={closeModal} className="close" />
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                Please specify reason
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="other"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="spam"
                  control={<Radio />}
                  label="spam"
                  onChange={(e) => {
                    setReport(e.target.value);
                  }}
                />
                <FormControlLabel
                  value="fraud"
                  control={<Radio />}
                  label="fraud"
                  onChange={(e) => setReport(e.target.value)}
                />
                <FormControlLabel
                  value="false information"
                  control={<Radio />}
                  label="false information"
                  onClick={(e) => setReport(e.target.value)}
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="other"
                  onClick={(e) => setReport(e.target.value)}
                />
              </RadioGroup>
              {report === "other" && (
                <TextField
                  id="standard-basic"
                  label="please say more about it"
                  variant="standard"
                  onChange={(e) => setDesc(e.target.value)}
                />
              )}
              {err && (
                <span style={{ top: "2rem", color: "red" }} className="err">
                  {err}
                </span>
              )}
              <Button
                variant="contained"
                endIcon={<SendIcon />}
                className="sendButton"
                onClick={() => {
                  handleReport();
                }}
              >
                Send
              </Button>
            </FormControl>
          </Modal>
        </div>
        <div className="content" onDoubleClick={handlelike}>
          <p>{post.desc}</p>
          <img src={post.img} alt="" />
        </div>
        <div className="info">
          <div className="item" onClick={handlelike}>
            {liked ? (
              <FavoriteOutlinedIcon style={{ color: "red" }} />
            ) : (
              <FavoriteBorderOutlinedIcon />
            )}
            {post.likes.length}
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            {post.comments.length}
          </div>
        </div>
        {commentOpen && <Comments post={post} user={user} />}
      </div>
    </div>
  );
};

export default Post;
