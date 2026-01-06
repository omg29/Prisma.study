import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import GlassCard from '../GlassCard';

const FlashcardView = ({ kit }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    // Simple logic to split content into sentences for basic flashcards
    const flashcards = kit.content?.textData
        ? kit.content.textData.split('. ').filter(s => s.length > 10).map((text, i) => ({
            id: i,
            front: "Key Concept",
            back: text.length > 100 ? text.substring(0, 100) + '...' : text
        }))
        : [{ id: 0, front: "No Data", back: "Add materials to generate flashcards." }];

    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-12">
            <div className="text-center space-y-2">
                <h2 className="text-3xl font-black tracking-tight text-white uppercase">Flashcards</h2>
                <p className="text-zinc-500 font-bold text-xs uppercase tracking-widest">Card {currentIndex + 1} of {flashcards.length}</p>
            </div>

            <div className="relative w-full max-w-xl h-80 perspective-1000">
                <motion.div
                    className="w-full h-full relative preserve-3d cursor-pointer"
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                    onClick={() => setIsFlipped(!isFlipped)}
                >
                    {/* Front */}
                    <GlassCard className="absolute inset-0 backface-hidden flex items-center justify-center p-12 text-center border-white/10">
                        <p className="text-2xl font-black text-white px-8">{flashcards[currentIndex].front}</p>
                        <p className="absolute bottom-6 text-[10px] font-black text-cyan-bright uppercase tracking-widest opacity-50">Click to Flip</p>
                    </GlassCard>

                    {/* Back */}
                    <GlassCard
                        className="absolute inset-0 backface-hidden flex items-center justify-center p-12 text-center border-cyan-bright/20 bg-cyan-bright/[0.02]"
                        style={{ transform: 'rotateY(180deg)' }}
                    >
                        <p className="text-xl font-medium text-zinc-200 leading-relaxed">{flashcards[currentIndex].back}</p>
                        <p className="absolute bottom-6 text-[10px] font-black text-magenta uppercase tracking-widest opacity-50">Click to Flip</p>
                    </GlassCard>
                </motion.div>
            </div>

            <div className="flex items-center gap-6">
                <button
                    onClick={() => { setCurrentIndex(prev => Math.max(0, prev - 1)); setIsFlipped(false); }}
                    className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white transition-all disabled:opacity-20"
                    disabled={currentIndex === 0}
                >
                    <ChevronLeft size={24} />
                </button>
                <button
                    onClick={() => { setCurrentIndex(0); setIsFlipped(false); }}
                    className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white transition-all"
                >
                    <RotateCcw size={20} />
                </button>
                <button
                    onClick={() => { setCurrentIndex(prev => Math.min(flashcards.length - 1, prev + 1)); setIsFlipped(false); }}
                    className="p-4 rounded-2xl bg-cyan-bright/10 hover:bg-cyan-bright/20 text-cyan-bright transition-all disabled:opacity-20"
                    disabled={currentIndex === flashcards.length - 1}
                >
                    <ChevronRight size={24} />
                </button>
            </div>
        </div>
    );
};

export default FlashcardView;
