import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import {Link } from "react-router-dom"

const Signup = () => {
  const [signup, setSignup] = useState({
    username: "",
    email: "",
    password: ""
  })
  const [loading,setLoading]=useState(false)
  const navigate=useNavigate()

  const handleSignup = async (e) => {
    e.preventDefault(); // prevent reload
    setLoading(true)
      try {
      const response = await axios.post(
        "https://ai-travel-planner-2-7abk.onrender.com/api/auth/signup", 
        signup
      );

      alert(response.data.message || "Signup successful!");
      console.log("User registered:", response.data);
      navigate("/login")

    } catch (error) {
      console.error("Signup error:", error);
      alert(error.response?.data?.message || "Signup failed");
    }finally{
      setLoading(false)
    }
  
  
}

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <form 
        onSubmit={handleSignup} 
        className="bg-white p-8 rounded-2xl shadow-lg w-96"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign Up</h1>

        {/* Name */}
        <label className="block text-gray-700 font-medium mb-2">Name</label>
        <input 
          type="text"
          placeholder="Enter your Name"
          name="username"
          required
          onChange={(e) => setSignup({ ...signup, [e.target.name]: e.target.value })}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {/* Email */}
        <label className="block text-gray-700 font-medium mb-2">Email</label>
        <input 
          type="email"
          placeholder="Enter your Email"
          required
          name="email"
          onChange={(e) => setSignup({ ...signup, [e.target.name]: e.target.value })}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {/* Password */}
        <label className="block text-gray-700 font-medium mb-2">Password</label>
        <input 
          type="password"
          placeholder="Enter your Password"
          name="password"
          required
          onChange={(e) => setSignup({ ...signup, [e.target.name]: e.target.value })}
          className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {/* Button */}
      <button
  type="submit"
  disabled={loading}
  className={`w-full flex items-center justify-center py-2 rounded-lg transition ${
    loading 
      ? "bg-gray-400 cursor-not-allowed" 
      : "bg-green-600 text-white hover:bg-green-700"
  }`}
>
  {loading ? (
    <>
      <svg
        className="animate-spin h-5 w-5 text-white mr-2"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        ></path>
      </svg>
      Signing Up...
    </>
  ) : (
    "Sign Up"
  )}
</button>
           <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/Login" className="text-green-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Signup

