import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import L from "leaflet";
import { getHeatmap, getAQIColor, getAQICategory } from "../api";

// Create custom colored Leaflet pin with AQI number
const createAQIMarker = (aqiValue, isSelected = false) => {
  const color = getAQIColor(aqiValue);
  return L.divIcon({
    className: "custom-aqi-marker",
    html: `
      <div style="
        background-color: ${color};
        color: white;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        width: ${isSelected ? "44px" : "38px"};
        height: ${isSelected ? "44px" : "38px"};
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 10px rgba(0,0,0,0.35);
        border: ${isSelected ? "3px solid white" : "1.5px solid rgba(255,255,255,0.8)"};
        transition: transform 0.2s ease;
      ">
        <span style="transform: rotate(45deg); font-weight: 800; font-size: ${isSelected ? "13px" : "11px"};">
          ${aqiValue}
        </span>
      </div>
    `,
    iconSize: isSelected ? [44, 44] : [38, 38],
    iconAnchor: isSelected ? [22, 44] : [19, 38],
  });
};

const DEFAULT_STATIONS = [
  { id: "delhi_ito", name: "ITO, Central Delhi", lat: 28.6289, lon: 77.2413, aqi: 185, region: "Delhi" },
  { id: "delhi_anand_vihar", name: "Anand Vihar, East Delhi", lat: 28.6469, lon: 77.3164, aqi: 285, region: "Delhi" },
  { id: "delhi_dwarka", name: "Dwarka, South-West Delhi", lat: 28.5921, lon: 77.046, aqi: 160, region: "Delhi" },
  { id: "delhi_rohini", name: "Rohini, North Delhi", lat: 28.7325, lon: 77.119, aqi: 210, region: "Delhi" },
  { id: "delhi_punjabi_bagh", name: "Punjabi Bagh, West Delhi", lat: 28.6683, lon: 77.1167, aqi: 195, region: "Delhi" },
  { id: "noida", name: "Sector 62, Noida", lat: 28.627, lon: 77.365, aqi: 175, region: "Noida" },
  { id: "gurgaon", name: "Sector 51, Gurugram", lat: 28.431, lon: 77.043, aqi: 165, region: "Gurugram" },
  { id: "ghaziabad", name: "Vasundhara, Ghaziabad", lat: 28.6603, lon: 77.3573, aqi: 240, region: "Ghaziabad" },
  { id: "faridabad", name: "Sector 16A, Faridabad", lat: 28.4089, lon: 77.3178, aqi: 170, region: "Faridabad" },
  { id: "greater_noida", name: "Knowledge Park, Gr. Noida", lat: 28.4744, lon: 77.504, aqi: 180, region: "Gr. Noida" },
  { id: "bahadurgarh", name: "Bahadurgarh, Haryana", lat: 28.692, lon: 76.9315, aqi: 155, region: "Haryana" },
  { id: "manesar", name: "Manesar Industrial Area", lat: 28.359, lon: 76.9366, aqi: 145, region: "Gurugram" },
];

export default function Map() {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersLayerRef = useRef(null);

  const [stations, setStations] = useState(DEFAULT_STATIONS);
  const [selectedStation, setSelectedStation] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // Load Leaflet CSS
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(link);
  }, []);

  // Fetch live heatmap data from backend
  useEffect(() => {
    async function loadHeatmapData() {
      try {
        const res = await getHeatmap();
        if (res && res.markers && res.markers.length > 0) {
          const formatted = res.markers.map((m) => ({
            id: m.id,
            name: m.name,
            lat: m.lat,
            lon: m.lon,
            aqi: m.aqi || 180,
            pm25: m.pm25,
            pm10: m.pm10,
            region: m.name.includes("Noida")
              ? "Noida"
              : m.name.includes("Gurugram")
              ? "Gurugram"
              : m.name.includes("Ghaziabad")
              ? "Ghaziabad"
              : m.name.includes("Faridabad")
              ? "Faridabad"
              : "Delhi",
          }));
          setStations(formatted);
        }
      } catch (err) {
        console.warn("Backend heatmap not responding, using baseline station network.");
      }
    }
    loadHeatmapData();
  }, []);

  // Initialize Map
  useEffect(() => {
    if (!mapRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapRef.current).setView([28.6139, 77.209], 10);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      markersLayerRef.current = L.layerGroup().addTo(map);
      mapInstanceRef.current = map;
    }
  }, []);

  // Render Markers on Map whenever stations or selectedRegion changes
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;

    markersLayerRef.current.clearLayers();

    const filtered =
      selectedRegion === "All"
        ? stations
        : stations.filter((s) => s.region === selectedRegion);

    filtered.forEach((st) => {
      const isSel = selectedStation?.id === st.id;
      const marker = L.marker([st.lat, st.lon], {
        icon: createAQIMarker(st.aqi, isSel),
      });

      const cat = getAQICategory(st.aqi);
      const color = getAQIColor(st.aqi);

      marker.bindPopup(`
        <div style="font-family: system-ui, sans-serif; min-width: 180px; padding: 4px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
            <strong style="font-size: 13px; color: #1e293b;">${st.name}</strong>
          </div>
          <div style="display: flex; align-items: center; gap: 8px; margin: 6px 0;">
            <span style="font-size: 22px; font-weight: 900; color: ${color};">${st.aqi}</span>
            <span style="font-size: 11px; font-weight: 700; color: white; background: ${color}; padding: 2px 8px; border-radius: 9999px;">${cat}</span>
          </div>
          <div style="font-size: 11px; color: #64748b; margin-bottom: 8px;">
            ${st.pm25 ? `PM2.5: <b>${st.pm25} µg/m³</b>` : "Real-time Telemetry"}
          </div>
          <a href="#/dashboard" style="display: block; text-align: center; font-size: 11px; font-weight: 700; color: white; background: #059669; padding: 6px 10px; border-radius: 8px; text-decoration: none;">
            View Detailed 72h Forecast →
          </a>
        </div>
      `);

      marker.on("click", () => {
        setSelectedStation(st);
      });

      markersLayerRef.current.addLayer(marker);
    });
  }, [stations, selectedRegion, selectedStation]);

  const handleUseMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          if (mapInstanceRef.current) {
            mapInstanceRef.current.setView([lat, lon], 13);
            L.circleMarker([lat, lon], {
              radius: 9,
              fillColor: "#2563eb",
              color: "#ffffff",
              weight: 3,
              fillOpacity: 1,
            })
              .addTo(mapInstanceRef.current)
              .bindPopup("<b>Your Current Location</b>")
              .openPopup();
          }
        },
        () => alert("Location access denied or unavailable.")
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchQuery + ", Delhi NCR, India"
        )}&limit=1`
      );
      const data = await res.json();
      if (data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);
        if (mapInstanceRef.current) {
          mapInstanceRef.current.setView([lat, lon], 12);
        }
      } else {
        alert("Location not found in Delhi NCR. Try an area like 'Connaught Place' or 'Noida 62'.");
      }
    } catch (err) {
      alert("Search request timed out. Check network connection.");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-20 px-6 lg:px-12 pb-16">
      {/* ── Header ── */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full mb-1">
            <span>🌐</span> Geospatial Coupled Network
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Delhi NCR Air Quality Station Network
          </h2>
          <p className="text-slate-600 text-xs mt-0.5">
            Interactive monitoring across 12 continuous ambient air quality stations (CAAQMS) with live EPA category markers.
          </p>
        </div>

        {/* Search & Location Bar */}
        <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
          <input
            type="text"
            placeholder="Search locality (e.g. Dwarka, Noida)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="px-4 py-2 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm w-full sm:w-64"
          />
          <button
            onClick={handleSearch}
            disabled={isSearching}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-sm font-semibold transition-all shadow-sm"
          >
            {isSearching ? "Searching..." : "🔍 Find"}
          </button>
          <button
            onClick={handleUseMyLocation}
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-sm font-semibold transition-all shadow-sm flex items-center gap-1"
          >
            <span>📍</span> My Location
          </button>
        </div>
      </div>

      {/* ── Region Filter Tabs ── */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="text-xs font-bold text-slate-500 mr-1 uppercase">Filter District:</span>
        {["All", "Delhi", "Noida", "Gurugram", "Ghaziabad", "Faridabad"].map((reg) => (
          <button
            key={reg}
            onClick={() => setSelectedRegion(reg)}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              selectedRegion === reg
                ? "bg-emerald-800 text-white shadow-sm"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            {reg}
          </button>
        ))}
      </div>

      {/* ── Map Container & Details Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Leaflet Map Box */}
        <div className="lg:col-span-8 bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm relative">
          <div ref={mapRef} className="w-full h-[540px] z-10" />

          {/* Map Color Legend */}
          <div className="absolute bottom-4 left-4 z-20 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg border border-slate-200 text-xs">
            <span className="font-bold text-slate-700 block mb-1">AQI Color Spectrum</span>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-600" /> 0-50</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-yellow-500" /> 51-100</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-orange-500" /> 101-200</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-red-600" /> 201-300</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-purple-700" /> 301+</span>
            </div>
          </div>
        </div>

        {/* Station Leaderboard & Selection Panel */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between max-h-[540px] overflow-y-auto">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-800 text-sm">Station Telemetry Status</h3>
              <span className="text-[11px] font-bold text-slate-400">
                {stations.length} Active Stations
              </span>
            </div>

            <div className="space-y-2.5 mt-3">
              {stations.map((st) => {
                const color = getAQIColor(st.aqi);
                const isSelected = selectedStation?.id === st.id;
                return (
                  <div
                    key={st.id}
                    onClick={() => {
                      setSelectedStation(st);
                      if (mapInstanceRef.current) {
                        mapInstanceRef.current.setView([st.lat, st.lon], 13);
                      }
                    }}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? "border-emerald-600 bg-emerald-50/60 shadow-sm"
                        : "border-slate-100 hover:border-slate-300 bg-slate-50/50"
                    }`}
                  >
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{st.name}</h4>
                      <span className="text-[10px] text-slate-500">{st.region} Zone</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className="text-sm font-black px-2.5 py-1 rounded-xl text-white shadow-sm"
                        style={{ backgroundColor: color }}
                      >
                        {st.aqi}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100">
            <Link
              to="/dashboard"
              className="w-full block text-center bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs py-3 rounded-xl transition-all shadow-md"
            >
              Analyze Station in Deep ML Dashboard →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}