import axios from 'axios'
import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';


const Profile = () => {
 
  const [form, setForm] = useState({ username: "", email: "" });
  const token=localStorage.getItem("token")

  const Navigate=useNavigate()
  useEffect(() => {
    // Fetch profile
    axios.get("https://ai-travel-planner-2-7abk.onrender.com/api/auth/profile",{
        headers:{Authorization:`Bearer ${token}`}
    }).then((res) => {
      setForm({
        username: res.data.username,
        email: res.data.email,
      });
      console.log("Fetched:", res.data);
    });
  }, []);

  const handleProfile = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Update payload:", form); // ✅ always has correct values
    axios.put("https://ai-travel-planner-2-7abk.onrender.com/api/auth/profileUpadte", form,
         { headers: { Authorization: `Bearer ${token}` } }

    ).then((res) => {
      alert("Profile updated!")
      Navigate("/Dashboard")
    });
  };
  return (
 <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-400 to-cyan-400 p-4">
  <form
    onSubmit={handleSubmit}
    className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg space-y-6 animate-fadeIn"
  >
    <h2 className="text-2xl font-bold text-blue-600 text-center">
      Edit Profile
    </h2>

    <div>
      <label className="block font-semibold text-gray-700 mb-1">
        Username
      </label>
      <input
        type="text"
        name="username"
        placeholder="Update your name"
        value={form.username}
        onChange={handleProfile}
        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
    </div>

    <div>
      <label className="block font-semibold text-gray-700 mb-1">
        Email
      </label>
      <input
        type="email"
        name="email"
        placeholder="Update your email"
        value={form.email}
        onChange={handleProfile}
        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
    </div>

    <button
      type="submit"
      className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition transform hover:-translate-y-1"
    >
      Update Profile
    </button>
  </form>
</div>

  )
}

export default Profile

