import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { LiquidButton } from './ui/LiquidButton';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
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
        className="flex items-center justify-between w-full max-w-6xl px-12 py-6 rounded-full border relative overflow-hidden transition-all duration-700 shadow-2xl"
        style={{
          backgroundColor,
          borderColor: 'rgba(148, 163, 184, 0.15)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
        }}
      >
        {/* Enhanced Liquid Glass Layer */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backdropFilter: "blur(16px) saturate(180%)",
            background: "linear-gradient(135deg, rgba(26, 31, 46, 0.6) 0%, rgba(10, 14, 26, 0.8) 100%)",
          }}
        />

        <Link to="/" className="relative z-10 flex items-center gap-4 group cursor-pointer">
          <div className="w-9 h-9 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12">
            <img src="/logo.svg" alt="Prisma Logo" className="w-full h-full object-contain drop-shadow-lg" />
          </div>
          <span className="text-3xl font-medium tracking-tight text-white brand-font transition-all duration-300 group-hover:text-cyan-bright">
            Prisma.
          </span>
        </Link>

        <div className="relative z-10 hidden md:flex items-center gap-14">
          {menuItems.map((item) => {
            const isPage = item === 'Community';
            const path = isPage ? '/community' : `/#${item.toLowerCase()}`;
            const isActive = isPage && location.pathname === '/community';

            return (
              <Link
                key={item}
                to={path}
                className={`text-sm font-semibold uppercase tracking-[0.15em] transition-all duration-300 relative group ${isActive ? 'text-white' : 'text-slate-300 hover:text-white'
                  }`}
              >
                <span className="relative z-10">{item}</span>
                <span className={`absolute bottom-[-6px] left-0 h-[2px] bg-gradient-to-r from-cyan-bright via-magenta to-purple transition-all duration-500 ease-out ${isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
              </Link>
            );
          })}
        </div>

        <div className="relative z-10 flex items-center gap-6">
          <button className="text-xs font-bold uppercase tracking-[0.2em] text-slate-300 hover:text-white transition-all duration-300 hover:scale-105">
            Login
          </button>
          <LiquidButton variant="primary" size="default">
            Sign Up
          </LiquidButton>
        </div>
      </motion.nav>
    </div>
  );
};

export default Navbar;
