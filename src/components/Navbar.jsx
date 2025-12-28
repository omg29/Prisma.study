import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { LiquidButton } from './ui/LiquidButton';
import { useAuth } from '../context/AuthContext';
import ProfilePopover from './ProfilePopover';

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  const { scrollY } = useScroll();
  const { user, isAuthenticated } = useAuth();

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
          {isAuthenticated ? (
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-4 px-4 py-2 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.08] transition-all duration-300 group cursor-pointer"
              >
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-bright via-purple to-magenta flex items-center justify-center font-bold text-white shadow-lg group-hover:scale-105 transition-transform duration-500 text-xs">
                    {user?.name?.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500 border-2 border-black/20" />
                </div>
                <div className="text-left hidden lg:block">
                  <p className="text-[11px] font-bold text-white leading-tight">{user?.name}</p>
                  <p className="text-[9px] text-zinc-500 uppercase tracking-widest font-black leading-tight">Level {user?.level}</p>
                </div>
              </button>
              
              <ProfilePopover isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
            </div>
          ) : (
            <>
              <Link 
                to="/login"
                className="text-xs font-bold uppercase tracking-[0.2em] text-slate-300 hover:text-white transition-all duration-300 hover:scale-105"
              >
                Login
              </Link>
              <Link to="/signup">
                <LiquidButton 
                  variant="primary" 
                  size="default"
                  className="!from-[#43C6F1] !to-[#E063F1] hover:shadow-[0_0_20px_rgba(67,198,241,0.4)] transition-shadow"
                >
                  Sign Up
                </LiquidButton>
              </Link>
            </>
          )}
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
