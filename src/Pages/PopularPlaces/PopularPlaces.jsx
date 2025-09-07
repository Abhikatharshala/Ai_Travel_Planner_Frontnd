import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Fotter/Footer";

const popularPlaces = [
  { name: "Goa", description: "Beaches & nightlife", image: "https://5.imimg.com/data5/SELLER/Default/2023/10/351718846/JZ/BG/FN/199238502/goa-tour-package-service.png" },
  { name: "Manali", description: "Hills & adventure", image: "https://gostops.com/blog/wp-content/uploads/2021/07/salman-hossain-saif-OVG7GvS3nos-unsplash-scaled.jpg" },
  { name: "Kerala", description: "Backwaters & greenery", image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2VyYWxhfGVufDB8fDB8fHww" },
  { name: "Dubai", description: "Luxury & desert safari", image: "https://content.r9cdn.net/rimg/dimg/9c/5d/375edbe5-city-6080-1666615a2c3.jpg?width=1366&height=768&xhint=2883&yhint=2021&crop=true" },
  { name: "Paris", description: "Romantic city & Eiffel Tower", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlCIl3UtdJuabzRE3IV8uL9v1jIRMlZ-JMfg&s" },
  { name: "Bali", description: "Tropical paradise & beaches", image: "https://www.goatsontheroad.com/wp-content/uploads/2019/08/best-beaches-in-bali.jpg" },
  { name: "Santorini", description: "White houses & sunset views", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuxmiDTV5q4tEmLGzrpxCRid10gXwlBDqEkA&s" },
  { name: "Venice", description: "Canals & gondola rides", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpBT-t_dKdYMAp-GnjO19ZuYPfYd1rnMh7vQ&s" },
];

const PopularPlaces = () => {
  const navigate = useNavigate();

  const handleVisit = () => {
    navigate("/Dashboard");
     window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
    <Navbar/>
    <div className="py-16 px-6 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      <h2 className="text-4xl font-extrabold text-center mb-14 text-gray-800 tracking-tight">
        ✈️ Most Popular & Beautiful Places to Visit
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
        {popularPlaces.map((place, index) => (
          <div
            key={index}
            className="relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:-translate-y-2"
          >
            {/* Background image */}
            <img
              src={place.image}
              alt={place.name}
              className="h-60 w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Glassmorphism Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-5 text-white backdrop-blur-md bg-white/10 rounded-t-xl">
              <h3 className="text-xl font-bold mb-1">{place.name}</h3>
              <p className="text-sm opacity-90 mb-4">{place.description}</p>

              <button
                onClick={handleVisit}
                className="w-full py-2 rounded-lg font-semibold bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white shadow-md hover:opacity-90 transition duration-300 cursor-pointer"
              >
                🌍 Visit Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  

  <div>
    <Footer/>
  </div>
    </div>
  );
};

export default PopularPlaces;
