from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.services.ai_engine import *

app = FastAPI(title="Feasto AI Platform", version="2.0")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

class TwinReq(BaseModel): height: int; weight: int; activity_level: str; goal: str
class ConciergeReq(BaseModel): budget: float; time_mins: int; preference: str
class DemandReq(BaseModel): restaurant_id: str; target_date: str
class ReceiptReq(BaseModel): image_name: str

@app.post("/api/v1/nutrition-twin")
def api_twin(req: TwinReq): return calculate_nutrition_twin(req.height, req.weight, req.activity_level, req.goal)

@app.post("/api/v1/concierge")
def api_concierge(req: ConciergeReq): return run_food_concierge(req.budget, req.time_mins, req.preference)

@app.post("/api/v1/demand-predictor")
def api_demand(req: DemandReq): return predict_restaurant_demand(req.restaurant_id, req.target_date)

@app.post("/api/v1/receipt-scanner")
def api_receipt(req: ReceiptReq): return mock_receipt_scan(req.image_name)

@app.get("/api/v1/analytics/{user_id}")
def api_analytics(user_id: str): return get_dashboard_analytics(user_id)