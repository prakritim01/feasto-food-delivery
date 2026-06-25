import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Target, Flame, Activity, IndianRupee, PieChart, Sparkles, Plus } from 'lucide-react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { useFeastoStore } from '../store/useFeastoStore';

export default function AIHubPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [budget, setBudget] = useState(450);
  const [objective, setObjective] = useState("Hypertrophy (High Protein)");
  const [aiResults, setAiResults] = useState(null);
  
  // Pulls the cart function from your global store
  const { addToCart } = useFeastoStore();

  const nutritionData = [
    { subject: 'Protein', A: 120, fullMark: 150 },
    { subject: 'Carbs', A: 98, fullMark: 150 },
    { subject: 'Fat', A: 86, fullMark: 150 },
    { subject: 'Vitamins', A: 99, fullMark: 150 },
    { subject: 'Hydration', A: 85, fullMark: 150 },
    { subject: 'Fiber', A: 65, fullMark: 150 },
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);
    setAiResults(null);
    
    try {
      // NOTE: If you deploy your backend to Render, replace this URL with your live Render link!
      // Example: 'https://feasto-ai-backend.onrender.com/api/v1/intelligence/recommend'
      const response = await fetch('http://127.0.0.1:8000/api/v1/intelligence/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ goal: objective, budget: parseInt(budget) })
      });
      
      const data = await response.json();
      if (data.status === 'success') {
        // Slight artificial delay to make the AI feel "heavy" and premium
        setTimeout(() => setAiResults(data.data), 800);
      }
    } catch (error) {
      console.error("Failed to fetch AI telemetry:", error);
    } finally {
      setTimeout(() => setIsGenerating(false), 800);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8 pb-12">
      
      {/* Left Column: Input Vectors */}
      <div className="space-y-6">
        <div className="glass-card rounded-2xl p-6 border-l-4 border-l-primary">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-primary/20 p-2 rounded-lg text-primary"><Brain size={24}/></div>
            <div>
              <h2 className="text-xl font-bold">Food Concierge</h2>
              <p className="text-xs text-textMuted">Define constraint parameters</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm text-textMuted flex items-center gap-2 mb-2">
                <IndianRupee size={14}/> Budget Optimizer: ₹{budget}
              </label>
              <input 
                type="range" className="w-full accent-primary" 
                min="100" max="2000" step="50"
                value={budget} onChange={(e) => setBudget(e.target.value)} 
              />
              <div className="flex justify-between text-xs text-textMuted mt-1">
                <span>₹100</span><span>₹2000</span>
              </div>
            </div>
            <div>
              <label className="text-sm text-textMuted flex items-center gap-2 mb-2">
                <Target size={14}/> Macro Objective
              </label>
              <select 
                className="input-premium bg-surface w-full p-2 rounded-lg border border-white/10" 
                value={objective} 
                onChange={(e) => setObjective(e.target.value)}
              >
                <option>Hypertrophy (High Protein)</option>
                <option>Fat Loss (Caloric Deficit)</option>
                <option>Maintenance</option>
              </select>
            </div>
            <button 
              className={`btn-primary w-full mt-4 flex items-center justify-center gap-2 ${isGenerating ? 'opacity-70 cursor-wait' : ''}`} 
              onClick={handleGenerate}
              disabled={isGenerating}
            >
              {isGenerating ? <><Sparkles className="animate-pulse" size={18}/> Computing Matrix...</> : 'Compile Recommendations'}
            </button>
          </div>
        </div>
      </div>

      {/* Right Column: Analytics & Twin */}
      <div className="lg:col-span-2 space-y-6">
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-xl font-bold flex items-center gap-2 mb-6"><Activity className="text-secondary"/> Digital Nutrition Twin</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-[300px]">
            <div className="h-full w-full bg-surface/30 rounded-xl border border-white/5 flex flex-col items-center justify-center relative">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={nutritionData}>
                  <PolarGrid stroke="#334155" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#94A3B8', fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                  <Radar name="Intake" dataKey="A" stroke="#14B8A6" fill="#14B8A6" fillOpacity={0.4} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-4 flex flex-col justify-center">
              <div className="bg-surface p-4 rounded-xl border border-white/5 flex justify-between items-center">
                <span className="text-textMuted flex items-center gap-2"><Flame size={16} className="text-warning"/> Active Burn</span>
                <span className="text-xl font-mono">2,450 kcal</span>
              </div>
              <div className="bg-surface p-4 rounded-xl border border-white/5 flex justify-between items-center">
                <span className="text-textMuted flex items-center gap-2"><PieChart size={16} className="text-secondary"/> Current Deficit</span>
                <span className="text-xl font-mono text-success">-350 kcal</span>
              </div>
              <div className="text-xs text-textMuted p-4 bg-primary/5 rounded-xl border border-primary/10">
                <strong>System Assessment:</strong> Subject is operating at optimal deficit for fat loss goals. Prescribing optimized meal matrix based on current constraints.
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic AI Results Rendering */}
        <AnimatePresence>
          {aiResults && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 pt-4 border-t border-white/5">
              <h3 className="font-bold text-lg flex items-center gap-2"><Sparkles className="text-primary" size={18}/> Optimized Matrix Generated</h3>
              
              {aiResults.length === 0 ? (
                <div className="text-textMuted text-sm p-4 bg-surface rounded-xl border border-white/10 text-center">
                  No meals found matching your current budget constraint. Try increasing your budget.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {aiResults.map((meal, idx) => (
                    <div key={idx} className="bg-surface border border-white/10 rounded-xl p-4 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-sm leading-tight pr-2">{meal.name}</h4>
                          <span className="text-[10px] bg-success/20 text-success border border-success/20 px-2 py-0.5 rounded font-mono shrink-0">
                            {(meal.match_score * 100).toFixed(0)}% Match
                          </span>
                        </div>
                        <div className="flex gap-3 text-xs text-textMuted mb-4">
                          <span>{meal.cal} kcal</span>
                          <span>{meal.protein}g P</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-auto pt-4 border-t border-white/5">
                         <span className="font-medium text-sm">₹{meal.price}</span>
                         <button 
                           onClick={() => addToCart({...meal})} 
                           className="bg-primary/20 hover:bg-primary text-primary hover:text-background transition-colors p-1.5 rounded-lg"
                           title="Add to Cart"
                         >
                           <Plus size={16}/>
                         </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.div>
  );
}
