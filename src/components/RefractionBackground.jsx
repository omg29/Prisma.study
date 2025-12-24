import React from 'react';
import { motion } from 'framer-motion';

const RefractionBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-primary-black">
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] blur-[120px] rounded-full opacity-20"
        style={{ backgroundColor: 'var(--prism-cyan)' }}
      />
      <motion.div
        animate={{
          x: [0, -80, 0],
          y: [0, 100, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] blur-[120px] rounded-full opacity-20"
        style={{ backgroundColor: 'var(--prism-purple)' }}
      />
      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, -100, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-[20%] right-[10%] w-[40%] h-[40%] blur-[120px] rounded-full opacity-20"
        style={{ backgroundColor: 'var(--prism-cyan)' }}
      />
    </div>
  );
};

export default RefractionBackground;
