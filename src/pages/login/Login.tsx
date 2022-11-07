import React from 'react'

function Login() {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
    <div className='hidden sm:block'>
      <img src="https://images.unsplash.com/photo-1591035897819-f4bdf739f446?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"  className='w-full h-full object-cover ' alt="" />
    </div>

    <div className='bg-whit-500 flex flex-col justify-center '>
      <form   className='max-w-[400px] w-full mx-auto bg-white p-4'>
      {/* {error &&   <h1 className='text-red-600'>{error}</h1>} */}
        <h2 className='text-4xl font-bold text-center py-6'>Login</h2>
        <div className='flex flex-col py-2'>
          <label>Email</label>
          <input className='border p-2' 
        //   onChange={(e)=>{
        //     SetEmail(e.target.value)
        //   }} 
          type="text" />
        </div>
        <div className='flex flex-col py-2'>
          <label>Password</label>
          <input className='border p-2'  
        //   onChange={(e) => {
        //           SetPassword(e.target.value);
        //         }} 
                type="password" />
        </div>
        <button className='border w-full my-5 py-2  bg-indigo-600 hover:bg-indigo-500 text-white'>Sign In</button>
       <div className='flex justify-center'>
        <p>Create an account</p>
       </div>
      </form>
    </div>
  </div>
  );
  
}

export default Login