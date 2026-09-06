# Delhi NCR Air Pollution & Weather Coupled Forecasting System

An end-to-end atmospheric intelligence platform designed for the Smart India Hackathon (SIH), coupling boundary-layer meteorology with machine learning to forecast 72-hour air pollution across 12 continuous ambient air monitoring stations in Delhi NCR.

---

## Quick Start (Single Command)

The frontend and backend have been **merged into a unified fullstack application**. You only need to run **one** command:

```powershell
python run.py
```
*Or simply double-click **`start.bat`** on Windows!*

Your default web browser will automatically open to:
- **Full Application**: [http://127.0.0.1:8000](http://127.0.0.1:8000)
- **72-Hour ML Forecast Dashboard**: [http://127.0.0.1:8000/dashboard](http://127.0.0.1:8000/dashboard)
- **Geospatial Station Network Map**: [http://127.0.0.1:8000/map](http://127.0.0.1:8000/map)
- **Interactive Swagger API Docs**: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

---

## Unified Project Architecture

```
d:/SIH Project/
├── run.py                 # Unified 1-click launcher (serves React + FastAPI)
├── start.bat              # Windows double-clickable launcher
├── backend/               # FastAPI Backend & ML Engine
│   ├── main.py            # Unified API + React Static SPA server
│   ├── data_fetcher.py    # Open-Meteo Air Quality & Weather API fetcher
│   ├── database.py        # SQLite historical telemetry storage
│   ├── aqi_data.db        # SQLite database
│   └── ml/                # Machine Learning Pipeline
│       ├── generate_training_data.py # 17,520 hourly record generator
│       ├── train_model.py # Gradient Boosting model trainer
│       ├── predict.py     # 72-hour inference engine
│       ├── aqi_model.joblib # Trained Gradient Boosting model
│       └── feature_names.joblib # Feature registry
└── my-project/            # React + Vite Frontend
    ├── dist/              # Production-compiled React SPA (served by FastAPI)
    ├── src/
    │   ├── api.js         # Unified client (auto-detects port 8000/5173)
    │   ├── components/
    │   │   ├── Dashboard.jsx # 72h coupled forecast, gauges, GRAP alerts
    │   │   ├── Map.jsx       # 12-station Leaflet CAAQMS map
    │   │   ├── HeroSection.jsx # Live telemetry banner
    │   │   └── ...           # Causes, Solutions, Articles, About, etc.
    │   └── App.jsx
    └── vite.config.js     # Configured with proxy to port 8000
```

---

## Key Highlights

1. **Weather-Coupled ML**: Gradient Boosting regressor modeling diurnal traffic patterns, nocturnal temperature inversions, wind stagnation, and seasonal stubble burning peaks ($R^2 = 0.9985$, $\text{MAE} = 3.79$).
2. **Zero External API Keys**: Utilizes Open-Meteo's open-access air quality and weather APIs for free, reliable, out-of-the-box operation.
3. **12 CAAQMS Monitoring Stations**: Covers Central Delhi (ITO), East Delhi (Anand Vihar), South-West (Dwarka), North (Rohini), West (Punjabi Bagh), Noida, Gurugram, Ghaziabad, Faridabad, Greater Noida, Bahadurgarh, and Manesar.
4. **CPCB GRAP Integration**: Implements Delhi Government's Graded Response Action Plan (Stage I to Stage IV: Severe+).
