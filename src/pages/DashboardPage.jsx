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
import StudyHubModal from '../components/study/StudyHubModal';
import { getRankStyle } from '../utils/rankStyles';


const DashboardPage = () => {
    const {
        user,
        rank,
        level,
        xpToNextLevel,
        progressToNextLevel,
        updateUserStats
    } = useAuth();

    const {
        kits,
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
    const [selectedFolderForUnit, setSelectedFolderForUnit] = useState('');

    // Study Hub State
    const [selectedKit, setSelectedKit] = useState(null);
    const [isStudyHubOpen, setIsStudyHubOpen] = useState(false);

    // Expand all folders by default to show units
    const [expandedFolders, setExpandedFolders] = useState(() => {
        const initialState = {};
        folders.forEach(f => {
            initialState[f.id] = true;
        });
        return initialState;
    });

    const openStudyHub = (kit) => {
        setSelectedKit(kit);
        setIsStudyHubOpen(true);
    };

    const toggleFolder = (folderId) => {
        setExpandedFolders(prev => ({
            ...prev,
            [folderId]: !prev[folderId]
        }));
    };

    const sidebarItems = [
        { name: 'Home', icon: <LayoutDashboard size={20} /> },
        { name: 'Study Lab', icon: <Beaker size={20} /> },
        { name: 'Leaderboard', icon: <Trophy size={20} /> },
    ];

    const stats = [
        { label: 'Daily Streak', value: `${user?.streak || 0} Days`, icon: <Flame className="text-orange-500" />, detail: 'Keep it up!' },
        {
            label: 'Total XP',
            value: (user?.xp || 0).toLocaleString(),
            icon: <Zap className="text-yellow-400" />,
            detail: `${rank} Level ${level}`,
            ranking: user?.allTimePlacement || 'N/A'
        },
        {
            label: 'Current Rank',
            value: rank,
            icon: <Trophy className="text-cyan-400" />,
            ranking: user?.currentSeasonPlacement || 'N/A',
            isRank: true
        },
    ];

    const handleGainXp = () => {
        updateUserStats(100);
    };

    const handleCreateFolder = () => {
        if (newFolderName) {
            addFolder(newFolderName);
            setNewFolderName('');
            setIsNewFolderModalOpen(false);
        }
    };

    const openCreateUnitModal = (folderId = '') => {
        setSelectedFolderForUnit(folderId);
        setIsCreateModalOpen(true);
    };

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
                            <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-black">Level {level}</p>
                        </div>
                    </div>

                    <nav className="space-y-1.5">
                        {sidebarItems.map((item) => (
                            <button
                                key={item.name}
                                onClick={() => setActiveTab(item.name)}
                                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-500 group relative overflow-hidden ${activeTab === item.name
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
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 text-shimmer">Courses</span>
                            <button
                                onClick={() => setIsNewFolderModalOpen(true)}
                                className="text-zinc-500 hover:text-white transition-colors"
                            >
                                <Plus size={14} />
                            </button>
                        </div>
                        <div className="space-y-1">
                            {folders.map((folder) => (
                                <div key={folder.id} className="flex flex-col">
                                    <div className="group relative flex items-center">
                                        <button
                                            onClick={() => toggleFolder(folder.id)}
                                            className="flex-1 flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-bold text-zinc-400 hover:text-white hover:bg-white/[0.03] transition-all group"
                                        >
                                            <Folder size={16} className={`transition-all duration-300 ${expandedFolders[folder.id] ? 'text-cyan-bright scale-110 opacity-100' : 'text-zinc-600 opacity-60'}`} />
                                            <span className="flex-1 text-left truncate">{folder.name}</span>
                                            <span className="text-[10px] opacity-40 group-hover:opacity-100 font-black">{folder.kitIds?.length || 0}</span>
                                        </button>
                                        <button
                                            onClick={() => openCreateUnitModal(folder.id)}
                                            className="absolute right-8 p-1 text-zinc-600 hover:text-cyan-bright opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
                                        >
                                            <Plus size={14} strokeWidth={3} />
                                        </button>
                                    </div>

                                    <AnimatePresence>
                                        {expandedFolders[folder.id] && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden border-l border-white/5 ml-6 mt-1 flex flex-col gap-0.5"
                                            >
                                                {kits.filter(k => k.folderId === folder.id).map(kit => (
                                                    <button
                                                        key={kit.id}
                                                        onClick={() => openStudyHub(kit)}
                                                        className="flex items-center gap-3 px-4 py-2 rounded-lg text-[11px] font-medium text-zinc-500 hover:text-cyan-bright hover:bg-white/[0.02] transition-all text-left group"
                                                    >
                                                        <div className="w-1 h-1 rounded-full bg-zinc-700 group-hover:bg-cyan-bright transition-colors" />
                                                        <span className="truncate">{kit.title}</span>
                                                    </button>
                                                ))}
                                                {kits.filter(k => k.folderId === folder.id).length === 0 && (
                                                    <span className="px-4 py-2 text-[10px] text-zinc-700 font-bold uppercase italic opacity-40">No units</span>
                                                )}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}

                            {/* Unassigned kits section */}
                            {kits.filter(k => !k.folderId).length > 0 && (
                                <div className="flex flex-col mt-4">
                                    <div className="px-4 py-2 text-[10px] font-black text-zinc-600 uppercase tracking-widest border-b border-white/5 mb-2">
                                        Unassigned Units
                                    </div>
                                    <div className="flex flex-col gap-0.5">
                                        {kits.filter(k => !k.folderId).map(kit => (
                                            <button
                                                key={kit.id}
                                                onClick={() => openStudyHub(kit)}
                                                className="flex items-center gap-3 px-4 py-2 rounded-lg text-[11px] font-medium text-zinc-500 hover:text-white hover:bg-white/[0.02] transition-all text-left group"
                                            >
                                                <div className="w-1 h-1 rounded-full bg-zinc-700 group-hover:bg-cyan-bright transition-colors" />
                                                <span className="truncate">{kit.title}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-auto p-8">
                    <GlassCard className="p-5 border-white/5 bg-gradient-to-br from-cyan-bright/[0.03] to-magenta/[0.03]">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Mastery Progress</span>
                            <span className="text-[10px] font-black text-cyan-bright">{Math.round(progressToNextLevel)}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden shadow-inner">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progressToNextLevel}%` }}
                                className="h-full bg-gradient-to-r from-cyan-bright via-purple to-magenta"
                            />
                        </div>
                        <p className="text-[9px] text-zinc-500 mt-2 font-medium">{xpToNextLevel} XP to <span className="text-white font-bold underline decoration-cyan-bright/50">Level Up</span></p>
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
                                            Welcome Back, <span className={getRankStyle(rank)}>{rank}</span>
                                        </h1>
                                    </div>
                                    <div className="flex items-center gap-4 w-full md:w-auto">
                                        <div className="relative group flex-1 md:flex-none md:w-80">
                                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-700 group-focus-within:text-cyan-bright transition-colors" size={18} />
                                            <input
                                                type="text"
                                                placeholder="Search Library, Courses, or Units..."
                                                className="w-full bg-[#0F0F0B] border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:border-cyan-bright/30 transition-all font-medium text-white placeholder:text-zinc-700"
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                            />
                                        </div>
                                        <LiquidButton
                                            onClick={() => openCreateUnitModal()}
                                            variant="primary"
                                            size="default"
                                            className="flex items-center gap-3 px-8 !from-[#43C6F1] !to-[#E063F1] shadow-[0_0_30px_rgba(67,198,241,0.2)] hover:shadow-[0_0_40px_rgba(67,198,241,0.4)]"
                                        >
                                            <Plus size={20} strokeWidth={3} />
                                            <span className="font-black uppercase tracking-wider text-xs">Create Course Unit</span>
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
                                                    <div className={`inline-block px-3 py-1.5 rounded-lg border shadow-sm ${stat.isRank
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
                                        {(searchQuery === '' ? recentKits : filteredKits).map((kit) => (
                                            <motion.div
                                                key={kit.id}
                                                layout
                                                initial={{ opacity: 0, scale: 0.98 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                            >
                                                <KitCard
                                                    kit={kit}
                                                    onDelete={deleteKit}
                                                    onOpenStudyHub={openStudyHub}
                                                />
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
                initialFolderId={selectedFolderForUnit}
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

            <StudyHubModal
                isOpen={isStudyHubOpen}
                onClose={() => setIsStudyHubOpen(false)}
                kit={selectedKit}
            />
        </div>
    );
};

export default DashboardPage;
