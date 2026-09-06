"""
Train a Gradient Boosting model for AQI forecasting.

Features:
- Weather: temperature, humidity, wind_speed, wind_direction, pressure
- Temporal: hour, day_of_week, month
- Lag features: previous AQI values (1h, 3h, 6h, 12h, 24h ago)

Target: AQI value
"""

import os
import numpy as np
import pandas as pd
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import joblib

BASE_DIR = os.path.dirname(__file__)
DATA_FILE = os.path.join(BASE_DIR, "training_data.csv")
MODEL_FILE = os.path.join(BASE_DIR, "aqi_model.joblib")
SCALER_FILE = os.path.join(BASE_DIR, "feature_names.joblib")


def create_lag_features(df):
    """Add lag features — previous AQI values at different time steps."""
    for lag in [1, 3, 6, 12, 24]:
        df[f"aqi_lag_{lag}h"] = df["aqi"].shift(lag)
    # Rolling averages
    df["aqi_rolling_6h"] = df["aqi"].rolling(window=6, min_periods=1).mean()
    df["aqi_rolling_24h"] = df["aqi"].rolling(window=24, min_periods=1).mean()
    # Rate of change
    df["aqi_diff_1h"] = df["aqi"].diff(1)
    df["aqi_diff_3h"] = df["aqi"].diff(3)
    return df


def create_cyclic_features(df):
    """Encode cyclical features (hour, month, wind_direction) as sin/cos."""
    df["hour_sin"] = np.sin(2 * np.pi * df["hour"] / 24)
    df["hour_cos"] = np.cos(2 * np.pi * df["hour"] / 24)
    df["month_sin"] = np.sin(2 * np.pi * df["month"] / 12)
    df["month_cos"] = np.cos(2 * np.pi * df["month"] / 12)
    df["wind_dir_sin"] = np.sin(2 * np.pi * df["wind_direction"] / 360)
    df["wind_dir_cos"] = np.cos(2 * np.pi * df["wind_direction"] / 360)
    return df


def train():
    """Train the Gradient Boosting model and save it."""
    print("Loading training data...")
    df = pd.read_csv(DATA_FILE)
    print(f"  Loaded {len(df)} records")

    # Feature engineering
    df = create_lag_features(df)
    df = create_cyclic_features(df)
    df.dropna(inplace=True)

    # Feature columns
    feature_cols = [
        "temperature", "humidity", "wind_speed", "pressure", "precipitation",
        "hour", "day_of_week", "month",
        "hour_sin", "hour_cos", "month_sin", "month_cos",
        "wind_dir_sin", "wind_dir_cos",
        "aqi_lag_1h", "aqi_lag_3h", "aqi_lag_6h", "aqi_lag_12h", "aqi_lag_24h",
        "aqi_rolling_6h", "aqi_rolling_24h",
        "aqi_diff_1h", "aqi_diff_3h",
    ]

    X = df[feature_cols]
    y = df["aqi"]

    # Split — last 20% for testing (temporal split, not random)
    split_idx = int(len(X) * 0.8)
    X_train, X_test = X.iloc[:split_idx], X.iloc[split_idx:]
    y_train, y_test = y.iloc[:split_idx], y.iloc[split_idx:]

    print(f"  Train: {len(X_train)}  |  Test: {len(X_test)}")

    # Train Gradient Boosting
    print("Training Gradient Boosting model...")
    model = GradientBoostingRegressor(
        n_estimators=300,
        max_depth=6,
        learning_rate=0.08,
        subsample=0.8,
        min_samples_split=10,
        min_samples_leaf=5,
        random_state=42,
    )
    model.fit(X_train, y_train)

    # Evaluate
    y_pred = model.predict(X_test)
    mae = mean_absolute_error(y_test, y_pred)
    rmse = np.sqrt(mean_squared_error(y_test, y_pred))
    r2 = r2_score(y_test, y_pred)

    print(f"\n{'='*50}")
    print(f"  Model Performance:")
    print(f"  MAE  = {mae:.2f}")
    print(f"  RMSE = {rmse:.2f}")
    print(f"  R^2  = {r2:.4f}")
    print(f"{'='*50}")

    # Feature importance
    importances = sorted(
        zip(feature_cols, model.feature_importances_),
        key=lambda x: x[1], reverse=True
    )
    print("\n  Top 10 Feature Importances:")
    for name, imp in importances[:10]:
        print(f"    {name:25s} -> {imp:.4f}")

    # Save model + feature names
    joblib.dump(model, MODEL_FILE)
    joblib.dump(feature_cols, SCALER_FILE)
    print(f"\n  Model saved -> {MODEL_FILE}")
    print(f"  Features saved -> {SCALER_FILE}")

    return model


if __name__ == "__main__":
    train()
