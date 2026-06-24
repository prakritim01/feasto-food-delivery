import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Target, Flame, Activity, IndianRupee, PieChart } from 'lucide-react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

export default function AIHubPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const nutritionData = [
    { subject: 'Protein', A: 120, fullMark: 150 },
    { subject: 'Carbs', A: 98, fullMark: 150 },
    { subject: 'Fat', A: 86, fullMark: 150 },
    { subject: 'Vitamins', A: 99, fullMark: 150 },
    { subject: 'Hydration', A: 85, fullMark: 150 },
    { subject: 'Fiber', A: 65, fullMark: 150 },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
      
      {/* Left Column: Input Vectors */}
      <div className="space-y-6">
        <div className="glass-card rounded-2xl p-6 border-l-4 border-l-primary">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-primary/20 p-2 rounded-lg text-primary"><Brain size={24}/></div>
            <div><h2 className="text-xl font-bold">Food Concierge</h2><p className="text-xs text-textMuted">Define constraint parameters</p></div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm text-textMuted flex items-center gap-2 mb-2"><IndianRupee size={14}/> Budget Optimizer</label>
              <input type="range" className="w-full accent-primary" min="100" max="2000" defaultValue="450" />
              <div className="flex justify-between text-xs text-textMuted mt-1"><span>₹100</span><span>₹450</span><span>₹2000</span></div>
            </div>
            <div>
              <label className="text-sm text-textMuted flex items-center gap-2 mb-2"><Target size={14}/> Macro Objective</label>
              <select className="input-premium bg-surface">
                <option>Hypertrophy (High Protein)</option>
                <option>Fat Loss (Caloric Deficit)</option>
                <option>Maintenance</option>
              </select>
            </div>
            <button className="btn-primary w-full mt-4" onClick={() => setIsGenerating(true)}>
              {isGenerating ? 'Computing...' : 'Compile Recommendations'}
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
                <strong>System Assessment:</strong> Subject is operating at optimal deficit for fat loss goals. Prescribing high-protein, low-GI carb dinner matrix.
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}