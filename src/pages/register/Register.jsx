import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

import "./register.scss";

const Register = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [error, setErr] = useState(null);
  const navigate = useNavigate()
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  console.log(inputs);

  const handleClick = async (e) => {
    e.preventDefault();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    e.preventDefault();
    if(inputs.email.trim().length < 4 ){
      setErr("invalid email")
    }else if(inputs.name.trim().length < 4 ){
      setErr("invalid name")
    }else if(inputs.password.trim().length <4){
      setErr('Invalid password')
    }else if(!regex.test(inputs.email)){
setErr("This is not a valid email format!")
    }else{
       try {
   const isregister=   await axios.post("http://localhost:5000/api/auth/register", inputs)
   if(isregister.data.err){
    setErr(isregister.data.err)
   }
      navigate('/login')
    } catch (err) {
      setErr(err.response.data);
    }
    }

   
  };


  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Socio</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
          <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
           
          <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleChange}
            />
            {error && error}
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
