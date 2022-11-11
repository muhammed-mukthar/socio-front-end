import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
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
    e.preventDefault();
    try {
    await  login(inputs)
      navigate("/")
      console.log('i am her=');
    } catch (err) {
      // setErr(err.response.data);
      console.log(err);
    }
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Hello World.</h1>
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
          <form>
            <input type="email" name="email" onChange={handleChange} placeholder="Email" />
            <input type="password" name="password" onChange={handleChange} placeholder="Password" />
          
            <button onClick={handleLogin}>Login</button>
            {error&error}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
