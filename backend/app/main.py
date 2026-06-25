from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .services.ai_engine import ai_system
from .routers import websocket

# Creates the local SQLite database file instantly
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Feasto AI Intelligence Platform v2.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(websocket.router, tags=["Real-Time Tracking"])

@app.get("/")
def read_root():
    return {"status": "Operational", "engine": "Feasto v2.0"}

@app.post("/api/v1/intelligence/recommend")
def get_ai_recommendations(profile: dict):
    results = ai_system.get_recommendations(profile)
    return {"status": "success", "data": results}

@app.get("/api/v1/restaurants/{rest_id}/forecast")
def get_demand_forecast(rest_id: int):
    forecast = ai_system.forecast_demand(rest_id)
    return {"status": "success", "data": forecast}