"""
FastAPI Backend — Air Pollution Weather Coupled Forecasting System
Delhi NCR focused. Uses Open-Meteo (free, no API key) for data.

Endpoints:
  GET /api/current-aqi?station_id=delhi_ito
  GET /api/stations
  GET /api/forecast?station_id=delhi_ito
  GET /api/historical?station_id=delhi_ito&hours=168
  GET /api/heatmap
  GET /api/health-advisory?station_id=delhi_ito
"""

import os
import asyncio
from contextlib import asynccontextmanager
from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from apscheduler.schedulers.asyncio import AsyncIOScheduler

import database  # noqa — initializes DB on import
from data_fetcher import (
    STATIONS, fetch_all_stations, fetch_air_quality,
    fetch_weather, fetch_forecast_weather, get_station_by_id
)
from database import (
    get_latest_aqi, get_latest_weather,
    get_historical_aqi, get_historical_weather,
    get_all_stations_latest
)
from ml.predict import predict_aqi, get_health_advisory

# ── Scheduler for periodic data fetching ───────────────────────────────
scheduler = AsyncIOScheduler()


async def scheduled_fetch():
    """Run every hour — fetch fresh data for all stations."""
    print("[Scheduler] Fetching data for all stations...")
    try:
        await fetch_all_stations()
        print("[Scheduler] [OK] Data fetch complete")
    except Exception as e:
        print(f"[Scheduler] [Error]: {e}")


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup/shutdown lifecycle."""
    # Initial data fetch
    print("[Startup] Starting up - fetching initial data...")
    try:
        await fetch_all_stations()
        print("[Startup] [OK] Initial data loaded")
    except Exception as e:
        print(f"[Startup] [Warning] Initial fetch failed (will retry): {e}")

    # Schedule hourly refreshes
    scheduler.add_job(scheduled_fetch, "interval", minutes=60)
    scheduler.start()

    yield

    # Shutdown
    scheduler.shutdown()


# ── FastAPI App ────────────────────────────────────────────────────────
app = FastAPI(
    title="Delhi NCR AQI Forecasting API",
    description="Air Pollution Weather Coupled Forecasting System",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS — allow frontend dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ── Endpoint: Current AQI ─────────────────────────────────────────────
@app.get("/api/current-aqi")
async def current_aqi(station_id: str = Query("delhi_ito")):
    """Get current AQI + weather for a specific station."""
    station = get_station_by_id(station_id)
    if not station:
        raise HTTPException(404, f"Station '{station_id}' not found")

    # Try DB first
    aqi_data = get_latest_aqi(station_id)
    weather_data = get_latest_weather(station_id)

    # If no data in DB, fetch fresh
    if not aqi_data:
        import httpx
        async with httpx.AsyncClient() as client:
            aqi_data_raw = await fetch_air_quality(station, client)
            weather_data_raw = await fetch_weather(station, client)
        if aqi_data_raw:
            aqi_data = aqi_data_raw
            weather_data = weather_data_raw
        else:
            raise HTTPException(503, "Could not fetch AQI data. Try again later.")

    return {
        "station": {
            "id": station_id,
            "name": station["name"],
            "lat": station["lat"],
            "lon": station["lon"],
        },
        "aqi": aqi_data.get("aqi", 0),
        "pollutants": {
            "pm25": aqi_data.get("pm25", 0),
            "pm10": aqi_data.get("pm10", 0),
            "no2": aqi_data.get("no2", 0),
            "so2": aqi_data.get("so2", 0),
            "o3": aqi_data.get("o3", 0),
            "co": aqi_data.get("co", 0),
        },
        "weather": {
            "temperature": weather_data.get("temperature", 0) if weather_data else 0,
            "humidity": weather_data.get("humidity", 0) if weather_data else 0,
            "wind_speed": weather_data.get("wind_speed", 0) if weather_data else 0,
            "wind_direction": weather_data.get("wind_direction", 0) if weather_data else 0,
            "pressure": weather_data.get("pressure", 0) if weather_data else 0,
        },
        "timestamp": aqi_data.get("timestamp", ""),
        "category": _get_category_label(aqi_data.get("aqi", 0)),
    }


# ── Endpoint: All Stations ────────────────────────────────────────────
@app.get("/api/stations")
async def list_stations():
    """List all Delhi NCR stations with their latest AQI."""
    db_data = get_all_stations_latest()

    stations = []
    for s in STATIONS:
        db_entry = next((d for d in db_data if d["station_id"] == s["id"]), None)
        stations.append({
            "id": s["id"],
            "name": s["name"],
            "lat": s["lat"],
            "lon": s["lon"],
            "aqi": db_entry["aqi"] if db_entry else None,
            "pm25": db_entry["pm25"] if db_entry else None,
            "timestamp": db_entry["timestamp"] if db_entry else None,
            "category": _get_category_label(db_entry["aqi"]) if db_entry else "Unknown",
        })

    return {"stations": stations}


# ── Endpoint: Forecast ─────────────────────────────────────────────────
@app.get("/api/forecast")
async def forecast(station_id: str = Query("delhi_ito")):
    """Get 72-hour AQI forecast using the ML model."""
    station = get_station_by_id(station_id)
    if not station:
        raise HTTPException(404, f"Station '{station_id}' not found")

    # Get current AQI
    aqi_data = get_latest_aqi(station_id)
    current = aqi_data["aqi"] if aqi_data else 100  # fallback

    # Get recent AQI history for lag features
    history = get_historical_aqi(station_id, hours=24)
    recent_values = [h["aqi"] for h in history] if history else [current] * 24
    recent_values.reverse()  # newest first

    # Fetch weather forecast from Open-Meteo
    import httpx
    async with httpx.AsyncClient() as client:
        weather_forecast = await fetch_forecast_weather(station, client)

    if not weather_forecast:
        weather_forecast = []

    # Run ML prediction
    try:
        predictions = predict_aqi(current, weather_forecast, recent_values)
    except Exception as e:
        print(f"[Forecast Error] {e}")
        predictions = []

    return {
        "station": {
            "id": station_id,
            "name": station["name"],
        },
        "current_aqi": current,
        "forecast": predictions,
    }


# ── Endpoint: Historical ──────────────────────────────────────────────
@app.get("/api/historical")
async def historical(
    station_id: str = Query("delhi_ito"),
    hours: int = Query(168, ge=1, le=720),
):
    """Get historical AQI data for charts."""
    station = get_station_by_id(station_id)
    if not station:
        raise HTTPException(404, f"Station '{station_id}' not found")

    aqi_history = get_historical_aqi(station_id, hours)
    weather_history = get_historical_weather(station_id, hours)

    return {
        "station": {"id": station_id, "name": station["name"]},
        "aqi_data": aqi_history,
        "weather_data": weather_history,
    }


# ── Endpoint: Heatmap ─────────────────────────────────────────────────
@app.get("/api/heatmap")
async def heatmap():
    """Get AQI for all stations — used by the Map component."""
    db_data = get_all_stations_latest()

    # If DB is empty, fetch fresh
    if not db_data:
        await fetch_all_stations()
        db_data = get_all_stations_latest()

    markers = []
    for s in STATIONS:
        db_entry = next((d for d in db_data if d["station_id"] == s["id"]), None)
        aqi = db_entry["aqi"] if db_entry else None
        markers.append({
            "id": s["id"],
            "name": s["name"],
            "lat": s["lat"],
            "lon": s["lon"],
            "aqi": aqi,
            "pm25": db_entry["pm25"] if db_entry else None,
            "pm10": db_entry["pm10"] if db_entry else None,
            "color": _get_aqi_color(aqi) if aqi else "#999",
            "category": _get_category_label(aqi) if aqi else "Unknown",
            "timestamp": db_entry["timestamp"] if db_entry else None,
        })

    return {"markers": markers}


# ── Endpoint: Health Advisory ──────────────────────────────────────────
@app.get("/api/health-advisory")
async def health_advisory(station_id: str = Query("delhi_ito")):
    """Get health recommendations based on current AQI."""
    aqi_data = get_latest_aqi(station_id)
    if not aqi_data:
        raise HTTPException(404, "No data for this station yet")

    advisory = get_health_advisory(aqi_data["aqi"])
    advisory["station"] = station_id
    return advisory


# ── Helper functions ───────────────────────────────────────────────────
def _get_aqi_color(aqi: int) -> str:
    if aqi <= 50:
        return "#4caf50"
    elif aqi <= 100:
        return "#ffeb3b"
    elif aqi <= 150:
        return "#ff9800"
    elif aqi <= 200:
        return "#f44336"
    elif aqi <= 300:
        return "#9c27b0"
    else:
        return "#7e0023"


def _get_category_label(aqi: int) -> str:
    if aqi is None:
        return "Unknown"
    if aqi <= 50:
        return "Good"
    elif aqi <= 100:
        return "Moderate"
    elif aqi <= 150:
        return "Unhealthy for Sensitive Groups"
    elif aqi <= 200:
        return "Unhealthy"
    elif aqi <= 300:
        return "Very Unhealthy"
    else:
        return "Hazardous"


# ── Serve Merged Frontend (SPA) ───────────────────────────────────────
DIST_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "my-project", "dist"))
if os.path.exists(DIST_DIR):
    assets_dir = os.path.join(DIST_DIR, "assets")
    if os.path.exists(assets_dir):
        app.mount("/assets", StaticFiles(directory=assets_dir), name="assets")

    @app.get("/{full_path:path}")
    async def serve_frontend(full_path: str = ""):
        # Pass through API routes and docs
        if full_path.startswith("api/") or full_path in ("docs", "redoc", "openapi.json"):
            raise HTTPException(status_code=404, detail="Not Found")

        file_path = os.path.join(DIST_DIR, full_path)
        if full_path and os.path.isfile(file_path):
            return FileResponse(file_path)

        index_file = os.path.join(DIST_DIR, "index.html")
        if os.path.isfile(index_file):
            return FileResponse(index_file)

        return {"message": "Delhi Air Pollution Forecasting System API is online."}


# ── Run directly ───────────────────────────────────────────────────────
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
