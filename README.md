# 🧠 AI Personal Productivity Analyzer

A modern full-stack machine learning web application that predicts your **Productivity Score (0–100)** based on daily routine inputs and presents results inside a sleek analytics dashboard with smooth UI animations, AI-powered insights, and actionable recommendations.

---

## ✨ Features

- **ML-Powered Predictions** — Enter daily routine metrics and get an instant productivity score
- **AI Insights Generator** — Automatic rule-based insights explaining what's boosting or hurting your productivity
- **Improvement Suggestions** — Actionable recommendations to optimize your daily routine
- **Score Breakdown Chart** — Donut chart visualizing the contribution of each factor (sleep, study, exercise, etc.)
- **Dark / Light Mode** — Smooth theme toggle with preference saved in localStorage
- **Animated Dashboard** — Clean, modern SaaS-style UI with Framer Motion animations
- **Interactive Charts** — Per-metric Recharts visualisations (bar, radial, donut)
- **Circular Progress Meter** — Animated score display with colour-coded categories
- **Collapsible Sidebar** — Spring-animated sidebar with smooth open/close transitions
- **REST API** — FastAPI backend serving predictions, insights, and suggestions
- **50K Synthetic Dataset** — Realistic correlations between lifestyle habits and productivity

---

## 🏗️ Architecture

```
┌─────────────────┐          ┌─────────────────────────┐
│                 │  POST    │                         │
│   React (Vite)  │─────────▶│   FastAPI                │
│   Dashboard UI  │◀─────────│   /predict               │
│                 │  JSON    │   → score, insights,     │
│   • Score Card  │          │     suggestions,         │
│   • Breakdown   │          │     breakdown            │
│   • Insights    │          │                         │
│   • Suggestions │          └───────┬─────────────────┘
│   • Theme Toggle│                  │
└─────────────────┘           ┌──────▼──────┐
                              │  ML Model   │
                              │  (pkl file) │
                              └─────────────┘
```

---

## 🛠️ Technology Stack

| Layer      | Technology                                    |
|------------|-----------------------------------------------|
| Frontend   | React, Vite, TailwindCSS, ShadCN UI, Recharts, Framer Motion |
| Backend    | Python, FastAPI, Uvicorn                      |
| ML / Data  | Scikit-learn, Pandas, NumPy                   |

---

## 🤖 Machine Learning Workflow

1. **Dataset Generation** — 50,000 synthetic rows with realistic correlations
2. **Preprocessing** — Clean, drop nulls
3. **Train/Test Split** — 80/20 with fixed random state
4. **Model Training** — Linear Regression + Random Forest Regressor
5. **Evaluation** — R², MAE, MSE
6. **Model Selection** — Best model auto-saved as `productivity_model.pkl`

---

## 🧩 API Response Format

After prediction, the `/predict` endpoint returns:

```json
{
  "productivity_score": 56,
  "category": "Moderate Productivity",
  "insights": [
    "Good sleep is positively influencing your productivity.",
    "Solid study hours are supporting a good productivity level.",
    "Moderate exercise is providing a healthy productivity boost."
  ],
  "suggestions": [
    "Reducing screen time by 3h could improve focus.",
    "Reduce social media usage by 2.5h for better concentration."
  ],
  "score_breakdown": {
    "sleep": 19,
    "study": 14,
    "exercise": 5,
    "screen_time": -3,
    "social_media": -2,
    "mood": 14
  }
}
```

---

## 🚀 How to Run

### Backend

```bash
cd backend
pip install -r requirements.txt

# Generate dataset (first time only)
python dataset/generate_dataset.py

# Train model (first time only)
python model_training.py

# Start API server
uvicorn main:app --reload --port 8000
```

Backend runs on **http://localhost:8000**

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on **http://localhost:5173**

---

## 📁 Project Structure

```
ProductivAI/
├── backend/
│   ├── main.py                  # FastAPI app (predict, insights, suggestions, breakdown)
│   ├── model_training.py        # ML training pipeline
│   ├── requirements.txt         # Python dependencies
│   ├── dataset/
│   │   ├── generate_dataset.py  # Synthetic data generator
│   │   └── productivity_dataset.csv
│   └── models/
│       └── productivity_model.pkl
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── main.jsx
│       ├── App.jsx              # Layout, sidebar toggle, theme provider
│       ├── index.css            # Dark/light theme CSS variables
│       ├── lib/
│       │   └── utils.js
│       ├── components/
│       │   ├── Sidebar.jsx            # Collapsible sidebar with spring animation
│       │   ├── CircularProgress.jsx   # Animated score ring
│       │   ├── ThemeToggle.jsx        # Dark/light mode switcher
│       │   ├── InsightsPanel.jsx      # AI insights display
│       │   ├── SuggestionsPanel.jsx   # Improvement suggestions grid
│       │   └── ScoreBreakdownChart.jsx # Recharts donut chart
│       └── pages/
│           ├── DashboardPage.jsx  # Input cards + all result panels
│           ├── AnalysisPage.jsx   # Per-metric chart visualizations
│           └── AboutPage.jsx      # Project info and tech stack
├── .gitignore
└── README.md
```

---

## 📸 Screenshots

### Dashboard (Dark Mode)
Input cards with sliders, predict button, and full result panels below.

### Prediction Result
Circular progress meter showing score with category label and summary cards.

### Score Breakdown
Donut chart showing factor contributions: Sleep +19%, Study +14%, Exercise +5%, Screen Time -3%, Social Media -2%, Mood +14%.

### AI Insights
Contextual insights with emoji icons explaining what affects your productivity.

### Suggestions
Actionable improvement tips displayed in a card grid with green arrow icons.

### Light Mode
Clean white theme with full component compatibility.

---

## 🔮 Future Improvements

- User authentication and history tracking
- Multiple ML model comparison in the dashboard
- Time-series productivity tracking
- Export reports as PDF
- Mobile-responsive design enhancements
- Deploy to cloud (Vercel + Railway / Render)
