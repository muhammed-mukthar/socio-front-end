import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { makeRequest } from "../../axios/axios";
import { AuthContext } from "../../context/authContext";
function OtpLogin() {
  //sendotp
  const navigate = useNavigate();
  const [phone, setphone] = useState("");
  const [otp, setotp] = useState("");
  const [isphone, setisphone] = useState(false);
  const [isotp, setisotp] = useState(true);
  const { currentUser,setCurrentUser } = useContext(AuthContext);
console.log(isphone);
  const sendotp = async (e) => {
    e.preventDefault();
    if (phone.trim().length < 4 ||phone.trim().length>10) {
      generateError("phone number should have  10 numbers ");
    } else {
      try {
        makeRequest.post("/auth/sendotp", { phno: phone }).then((res) => {
          if (res.data.err) {
            generateError(res.data.err);
          } else {
            setisphone(true)
            setisotp(false)
            generateSuccess(res.data)
            // navigate("/login");
          }
        });
      } catch (err) {
        generateError("error  happen");
      }
    }
  };
  const verifyotp = async (e) => {
    e.preventDefault();
    if (phone.trim().length < 4 ||phone.trim().length>10) {
      generateError("phone number should have  10 numbers ");
    }else if (otp.trim().length !=6) {
      generateError("enter valid otp");
    } else {
      try {
        makeRequest.post("/auth/otplogin", { phno: phone ,otp:otp}).then((res) => {
          if (res.data.err) {
            generateError(res.data.err);
          } else {

            setisphone(true)
            setisotp(false)

            const {accessToken,refreshToken,...others}=res.data
            setCurrentUser(others);
            localStorage.setItem(
              "authentication",
              JSON.stringify({
                accessToken: accessToken,
                refreshToken: refreshToken,
              })
            );
            localStorage.setItem("user", JSON.stringify(others));
          console.log(res.data);
            navigate("/");
          }
        });
      } catch (err) {
        generateError("error  happen");
      }
    }
  };
const generateSuccess=((succ)=>{
  toast.success(succ, {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    
    });
  
})
  const generateError = (error) =>
    toast.error(error, {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  return (
    <div className="min-h-screen py-20 lg:py-40 bg-violet-500">
      <div className="container mx-auto">
        {/* <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        /> */}
        <ToastContainer
position="bottom-center"
autoClose={false}
newestOnTop
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
theme="light"
/>
        <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
          <div
            className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center"
            style={{
              backgroundImage: `url(https://images.pexels.com/photos/5638835/pexels-photo-5638835.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)`,
              backgroundSize: "cover",
            }}
          >
            <h1 className="text-white text-3xl mb-3 ">Welcome</h1>

            <div>
              <h5 className="text-white">Don't have an Account</h5>
              <p className="text-white font-bold cursor-pointer hover:text-blue-500">
                <Link to="/register">Sign up</Link>
              </p>
            </div>
          </div>
          <div className="w:full lg:w-1/2 px-12  py-16">
            <h2 className="text-3xl mb-4 ">OTP LOGIN</h2>
            <p className="mb-4">sign in to your account.</p>
            {/* {error && <h1 className="text-red-600">{error}</h1>}  */}
            <form>
              <div className="mt-5">
                {console.log( isphone? "hallo":"hai")}
              {!isphone? <input
       
                  className="border m-2 border-gray-400 py-1 px-2 w-full"
                  onChange={(e) => {
                    setphone(e.target.value);
                  }}
              
                  type="number"
                  name="phone"
                  placeholder="phone"
                />: <input
                
                className="border cursor-not-allowed m-2 border-gray-400   py-1 px-2  w-full"
                disabled
                onChange={(e) => {
                  setphone(e.target.value);
                }}

            value={phone}
                type="number"
                name="phone"
                placeholder="phone"
              />}
                {/* <input
                  className="border m-2 border-gray-400 py-1 px-2 w-full"
                  onChange={(e) => {
                    setphone(e.target.value);
                  }}
              
                  type="number"
                  name="phone"
                  placeholder="phone"
                /> */}
                {isotp?  <input
                  className="border m-2 border-gray-400 cursor-not-allowed py-1 px-2 w-full"
                  onChange={(e) => {
                    setotp(e.target.value);
                  }}
                  disabled

                  type="number"
                  name="otp"
                  placeholder="OTP"
                />:<input
                className="border m-2 border-gray-400 py-1 px-2 w-full"
                onChange={(e) => {
                  setotp(e.target.value);
                }}
                
                type="number"
                name="otp"
                placeholder="OTP"
              />}
              </div>
              <div className="mt-5"></div>
              <div className="mt-5">
               {!isphone? <button onClick={sendotp} className="w-full hover:bg-purple-800 bg-purple-500 py-3 text-center text-white">
                  SEND OTP
                </button>:<button onClick={verifyotp} className="w-full hover:bg-purple-800 bg-purple-500 py-3 text-center text-white">
                ENTER OTP
                </button>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OtpLogin;
