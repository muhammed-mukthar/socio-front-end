import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


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
      generateError("invalid email")
    }else if(inputs.password.trim().length <4){
      generateError('Invalid password')
    }else if(!regex.test(inputs.email)){
      generateError("This is not a valid email format!")
    }else{
    try {
   let islogin= await  login(inputs)
   if(islogin){
      console.log(islogin,'yes u an=re')
      generateError(islogin.message)
  
      
   }else{
        window.location.replace('/');
      // navigate("/")
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
            backgroundImage: `url(https://images.pexels.com/photos/5638835/pexels-photo-5638835.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)`,
            backgroundSize: "cover",
          }}
        >
          <h1 className="text-white text-3xl mb-3 ">Welcome</h1>
          {error && error}
          <div>
            <h5 className="text-white">
              Don't have an Account
            
            </h5>
            <p className='text-white font-bold cursor-pointer hover:text-blue-500' ><Link to="/register">Sign up</Link></p>
          </div>
        </div>
        <div className="w:full lg:w-1/2 px-12  py-16">
          <h2 className="text-3xl mb-4 ">Login</h2>
          <p className="mb-4">sign in to your account.</p>
          {/* {error && <h1 className="text-red-600">{error}</h1>}  */}
          <form >
            
            <div className="mt-5">
            <input    className="border border-gray-400 py-1 px-2 w-full" type="email" name="email" onChange={handleChange} placeholder="Email" />
            </div>
            <div className="mt-5">

            <input    className="border border-gray-400 py-1 px-2 w-full" type="password" name="password"  onChange={handleChange} placeholder="Password" />
            </div>
            <div className="mt-5">
              <button className="w-full hover:bg-purple-800 bg-purple-500 py-3 text-center text-white"  onClick={handleLogin}>
            Login
              </button>
              <Link to="/otp">
              <div className="w-full mt-4 hover:bg-sky-600 bg-sky-500 py-3 text-center text-white"  >
            OTP LOGIN
              </div>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

    // <div className="login">
    //   <div className="card">
    //     <div className="left">
    //       <h1>Socio</h1>
    //       <p>
    //         Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
    //         alias totam numquam ipsa exercitationem dignissimos, error nam,
    //         consequatur.
    //       </p>
    //       <span>Don't you have an account?</span>
    //       <Link to="/register">
    //         <button>Register</button>
    //       </Link>
    //     </div>
    //     <div className="right">
    //       <h1>Login</h1>
    //       {error && error}
    //       <form>

    //         <input type="email" name="email" onChange={handleChange} placeholder="Email" />
    //         <input type="password" name="password"  onChange={handleChange} placeholder="Password" />
          
    //         <button onClick={handleLogin}>Login</button>
    //         {/* {error&error} */}
    //       </form>
    //       <ToastContainer></ToastContainer>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Login;
