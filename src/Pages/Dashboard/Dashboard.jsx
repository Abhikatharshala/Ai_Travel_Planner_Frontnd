import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PopularPlaces from "../PopularPlaces/PopularPlaces";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaRegCalendarAlt, FaRegSmile } from "react-icons/fa";
import Offers from "../offers/Offers";
import Footer from "../../Components/Fotter/Footer";

const TripPlanner = () => {
  const [trip, setTrip] = useState({
    location: "",
    preferences: "",
    startDate: "",
    endDate: "",
    days: "",
  });
  const [currentImage, setCurrentImage] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Background images
  const images = [
    "https://images.unsplash.com/photo-1622779536320-bb5f5b501a06?fm=jpg&q=60&w=3000",
    "https://images.unsplash.com/photo-1527668752968-14dc70a27c95?fm=jpg&q=60&w=3000",
    "https://images.unsplash.com/photo-1501630834273-4b5604d2ee31?fm=jpg&q=60&w=3000",
    "https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?fm=jpg&q=60&w=3000",
  ];

  // Auto-change background
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleTrip = (e) => {
    setTrip({ ...trip, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://ai-travel-planner-2-7abk.onrender.com/googlePlace/goglePlacesGet",
        trip,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      localStorage.setItem("tripPlan", JSON.stringify(response.data));
      navigate("/TripDetails");
    } catch (error) {
      console.error("Error Response:", error.response?.data || error.message);
    }
  };

  return (
    <div className="w-full min-h-screen">
      {/* Hero Section with background */}
      <div className="relative w-full min-h-screen">
        <div className="absolute inset-0">
          <img
            src={images[currentImage]}
            alt="Travel"
            className="w-full h-full object-cover transition-opacity duration-1000"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        <Navbar />

        {/* Form */}
        <div className="relative z-10">
          {loading && (
            <div className="fixed inset-0 flex justify-center items-center bg-black/60 backdrop-blur-sm z-50">
              <div className="bg-white p-6 rounded-xl shadow-xl flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-lg font-semibold text-gray-700 animate-pulse">
                  ✨ Finding the best plan for you...
                </p>
              </div>
            </div>
          )}

          <div className="flex justify-center items-center min-h-screen px-4">
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full max-w-lg bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/40 space-y-6"
            >
              <div className="text-center">
                <h1 className="text-3xl font-extrabold text-gray-800">
                  ✨ Plan Your Trip
                </h1>
                <p className="text-gray-600 mt-2 text-sm">
                  Fill details & get your personalized itinerary
                </p>
              </div>

              {/* Inputs */}
              <div className="relative group">
                <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-blue-600 transition" />
                <input
                  type="text"
                  name="location"
                  placeholder="Enter your location"
                  value={trip.location}
                  onChange={handleTrip}
                  required
                  className="w-full pl-10 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
              </div>

              <div className="relative group">
                <FaRegSmile className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-blue-600 transition" />
                <input
                  type="text"
                  name="preferences"
                  placeholder="Enter your preferences"
                  value={trip.preferences}
                  onChange={handleTrip}
                  required
                  className="w-full pl-10 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
              </div>

              <div className="flex gap-4">
                <div className="relative group flex-1">
                  <FaRegCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-blue-600 transition" />
                  <input
                    type="date"
                    name="startDate"
                    value={trip.startDate}
                    onChange={handleTrip}
                    required
                    className="w-full pl-10 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  />
                </div>
                <div className="relative group flex-1">
                  <FaRegCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-blue-600 transition" />
                  <input
                    type="date"
                    name="endDate"
                    value={trip.endDate}
                    onChange={handleTrip}
                    required
                    className="w-full pl-10 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  />
                </div>
              </div>

              <div>
                <input
                  type="number"
                  name="days"
                  placeholder="How many days?"
                  value={trip.days}
                  onChange={handleTrip}
                  required
                  className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-2xl transition"
              >
                🚀 Plan My Trip
              </motion.button>
            </motion.form>
          </div>
        </div>
      </div>

   

   


         {/* Offers section - separate clean block */}
      <div className="px-6 py-16 bg-gray-50">
        <h1 className="text-3xl font-bold text-center mb-10">
          🌍 Special Seasonal Offers
        </h1>
        <Offers />
      </div>

         {/* Popular Places */}
      <div className="px-4 py-16 bg-white">
        <PopularPlaces />
      </div>
    </div>
  );
};

export default TripPlanner;
