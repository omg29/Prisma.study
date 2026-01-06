import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import {
  Trophy,
  Zap,
  Calendar,
  LogOut,
  Settings,
  User as UserIcon,
  ChevronRight,
  Target,
  Globe,
  Award
} from 'lucide-react';
import GlassCard from './GlassCard';
import { getRankStyle } from '../utils/rankStyles';

const ProfilePopover = ({ isOpen, onClose }) => {
  const { user, rank, level, logout } = useAuth();

  if (!user) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-[60]" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="absolute top-full right-0 mt-4 w-80 z-[70]"
          >
            <GlassCard className="border-white/10 shadow-2xl overflow-hidden bg-black/80 flex flex-col max-h-[85vh]">
              {/* Header - Non-scrollable */}
              <div className="p-6 bg-gradient-to-br from-cyan-bright/10 via-purple/10 to-magenta/10 border-b border-white/5 flex-shrink-0">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-bright via-purple to-magenta flex items-center justify-center font-bold text-white shadow-lg text-lg">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-green-500 border-2 border-[#0A0E1A]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white line-clamp-1">{user.name}</h3>
                    <p className={`text-[10px] uppercase tracking-widest inline-block ${getRankStyle(rank)}`}>{rank}</p>
                  </div>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-3">
                {/* 1. Current Season & Placement Combined Box */}
                <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 relative overflow-hidden group">
                  <div className="absolute -right-4 -top-4 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity">
                    <Trophy size={80} />
                  </div>
                  <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Award size={12} className="text-cyan-bright" /> Current Seasonal standing
                  </p>
                  <div className="flex items-end justify-between relative z-10">
                    <div>
                      <p className={`text-2xl font-black leading-none mb-1 inline-block ${getRankStyle(user.currentSeasonRank || 'Gold III')}`}>
                        {user.currentSeasonRank || 'Gold III'}
                      </p>
                      <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Active Season</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black text-white">{user.currentSeasonPlacement || '#1,242'}</p>
                      <p className="text-[8px] font-black text-zinc-600 uppercase tracking-[0.2em]">Placement</p>
                    </div>
                  </div>
                </div>

                {/* 2. All-Time Best Seasonal Rank Box */}
                <div className="bg-white/[0.03] border border-white/5 rounded-xl p-4">
                  <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest mb-2 flex items-center gap-1">
                    <Target size={12} className="text-magenta" /> Career Milestone
                  </p>
                  <div className="text-[10px] font-medium text-zinc-400 leading-relaxed">
                    All-time best seasonal rank: <span className={`inline-block uppercase tracking-tight ${getRankStyle(user.bestSeasonalRank)}`}>{user.bestSeasonalRank}</span>,
                    placement: <span className="text-white font-bold">{user.bestSeasonalPlacement}</span> in <span className="text-white font-bold">{user.bestSeasonalPeriod || 'Season 4'}</span>
                  </div>
                </div>

                {/* 3. Global Combined Box (Rank + Level) */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-white/[0.03] border border-white/5 rounded-xl p-3 flex flex-col justify-center">
                    <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest mb-1 flex items-center gap-1">
                      <Globe size={10} className="text-purple" /> Global Rank
                    </p>
                    <p className="text-xs font-black text-white">{user.allTimePlacement}</p>
                  </div>
                  <div className="bg-white/[0.03] border border-white/5 rounded-xl p-3 flex flex-col justify-center">
                    <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest mb-1 flex items-center gap-1">
                      <Zap size={10} className="text-yellow-400" /> All-Time Lvl
                    </p>
                    <p className="text-xs font-black text-white">{level}</p>
                  </div>
                </div>

                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3 flex items-center justify-between">
                  <p className="text-[8px] font-black text-zinc-600 uppercase tracking-widest flex items-center gap-2">
                    <Calendar size={10} /> Member Since
                  </p>
                  <p className="text-[10px] font-bold text-zinc-400">
                    {new Date(user.joinedAt).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
                  </p>
                </div>
              </div>

              {/* Menu - Non-scrollable */}
              <div className="p-2 border-t border-white/5 bg-black/20 flex-shrink-0">
                <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/[0.05] transition-all group">
                  <div className="flex items-center gap-3 text-zinc-400 group-hover:text-white transition-colors">
                    <Settings size={16} />
                    <span className="text-xs font-bold uppercase tracking-wider">Account Settings</span>
                  </div>
                  <ChevronRight size={14} className="text-zinc-600 group-hover:text-cyan-bright transition-colors" />
                </button>
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-500/10 text-zinc-400 hover:text-red-400 transition-all group"
                >
                  <LogOut size={16} />
                  <span className="text-xs font-bold uppercase tracking-wider">Sign Out</span>
                </button>
              </div>
            </GlassCard>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProfilePopover;
