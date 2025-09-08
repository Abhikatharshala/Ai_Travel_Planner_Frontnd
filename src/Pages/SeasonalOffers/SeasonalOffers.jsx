import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";

const SeasonalPlans = () => {
  const [plans, setPlans] = useState([]);
  const [currentSeasonIndex, setCurrentSeasonIndex] = useState(0);

  useEffect(() => {
    axios
      .get("https://ai-travel-planner-2-7abk.onrender.com/seasonal/getoffers")
      .then((response) => setPlans(response.data.data))
      .catch((err) => console.error("Error fetching seasonal plans:", err));
  }, []);

  const groupedBySeason = plans.reduce((acc, plan) => {
    if (!acc[plan.season]) acc[plan.season] = [];
    acc[plan.season].push(plan);
    return acc;
  }, {});

  const seasons = Object.keys(groupedBySeason);

  // Auto-change season every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSeasonIndex((prev) => (prev + 1) % seasons.length);
    }, 5000); // 5 seconds
    return () => clearInterval(interval);
  }, [seasons.length]);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  if (seasons.length === 0)
    return (
      <p className="text-center mt-10 text-gray-600 animate-pulse">
        Loading seasonal plans...
      </p>
    );

  const currentSeason = seasons[currentSeasonIndex];
  const currentPlans = groupedBySeason[currentSeason];

  return (
    <div className="max-w-6xl mx-auto py-12">
      {/* Centered main heading */}
      <h1 className="text-3xl md:text-4xl font-bold text-center text-black-700 mb-8">
      Make Plans for Summer, Monsoon, Winter by AI Travel Planner
      </h1>

      <div className="bg-gray-100 p-6 rounded-xl shadow-md min-h-[500px] flex flex-col justify-center">
        {/* Season name inside the container */}
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-black-600">
          {currentSeason} Plans
        </h2>

        <Slider {...settings} className="w-full">
          {currentPlans.map((plan, index) => (
            <div key={index} className="p-2 flex justify-center">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg hover:scale-105 transition-transform duration-300 text-xs md:text-sm w-56 md:w-64">
                <img
                  src={plan.image}
                  alt={`${currentSeason} ${plan.duration}`}
                  className="h-28 md:h-32 w-full object-cover"
                />
                <div className="p-3">
                  <h3 className="font-semibold text-sm md:text-base">{plan.duration} Plan</h3>
                  <ul className="list-disc pl-4 mt-1 text-gray-700">
                    {plan.guidelines.map((g, i) => (
                      <li key={i}>{g}</li>
                    ))}
                  </ul>
                  <p className="mt-1 text-gray-800 text-sm">
                    <strong>Destinations:</strong> {plan.bestDestinations.join(", ")}
                  </p>
                  <p className="mt-1 text-green-600 font-semibold text-sm">
                    Budget: {plan.budgetEstimate}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default SeasonalPlans;
