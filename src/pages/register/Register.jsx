import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import "./register.scss";
import { makeRequest } from "../../axios/axios";

const Register = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
  });
  const [error, setErr] = useState(null);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  console.log(inputs);

  const handleClick = async (e) => {
    e.preventDefault();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const pattern=/[A-Z,a-z]/
    const numbermatch=/^[0-9]*$/
    e.preventDefault();
    if (inputs.email.trim().length < 4) {
      generateError("invalid email");
    } else if (inputs.name.trim().length < 4) {
      generateError("invalid name");
    }else if(!pattern.test(inputs.name)){
      generateError("invalid name");
    }else if(!numbermatch.test(inputs.phone) ||inputs.phone.trim().length!=10){
      generateError("invalid phone");
    } else if (inputs.password.trim().length < 4) {
      generateError("Invalid password");
    } else if (!regex.test(inputs.email)) {
      generateError("This is not a valid email format!");
    } else {
      try {
        const isregister = await makeRequest.post(
         "/auth/register",
          inputs
        );
        if (isregister.data.err) {
          generateError(isregister.data.err);
        } else {
          navigate("/login");
        }
      } catch (err) {
        setErr(err.response.data);
      }
    }
  };

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
        <ToastContainer
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
        />
        <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
          <div
            className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center"
            style={{
              backgroundImage: `url(https://images.unsplash.com/photo-1591035897819-f4bdf739f446?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80)`,
              backgroundSize: "cover",
            }}
          >
            <h1 className="text-white text-3xl mb-3 ">Welcome</h1>
            <div>
              <h5 className="text-white">Already have an Account</h5>
              <p className="text-white font-bold cursor-pointer hover:text-blue-500">
                <Link to="/login">Log In</Link>{" "}
              </p>
            </div>
          </div>
          <div className="w:full lg:w-1/2 px-12  py-16">
            <h2 className="text-3xl mb-4 ">Register</h2>
            <p className="mb-4">create an account</p>
            {/* {error && <h1 className="text-red-600">{error}</h1>}  */}
            <form>
              <div className="grid grid-cols-2 gap-5">
                <input
                  type="text"
                  placeholder="Name"
                  className="border border-gray-400 py-1 px-2 w-full"
                  name="name"
                  onChange={handleChange}
                />
                <input
                  // onChange={(e) => {
                  //   Setcompany(e.target.value);
                  // }}
                  type="text "
                  placeholder="phone"
                  name="phone"
                  onChange={handleChange}
                  className="border border-gray-400 py-1 px-2"
                />
              </div>
              <div className="mt-5">
                <input
                  type="email"
                  placeholder="Email"
                  className="border border-gray-400 py-1 px-2 w-full"
                  name="email"
                  onChange={handleChange}
                />
              </div>
              <div className="mt-5">
                <input
                  type="password"
                  placeholder="Password"
                  className="border border-gray-400 py-1 px-2 w-full"
                  name="password"
                  onChange={handleChange}
                />
              </div>
              <div className="mt-5">
                <button
                  onClick={handleClick}
                  className="w-full hover:bg-purple-800 bg-purple-500 py-3 text-center text-white"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
