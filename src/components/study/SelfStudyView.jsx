import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, ArrowRight, Trophy } from 'lucide-react';
import GlassCard from '../GlassCard';
import { LiquidButton } from '../ui/LiquidButton';

const SelfStudyView = ({ kit }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);

    // Mock quiz data generation
    const questions = [
        {
            question: "What is the primary focus of this unit?",
            options: ["Core Principles", "Historical Context", "Advanced Applications", "Comparative Analysis"],
            correct: 0
        },
        {
            question: "Which concept is most critical to master first?",
            options: ["Foundational Logic", "Practical Implementation", "Theoretical Limits", "Efficiency Modeling"],
            correct: 1
        },
        {
            question: "According to the study material, what defines success in this topic?",
            options: ["Strict Adherence", "Creative Interpretation", "Consistent Progress", "Rapid Completion"],
            correct: 2
        }
    ];

    const handleAnswer = (index) => {
        if (isAnswered) return;
        setSelectedAnswer(index);
        setIsAnswered(true);
        if (index === questions[currentQuestion].correct) {
            setScore(score + 1);
        }
    };

    const nextQuestion = () => {
        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null);
            setIsAnswered(false);
        } else {
            setShowResults(true);
        }
    };

    if (showResults) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-8 animate-in zoom-in duration-700">
                <div className="w-24 h-24 rounded-full bg-yellow-500/20 flex items-center justify-center border border-yellow-500/30">
                    <Trophy className="text-yellow-500" size={48} />
                </div>
                <div className="text-center">
                    <h2 className="text-4xl font-black text-white mb-2 uppercase tracking-tighter">Study Session Complete!</h2>
                    <p className="text-zinc-500 font-bold tracking-widest uppercase">Mastery Level: {Math.round((score / questions.length) * 100)}%</p>
                </div>
                <div className="text-6xl font-black text-white">{score}/{questions.length}</div>
                <LiquidButton
                    onClick={() => { setShowResults(false); setCurrentQuestion(0); setScore(0); }}
                    className="!from-cyan-bright !to-magenta"
                >
                    <span className="font-black uppercase tracking-widest px-8">Try Again</span>
                </LiquidButton>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto space-y-12">
            <div className="space-y-4">
                <div className="flex justify-between items-end">
                    <h2 className="text-3xl font-black tracking-tight text-white uppercase">Self Study</h2>
                    <span className="text-[10px] font-black text-zinc-500 bg-white/5 px-3 py-1.5 rounded-full uppercase tracking-[0.2em]">
                        Concept {currentQuestion + 1} / {questions.length}
                    </span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-cyan-bright"
                        animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                    />
                </div>
            </div>

            <div className="space-y-8">
                <h3 className="text-2xl font-bold text-white leading-tight">{questions[currentQuestion].question}</h3>

                <div className="grid grid-cols-1 gap-4">
                    {questions[currentQuestion].options.map((option, i) => (
                        <button
                            key={i}
                            onClick={() => handleAnswer(i)}
                            className={`w-full p-6 rounded-2xl border transition-all duration-300 flex items-center justify-between group ${isAnswered
                                ? i === questions[currentQuestion].correct
                                    ? 'border-green-500/50 bg-green-500/10 text-white'
                                    : i === selectedAnswer
                                        ? 'border-red-500/50 bg-red-500/10 text-white'
                                        : 'border-white/5 bg-white/[0.02] text-zinc-500'
                                : 'border-white/10 bg-white/[0.03] hover:border-cyan-bright/50 hover:bg-white/[0.05] text-white'
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-xs font-black transition-colors ${isAnswered && i === questions[currentQuestion].correct ? 'bg-green-500 border-none' : ''
                                    }`}>
                                    {String.fromCharCode(65 + i)}
                                </div>
                                <span className="font-bold">{option}</span>
                            </div>
                            {isAnswered && i === questions[currentQuestion].correct && <Check size={20} className="text-green-500" />}
                            {isAnswered && i === selectedAnswer && i !== questions[currentQuestion].correct && <X size={20} className="text-red-500" />}
                        </button>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {isAnswered && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-end pt-4"
                    >
                        <LiquidButton
                            onClick={nextQuestion}
                            className="!from-cyan-bright !to-magenta group"
                        >
                            <span className="font-black uppercase tracking-widest flex items-center gap-3">
                                {currentQuestion + 1 === questions.length ? 'Finish' : 'Next Concept'}
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </span>
                        </LiquidButton>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SelfStudyView;
