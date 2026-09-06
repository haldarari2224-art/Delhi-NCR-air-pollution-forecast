import React from "react";
import { Link } from "react-router-dom";

import pollutionImage from "../assets/Explore.jpg";

export default function Issues() {
  return (
     <div className="w-full min-h-screen bg-white text-gray-900">

   

      {/* ================= HERO ================= */}
      <section className="px-6 lg:px-12 py-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

          {/* LEFT */}
          <div>

            <span className="inline-block bg-green-50 text-green-700 text-xs font-semibold px-4 py-2 rounded-full mb-5">
              AIR POLLUTION
            </span>

            <h1 className="text-4xl lg:text-5xl font-bold leading-tight max-w-xl">
              Understanding
              <br />
              Air Pollution
            </h1>

            <p className="text-gray-600 mt-4 max-w-lg leading-relaxed">
              Air pollution affects everything we do. From the air we breathe
              to our health and environment — understand the issue, its causes,
              and how we can create a cleaner tomorrow.
            </p>

            <div className="flex gap-4 mt-6">

              <Link 
          to="/issues/takeactions"
          className="bg-white text-green-700 px-6 py-3 rounded-full text-sm font-semibold whitespace-nowrap">
            🌿What can we do ?
          </Link>


              <button className="text-gray-700 px-4 py-3 text-sm font-medium">
                ▶ Watch explainer
              </button>

            </div>

          </div>


          {/* RIGHT IMAGE + AQI */}
          <div className="relative">

            <img
              src={pollutionImage}
              alt="Air pollution in Delhi"
              className="w-full h-[280px] object-cover rounded-3xl"
            />

            {/* AQI CARD */}
            <div className="absolute bottom-5 right-5 bg-white rounded-2xl shadow-lg px-5 py-4 min-w-[150px]">

              <p className="text-[10px] text-gray-500 font-medium">
                CURRENT AQI ⓘ
              </p>

              <p className="text-4xl font-bold text-red-500">
                167
              </p>

              <p className="text-sm font-semibold text-red-500">
                Unhealthy (Delhi)
              </p>

              <div className="flex items-center gap-1 mt-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-[9px] text-gray-500">
                  Updated just now
                </span>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= WHAT IS AIR POLLUTION ================= */}
      <section className="px-6 lg:px-12 pb-6">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

          {/* WHAT IS */}
          <div className="border border-gray-100 rounded-2xl p-5 shadow-sm">

            <div className="flex gap-4">

              <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-xl">
                🌿
              </div>

              <div>
                <h2 className="font-bold text-sm mb-2">
                  What is Air Pollution?
                </h2>

                <p className="text-xs text-gray-600 leading-relaxed">
                  Air pollution is the presence of harmful substances in the
                  air that can harm human health and the planet. These
                  pollutants come from natural sources as well as human
                  activities.
                </p>
               <br></br>
                <Link 
          to="/issues/knowmore"
          className="bg-white text-green-700 px-6 py-3 rounded-20% text-sm font-semibold whitespace-nowrap">
            Know more
          </Link>
              </div>

            </div>

          </div>


          {/* WHY */}
          <div>

            <h2 className="font-bold text-sm mb-3">
              Why is it happening?
            </h2>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">

              <CauseCard
                icon="🚗"
                title="Vehicle Emissions"
                text="Exhaust from cars, buses and other vehicles adds harmful gases."
              />

              <CauseCard
                icon="🏭"
                title="Industrial Pollution"
                text="Factories and power plants release pollutants into air."
              />

              <CauseCard
                icon="🏗️"
                title="Construction Dust"
                text="Construction activities release dust particles into the air."
              />

              <CauseCard
                icon="🔥"
                title="Crop Burning"
                text="Burning crops releases smoke and harmful pollutants."
              />

            </div>

          </div>

        </div>

      </section>


      {/* ================= LOWER CONTENT ================= */}
      <section className="px-6 lg:px-12 pb-8">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">


          {/* HOW IT AFFECTS US */}
          <div>

            <h2 className="font-bold text-sm mb-3">
              How it affects us
            </h2>

            <div className="grid grid-cols-3 gap-2">

              <ImpactCard
                icon="❤️"
                title="Health"
                text="Increases respiratory problems and other diseases."
              />

              <ImpactCard
                icon="🌿"
                title="Environment"
                text="Leads to climate damage and environmental changes."
              />

              <ImpactCard
                icon="👤"
                title="Daily Life"
                text="Affects outdoor activities and quality of life."
              />

            </div>

          </div>


          {/* AQI SCALE */}
          <div className="border border-gray-100 rounded-2xl p-5 shadow-sm">

            <h2 className="font-bold text-sm mb-5">
              AQI Scale
            </h2>

            <div className="relative">

              <div className="w-full h-3 rounded-full bg-gradient-to-r from-green-500 via-yellow-400 via-orange-500 to-red-700"></div>

              <div className="absolute left-[48%] -top-2 w-5 h-5 bg-red-500 rounded-full border-2 border-white shadow"></div>

              <div className="text-center mt-2">
                <span className="bg-red-500 text-white text-[9px] px-2 py-1 rounded">
                  167
                </span>
              </div>

            </div>

            <div className="flex justify-between text-[9px] text-gray-500 mt-5">
              <span>Good</span>
              <span>Moderate</span>
              <span>Unhealthy</span>
              <span>Very Unhealthy</span>
              <span>Hazardous</span>
            </div>

          </div>


          {/* WHAT CAN WE DO */}
          <div className="border border-gray-100 rounded-2xl p-5 shadow-sm">

            <h2 className="font-bold text-sm mb-4">
              What can we do?
            </h2>

            <ActionItem
              icon="🚲"
              title="Use public transport, carpool or cycle"
              text="Reduce vehicle emissions."
            />

            <ActionItem
              icon="🌱"
              title="Save energy"
              text="Use clean and renewable energy."
            />

            <ActionItem
              icon="♻️"
              title="Avoid burning waste or leaves"
              text="Prevent harmful smoke."
            />

            <ActionItem
              icon="🌳"
              title="Plant more trees"
              text="Help clean the air we breathe."
            />

          </div>

        </div>

      </section>


      {/* ================= BOTTOM CTA ================= */}
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
  );
}


/* ================================================= */
/* COMPONENTS */
/* ================================================= */

function CauseCard({ icon, title, text }) {
  return (
    <div className="border border-gray-100 rounded-xl p-3 shadow-sm">

      <div className="text-xl mb-2">
        {icon}
      </div>

      <h3 className="font-semibold text-[11px]">
        {title}
      </h3>

      <p className="text-[9px] text-gray-500 mt-1 leading-relaxed">
        {text}
      </p>

    </div>
  );
}


function ImpactCard({ icon, title, text }) {
  return (
    <div className="border border-gray-100 rounded-xl p-3 shadow-sm">

      <div className="text-lg mb-1">
        {icon}
      </div>

      <h3 className="font-semibold text-[11px]">
        {title}
      </h3>

      <p className="text-[9px] text-gray-500 mt-1">
        {text}
      </p>

    </div>
  );
}


function ActionItem({ icon, title, text }) {
  return (
    <div className="flex gap-3 mb-3">

      <div className="text-lg">
        {icon}
      </div>

      <div>
        <h3 className="font-semibold text-[10px]">
          {title}
        </h3>

        <p className="text-[9px] text-gray-500">
          {text}
        </p>
      </div>

    </div>
  );
}