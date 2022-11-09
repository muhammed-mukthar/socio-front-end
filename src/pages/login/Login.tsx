import React from 'react'
import {Link} from 'react-router-dom'
function Login() {
  return (
    <div className="min-h-screen py-20 lg:py-40 bg-violet-500">
    <div className="container mx-auto">
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
            <h5 className="text-white">
              Don't have an Account
            
            </h5>
            <p className='text-white font-bold cursor-pointer hover:text-blue-500' > <Link to="/register">Sign up</Link> </p>
          </div>
        </div>
        <div className="w:full lg:w-1/2 px-12  py-16">
          <h2 className="text-3xl mb-4 ">Login</h2>
          <p className="mb-4">sign in to your account.</p>
          {/* {error && <h1 className="text-red-600">{error}</h1>}  */}
          <form >
            
            <div className="mt-5">
              <input
                type="text "
              //   onChange={(e) => {
              //     Setemail(e.target.value);
              //   }}
                placeholder="email "
                className="border border-gray-400 py-1 px-2 w-full"
              />
            </div>
            <div className="mt-5">
              <input
                type="text "
              //   onChange={(e) => {
              //     Setpassword(e.target.value);
              //   }}

                placeholder="password "
                className="border border-gray-400 py-1 px-2 w-full"
              />
            </div>
            <div className="mt-5">
              <button className="w-full hover:bg-purple-800 bg-purple-500 py-3 text-center text-white">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  );
  
}

export default Login