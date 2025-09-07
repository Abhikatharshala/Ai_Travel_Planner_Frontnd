// Navbar.jsx
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { FaUserCircle, FaBars } from "react-icons/fa"; // Added menu icon
import { useEffect, useState } from "react";
import axios from "axios";

export default function Navbar() {
  const [profile, setProfile] = useState(null);
  const [openSidebar, setOpenSidebar] = useState(false); // Profile sidebar
  const [openNav, setOpenNav] = useState(false); // Navigation sidebar
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Fetch profile from API
  const handleProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setProfile(null);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        "https://ai-travel-planner-2-7abk.onrender.com/api/auth/profile",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProfile(response.data);
    } catch (err) {
      console.error("Error fetching profile:", err);
      setError("Failed to load profile");
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  // Sidebar open/close
  const openDrawer = () => {
    setOpenSidebar(true);
    document.body.style.overflow = "hidden";
    handleProfile();
  };
  const closeDrawer = () => {
    setOpenSidebar(false);
    document.body.style.overflow = "";
  };

  // Nav sidebar open/close
  const openNavDrawer = () => {
    setOpenNav(true);
    document.body.style.overflow = "hidden";
  };
  const closeNavDrawer = () => {
    setOpenNav(false);
    document.body.style.overflow = "";
  };

  // ESC close
  useEffect(() => {
    const onEsc = (e) => {
      if (e.key === "Escape") {
        closeDrawer();
        closeNavDrawer();
      }
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setProfile(null);
    closeDrawer();
    navigate("/");
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
        <div className="flex items-center justify-between px-6 py-3">
          {/* Left: Menu icon (only on mobile) */}
          <button
            className="md:hidden text-2xl text-gray-700"
            onClick={openNavDrawer}
          >
            <FaBars />
          </button>

          {/* Logo */}
          <RouterLink
            to="/"
            className="text-2xl font-bold text-blue-600 mx-auto md:mx-0"
          >
            🚀 AI Travel Planner
          </RouterLink>

          {/* Links (desktop only) */}
          <div className="hidden md:flex space-x-6">
            <RouterLink to="/Dashboard" className="hover:text-blue-500 transition">
              Home
            </RouterLink>
            <RouterLink to="/PopularPlaces" className="hover:text-blue-500 transition">
              Popular Places
            </RouterLink>
            <RouterLink to="/MyTrips" className="hover:text-blue-500 transition">
              MyTrips
            </RouterLink>
            <RouterLink to="/wishlist" className="hover:text-blue-500 transition">
              Wishlist
            </RouterLink>
            <ScrollLink
              to="Footer"
              smooth={true}
              duration={600}
              offset={-70}
              className="cursor-pointer hover:text-blue-500 transition"
            >
              About
            </ScrollLink>
          </div>

          {/* Profile icon */}
          <button
            aria-expanded={openSidebar}
            aria-controls="profile-drawer"
            onClick={openDrawer}
            className="focus:outline-none"
          >
            <FaUserCircle className="text-3xl text-gray-600 hover:text-blue-500 transition cursor-pointer" />
          </button>
        </div>
      </nav>

      {/* OVERLAY (shared for both sidebars) */}
      {(openSidebar || openNav) && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => {
            closeDrawer();
            closeNavDrawer();
          }}
        />
      )}

      {/* LEFT NAV SIDEBAR */}
      <aside
        className={`fixed top-0 left-0 w-64 bg-white shadow-xl z-50 transform transition-transform duration-300
          ${openNav ? "translate-x-0" : "-translate-x-full"} h-screen overflow-y-auto rounded-br-2xl`}
      >
        <div className="p-6 space-y-6">
          <h2 className="text-xl font-bold text-blue-600">Menu</h2>
          <RouterLink to="/Dashboard" className="block" onClick={closeNavDrawer}>
            Home
          </RouterLink>
          <RouterLink to="/PopularPlaces" className="block" onClick={closeNavDrawer}>
            Popular Places
          </RouterLink>
          <RouterLink to="/MyTrips" className="block" onClick={closeNavDrawer}>
            MyTrips
          </RouterLink>
          <RouterLink to="/wishlist" className="block" onClick={closeNavDrawer}>
            Wishlist
          </RouterLink>
          <ScrollLink
            to="about"
            smooth={true}
            duration={600}
            offset={-70}
            className="block cursor-pointer"
            onClick={closeNavDrawer}
          >
            About
          </ScrollLink>
        </div>
      </aside>

      {/* RIGHT PROFILE SIDEBAR */}
      <aside
        id="profile-drawer"
        role="dialog"
        aria-modal="true"
        className={`fixed top-0 right-0 w-80 bg-white shadow-xl z-50 transform transition-transform duration-300
          ${openSidebar ? "translate-x-0" : "translate-x-full"} h-auto max-h-screen overflow-y-auto rounded-bl-2xl`}
      >
        <div className="p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-blue-600">Profile</h2>
            <button onClick={closeDrawer} className="text-gray-500 hover:text-gray-800 rounded">
              ✖
            </button>
          </div>

          {/* Body */}
          <div className="flex-1">
            {loading && (
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
              </div>
            )}
            {!loading && error && <p className="text-red-600">{error}</p>}
            {!loading && !error && profile && (
              <div className="space-y-4 text-center">
                <img
                  src={
                    profile.profilePic ||
                    "https://icons.veryicon.com/png/o/miscellaneous/user-avatar/user-avatar-male-5.png"
                  }
                  alt="Profile"
                  className="mx-auto w-28 h-28 rounded-full object-cover border-2 border-blue-500 shadow-md"
                />
                <div className="mt-3 space-y-1">
                  <p><span className="font-semibold">Name:</span> {profile.username}</p>
                  <p><span className="font-semibold">Email:</span> {profile.email}</p>
                  <p>
                    <span className="font-semibold">Created On:</span>{" "}
                    {new Date(profile.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <RouterLink
                  to="/Profile"
                  className="inline-block w-full text-center mt-4 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
                  onClick={closeDrawer}
                >
                  Edit Profile
                </RouterLink>
              </div>
            )}
            {!loading && !error && !profile && (
              <div className="text-gray-600 text-center">
                <p className="mb-4">You’re not logged in.</p>
                <RouterLink
                  to="/login"
                  className="inline-block w-full text-center px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
                  onClick={closeDrawer}
                >
                  Login
                </RouterLink>
              </div>
            )}
          </div>

          {profile && (
            <div className="mt-6">
              <button
                onClick={handleLogout}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
