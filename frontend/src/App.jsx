import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChefHat, ShoppingCart, Activity, User, Home, MapPin } from 'lucide-react';
import { useFeastoStore } from './store/useFeastoStore';
import SmartCart from './components/SmartCart';

// Lazy load pages for performance
const LandingPage = lazy(() => import('./pages/LandingPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const AIHubPage = lazy(() => import('./pages/AIHubPage'));
const RestaurantPage = lazy(() => import('./pages/RestaurantPage'));

// Error Boundary & Loading States
class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { hasError: false }; }
  static getDerivedStateFromError(error) { return { hasError: true }; }
  render() {
    if (this.state.hasError) return <div className="h-screen flex items-center justify-center text-error">Something went wrong loading this module.</div>;
    return this.props.children;
  }
}

const PageSkeleton = () => (
  <div className="animate-pulse p-8 max-w-7xl mx-auto w-full space-y-8 h-screen pt-24">
    <div className="h-12 bg-card/50 rounded w-1/3"></div>
    <div className="h-64 bg-card/50 rounded-xl w-full"></div>
    <div className="grid grid-cols-3 gap-6"><div className="h-40 bg-card/50 rounded-xl"></div><div className="h-40 bg-card/50 rounded-xl"></div><div className="h-40 bg-card/50 rounded-xl"></div></div>
  </div>
);

// Layout Component
const PremiumLayout = ({ children }) => {
  const { cart, toggleCart } = useFeastoStore();
  
  return (
    <div className="min-h-screen bg-background text-textMain flex flex-col relative overflow-hidden">
      {/* Ambient Background Gradients */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[150px] -z-10 pointer-events-none" />

      {/* Glassmorphism Navbar */}
      <nav className="fixed top-0 w-full z-50 glass-panel border-b-0 border-white/5 py-4 px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-primary/10 p-2 rounded-xl group-hover:bg-primary/20 transition-colors">
              <ChefHat className="text-primary" size={28} />
            </div>
            <span className="text-2xl font-bold tracking-tight">Feasto<span className="text-primary">.ai</span></span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-textMuted">
            <Link to="/" className="hover:text-textMain transition-colors flex items-center gap-2"><Home size={16}/> Home</Link>
            <Link to="/ai-hub" className="hover:text-textMain transition-colors flex items-center gap-2"><Activity size={16}/> Intelligence</Link>
            <Link to="/restaurants" className="hover:text-textMain transition-colors flex items-center gap-2"><MapPin size={16}/> Explore</Link>
            <Link to="/dashboard" className="hover:text-textMain transition-colors flex items-center gap-2"><User size={16}/> Dashboard</Link>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-textMuted hover:text-textMain transition-colors" onClick={toggleCart}>
              <ShoppingCart size={24} />
              {cart.length > 0 && <span className="absolute -top-1 -right-1 bg-primary text-background text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-lg">{cart.length}</span>}
            </button>
            <button className="btn-primary text-sm hidden md:block">Upgrade</button>
          </div>
        </div>
      </nav>

      {/* Smart Cart Overlay */}
      <SmartCart />

      {/* Main Content Area */}
      <main className="flex-grow pt-24 pb-12 relative z-10">
        <ErrorBoundary>
          <Suspense fallback={<PageSkeleton />}>
            <AnimatePresence mode="wait">
              {children}
            </AnimatePresence>
          </Suspense>
        </ErrorBoundary>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-white/5 py-12 bg-surface/30 z-10">
        <div className="max-w-7xl mx-auto px-8 flex justify-between items-center text-textMuted text-sm">
          <p>© 2026 Feasto AI. Intelligence applied.</p>
          <div className="flex gap-4">
            <span className="hover:text-textMain cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-textMain cursor-pointer transition-colors">Terms</span>
            <span className="hover:text-textMain cursor-pointer transition-colors">System Status: <span className="text-success">Operational</span></span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <PremiumLayout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/ai-hub" element={<AIHubPage />} />
          <Route path="/restaurants" element={<RestaurantPage />} />
        </Routes>
      </PremiumLayout>
    </Router>
  );
}