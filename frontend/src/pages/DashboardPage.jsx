import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Settings, User, CreditCard, Bell, TrendingUp, IndianRupee } from 'lucide-react';

export default function DashboardPage() {
  const spendData = [
    { name: 'Mon', spend: 400 }, { name: 'Tue', spend: 300 }, { name: 'Wed', spend: 550 },
    { name: 'Thu', spend: 200 }, { name: 'Fri', spend: 800 }, { name: 'Sat', spend: 1200 }, { name: 'Sun', spend: 600 }
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-8 mt-8">
      {/* Sidebar navigation */}
      <div className="md:col-span-1 space-y-2">
        <div className="p-6 glass-card rounded-2xl mb-6 border-white/10">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-xl font-bold mb-4 shadow-lg text-background">AM</div>
          <h3 className="font-bold text-lg">Alex Mercer</h3>
          <p className="text-sm text-textMuted">Pro Tier</p>
        </div>
        {[
          { icon: <User size={18}/>, label: 'Profile Settings', active: false },
          { icon: <TrendingUp size={18}/>, label: 'Analytics', active: true },
          { icon: <CreditCard size={18}/>, label: 'Billing & Subscriptions', active: false },
          { icon: <Bell size={18}/>, label: 'Notification Preferences', active: false },
          { icon: <Settings size={18}/>, label: 'System Preferences', active: false },
        ].map((item, i) => (
          <button key={i} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${item.active ? 'bg-primary/10 text-primary border border-primary/20' : 'text-textMuted hover:bg-surface hover:text-textMain'}`}>
            {item.icon} {item.label}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="md:col-span-3 space-y-6">
        <h2 className="text-2xl font-bold border-b border-white/5 pb-4">Spending Telemetry</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-surface/50 border border-white/5 p-6 rounded-2xl"><p className="text-sm text-textMuted mb-2">Weekly Total</p><p className="text-3xl font-mono flex items-center"><IndianRupee size={24}/> 4,050</p></div>
          <div className="bg-surface/50 border border-white/5 p-6 rounded-2xl"><p className="text-sm text-textMuted mb-2">Vs Previous Week</p><p className="text-3xl font-mono text-success">-12.5%</p></div>
          <div className="bg-surface/50 border border-white/5 p-6 rounded-2xl"><p className="text-sm text-textMuted mb-2">Projected Monthly</p><p className="text-3xl font-mono text-warning flex items-center"><IndianRupee size={24}/> 16,200</p></div>
        </div>

        <div className="glass-card rounded-2xl p-6 h-[400px]">
          <h3 className="font-medium text-textMuted mb-6">Expenditure Matrix</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={spendData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="name" stroke="#94A3B8" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
              <YAxis stroke="#94A3B8" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value}`} />
              <Tooltip cursor={{ fill: '#1E293B' }} contentStyle={{ backgroundColor: '#0F172A', border: '1px solid #334155', borderRadius: '8px' }} />
              <Bar dataKey="spend" fill="#14B8A6" radius={[4, 4, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}