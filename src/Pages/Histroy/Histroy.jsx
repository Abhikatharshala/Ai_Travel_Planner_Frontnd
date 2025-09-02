// import axios from 'axios'
// import React, { useEffect, useState } from 'react'

// const Histroy = () => {
//     const [histroy,setHistroy]=useState([])
//     console.log(histroy,"histroy")
//     useEffect(()=>{
//         const token=localStorage.getItem("token")
//    const histroy = async()=>{
//     try {
         
//         const response = await axios.get("https://ai-travel-planner-2-7abk.onrender.com/history/getHistory",{
//             headers:{Authorization:`${token}`}
//         })
//         setHistroy(histroy)
//     } catch (error) {
//         console.log(error,"error")
//     }
//    }


//     },[])
//   return (
//     <div>
//       <h1>History</h1>
//     </div>
//   )
// }

// export default Histroy
import React from "react";
import { useNavigate } from "react-router-dom";

const popularPlaces = [
  { name: "Goa", description: "Beaches & nightlife", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e" },
  { name: "Manali", description: "Hills & adventure", image: "https://images.unsplash.com/photo-1583687404227-030cc2a5cb10" },
  { name: "Kerala", description: "Backwaters & greenery", image: "https://images.unsplash.com/photo-1557414552-f16a3e29da3e" },
  { name: "Dubai", description: "Luxury & desert safari", image: "https://images.unsplash.com/photo-1568084308-6b352d5de347" },
  { name: "Paris", description: "Romantic city & Eiffel Tower", image: "https://images.unsplash.com/photo-1522098543979-ffc7f79c2b2b" },
  { name: "Bali", description: "Tropical paradise & beaches", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e" },
  { name: "Santorini", description: "White houses & sunset views", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e" },
  { name: "Venice", description: "Canals & gondola rides", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e" },
  { name: "Swiss Alps", description: "Snowy mountains & skiing", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e" },
  { name: "New York", description: "City skyline & Times Square", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e" },
  { name: "Tokyo", description: "Culture & futuristic city", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e" },
  { name: "Iceland", description: "Waterfalls & northern lights", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e" },
  { name: "Thailand", description: "Beaches & temples", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e" },
  { name: "Rome", description: "History & Colosseum", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e" },
  { name: "Maldives", description: "Luxury resorts & clear water", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e" },
];

const PopularPlaces = () => {
  const navigate = useNavigate();

  const handleVisit = (place) => {
    navigate("/Dashboard");
  };

  return (
    <div className="py-12 px-6 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-10">
        Most Popular & Beautiful Places to Visit
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
        {popularPlaces.map((place, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition cursor-pointer"
          >
            <img
              src={place.image}
              alt={place.name}
              className="h-40 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-1">{place.name}</h3>
              <p className="text-gray-600 mb-3">{place.description}</p>
              <button
                onClick={() => handleVisit(place)}
                className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 w-full"
              >
                Visit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularPlaces;


