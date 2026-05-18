import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer, ShieldAlert, CheckCircle2, AlertCircle, Award, Check } from 'lucide-react';
import GlassCard from '../GlassCard';
import { LiquidButton } from '../ui/LiquidButton';
import { generateQuizQuestions } from '../../utils/aiEngine';
import { useLibrary } from '../../context/LibraryContext';

const TestView = ({ kit }) => {
    const { updateKitProgress } = useLibrary();
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
    const [testStarted, setTestStarted] = useState(false);
    const [testFinished, setTestFinished] = useState(false);

    const vocabList = kit.content?.vocab || [];
    const mainIdeas = kit.content?.mainIdeas || [];

    // Dynamically generate vocabulary & concept questions
    const examData = useMemo(() => {
        const all = generateQuizQuestions(vocabList, mainIdeas);
        const vocabQ = all.filter(q => q.type === 'vocab').slice(0, 5);
        const conceptQ = all.filter(q => q.type === 'concept').slice(0, 3);
        return { vocabQ, conceptQ };
    }, [vocabList, mainIdeas]);

    // Student Answers State
    const [mcAnswers, setMcAnswers] = useState({}); // { questionId: selectedIndex }
    const [writtenAnswers, setWrittenAnswers] = useState({}); // { questionId: text }
    const [finalScore, setFinalScore] = useState(0);

    useEffect(() => {
        if (testStarted && timeLeft > 0 && !testFinished) {
            const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
            return () => clearInterval(timer);
        } else if (timeLeft === 0 && !testFinished) {
            handleSubmit();
        }
    }, [testStarted, timeLeft, testFinished]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleSelectMc = (qId, idx) => {
        setMcAnswers(prev => ({ ...prev, [qId]: idx }));
    };

    const handleWriteAnswer = (qId, text) => {
        setWrittenAnswers(prev => ({ ...prev, [qId]: text }));
    };

    const handleSubmit = () => {
        setTestFinished(true);

        // Grade MC Questions
        let correctCount = 0;
        examData.vocabQ.forEach(q => {
            if (mcAnswers[q.id] === q.correct) {
                correctCount++;
            }
        });

        const mcScore = examData.vocabQ.length > 0 ? (correctCount / examData.vocabQ.length) * 50 : 50;

        // Grade Written Questions (simulate keyword matching based on bullet points)
        let writtenScore = 0;
        examData.conceptQ.forEach(q => {
            const ansText = (writtenAnswers[q.id] || '').toLowerCase();
            let matches = 0;
            q.suggestedAnswers.forEach(bullet => {
                const keywords = bullet.toLowerCase().split(' ').filter(w => w.length > 4);
                const matchedWords = keywords.filter(w => ansText.includes(w));
                if (matchedWords.length > 0) matches++;
            });
            const ratio = q.suggestedAnswers.length > 0 ? matches / q.suggestedAnswers.length : 1;
            writtenScore += ratio * (50 / (examData.conceptQ.length || 1));
        });

        if (examData.conceptQ.length === 0) {
            writtenScore = 50; // default if no concept questions exist
        }

        const calculated = Math.round(mcScore + writtenScore);
        setFinalScore(calculated);

        // Update Study Set mastery progress in state!
        updateKitProgress(kit.id, calculated);
    };

    if (vocabList.length === 0 && mainIdeas.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-6 max-w-sm mx-auto">
                <AlertCircle size={48} className="text-zinc-700" />
                <h3 className="text-xl font-black text-white uppercase tracking-tight">Exam Locked</h3>
                <p className="text-xs text-zinc-500 font-medium leading-relaxed">
                    This unit requires Key Vocab and Main Ideas cards to assemble a dynamic examination paper.
                </p>
            </div>
        );
    }

    if (!testStarted) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[55vh] max-w-xl mx-auto text-center space-y-10 animate-in fade-in duration-500">
                <div className="w-20 h-20 rounded-3xl bg-magenta/10 flex items-center justify-center border border-magenta/20 transform rotate-12 shadow-inner">
                    <ShieldAlert className="text-magenta shrink-0" size={40} />
                </div>
                <div className="space-y-4">
                    <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Unit Examination</h2>
                    <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest leading-relaxed">
                        Prisma Professional Assessment Engine
                    </p>
                    <p className="text-sm text-zinc-400 leading-relaxed font-medium">
                        This test compiles multiple-choice questions for **Key Vocab** and written response prompts for **Main Ideas**. Your mastery progress will update based on your score.
                    </p>
                </div>
                <div className="grid grid-cols-3 gap-4 w-full">
                    <GlassCard className="p-4 border-white/5 bg-white/[0.01]">
                        <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-1">Time Limit</p>
                        <p className="text-lg font-black text-white">10:00</p>
                    </GlassCard>
                    <GlassCard className="p-4 border-white/5 bg-white/[0.01]">
                        <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-1">Vocab Qs</p>
                        <p className="text-lg font-black text-white">{examData.vocabQ.length}</p>
                    </GlassCard>
                    <GlassCard className="p-4 border-white/5 bg-white/[0.01]">
                        <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-1">Concept Qs</p>
                        <p className="text-lg font-black text-white">{examData.conceptQ.length}</p>
                    </GlassCard>
                </div>
                <LiquidButton
                    onClick={() => setTestStarted(true)}
                    className="w-full !from-magenta !to-purple shadow-[0_0_30px_rgba(224,99,241,0.2)] hover:shadow-[0_0_40px_rgba(224,99,241,0.4)]"
                >
                    <span className="font-black uppercase tracking-widest text-sm">Initialize Examination</span>
                </LiquidButton>
            </div>
        );
    }

    if (testFinished) {
        return (
            <div className="max-w-2xl mx-auto space-y-12 animate-in zoom-in duration-500">
                <div className="text-center space-y-4">
                    <div className="w-20 h-20 rounded-full bg-cyan-bright/10 border border-cyan-bright/20 flex items-center justify-center mx-auto mb-4 animate-pulse">
                        <Award className="text-cyan-bright" size={40} />
                    </div>
                    <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Grading Sheet Released</h2>
                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.25em]">Exam Session Synthesis</p>
                </div>

                <GlassCard className="p-8 border-white/10 bg-gradient-to-br from-white/[0.01] to-transparent text-center space-y-6">
                    <div>
                        <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">Final Mastery Score</p>
                        <p className="text-6xl font-black text-cyan-bright">{finalScore}%</p>
                    </div>
                    <p className="text-sm text-zinc-400 leading-relaxed max-w-sm mx-auto font-medium">
                        Unit mastery updated to **{finalScore}%** inside your Course Repository. Retake the exam anytime to maximize metrics.
                    </p>
                    <LiquidButton
                        onClick={() => { setTestStarted(false); setTestFinished(false); setMcAnswers({}); setWrittenAnswers({}); setTimeLeft(600); }}
                        className="!from-cyan-bright !to-magenta"
                    >
                        <span className="font-black uppercase tracking-widest px-8">Re-take Exam</span>
                    </LiquidButton>
                </GlassCard>

                {/* Question Feedback Breakdown */}
                <div className="space-y-6">
                    <h3 className="text-xs font-black text-white uppercase tracking-widest border-b border-white/5 pb-2">Concept Recall Diagnostics</h3>
                    {examData.conceptQ.map((q, idx) => {
                        const ans = writtenAnswers[q.id] || '';
                        return (
                          <GlassCard key={q.id} className="p-6 border-white/5">
                            <h4 className="text-sm font-bold text-white mb-2">{idx + 1}. {q.question}</h4>
                            <div className="mt-4 p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Your Answer:</p>
                                <p className="text-xs text-zinc-400 italic leading-relaxed">{ans || "(No answer submitted)"}</p>
                            </div>
                            <div className="mt-4 space-y-3">
                                <p className="text-[10px] font-black text-cyan-bright uppercase tracking-widest">Expected Core Elements Checklist:</p>
                                <div className="space-y-1.5 pl-2">
                                    {q.suggestedAnswers.map((item, bIdx) => {
                                        const keywords = item.toLowerCase().split(' ').filter(w => w.length > 4);
                                        const hasMatch = keywords.some(w => ans.toLowerCase().includes(w));
                                        return (
                                          <div key={bIdx} className="flex items-center gap-2.5 text-xs">
                                            {hasMatch ? (
                                              <div className="w-4 h-4 rounded bg-green-500/10 flex items-center justify-center border border-green-500/20 shrink-0">
                                                <Check size={10} className="text-green-500" strokeWidth={3} />
                                              </div>
                                            ) : (
                                              <div className="w-4 h-4 rounded bg-red-500/10 flex items-center justify-center border border-red-500/20 shrink-0">
                                                <X size={10} className="text-red-500" strokeWidth={3} />
                                              </div>
                                            )}
                                            <span className={hasMatch ? 'text-zinc-300' : 'text-zinc-500'}>{item}</span>
                                          </div>
                                        );
                                    })}
                                </div>
                            </div>
                          </GlassCard>
                        );
                    })}
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto space-y-12 animate-in fade-in duration-500">
            {/* Header Sticky Progress Bar */}
            <div className="flex items-center justify-between p-5 rounded-2xl bg-black/60 border border-white/5 sticky top-0 backdrop-blur-3xl z-30">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-magenta animate-pulse" />
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">Exam in Progress</span>
                </div>
                <div className={`flex items-center gap-3 font-mono text-lg font-black ${timeLeft < 60 ? 'text-red-500 animate-pulse' : 'text-cyan-bright'}`}>
                    <Timer size={18} />
                    {formatTime(timeLeft)}
                </div>
            </div>

            {/* Questions Form */}
            <div className="space-y-12 pb-24">
                
                {/* Part 1: Multiple Choice Vocab */}
                {examData.vocabQ.length > 0 && (
                  <div className="space-y-8">
                    <h3 className="text-xs font-black text-cyan-bright uppercase tracking-widest border-b border-white/5 pb-2">Part I: Vocabulary Definitions</h3>
                    {examData.vocabQ.map((q, idx) => (
                      <div key={q.id} className="space-y-4">
                        <h4 className="text-sm font-bold text-white leading-relaxed flex gap-3">
                          <span className="text-cyan-bright font-black">{idx + 1}.</span>
                          {q.question}
                        </h4>
                        <div className="grid grid-cols-1 gap-2.5 pl-6">
                          {q.options.map((option, oIdx) => {
                            const isSelected = mcAnswers[q.id] === oIdx;
                            return (
                              <button
                                key={oIdx}
                                onClick={() => handleSelectMc(q.id, oIdx)}
                                className={`w-full p-4 rounded-xl border text-left text-xs transition-all duration-200 flex items-center gap-3 ${
                                  isSelected 
                                    ? 'border-cyan-bright/50 bg-cyan-bright/5 text-white' 
                                    : 'border-white/5 bg-white/[0.01] hover:border-white/10 hover:bg-white/[0.02] text-zinc-400 hover:text-white cursor-pointer'
                                }`}
                              >
                                <div className={`w-6 h-6 rounded border flex items-center justify-center text-[10px] font-black shrink-0 ${
                                  isSelected ? 'bg-cyan-bright border-none text-black' : 'border-white/10'
                                }`}>
                                  {String.fromCharCode(65 + oIdx)}
                                </div>
                                <span className="font-medium leading-relaxed">{option}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Part 2: Written Response Main Ideas */}
                {examData.conceptQ.length > 0 && (
                  <div className="space-y-10 pt-6">
                    <h3 className="text-xs font-black text-magenta uppercase tracking-widest border-b border-white/5 pb-2">Part II: Conceptual Syntheses</h3>
                    {examData.conceptQ.map((q, idx) => (
                      <div key={q.id} className="space-y-4">
                        <h4 className="text-sm font-bold text-white leading-relaxed flex gap-3">
                          <span className="text-magenta font-black">{idx + 1}.</span>
                          {q.question}
                        </h4>
                        <div className="pl-6">
                          <textarea
                            placeholder="Provide a detailed scholarly explanation and active discussion here..."
                            className="w-full bg-[#0D0D0D]/50 border border-white/10 rounded-2xl p-5 min-h-[150px] text-xs leading-relaxed text-zinc-300 focus:outline-none focus:border-magenta/30 focus:bg-[#0D0D0D] transition-all resize-none font-sans"
                            value={writtenAnswers[q.id] || ''}
                            onChange={(e) => handleWriteAnswer(q.id, e.target.value)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="pt-8 pl-6">
                  <LiquidButton
                    onClick={handleSubmit}
                    className="w-full py-4.5 !from-magenta !to-purple shadow-[0_0_30px_rgba(224,99,241,0.25)]"
                  >
                    <span className="font-black uppercase tracking-widest text-xs">Submit Examination Paper</span>
                  </LiquidButton>
                </div>
            </div>
        </div>
    );
};

export default TestView;
