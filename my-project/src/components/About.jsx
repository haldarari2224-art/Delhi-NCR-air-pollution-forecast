import React from 'react'
import { Wind , Heart , Eye , Leaf , Clock } from 'lucide-react'
import aboutImage from "../assets/about.jpg"

function About(){

    return(
       <div className = "px-10 py-16 max-w-6xl mx-auto">
       <div className = "text-center mb-12">
        <h1 className = "text-4xl font-bold text-gray-900 mb-2">About the Issue</h1>
        <div className = "w-16 h-1 bg-green-700 mx-auto"></div>
       </div>
      
      <div className = "grid grid-cols-1 md:grid-cols-2 gap-10">
       <div>
        <h2 className = "text-xl font-bold text-gray-900 mb-2">What is Air Pollution?</h2>
        <p className="text-gray-600 mb-6 leading-relaxed">
            Air pollution is the presence of harmful substances in the air that cause harm to humans, animals, plants and the environment.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mb-2">Why is Delhi Affected?</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Delhi's location, population density, rise in vehicles, industrial activities and seasonal factors trap pollutants and make the air highly polluted.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mb-3">Major Pollutants</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>PM2.5 - Fine Particulate Matter</li>
            <li>PM10 - Coarse Particulate Matter</li>
            <li>NO₂ - Nitrogen Dioxide</li>
            <li>SO₂ - Sulfur Dioxide</li>
            <li>CO - Carbon Monoxide</li>
            <li>O₃ - Ozone</li>
          </ul>
        </div>

        {/* Right column */}
        <div>
          <img
            src={aboutImage}
            alt="Delhi air pollution"
            className="w-full h-64 object-cover rounded-lg mb-6"
          />

          <div className="bg-green-50 rounded-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Effects</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Wind className="text-green-700" size={22} />
                <span className="text-gray-700">Respiratory problems</span>
              </li>
              <li className="flex items-center gap-3">
                <Heart className="text-green-700" size={22} />
                <span className="text-gray-700">Heart diseases</span>
              </li>
              <li className="flex items-center gap-3">
                <Eye className="text-green-700" size={22} />
                <span className="text-gray-700">Irritation in eyes and throat</span>
              </li>
              <li className="flex items-center gap-3">
                <Leaf className="text-green-700" size={22} />
                <span className="text-gray-700">Damage to crops and ecosystems</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="text-green-700" size={22} />
                <span className="text-gray-700">Reduced life expectancy</span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  )
}

export default About