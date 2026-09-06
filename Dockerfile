FROM python:3.11-slim

WORKDIR /app

# Prevent Python from writing .pyc files & enable unbuffered logs
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PORT=8000

# Install dependencies
COPY backend/requirements.txt ./backend/
RUN pip install --no-cache-dir -r backend/requirements.txt

# Copy application files
COPY backend/ ./backend/
COPY my-project/dist/ ./my-project/dist/

# Ensure ML model is trained and ready
WORKDIR /app/backend
RUN python ml/generate_training_data.py && python ml/train_model.py

EXPOSE 8000

# Run FastAPI serving both frontend & backend
CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}"]
