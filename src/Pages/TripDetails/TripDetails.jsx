import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { Heart } from "lucide-react"; // using lucide-react icons

const TripDetails = () => {
  const [plan, setPlan] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const tripPlan = localStorage.getItem("tripPlan");
    if (tripPlan) {
      try {
        const parsed = JSON.parse(tripPlan);
        if (parsed.trip && Array.isArray(parsed.trip.days)) {
          setPlan(parsed.trip.days);
        } else if (Array.isArray(parsed)) {
          setPlan(parsed);
        } else {
          setPlan([]);
        }
      } catch (err) {
        console.error("Error parsing trip plan:", err);
        setPlan([]);
      }
    }
  }, []);

  const handleWishlist = async (dayPlan) => {
    try {
      // Update UI immediately
      setWishlist((prev) => [...prev, dayPlan]);

      // Call backend API (replace URL with your actual API)
      const response = await fetch("http://localhost:5000/api/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dayPlan),
      });

      const data = await response.json();
      console.log("Wishlist saved:", data);
      alert("Added to Wishlist ❤️");
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

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

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-teal-100 via-blue-50 to-green-100 px-6 py-10">
        {/* Title */}
        <div className="pt-20 text-center">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-700 drop-shadow-lg">
            🌴 Your Travel Itinerary
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

              {/* Wishlist Button */}
              <button
                onClick={() => handleWishlist(dayPlan)}
                className="absolute top-4 right-4 bg-white/80 p-2 rounded-full shadow-md hover:bg-red-100 transition"
              >
                <Heart
                  size={22}
                  className={`${
                    wishlist.find((w) => w.day === dayPlan.day)
                      ? "fill-red-500 text-red-500"
                      : "text-gray-500"
                  }`}
                />
              </button>

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
