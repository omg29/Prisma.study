import React from 'react';
import { motion } from 'framer-motion';

const GlassCard = ({ children, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 1 
      }}
      viewport={{ once: true }}
      className={`glass-container p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
