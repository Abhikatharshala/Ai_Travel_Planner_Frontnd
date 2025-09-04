import React from 'react'

const Footer = () => {
  return (
    <div>
      <footer id='about' className="bg-gray-900 text-gray-300 py-12">
  <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
    
    {/* About Section */}
    <div>
      <h2 className="text-xl font-bold mb-4 text-white">AI Travel Planner</h2>
      <p className="text-sm">
        Plan smarter trips with AI. Get personalized itineraries, best deals, 
        and explore destinations like never before.
      </p>
    </div>

    {/* Quick Links */}
    <div>
      <h2 className="text-lg font-semibold mb-4 text-white">Quick Links</h2>
      <ul className="space-y-2 text-sm">
        <li><a href="/Dashboard" className="hover:text-blue-400">Home</a></li>
        <li><a href="/PopularPlaces" className="hover:text-blue-400">Destinations</a></li>
        <li><a href="/MyTrips" className="hover:text-blue-400">MyTrips</a></li>
        <li><a href="/WishList" className="hover:text-blue-400">Wishlist</a></li>
      </ul>
    </div>

    {/* Support */}
    <div>
      <h2 className="text-lg font-semibold mb-4 text-white">Support</h2>
      <ul className="space-y-2 text-sm">
        <li className="hover:text-blue-400">FAQ</li>
        <li className="hover:text-blue-400">Privacy Policy</li>
        <li className="hover:text-blue-400">Terms & Conditions</li>
        <li className="hover:text-blue-400">Contact Us</li>
      </ul>
    </div>

    {/* Contact / Newsletter */}
    <div>
      <h2 className="text-lg font-semibold mb-4 text-white">Stay Updated</h2>
      <p className="text-sm mb-3">Subscribe for travel tips & offers</p>
      <div className="flex">
        <input 
          type="email" 
          placeholder="Enter email" 
          className="px-3 py-2 w-full rounded-l-md focus:outline-none text-black"
        />
        <button className="bg-blue-600 px-4 rounded-r-md text-white hover:bg-blue-700">
          Subscribe
        </button>
      </div>
    </div>
  </div>

  {/* Bottom */}
  <div className="text-center text-sm text-gray-500 mt-8 border-t border-gray-700 pt-4">
    © 2025 AI Travel Planner. All rights reserved.
  </div>
</footer>

    </div>
  )
}

export default Footer
