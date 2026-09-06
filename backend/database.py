"""
Database module — SQLite storage for AQI and weather readings.
Stores historical data for chart rendering and model retraining.
"""

import sqlite3
import os
from datetime import datetime

DB_PATH = os.path.join(os.path.dirname(__file__), "aqi_data.db")


def get_connection():
    """Return a new SQLite connection with row_factory enabled."""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    """Create tables if they don't exist."""
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS aqi_readings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            station_id TEXT NOT NULL,
            station_name TEXT NOT NULL,
            latitude REAL NOT NULL,
            longitude REAL NOT NULL,
            timestamp TEXT NOT NULL,
            aqi INTEGER,
            pm25 REAL,
            pm10 REAL,
            no2 REAL,
            so2 REAL,
            o3 REAL,
            co REAL,
            UNIQUE(station_id, timestamp)
        )
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS weather_readings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            station_id TEXT NOT NULL,
            timestamp TEXT NOT NULL,
            temperature REAL,
            humidity REAL,
            wind_speed REAL,
            wind_direction REAL,
            pressure REAL,
            precipitation REAL,
            cloud_cover REAL,
            UNIQUE(station_id, timestamp)
        )
    """)

    conn.commit()
    conn.close()


def insert_aqi_reading(station_id, station_name, lat, lon, timestamp,
                       aqi, pm25, pm10, no2, so2, o3, co):
    """Insert a single AQI reading, ignoring duplicates."""
    conn = get_connection()
    try:
        conn.execute(
            """INSERT OR IGNORE INTO aqi_readings
               (station_id, station_name, latitude, longitude, timestamp,
                aqi, pm25, pm10, no2, so2, o3, co)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
            (station_id, station_name, lat, lon, timestamp,
             aqi, pm25, pm10, no2, so2, o3, co)
        )
        conn.commit()
    finally:
        conn.close()


def insert_weather_reading(station_id, timestamp, temperature, humidity,
                           wind_speed, wind_direction, pressure,
                           precipitation, cloud_cover):
    """Insert a single weather reading, ignoring duplicates."""
    conn = get_connection()
    try:
        conn.execute(
            """INSERT OR IGNORE INTO weather_readings
               (station_id, timestamp, temperature, humidity,
                wind_speed, wind_direction, pressure,
                precipitation, cloud_cover)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)""",
            (station_id, timestamp, temperature, humidity,
             wind_speed, wind_direction, pressure,
             precipitation, cloud_cover)
        )
        conn.commit()
    finally:
        conn.close()


def get_latest_aqi(station_id):
    """Get the most recent AQI reading for a station."""
    conn = get_connection()
    try:
        row = conn.execute(
            """SELECT * FROM aqi_readings
               WHERE station_id = ?
               ORDER BY timestamp DESC LIMIT 1""",
            (station_id,)
        ).fetchone()
        return dict(row) if row else None
    finally:
        conn.close()


def get_latest_weather(station_id):
    """Get the most recent weather reading for a station."""
    conn = get_connection()
    try:
        row = conn.execute(
            """SELECT * FROM weather_readings
               WHERE station_id = ?
               ORDER BY timestamp DESC LIMIT 1""",
            (station_id,)
        ).fetchone()
        return dict(row) if row else None
    finally:
        conn.close()


def get_historical_aqi(station_id, hours=168):
    """Get AQI readings for the past N hours."""
    conn = get_connection()
    try:
        rows = conn.execute(
            """SELECT * FROM aqi_readings
               WHERE station_id = ?
               ORDER BY timestamp DESC LIMIT ?""",
            (station_id, hours)
        ).fetchall()
        return [dict(r) for r in rows][::-1]  # chronological order
    finally:
        conn.close()


def get_historical_weather(station_id, hours=168):
    """Get weather readings for the past N hours."""
    conn = get_connection()
    try:
        rows = conn.execute(
            """SELECT * FROM weather_readings
               WHERE station_id = ?
               ORDER BY timestamp DESC LIMIT ?""",
            (station_id, hours)
        ).fetchall()
        return [dict(r) for r in rows][::-1]
    finally:
        conn.close()


def get_all_stations_latest():
    """Get the latest AQI reading for every station."""
    conn = get_connection()
    try:
        rows = conn.execute(
            """SELECT a.* FROM aqi_readings a
               INNER JOIN (
                   SELECT station_id, MAX(timestamp) as max_ts
                   FROM aqi_readings GROUP BY station_id
               ) b ON a.station_id = b.station_id
                  AND a.timestamp = b.max_ts"""
        ).fetchall()
        return [dict(r) for r in rows]
    finally:
        conn.close()


# Initialize DB on import
init_db()
