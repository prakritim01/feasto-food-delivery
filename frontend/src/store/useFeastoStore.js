import { create } from 'zustand';

export const useFeastoStore = create((set) => ({
  user: { name: 'Alex M.', role: 'premium' },
  cart: [],
  isCartOpen: false,
  theme: 'dark',
  
  // Actions
  addToCart: (item) => set((state) => ({ cart: [...state.cart, item] })),
  removeFromCart: (id) => set((state) => ({ cart: state.cart.filter(i => i.id !== id) })),
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  
  // AI States
  conciergeQuery: { budget: 200, time: 30, goal: 'High Protein' },
  setConciergeQuery: (query) => set({ conciergeQuery: query }),
}));