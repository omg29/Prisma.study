import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Timer, ShieldAlert, CheckCircle2 } from 'lucide-react';
import GlassCard from '../GlassCard';
import { LiquidButton } from '../ui/LiquidButton';

const TestView = ({ kit }) => {
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
    const [testStarted, setTestStarted] = useState(false);

    useEffect(() => {
        if (testStarted && timeLeft > 0) {
            const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
            return () => clearInterval(timer);
        }
    }, [testStarted, timeLeft]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    if (!testStarted) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] max-w-xl mx-auto text-center space-y-10">
                <div className="w-20 h-20 rounded-3xl bg-magenta/10 flex items-center justify-center border border-magenta/20 transform rotate-12">
                    <ShieldAlert className="text-magenta" size={40} />
                </div>
                <div className="space-y-4">
                    <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Unit Examination</h2>
                    <p className="text-zinc-500 font-medium leading-relaxed">
                        This is a simulated exam environment. The timer will start immediately.
                        Exit will result in a placeholder score.
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-4 w-full">
                    <GlassCard className="p-4 border-white/5 bg-white/[0.02]">
                        <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Time Limit</p>
                        <p className="text-xl font-black text-white">10:00</p>
                    </GlassCard>
                    <GlassCard className="p-4 border-white/5 bg-white/[0.02]">
                        <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Total Marks</p>
                        <p className="text-xl font-black text-white">100 XP</p>
                    </GlassCard>
                </div>
                <LiquidButton
                    onClick={() => setTestStarted(true)}
                    className="w-full !from-magenta !to-purple shadow-[0_0_30px_rgba(224,99,241,0.2)]"
                >
                    <span className="font-black uppercase tracking-widest text-sm">Initialize Examination</span>
                </LiquidButton>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto space-y-12">
            <div className="flex items-center justify-between p-6 rounded-2xl bg-white/[0.02] border border-white/5 sticky top-0 backdrop-blur-3xl z-30">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-magenta animate-pulse" />
                    <span className="text-xs font-black text-white uppercase tracking-widest">Exam in Progress</span>
                </div>
                <div className={`flex items-center gap-3 font-mono text-xl font-black ${timeLeft < 60 ? 'text-red-500 animate-pulse' : 'text-cyan-bright'}`}>
                    <Timer size={20} />
                    {formatTime(timeLeft)}
                </div>
            </div>

            <div className="space-y-12 pb-24">
                {[1, 2, 3, 4, 5].map((q) => (
                    <div key={q} className="space-y-6">
                        <h3 className="text-xl font-bold text-white flex gap-4">
                            <span className="text-magenta">{q}.</span>
                            Analyze the relationship between the major concepts presented in the material.
                        </h3>
                        <textarea
                            placeholder="Provide a detailed scholarly response..."
                            className="w-full bg-black/40 border border-white/10 rounded-2xl p-6 min-h-[160px] text-zinc-300 focus:outline-none focus:border-magenta/30 transition-all resize-none"
                        />
                    </div>
                ))}

                <LiquidButton
                    onClick={() => setTestStarted(false)}
                    className="w-full !from-magenta !to-purple"
                >
                    <span className="font-black uppercase tracking-widest text-sm">Submit Examination</span>
                </LiquidButton>
            </div>
        </div>
    );
};

export default TestView;
