import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./MyTrip.css"
import Navbar from '../../Components/Navbar/Navbar'
import { useNavigate } from 'react-router-dom'
import Footer from '../../Components/Fotter/Footer'


const MyTrips = () => {
    const [trips,settrips] = useState([])
    const token = localStorage.getItem("token")
  const navigate=useNavigate()
    useEffect(()=>{
        const fetchTrips =async ()=>{
            try {
             const response = await axios.get("https://ai-travel-planner-2-7abk.onrender.com/googlePlace/getPlaces",
             {
                headers:{Authorization:`Bearer ${token}`}
             }
            )
            settrips(response.data)
            } catch (error) {
                console.log(error,"error happend while getting trips")
            }
        }
        fetchTrips()
    },[])

    //showing ViewDetails
    const handleViewDetails = async(id)=>{
      navigate(`/ViewDetails/${id}`)
        
    }
    const handleTripDelete = async(id)=>{
      try {
        const res = await axios.delete(`https://ai-travel-planner-2-7abk.onrender.com/googlePlace/deletePlacesById/${id}`,
          {
            headers:{Authorization:`Bearer ${token}`}
          }
        )
          settrips((prevTrips) => prevTrips.filter((trip) => trip._id !== id));
         alert("Deleted Your Trip")
      } catch (error) {
        console.log(error,"error deleting while Trip")
      }
    }
  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-100 via-blue-50 to-green-100 px-6 py-10 pt-24">
    <Navbar/>
 <div className="trips-container ">
  <h2 className="trips-title">✈️ My Trips</h2>

  {trips.length === 0 ? (
    <p className="no-trips">No trips available.</p>
  ) : (
    <ul className="trips-list">
      {trips.map((trip, index) => (
        <li key={index} className="trip-card">
          <h3 className="trip-location">✈️ Trip :{trip.location}</h3>
          <p className="trip-info">✨ Preferences: {trip.preferences}</p>
          <p className="trip-info">📅 Start Date: {trip.startDate}</p>
          <p className="trip-info">📅 End Date: {trip.endDate}</p>
          <p className="trip-info">📅 CreatedTrip: {trip.createdAt}</p>
          <div className='buttons-row'>
          <button className="view-btn" onClick={() => handleViewDetails(trip._id)}>View Details</button>
          <button className="dlt-btn" onClick={()=> handleTripDelete(trip._id)}>Delete Trip</button>
          </div>
        </li>
      ))}
    </ul>
  )}
</div>
<div>
  <Footer/>
</div>
</div>


  )
}

export default MyTrips
