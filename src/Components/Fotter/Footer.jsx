import React from 'react'

const Footer = () => {
  return (
    <div>
      <footer id="Footer" className="bg-gray-900 text-gray-300 pt-16 pb-24">
  {/* About Section (full width) */}
  <div className="max-w-7xl mx-auto px-6 mb-16">
    <h2 className="text-xl font-bold mb-4 text-white">About AI Travel Planner</h2>
    <p className="text-sm mb-3">
      AI Travel Planner helps travelers plan smarter trips with AI-powered itineraries, personalized recommendations, and real-time deals.
    </p>
    <p className="text-sm mb-3">
      Simply input your travel dates and preferences. Our AI suggests destinations, accommodations, and activities tailored for you, making planning effortless.
    </p>
    <ul className="text-sm list-disc list-inside mb-3 space-y-1">
      <li>AI-personalized itineraries for every traveler</li>
      <li>Exclusive seasonal offers and discounts</li>
      <li>Multi-destination trip planning in minutes</li>
      <li>Easy-to-use, mobile-friendly interface</li>
    </ul>
    <p className="text-sm">
      Join thousands of travelers who plan smarter with AI. Subscribe for tips & exclusive offers!
    </p>
  </div>

  {/* Flex Section: How It Works, Quick Links, Stay Updated */}
  <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-16">
    {/* How It Works */}
    <div className="flex-1">
      <h2 className="text-lg font-semibold mb-4 text-white">How It Works</h2>
      <ul className="text-sm list-disc list-inside space-y-2">
        <li>Input travel dates and preferences</li>
        <li>AI generates personalized itineraries</li>
        <li>Choose destinations, hotels, and activities</li>
        <li>Book trips with seasonal offers</li>
      </ul>
    </div>

    {/* Quick Links */}
    <div className="flex-1">
      <h2 className="text-lg font-semibold mb-4 text-white">Quick Links</h2>
      <ul className="space-y-2 text-sm">
        <li><a href="/Dashboard" className="hover:text-green-400">Home</a></li>
        <li><a href="/PopularPlaces" className="hover:text-green-400">Destinations</a></li>
        <li><a href="/MyTrips" className="hover:text-green-400">MyTrips</a></li>
        <li><a href="/WishList" className="hover:text-green-400">Wishlist</a></li>
      </ul>
    </div>

    {/* Stay Updated */}
    <div className="flex-1">
      <h2 className="text-lg font-semibold mb-4 text-white">Stay Updated</h2>
      <p className="text-sm mb-3">Subscribe for travel tips & exclusive offers</p>
      <div className="flex">
        <input 
          type="email" 
          placeholder="Enter your email" 
          className="px-3 py-2 w-full rounded-l-md text-black"
        />
        <button className="bg-green-600 px-4 rounded-r-md text-white hover:bg-green-700 transition">
          Subscribe
        </button>
      </div>
    </div>
  </div>

  {/* Bottom */}
  <div className="text-center text-sm text-gray-500 mt-16 border-t border-gray-700 pt-6 pb-8">
    © 2025 AI Travel Planner. All rights reserved.
  </div>
</footer>

    </div>
  )
}

export default Footer
