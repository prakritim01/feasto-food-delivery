import numpy as np
from datetime import datetime
import random

def calculate_nutrition_twin(height: int, weight: int, activity_level: str, goal: str):
    bmr = (10 * weight) + (6.25 * height) - (5 * 25) + 5
    tdee = bmr * {"low": 1.2, "medium": 1.55, "high": 1.9}.get(activity_level.lower(), 1.2)
    target_protein = weight * (2.2 if goal == "muscle" else 1.6)
    current_protein = int(target_protein * 0.6) 
    deficit = round(target_protein - current_protein, 1)
    
    return {
        "bmr": round(bmr), "tdee": round(tdee), "daily_target_protein": round(target_protein, 1),
        "current_intake": current_protein, "deficit": deficit,
        "recommendation": "Grilled Salmon Bowl" if deficit > 40 else "Greek Yogurt & Almonds",
        "critical_warning": deficit > 50
    }

def run_food_concierge(budget: float, time_mins: int, preference: str):
    database = [
        {"name": "Paneer Tikka Salad", "cost": 180, "time": 15, "tags": ["high protein", "veg"]},
        {"name": "Chicken Shawarma Wrap", "cost": 140, "time": 10, "tags": ["high protein", "meat"]},
        {"name": "Quinoa Power Bowl", "cost": 220, "time": 20, "tags": ["vegan", "healthy"]}
    ]
    valid_options = [m for m in database if m["cost"] <= budget and m["time"] <= time_mins and preference.lower() in m["tags"]]
    if not valid_options: return {"status": "failed", "message": "No matches found."}
    return {"status": "success", "match": sorted(valid_options, key=lambda x: x['cost'])[0]}

def predict_restaurant_demand(restaurant_id: str, target_date: str):
    date_obj = datetime.strptime(target_date, "%Y-%m-%d")
    predicted_orders = int((150 * (1.8 if date_obj.weekday() >= 5 else 1.1)) + np.random.normal(0, 15))
    return {"restaurant_id": restaurant_id, "predicted_orders": predicted_orders, "staffing_recommendation": "High" if predicted_orders > 200 else "Standard"}

def mock_receipt_scan(image_name: str):
    return {
        "status": "success", "merchant": "Truffles Diner", "total_paid": 450.00,
        "extracted_items": [{"name": "Peri Peri Burger", "price": 250, "est_calories": 850, "protein": 45}],
        "total_calories": 850, "health_score": "C+"
    }

def get_dashboard_analytics(user_id: str):
    days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    return {
        "weekly_spend": [{"day": d, "spent": random.randint(150, 600)} for d in days],
        "calorie_wallet": [{"day": d, "consumed": random.randint(1800, 2600), "target": 2200} for d in days],
        "insights": "You spent 30% more on weekends."
    }