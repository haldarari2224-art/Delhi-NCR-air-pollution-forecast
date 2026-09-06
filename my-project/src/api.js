/**
 * Centralized API client for the AQI Forecasting backend.
 * All API calls go through here for consistent error handling.
 */

const API_BASE =
  typeof window !== "undefined" && window.location.port === "5173"
    ? "http://localhost:8000"
    : "";

async function apiFetch(endpoint, params = {}) {
  const origin = typeof window !== "undefined" ? window.location.origin : "http://localhost:8000";
  const url = new URL(`${API_BASE}${endpoint}`, origin);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null) url.searchParams.set(k, v);
  });

  try {
    const res = await fetch(url.toString());
    if (!res.ok) {
      throw new Error(`API Error ${res.status}: ${res.statusText}`);
    }
    return await res.json();
  } catch (err) {
    console.error(`[API] ${endpoint} failed:`, err);
    throw err;
  }
}

/** Get current AQI + weather for a station */
export async function getCurrentAQI(stationId = "delhi_ito") {
  return apiFetch("/api/current-aqi", { station_id: stationId });
}

/** Get all Delhi NCR stations with latest AQI */
export async function getStations() {
  return apiFetch("/api/stations");
}

/** Get 72-hour ML-powered AQI forecast */
export async function getForecast(stationId = "delhi_ito") {
  return apiFetch("/api/forecast", { station_id: stationId });
}

/** Get historical AQI data (past N hours) */
export async function getHistorical(stationId = "delhi_ito", hours = 168) {
  return apiFetch("/api/historical", { station_id: stationId, hours });
}

/** Get AQI data for all stations (for map markers) */
export async function getHeatmap() {
  return apiFetch("/api/heatmap");
}

/** Get health advisory for current AQI level */
export async function getHealthAdvisory(stationId = "delhi_ito") {
  return apiFetch("/api/health-advisory", { station_id: stationId });
}

/** AQI → color mapping (client-side) */
export function getAQIColor(aqi) {
  if (aqi <= 50) return "#4caf50";
  if (aqi <= 100) return "#c6b820";
  if (aqi <= 150) return "#ff9800";
  if (aqi <= 200) return "#f44336";
  if (aqi <= 300) return "#9c27b0";
  return "#7e0023";
}

/** AQI → category label */
export function getAQICategory(aqi) {
  if (aqi <= 50) return "Good";
  if (aqi <= 100) return "Moderate";
  if (aqi <= 150) return "Unhealthy for Sensitive";
  if (aqi <= 200) return "Unhealthy";
  if (aqi <= 300) return "Very Unhealthy";
  return "Hazardous";
}

/** AQI → background gradient for cards */
export function getAQIGradient(aqi) {
  if (aqi <= 50) return "linear-gradient(135deg, #43a047, #66bb6a)";
  if (aqi <= 100) return "linear-gradient(135deg, #f9a825, #fdd835)";
  if (aqi <= 150) return "linear-gradient(135deg, #ef6c00, #ff9800)";
  if (aqi <= 200) return "linear-gradient(135deg, #c62828, #ef5350)";
  if (aqi <= 300) return "linear-gradient(135deg, #6a1b9a, #ab47bc)";
  return "linear-gradient(135deg, #4a0010, #7e0023)";
}
