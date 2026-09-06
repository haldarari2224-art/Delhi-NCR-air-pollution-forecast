"""
Data Fetcher — pulls real-time AQI + weather data from Open-Meteo APIs.
Open-Meteo is completely free and requires no API keys.

Delhi NCR stations are defined here with their coordinates.
"""

import httpx
import asyncio
from datetime import datetime, timezone
from database import (
    insert_aqi_reading, insert_weather_reading
)

# ── Delhi NCR monitoring stations ──────────────────────────────────────
STATIONS = [
    {"id": "delhi_ito",        "name": "ITO, Delhi",              "lat": 28.6289, "lon": 77.2413},
    {"id": "delhi_anand_vihar","name": "Anand Vihar, Delhi",      "lat": 28.6469, "lon": 77.3164},
    {"id": "delhi_dwarka",     "name": "Dwarka, Delhi",           "lat": 28.5921, "lon": 77.0460},
    {"id": "delhi_rohini",     "name": "Rohini, Delhi",           "lat": 28.7325, "lon": 77.1190},
    {"id": "delhi_punjabi_bagh","name": "Punjabi Bagh, Delhi",    "lat": 28.6683, "lon": 77.1167},
    {"id": "noida",            "name": "Sector 62, Noida",        "lat": 28.6270, "lon": 77.3650},
    {"id": "gurgaon",          "name": "Sector 51, Gurugram",     "lat": 28.4310, "lon": 77.0430},
    {"id": "ghaziabad",        "name": "Vasundhara, Ghaziabad",   "lat": 28.6603, "lon": 77.3573},
    {"id": "faridabad",        "name": "Sector 16A, Faridabad",   "lat": 28.4089, "lon": 77.3178},
    {"id": "greater_noida",    "name": "Knowledge Park, Gr. Noida","lat": 28.4744, "lon": 77.5040},
    {"id": "bahadurgarh",      "name": "Bahadurgarh, Haryana",    "lat": 28.6920, "lon": 76.9315},
    {"id": "manesar",          "name": "Manesar, Gurugram",       "lat": 28.3590, "lon": 76.9366},
]


def _compute_aqi_from_pm25(pm25: float) -> int:
    """
    Compute US EPA AQI from PM2.5 concentration (µg/m³).
    Uses the standard breakpoint table.
    """
    breakpoints = [
        (0.0,   12.0,   0,   50),
        (12.1,  35.4,  51,  100),
        (35.5,  55.4, 101,  150),
        (55.5, 150.4, 151,  200),
        (150.5, 250.4, 201, 300),
        (250.5, 350.4, 301, 400),
        (350.5, 500.4, 401, 500),
    ]
    for c_lo, c_hi, i_lo, i_hi in breakpoints:
        if c_lo <= pm25 <= c_hi:
            return round((i_hi - i_lo) / (c_hi - c_lo) * (pm25 - c_lo) + i_lo)
    return 500 if pm25 > 500 else 0


async def fetch_air_quality(station: dict, client: httpx.AsyncClient):
    """
    Fetch current air quality from Open-Meteo Air Quality API.
    Returns dict with pollutant concentrations.
    """
    url = "https://air-quality-api.open-meteo.com/v1/air-quality"
    params = {
        "latitude": station["lat"],
        "longitude": station["lon"],
        "current": "pm10,pm2_5,nitrogen_dioxide,sulphur_dioxide,ozone,carbon_monoxide",
        "timezone": "Asia/Kolkata",
    }
    try:
        resp = await client.get(url, params=params, timeout=15.0)
        resp.raise_for_status()
        data = resp.json()
        current = data.get("current", {})

        pm25 = current.get("pm2_5", 0) or 0
        pm10 = current.get("pm10", 0) or 0
        no2 = current.get("nitrogen_dioxide", 0) or 0
        so2 = current.get("sulphur_dioxide", 0) or 0
        o3 = current.get("ozone", 0) or 0
        co = current.get("carbon_monoxide", 0) or 0
        aqi = _compute_aqi_from_pm25(pm25)

        timestamp = current.get("time", datetime.now().isoformat())

        insert_aqi_reading(
            station["id"], station["name"], station["lat"], station["lon"],
            timestamp, aqi, pm25, pm10, no2, so2, o3, co
        )

        return {
            "station_id": station["id"],
            "station_name": station["name"],
            "lat": station["lat"],
            "lon": station["lon"],
            "timestamp": timestamp,
            "aqi": aqi,
            "pm25": pm25,
            "pm10": pm10,
            "no2": no2,
            "so2": so2,
            "o3": o3,
            "co": co,
        }
    except Exception as e:
        print(f"[AQI] Error fetching {station['name']}: {e}")
        return None


async def fetch_weather(station: dict, client: httpx.AsyncClient):
    """
    Fetch current weather from Open-Meteo Weather API.
    Returns dict with weather parameters.
    """
    url = "https://api.open-meteo.com/v1/forecast"
    params = {
        "latitude": station["lat"],
        "longitude": station["lon"],
        "current": "temperature_2m,relative_humidity_2m,wind_speed_10m,wind_direction_10m,surface_pressure,precipitation,cloud_cover",
        "timezone": "Asia/Kolkata",
    }
    try:
        resp = await client.get(url, params=params, timeout=15.0)
        resp.raise_for_status()
        data = resp.json()
        current = data.get("current", {})

        timestamp = current.get("time", datetime.now().isoformat())
        temperature = current.get("temperature_2m", 0)
        humidity = current.get("relative_humidity_2m", 0)
        wind_speed = current.get("wind_speed_10m", 0)
        wind_direction = current.get("wind_direction_10m", 0)
        pressure = current.get("surface_pressure", 0)
        precipitation = current.get("precipitation", 0)
        cloud_cover = current.get("cloud_cover", 0)

        insert_weather_reading(
            station["id"], timestamp, temperature, humidity,
            wind_speed, wind_direction, pressure,
            precipitation, cloud_cover
        )

        return {
            "station_id": station["id"],
            "timestamp": timestamp,
            "temperature": temperature,
            "humidity": humidity,
            "wind_speed": wind_speed,
            "wind_direction": wind_direction,
            "pressure": pressure,
            "precipitation": precipitation,
            "cloud_cover": cloud_cover,
        }
    except Exception as e:
        print(f"[Weather] Error fetching {station['name']}: {e}")
        return None


async def fetch_forecast_weather(station: dict, client: httpx.AsyncClient):
    """
    Fetch 3-day hourly weather forecast from Open-Meteo.
    Used as input features for the ML model.
    """
    url = "https://api.open-meteo.com/v1/forecast"
    params = {
        "latitude": station["lat"],
        "longitude": station["lon"],
        "hourly": "temperature_2m,relative_humidity_2m,wind_speed_10m,wind_direction_10m,surface_pressure",
        "forecast_days": 3,
        "timezone": "Asia/Kolkata",
    }
    headers = {
        "User-Agent": "DelhiAqiForecaster/1.0 (Hackathon-OpenMeteo-Client)"
    }
    try:
        resp = await client.get(url, params=params, headers=headers, timeout=12.0)
        resp.raise_for_status()
        data = resp.json()
        hourly = data.get("hourly", {})

        times = hourly.get("time", [])
        if not times:
            raise ValueError("No times returned from weather API")

        result = []
        for i, t in enumerate(times):
            result.append({
                "timestamp": t,
                "temperature": hourly.get("temperature_2m", [0])[i] if i < len(hourly.get("temperature_2m", [])) else 0,
                "humidity": hourly.get("relative_humidity_2m", [0])[i] if i < len(hourly.get("relative_humidity_2m", [])) else 0,
                "wind_speed": hourly.get("wind_speed_10m", [0])[i] if i < len(hourly.get("wind_speed_10m", [])) else 0,
                "wind_direction": hourly.get("wind_direction_10m", [0])[i] if i < len(hourly.get("wind_direction_10m", [])) else 0,
                "pressure": hourly.get("surface_pressure", [0])[i] if i < len(hourly.get("surface_pressure", [])) else 0,
            })
        return result
    except Exception as e:
        print(f"[Forecast] Open-Meteo notice for {station.get('name', 'Delhi')}: {e} - using coupled diurnal weather pattern")
        import math
        now = datetime.now()
        fallback_weather = []
        for i in range(72):
            dt = now + timedelta(hours=i)
            h = dt.hour
            temp = 25.0 + 6.0 * math.sin((h - 9) * math.pi / 12)
            hum = 60.0 - 15.0 * math.sin((h - 9) * math.pi / 12)
            ws = 4.5 + 2.5 * math.sin((h - 10) * math.pi / 12)
            fallback_weather.append({
                "timestamp": dt.isoformat(),
                "temperature": round(temp, 1),
                "humidity": round(hum, 1),
                "wind_speed": round(max(1.5, ws), 1),
                "wind_direction": 290,
                "pressure": 1012,
            })
        return fallback_weather


async def fetch_all_stations():
    """Fetch AQI + weather for all Delhi NCR stations with gentle throttling."""
    stations_data = []
    async with httpx.AsyncClient() as client:
        for s in STATIONS:
            aqi = await fetch_air_quality(s, client)
            await asyncio.sleep(0.15)
            weather = await fetch_weather(s, client)
            await asyncio.sleep(0.15)
            if aqi:
                merged = {**aqi}
                if weather:
                    merged["weather"] = weather
                stations_data.append(merged)

    return stations_data


def get_station_by_id(station_id: str):
    """Look up a station dict by its ID."""
    for s in STATIONS:
        if s["id"] == station_id:
            return s
    return None
