import React, { createContext, useContext, useState, useEffect } from 'react';
import { calculateRankAndLevel } from '../utils/gamification';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('prisma_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const getAccounts = () => {
    const accounts = localStorage.getItem('prisma_accounts');
    return accounts ? JSON.parse(accounts) : [];
  };

  const gamificationStats = useMemo(() => {
    return calculateRankAndLevel(user?.xp || 0);
  }, [user?.xp]);

  const login = async (email, password) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));

    const accounts = getAccounts();
    const account = accounts.find(a => a.email === email && a.password === password);

    if (!account) {
      setLoading(false);
      throw new Error('Invalid email or password');
    }

    // Refresh rank and level on login to ensure consistency with latest formula
    const { rank, level } = calculateRankAndLevel(account.xp || 0);
    const updatedAccount = { ...account, rank, level };

    // Don't store password in session
    const { password: _, ...sessionUser } = updatedAccount;

    localStorage.setItem('prisma_user', JSON.stringify(sessionUser));
    setUser(sessionUser);
    setLoading(false);
    return sessionUser;
  };

  const signup = async (userData) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    const accounts = getAccounts();
    if (accounts.some(a => a.email === userData.email)) {
      setLoading(false);
      throw new Error('Account with this email already exists');
    }

    const initialXp = 0;
    const { rank, level } = calculateRankAndLevel(initialXp);

    const newAccount = {
      ...userData,
      id: Math.random().toString(36).substr(2, 9),
      xp: initialXp,
      streak: 0,
      rank: rank,
      level: level,
      status: 'Online',
      joinedAt: new Date().toISOString(),
      bestSeasonalRank: rank,
      bestSeasonalPlacement: 'N/A',
      allTimeLevel: level,
      allTimePlacement: 'N/A'
    };

    localStorage.setItem('prisma_accounts', JSON.stringify([...accounts, newAccount]));

    const { password: _, ...sessionUser } = newAccount;
    localStorage.setItem('prisma_user', JSON.stringify(sessionUser));
    setUser(sessionUser);
    setLoading(false);
    return sessionUser;
  };

  const logout = () => {
    localStorage.removeItem('prisma_user');
    setUser(null);
  };

  const updateUserStats = async (xpGain) => {
    if (!user) return;

    const accounts = getAccounts();
    const accountIndex = accounts.findIndex(a => a.id === user.id);

    if (accountIndex === -1) return;

    const account = accounts[accountIndex];
    const newXp = (account.xp || 0) + xpGain;
    const { rank, level } = calculateRankAndLevel(newXp);

    const updatedAccount = {
      ...account,
      xp: newXp,
      rank: rank,
      level: level,
      allTimeLevel: Math.max(account.allTimeLevel || 0, level)
    };

    accounts[accountIndex] = updatedAccount;
    localStorage.setItem('prisma_accounts', JSON.stringify(accounts));

    const { password: _, ...sessionUser } = updatedAccount;
    localStorage.setItem('prisma_user', JSON.stringify(sessionUser));
    setUser(sessionUser);
  };

  return (
    <AuthContext.Provider value={{
      user,
      ...gamificationStats,
      loading,
      login,
      signup,
      logout,
      updateUserStats,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
