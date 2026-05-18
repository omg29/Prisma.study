import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, ArrowRight, Trophy, AlertCircle } from 'lucide-react';
import GlassCard from '../GlassCard';
import { LiquidButton } from '../ui/LiquidButton';
import { generateQuizQuestions } from '../../utils/aiEngine';

const SelfStudyView = ({ kit }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);

    const vocabList = kit.content?.vocab || [];
    const mainIdeas = kit.content?.mainIdeas || [];

    // Dynamically generate vocabulary-based multiple choice questions
    const questions = useMemo(() => {
        const generated = generateQuizQuestions(vocabList, mainIdeas);
        return generated.filter(q => q.type === 'vocab');
    }, [vocabList, mainIdeas]);

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

    if (questions.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-6 max-w-sm mx-auto">
                <AlertCircle size={48} className="text-zinc-700 animate-pulse" />
                <h3 className="text-xl font-black text-white uppercase tracking-tight">Quiz Unavailable</h3>
                <p className="text-xs text-zinc-500 font-medium leading-relaxed">
                    This unit requires at least 2 Key Vocab terms to dynamically construct a practice quiz.
                </p>
            </div>
        );
    }

    if (showResults) {
        const percentage = Math.round((score / questions.length) * 100);
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-8 animate-in zoom-in duration-700">
                <div className="w-24 h-24 rounded-full bg-yellow-500/20 flex items-center justify-center border border-yellow-500/30 animate-bounce">
                    <Trophy className="text-yellow-500" size={48} />
                </div>
                <div className="text-center">
                    <h2 className="text-4xl font-black text-white mb-2 uppercase tracking-tighter">Quiz Complete!</h2>
                    <p className="text-zinc-500 font-bold tracking-widest uppercase text-xs">Mastery Level: {percentage}%</p>
                </div>
                <div className="text-6xl font-black text-white">{score}/{questions.length}</div>
                <LiquidButton
                    onClick={() => { setShowResults(false); setCurrentQuestion(0); setScore(0); setSelectedAnswer(null); setIsAnswered(false); }}
                    className="!from-cyan-bright !to-magenta"
                >
                    <span className="font-black uppercase tracking-widest px-8">Try Again</span>
                </LiquidButton>
            </div>
        );
    }

    const activeQ = questions[currentQuestion];

    return (
        <div className="max-w-2xl mx-auto space-y-12 animate-in fade-in duration-500">
            <div className="space-y-4">
                <div className="flex justify-between items-end">
                    <h2 className="text-3xl font-black tracking-tight text-white uppercase">Self Study Quiz</h2>
                    <span className="text-[10px] font-black text-zinc-500 bg-white/5 px-3 py-1.5 rounded-full uppercase tracking-[0.2em]">
                        Question {currentQuestion + 1} / {questions.length}
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
                <h3 className="text-xl font-bold text-white leading-relaxed">{activeQ.question}</h3>

                <div className="grid grid-cols-1 gap-4">
                    {activeQ.options.map((option, i) => (
                        <button
                            key={i}
                            disabled={isAnswered}
                            onClick={() => handleAnswer(i)}
                            className={`w-full p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between group ${
                                isAnswered
                                    ? i === activeQ.correct
                                        ? 'border-green-500/50 bg-green-500/10 text-white'
                                        : i === selectedAnswer
                                            ? 'border-red-500/50 bg-red-500/10 text-white'
                                            : 'border-white/5 bg-white/[0.01] text-zinc-500'
                                    : 'border-white/10 bg-white/[0.02] hover:border-cyan-bright/50 hover:bg-white/[0.04] text-white cursor-pointer'
                            }`}
                        >
                            <div className="flex items-center gap-4 text-left">
                                <div className={`w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-xs font-black transition-colors shrink-0 ${
                                    isAnswered && i === activeQ.correct ? 'bg-green-500 border-none' : ''
                                }`}>
                                    {String.fromCharCode(65 + i)}
                                </div>
                                <span className="font-bold text-xs md:text-sm leading-relaxed">{option}</span>
                            </div>
                            {isAnswered && i === activeQ.correct && <Check size={20} className="text-green-500 shrink-0" />}
                            {isAnswered && i === selectedAnswer && i !== activeQ.correct && <X size={20} className="text-red-500 shrink-0" />}
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
                                {currentQuestion + 1 === questions.length ? 'Finish' : 'Next Question'}
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
