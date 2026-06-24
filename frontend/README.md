# Feasto AI - Premium Food Intelligence Platform

Feasto is a next-generation, AI-powered food intelligence platform designed for high-performance nutrition tracking, intelligent concierge recommendations, and seamless culinary discovery. Built with a modern split-stack architecture, it leverages advanced machine learning models to optimize dietary budgets, predict restaurant demand, and synthesize personalized meal plans.

## System Architecture

```text
frontend/                 # React 18 + Vite + Tailwind CSS + Framer Motion
├── src/
│   ├── components/       # Reusable UI (Skeletons, Cards, Glassmorphism)
│   ├── pages/            # Lazy-loaded views (Landing, Dashboard, AI Hub)
│   ├── store/            # Zustand state management
│   ├── utils/            # API interceptors, error boundaries
│   └── App.jsx           # Root routing & Suspense wrapper
backend/                  # Python FastAPI + scikit-learn + Pandas
├── app/
│   ├── api/              # RESTful endpoints (v1)
│   ├── core/             # Security, CORS, Config
│   ├── models/           # Pydantic schemas & ML serialized models
│   └── services/         # Business logic (Digital Twin, Demand Predictor)