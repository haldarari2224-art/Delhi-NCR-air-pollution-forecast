import React, { useState, useEffect } from "react";
import bgImage from "../assets/delhi-air-pollution.png";
import { Link } from "react-router-dom";
import { getCurrentAQI, getAQIColor, getAQICategory } from "../api";
import QRCodeModal from "./QRCodeModal";

function HeroSection() {
  const [showQR, setShowQR] = useState(false);
  const [aqiData, setAqiData] = useState({
    aqi: 167,
    pm25: 115,
    pm10: 188,
    category: "Unhealthy (Delhi)",
    topPollutant: "PM2.5",
    updatedAt: "Live",
  });

  useEffect(() => {
    async function loadLiveTelemetry() {
      try {
        const res = await getCurrentAQI("delhi_ito");
        if (res && res.aqi) {
          setAqiData({
            aqi: res.aqi,
            pm25: res.pollutants?.pm25 ?? 115,
            pm10: res.pollutants?.pm10 ?? 188,
            category: `${res.category || getAQICategory(res.aqi)} (${res.station?.name?.split(",")[0] || "Delhi"})`,
            topPollutant: "PM2.5",
            updatedAt: "Live API Connected",
          });
        }
      } catch (e) {
        // Keep baseline
      }
    }
    loadLiveTelemetry();
  }, []);

  const aqiColor = getAQIColor(aqiData.aqi);

  return (
    <>
    <div
      className="relative w-full min-h-[640px] bg-cover bg-center px-6 lg:px-12 py-16 sm:py-20 flex flex-col justify-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-2xl">
        {/* Brand Name in Top White Space */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-emerald-900 via-emerald-800 to-teal-600 flex items-center justify-center text-white shadow-lg shadow-emerald-950/20 shrink-0">
            <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
              <path d="M7 15h6" />
              <path d="M9 19h8" />
            </svg>
          </div>
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-emerald-950 font-sans leading-none flex items-center gap-1.5">
              AirNova<span className="text-emerald-600">72</span>
            </h2>
            <p className="text-[11px] sm:text-xs uppercase tracking-widest font-extrabold text-emerald-800/80 mt-1">
              Next-Gen Atmospheric Intelligence
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 bg-emerald-900/10 text-emerald-900 font-bold text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-4 border border-emerald-900/20">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
          Coupled Weather & Air Forecasting System
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight leading-none mb-4">
          Delhi NCR
          <span className="block text-emerald-900">Air Pollution</span>
        </h1>

        <p className="text-slate-800 text-lg sm:text-xl font-medium mb-8 leading-relaxed max-w-xl">
          Coupling boundary layer meteorology with advanced machine learning to forecast 72-hour air quality and particulate dispersion.
        </p>

        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <Link
            to="/dashboard"
            className="bg-emerald-800 hover:bg-emerald-700 text-white px-6 sm:px-7 py-3.5 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl flex items-center gap-2 text-sm sm:text-base"
          >
            <span>📊</span> View 72-Hr ML Forecast
          </Link>

          <Link
            to="/map"
            className="bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 px-5 sm:px-6 py-3.5 rounded-xl font-bold transition-all shadow-sm flex items-center gap-2 text-sm sm:text-base"
          >
            <span>🗺️</span> Regional Heatmap
          </Link>

          <button
            onClick={() => setShowQR(true)}
            className="bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300/80 px-4 sm:px-5 py-3.5 rounded-xl font-bold transition-all shadow-sm flex items-center gap-2 text-sm sm:text-base cursor-pointer"
            title="Scan QR code to open website on mobile"
          >
            <span>📱</span> Scan QR
          </button>

          <Link
            to="/issues"
            className="text-emerald-950 hover:text-emerald-700 font-bold text-sm px-2 py-3.5 transition-colors"
          >
            Explore Causes & Solutions →
          </Link>
        </div>
      </div>

      {/* Live Telemetry Ticker Card */}
      <div className="relative z-10 max-w-4xl grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-100 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl p-6 mt-12 border border-slate-200/80">
        <div className="text-center p-3">
          <h2 className="text-4xl font-black tracking-tight" style={{ color: aqiColor }}>
            {aqiData.aqi}
          </h2>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mt-1">Current AQI</p>
          <p className="text-xs font-semibold mt-0.5" style={{ color: aqiColor }}>
            {aqiData.category}
          </p>
        </div>

        <div className="text-center p-3">
          <h2 className="text-2xl font-extrabold text-slate-800">
            {aqiData.pm25} <span className="text-sm font-semibold text-slate-500">µg/m³</span>
          </h2>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mt-1">PM2.5 Level</p>
          <p className="text-xs font-semibold text-red-600 mt-0.5">
            {aqiData.pm25 > 60 ? "Above Safe Limit" : "Moderate"}
          </p>
        </div>

        <div className="text-center p-3">
          <h2 className="text-2xl font-extrabold text-slate-800">
            {aqiData.pm10} <span className="text-sm font-semibold text-slate-500">µg/m³</span>
          </h2>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mt-1">PM10 Level</p>
          <p className="text-xs font-semibold text-red-600 mt-0.5">
            {aqiData.pm10 > 100 ? "Dust Exceedance" : "Within Norms"}
          </p>
        </div>

        <div className="text-center p-3">
          <h2 className="text-2xl font-extrabold text-slate-800">
            {aqiData.topPollutant}
          </h2>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mt-1">Primary Driver</p>
          <p className="text-xs font-semibold text-slate-600 mt-0.5">
            Respirable Micro-Aerosols
          </p>
        </div>
      </div>
    </div>
    <QRCodeModal isOpen={showQR} onClose={() => setShowQR(false)} />
    </>
  );
}

export default HeroSection;