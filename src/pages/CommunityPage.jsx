import React from 'react';
import { motion } from 'framer-motion';
import { Disc as Discord, Zap, Globe, MessageCircle } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { LiquidButton } from '../components/ui/LiquidButton';

const CommunityPage = () => {
    const benefits = [
        {
            icon: <Zap className="w-8 h-8 text-cyan-bright" />,
            title: "Real-time Collaboration",
            description: "Learn together in our active study rooms and coordinate with peers across the globe."
        },
        {
            icon: <Globe className="w-8 h-8 text-magenta" />,
            title: "Global Network",
            description: "Connect with students and researchers from top institutions and diverse backgrounds."
        },
        {
            icon: <MessageCircle className="w-8 h-8 text-purple" />,
            title: "Expert Insights",
            description: "Gain access to exclusive Q&A sessions with the founders and special guests."
        }
    ];

    return (
        <div className="relative z-10 pt-48 pb-32 px-6 max-w-7xl mx-auto min-h-screen">
            {/* Hero Section */}
            <div className="text-center mb-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-tight">
                        Join the <span className="text-shimmer brand-font">Prisma Community</span>
                    </h1>
                    <p className="text-zinc-400 text-xl md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed mb-12">
                        Connect with fellow spatial learners, share your insights, and shape the future of focus-driven learning.
                    </p>

                    <div className="flex justify-center flex-col items-center gap-4">
                        <LiquidButton
                            variant="primary"
                            size="lg"
                            className="px-12 py-6 text-xl"
                            onClick={() => window.open('https://discord.gg/bCGFV5kHrc', '_blank')}
                        >
                            <Discord className="w-6 h-6 mr-3" />
                            Join Our Discord Server
                        </LiquidButton>
                        <div className="flex items-center gap-2 mt-4 text-zinc-500 font-medium">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            2.4k Members Online Now
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Why Join Section */}
            <div className="mt-32">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 tracking-tight">Why Join?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {benefits.map((benefit, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                        >
                            <GlassCard className="p-10 h-full flex flex-col items-start gap-6 hover:scale-[1.03] transition-transform duration-500 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]">
                                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                                    {benefit.icon}
                                </div>
                                <h3 className="text-2xl font-bold">{benefit.title}</h3>
                                <p className="text-zinc-400 leading-relaxed">
                                    {benefit.description}
                                </p>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Breadcrumb back home */}
            <div className="mt-32 flex justify-center">
                <a
                    href="/"
                    className="text-zinc-500 hover:text-white transition-colors duration-300 flex items-center gap-2 uppercase tracking-widest text-xs font-bold"
                >
                    ← Back to Overview
                </a>
            </div>
        </div>
    );
};

export default CommunityPage;
