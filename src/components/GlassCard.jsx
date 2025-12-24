import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const GlassCard = ({ children, className = "" }) => {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ currentTarget, clientX, clientY }) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 1 
      }}
      viewport={{ once: true }}
      className={`relative group overflow-hidden rounded-[2.5rem] transition-all duration-700 ${className}`}
      style={{
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.05)",
      }}
    >
      {/* Liquid Glass Base Layers */}
      <div
        className="absolute inset-0 z-0 opacity-60 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          backdropFilter: "blur(4px)",
          filter: "url(#glass-distortion)",
          background: "rgba(255, 255, 255, 0.03)",
        }}
      />
      <div
        className="absolute inset-0 z-0 bg-gradient-to-br from-white/[0.05] to-transparent pointer-events-none"
      />
      
      {/* Interactive Spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2.5rem] transition duration-300 opacity-0 group-hover:opacity-100 z-10"
        style={{
          background: `radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(255, 255, 255, 0.1), transparent 80%)`,
        }}
      />

      {/* Decorative Corners/Borders */}
      <div className="absolute inset-0 border border-white/[0.08] rounded-[2.5rem] z-20 pointer-events-none group-hover:border-white/20 transition-colors duration-500" />
      <div className="absolute inset-px rounded-[2.4rem] shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),inset_0_-1px_1px_rgba(0,0,0,0.4)] pointer-events-none z-20" />

      {/* Content */}
      <div className="relative z-30 flex flex-col h-full">
        {children}
      </div>
    </motion.div>
  );
};

export default GlassCard;
