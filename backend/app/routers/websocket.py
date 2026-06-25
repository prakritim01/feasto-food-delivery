from fastapi import APIRouter, WebSocket, WebSocketDisconnect
import asyncio
import json

router = APIRouter()

class ConnectionManager:
    def __init__(self):
        self.active_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)

manager = ConnectionManager()

@router.websocket("/ws/track/{order_id}")
async def track_order(websocket: WebSocket, order_id: str):
    await manager.connect(websocket)
    try:
        statuses = ["Preparing", "Cooking", "Picked Up", "Arriving", "Delivered"]
        for status in statuses:
            await asyncio.sleep(4) 
            data = {"order_id": order_id, "status": status, "lat": 21.2514, "lng": 81.6296}
            await websocket.send_text(json.dumps(data))
    except WebSocketDisconnect:
        manager.disconnect(websocket)