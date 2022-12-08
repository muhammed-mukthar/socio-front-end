import React, { useContext } from "react";
import Modal from "react-modal";

import CloseIcon from "@mui/icons-material/Close";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

import { style } from "@mui/system";
import { AuthContext } from "../context/authContext";
import { makeRequest } from "../axios/axios";
import { QueryClient,useQueryClient } from "@tanstack/react-query";
let customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "35rem",
    maxHeight: "38rem",
    backgroundColor: "#fffff",
    border: "none",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.2)",
  },
};

function ListModal({
  listModal,
  setListModal,
  listData,
  currentUser,
  handleFollow,
  handleUnfollow,
  list,
  errorHandler,
  refetchuser
}) {
  const queryClient = useQueryClient();
  const unfollowUser=async(userId)=>{
    try {
      await makeRequest.put(`users/${userId}/unfollow`);
      refetchuser(currentUser._id);
      queryClient.invalidateQueries(["user"]);
    } catch (err) {
      console.log(err);
        errorHandler()
   
    }
  }
  const followuser=async(userId)=>{
    try {
      await makeRequest.put(`users/${userId}/follow`);
      refetchuser(currentUser._id);
      queryClient.invalidateQueries(["user"]);
    } catch (err) {
      console.log(err);
        errorHandler()
   
    }
  }

  return (
    <Modal
      isOpen={listModal}
      onRequestClose={() => {
        setListModal(false);
      }}
      style={customStyles}
    >
      <div className="text-end">
        <CloseIcon
          onClick={() => {
            setListModal(false);
          }}
        />
      </div>
      <h1 className="text-2xl  text-blue-700-700 font-thin mb-3">{list}</h1>
      {listData.length > 0 ? (
        listData
          .filter((u) => u != null)
          .map((user) => (
            <div
              key={user._id}
              className=" bg-white my-3 rounded-xl shadow-md border-gray-100  border-2"
            >
              {console.log(user, "fsdsafsfa")}
              <div className=" flex flex-wrap justify-between items-center p-2.5">
                <div className="flex items-center">
                  <img
                    className="w-12 h-12 rounded-full object-cover mr-2.5"
                    src={user?.profilePic ? user.profilePic : ""}
                    alt={user.name}
                  />
                  <Link to={`/profile/${user._id}`} className="font-semibold">
                    {user.name}
                  </Link>
                </div>
                {currentUser?.following?.includes(user?._id) ? (
                  <button
                    onClick={(e) => unfollowUser(user?._id)}
                    className="ml-4 focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 "
                  >
                    Following
                  </button>
                ) : (
                  user?._id !== currentUser._id && (
                    <button
                      onClick={(e) => followuser(user?._id)}
                      className="ml-4 focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 "
                    >
                      Follow
                    </button>
                  )
                )}
              </div>
            </div>
          ))
      ) : (
        <p className="text-gray-600 m-3 text-lg">No {list} yet</p>
      )}
    </Modal>
  );
}

export default ListModal;
