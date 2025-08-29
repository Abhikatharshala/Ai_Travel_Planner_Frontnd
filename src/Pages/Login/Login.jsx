import axios from 'axios'
import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'

const Login = () => {
  const [login, setLogin] = useState({
    email: "",
    password: ""
  })
  const navigate=useNavigate()


  const handleLogin = async (e) => {
    console.log(login)
    e.preventDefault(); // prevent page reload
    try {
      const response = await axios.post("https://ai-travel-planner-2-7abk.onrender.com/api/auth/login",login)

   const {user ,token}= response.data
         localStorage.setItem("token",token)
         localStorage.setItem("user", JSON.stringify(user));
            alert(response.data.message || "Login successful!");
            console.log("User Login:", response.data);
             navigate("/Dashboard")
   
    } catch (error) {
       console.error("Login error:", error);
      alert(error.response?.data?.message || "Login failed");
    }
   
    
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <form 
        onSubmit={handleLogin} 
        className="bg-white p-8 rounded-2xl shadow-lg w-96"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h1>

        {/* Email */}
        <label className="block text-gray-700 font-medium mb-2">Email</label>
        <input 
          type='email'
          placeholder='Enter your Email'
          name='email'
          required
          onChange={(e) => setLogin({ ...login, [e.target.name]: e.target.value })}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {/* Password */}
        <label className="block text-gray-700 font-medium mb-2">Password</label>
        <input 
          type='password'
          placeholder='Enter your Password'
          name='password'
          required   
          onChange={(e) => setLogin({ ...login, [e.target.name]: e.target.value })}
          className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {/* Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            Login
          </button>
        

        {/* Link to Signup */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-green-600 hover:underline">
            Sign up
          </Link>
        </p>
     </form>
    </div>
  )
}

export default Login
