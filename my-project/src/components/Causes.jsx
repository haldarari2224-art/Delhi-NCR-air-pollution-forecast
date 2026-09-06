import React from 'react'
import { Link } from "react-router-dom";
import busImg from "../assets/green-delhi.png";

export const causesData = [
  {
    id: 1,
    icon: "🚗",
    title: "Vehicle Emissions",
    description: "Huge number of vehicles release harmful gases.",
    content:
      "Delhi has one of the highest numbers of registered vehicles in India. Daily traffic congestion means millions of vehicles idle for hours, releasing NO₂, CO, and PM2.5 into the air. Older vehicles without proper emission control systems make this problem significantly worse, especially during peak traffic hours.",
      image:busImg,
      impact: [
      { icon: "🫁", title: "Respiratory Harm", desc: "PM2.5 from exhaust deeply affects lung health." },
      { icon: "🚦", title: "Traffic Congestion", desc: "More vehicles mean longer idle times and emissions." },
      { icon: "🌍", title: "Year-Round Source", desc: "Unlike seasonal causes, this pollutes daily." },
      { icon: "⚠️", title: "Growing Problem", desc: "Vehicle numbers keep rising every year." },
    ],
  },
  {
    id: 2,
    icon: "🏗️",
    title: "Construction Dust",
    description: "Dust from construction sites adds to pollution.",
    content:"Delhi's rapid urban expansion means constant construction activity across the city. Without proper dust control measures like water spraying or covered material storage, fine particulate matter from these sites spreads easily through the air, contributing significantly to poor AQI readings.",
    image:busImg,
    impact: [
      { icon: "🌫️", title: "Particulate Matter", desc: "Dust adds directly to PM10 levels in the air." },
      { icon: "🏙️", title: "Widespread Sites", desc: "Rapid urban growth means dust everywhere." },
      { icon: "📋", title: "Weak Enforcement", desc: "Dust control rules often go unfollowed." },
      { icon: "⚠️", title: "Localized Impact", desc: "Nearby residents face the highest exposure." },
    ],
  },
  {
    id: 3,
    icon: "🔥",
    title: "Crop Residue Burning",
    description: "Burning of crop residue in neighbouring states.",
    content:
      "Every year around October-November, farmers in Punjab and Haryana burn leftover crop stubble to quickly clear fields for the next planting season. Wind patterns carry this smoke directly into Delhi, causing sharp AQI spikes that can push air quality into the 'Severe' and 'Hazardous' categories.",
    image:busImg,
      impact: [
      { icon: "📅", title: "Seasonal Spike", desc: "AQI spikes sharply every Oct-Nov." },
      { icon: "💨", title: "Wind-Carried Smoke", desc: "Smoke travels hundreds of kilometers into Delhi." },
      { icon: "🚨", title: "Hazardous Levels", desc: "Can push AQI into the 'Severe' category." },
      { icon: "🌾", title: "Farmer Dependency", desc: "Lack of affordable alternatives keeps it common." },
    ],
  },
  {
    id: 4,
    icon: "🏭",
    title: "Industrial Pollution",
    description: "Emission from industries release toxic pollutants.",
    content:
      "Factories and power plants operating in and around Delhi release sulfur dioxide, nitrogen oxides, and particulate matter. Many industrial units continue to operate without adequate emission control technology, adding a steady, year-round source of pollution to the city's air.",
    image:busImg,
      impact: [
      { icon: "🏭", title: "Toxic Emissions", desc: "SO₂ and NOx released continuously." },
      { icon: "⚙️", title: "Outdated Tech", desc: "Many units lack modern filtration systems." },
      { icon: "📈", title: "Constant Source", desc: "Operates year-round, unlike seasonal causes." },
      { icon: "⚠️", title: "Regulatory Gaps", desc: "Enforcement of emission norms remains weak." },
    ],
  },
  {
    id: 5,
    icon: "🗑️",
    title: "Waste Burning",
    description: "Burning of waste materials in open areas.",
    content:
      "Open burning of garbage, including plastic and other non-biodegradable waste, is still common in parts of Delhi due to inadequate waste management infrastructure. This releases toxic fumes and particulate matter directly into residential air at ground level.",
    image:busImg,
      impact: [
      { icon: "☠️", title: "Toxic Fumes", desc: "Burning plastic releases harmful chemicals." },
      { icon: "🏘️", title: "Ground-Level Exposure", desc: "Directly affects nearby residential areas." },
      { icon: "🗑️", title: "Poor Infrastructure", desc: "Inadequate waste collection worsens the issue." },
      { icon: "⚠️", title: "Preventable Cause", desc: "Better systems could largely eliminate this." },
    ],
  },
  {
    id: 6,
    icon: "🌧️",
    title: "Weather Conditions",
    description: "Low wind speed and temperature inversion trap pollutants.",
    content:
      "During winter months, Delhi experiences temperature inversion — a layer of warm air traps cooler air (and pollutants) close to the ground. Combined with low wind speeds, this prevents pollutants from dispersing, causing them to accumulate to dangerous levels.",
    image:busImg,
      impact: [
      { icon: "🌡️", title: "Temperature Inversion", desc: "Traps pollutants close to the ground." },
      { icon: "🍃", title: "Low Wind Speed", desc: "Prevents pollutants from dispersing." },
      { icon: "❄️", title: "Winter Worsening", desc: "Effect is strongest during cold months." },
      { icon: "⚠️", title: "Amplifies Other Causes", desc: "Makes every other pollution source worse." },
    ],
  },
];

function Causes() {
  return (
    <section className="bg-gray-50 min-h-screen w-full py-12 px-8 flex flex-col justify-center">
      {/* Container - w-full & px to cover screen */}
      <div className="w-full max-w-7xl mx-auto">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          Causes of Air Pollution in Delhi
        </h2>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {causesData.map((item) => (
            <Link
              to={`/causes/${item.id}`}
              key={item.id}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-5 hover:shadow-md transition-all"
            >
              {/* Icon */}
              <div className="text-4xl flex-shrink-0 w-16 h-16 flex items-center justify-center bg-gray-50 rounded-xl">
                {item.icon}
              </div>

              {/* Text */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Causes;