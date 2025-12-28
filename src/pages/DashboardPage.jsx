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
    Folder,
    ChevronRight,
    ArrowUpRight,
    Filter,
    FolderPlus,
    Library
} from 'lucide-react';
import { LiquidButton } from '../components/ui/LiquidButton';
import GlassCard from '../components/GlassCard';
import { useAuth } from '../context/AuthContext';
import { useLibrary } from '../context/LibraryContext';
import KitCard from '../components/KitCard';
import CreateKitModal from '../components/CreateKitModal';
import { getRankStyle } from '../utils/rankStyles';


const DashboardPage = () => {
    const { user } = useAuth();
    const { 
      filteredKits, 
      recentKits,
      searchQuery, 
      setSearchQuery, 
      deleteKit,
      folders,
      addFolder
    } = useLibrary();
    
    const [activeTab, setActiveTab] = useState('Home');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isNewFolderModalOpen, setIsNewFolderModalOpen] = useState(false);
    const [newFolderName, setNewFolderName] = useState('');

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
            detail: `${user?.rank || 'Scholar'} Level ${user?.level || 24}`,
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

    const handleCreateFolder = () => {
      if (newFolderName) {
        addFolder(newFolderName);
        setNewFolderName('');
        setIsNewFolderModalOpen(false);
      }
    };

    const isScholar = user?.rank === 'Scholar';

    return (
        <div className="flex min-h-screen bg-[#020202] pt-24 text-slate-200">
            {/* Secondary Sidebar */}
            <aside className="w-72 border-r border-white/5 bg-black/40 backdrop-blur-2xl flex flex-col fixed h-[calc(100vh-6rem)] z-40 transition-all duration-500">
                <div className="p-8">
                    <div className="flex items-center gap-4 px-4 py-4 rounded-2xl bg-white/[0.03] border border-white/5 mb-10 hover:bg-white/[0.05] transition-colors cursor-pointer group">
                        <div className="relative">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#43C6F1] via-purple to-[#E063F1] flex items-center justify-center font-bold text-white shadow-lg group-hover:scale-110 transition-transform duration-500">
                                {user?.name?.split(' ').map(n => n[0]).join('') || 'JS'}
                            </div>
                            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-black animate-pulse ${user?.status === 'Online' ? 'bg-green-500' : 'bg-zinc-500'}`} />
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-bold truncate group-hover:text-cyan-bright transition-colors">{user?.name || 'Jonathan S.'}</p>
                            <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-black">Level {user?.level || 24}</p>
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
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 text-shimmer">Library Folders</span>
                            <button 
                              onClick={() => setIsNewFolderModalOpen(true)}
                              className="text-zinc-500 hover:text-white transition-colors"
                            >
                                <Plus size={14} />
                            </button>
                        </div>
                        <div className="space-y-1">
                            {folders.map((folder) => (
                                <button key={folder.id} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-semibold text-zinc-400 hover:text-white hover:bg-white/[0.03] transition-all group">
                                    <Folder size={16} className="text-cyan-bright opacity-60 group-hover:opacity-100 transition-opacity" />
                                    <span className="flex-1 text-left truncate">{folder.name}</span>
                                    <span className="text-[10px] opacity-40 group-hover:opacity-100 font-black">{folder.kitIds?.length || 0}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-auto p-8">
                    <GlassCard className="p-5 border-white/5 bg-gradient-to-br from-cyan-bright/[0.03] to-magenta/[0.03]">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Mastery Progress</span>
                            <span className="text-[10px] font-black text-cyan-bright">84%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden shadow-inner">
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: '84%' }}
                                className="h-full bg-gradient-to-r from-cyan-bright via-purple to-magenta"
                            />
                        </div>
                        <p className="text-[9px] text-zinc-500 mt-2 font-medium">160 XP to <span className="text-white font-bold underline decoration-cyan-bright/50">Level Up</span></p>
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
                                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Live Library View</span>
                                        </div>
                                        <h1 className="text-5xl font-black tracking-tighter text-white">
                                            Welcome Back, <span className={getRankStyle(user?.rank || 'Scholar')}>{user?.rank || 'Scholar'}</span>
                                        </h1>
                                    </div>
                                    <div className="flex items-center gap-4 w-full md:w-auto">
                                        <div className="relative group flex-1 md:flex-none md:w-80">
                                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-700 group-focus-within:text-cyan-bright transition-colors" size={18} />
                                            <input 
                                                type="text" 
                                                placeholder="Search Library, Folders, or Units..." 
                                                className="w-full bg-[#0F0F0F] border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:border-cyan-bright/30 transition-all font-medium text-white placeholder:text-zinc-700"
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                            />
                                        </div>
                                        {isScholar && (
                                            <LiquidButton 
                                              onClick={() => setIsCreateModalOpen(true)}
                                              variant="primary" 
                                              size="default" 
                                              className="flex items-center gap-3 px-8 !from-[#43C6F1] !to-[#E063F1] shadow-[0_0_30px_rgba(67,198,241,0.2)] hover:shadow-[0_0_40px_rgba(67,198,241,0.4)]"
                                            >
                                                <Plus size={20} strokeWidth={3} />
                                                <span className="font-black uppercase tracking-wider text-xs">Create New Study Kit</span>
                                            </LiquidButton>
                                        )}
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
                                                    <div className="flex items-baseline gap-2">
                                                      <p className={`text-3xl font-black ${stat.isRank ? getRankStyle(stat.value) : 'text-white'}`}>{stat.value}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            {stat.detail && (
                                                <div className="flex items-center gap-2 mt-4">
                                                    <div className="w-1 h-1 rounded-full bg-cyan-bright animate-glow" />
                                                    <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest leading-none">
                                                      {stat.detail.split(' ').map((word, index) => (
                                                        <span key={index} className={['Copper', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Emerald', 'Ruby', 'Amethyst', 'Diamond', 'Chromatic', 'Prismatic', 'Scholar'].some(r => word.includes(r)) ? getRankStyle(word) : ''}>
                                                          {word} {' '}
                                                        </span>
                                                       ))}
                                                    </span>
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

                                {/* Recently Accessed Only */}
                                <section className="mb-20">
                                    <div className="flex items-center justify-between mb-8">
                                        <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">
                                          {searchQuery === '' ? 'Recently Accessed' : `Search Results for "${searchQuery}"`}
                                        </h2>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                        { (searchQuery === '' ? recentKits : filteredKits).map((kit) => (
                                          <motion.div
                                            key={kit.id}
                                            layout
                                            initial={{ opacity: 0, scale: 0.98 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                          >
                                            <KitCard kit={kit} onDelete={deleteKit} />
                                          </motion.div>
                                        ))}
                                    </div>

                                    {filteredKits.length === 0 && searchQuery !== '' && (
                                      <div className="py-24 text-center">
                                        <Search size={48} className="mx-auto text-zinc-800 mb-6" />
                                        <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-tighter">No Matches Found</h3>
                                        <p className="text-zinc-500 text-sm">Refine your search parameters to locate specific kits or folders.</p>
                                      </div>
                                    )}
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
                                    The <span className="text-cyan-bright font-bold">Analysis Engine</span> is calibrating. Soon you'll be able to merge diverse academic source materials with extreme precision.
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
                                  Prismatic rankings are currently being synchronized across the network.
                                </p>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </main>

            <CreateKitModal 
              isOpen={isCreateModalOpen} 
              onClose={() => setIsCreateModalOpen(false)} 
            />

            {/* Simple New Folder Modal */}
            {isNewFolderModalOpen && (
              <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
                <GlassCard className="p-8 w-full max-w-sm border-white/10">
                  <h3 className="text-lg font-black text-white mb-4 uppercase tracking-tight">New Library Folder</h3>
                  <input 
                    type="text" 
                    placeholder="e.g. AP World History"
                    className="w-full bg-[#1A1A1A] border border-white/20 rounded-xl py-3.5 px-5 mb-6 text-sm focus:outline-none focus:border-cyan-bright/50 text-white"
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                  />
                  <div className="flex gap-3">
                    <button 
                      onClick={() => setIsNewFolderModalOpen(false)}
                      className="flex-1 py-3 rounded-xl bg-white/5 text-zinc-500 font-bold text-xs uppercase hover:bg-white/10"
                    >
                      Cancel
                    </button>
                    <LiquidButton 
                      onClick={handleCreateFolder}
                      variant="primary" 
                      className="flex-1 !from-[#43C6F1] !to-[#E063F1]"
                    >
                      <span className="font-black text-xs uppercase">Create</span>
                    </LiquidButton>
                  </div>
                </GlassCard>
              </div>
            )}
        </div>
    );
};

export default DashboardPage;
