import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"; // profile icon

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex items-center justify-between px-6 py-3">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          AI Travel Planner
        </Link>

        {/* Menu Links */}
        <div className="hidden md:flex space-x-6">
          <Link to="/Dashboard" className="hover:text-blue-500 transition">Home</Link>
          <Link to="/Histroy" className="hover:text-blue-500 transition">Popular Places</Link>
          <Link to="/MyTrips" className="hover:text-blue-500 transition">MyTrips</Link>
          <Link to="/wishlist" className="hover:text-blue-500 transition">Wishlist</Link>
          {/* <Link to="/Histroy" className="hover:text-blue-500 transition">History</Link> */}
           <Link to="/places" className="hover:text-blue-500 transition">About</Link>
          
        </div>

        {/* Profile Icon */}
        <div>
          <Link to="/profile">
            <FaUserCircle className="text-3xl text-gray-600 hover:text-blue-500 transition" />
          </Link>
        </div>
      </div>
    </nav>
  );
}

