import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { ToastContainer, toast } from "react-toastify";
import "./login.scss";

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [error, setErr] = useState(false);
  console.log(inputs);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };


  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    e.preventDefault();
    if(inputs.email.trim().length < 4 ){
      setErr("invalid email")
    }else if(inputs.password.trim().length <4){
      setErr('Invalid password')
    }else if(!regex.test(inputs.email)){
setErr("This is not a valid email format!")
    }else{
    try {
   let islogin= await  login(inputs)
   if(islogin){
      console.log(islogin,'yes u an=re')
      setErr(islogin.message)
   }else{
        // window.location.replace('/');
      navigate("/")
      console.log('i am her=');
   }
    } catch (err) {
      // setErr(err.response.data);
      console.log(err);
    }
    }
   
  };

  const generateError = (error) =>
  toast.error(error, {
    position: "top-right",
  });


  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Socio</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          {error && error}
          <form>

            <input type="email" name="email" onChange={handleChange} placeholder="Email" />
            <input type="password" name="password"  onChange={handleChange} placeholder="Password" />
          
            <button onClick={handleLogin}>Login</button>
            {/* {error&error} */}
          </form>
          <ToastContainer></ToastContainer>
        </div>
      </div>
    </div>
  );
};

export default Login;
