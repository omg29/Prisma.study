import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { LiquidButton } from '../components/ui/LiquidButton';
import GlassCard from '../components/GlassCard';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/dashboard";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(67,198,241,0.1),transparent_50%)]" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md relative z-10"
      >
        <GlassCard className="p-10 border-white/10 shadow-2xl">
          <div className="text-center mb-10">
            <div className="flex justify-center mb-6">
              <img src="/logo.svg" alt="Prisma" className="w-16 h-16 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
            </div>
            <h1 className="text-4xl font-black tracking-tighter text-white mb-2">Welcome Back</h1>
            <p className="text-zinc-500 text-sm font-medium">Continue your journey into the spectrum.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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
              <div className="flex justify-between items-center ml-1">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Password</label>
                <button type="button" className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-bright hover:text-white transition-colors">Forgot?</button>
              </div>
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
              className="w-full py-4 mt-4 shadow-[0_0_30px_rgba(34,211,238,0.2)]"
              disabled={isLoading}
            >
              <span className="font-black uppercase tracking-widest text-sm">
                {isLoading ? 'Decrypting...' : 'Enter Dashboard'}
              </span>
            </LiquidButton>
          </form>

          <p className="text-center mt-8 text-sm text-zinc-500 font-medium">
            New to Prisma?{' '}
            <Link to="/signup" className="text-white font-bold hover:text-cyan-bright transition-colors">Create an account</Link>
          </p>
        </GlassCard>
      </motion.div>
    </div>
  );
};

export default LoginPage;
