import React, { useState } from 'react'
import { Link } from "react-router-dom";

import unhealthyImg from "../assets/Unhealthydelhi.webp"
import burningImg from "../assets/burning2.jpeg"
import healthImg from "../assets/health.webp"
import wildlifeImg from "../assets/wildlife.jpg"
import cleanerairImg from"../assets/cleanerair.jpg"
import policesImg  from"../assets/polices.jpg"
import EnvironmentImg  from"../assets/polices.jpg"
import airqualityImg  from"../assets/airquality.jpg"
import transportationImg  from"../assets/transportation.jpg"
import causesImg  from"../assets/causes2.webp"
import winterImg  from"../assets/winter.jpg"
import differenceImg  from"../assets/difference.jpg"
import indoorImg  from"../assets/indoor.jpg"
import childrenImg  from"../assets/children.jpg"
import climateImg  from"../assets/climate.jpg"
import grrenspaceImg  from"../assets/greenspace.webp"
import mythfactsImg  from"../assets/mythfacts.avif"

import heroImg  from"../assets/delhi-air-pollution.png"


export const articles = [
  {
    id: 1,
    tag: "News",
    date: "May 26, 2025",
    title: "Delhi's AQI Hits 'Unhealthy' Again: What's Behind the Spike?",
    desc: "A look at the recent surge in AQI levels and the factors contributing to poor air quality in Delhi.",
    image: unhealthyImg,
    takeaways: [
    "Delhi's AQI has risen back to the 'Unhealthy' range.",
    "Multiple factors including emissions, weather, and dust are responsible.",
    "Urgent action is needed to protect public health.",
  ],
  causes: [
    { title: "Vehicular Emissions", desc: "Millions of vehicles on the road emit pollutants like NO₂, CO, and PM2.5." },
    { title: "Industrial Pollution", desc: "Emissions from factories and power plants continue to degrade air quality." },
    { title: "Construction Dust", desc: "Ongoing construction and road work release large amounts of dust." },
    { title: "Weather Conditions", desc: "Low wind speed and high humidity trap pollutants near the ground." },
    { title: "Crop Burning in Surrounding States", desc: "Stubble burning adds to the pollution load in Delhi." },
  ],
  },
  {
    id: 2,
    tag: "Causes",
    date: "May 24, 2025",
    title: "Top Causes of Air Pollution in Delhi: A Detailed Analysis",
    desc: "From vehicular emissions to crop burning, understand the major sources polluting Delhi's air.",
    image: burningImg,
    takeaways: [
  "Vehicular emissions remain the single largest contributor to Delhi's air pollution.",
  "Seasonal crop burning in neighboring states worsens winter air quality.",
  "Industrial and construction activity add year-round pollution load.",
],
causes: [
  { title: "Vehicle Emissions", desc: "Millions of daily commuters release NO₂, CO, and PM2.5 into the air." },
  { title: "Crop Burning", desc: "Stubble burning in Punjab and Haryana drifts smoke into Delhi every winter." },
  { title: "Industrial Output", desc: "Factories and power plants release sulfur and particulate matter." },
],
  },
  {
    id: 3,
    tag: "Health Impacts",
    date: "May 22, 2025",
    title: "Air Pollution and Your Health: Risks You Should Know",
    desc: "How polluted air affects the respiratory, cardiac and mental health of millions of Delhites.",
     image: healthImg,
     takeaways: [
  "Long-term exposure to polluted air increases risk of respiratory and heart disease.",
  "Children and the elderly are the most vulnerable groups.",
  "Mental health can also be affected by chronic pollution exposure.",
],
causes: [
  { title: "Respiratory Damage", desc: "Fine particles inflame airways and reduce lung function over time." },
  { title: "Cardiovascular Strain", desc: "Pollutants enter the bloodstream and increase heart disease risk." },
  { title: "Mental Health Impact", desc: "Studies link prolonged pollution exposure to anxiety and reduced cognitive function." },
],
  },
  {
    id: 4,
    tag: "Environment",
    date: "May 20, 2025",
    title: "Impact of Air Pollution on Environment and Wildlife",
    desc: "Explore how pollution harms ecosystems, reduces biodiversity and disrupts natural balance.",
     image: wildlifeImg,
     takeaways: [
  "Air pollution disrupts local ecosystems and reduces biodiversity.",
  "Polluted soil and water affect plant growth and animal habitats.",
  "Urban wildlife faces shrinking, contaminated living spaces.",
],
causes: [
  { title: "Habitat Degradation", desc: "Pollutants settle on soil and vegetation, weakening local ecosystems." },
  { title: "Water Contamination", desc: "Airborne particles settle into water bodies, harming aquatic life." },
  { title: "Species Decline", desc: "Sensitive species struggle to survive in heavily polluted urban zones." },
],
  },
  {
     id: 5,
    tag: "Solutions",
    date: "May 18, 2025",
    title: "Solutions for Cleaner Air: What Can We Do?",
    desc: "Practical solutions and everyday actions that can help make Delhi's air cleaner and safer.",
     image: cleanerairImg ,
     takeaways: [
  "Switching to public transport and EVs can significantly cut emissions.",
  "Individual actions like carpooling and reducing waste-burning matter.",
  "Government and citizens must work together for lasting change.",
],
causes: [
  { title: "Public Transport Adoption", desc: "Shifting daily commutes to metro and buses reduces vehicle emissions." },
  { title: "Cleaner Energy", desc: "Adopting electric vehicles and renewable energy cuts industrial pollution." },
  { title: "Community Action", desc: "Local awareness drives and stubble-burning alternatives help at the source." },
],
  },
  {
     id: 6,
    tag: "Policies & Government",
    date: "May 16, 2025",
    title: "Government Initiatives to Tackle Air Pollution in Delhi",
    desc: "A roundup of key policies, schemes and measures taken by the government so far.",
     image: policesImg,
     takeaways: [
  "GRAP (Graded Response Action Plan) restricts activity during high-pollution days.",
  "Odd-even vehicle schemes aim to reduce traffic emissions.",
  "Long-term policy consistency is needed for real impact.",
],
causes: [
  { title: "GRAP Enforcement", desc: "Construction bans and industrial restrictions kick in as AQI worsens." },
  { title: "Odd-Even Scheme", desc: "Alternating vehicle access aims to cut daily traffic volume." },
  { title: "Subsidy Programs", desc: "Incentives for EVs and cleaner fuel adoption support long-term change." },
],
  },
   {
     id: 7,
    tag: "Environment",
    date: "May 16, 2025",
    title: "Delhi Air Pollution Through the Seasons",
    desc: "Understand why Delhi air quality changes throughout the year and why pollution becomes especially severe during winter..",
     image: EnvironmentImg,
     takeaways: [
  "Winter sees the worst air quality due to trapped pollutants and crop burning.",
  "Monsoon season offers temporary relief as rain clears the air.",
  "Summer heat and dust storms bring their own pollution challenges.",
],
causes: [
  { title: "Winter Inversion", desc: "Cold air traps pollutants close to the ground, worsening smog." },
  { title: "Monsoon Washout", desc: "Rainfall temporarily clears particulate matter from the air." },
  { title: "Summer Dust", desc: "Hot, dry conditions kick up dust that adds to particulate pollution." },
],
  },
   {
     id: 8,
    tag: "Air Quality",
    date: "May 16, 2025",
    title: "Understanding Delhi AQI: What Do the Numbers Mean?",
    desc: "Learn what AQI levels indicate and how different pollution levels can affect daily life and health..",
     image: airqualityImg,
     takeaways: [
  "AQI above 200 is considered 'Unhealthy' and above 400 is 'Hazardous'.",
  "Different pollutants like PM2.5 and PM10 are weighted differently in AQI calculation.",
  "Checking daily AQI helps plan outdoor activities safely.",
],
causes: [
  { title: "AQI Categories", desc: "AQI is divided into bands from Good to Hazardous based on health risk." },
  { title: "Pollutant Weighting", desc: "The AQI reflects the most dominant pollutant on a given day." },
  { title: "Health Guidance", desc: "Higher AQI bands come with specific precautions for sensitive groups." },
],
  },
   {
     id: 9,
    tag: "Transportation",
    date: "May 16, 2025",
    title: "How Traffic Contributes to Delhi Air Pollution",
    desc: "Explore how vehicles, traffic congestion, and exhaust emissions contribute to Delhi worsening air quality..",
     image: transportationImg,
     takeaways: [
  "Traffic congestion significantly increases vehicle emissions.",
  "Older vehicles without emission controls are major polluters.",
  "Improved public transit could reduce vehicular pollution sharply.",
],
causes: [
  { title: "Traffic Congestion", desc: "Idling vehicles in traffic jams burn fuel inefficiently, raising emissions." },
  { title: "Aging Vehicle Fleet", desc: "Older cars and trucks lack modern emission control systems." },
  { title: "Limited Public Transit", desc: "Insufficient transit options push more people toward private vehicles." },
],
  },
  {
     id: 10,
    tag: "Causes",
    date: "May 16, 2025",
    title: "The Role of Construction Dust in Delhi Pollution",
    desc: "Discover how construction activities and road dust release harmful particles into Delhi atmosphere..",
     image: causesImg,
     takeaways: [
  "Unregulated construction sites are a major source of particulate matter.",
  "Road dust from unpaved surfaces adds significantly to pollution.",
  "Simple measures like water spraying can reduce dust emissions.",
],
causes: [
  { title: "Unmanaged Construction", desc: "Sites without dust control release large amounts of fine particles." },
  { title: "Unpaved Roads", desc: "Vehicle movement on dusty roads kicks up harmful particulate matter." },
  { title: "Debris Handling", desc: "Improper disposal of construction waste adds to airborne dust." },
],
  },
  {
     id: 11,
    tag: "Causes",
    date: "May 16, 2025",
    title: "Why Winter Smog Happens in Delhi",
    desc: "Learn how low temperatures, stagnant winds, fog, and pollutants combine to create Delhi notorious winter smog..",
     image: winterImg,
     takeaways: [
  "Low temperatures trap pollutants close to the ground.",
  "Stagnant winds prevent pollution from dispersing.",
  "Combined with crop burning, this creates hazardous smog.",
],
causes: [
  { title: "Temperature Inversion", desc: "Cold air traps a layer of pollutants near the surface." },
  { title: "Low Wind Speed", desc: "Calm winter winds fail to disperse accumulated pollutants." },
  { title: "Fog and Smoke Mix", desc: "Fog combines with smoke to form dense, harmful smog." },
],
  },
 
  {
     id: 12,
    tag: "Air Quality",
    date: "May 16, 2025",
    title: "PM2.5 vs PM10: What is the Difference?",
    desc: "Understand the difference between PM2.5 and PM10 and why these tiny particles matter for air quality..",
     image: differenceImg,
    takeaways: [
  "PM2.5 particles are small enough to enter the bloodstream.",
  "PM10 particles mainly affect the upper respiratory tract.",
  "Both are tracked separately in AQI calculations.",
],
causes: [
  { title: "PM2.5 Sources", desc: "Vehicle exhaust and combustion are primary sources of fine particles." },
  { title: "PM10 Sources", desc: "Dust, pollen, and construction debris make up larger particulate matter." },
  { title: "Health Penetration", desc: "Smaller particles travel deeper into lungs and even the bloodstream." },
],
  },
  {
     id: 13,
    tag: "Health Impacts",
    date: "May 16, 2025",
    title: "Indoor Air Pollution: Is Your Home Really Safe?",
    desc: "Explore common sources of indoor air pollution and simple ways to maintain cleaner air indoors..",
     image: indoorImg,
    takeaways: [
  "Indoor air can be more polluted than outdoor air in some cases.",
  "Cooking fuel, incense, and poor ventilation are major indoor sources.",
  "Simple steps like ventilation and air purifiers can help.",
],
causes: [
  { title: "Cooking Fumes", desc: "Gas stoves and solid fuels release harmful particles indoors." },
  { title: "Poor Ventilation", desc: "Sealed spaces trap pollutants without proper airflow." },
  { title: "Household Products", desc: "Incense, candles, and cleaning agents release volatile compounds." },
],
  },
  {
     id: 14,
    tag: "Health Impacts",
    date: "May 16, 2025",
    title: "Air Pollution and Children: Why Extra Care Matters",
    desc: "Understand why children can be particularly vulnerable to the effects of polluted air.",
     image: childrenImg,
     takeaways: [
  "Children breathe faster, absorbing more pollutants relative to body size.",
  "Developing lungs are more vulnerable to long-term damage.",
  "Limiting outdoor exposure on high-AQI days protects children's health.",
],
causes: [
  { title: "Higher Breathing Rate", desc: "Children inhale more air per body weight, increasing pollutant exposure." },
  { title: "Developing Lungs", desc: "Young lungs are more susceptible to lasting damage from pollutants." },
  { title: "Outdoor Play Exposure", desc: "Time spent outdoors during high-AQI periods increases health risks." },
],
  },
  {
     id: 15,
    tag: "Environment",
    date: "May 16, 2025",
    title: "Air Pollution and Climate Change: What is the Connection?",
    desc: "Explore the relationship between air pollution, greenhouse gases, climate change, and environmental health.",
     image: climateImg,
     takeaways: [
  "Many pollution sources also emit greenhouse gases.",
  "Climate change can worsen local air quality conditions.",
  "Reducing pollution often supports climate goals simultaneously.",
],
causes: [
  { title: "Shared Sources", desc: "Fossil fuel combustion produces both air pollutants and greenhouse gases." },
  { title: "Rising Temperatures", desc: "Warmer conditions can increase ground-level ozone formation." },
  { title: "Extreme Weather", desc: "Climate-driven weather shifts can worsen pollutant accumulation." },
],
  },
  {
     id: 16,
    tag: "Solutions",
    date: "May 16, 2025",
    title: "Can Green Spaces Help Reduce Air Pollution?",
    desc: "Discover how trees, parks, and urban green spaces can contribute to healthier and more sustainable cities.",
     image: grrenspaceImg,
    takeaways: [
  "Urban trees and parks help filter airborne pollutants.",
  "Green cover can lower local temperatures and reduce smog formation.",
  "Expanding green spaces is a long-term, sustainable solution.",
],
causes: [
  { title: "Air Filtration", desc: "Trees and plants absorb particulate matter and pollutant gases." },
  { title: "Urban Cooling", desc: "Green cover reduces the heat-island effect that worsens smog." },
  { title: "Biodiversity Support", desc: "Green spaces support ecosystems that improve overall air quality." },
],
  },
  {
     id: 17,
    tag: "Awareness",
    date: "May 16, 2025",
    title: "Air Pollution Myths vs Facts",
    desc: "Separate common misconceptions from facts about Delhi air pollution, AQI, and everyday exposure.",
     image: mythfactsImg,
   takeaways: [
  "Not all pollution comes from vehicles — many sources contribute.",
  "AQI apps aren't always fully accurate due to limited monitoring stations.",
  "Masks alone aren't enough without addressing indoor air quality too.",
],
causes: [
  { title: "Myth: Only Vehicles Pollute", desc: "In reality, industry, construction, and crop burning contribute heavily too." },
  { title: "Myth: Masks Solve Everything", desc: "Masks help outdoors, but indoor air quality needs separate attention." },
  { title: "Myth: Pollution is Only Seasonal", desc: "Delhi faces elevated pollution levels year-round, not just in winter." },
], 
  },
]

const tagColors = {
  News: "bg-gray-200 text-gray-700",
  Causes: "bg-green-100 text-green-800",
  "Health Impacts": "bg-red-100 text-red-700",
  Environment: "bg-green-100 text-green-800",
  Solutions: "bg-green-100 text-green-800",
  "Policies & Government": "bg-blue-100 text-blue-700",
  "Air Quality":"bg-gray-100 text-gray-700",
  "Awareness":"bg-yellow-100 text-yellow-700",
  "Transportation":"bg-purple-100 text-purple-700",
}

function Articles() {
  const [search, setSearch] = useState("")

  const filteredArticles = articles.filter((a) =>
    a.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="w-full">
      {/* Hero */}
      <div
        className="w-full bg-cover bg-center px-10 py-16"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <div className="bg-black/40 -mx-10 -my-16 px-10 py-16">
          <h1 className="text-4xl font-bold text-white mb-2">Articles &amp; Insights</h1>
          <p className="text-gray-200 mb-2">
            Read in-depth articles, news and research about Delhi's air pollution crisis.
          </p>
          <p className="text-sm text-gray-300">Home &gt; Articles</p>
        </div>
      </div>

      {/* Main content */}
      <div className="px-10 py-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-gray-900">
            All Articles ({filteredArticles.length})
          </h2>
          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article, i) => (
            <div key={i} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <img src={article.image} alt={article.title} className="w-full h-36 object-cover" />
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${tagColors[article.tag]}`}>
                    {article.tag}
                  </span>
                  <span className="text-xs text-gray-400">{article.date}</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm">{article.title}</h3>
                <p className="text-xs text-gray-500 mb-3">{article.desc}</p>
                <Link to={`/articles/${article.id}`} className="text-green-700 text-sm font-medium hover:underline">
                 Read Article →
                </Link>
              </div>
            </div>
          ))}
        </div>

         {/* Pagination  */}
        
      </div> 
      <section className="px-6 lg:px-12 pb-10">
     
             <div className="relative overflow-hidden bg-green-700 rounded-2xl px-7 py-6 flex flex-col md:flex-row items-center justify-between gap-5">
     
               <div>
     
                 <h2 className="text-2xl font-bold text-white">
                   🌿 Work towards a cleaner tomorrow.
                 </h2>
     
                 <p className="text-green-100 text-xs mt-1">
                   Small actions today lead to big changes for a healthier planet.
                 </p>
     
               </div>
     
               <Link 
               to="/issues/takeactions"
               className="bg-white text-green-700 px-6 py-3 rounded-full text-sm font-semibold whitespace-nowrap">
                 ✈ Take Action Now
               </Link>
     
             </div>
     
           </section>
     
    </div>
    
  )
}

export default Articles