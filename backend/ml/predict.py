"""
Prediction module — loads trained model and generates AQI forecasts.
Takes current weather conditions + recent AQI history to predict 72 hours ahead.
"""

import os
import numpy as np
import pandas as pd
import joblib
from datetime import datetime, timedelta

BASE_DIR = os.path.dirname(__file__)
MODEL_FILE = os.path.join(BASE_DIR, "aqi_model.joblib")
FEATURES_FILE = os.path.join(BASE_DIR, "feature_names.joblib")

# Load model at module level (cached)
_model = None
_feature_names = None


def _load_model():
    """Lazily load the trained model."""
    global _model, _feature_names
    if _model is None:
        if not os.path.exists(MODEL_FILE):
            raise FileNotFoundError(
                f"Model not found at {MODEL_FILE}. "
                "Run `python ml/generate_training_data.py` then `python ml/train_model.py` first."
            )
        _model = joblib.load(MODEL_FILE)
        _feature_names = joblib.load(FEATURES_FILE)
    return _model, _feature_names


def predict_aqi(
    current_aqi: float,
    weather_forecast: list[dict],
    recent_aqi_history: list[float] = None,
) -> list[dict]:
    """
    Generate hourly AQI forecast for the next 72 hours.

    Args:
        current_aqi: Current AQI value
        weather_forecast: List of hourly weather dicts with keys:
            timestamp, temperature, humidity, wind_speed, wind_direction, pressure
        recent_aqi_history: List of recent hourly AQI values (newest first).
            Used for lag features. If None, uses current_aqi for all lags.

    Returns:
        List of dicts with predicted AQI and timestamps.
    """
    model, feature_names = _load_model()

    # Build AQI history for lag features
    if recent_aqi_history and len(recent_aqi_history) >= 24:
        aqi_buffer = list(recent_aqi_history[:24])
    else:
        # Fill with current_aqi if no history available
        aqi_buffer = [current_aqi] * 24

    predictions = []

    for i, weather in enumerate(weather_forecast):
        ts = weather.get("timestamp", "")
        try:
            dt = datetime.fromisoformat(ts)
        except (ValueError, TypeError):
            dt = datetime.now() + timedelta(hours=i)

        hour = dt.hour
        month = dt.month
        day_of_week = dt.weekday()

        temperature = weather.get("temperature", 25)
        humidity = weather.get("humidity", 50)
        wind_speed = weather.get("wind_speed", 5)
        wind_direction = weather.get("wind_direction", 180)
        pressure = weather.get("pressure", 1010)

        # Cyclic features
        hour_sin = np.sin(2 * np.pi * hour / 24)
        hour_cos = np.cos(2 * np.pi * hour / 24)
        month_sin = np.sin(2 * np.pi * month / 12)
        month_cos = np.cos(2 * np.pi * month / 12)
        wind_dir_sin = np.sin(2 * np.pi * wind_direction / 360)
        wind_dir_cos = np.cos(2 * np.pi * wind_direction / 360)

        # Lag features from buffer
        aqi_lag_1h = aqi_buffer[0] if len(aqi_buffer) > 0 else current_aqi
        aqi_lag_3h = aqi_buffer[2] if len(aqi_buffer) > 2 else current_aqi
        aqi_lag_6h = aqi_buffer[5] if len(aqi_buffer) > 5 else current_aqi
        aqi_lag_12h = aqi_buffer[11] if len(aqi_buffer) > 11 else current_aqi
        aqi_lag_24h = aqi_buffer[23] if len(aqi_buffer) > 23 else current_aqi

        # Rolling averages
        aqi_rolling_6h = np.mean(aqi_buffer[:6]) if len(aqi_buffer) >= 6 else current_aqi
        aqi_rolling_24h = np.mean(aqi_buffer[:24]) if len(aqi_buffer) >= 24 else current_aqi

        # Diffs
        aqi_diff_1h = aqi_buffer[0] - aqi_buffer[1] if len(aqi_buffer) > 1 else 0
        aqi_diff_3h = aqi_buffer[0] - aqi_buffer[3] if len(aqi_buffer) > 3 else 0

        # Build feature vector
        features = {
            "temperature": temperature,
            "humidity": humidity,
            "wind_speed": wind_speed,
            "pressure": pressure,
            "precipitation": 0,
            "hour": hour,
            "day_of_week": day_of_week,
            "month": month,
            "hour_sin": hour_sin,
            "hour_cos": hour_cos,
            "month_sin": month_sin,
            "month_cos": month_cos,
            "wind_dir_sin": wind_dir_sin,
            "wind_dir_cos": wind_dir_cos,
            "aqi_lag_1h": aqi_lag_1h,
            "aqi_lag_3h": aqi_lag_3h,
            "aqi_lag_6h": aqi_lag_6h,
            "aqi_lag_12h": aqi_lag_12h,
            "aqi_lag_24h": aqi_lag_24h,
            "aqi_rolling_6h": aqi_rolling_6h,
            "aqi_rolling_24h": aqi_rolling_24h,
            "aqi_diff_1h": aqi_diff_1h,
            "aqi_diff_3h": aqi_diff_3h,
        }

        X = pd.DataFrame([features])[feature_names]
        predicted_aqi = int(np.clip(model.predict(X)[0], 10, 500))

        # Confidence interval (wider for further predictions)
        uncertainty = min(10 + i * 1.5, 60)
        aqi_low = max(10, predicted_aqi - int(uncertainty))
        aqi_high = min(500, predicted_aqi + int(uncertainty))

        # AQI category
        category = _aqi_category(predicted_aqi)

        predictions.append({
            "timestamp": dt.isoformat(),
            "hour": hour,
            "predicted_aqi": predicted_aqi,
            "aqi_low": aqi_low,
            "aqi_high": aqi_high,
            "category": category["label"],
            "color": category["color"],
            "weather": {
                "temperature": round(temperature, 1),
                "humidity": round(humidity, 1),
                "wind_speed": round(wind_speed, 1),
            }
        })

        # Shift buffer: predicted AQI becomes the new "latest"
        aqi_buffer.insert(0, predicted_aqi)
        if len(aqi_buffer) > 24:
            aqi_buffer.pop()

    return predictions


def _aqi_category(aqi: int) -> dict:
    """Return AQI category label and color."""
    if aqi <= 50:
        return {"label": "Good", "color": "#4caf50"}
    elif aqi <= 100:
        return {"label": "Moderate", "color": "#ffeb3b"}
    elif aqi <= 150:
        return {"label": "Unhealthy for Sensitive Groups", "color": "#ff9800"}
    elif aqi <= 200:
        return {"label": "Unhealthy", "color": "#f44336"}
    elif aqi <= 300:
        return {"label": "Very Unhealthy", "color": "#9c27b0"}
    else:
        return {"label": "Hazardous", "color": "#7e0023"}


def get_health_advisory(aqi: int) -> dict:
    """Return health advisory based on AQI level."""
    cat = _aqi_category(aqi)

    advisories = {
        "Good": {
            "general": "Air quality is satisfactory. Enjoy outdoor activities!",
            "sensitive": "No precautions needed.",
            "outdoor": "All outdoor activities are safe.",
            "mask": "No mask needed.",
        },
        "Moderate": {
            "general": "Air quality is acceptable. Unusually sensitive people should consider reducing prolonged outdoor exertion.",
            "sensitive": "People with respiratory issues should monitor symptoms.",
            "outdoor": "Outdoor activities are generally safe.",
            "mask": "Not required for most people.",
        },
        "Unhealthy for Sensitive Groups": {
            "general": "Members of sensitive groups may experience health effects.",
            "sensitive": "People with asthma, children, and elderly should limit prolonged outdoor exertion.",
            "outdoor": "Reduce prolonged outdoor activities.",
            "mask": "N95 mask recommended for sensitive individuals.",
        },
        "Unhealthy": {
            "general": "Everyone may begin to experience health effects.",
            "sensitive": "People with heart or lung disease, children, and elderly should avoid prolonged outdoor exertion.",
            "outdoor": "Limit outdoor activities. Exercise indoors.",
            "mask": "N95 mask recommended for all when outdoors.",
        },
        "Very Unhealthy": {
            "general": "Health alert: everyone may experience serious health effects.",
            "sensitive": "Avoid all outdoor physical activity.",
            "outdoor": "Stay indoors. Keep windows and doors closed.",
            "mask": "N95 mask essential when outdoors.",
        },
        "Hazardous": {
            "general": "Health warning of emergency conditions. The entire population is likely to be affected.",
            "sensitive": "Stay indoors. Use air purifiers if available.",
            "outdoor": "Avoid going outside. Cancel outdoor events.",
            "mask": "High-grade N95/N99 mask essential. Minimize outdoor exposure.",
        },
    }

    return {
        "aqi": aqi,
        "category": cat["label"],
        "color": cat["color"],
        **advisories.get(cat["label"], advisories["Hazardous"]),
    }
