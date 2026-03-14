"""
Generate synthetic productivity dataset with 50,000 rows.
Columns: sleep_hours, study_hours, exercise_minutes, screen_time_hours,
         social_media_hours, breaks_taken, mood_level, productivity_score
"""

import numpy as np
import pandas as pd
import os

def generate_dataset(n_samples: int = 50000, seed: int = 42) -> pd.DataFrame:
    np.random.seed(seed)

    # Generate independent features with realistic distributions
    sleep_hours = np.clip(np.random.normal(6.5, 1.5, n_samples), 2, 12).round(1)
    study_hours = np.clip(np.random.normal(4, 2, n_samples), 0, 14).round(1)
    exercise_minutes = np.clip(np.random.normal(30, 20, n_samples), 0, 120).round(0)
    screen_time_hours = np.clip(np.random.normal(5, 2.5, n_samples), 0.5, 16).round(1)
    social_media_hours = np.clip(np.random.normal(2.5, 1.5, n_samples), 0, 8).round(1)
    breaks_taken = np.clip(np.random.poisson(3, n_samples), 0, 10).astype(int)
    mood_level = np.clip(np.random.normal(6, 2, n_samples), 1, 10).round(0).astype(int)

    # Compute productivity_score with realistic relationships + noise
    productivity_score = (
        4.0 * sleep_hours            # good sleep → higher productivity
        + 5.0 * study_hours          # more study → higher productivity
        + 0.15 * exercise_minutes    # exercise helps
        - 2.5 * screen_time_hours    # screen time hurts
        - 3.0 * social_media_hours   # social media hurts
        + 1.5 * breaks_taken         # breaks help a bit
        + 3.0 * mood_level           # mood has strong effect
        + np.random.normal(0, 4, n_samples)  # noise
    )

    # Normalise into 0-100 range
    p_min, p_max = productivity_score.min(), productivity_score.max()
    productivity_score = ((productivity_score - p_min) / (p_max - p_min) * 100).round(1)

    df = pd.DataFrame({
        "sleep_hours": sleep_hours,
        "study_hours": study_hours,
        "exercise_minutes": exercise_minutes,
        "screen_time_hours": screen_time_hours,
        "social_media_hours": social_media_hours,
        "breaks_taken": breaks_taken,
        "mood_level": mood_level,
        "productivity_score": productivity_score,
    })

    return df


if __name__ == "__main__":
    output_path = os.path.join(os.path.dirname(__file__), "productivity_dataset.csv")
    df = generate_dataset()
    df.to_csv(output_path, index=False)
    print(f"Dataset generated: {len(df)} rows → {output_path}")
    print(df.describe().round(2))
