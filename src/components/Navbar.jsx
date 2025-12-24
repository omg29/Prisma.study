import React from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const menuItems = ['Methodology', 'Library', 'Community', 'Pricing'];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex items-center justify-between backdrop-blur-md bg-transparent border-b border-white/5">
      <div className="flex items-center gap-2">
        <span className="text-3xl font-medium tracking-normal text-white" style={{ fontFamily: "'Pinyon Script', cursive" }}>
          Prisma<span className="text-prism-cyan">.</span>
        </span>
      </div>

      <div className="hidden md:flex items-center gap-8">
        {menuItems.map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="relative text-sm font-medium text-white/70 hover:text-white transition-colors group"
          >
            {item}
            <motion.div
              className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gradient-to-r from-prism-cyan to-transparent group-hover:w-full transition-all duration-300"
              layoutId="underline"
            />
          </a>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <button className="btn-ghost text-sm">Login</button>
        <button className="btn-liquid-light text-sm text-white">Sign Up</button>
      </div>
    </nav>
  );
};

export default Navbar;
