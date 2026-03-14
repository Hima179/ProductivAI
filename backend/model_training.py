"""
Train ML models on the productivity dataset and save the best one.
Models: Linear Regression, Random Forest Regressor
Metrics: R², MAE, MSE
"""

import os
import pickle
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import r2_score, mean_absolute_error, mean_squared_error


DATASET_PATH = os.path.join(os.path.dirname(__file__), "dataset", "productivity_dataset.csv")
MODEL_DIR = os.path.join(os.path.dirname(__file__), "models")
MODEL_PATH = os.path.join(MODEL_DIR, "productivity_model.pkl")

FEATURE_COLS = [
    "sleep_hours",
    "study_hours",
    "exercise_minutes",
    "screen_time_hours",
    "social_media_hours",
    "breaks_taken",
    "mood_level",
]
TARGET_COL = "productivity_score"


def load_and_preprocess(path: str) -> tuple:
    df = pd.read_csv(path)
    # Drop any rows with missing values
    df.dropna(inplace=True)
    X = df[FEATURE_COLS].values
    y = df[TARGET_COL].values
    return X, y


def train_and_evaluate():
    print("Loading dataset...")
    X, y = load_and_preprocess(DATASET_PATH)
    print(f"  Samples: {X.shape[0]}, Features: {X.shape[1]}")

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    models = {
        "Linear Regression": LinearRegression(),
        "Random Forest": RandomForestRegressor(
            n_estimators=100, max_depth=12, random_state=42, n_jobs=-1
        ),
    }

    results = {}
    for name, model in models.items():
        print(f"\nTraining {name}...")
        model.fit(X_train, y_train)
        y_pred = model.predict(X_test)

        r2 = r2_score(y_test, y_pred)
        mae = mean_absolute_error(y_test, y_pred)
        mse = mean_squared_error(y_test, y_pred)

        results[name] = {"model": model, "r2": r2, "mae": mae, "mse": mse}
        print(f"  R²:  {r2:.4f}")
        print(f"  MAE: {mae:.4f}")
        print(f"  MSE: {mse:.4f}")

    # Select the best model by R²
    best_name = max(results, key=lambda k: results[k]["r2"])
    best_model = results[best_name]["model"]
    print(f"\n✅ Best model: {best_name} (R² = {results[best_name]['r2']:.4f})")

    os.makedirs(MODEL_DIR, exist_ok=True)
    with open(MODEL_PATH, "wb") as f:
        pickle.dump(best_model, f)
    print(f"Model saved to {MODEL_PATH}")

    return best_name, results[best_name]


if __name__ == "__main__":
    train_and_evaluate()
