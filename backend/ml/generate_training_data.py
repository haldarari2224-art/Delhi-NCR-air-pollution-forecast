"""
Generate synthetic training data for Delhi NCR AQI forecasting.

Models realistic patterns:
- Seasonal: Worst Oct-Feb (crop burning, inversions), best Jul-Sep (monsoon)
- Diurnal: Morning/evening rush-hour peaks
- Weather correlation: Low wind → high AQI, rain washes pollutants
- Event spikes: Diwali (Oct-Nov), stubble burning (Oct-Nov)
"""

import numpy as np
import pandas as pd
import os
from datetime import datetime, timedelta

np.random.seed(42)

OUTPUT_DIR = os.path.dirname(__file__)
OUTPUT_FILE = os.path.join(OUTPUT_DIR, "training_data.csv")


def generate_data(n_days=730):
    """Generate ~2 years of hourly synthetic Delhi AQI data."""
    records = []
    start = datetime(2024, 1, 1)

    for day_offset in range(n_days):
        date = start + timedelta(days=day_offset)
        month = date.month
        day_of_week = date.weekday()

        # ── Seasonal base AQI ──────────────────────────────────────
        # Delhi's worst months: Nov (350+), Dec (300+), Jan (280+)
        # Best months: Aug (80), Sep (90), Jul (100)
        seasonal_base = {
            1: 240, 2: 200, 3: 160, 4: 130, 5: 120, 6: 100,
            7: 85,  8: 70,  9: 80,  10: 180, 11: 320, 12: 280
        }[month]

        # Add Diwali spike (mid-Oct to mid-Nov)
        doy = date.timetuple().tm_yday
        if 285 <= doy <= 320:  # ~Oct 12 to Nov 16
            seasonal_base += np.random.uniform(40, 120)

        for hour in range(24):
            # ── Diurnal pattern ────────────────────────────────────
            # Morning rush: 7-10 AM → +30-50
            # Evening rush: 5-9 PM → +20-40
            # Night cooling (inversions): 11 PM - 5 AM → +10-25
            # Afternoon dispersion: 12-4 PM → -20-40
            if 7 <= hour <= 10:
                diurnal = np.random.uniform(25, 50)
            elif 17 <= hour <= 21:
                diurnal = np.random.uniform(15, 40)
            elif 23 <= hour or hour <= 5:
                diurnal = np.random.uniform(5, 25)
            else:
                diurnal = np.random.uniform(-40, -10)

            # ── Weather features ───────────────────────────────────
            # Temperature: seasonal + diurnal
            temp_base = {
                1: 12, 2: 16, 3: 22, 4: 30, 5: 36, 6: 38,
                7: 34, 8: 33, 9: 32, 10: 28, 11: 20, 12: 14
            }[month]
            temp_diurnal = -5 if hour < 6 else (8 if 12 <= hour <= 16 else 0)
            temperature = temp_base + temp_diurnal + np.random.normal(0, 2.5)

            # Humidity: higher in monsoon, lower in winter
            humidity_base = {
                1: 55, 2: 45, 3: 35, 4: 25, 5: 25, 6: 45,
                7: 75, 8: 80, 9: 70, 10: 50, 11: 55, 12: 60
            }[month]
            humidity = np.clip(humidity_base + np.random.normal(0, 10), 15, 98)

            # Wind speed: generally low in winter (→ worse AQI)
            wind_base = {
                1: 3, 2: 4, 3: 6, 4: 8, 5: 10, 6: 12,
                7: 8, 8: 7, 9: 6, 10: 4, 11: 3, 12: 3
            }[month]
            wind_speed = max(0.5, wind_base + np.random.normal(0, 2.5))

            wind_direction = np.random.uniform(0, 360)

            # Pressure
            pressure_base = {
                1: 1018, 2: 1016, 3: 1012, 4: 1008, 5: 1004, 6: 1000,
                7: 998,  8: 1000, 9: 1004, 10: 1010, 11: 1015, 12: 1018
            }[month]
            pressure = pressure_base + np.random.normal(0, 3)

            # Precipitation (mainly monsoon)
            rain_prob = {
                1: 0.02, 2: 0.03, 3: 0.03, 4: 0.02, 5: 0.03, 6: 0.10,
                7: 0.30, 8: 0.35, 9: 0.20, 10: 0.05, 11: 0.01, 12: 0.01
            }[month]
            precipitation = np.random.exponential(2) if np.random.random() < rain_prob else 0

            # ── Weather → AQI coupling ─────────────────────────────
            # Low wind = trapped pollutants
            wind_effect = max(0, (6 - wind_speed) * 12)
            # Rain washes pollutants
            rain_effect = -min(precipitation * 15, 80)
            # High humidity + low temp = worse (fog traps particles)
            inversion_effect = max(0, (humidity - 60) * 0.3) if temperature < 18 else 0

            # ── Final AQI ──────────────────────────────────────────
            aqi = (seasonal_base + diurnal + wind_effect +
                   rain_effect + inversion_effect +
                   np.random.normal(0, 15))
            aqi = int(np.clip(aqi, 15, 500))

            # ── Pollutant breakdown (correlated with AQI) ──────────
            pm25 = aqi * np.random.uniform(0.35, 0.55)
            pm10 = pm25 * np.random.uniform(1.3, 2.0)
            no2 = aqi * np.random.uniform(0.08, 0.18)
            so2 = aqi * np.random.uniform(0.02, 0.08)
            o3 = max(5, 60 - aqi * 0.08 + np.random.normal(0, 10))
            co = aqi * np.random.uniform(0.8, 1.8)

            records.append({
                "timestamp": (date + timedelta(hours=hour)).isoformat(),
                "month": month,
                "day_of_week": day_of_week,
                "hour": hour,
                "temperature": round(temperature, 1),
                "humidity": round(humidity, 1),
                "wind_speed": round(wind_speed, 1),
                "wind_direction": round(wind_direction, 1),
                "pressure": round(pressure, 1),
                "precipitation": round(precipitation, 2),
                "aqi": aqi,
                "pm25": round(pm25, 1),
                "pm10": round(pm10, 1),
                "no2": round(no2, 1),
                "so2": round(so2, 1),
                "o3": round(o3, 1),
                "co": round(co, 1),
            })

    df = pd.DataFrame(records)
    df.to_csv(OUTPUT_FILE, index=False)
    print(f"Generated {len(df)} records -> {OUTPUT_FILE}")
    print(f"AQI range: {df['aqi'].min()} - {df['aqi'].max()}")
    print(f"Mean AQI: {df['aqi'].mean():.1f}")
    print(f"Monthly mean AQI:\n{df.groupby('month')['aqi'].mean().round(1)}")
    return df


if __name__ == "__main__":
    generate_data()
