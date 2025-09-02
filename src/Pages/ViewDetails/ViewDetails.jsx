import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import "./ViewDetails.css"; 

const ViewDetails = () => {
  const { id } = useParams();
  const [trip, setTrip] = useState();
  console.log(trip)
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchView = async () => {
      try {
        const res = await axios.get(
          `https://ai-travel-planner-2-7abk.onrender.com/googlePlace/getPlacesById/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTrip(res.data); // assuming API sends {trip:{...}}
      } catch (error) {
        console.log(error, "viewDetails");
      }
    };
    fetchView();
  }, [id, token]);

  if (!trip) return <p>Loading trip details...</p>;

  return (
    <div>
      <Navbar />
      <div className="trip-details">
        <h2 className="trip-title">🌍 Trip to {trip.location}</h2>

        <div className="day-plan-container">
         {trip.itinerary?.days?.map((day, index) => (
            <div key={index} className="day-card">
              <h3 className="day-title">Day {day.day} 🥳</h3>

              <div className="time-block morning">
                <strong>🌅 Morning:</strong> {day.morning}
              </div>

              <div className="time-block afternoon">
                <strong>🌞 Afternoon:</strong> {day.afternoon}
              </div>

              <div className="time-block evening">
                <strong>🌙 Evening:</strong> {day.evening}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ViewDetails;
