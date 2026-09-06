import React from "react";
import { useParams, Link } from "react-router-dom";
import { causesData } from "./Causes";

export default function CausesDetail() {
  const { id } = useParams();
  const cause = causesData.find((s) => s.id === Number(id));

  if (!cause) {
    return (
      <div className="px-10 py-16 text-center">
        <p className="text-gray-500">Cause not found.</p>

        <Link
          to="/causes"
          className="text-green-700 underline"
        >
          ← Back to Causes
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-white">

      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden min-h-[500px]">

        {/* Background Image */}
        <img
          src={cause.image}
          alt={cause.title}
          className="absolute inset-0 w-full h-full object-cover object-right"
        />

        {/* White Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/10"></div>

        {/* Hero Content */}
        <div className="relative z-10 px-10 pt-8 pb-12 min-h-[500px] flex items-center">

          <div className="w-full lg:w-[55%]">

            {/* Back Button */}
            <Link
              to="/solutions"
              className="text-green-700 text-sm font-medium hover:underline mb-8 inline-block"
            >
              ← Back to Causes
            </Link>

            {/* Title */}
            <div className="flex items-center gap-4 mb-5">

              <div className="text-3xl w-16 h-16 flex items-center justify-center bg-white rounded-2xl shadow-md border border-gray-100">
                {cause.icon}
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
                {cause.title}
              </h1>

            </div>

            {/* Short Description */}
            <p className="text-gray-600 mb-7 text-base">
              {cause.description}
            </p>

            {/* Content Card */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-6 flex gap-4 max-w-[620px]">

              <span className="text-2xl flex-shrink-0">
                🌱
              </span>

              <p className="text-gray-700 leading-relaxed text-sm">
                {cause.content}
              </p>

            </div>

          </div>

        </div>
      </section>


      {/* ================= IMPACT SECTION ================= */}
      {cause.impact && (
        <section className="px-10 py-10 text-center">

          <h2 className="text-lg font-bold text-green-700 mb-1 inline-block border-b-2 border-green-700 pb-1">
            Impact
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">

            {cause.impact.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-100 p-5 flex items-start gap-3 text-left shadow-sm"
              >

                {/* Icon */}
                <div className="w-11 h-11 flex-shrink-0 flex items-center justify-center bg-green-600 text-white rounded-full text-lg">
                  {item.icon}
                </div>

                {/* Text */}
                <div>
                  <h3 className="font-bold text-gray-900 text-sm mb-1">
                    {item.title}
                  </h3>

                  <p className="text-xs text-gray-600">
                    {item.desc}
                  </p>
                </div>

              </div>
            ))}

          </div>

        </section>
      )}

   
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
