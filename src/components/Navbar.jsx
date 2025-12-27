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
    ['rgba(255, 255, 255, 0.02)', 'rgba(255, 255, 255, 0.08)']
  );

  const navShadow = useTransform(
    scrollY,
    [0, 100],
    [
      '0 0 6px rgba(0,0,0,0.03), 0 2px 6px rgba(0,0,0,0.08), inset 3px 3px 0.5px -3px rgba(255,255,255,0.1), inset -3px -3px 0.5px -3px rgba(255,255,255,0.05), inset 1px 1px 1px -0.5px rgba(255,255,255,0.2), inset -1px -1px 1px -0.5px rgba(255,255,255,0.2), 0 0 12px rgba(255,255,255,0.05)',
      '0 10px 30px rgba(0, 0, 0, 0.5), 0 0 10px rgba(255, 255, 255, 0.1), inset 3px 3px 0.5px -3px rgba(255,255,255,0.3), inset -3px -3px 0.5px -3px rgba(255,255,255,0.2)'
    ]
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
        className="flex items-center justify-between w-full max-w-6xl px-12 py-5 rounded-full border border-white/10 relative transition-all duration-700"
        style={{
          backgroundColor,
          boxShadow: navShadow,
        }}
      >
        {/* Liquid Glass Base Layer */}
        <div
          className="absolute inset-0 z-0 overflow-hidden rounded-full"
          style={{ 
            backdropFilter: 'url("#navbar-liquid-glass") blur(12px)',
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)",
          }}
        />
        
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent pointer-events-none" />

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
            const path = `/${item.toLowerCase()}`;
            const isActive = location.pathname === path;

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

        <svg className="hidden">
          <defs>
            <filter
              id="navbar-liquid-glass"
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
              colorInterpolationFilters="sRGB"
            >
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.015 0.015"
                numOctaves="2"
                seed="3"
                result="turbulence"
              />
              <feGaussianBlur in="turbulence" stdDeviation="4" result="blurredNoise" />
              <feDisplacementMap
                in="SourceGraphic"
                in2="blurredNoise"
                scale="15"
                xChannelSelector="R"
                yChannelSelector="B"
                result="displaced"
              />
              <feGaussianBlur in="displaced" stdDeviation="1" result="finalBlur" />
            </filter>
          </defs>
        </svg>
      </motion.nav>
    </div>
  );
};

export default Navbar;
