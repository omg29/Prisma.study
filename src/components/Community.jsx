import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from './GlassCard';
import { Disc as Discord, Users, MessageSquare } from 'lucide-react';

const Community = () => {
  return (
    <section id="community" className="py-48 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-32">
        <motion.h2 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-8xl font-black mb-8 tracking-tighter"
        >
          Built by <span className="text-shimmer brand-font leading-tight">Thinkers.</span>
        </motion.h2>
        <p className="text-zinc-400 text-xl md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed">
          Join a global collective of students, researchers, and lifelong learners who are redefining how we process information.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <GlassCard className="glass-card flex flex-col items-center text-center p-12 hover:-translate-y-2">
          <div className="w-20 h-20 rounded-3xl bg-teal-accent/10 flex items-center justify-center mb-10 shadow-inner">
            <Users className="w-10 h-10 text-teal-accent" />
          </div>
          <h3 className="text-3xl font-bold mb-6">12k+ Members</h3>
          <p className="text-zinc-500 text-lg leading-relaxed font-medium">
            Connect with a vibrant network of professionals sharing their knowledge maps and methodologies.
          </p>
        </GlassCard>

        <GlassCard className="glass-card flex flex-col items-center text-center p-12 scale-110 z-10 border-prism-rose/30 shadow-[0_0_50px_rgba(251,113,133,0.1)] hover:-translate-y-4">
          <div className="w-20 h-20 rounded-3xl bg-prism-rose/10 flex items-center justify-center mb-10 shadow-inner">
            <Discord className="w-10 h-10 text-prism-rose" />
          </div>
          <h3 className="text-3xl font-bold mb-6">Join our Discord</h3>
          <p className="text-zinc-500 text-lg leading-relaxed font-medium mb-10">
            Get early access to beta features, participate in weekly study sprints, and chat with the devs.
          </p>
          <a 
            href="https://discord.gg/prisma" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-prismatic w-full justify-center h-14"
          >
            <span>Launch Discord</span>
          </a>
        </GlassCard>

        <GlassCard className="glass-card flex flex-col items-center text-center p-12 hover:-translate-y-2">
          <div className="w-20 h-20 rounded-3xl bg-prism-gold/10 flex items-center justify-center mb-10 shadow-inner">
            <MessageSquare className="w-10 h-10 text-prism-gold" />
          </div>
          <h3 className="text-3xl font-bold mb-6">Weekly Sprints</h3>
          <p className="text-zinc-500 text-lg leading-relaxed font-medium">
            Deep-dive sessions focused on mastering complex subjects through spatial learning techniques.
          </p>
        </GlassCard>
      </div>
    </section>
  );
};

export default Community;
