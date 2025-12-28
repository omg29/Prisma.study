import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate persistent session check
    const storedUser = localStorage.getItem('prisma_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Mock login logic
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const mockUser = {
      id: '1',
      name: 'Jonathan S.',
      email: email,
      rank: 'Scholar',
      level: 24,
      status: 'Online',
      joinedAt: '2025-01-15',
      bestSeasonalRank: 'Diamond II',
      bestSeasonalPlacement: '#420',
      bestSeasonalPeriod: 'Season 4',
      currentSeasonRank: 'Gold III',
      currentSeasonPlacement: '#1,242',
      allTimeLevel: 156,
      allTimePlacement: '#12,420'
    };
    
    localStorage.setItem('prisma_user', JSON.stringify(mockUser));
    setUser(mockUser);
    setLoading(false);
    return mockUser;
  };

  const signup = async (userData) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser = {
      ...userData,
      id: Math.random().toString(36).substr(2, 9),
      rank: 'Novice',
      level: 1,
      status: 'Online',
      joinedAt: new Date().toISOString(),
      bestSeasonalRank: 'Unranked',
      bestSeasonalPlacement: 'N/A',
      allTimeLevel: 1,
      allTimePlacement: 'N/A'
    };
    
    localStorage.setItem('prisma_user', JSON.stringify(newUser));
    setUser(newUser);
    setLoading(false);
    return newUser;
  };

  const logout = () => {
    localStorage.removeItem('prisma_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, isAuthenticated: !!user }}>
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
