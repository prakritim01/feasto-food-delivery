import React from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Clock, Leaf, ShieldCheck, TrendingUp, Search, Info } from 'lucide-react';
import { useFeastoStore } from '../store/useFeastoStore';

export default function RestaurantPage() {
  const { addToCart } = useFeastoStore();
  
  const restaurant = {
    name: 'Ocean Fresh',
    rating: 4.9,
    reviews: '2.1K',
    distance: '1.2 km',
    time: '20-30 min',
    tags: ['Healthy', 'Seafood', 'Keto'],
    sustainabilityScore: 'A+',
  };

  const menu = [
    { id: '101', name: 'Keto Salmon Bowl', desc: 'Wild-caught salmon, quinoa, avocado, and sesame dressing.', price: 450, cal: 450, protein: 35, popular: true },
    { id: '102', name: 'Tuna Poke Wrap', desc: 'Fresh tuna, mixed greens, and spicy mayo in a spinach wrap.', price: 380, cal: 320, protein: 28, popular: false },
    { id: '103', name: 'Grilled Sea Bass', desc: 'Lemon-herb crusted sea bass with asparagus.', price: 550, cal: 410, protein: 42, popular: true },
    { id: '104', name: 'Edamame Salad', desc: 'Steamed edamame, sea salt, and chili flakes.', price: 180, cal: 150, protein: 12, popular: false },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto px-8 mt-8 space-y-8">
      
      {/* Restaurant Header */}
      <div className="glass-card rounded-3xl overflow-hidden relative border-white/10">
        <div className="h-64 w-full bg-surface relative flex items-center justify-center">
            <span className="text-textMuted font-mono text-sm tracking-widest">IMG_RENDER_ENGINE_BANNER</span>
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        </div>
        
        <div className="relative px-8 pb-8 -mt-16">
          <div className="flex justify-between items-end">
            <div>
              <div className="flex gap-2 mb-3">
                 <span className="bg-success/20 text-success backdrop-blur text-xs px-2 py-1 rounded-md border border-success/20 flex items-center gap-1"><ShieldCheck size={12}/> Verified Partner</span>
                 <span className="bg-primary/20 text-primary backdrop-blur text-xs px-2 py-1 rounded-md border border-primary/20 flex items-center gap-1"><Leaf size={12}/> {restaurant.sustainabilityScore} Eco-Score</span>
              </div>
              <h1 className="text-4xl font-bold">{restaurant.name}</h1>
              <div className="flex items-center gap-4 mt-2 text-sm text-textMuted">
                 <span className="flex items-center gap-1 text-warning"><Star size={14} className="fill-warning"/> {restaurant.rating} ({restaurant.reviews})</span>
                 <span className="flex items-center gap-1"><MapPin size={14}/> {restaurant.distance}</span>
                 <span className="flex items-center gap-1"><Clock size={14}/> {restaurant.time}</span>
              </div>
            </div>
            <div className="hidden md:flex gap-2">
              {restaurant.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-surface border border-white/5 rounded-full text-xs text-textMuted">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Menu Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar Categories */}
        <div className="hidden lg:block space-y-2">
           <h3 className="font-bold text-lg mb-4">Categories</h3>
           {['Recommended', 'Signature Bowls', 'Wraps', 'Sides', 'Beverages'].map(cat => (
             <button key={cat} className="w-full text-left px-4 py-2 text-sm text-textMuted hover:text-textMain hover:bg-surface rounded-lg transition-colors">{cat}</button>
           ))}
        </div>

        {/* Menu Items */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Recommended</h2>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-textMuted" size={16}/>
              <input type="text" placeholder="Search menu..." className="w-full bg-surface border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-primary/50" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {menu.map(item => (
              <div key={item.id} className="glass-card p-4 rounded-2xl flex gap-4 group">
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold group-hover:text-primary transition-colors">{item.name}</h3>
                      {item.popular && <span className="flex items-center gap-1 text-[10px] bg-warning/20 text-warning px-2 py-0.5 rounded border border-warning/20 uppercase tracking-wider"><TrendingUp size={10}/> Trending</span>}
                    </div>
                    <p className="text-xs text-textMuted mt-1 line-clamp-2">{item.desc}</p>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                     <span className="font-medium">₹{item.price}</span>
                     <div className="flex gap-3 text-xs text-textMuted">
                       <span>{item.cal} kcal</span>
                       <span>{item.protein}g P</span>
                     </div>
                  </div>
                </div>
                <div className="w-24 h-24 bg-surface rounded-xl flex-shrink-0 relative overflow-hidden flex flex-col items-center justify-center">
                   <span className="text-[8px] font-mono text-textMuted">IMG</span>
                   <button onClick={() => addToCart(item)} className="absolute bottom-2 right-2 bg-background/80 backdrop-blur border border-white/10 w-8 h-8 rounded-lg flex items-center justify-center hover:bg-primary hover:text-background transition-colors">+</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}