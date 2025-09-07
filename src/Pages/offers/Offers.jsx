import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Offers = () => {
  const [offers, setOffers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://ai-travel-planner-2-7abk.onrender.com/offer/")
      .then((res) => res.json())
      .then((data) => setOffers(data))
      .catch((err) => console.log("Error fetching offer plans:", err));
  }, []);

  // Group offers by season
  const groupedOffers = offers.reduce((acc, offer) => {
    if (!acc[offer.season]) {
      acc[offer.season] = [];
    }
    acc[offer.season].push(offer);
    return acc;
  }, {});

  const cardSliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  const handleVisit = () => {
    navigate("/Dashboard");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="p-6">
      {Object.keys(groupedOffers).map((season) => (
        <div key={season} className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-center">
            {season} Specials
          </h2>

          <Slider {...cardSliderSettings}>
            {groupedOffers[season].map((offer) => (
              <div key={offer._id} className="px-3">
                <div className="relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:-translate-y-2 max-w-sm mx-auto">
                  {/* Background Image */}
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white bg-black/40 rounded-t-xl">
                    <h3 className="text-lg font-bold mb-1">{offer.title}</h3>
                    <p className="text-xs opacity-90 mb-1">{offer.description}</p>
                    <p className="text-sm font-semibold text-yellow-300 mb-3">
                      🎉 {offer.discount} OFF · {offer.season}
                    </p>

                    {/* CTA Button */}
                   <button
  onClick={handleVisit}
  className="w-full py-2 rounded-lg font-semibold bg-gradient-to-r from-green-500 via-green-600 to-green-700 text-white shadow-md hover:opacity-90 transition duration-300 cursor-pointer"
>
  🌍 Plan a Trip
</button>

                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      ))}
    </div>
  );
};

export default Offers;
