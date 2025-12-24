import React from 'react';
import { motion } from 'framer-motion';
import { GlassButton } from './ui/LiquidGlass';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.05] backdrop-blur-md mb-10">
          <span className="w-2 h-2 rounded-full bg-prism-cyan animate-pulse" />
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/70">
            v1.0 Early Access
          </span>
        </div>
        
        <h1 className="text-6xl md:text-8xl leading-[0.9] tracking-[-0.03em] mb-12">
          Study with <br />
          <span className="text-shimmer italic font-serif leading-tight">Clarity.</span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-xl md:text-2xl text-zinc-300 mb-16 leading-relaxed font-medium">
          Transform your study experience with Prisma. 
          Break down complex topics into crystal-clear understandings.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
          <GlassButton href="#dashboard">
            <div className="flex items-center gap-4 text-white text-lg font-bold">
              <span>Launch Dashboard</span>
              <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center border border-white/20">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </GlassButton>
          
          <button className="text-zinc-400 hover:text-white transition-all flex items-center gap-4 group font-bold uppercase tracking-[0.2em] text-[11px]">
            Watch Demo
            <div className="w-12 h-[1px] bg-white/20 group-hover:w-20 transition-all group-hover:bg-prism-rose" />
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
