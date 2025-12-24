import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="text-sm font-medium tracking-[0.3em] uppercase text-white/40 mb-4 block">
          Refract your potential.
        </span>
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8">
          Study with <span className="text-shimmer italic">Clarity.</span>
        </h1>
        <p className="max-w-xl mx-auto text-lg text-white/60 mb-12">
          Move from rote memorization to active, structural learning. 
          Prisma helps you visualize connections between concepts in a fluid, interactive workspace.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-liquid-light px-10 py-4 text-lg"
          >
            Enter the Prism
          </motion.button>
          
          <button className="text-white/60 hover:text-white transition-colors flex items-center gap-2 group">
            See Methodology
            <svg 
              viewBox="0 0 24 24" 
              className="w-4 h-4 transition-transform group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </motion.div>

      {/* Decorative prism lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <svg className="absolute w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
          <line x1="0" y1="100" x2="100" y2="0" stroke="white" strokeWidth="0.1" />
          <line x1="20" y1="100" x2="80" y2="0" stroke="white" strokeWidth="0.1" />
          <line x1="80" y1="100" x2="20" y2="0" stroke="white" strokeWidth="0.1" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
