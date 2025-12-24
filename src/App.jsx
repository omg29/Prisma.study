import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import RefractionBackground from './components/RefractionBackground';
import GlassCard from './components/GlassCard';
import { BookOpen, Share2, Layers, Zap } from 'lucide-react';

function App() {
  return (
    <div className="relative min-h-screen text-white font-sans selection:bg-prism-cyan/30 overflow-x-hidden">
      <div className="grainy-overlay" />
      <RefractionBackground />
      <Navbar />
      
      <main>
        <Hero />

        {/* Features Section */}
        <section id="features" className="px-6 py-24 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <GlassCard>
              <Zap className="w-8 h-8 text-prism-cyan mb-4" />
              <h3 className="text-xl font-semibold mb-2">Active Learning</h3>
              <p className="text-white/60">Spatial canvas where notes float and connect intuitively.</p>
            </GlassCard>
            <GlassCard>
              <Layers className="w-8 h-8 text-prism-purple mb-4" />
              <h3 className="text-xl font-semibold mb-2">Structural Flow</h3>
              <p className="text-white/60">Visualize hierarchies and relationships between complex ideas.</p>
            </GlassCard>
            <GlassCard>
              <BookOpen className="w-8 h-8 text-prism-cyan mb-4" />
              <h3 className="text-xl font-semibold mb-2">Refined Library</h3>
              <p className="text-white/60">A clean vessel for your information, distraction-free.</p>
            </GlassCard>
            <GlassCard>
              <Share2 className="w-8 h-8 text-prism-purple mb-4" />
              <h3 className="text-xl font-semibold mb-2">Collaborative Prism</h3>
              <p className="text-white/60">Share your knowledge structures with the global community.</p>
            </GlassCard>
          </div>
        </section>
      </main>

      <footer className="py-12 px-6 border-t border-white/5 text-center text-white/30 text-sm">
        <p>© 2025 <span style={{ fontFamily: "'Pinyon Script', cursive" }} className="text-xl">Prisma.</span> - Refract your potential.</p>
      </footer>
    </div>
  );
}

export default App;
