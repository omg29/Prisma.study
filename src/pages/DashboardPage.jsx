import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    LayoutDashboard, 
    Beaker, 
    Trophy, 
    Flame, 
    Zap, 
    Search, 
    Plus, 
    Clock, 
    Calendar,
    ChevronRight,
    Youtube,
    FileText,
    Dna,
    Settings,
    FolderPlus,
    Folder,
    MoreVertical,
    Star,
    ArrowUpRight,
    Globe
} from 'lucide-react';
import { LiquidButton } from '../components/ui/LiquidButton';
import GlassCard from '../components/GlassCard';

const DashboardPage = () => {
    const [activeTab, setActiveTab] = useState('Home');
    const [searchQuery, setSearchQuery] = useState('');

    const sidebarItems = [
        { name: 'Home', icon: <LayoutDashboard size={20} /> },
        { name: 'Study Lab', icon: <Beaker size={20} /> },
        { name: 'Leaderboard', icon: <Trophy size={20} /> },
    ];

    const stats = [
        { label: 'Daily Streak', value: '12 Days', icon: <Flame className="text-orange-500" />, detail: 'Top 5% this week' },
        { 
            label: 'Total XP', 
            value: '12,450', 
            icon: <Zap className="text-yellow-400" />, 
            detail: 'Level 24 Scholar',
            ranking: '#8,420 All-Time'
        },
        { 
            label: 'Current Rank', 
            value: 'Gold III', 
            icon: <Trophy className="text-cyan-400" />, 
            ranking: '#1,242 Seasonal',
            isRank: true
        },
    ];

    const folders = [
        { name: 'Science & Medicine', count: 12, color: 'text-cyan-bright' },
        { name: 'Humanities', count: 8, color: 'text-magenta' },
        { name: 'Mathematics', count: 5, color: 'text-purple' },
    ];

    const kits = [
        { title: 'Cellular Respiration', class: 'AP Biology', lastStudied: '2h ago', progress: 65, icon: <Dna className="text-cyan-bright" />, folder: 'Science & Medicine', favorite: true },
        { title: 'The Cold War', class: 'AP US History', lastStudied: 'Yesterday', progress: 42, icon: <Globe className="text-magenta" />, folder: 'Humanities', favorite: false },
        { title: 'Derivatives', class: 'Calculus BC', lastStudied: '3d ago', progress: 88, icon: <Zap className="text-purple" />, folder: 'Mathematics', favorite: true },
        { title: 'Organic Chemistry', class: 'Chemistry', lastStudied: '5d ago', progress: 12, icon: <Beaker className="text-cyan-bright" />, folder: 'Science & Medicine', favorite: false },
        { title: 'Macroeconomics', class: 'Economics', lastStudied: '1w ago', progress: 95, icon: <FileText className="text-orange-400" />, folder: 'Humanities', favorite: true },
        { title: 'Neural Pathways', class: 'Psychology', lastStudied: '2w ago', progress: 30, icon: <Dna className="text-cyan-bright" />, folder: 'Science & Medicine', favorite: false },
    ];

    return (
        <div className="flex min-h-screen bg-[#020202] pt-24 text-slate-200">
            {/* Secondary Sidebar */}
            <aside className="w-72 border-r border-white/5 bg-black/40 backdrop-blur-2xl flex flex-col fixed h-[calc(100vh-6rem)] z-40 transition-all duration-500">
                <div className="p-8">
                    <div className="flex items-center gap-4 px-4 py-4 rounded-2xl bg-white/[0.03] border border-white/5 mb-10 hover:bg-white/[0.05] transition-colors cursor-pointer group">
                        <div className="relative">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-bright via-purple to-magenta flex items-center justify-center font-bold text-white shadow-lg group-hover:scale-110 transition-transform duration-500">
                                JS
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-black animate-pulse" />
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-bold truncate group-hover:text-cyan-bright transition-colors">Jonathan S.</p>
                            <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-black">Level 24</p>
                        </div>
                    </div>

                    <nav className="space-y-1.5">
                        {sidebarItems.map((item) => (
                            <button
                                key={item.name}
                                onClick={() => setActiveTab(item.name)}
                                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-500 group relative overflow-hidden ${
                                    activeTab === item.name 
                                    ? 'text-white' 
                                    : 'text-zinc-500 hover:text-zinc-300'
                                }`}
                            >
                                {activeTab === item.name && (
                                    <motion.div 
                                        layoutId="sidebarGlow"
                                        className="absolute inset-0 bg-white/[0.03] border border-white/10 rounded-xl"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className={`relative z-10 transition-colors duration-500 ${activeTab === item.name ? 'text-cyan-bright' : 'group-hover:text-zinc-300'}`}>
                                    {item.icon}
                                </span>
                                <span className="relative z-10 text-sm font-bold tracking-tight">{item.name}</span>
                                {activeTab === item.name && (
                                    <motion.div 
                                        layoutId="activeSide" 
                                        className="absolute left-0 w-1 h-5 rounded-full bg-cyan-bright" 
                                    />
                                )}
                            </button>
                        ))}
                    </nav>

                    <div className="mt-12">
                        <div className="flex items-center justify-between mb-4 px-4">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 text-shimmer">Folders</span>
                            <button className="text-zinc-500 hover:text-white transition-colors">
                                <Plus size={14} />
                            </button>
                        </div>
                        <div className="space-y-1">
                            {folders.map((folder) => (
                                <button key={folder.name} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-semibold text-zinc-400 hover:text-white hover:bg-white/[0.03] transition-all group">
                                    <Folder size={16} className={`${folder.color} opacity-60 group-hover:opacity-100 transition-opacity`} />
                                    <span className="flex-1 text-left truncate">{folder.name}</span>
                                    <span className="text-[10px] opacity-40 group-hover:opacity-100 font-black">{folder.count}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-auto p-8">
                    <GlassCard className="p-5 border-white/5 bg-gradient-to-br from-cyan-bright/[0.03] to-magenta/[0.03]">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Refraction Goal</span>
                            <span className="text-[10px] font-black text-cyan-bright">84%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden shadow-inner">
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: '84%' }}
                                className="h-full bg-gradient-to-r from-cyan-bright via-purple to-magenta"
                            />
                        </div>
                        <p className="text-[9px] text-zinc-500 mt-2 font-medium">160 XP to <span className="text-white font-bold underline decoration-cyan-bright/50">Platinum III</span></p>
                    </GlassCard>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 ml-72 p-10 overflow-y-auto">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.02 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {activeTab === 'Home' && (
                            <div className="max-w-7xl mx-auto">
                                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Refracting Potential</span>
                                        </div>
                                        <h1 className="text-5xl font-black tracking-tighter text-white">
                                            Welcome Back, <span className="text-shimmer brand-font italic">Scholar</span>
                                        </h1>
                                    </div>
                                    <div className="flex items-center gap-4 w-full md:w-auto">
                                        <div className="relative group flex-1 md:flex-none md:w-64">
                                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-cyan-bright transition-colors" size={18} />
                                            <input 
                                                type="text" 
                                                placeholder="Search your library..." 
                                                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:border-cyan-bright/30 transition-all font-medium"
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                            />
                                        </div>
                                        <LiquidButton variant="primary" size="default" className="flex items-center gap-3 px-8 shadow-[0_0_30px_rgba(34,211,238,0.2)]">
                                            <Plus size={20} strokeWidth={3} />
                                            <span className="font-black uppercase tracking-wider text-xs">Create New Kit</span>
                                        </LiquidButton>
                                    </div>
                                </header>

                                {/* Stats Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                                    {stats.map((stat, i) => (
                                        <GlassCard key={i} className="p-8 border-white/5 group hover:border-white/10 transition-all duration-500 relative overflow-hidden">
                                            <div className="absolute -right-8 -bottom-8 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-700 pointer-events-none transform rotate-12">
                                                {React.cloneElement(stat.icon, { size: 140 })}
                                            </div>
                                            <div className="flex items-center gap-6 mb-4">
                                                <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500">
                                                    {stat.icon}
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                                                    <p className="text-3xl font-black text-white">{stat.value}</p>
                                                </div>
                                            </div>
                                            {stat.detail && (
                                                <div className="flex items-center gap-2 mt-4">
                                                    <div className="w-1 h-1 rounded-full bg-cyan-bright animate-glow" />
                                                    <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest leading-none">{stat.detail}</span>
                                                </div>
                                            )}
                                            {stat.ranking && (
                                                <div className="mt-4">
                                                    <div className={`inline-block px-3 py-1.5 rounded-lg border shadow-sm ${
                                                        stat.isRank 
                                                        ? 'bg-cyan-bright/5 border-cyan-bright/10 text-cyan-bright' 
                                                        : 'bg-white/5 border-white/5 text-zinc-500'
                                                    }`}>
                                                        <p className="text-[9px] font-black uppercase tracking-widest leading-none">{stat.ranking}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </GlassCard>
                                    ))}
                                </div>

                                {/* Main Area with Study Pulse */}
                                <div className="grid grid-cols-1 gap-12 mb-16">
                                    <section>
                                        <div className="flex items-center justify-between mb-8">
                                            <h2 className="text-2xl font-black tracking-tight flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-magenta/10 flex items-center justify-center">
                                                    <Calendar size={22} className="text-magenta" />
                                                </div>
                                                Spectral Activity
                                            </h2>
                                            <div className="flex items-center gap-8">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-3 h-3 rounded-sm bg-cyan-bright opacity-20" />
                                                    <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Low Intensity</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-3 h-3 rounded-sm bg-cyan-bright shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
                                                    <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Diffraction Peak</span>
                                                </div>
                                            </div>
                                        </div>
                                        <GlassCard className="p-10 border-white/5 relative overflow-hidden group/pulse bg-gradient-to-br from-black to-[#050505]">
                                            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-cyan-bright/[0.03] to-transparent opacity-0 group-hover/pulse:opacity-100 transition-opacity duration-1000" />
                                            
                                            {/* Prismatic Background Effect */}
                                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.05)_0%,transparent_50%)]" />

                                            {/* Updated Prismatic Heatmap */}
                                            <div className="flex gap-2 h-48 items-end relative z-10">
                                                {Array.from({ length: 60 }).map((_, i) => {
                                                    const baseHeight = [20, 40, 60, 30, 80, 50, 90, 40, 70, 40][i % 10];
                                                    const noise = Math.sin(i * 0.5) * 10;
                                                    const height = Math.min(100, Math.max(10, baseHeight + noise));
                                                    const opacity = height / 100;
                                                    const isPeak = height > 80;
                                                    
                                                    return (
                                                        <div 
                                                            key={i} 
                                                            className="flex-1 rounded-t-sm transition-all duration-700 hover:brightness-150 cursor-help relative group/bar"
                                                            style={{ 
                                                                height: `${height}%`,
                                                                background: isPeak 
                                                                    ? 'linear-gradient(to top, rgba(34,211,238,0.1), rgba(34,211,238,1))' 
                                                                    : `rgba(34,211,238, ${0.1 + opacity * 0.7})`,
                                                                boxShadow: isPeak ? '0 0 20px rgba(34, 211, 238, 0.5)' : 'none'
                                                            }}
                                                        >
                                                            <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-black px-2 py-1 rounded-lg opacity-0 group-hover/bar:opacity-100 transition-all transform group-hover/bar:-translate-y-2 whitespace-nowrap z-20 pointer-events-none shadow-2xl">
                                                                {Math.floor(height * 2.4)} XP
                                                                <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45" />
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                            <div className="flex justify-between mt-8 text-[11px] text-zinc-500 uppercase tracking-[0.3em] font-black px-2 border-t border-white/5 pt-6">
                                                <span>September 2025</span>
                                                <span>October 2025</span>
                                                <span>November 2025</span>
                                                <span>December 2025</span>
                                            </div>
                                        </GlassCard>
                                    </section>
                                </div>

                                {/* Study Kit Organization */}
                                <section className="mb-20">
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="flex items-center gap-4">
                                            <h2 className="text-3xl font-black tracking-tight">Active Study Kits</h2>
                                            <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                                                {kits.length} Sets Total
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-xs font-bold hover:bg-white/10 transition-all">
                                                <FolderPlus size={16} className="text-zinc-500" />
                                                New Folder
                                            </button>
                                            <div className="w-px h-6 bg-white/10 mx-2" />
                                            <select className="bg-transparent border-none text-xs font-bold text-zinc-500 focus:outline-none appearance-none cursor-pointer pr-6 hover:text-white transition-colors">
                                                <option>Recently Studied</option>
                                                <option>Mastery (High-Low)</option>
                                                <option>Name A-Z</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        <motion.div 
                                            whileHover={{ scale: 1.02 }}
                                            className="p-8 rounded-[2rem] bg-white/[0.02] border-2 border-dashed border-white/5 flex flex-col items-center justify-center group cursor-pointer hover:bg-white/[0.04] hover:border-cyan-bright/20 transition-all duration-500 min-h-[280px]"
                                        >
                                            <div className="w-16 h-16 rounded-full bg-cyan-bright/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                                                <Plus size={32} className="text-cyan-bright" />
                                            </div>
                                            <p className="text-sm font-bold text-white mb-1">Create Your Next Kit</p>
                                            <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest italic">Start Your Deep Focus Session</p>
                                        </motion.div>

                                        {kits.map((kit, i) => (
                                            <GlassCard key={i} className="p-8 group cursor-pointer hover:border-cyan-bright/40 transition-all duration-700 relative overflow-hidden bg-gradient-to-br from-white/[0.01] to-transparent">
                                                <div className="flex items-start justify-between mb-8">
                                                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 group-hover:bg-cyan-bright/10 group-hover:border-cyan-bright/20 transition-all duration-500">
                                                        {kit.icon}
                                                    </div>
                                                    <div className="flex flex-col items-end gap-2 relative z-20">
                                                        <button className="p-2 -mr-2 -mt-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <MoreVertical size={16} className="text-zinc-500" />
                                                        </button>
                                                        <div className={`text-[9px] font-black px-2.5 py-1 rounded-full border border-white/5 uppercase tracking-widest ${kit.favorite ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' : 'bg-white/5 text-zinc-500'}`}>
                                                            {kit.folder}
                                                        </div>
                                                        <div className="text-[8px] font-black text-zinc-600 uppercase tracking-widest flex items-center gap-1">
                                                            {kit.class}
                                                        </div>
                                                    </div>
                                                </div>

                                                <h3 className="text-xl font-black mb-1 group-hover:text-cyan-bright transition-colors tracking-tight">{kit.title}</h3>
                                                <div className="flex items-center gap-2 mb-8">
                                                    <Clock size={12} className="text-zinc-600" />
                                                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Refracted {kit.lastStudied}</span>
                                                </div>

                                                <div className="space-y-4">
                                                    <div className="flex justify-between items-end">
                                                        <div className="flex flex-col">
                                                            <span className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.2em]">Mastery Level</span>
                                                            <span className="text-2xl font-black group-hover:text-white transition-colors tracking-tighter">{kit.progress}%</span>
                                                        </div>
                                                        <button className="flex items-center gap-2 text-[10px] font-black text-cyan-bright uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                                                            Resume Forge <ArrowUpRight size={14} strokeWidth={3} />
                                                        </button>
                                                    </div>
                                                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden shadow-inner">
                                                        <motion.div 
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${kit.progress}%` }}
                                                            className="h-full bg-gradient-to-r from-cyan-bright to-purple relative"
                                                        >
                                                            <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-r from-transparent to-white/20 animate-shimmer" />
                                                        </motion.div>
                                                    </div>
                                                </div>
                                            </GlassCard>
                                        ))}
                                    </div>
                                </section>
                            </div>
                        )}

                        {activeTab === 'Study Lab' && (
                            <div className="max-w-6xl mx-auto flex flex-col items-center justify-center min-h-[60vh] text-center">
                                <motion.div
                                    initial={{ rotate: -10, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    transition={{ duration: 0.8 }}
                                >
                                    <Beaker size={80} className="text-cyan-bright mb-8 opacity-20 filter blur-[1px]" />
                                </motion.div>
                                <h1 className="text-5xl font-black mb-4 tracking-tighter">Study Lab</h1>
                                <p className="text-zinc-500 max-w-lg text-lg leading-relaxed">
                                    The <span className="text-cyan-bright font-bold">Injestor</span> is calibrating. Soon you'll be able to forge Study Kits from YouTube, PDFs, and raw text snippets with extreme precision.
                                </p>
                            </div>
                        )}

                        {activeTab === 'Leaderboard' && (
                            <div className="max-w-6xl mx-auto flex flex-col items-center justify-center min-h-[60vh] text-center">
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.8 }}
                                >
                                    <Trophy size={80} className="text-yellow-500 mb-8 opacity-20 filter blur-[1px]" />
                                </motion.div>
                                <h1 className="text-5xl font-black mb-4 tracking-tighter">Leaderboard</h1>
                                <p className="text-zinc-500 max-w-lg text-lg leading-relaxed">
                                    Season <span className="text-white font-bold">2025.12</span> is currently calculating rankings. Sharpen your focus and accumulate XP to claim your place among the <span className="text-shimmer brand-font italic">Prismatic</span>.
                                </p>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    );
};

export default DashboardPage;
