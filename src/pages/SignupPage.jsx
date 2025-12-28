import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { LiquidButton } from '../components/ui/LiquidButton';
import GlassCard from '../components/GlassCard';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signup({ name, email, password });
      navigate('/dashboard');
    } catch (error) {
      console.error('Signup failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(224,99,241,0.1),transparent_50%)]" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md relative z-10"
      >
        <GlassCard className="p-10 border-white/10 shadow-2xl">
          <div className="text-center mb-10">
            <div className="flex justify-center mb-6">
              <img src="/logo.svg" alt="Prisma" className="w-16 h-16 drop-shadow-[0_0_15px_rgba(224,99,241,0.5)]" />
            </div>
            <h1 className="text-4xl font-black tracking-tighter text-white mb-2">Begin Evolution</h1>
            <p className="text-zinc-500 text-sm font-medium">Join the elite ranks of the Scholars.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-4 px-6 text-sm focus:outline-none focus:border-cyan-bright/30 transition-all font-medium text-white"
                placeholder="Jonathan S."
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-4 px-6 text-sm focus:outline-none focus:border-cyan-bright/30 transition-all font-medium text-white"
                placeholder="scholar@prisma.study"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-4 px-6 text-sm focus:outline-none focus:border-cyan-bright/30 transition-all font-medium text-white"
                placeholder="••••••••"
              />
            </div>

            <LiquidButton 
              type="submit" 
              variant="primary" 
              className="w-full py-4 mt-4 shadow-[0_0_30px_rgba(224,99,241,0.2)]"
              disabled={isLoading}
            >
              <span className="font-black uppercase tracking-widest text-sm">
                {isLoading ? 'Calibrating...' : 'Initialize Profile'}
              </span>
            </LiquidButton>
          </form>

          <p className="text-center mt-8 text-sm text-zinc-500 font-medium">
            Already a Scholar?{' '}
            <Link to="/login" className="text-white font-bold hover:text-cyan-bright transition-colors">Log in here</Link>
          </p>
        </GlassCard>
      </motion.div>
    </div>
  );
};

export default SignupPage;
