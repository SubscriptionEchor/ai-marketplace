import { ReactNode } from 'react';
import { AuthContext } from '@/contexts/auth';
import { useState, useCallback, useEffect } from 'react';
import { WalletService, WalletType } from '@/services/wallet'; 

const STORAGE_KEY = 'wallet_connection';

interface AuthProviderProps {
  children: ReactNode;
}

interface StoredWallet {
  type: WalletType;
  address: string;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [connectedWallet, setConnectedWallet] = useState<{ type: WalletType; address: string } | null>(null);

  // Load stored wallet connection on mount
  useEffect(() => {
    const storedWallet = localStorage.getItem(STORAGE_KEY);
    if (storedWallet) {
      try {
        const wallet = JSON.parse(storedWallet) as StoredWallet;
        setConnectedWallet(wallet);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to parse stored wallet:', error);
      }
    }
  }, []);

  const connectWallet = useCallback(async (type: WalletType) => {
    try {
      // Attempt to connect to the wallet
      const result = await WalletService.connect(type);
      
      if (!result) {
        // User rejected or connection failed
        return;
      }
      
      setIsAuthenticated(true);
      setConnectedWallet({ type: result.type, address: result.address });
      
      // Store wallet connection
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        type: result.type,
        address: result.address
      }));
      
    } catch (error) {
      console.error('Wallet connection failed:', error);
    }
  }, []);

  const login = useCallback(async () => {
    await connectWallet('xell');
  }, [connectWallet]);

  const logout = useCallback(async () => {
    if (connectedWallet) {
      await WalletService.disconnect(connectedWallet.type);
    }
    setIsAuthenticated(false);
    setConnectedWallet(null);
    
    // Clear stored wallet connection
    localStorage.removeItem(STORAGE_KEY);
    
  }, [connectedWallet]);

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      login, 
      logout,
      connectWallet,
      connectedWallet 
    }}>
      {children}
    </AuthContext.Provider>
  );
}