import React from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Community from './components/Community';
import GlassCard from './components/GlassCard';
import { GlassFilter } from './components/ui/LiquidGlass';
import { ShaderAnimation } from './components/ui/ShaderAnimation';

function App() {
  return (
    <div className="relative min-h-screen text-white font-sans selection:bg-prism-cyan/30 overflow-x-hidden bg-black">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <ShaderAnimation />
      </div>
      
      <div className="relative z-10 min-h-screen">
        <GlassFilter />
        <Navbar />
      
      <main className="relative z-10 pt-20">
        <Hero />
      </main>

      <footer className="py-32 px-6 border-t border-white/5 text-center relative z-10">
        <div className="mb-8">
          <span className="text-4xl brand-font text-white">Prisma<span className="text-prism-cyan">.</span></span>
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
