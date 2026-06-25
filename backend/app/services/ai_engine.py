import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression
from typing import List, Dict

class FeastoAIEngine:
    def __init__(self):
        # 1. Initialize Recommendation Knowledge Base (Simulated DB)
        self.menu_df = pd.DataFrame([
            {"id": 101, "name": "Keto Salmon Bowl", "cal": 450, "protein": 35, "price": 400},
            {"id": 102, "name": "Wagyu Truffle Burger", "cal": 850, "protein": 45, "price": 800},
            {"id": 103, "name": "Vegan Power Wrap", "cal": 320, "protein": 28, "price": 250},
            {"id": 104, "name": "Grilled Chicken Salad", "cal": 350, "protein": 40, "price": 300},
            {"id": 105, "name": "Steak & Quinoa", "cal": 600, "protein": 55, "price": 550}
        ])

        # 2. Train the Demand Forecasting Model (Scikit-Learn)
        # Features: [day_of_week (0-6), is_raining (0/1), promo_active (0/1)]
        np.random.seed(42)
        X_day = np.random.randint(0, 7, size=(200, 1))
        X_weather = np.random.randint(0, 2, size=(200, 1))
        X_promo = np.random.randint(0, 2, size=(200, 1))
        X_train = np.hstack((X_day, X_weather, X_promo))

        # Target: orders_count (Weekends +50, Rain +30, Promo +40, plus noise)
        y_train = 100 + (X_train[:, 0] >= 5) * 50 + X_train[:, 1] * 30 + X_train[:, 2] * 40 + np.random.normal(0, 10, 200)

        # Fit the actual ML model
        self.forecasting_model = LinearRegression()
        self.forecasting_model.fit(X_train, y_train)
        
        self.is_loaded = True

    def get_recommendations(self, user_profile: Dict) -> List[Dict]:
        """Algorithmic Content-Based Filtering"""
        goal = user_profile.get("goal", "Maintenance")
        budget = user_profile.get("budget", 500)

        scored_menu = self.menu_df.copy()

        # 1. Hard Constraint: Filter out items over budget
        scored_menu = scored_menu[scored_menu['price'] <= budget]

        if scored_menu.empty:
            return []

        # 2. Soft Constraint: Mathematical Macro Scoring
        if "Hypertrophy" in goal:
            # Score favors high protein relative to calories
            scored_menu['match_score'] = (scored_menu['protein'] / 50.0) 
        elif "Fat Loss" in goal:
            # Score favors lower calories
            scored_menu['match_score'] = 1.0 - (scored_menu['cal'] / 1000.0)
        else:
            scored_menu['match_score'] = 0.85 

        # Cap scores cleanly and sort by best match
        scored_menu['match_score'] = scored_menu['match_score'].clip(upper=0.99)
        top_meals = scored_menu.sort_values(by='match_score', ascending=False).head(3)

        return top_meals.to_dict('records')

    def forecast_demand(self, restaurant_id: int) -> Dict:
        """Inference using trained Scikit-Learn model"""
        # Predict demand for tomorrow (Assumed: Friday=4, No Rain=0, Promo Active=1)
        X_pred = np.array([[4, 0, 1]])
        prediction = self.forecasting_model.predict(X_pred)[0]

        return {
            "predicted_orders_tomorrow": int(prediction),
            "peak_hour": "19:00",
            "confidence_interval": [int(prediction * 0.85), int(prediction * 1.15)]
        }

    def analyze_food_vision(self, image_bytes: bytes) -> Dict:
        # Placeholder for Deep Learning CNN (ResNet50)
        return {
            "detected_food": "Pending CNN Integration",
            "estimated_calories": 0,
            "macros": {"protein": 0, "carbs": 0, "fat": 0},
            "confidence": 0.0
        }

ai_system = FeastoAIEngine()