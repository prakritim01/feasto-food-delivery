import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Activity, Zap, Info } from 'lucide-react';
import { useFeastoStore } from '../store/useFeastoStore';

export default function SmartCart() {
  const { cart, isCartOpen, toggleCart, removeFromCart } = useFeastoStore();

  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const totalCal = cart.reduce((sum, item) => sum + item.cal, 0);
  const totalProtein = cart.reduce((sum, item) => sum + item.protein, 0);
  
  const deliveryFee = subtotal > 500 ? 0 : 40;
  const total = subtotal + deliveryFee;

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          />
          
          {/* Cart Panel */}
          <motion.div 
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full md:w-[450px] glass-panel z-50 border-l border-white/10 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-surface/50">
              <h2 className="text-xl font-bold flex items-center gap-2"><ShoppingBag size={20}/> Active Order</h2>
              <button onClick={toggleCart} className="p-2 hover:bg-white/5 rounded-lg transition-colors"><X size={20}/></button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-textMuted space-y-4">
                  <ShoppingBag size={48} className="opacity-20"/>
                  <p>Your cart is empty.</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    {cart.map((item, idx) => (
                      <div key={idx} className="flex gap-4 items-start p-3 bg-surface/30 rounded-xl border border-white/5">
                        <div className="w-16 h-16 bg-surface rounded-lg flex items-center justify-center flex-shrink-0 text-[8px] font-mono text-textMuted">IMG</div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h4 className="font-medium text-sm">{item.name}</h4>
                            <span className="font-medium text-sm">₹{item.price}</span>
                          </div>
                          <div className="flex gap-3 text-xs text-textMuted mt-1">
                            <span>{item.cal} kcal</span>
                            <span>{item.protein}g Protein</span>
                          </div>
                          <button onClick={() => removeFromCart(item.id)} className="text-xs text-error mt-2 hover:underline">Remove</button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* AI Nutrition Summary */}
                  <div className="bg-primary/10 border border-primary/20 rounded-xl p-4">
                    <h4 className="text-xs font-bold text-primary flex items-center gap-1 mb-3 uppercase tracking-wider"><Activity size={14}/> Order Telemetry</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-textMuted mb-1">Total Calories</p>
                        <p className="font-mono">{totalCal} <span className="text-xs font-sans">kcal</span></p>
                      </div>
                      <div>
                        <p className="text-xs text-textMuted mb-1">Total Protein</p>
                        <p className="font-mono text-success">{totalProtein}g</p>
                      </div>
                    </div>
                  </div>

                  {/* Smart Upsell */}
                  {subtotal < 500 && subtotal > 0 && (
                    <div className="bg-surface border border-white/10 rounded-xl p-4 flex gap-3 items-center">
                       <Zap className="text-warning flex-shrink-0" size={20}/>
                       <div>
                         <p className="text-sm font-medium">Add ₹{500 - subtotal} for free delivery</p>
                         <p className="text-xs text-textMuted mt-1">AI Suggests: <button className="text-primary hover:underline">Edamame Salad (₹180)</button></p>
                       </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Footer / Checkout */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-surface/50 space-y-4">
                <div className="space-y-2 text-sm text-textMuted">
                  <div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal}</span></div>
                  <div className="flex justify-between"><span>Delivery</span><span>{deliveryFee === 0 ? <span className="text-success">Free</span> : `₹${deliveryFee}`}</span></div>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t border-white/5">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
                <button className="btn-primary w-full py-3 text-lg mt-2">Proceed to Checkout</button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}