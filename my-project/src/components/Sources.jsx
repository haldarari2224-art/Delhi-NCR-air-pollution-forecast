import React from 'react';
import { Link } from "react-router-dom"

export default function Sources() {
  const sourcesList = [
    'Central Pollution Control Board (CPCB)',
    'India Air Quality Index (AQI)',
    'Weather Department',
    'News and Research Articles',
    'Various Government Reports',
  ];

  return (
    <section className="bg-gray-50 min-h-screen w-full py-16 px-8 flex flex-col justify-center items-center">
      <div className="w-full max-w-6xl mx-auto space-y-12">
        
        {/* Main Title */}
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
           Sources
          </h2>
          <div className="w-12 h-1 bg-green-700 mx-auto rounded-full"></div>
        </div>

        {/* 2 Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start w-full">
          
          {/* Left Column: About This Project */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">
              About This Project
            </h3>
            <p className="text-gray-600 leading-relaxed text-base md:text-lg">
              This project is created to spread awareness about Delhi air pollution, provide real-time information and promote solutions for a cleaner environment.
            </p>
            <p className="text-gray-800 font-medium">
              Made with <span className="text-red-500">❤️</span> for a greener tomorrow.
            </p>

            {/* Developed By Section */}
            <div className="pt-4 space-y-3">
              <h4 className="text-lg font-bold text-gray-900">Developed By</h4>
              <p className="text-gray-700 font-medium">MindMesh</p>
              <p className="text-gray-500 text-sm">
                Environment Enthusiast | Developer | Learner
              </p>

              {/* Social Buttons */}
             
            </div>
          </div>

          {/* Right Column: Sources & Quote */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900">Sources</h3>
              <ul className="space-y-3 text-gray-700 text-base md:text-lg">
                {sourcesList.map((source, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-gray-800 rounded-full inline-block"></span>
                    <span>{source}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quote Card */}
            <div className="bg-emerald-50/80 border border-emerald-100 p-6 rounded-2xl text-center space-y-2">
              <p className="text-gray-800 font-medium italic text-base md:text-lg">
                "The Earth does not belong to us: we belong to the Earth."
              </p>
              <p className="text-gray-600 text-sm font-semibold">— Chief Seattle</p>
            </div>
          </div>

        </div>

      <footer className="border-t border-gray-200 px-6 py-10">
  <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">

    <div>
      <h3 className="font-bold mb-3">Explore</h3>
      <Link to="/issues" className="block text-sm text-gray-500 mb-2">Issues</Link>
      <Link to="/solutions" className="block text-sm text-gray-500 mb-2">Solutions</Link>
      <Link to="/takeactions" className="block text-sm text-gray-500 mb-2">Take Action</Link>
      <Link to="/sources" className="block text-sm text-gray-500">Resources</Link>
    </div>

    <div>
      <h3 className="font-bold mb-3">About Us</h3>
      <Link to="/about" className="block text-sm text-gray-500 mb-2">About</Link>
      <Link to="/mission" className="block text-sm text-gray-500 mb-2">Our Mission</Link>
      <Link to="/team" className="block text-sm text-gray-500 mb-2">Our Team</Link>
    </div>

    <div>
      <h3 className="font-bold mb-3">Support</h3>
      <Link to="/contact" className="block text-sm text-gray-500 mb-2">Contact Us</Link>
      <Link to="/faq" className="block text-sm text-gray-500 mb-2">FAQs</Link>
      <Link to="/volunteer" className="block text-sm text-gray-500 mb-2">Volunteer</Link>
      <Link to="/donate" className="block text-sm text-gray-500">Donate</Link>
    </div>

    <div>
      <h3 className="font-bold mb-3">Legal</h3>
      <Link to="/privacy" className="block text-sm text-gray-500 mb-2">Privacy Policy</Link>
      <Link to="/term" className="block text-sm text-gray-500 mb-2">Terms of Use</Link>
      <Link to="/cookie" className="block text-sm text-gray-500">Cookie Policy</Link>
    </div>

  </div>

  <div className="text-center text-xs text-gray-400 mt-10">
    © 2026 Cleaner Tomorrow. All rights reserved.
  </div>
</footer>

      </div>
    </section>
  );
}
