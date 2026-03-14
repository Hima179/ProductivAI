# 🧠 AI Personal Productivity Analyzer

A modern full-stack machine learning web application that predicts your **Productivity Score (0–100)** based on daily routine inputs and presents results inside a sleek analytics dashboard with smooth UI animations.

---

## ✨ Features

- **ML-Powered Predictions** — Enter daily routine metrics and get an instant productivity score
- **Animated Dashboard** — Clean, modern SaaS-style UI with Framer Motion animations
- **Interactive Charts** — Per-metric Recharts visualisations (bar, radial, donut)
- **Circular Progress Meter** — Animated score display with colour-coded categories
- **REST API** — FastAPI backend serving predictions from a trained scikit-learn model
- **50K Synthetic Dataset** — Realistic correlations between lifestyle habits and productivity

---

## 🏗️ Architecture

```
┌─────────────────┐          ┌─────────────────┐
│                 │  POST    │                 │
│   React (Vite)  │─────────▶│   FastAPI        │
│   Dashboard UI  │◀─────────│   /predict       │
│                 │  JSON    │                 │
└─────────────────┘          └───────┬─────────┘
                                     │
                              ┌──────▼──────┐
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
uvicorn main:app --reload
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
AI_Productivity_Analyzer/
├── backend/
│   ├── main.py                  # FastAPI application
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
│       ├── App.jsx
│       ├── index.css
│       ├── lib/
│       │   └── utils.js
│       ├── components/
│       │   ├── Sidebar.jsx
│       │   └── CircularProgress.jsx
│       └── pages/
│           ├── DashboardPage.jsx
│           ├── AnalysisPage.jsx
│           └── AboutPage.jsx
└── README.md
```

---

## 🔮 Future Improvements

- User authentication and history tracking
- Multiple ML model comparison in the dashboard
- Time-series productivity tracking
- Personalised recommendations engine
- Export reports as PDF
- Mobile-responsive design enhancements
- Deploy to cloud (Vercel + Railway / Render)
