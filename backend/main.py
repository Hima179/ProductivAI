"""
FastAPI backend for the AI Personal Productivity Analyzer.
Loads the trained ML model and serves predictions via REST API.
"""

import os
import pickle
import numpy as np
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

# ---------------------------------------------------------------------------
# App setup
# ---------------------------------------------------------------------------
app = FastAPI(title="AI Productivity Analyzer API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------------------------------
# Load model at startup
# ---------------------------------------------------------------------------
MODEL_PATH = os.path.join(os.path.dirname(__file__), "models", "productivity_model.pkl")

model = None

@app.on_event("startup")
def load_model():
    global model
    with open(MODEL_PATH, "rb") as f:
        model = pickle.load(f)
    print("✅ Model loaded successfully")

# ---------------------------------------------------------------------------
# Schemas
# ---------------------------------------------------------------------------
class PredictionInput(BaseModel):
    sleep_hours: float = Field(..., ge=0, le=16)
    study_hours: float = Field(..., ge=0, le=20)
    exercise_minutes: float = Field(..., ge=0, le=300)
    screen_time_hours: float = Field(..., ge=0, le=24)
    social_media_hours: float = Field(..., ge=0, le=24)
    breaks_taken: int = Field(..., ge=0, le=20)
    mood_level: int = Field(..., ge=1, le=10)


class PredictionOutput(BaseModel):
    productivity_score: int
    category: str


# ---------------------------------------------------------------------------
# Endpoints
# ---------------------------------------------------------------------------
@app.get("/")
def root():
    return {"status": "ok", "message": "AI Productivity Analyzer API is running"}


@app.post("/predict", response_model=PredictionOutput)
def predict(data: PredictionInput):
    features = np.array([[
        data.sleep_hours,
        data.study_hours,
        data.exercise_minutes,
        data.screen_time_hours,
        data.social_media_hours,
        data.breaks_taken,
        data.mood_level,
    ]])

    raw_score = model.predict(features)[0]
    score = int(np.clip(round(raw_score), 0, 100))

    if score >= 75:
        category = "High Productivity"
    elif score >= 45:
        category = "Moderate Productivity"
    else:
        category = "Low Productivity"

    return PredictionOutput(productivity_score=score, category=category)
