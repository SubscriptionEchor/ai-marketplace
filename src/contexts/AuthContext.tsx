import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import type { ProfileData, Preferences } from '@/types';

interface AuthContextType {
  isAuthenticated: boolean;
  profile: ProfileData | null;
  preferences: Preferences | null;
  login: (profile: ProfileData, preferences: Preferences) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [preferences, setPreferences] = useState<Preferences | null>(null);

  const login = useCallback((profile: ProfileData, preferences: Preferences) => {
    setProfile(profile);
    setPreferences(preferences);
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    setProfile(null);
    setPreferences(null);
    setIsAuthenticated(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, profile, preferences, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}