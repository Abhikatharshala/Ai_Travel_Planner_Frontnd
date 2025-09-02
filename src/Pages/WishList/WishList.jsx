import React, { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import Navbar from "../../Components/Navbar/Navbar";

const Wishlist = () => {
  const [wishList, setWishList] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("wishlist")) || [];

    const normalized = stored.map((item, index) => {
      if (Array.isArray(item)) {
        return {
          location: `My Trip ${index + 1}`,
          days: item.length,
          itinerary: item,
        };
      }
      return item;
    });

    setWishList(normalized);
  }, []);

  // Delete trip handler
  const handleDeleteTrip = (indexToDelete) => {
    const updatedWishlist = wishList.filter((_, index) => index !== indexToDelete);
    setWishList(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  return (
    <div>
    <Navbar/>
    <div className="min-h-screen bg-gradient-to-r from-teal-100 via-blue-50 to-green-100 px-6 py-10 pt-24">
      <h2 className="text-3xl font-bold text-center mb-8">My Wishlist</h2>

      {wishList.length === 0 ? (
        <p className="text-center text-gray-500">No trips saved yet ❤️</p>
      ) : (
        wishList.map((trip, tripIndex) => (
          <div key={tripIndex} className="mb-16">
            <div className="flex justify-between items-center mb-4 max-w-6xl mx-auto">
              <h3 className="text-2xl font-semibold text-teal-700">
                {trip.location} - Total Days: {trip.days}
              </h3>
              <button
                onClick={() => handleDeleteTrip(tripIndex)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
              <MdDeleteOutline  size={25}/>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {trip.itinerary.map((dayPlan, index) => (
                <div
                  key={index}
                  className="relative group bg-white/70 backdrop-blur-lg border border-gray-200 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-200/40 to-blue-200/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative p-6 z-10">
                    <h2 className="text-2xl font-bold text-teal-700 mb-4 text-center">
                      Day {dayPlan.day || index + 1} 🌞
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

                  <div className="absolute bottom-0 w-full h-2 bg-gradient-to-r from-teal-400 to-blue-500"></div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
    </div>
  );
};

export default Wishlist;
