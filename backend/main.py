"""
FastAPI backend for the AI Personal Productivity Analyzer.
Loads the trained ML model and serves predictions via REST API.
Includes: Insights, Suggestions, and Score Breakdown.
"""

import os
import pickle
import numpy as np
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Dict

# ---------------------------------------------------------------------------
# App setup
# ---------------------------------------------------------------------------
app = FastAPI(title="AI Productivity Analyzer API", version="2.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:5174", "http://127.0.0.1:5174"],
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
    insights: List[str]
    suggestions: List[str]
    score_breakdown: Dict[str, int]


# ---------------------------------------------------------------------------
# Insight generation (rule-based)
# ---------------------------------------------------------------------------
def generate_insights(data: PredictionInput, score: int) -> List[str]:
    insights = []

    # Sleep
    if data.sleep_hours >= 7:
        insights.append("Good sleep is positively influencing your productivity.")
    elif data.sleep_hours < 5:
        insights.append("Very low sleep is likely hurting your productivity significantly.")
    elif data.sleep_hours < 6:
        insights.append("Below-average sleep may be reducing your cognitive performance.")

    # Study
    if data.study_hours >= 6:
        insights.append("Your study hours are contributing strongly to your productivity.")
    elif data.study_hours >= 4:
        insights.append("Solid study hours are supporting a good productivity level.")
    elif data.study_hours < 2:
        insights.append("Very low study hours may be limiting your productivity potential.")

    # Exercise
    if data.exercise_minutes >= 45:
        insights.append("Great exercise routine — physical activity is boosting your focus and energy.")
    elif data.exercise_minutes >= 30:
        insights.append("Moderate exercise is providing a healthy productivity boost.")
    elif data.exercise_minutes < 10:
        insights.append("Lack of exercise may be reducing your energy levels and focus.")

    # Screen time
    if data.screen_time_hours > 8:
        insights.append("High screen time could be causing digital fatigue and reducing productivity.")
    elif data.screen_time_hours > 5:
        insights.append("Elevated screen time may slightly reduce your productivity.")

    # Social media
    if data.social_media_hours > 4:
        insights.append("Excessive social media usage is likely a major distraction.")
    elif data.social_media_hours > 3:
        insights.append("High social media usage may be reducing your focus time.")
    elif data.social_media_hours <= 1:
        insights.append("Low social media usage is helping you stay focused.")

    # Breaks
    if data.breaks_taken >= 4:
        insights.append("Taking regular breaks is helping maintain sustained productivity.")
    elif data.breaks_taken <= 1:
        insights.append("Too few breaks can lead to burnout — consider taking short pauses.")

    # Mood
    if data.mood_level >= 8:
        insights.append("Your positive mood is significantly contributing to higher productivity.")
    elif data.mood_level >= 6:
        insights.append("A decent mood level is supporting your work performance.")
    elif data.mood_level <= 3:
        insights.append("Low mood may be negatively impacting your motivation and productivity.")

    return insights


# ---------------------------------------------------------------------------
# Suggestion generation
# ---------------------------------------------------------------------------
def generate_suggestions(data: PredictionInput, score: int) -> List[str]:
    suggestions = []

    if data.sleep_hours < 7:
        suggestions.append(f"Try increasing sleep to 7–8 hours (currently {data.sleep_hours}h).")
    if data.study_hours < 3:
        suggestions.append("Consider increasing study hours to at least 3–4 hours daily.")
    if data.exercise_minutes < 30:
        suggestions.append(f"Add {int(30 - data.exercise_minutes)} more minutes of exercise to your routine.")
    if data.screen_time_hours > 6:
        suggestions.append(f"Reducing screen time by {int(data.screen_time_hours - 5)}h could improve focus.")
    if data.social_media_hours > 2:
        suggestions.append(f"Reduce social media usage by {round(data.social_media_hours - 1.5, 1)}h for better concentration.")
    if data.breaks_taken < 3:
        suggestions.append("Take at least 3–4 short breaks throughout the day to recharge.")
    if data.mood_level < 6:
        suggestions.append("Consider activities that improve mood — walks, music, or mindfulness.")

    if score >= 80 and len(suggestions) == 0:
        suggestions.append("You're doing great! Maintain your current routine for sustained high productivity.")

    return suggestions


# ---------------------------------------------------------------------------
# Score breakdown
# ---------------------------------------------------------------------------
def compute_breakdown(data: PredictionInput) -> Dict[str, int]:
    """Estimate approximate contribution percentages from each input factor."""
    # Positive factors
    sleep_contrib = min(int((data.sleep_hours / 9) * 25), 25)
    study_contrib = min(int((data.study_hours / 10) * 35), 35)
    exercise_contrib = min(int((data.exercise_minutes / 90) * 15), 15)
    mood_contrib = min(int((data.mood_level / 10) * 20), 20)

    # Negative factors
    screen_neg = -min(int((data.screen_time_hours / 16) * 15), 15)
    social_neg = -min(int((data.social_media_hours / 8) * 10), 10)

    return {
        "sleep": sleep_contrib,
        "study": study_contrib,
        "exercise": exercise_contrib,
        "screen_time": screen_neg,
        "social_media": social_neg,
        "mood": mood_contrib,
    }


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

    return PredictionOutput(
        productivity_score=score,
        category=category,
        insights=generate_insights(data, score),
        suggestions=generate_suggestions(data, score),
        score_breakdown=compute_breakdown(data),
    )
