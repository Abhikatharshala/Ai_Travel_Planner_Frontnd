import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { FaRegHeart } from "react-icons/fa";
const TripDetails = () => {
  const [plan, setPlan] = useState([]);

  useEffect(() => {
    const tripPlan = localStorage.getItem("tripPlan");
    if (tripPlan) {
      try {
        const parsed = JSON.parse(tripPlan);
        if (parsed.trip && Array.isArray(parsed.trip.days)) {
          setPlan(parsed.trip.days);
         
        } else if (Array.isArray(parsed)) {
          setPlan(parsed);
          setTripName("My Trip")

        } else {
          setPlan([]);
        }
      } catch (err) {
        console.error("Error parsing trip plan:", err);
        setPlan([]);
      }
    }
  }, []);

  if (!plan || plan.length === 0) {
    return (
      <div>
        <Navbar />
        <p className="text-center mt-10 text-gray-600 text-lg">
          No trip plan found. Start planning your adventure! 🌍✈️
        </p>
      </div>
    );
  }
const handleAddToWishlist = (trip) => {
  try {
    const existing = JSON.parse(localStorage.getItem("wishlist")) || [];

  const newTrip = Array.isArray(trip)
    ? {
        location: "My Trip",
        days: trip.length,
        itinerary: trip
      }
    : {
        location: tripData.location || "My Trip",
        days: Array.isArray(trip.itinerary) ? trip.itinerary.length : 0,
        itinerary: Array.isArray(trip.itinerary) ? trip.itinerary : []
      };

    existing.push(newTrip);
    localStorage.setItem("wishlist", JSON.stringify(existing));

    console.log("Updated wishlist:", existing);
    alert(" Trip added to wishlist!");
  } catch (error) {
    console.error("Error saving wishlist:", error);
  }
};

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-teal-100 via-blue-50 to-green-100 px-6 py-10">
        {/* Title */}
        <div className="pt-20 text-center">
        
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-700 drop-shadow-lg">
            🌴 Your Travel Itinerary <span>     </span>  
            <button
      onClick={() => handleAddToWishlist(plan)}
      className="text-gray-500 hover:text-red-500 transition"
    >
      <FaRegHeart size={32} />
    </button>
          </h1>
     
          <p className="mt-3 text-gray-600 text-lg">
            Explore your personalized day-by-day plan
          </p>
         
        </div>

        {/* Grid of animated cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mt-10">
          {plan.map((dayPlan, index) => (
            <div
              key={index}
              className="relative group bg-white/70 backdrop-blur-lg border border-gray-200 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 overflow-hidden"
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-teal-200/40 to-blue-200/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Card content */}
              <div className="relative p-6 z-10">
                <h2 className="text-2xl font-bold text-teal-700 mb-4 text-center">
                  Day {dayPlan.day} 🌞
                </h2>

                <ul className="space-y-3 text-gray-700 text-base">
                  <li className="bg-teal-50 p-3 rounded-lg hover:bg-teal-100 transition">
                    <strong className="text-teal-600">🌅 Morning:</strong>{" "}
                    {dayPlan.morning}
                  </li>
                  <li className="bg-blue-50 p-3 rounded-lg hover:bg-blue-100 transition">
                    <strong className="text-blue-600">☀️ Afternoon:</strong>{" "}
                    {dayPlan.afternoon}
                  </li>
                  <li className="bg-green-50 p-3 rounded-lg hover:bg-green-100 transition">
                    <strong className="text-green-600">🌆 Evening:</strong>{" "}
                    {dayPlan.evening}
                  </li>
                </ul>
              </div>

              {/* Bottom bar */}
              <div className="absolute bottom-0 w-full h-2 bg-gradient-to-r from-teal-400 to-blue-500"></div>
             
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TripDetails;
