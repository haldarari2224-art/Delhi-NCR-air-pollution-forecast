import React from 'react'

import { Link } from "react-router-dom";
import busImg from "../assets/green-delhi.png";

export const solutionsData = [
  {
    id: 1,
    icon: "🚌",
    title: "Use Public Transport",
    description: "Reduce private vehicle use and promote public transportation.",
    content: "Encouraging people to switch from private cars to buses, metro, and shared transport can significantly cut vehicular emissions. Expanding metro coverage, improving bus frequency, and creating dedicated bus lanes make public transport more attractive, reducing the number of vehicles on Delhi's roads during peak hours.",
    image: busImg,
    impact: [
      { icon: "☁️", title: "Lower Emissions", desc: "Reduces CO₂ and air pollution significantly." },
      { icon: "👥", title: "Less Congestion", desc: "Fewer vehicles lead to smoother traffic flow." },
      { icon: "💰", title: "Cost Effective", desc: "Saves money for both individuals and the city." },
      { icon: "❤️", title: "Better Health", desc: "Cleaner air contributes to a healthier life." },
    ],
  },
  {
    id: 2,
    icon: "🌱",
    title: "Cleaner Energy",
    description: "Shift to clean fuels and promote renewable energy sources.",
    content: "Transitioning industries and households from coal and diesel to cleaner alternatives like CNG, solar, and electricity reduces harmful emissions at the source. Government incentives for solar panel installation and renewable energy adoption can accelerate this shift across Delhi and NCR.",
    image: busImg,
    impact: [
      { icon: "☁️", title: "Lower Emissions", desc: "Cuts down harmful industrial pollutants." },
      { icon: "⚡", title: "Energy Security", desc: "Reduces dependence on fossil fuels." },
      { icon: "💰", title: "Long-Term Savings", desc: "Renewable energy lowers costs over time." },
      { icon: "❤️", title: "Better Health", desc: "Cleaner air improves public health outcomes." },
    ],
  },
  {
    id: 3,
    icon: "🏗️",
    title: "Control Construction Dust",
    description: "Cover construction sites and use dust control measures.",
    content: "Mandating dust control measures such as covering construction material, regular water spraying, and using windbreak barriers at sites can significantly reduce particulate matter released into the air. Strict enforcement of these guidelines during high-pollution months is especially important.",
    image: busImg,
    impact: [
      { icon: "☁️", title: "Less Dust", desc: "Reduces particulate matter in the air." },
      { icon: "🏗️", title: "Safer Sites", desc: "Improves working conditions for laborers." },
      { icon: "📋", title: "Better Compliance", desc: "Encourages accountability among builders." },
      { icon: "❤️", title: "Better Health", desc: "Protects nearby residents from dust exposure." },
    ],
  },
  {
    id: 4,
    icon: "♻️",
    title: "Better Waste Management",
    description: "Proper waste collection and no burning of waste in open areas.",
    content: "Efficient waste collection systems and strict penalties for open waste burning can prevent toxic fumes from entering the air. Promoting recycling and composting also reduces the overall volume of waste that ends up being burned in open areas.",
    image: busImg,
    impact: [
      { icon: "☁️", title: "Less Smoke", desc: "Reduces toxic fumes from open burning." },
      { icon: "♻️", title: "More Recycling", desc: "Encourages sustainable waste practices." },
      { icon: "🏙️", title: "Cleaner Streets", desc: "Improves overall city cleanliness." },
      { icon: "❤️", title: "Better Health", desc: "Lowers exposure to harmful emissions." },
    ],
  },
  {
    id: 5,
    icon: "🌳",
    title: "Increase Green Spaces",
    description: "Plant more trees and create green belts across the city.",
    content: "Expanding urban greenery through tree plantation drives and dedicated green belts helps filter pollutants naturally from the air. Trees also help reduce the urban heat-island effect, which in turn limits the formation of ground-level ozone and smog.",
    image: busImg,
    impact: [
      { icon: "🌳", title: "Natural Filtering", desc: "Trees absorb pollutants from the air." },
      { icon: "🌡️", title: "Cooler City", desc: "Reduces urban heat-island effect." },
      { icon: "🦜", title: "More Biodiversity", desc: "Supports local wildlife and ecosystems." },
      { icon: "❤️", title: "Better Health", desc: "Green spaces improve mental and physical wellbeing." },
    ],
  },
  {
    id: 6,
    icon: "🏛️",
    title: "Government Measures",
    description: "Strict laws, regular monitoring and awareness campaigns.",
    content: "Consistent enforcement of pollution control laws, real-time air quality monitoring, and public awareness campaigns are essential for long-term change. Programs like GRAP, combined with citizen participation, create a more effective and sustained response to Delhi's air pollution crisis.",
    image: busImg,
    impact: [
      { icon: "📜", title: "Stronger Laws", desc: "Ensures accountability across sectors." },
      { icon: "📊", title: "Better Monitoring", desc: "Real-time data helps quick response." },
      { icon: "📢", title: "Public Awareness", desc: "Educates citizens on individual action." },
      { icon: "❤️", title: "Better Health", desc: "Long-term policy improves city-wide health." },
    ],
  },
];


function Solutions() {
  return (
    <section className="bg-gray-50 min-h-screen w-full py-12 px-8 flex flex-col justify-center">
      <div className="w-full max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          Solutions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {solutionsData.map((item) => (
            <Link
              to={`/solutions/${item.id}`}
              key={item.id}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-5 hover:shadow-md transition-all"
            >
              <div className="text-4xl flex-shrink-0 w-16 h-16 flex items-center justify-center bg-gray-50 rounded-xl">
                {item.icon}
              </div>

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

export default Solutions;