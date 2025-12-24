import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(2, 2, 2, 0)', 'rgba(2, 2, 2, 0.4)']
  );

  const borderOpacity = useTransform(
    scrollY,
    [0, 100],
    ['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.12)']
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = ['Methodology', 'Community', 'Founders', 'Dashboard'];

  return (
    <div className="fixed top-8 left-0 w-full z-50 px-6 flex justify-center">
      <motion.nav
        style={{ backgroundColor, borderColor: borderOpacity }}
        className="flex items-center justify-between w-full max-w-5xl px-10 py-5 rounded-full border border-white/10 relative overflow-hidden transition-all duration-500"
      >
        {/* Liquid Glass Layer */}
        <div 
          className="absolute inset-0 z-0 opacity-80"
          style={{ 
            backdropFilter: "blur(5px)",
            filter: "url(#glass-distortion)",
            background: "rgba(255, 255, 255, 0.05)",
          }}
        />

        <div className="relative z-10 flex items-center gap-2 group cursor-pointer">
          <span className="text-3xl font-medium tracking-tighter text-white brand-font">
            Prisma<span className="text-prism-cyan">.</span>
          </span>
        </div>

        <div className="relative z-10 hidden md:flex items-center gap-12">
          {menuItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="nav-link"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="relative z-10 flex items-center gap-8">
          <button className="text-xs font-bold uppercase tracking-widest text-zinc-300 hover:text-white transition-colors">Login</button>
          <button className="btn-prismatic text-[10px] px-8 py-2.5 font-black uppercase tracking-[0.2em]">
            <span>Sign Up</span>
          </button>
        </div>
      </motion.nav>
    </div>
  );
};

export default Navbar;
