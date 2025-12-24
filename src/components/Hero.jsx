import React from 'react';
import { motion } from 'framer-motion';
import { LiquidButton } from './ui/LiquidButton';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-40 px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-cyan-bright/20 bg-cyan-bright/5 backdrop-blur-md mb-12 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-cyan-bright animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.6)]" />
          <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-slate-300">
            v1.0 Early Access
          </span>
        </div>
        
        <h1 className="text-7xl md:text-9xl leading-[0.9] tracking-[-0.04em] mb-14 font-black">
          Study with <br />
          <span className="text-shimmer italic font-serif leading-tight">Clarity.</span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-xl md:text-2xl text-slate-300 mb-20 leading-relaxed font-medium">
          Transform your study experience with Prisma. 
          Break down complex topics into crystal-clear understandings.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-12">
          <LiquidButton variant="primary" size="xl" asChild>
            <a href="#dashboard" className="flex items-center gap-4 text-white text-lg font-bold">
              <span>Launch Dashboard</span>
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center border border-white/40 transition-all duration-300 group-hover:bg-white/30">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </a>
          </LiquidButton>
          
          <button className="text-slate-400 hover:text-white transition-all flex items-center gap-5 group font-bold uppercase tracking-[0.25em] text-[11px] hover:scale-105 duration-300">
            Watch Demo
            <div className="w-14 h-[2px] bg-slate-700 group-hover:w-24 transition-all group-hover:bg-gradient-to-r group-hover:from-cyan-bright group-hover:to-magenta" />
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
