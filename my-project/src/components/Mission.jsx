import React from 'react'
import { Link } from "react-router-dom";

export default function OurMission() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      {/* Header */}
      <p className="text-green-700 text-sm font-semibold uppercase tracking-wide mb-2">
        Our Mission
      </p>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
        Clean Air Shouldn't Be a Privilege
      </h1>
      <p className="text-gray-600 text-lg leading-relaxed mb-10">
        Our mission is to make air quality data accessible, understandable,
        and actionable for every citizen of Delhi — because everyone deserves
        to breathe safely.
      </p>

      {/* The Problem */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">The Problem</h2>
        <p className="text-gray-600 leading-relaxed">
          Delhi consistently ranks among the most polluted cities in the
          world. During winter months, AQI levels regularly cross the
          "Severe" mark, putting millions of people — especially children,
          the elderly, and those with respiratory conditions — at serious
          health risk. Yet, most people don't have easy access to real-time,
          reliable air quality information or clear guidance on how to
          protect themselves.
        </p>
      </section>

      {/* What We Do */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">What We Do</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-5 border border-gray-200 rounded-xl">
            <h3 className="font-semibold text-gray-900 mb-2">
              📍 Real-Time AQI Tracking
            </h3>
            <p className="text-sm text-gray-600">
              Live air quality data mapped across Delhi and nearby areas, so
              you always know what you're breathing.
            </p>
          </div>
          <div className="p-5 border border-gray-200 rounded-xl">
            <h3 className="font-semibold text-gray-900 mb-2">
              📚 Simple, Honest Awareness
            </h3>
            <p className="text-sm text-gray-600">
              We break down complex pollution science into information
              anyone can understand and act on.
            </p>
          </div>
          <div className="p-5 border border-gray-200 rounded-xl">
            <h3 className="font-semibold text-gray-900 mb-2">
              ✅ Actionable Solutions
            </h3>
            <p className="text-sm text-gray-600">
              From daily habits to community initiatives, we give practical
              steps people can actually take.
            </p>
          </div>
          <div className="p-5 border border-gray-200 rounded-xl">
            <h3 className="font-semibold text-gray-900 mb-2">
              🤝 Community First
            </h3>
            <p className="text-sm text-gray-600">
              Bringing citizens, researchers, and local voices together to
              push for cleaner air, together.
            </p>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Our Vision</h2>
        <p className="text-gray-600 leading-relaxed italic">
          "A future where every Indian city breathes clean air — where air
          quality is no longer a silent crisis, but a shared responsibility
          we're all equipped to act on."
        </p>
      </section>

      {/* Call to Action */}
      <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Join us in the fight for cleaner air
        </h3>
        <p className="text-gray-600 mb-5">
          Every small action adds up. See what you can do today.
        </p>
        <Link
          to="/Takeactions"
          className="inline-block bg-green-700 text-white font-semibold px-6 py-3 rounded-full hover:bg-green-800 transition"
        >
          Take Action →
        </Link>
      </div>
    </div>
  );
}