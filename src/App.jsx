import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CommunityPage from './pages/CommunityPage';
import { GlassFilter } from './components/ui/LiquidGlass';
import { ShaderAnimation } from './components/ui/ShaderAnimation';

function App() {
  return (
    <div className="relative min-h-screen text-white font-sans selection:bg-teal-accent/30 overflow-x-hidden" style={{ background: '#0A0E1A' }}>
      <div className="fixed inset-0 z-0 pointer-events-none">
        <ShaderAnimation />
      </div>

      <div className="relative z-10 min-h-screen">
        <GlassFilter />
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/community" element={<CommunityPage />} />
        </Routes>

        <footer className="py-32 px-6 border-t border-white/5 text-center relative z-10">
          <div className="mb-8 flex items-center justify-center gap-4">
            <img src="/logo.svg" alt="Prisma Logo" className="w-10 h-10 opacity-80" />
            <span className="text-4xl brand-font text-white">Prisma.</span>
          </div>
          <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.3em]">
            © 2025 Refract your potential.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
