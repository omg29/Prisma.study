import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, RotateCcw, AlertCircle } from 'lucide-react';
import GlassCard from '../GlassCard';

const FlashcardView = ({ kit }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    const vocabList = kit.content?.vocab || [];
    const flashcards = vocabList.map((item, i) => ({
        id: item.id || i,
        front: item.term,
        back: item.definition
    }));

    if (flashcards.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-6 max-w-sm mx-auto">
                <AlertCircle size={48} className="text-zinc-700 animate-pulse" />
                <h3 className="text-xl font-black text-white uppercase tracking-tight">No Vocab Found</h3>
                <p className="text-xs text-zinc-500 font-medium leading-relaxed">
                    This study set currently possesses no Key Vocab cards. Integrate materials or enter vocabulary terms to get started.
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[55vh] space-y-12 max-w-xl mx-auto">
            <div className="text-center space-y-2">
                <h2 className="text-3xl font-black tracking-tight text-white uppercase">Vocab Flashcards</h2>
                <p className="text-zinc-500 font-bold text-xs uppercase tracking-widest">Card {currentIndex + 1} of {flashcards.length}</p>
            </div>

            <div className="relative w-full h-80 perspective-1000">
                <motion.div
                    className="w-full h-full relative preserve-3d cursor-pointer"
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                    onClick={() => setIsFlipped(!isFlipped)}
                >
                    {/* Front */}
                    <GlassCard className="absolute inset-0 backface-hidden flex flex-col items-center justify-center p-12 text-center border-white/10 bg-white/[0.01]">
                        <span className="text-[9px] font-black text-cyan-bright uppercase tracking-[0.3em] mb-4 bg-cyan-bright/5 border border-cyan-bright/10 px-3 py-1 rounded-full">Term</span>
                        <p className="text-2xl font-black text-white px-6 uppercase tracking-wider">{flashcards[currentIndex].front}</p>
                        <p className="absolute bottom-6 text-[9px] font-black text-zinc-500 uppercase tracking-widest opacity-50">Click to Flip</p>
                    </GlassCard>

                    {/* Back */}
                    <GlassCard
                        className="absolute inset-0 backface-hidden flex flex-col items-center justify-center p-12 text-center border-cyan-bright/20 bg-cyan-bright/[0.02]"
                        style={{ transform: 'rotateY(180deg)' }}
                    >
                        <span className="text-[9px] font-black text-magenta uppercase tracking-[0.3em] mb-4 bg-magenta/5 border border-magenta/10 px-3 py-1 rounded-full">Definition</span>
                        <p className="text-base font-medium text-zinc-200 leading-relaxed max-w-sm">{flashcards[currentIndex].back}</p>
                        <p className="absolute bottom-6 text-[9px] font-black text-zinc-500 uppercase tracking-widest opacity-50">Click to Flip</p>
                    </GlassCard>
                </motion.div>
            </div>

            <div className="flex items-center gap-6">
                <button
                  onClick={() => { setCurrentIndex(prev => Math.max(0, prev - 1)); setIsFlipped(false); }}
                  className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white transition-all disabled:opacity-20 cursor-pointer"
                  disabled={currentIndex === 0}
                >
                    <ChevronLeft size={24} />
                </button>
                <button
                  onClick={() => { setCurrentIndex(0); setIsFlipped(false); }}
                  className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white transition-all cursor-pointer"
                >
                    <RotateCcw size={20} />
                </button>
                <button
                  onClick={() => { setCurrentIndex(prev => Math.min(flashcards.length - 1, prev + 1)); setIsFlipped(false); }}
                  className="p-4 rounded-2xl bg-cyan-bright/10 hover:bg-cyan-bright/20 text-cyan-bright transition-all disabled:opacity-20 cursor-pointer"
                  disabled={currentIndex === flashcards.length - 1}
                >
                    <ChevronRight size={24} />
                </button>
            </div>
        </div>
    );
};

export default FlashcardView;
