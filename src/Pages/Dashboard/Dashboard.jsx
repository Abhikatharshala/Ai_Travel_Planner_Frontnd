import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TripPlanner = () => {
  const [trip, setTrip] = useState({
    location: "",
    preferences: "",
    startDate: "",
    endDate: "",
    days: ""
  });
  const [currentImage, setCurrentImage] = useState(0);
  const navigate=useNavigate()

  // Background images
  const images = [
    "https://static.vecteezy.com/system/resources/thumbnails/012/400/885/small_2x/tropical-sunset-beach-and-sky-background-as-exotic-summer-landscape-with-beach-swing-or-hammock-and-white-sand-and-calm-sea-beach-banner-paradise-island-beach-vacation-or-summer-holiday-destination-photo.jpg",
    "https://static.toiimg.com/thumb/msid-118821086,width-1280,height-720,resizemode-4/118821086.jpg",
    "https://www.thehosteller.com/_next/image/?url=https%3A%2F%2Fstatic.thehosteller.com%2Fhostel%2Fimages%2FFeatured22.jpg%2FFeatured22-1718537557291.jpg&w=2048&q=75",
    "https://whc.unesco.org/uploads/thumbs/activity_725-1200-630-20220308132126.jpg",
  ];

  // Auto-change background every 5 seconds
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
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://ai-travel-planner-2-7abk.onrender.com/googlePlace/goglePlacesGet",
        trip,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Trip Plan Response:", response.data);
      alert("Your Trip is Ready!");
      localStorage.setItem("tripPlan",JSON.stringify(response.data));
      navigate("/TripDetails",)
    } catch (error) {
      console.error("Error Response:", error.response?.data || error.message);
    }
  };

  return (
    <div className="relative min-h-screen w-full">
      {/* Background Slideshow */}
      <div className="absolute inset-0">
        <img
          src={images[currentImage]}
          alt="Travel"
          className="w-full h-full object-cover transition-opacity duration-1000"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Form overlay */}
      <div className="relative flex justify-center items-center min-h-screen z-10">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg max-w-md w-full"
        >
          <h1 className="text-2xl font-bold text-center mb-4">Plan Your Trip</h1>

          <input
            type="text"
            placeholder="Enter your location"
            name="location"
            value={trip.location}
            onChange={handleTrip}
            required
            className="p-2 rounded border"
          />
          <input
            type="text"
            placeholder="Enter your preferences"
            name="preferences"
            value={trip.preferences}
            onChange={handleTrip}
            required
            className="p-2 rounded border"
          />
          <input
            type="date"
            name="startDate"
            value={trip.startDate}
            onChange={handleTrip}
            required
            className="p-2 rounded border"
          />
          <input
            type="date"
            name="endDate"
            value={trip.endDate}
            onChange={handleTrip}
            required
            className="p-2 rounded border"
          />
          <input
            type="number"
            placeholder="How many days of Trip"
            name="days"
            value={trip.days}
            onChange={handleTrip}
            required
            className="p-2 rounded border"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Plan My Trip
          </button>
        </form>
      </div>


     
    </div>
  );
};

export default TripPlanner;
