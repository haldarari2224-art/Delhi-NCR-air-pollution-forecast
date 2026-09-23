import sys
import os

# Ensure backend directory is in sys.path
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
BACKEND_DIR = os.path.abspath(os.path.join(BASE_DIR, "..", "backend"))

if BACKEND_DIR not in sys.path:
    sys.path.insert(0, BACKEND_DIR)

# Expose the FastAPI ASGI application for Vercel Serverless Function
from main import app
