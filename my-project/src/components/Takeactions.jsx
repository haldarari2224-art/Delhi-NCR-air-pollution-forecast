import React, { useState } from "react";
import { Link } from "react-router-dom"
const actions = [
  {
    icon: "🚲",
    title: "Choose Cleaner Transport",
    desc: "Walk, cycle, carpool or use public transport to reduce vehicle emissions.",
  },
  {
    icon: "💡",
    title: "Save Energy",
    desc: "Use energy-efficient appliances and switch off devices when not in use.",
  },
  {
    icon: "🔥",
    title: "Avoid Burning Waste",
    desc: "Never burn leaves, garbage or household waste. It harms everyone.",
  },
  {
    icon: "🌳",
    title: "Plant & Protect Green Spaces",
    desc: "Plant trees and support local green spaces to naturally clean the air.",
  },
  {
    icon: "♻️",
    title: "Reduce & Reuse",
    desc: "Cut down on unnecessary consumption and reuse items whenever possible.",
  },
  {
    icon: "📢",
    title: "Spread Awareness",
    desc: "Share reliable air-quality information and inspire others to take action.",
  },
  {
    icon: "🏠",
    title: "Keep Home Air-Friendly",
    desc: "Use clean cooking fuels, avoid aerosols, and keep your home well-ventilated.",
  },
  {
    icon: "👥",
    title: "Join Community Efforts",
    desc: "Participate in clean air drives, support green policies, and volunteer.",
  },
];

const habits = [
  {
    icon: "☀️",
    title: "Morning",
    subtitle: "Start your day green",
    text: "Open windows for fresh air, water plants, and plan a low-emission day.",
  },
  {
    icon: "🚲",
    title: "Travel",
    subtitle: "Move the clean way",
    text: "Prefer walking, cycling or public transport whenever possible.",
  },
  {
    icon: "🏠",
    title: "Home",
    subtitle: "Make your home air-friendly",
    text: "Keep your home clean, avoid aerosols, and use clean energy.",
  },
  {
    icon: "👥",
    title: "Community",
    subtitle: "Stronger together",
    text: "Join clean air drives, support green policies, and volunteer.",
  },
];

export const communityData = [
  {
    id: 1,
    icon: "🌱",
    title: "Tree Plantation Drives",
    description: "Plant trees to help increase green cover in your community.",
    content:
      "Tree plantation drives help increase Delhi's green cover, which naturally filters pollutants from the air and reduces the urban heat-island effect. Every tree planted absorbs CO₂ and other harmful gases while providing shade that lowers surrounding temperatures.",
    buttonText: "Find Drives",
    details: [
      { icon: "📍", title: "Upcoming Drive", desc: "Community park plantation this Saturday, 8 AM." },
      { icon: "🌳", title: "Why It Helps", desc: "One mature tree can absorb up to 22kg of CO₂ per year." },
      { icon: "🧤", title: "What to Bring", desc: "Gloves, water bottle, and comfortable clothing." },
      { icon: "👥", title: "Volunteers Needed", desc: "Open to individuals, families, and groups." },
    ],
  },
  {
    id: 2,
    icon: "🫁",
    title: "Clean Air Campaigns",
    description: "Be part of awareness campaigns and spread the word.",
    content:
      "Clean air campaigns educate people about air pollution and encourage behavior changes that reduce emissions. From social media awareness drives to community events, these campaigns play a key role in building public pressure for cleaner air.",
    buttonText: "View Campaigns",
    details: [
      { icon: "🎯", title: "Active Campaign", desc: "\"No Crackers This Diwali\" — running now." },
      { icon: "📱", title: "Share Online", desc: "Spread awareness through social media posts." },
      { icon: "🏫", title: "School Sessions", desc: "Organize awareness talks at local schools." },
      { icon: "📊", title: "Past Impact", desc: "Previous campaigns reached over 50,000 people." },
    ],
  },
  {
    id: 3,
    icon: "📋",
    title: "Volunteer",
    description: "Volunteer your time and skills to support clean air initiatives.",
    content:
      "Volunteers are the backbone of every clean-air initiative. Whether you have a few hours a week or want to commit to a long-term role, there's a place for your skills — from fieldwork to digital outreach to data collection.",
    buttonText: "Volunteer Now",
    details: [
      { icon: "🌳", title: "Field Volunteer", desc: "Assist with tree plantation and clean-up drives." },
      { icon: "💻", title: "Digital Volunteer", desc: "Help with social media and content creation." },
      { icon: "📅", title: "Event Coordinator", desc: "Organize and manage local campaigns." },
      { icon: "📈", title: "Data Collector", desc: "Support AQI monitoring and reporting efforts." },
    ],
  },
  {
    id: 4,
    icon: "🏛️",
    title: "Support Green Policies",
    description: "Support policies and actions that promote clean air for all.",
    content:
      "Citizens can influence real change at the policy level. Supporting stricter emission norms, EV adoption incentives, and expanded GRAP measures helps push long-term solutions that individual action alone cannot achieve.",
    buttonText: "Learn More",
    details: [
      { icon: "🚗", title: "Emission Norms", desc: "Support stricter vehicle emission regulations." },
      { icon: "⚡", title: "EV Incentives", desc: "Back subsidies that make EVs more affordable." },
      { icon: "✍️", title: "Sign Petitions", desc: "Add your voice to active clean-air petitions." },
      { icon: "📢", title: "Contact Representatives", desc: "Email local leaders about air quality concerns." },
    ],
  },
];
export default function TakeAction() {
  const [completed, setCompleted] = useState([]);

  const toggleAction = (index) => {
    setCompleted((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index]
    );
  };

  const progress = Math.round((completed.length / actions.length) * 100);

  return (
    <div className="min-h-screen bg-white text-gray-800">

      {/* ================= HERO ================= */}
      <section className="px-4 sm:px-6 lg:px-10 pt-6">
        <div className="max-w-7xl mx-auto rounded-3xl bg-gradient-to-r from-green-50 to-white border border-green-100 overflow-hidden">

          <div className="grid grid-cols-1 lg:grid-cols-2 items-center">

            {/* LEFT */}
            <div className="p-7 sm:p-10 lg:p-12">
              <span className="inline-block bg-green-100 text-green-700 text-xs font-bold px-4 py-2 rounded-full mb-5">
                TAKE ACTION
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900">
                Small Actions.
                <br />
                Big Impact.
                <br />
                <span className="text-green-700">
                  Cleaner Tomorrow.
                </span>
              </h1>

              <p className="mt-5 max-w-xl text-gray-600 leading-relaxed">
                Every step counts. By working together and making better
                choices today, we can reduce air pollution and build a
                healthier future for generations to come.
              </p>

              <div className="flex flex-wrap gap-3 mt-7">
                <button
                  onClick={() =>
                    document
                      .getElementById("actions")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-lg font-semibold transition"
                >
                  🌱 Start My Action Plan
                </button>

                <button
                  onClick={() =>
                    document
                      .getElementById("habits")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="border border-green-700 text-green-700 hover:bg-green-50 px-6 py-3 rounded-lg font-semibold transition"
                >
                  ▷ See How It Helps
                </button>
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="h-full min-h-[330px] lg:min-h-[430px]">
              <img
                src="/src/assets/Pollution.avif"
                alt="Cleaner transportation and green city"
                className="w-full h-full object-cover"
              />
            </div>

          </div>
        </div>
      </section>


      {/* ================= ACTIONS ================= */}
      <section id="actions" className="px-4 sm:px-6 lg:px-10 py-12">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              What can you do today?
            </h2>

            <p className="text-gray-500 mt-2">
              Choose actions that are easy to follow and create real change.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

            {actions.map((action, index) => {
              const isDone = completed.includes(index);

              return (
                <div
                  key={index}
                  className={`rounded-2xl border p-5 text-center transition-all duration-200
                    ${
                      isDone
                        ? "border-green-300 bg-green-50"
                        : "border-gray-200 bg-white hover:shadow-md"
                    }`}
                >

                  <div className="w-14 h-14 mx-auto rounded-full bg-green-50 flex items-center justify-center text-3xl">
                    {action.icon}
                  </div>

                  <h3 className="font-bold text-gray-900 mt-4">
                    {action.title}
                  </h3>

                  <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                    {action.desc}
                  </p>

                  <label className="flex justify-center items-center gap-2 mt-5 text-sm text-gray-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isDone}
                      onChange={() => toggleAction(index)}
                      className="w-4 h-4 accent-green-700"
                    />

                    <span>
                      {isDone ? "Completed ✓" : "I'll do this"}
                    </span>
                  </label>

                </div>
              );
            })}

          </div>
        </div>
      </section>


      {/* ================= TRACK IMPACT ================= */}
      <section className="px-4 sm:px-6 lg:px-10 pb-12">
        <div className="max-w-7xl mx-auto rounded-2xl bg-gradient-to-r from-green-50 to-white border border-green-100 p-6 sm:p-8">

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">

            <div className="lg:col-span-2">

              <h2 className="text-2xl font-bold text-gray-900">
                Track your impact
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Your actions today lead to a cleaner tomorrow.
              </p>

              <div className="flex justify-between mt-7 mb-2 text-sm font-semibold">
                <span>Your action checklist</span>

                <span className="text-green-700">
                  {completed.length} of {actions.length} completed
                </span>
              </div>

              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-600 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* STATS */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">

                <div className="bg-white rounded-xl p-4 border">
                  <div className="text-2xl">🌱</div>
                  <h3 className="text-xl font-bold mt-2">
                    {completed.length}
                  </h3>
                  <p className="text-xs text-gray-500">
                    Actions completed
                  </p>
                </div>

                <div className="bg-white rounded-xl p-4 border">
                  <div className="text-2xl">📅</div>
                  <h3 className="text-xl font-bold mt-2">7</h3>
                  <p className="text-xs text-gray-500">
                    Days taking action
                  </p>
                </div>

                <div className="bg-white rounded-xl p-4 border">
                  <div className="text-2xl">👥</div>
                  <h3 className="text-xl font-bold mt-2">12</h3>
                  <p className="text-xs text-gray-500">
                    People inspired
                  </p>
                </div>

                <div className="bg-white rounded-xl p-4 border">
                  <div className="text-2xl">🌍</div>
                  <h3 className="text-xl font-bold mt-2">2.4 kg</h3>
                  <p className="text-xs text-gray-500">
                    CO₂ reduced
                  </p>
                </div>

              </div>

            </div>

            {/* EARTH */}
            <div className="text-center">
              <div className="text-8xl">🌍</div>

              <p className="font-semibold text-gray-700 mt-3">
                Small steps today
                <br />
                create cleaner air for
                <br />
                generations tomorrow.
              </p>
            </div>

          </div>
        </div>
      </section>


      {/* ================= HABITS ================= */}
      <section id="habits" className="px-4 sm:px-6 lg:px-10 pb-12">

        <div className="max-w-7xl mx-auto">

          <h2 className="text-2xl font-bold text-gray-900">
            Air-friendly habits for everyday life
          </h2>

          <div className="mt-5 border border-gray-200 rounded-2xl overflow-hidden">

            {habits.map((habit, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center p-5 border-b last:border-b-0 hover:bg-green-50 transition"
              >

                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-green-50 flex items-center justify-center text-xl">
                    {habit.icon}
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-900">
                      {habit.title}
                    </h3>

                    <p className="text-xs text-gray-500">
                      {habit.subtitle}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-gray-500 md:col-span-2">
                  {habit.text}
                </p>

              </div>
            ))}

          </div>

        </div>
      </section>


      {/* ================= GET INVOLVED ================= */}
      <section className="px-4 sm:px-6 lg:px-10 pb-12">

        <div className="max-w-7xl mx-auto">

          <h2 className="text-2xl font-bold text-gray-900">
            Get involved in real change
          </h2>

          <p className="text-gray-500 mt-1">
            Join initiatives and campaigns working towards cleaner air.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">

            {communityData.map((item, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-2xl p-5 text-center hover:shadow-md transition"
              >

                <div className="w-14 h-14 mx-auto rounded-full bg-green-50 flex items-center justify-center text-3xl">
                  {item.icon}
                </div>

                <h3 className="font-bold text-gray-900 mt-4">
                  {item.title}
                </h3>

                <p className="text-xs text-gray-500 mt-2 min-h-[48px]">
                  {item.desc}
                </p>

                <Link 
                to={`/community/${item.id}`}
                className="mt-5 border border-green-600 text-green-700 hover:bg-green-600 hover:text-white px-4 py-2 rounded-lg text-sm font-semibold transition">
                  {item.buttonText}
                </Link>

              </div>
            ))}

          </div>

        </div>
      </section>


      {/* ================= NEWSLETTER ================= */}
      <section className="px-4 sm:px-6 lg:px-10 pb-8">

        <div className="max-w-7xl mx-auto rounded-2xl bg-green-700 text-white p-6 sm:p-8">

          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">

            <div>
              <h2 className="text-2xl font-bold">
                Stay updated. Stay inspired.
              </h2>

              <p className="text-green-100 text-sm mt-2">
                Subscribe to get tips, resources, and updates on air quality
                and actions you can take.
              </p>
            </div>

            <div className="flex w-full lg:w-auto">

              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 rounded-l-lg text-gray-800 bg-white outline-none w-full lg:w-64"
              />

              <button className="bg-white text-green-700 px-5 py-3 rounded-r-lg font-semibold hover:bg-green-50">
                Subscribe ✓
              </button>

            </div>

          </div>

        </div>
      </section>


      {/* ================= FOOTER =================
      <footer className="border-t border-gray-200 px-6 py-10">

        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">

          <div className="col-span-2 lg:col-span-1">
            <h2 className="text-xl font-bold text-green-700">
              🌿 cleaner tomorrow
            </h2>

            <p className="text-xs text-gray-500 mt-3 leading-relaxed">
              Together, we can reduce air pollution and build a healthier,
              cleaner future for all.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-3">Explore</h3>
            <p className="text-sm text-gray-500 mb-2">Issues</p>
            <p className="text-sm text-gray-500 mb-2">Solutions</p>
            <p className="text-sm text-gray-500 mb-2">Take Action</p>
            <p className="text-sm text-gray-500">Resources</p>
          </div>

          <div>
            <h3 className="font-bold mb-3">About Us</h3>
            <p className="text-sm text-gray-500 mb-2">About</p>
            <p className="text-sm text-gray-500 mb-2">Our Mission</p>
            <p className="text-sm text-gray-500 mb-2">Our Team</p>
            <p className="text-sm text-gray-500">Partners</p>
          </div>

          <div>
            <h3 className="font-bold mb-3">Support</h3>
            <p className="text-sm text-gray-500 mb-2">Contact Us</p>
            <p className="text-sm text-gray-500 mb-2">FAQs</p>
            <p className="text-sm text-gray-500 mb-2">Volunteer</p>
            <p className="text-sm text-gray-500">Donate</p>
          </div>

          <div>
            <h3 className="font-bold mb-3">Legal</h3>
            <p className="text-sm text-gray-500 mb-2">Privacy Policy</p>
            <p className="text-sm text-gray-500 mb-2">Terms of Use</p>
            <p className="text-sm text-gray-500">Cookie Policy</p>
          </div>

        </div>

        <div className="text-center text-xs text-gray-400 mt-10">
          © 2026 Cleaner Tomorrow. All rights reserved.
        </div>

      </footer> */}

    </div>
  );
}