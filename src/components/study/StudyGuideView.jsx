import React from 'react';
import GlassCard from '../GlassCard';
import { BookOpen, AlertCircle } from 'lucide-react';

const StudyGuideView = ({ kit }) => {
    const mainIdeas = kit.content?.mainIdeas || [];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-4xl mx-auto">
            <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                <div className="w-12 h-12 rounded-2xl bg-cyan-bright/10 text-cyan-bright flex items-center justify-center shadow-inner">
                    <BookOpen size={22} />
                </div>
                <div>
                    <h2 className="text-3xl font-black tracking-tight text-white uppercase">Master Study Guide</h2>
                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest leading-none mt-1">Structured Core Concepts Review</p>
                </div>
            </div>

            {mainIdeas.length > 0 ? (
                <div className="space-y-6">
                    {mainIdeas.map((concept, index) => (
                        <GlassCard key={concept.id || index} className="p-8 border-white/5 bg-gradient-to-br from-white/[0.01] to-transparent">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-xs font-black text-cyan-bright bg-cyan-bright/10 border border-cyan-bright/10 px-2 py-0.5 rounded">
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                                <h3 className="text-lg font-black text-white uppercase tracking-wide">{concept.title}</h3>
                            </div>
                            
                            <p className="text-sm text-zinc-300 leading-relaxed font-medium mb-6">
                                {concept.explanation}
                            </p>

                            {concept.bulletPoints && concept.bulletPoints.length > 0 && (
                                <div className="space-y-3 pl-4 border-l-2 border-cyan-bright/30">
                                    <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Key Takeaways & Milestones</h4>
                                    <ul className="space-y-2">
                                        {concept.bulletPoints.map((bullet, bIdx) => (
                                            <li key={bIdx} className="text-xs text-zinc-400 leading-relaxed flex gap-2.5">
                                                <span className="text-cyan-bright select-none font-bold shrink-0">•</span>
                                                <span>{bullet}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </GlassCard>
                    ))}
                </div>
            ) : (
                <div className="py-20 text-center max-w-md mx-auto space-y-4">
                    <AlertCircle size={40} className="text-zinc-600 mx-auto" />
                    <h3 className="text-lg font-black text-white uppercase">No Concepts Generated</h3>
                    <p className="text-xs text-zinc-500 font-medium leading-relaxed">
                        To construct a structured study guide, add academic files, transcripts, or notes to this unit.
                    </p>
                </div>
            )}
        </div>
    );
};

export default StudyGuideView;
