import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Sparkles, Search, Zap, TrendingUp, Star, ShieldCheck, MapPin, Clock } from "lucide-react";
import { useFeastoStore } from '../store/useFeastoStore';

export default function LandingPage() {
  const stats = [
    { label: 'Active Users', value: '142K+' },
    { label: 'AI Predictions', value: '2.4M' },
    { label: 'Restaurants', value: '8,500+' },
    { label: 'Uptime', value: '99.99%' },
  ];

  const trendingMeals = [
    { id: 1, name: 'Keto Salmon Bowl', restaurant: 'Ocean Fresh', rating: 4.9, time: '20-30 min', cal: 450, tags: ['High Protein', 'Keto'] },
    { id: 2, name: 'Vegan Power Wrap', restaurant: 'Green Earth', rating: 4.8, time: '15-25 min', cal: 320, tags: ['Vegan', 'Low Carb'] },
    { id: 3, name: 'Wagyu Truffle Burger', restaurant: 'Prime Cuts', rating: 4.9, time: '30-40 min', cal: 850, tags: ['Premium', 'Indulgence'] },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="max-w-7xl mx-auto px-8 space-y-32">
      
      {/* Hero Section */}
      <section className="min-h-[70vh] flex flex-col items-center justify-center text-center space-y-8 mt-12">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm text-primary font-medium border-primary/20">
          <Sparkles size={16} /> Platform v2.0 is Live
        </motion.div>
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
          Food delivery,<br />engineered by AI.
        </h1>
        <p className="text-xl text-textMuted max-w-2xl font-light">
          Feasto replaces generic menus with a hyper-personalized dietary engine. We analyze your metabolic twin to compute the perfect meal in milliseconds.
        </p>
        
        {/* Omni-Search Bar */}
        <div className="w-full max-w-3xl relative mt-8">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="text-textMuted" size={20} />
          </div>
          <input type="text" className="input-premium pl-12 h-16 text-lg shadow-2xl bg-surface/80 backdrop-blur-xl" placeholder="Describe what you want, e.g., 'High protein dinner under ₹400...'" />
          <div className="absolute inset-y-0 right-2 flex items-center">
            <button className="btn-primary h-12 flex items-center gap-2">
              <Zap size={18} /> Generate
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="glass-card p-8 rounded-2xl flex flex-col items-center justify-center text-center">
            <span className="text-4xl font-bold text-textMain">{stat.value}</span>
            <span className="text-textMuted text-sm font-medium mt-2 uppercase tracking-wider">{stat.label}</span>
          </div>
        ))}
      </section>

      {/* Featured AI Categories */}
      <section className="space-y-8">
        <div className="flex justify-between items-end border-b border-white/5 pb-4">
          <div>
            <h2 className="text-3xl font-bold">Trending Intelligence</h2>
            <p className="text-textMuted mt-2">Meals optimized and verified by our nutrition algorithms.</p>
          </div>
          <button className="text-primary hover:text-primary/80 font-medium flex items-center gap-1 transition-colors">
            View Algorithm Results <TrendingUp size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trendingMeals.map((meal) => (
            <div key={meal.id} className="glass-card rounded-2xl p-4 group cursor-pointer">
              <div className="h-48 w-full bg-surface rounded-xl mb-4 relative overflow-hidden group-hover:shadow-[0_0_30px_rgba(20,184,166,0.15)] transition-all">
                {/* Mock Image Placeholder */}
                <div className="absolute inset-0 bg-gradient-to-tr from-card to-surface flex items-center justify-center border border-white/5">
                  <span className="text-textMuted font-mono text-xs">IMG_RENDER_ENGINE</span>
                </div>
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="bg-background/80 backdrop-blur text-xs px-2 py-1 rounded-md border border-white/10 flex items-center gap-1 font-medium"><Star size={12} className="text-warning fill-warning"/> {meal.rating}</span>
                </div>
                <div className="absolute top-3 right-3 flex gap-2">
                  <span className="bg-success/20 text-success backdrop-blur text-xs px-2 py-1 rounded-md border border-success/20 flex items-center gap-1"><ShieldCheck size={12}/> Verified</span>
                </div>
              </div>
              <h3 className="text-lg font-bold group-hover:text-primary transition-colors">{meal.name}</h3>
              <p className="text-sm text-textMuted flex items-center gap-1 mt-1"><MapPin size={14}/> {meal.restaurant}</p>
              
              <div className="flex items-center gap-4 mt-4 text-xs font-medium text-textMuted">
                <span className="flex items-center gap-1"><Clock size={14}/> {meal.time}</span>
                <span className="flex items-center gap-1"><Activity size={14}/> {meal.cal} kcal</span>
              </div>
              <div className="flex gap-2 mt-4">
                {meal.tags.map(tag => <span key={tag} className="text-[10px] uppercase tracking-wider px-2 py-1 rounded bg-surface border border-white/5 text-textMuted">{tag}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}