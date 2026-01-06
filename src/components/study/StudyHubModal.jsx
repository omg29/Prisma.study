import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X,
    BookOpen,
    Layers,
    CheckCircle,
    GraduationCap,
    ArrowLeft,
    ChevronRight
} from 'lucide-react';
import GlassCard from '../GlassCard';
import StudyGuideView from './StudyGuideView';
import FlashcardView from './FlashcardView';
import SelfStudyView from './SelfStudyView';
import TestView from './TestView';

const MODES = [
    { id: 'guide', name: 'Study Guide', icon: <BookOpen size={20} />, color: 'text-cyan-bright', bg: 'bg-cyan-bright/10' },
    { id: 'self-study', name: 'Self Study', icon: <CheckCircle size={20} />, color: 'text-green-500', bg: 'bg-green-500/10' },
    { id: 'flashcards', name: 'Flashcards', icon: <Layers size={20} />, color: 'text-purple', bg: 'bg-purple/10' },
    { id: 'test', name: 'Test', icon: <GraduationCap size={20} />, color: 'text-magenta', bg: 'bg-magenta/10' },
];

const StudyHubModal = ({ isOpen, onClose, kit }) => {
    const [activeMode, setActiveMode] = useState(null);

    React.useEffect(() => {
        if (!isOpen) {
            setActiveMode(null);
        }
    }, [isOpen]);

    if (!kit) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[120] flex items-center justify-center overflow-hidden">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/90 backdrop-blur-xl"
                        onClick={onClose}
                    />

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative w-full h-full max-w-6xl md:h-[90vh] flex flex-col z-10"
                    >
                        <GlassCard className="flex-1 flex flex-col border-white/10 overflow-hidden m-4 md:m-0">
                            {/* Header */}
                            <header className="p-6 md:p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
                                <div className="flex items-center gap-6">
                                    {activeMode && (
                                        <button
                                            onClick={() => setActiveMode(null)}
                                            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-all"
                                        >
                                            <ArrowLeft size={20} />
                                        </button>
                                    )}
                                    <div>
                                        <p className="text-[10px] font-black text-cyan-bright uppercase tracking-[0.3em] mb-1">Study Hub</p>
                                        <h2 className="text-2xl font-black text-white tracking-tighter">{kit.title}</h2>
                                    </div>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-all transform hover:rotate-90"
                                >
                                    <X size={20} />
                                </button>
                            </header>

                            {/* Content */}
                            <div className="flex-1 overflow-y-auto p-4 md:p-12 relative">
                                {!activeMode ? (
                                    <div className="max-w-4xl mx-auto py-12">
                                        <div className="text-center mb-16 space-y-4">
                                            <h3 className="text-4xl font-black text-white tracking-tighter uppercase">Select Study Mode</h3>
                                            <p className="text-zinc-500 font-bold tracking-widest uppercase text-xs">Choose your strategy for mastering this unit</p>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {MODES.map((mode) => (
                                                <button
                                                    key={mode.id}
                                                    onClick={() => setActiveMode(mode.id)}
                                                    className="group relative p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-500 text-left overflow-hidden"
                                                >
                                                    <div className={`absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500 transform rotate-12 group-hover:scale-110`}>
                                                        {React.cloneElement(mode.icon, { size: 100 })}
                                                    </div>

                                                    <div className={`${mode.bg} ${mode.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-inner`}>
                                                        {mode.icon}
                                                    </div>

                                                    <h4 className="text-xl font-black text-white mb-2 uppercase tracking-tight">{mode.name}</h4>
                                                    <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest leading-loose">
                                                        {mode.id === 'guide' && 'Review structured content'}
                                                        {mode.id === 'flashcards' && 'Drill key vocabulary'}
                                                        {mode.id === 'self-study' && 'Test your knowledge'}
                                                        {mode.id === 'test' && 'Full unit examination'}
                                                    </p>

                                                    <div className="mt-8 flex items-center gap-2 text-[10px] font-black text-cyan-bright opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 uppercase tracking-[0.2em]">
                                                        Initialize <ChevronRight size={12} strokeWidth={3} />
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="h-full">
                                        {activeMode === 'guide' && <StudyGuideView kit={kit} />}
                                        {activeMode === 'flashcards' && <FlashcardView kit={kit} />}
                                        {activeMode === 'self-study' && <SelfStudyView kit={kit} />}
                                        {activeMode === 'test' && <TestView kit={kit} />}
                                    </div>
                                )}
                            </div>

                            {/* Footer Mastery Bar */}
                            <footer className="px-8 py-6 border-t border-white/5 bg-black/40">
                                <div className="flex items-center justify-between max-w-4xl mx-auto">
                                    <div className="flex gap-8">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Unit Mastery</span>
                                            <span className="text-xl font-black text-white">{kit.progress}%</span>
                                        </div>
                                        <div className="w-64 h-2 bg-white/5 rounded-full mt-4 overflow-hidden border border-white/5">
                                            <motion.div
                                                className="h-full bg-gradient-to-r from-cyan-bright to-magenta"
                                                initial={{ width: 0 }}
                                                animate={{ width: `${kit.progress}%` }}
                                            />
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Global Ranking</p>
                                        <p className="text-white font-black">Top 12%</p>
                                    </div>
                                </div>
                            </footer>
                        </GlassCard>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default StudyHubModal;
