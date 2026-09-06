import React from 'react'
import { Link } from 'react-router-dom'
import delhiImage from '../assets/essay.webp';


function Essay(){

    return(
       <section className="bg-gray-50 min-h-screen w-full py-16 px-8 flex flex-col justify-center items-center">
        <div className = "w-full max-w-6xl mx-auto space-y-10">
            <div className = "text-3xl md:text-4xl font-bold text-gray-900">
                <h2 className = "text-3xl md:text-4xl font-bold text-gray-900 text-center">
                    Essay: Delhi Air Pollution
                </h2>
            </div>
            <div className = "grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className = "w-full h-80 md:h-[380px] rounded-2xl overflow-hidden shadow-sm">
                <img
                src={delhiImage}
                alt="Delhi Air Pollution - India Gate"
                className = "w-full h-full object-cover"
                />
            </div>
              <div className="space-y-6 text-gray-700 leading-relaxed text-base md:text-lg">
            <p>
              Delhi, the capital city of India, is facing a severe air pollution crisis. Every winter, the AQI levels shoot up, turning the city into a gas chamber.
            </p>
            
            <p>
              Air pollution affects millions of lives and causes serious health issues. It is time we understand the causes, take responsibility and work together for a cleaner and healthier Delhi.
            </p>

            <p>
              The government, industries, communities and individuals all have a role to play in fighting this crisis. A clean Delhi is not just a dream, it can become our reality.
            </p>

            {/* Read More Articles Button */}
            <Link to = "/Articles">
              <button className="bg-emerald-900 hover:bg-emerald-700 text-white font-medium px-6 py-3 rounded-xl transition-all shadow-sm hover:shadow-md">
                Read More Articles
              </button>
              </Link>
            </div>
          </div>
        </div>
    </section>
  );
}
export default Essay