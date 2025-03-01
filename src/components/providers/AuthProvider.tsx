import { ReactNode } from 'react';
import { AuthContext } from '@/contexts/auth';
import { useState, useCallback, useEffect } from 'react';
import { WalletService, WalletType } from '@/services/wallet';
import { Modal } from '@/components/ui';

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
  const [showExtensionModal, setShowExtensionModal] = useState(false);
  const [availableWallets, setAvailableWallets] = useState<Record<WalletType, boolean>>({
    xell: false,
    metamask: false
  });
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

  // Check for available wallets
  useEffect(() => {
    const checkWallets = async () => {
      const xellAvailable = await WalletService.isExtensionInstalled('xell');
      const metamaskAvailable = await WalletService.isExtensionInstalled('metamask');
      
      setAvailableWallets({
        xell: xellAvailable,
        metamask: metamaskAvailable
      });
    };

    checkWallets();
    
    // Check again when window gains focus
    const handleFocus = () => checkWallets();
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  const connectWallet = useCallback(async (type: WalletType) => {
    const isInstalled = await WalletService.isExtensionInstalled(type);
    
    // If wallet is not installed, show installation options
    if (!isInstalled) {
      if (type === 'xell') {
        setShowExtensionModal(true);
      } else {
        window.open('https://metamask.io/download/', '_blank');
      }
      return;
    }

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
    // Try XELL first, fallback to MetaMask
    const xellInstalled = await WalletService.isExtensionInstalled('xell');
    if (xellInstalled) {
      await connectWallet('xell');
    } else {
      await connectWallet('metamask');
    }
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
      <Modal
        show={showExtensionModal}
        onClose={() => setShowExtensionModal(false)}
        title="Connect Wallet"
      >
        <div className="text-center py-6">
          <div className="space-y-6">
            {/* XELL Wallet */}
            <div className="relative">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <img src="https://learn.rubix.net//images/logo.png" alt="XELL" className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Install XELL Wallet</h3>
              <p className="text-gray-600 mb-6">Get the XELL wallet extension to use the marketplace</p>
              {availableWallets.xell ? (
                <button
                  onClick={() => {
                    setShowExtensionModal(false);
                    connectWallet('xell');
                  }}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-[#0284a5] hover:bg-[#026d8a]"
                >
                  Connect XELL Wallet
                </button>
              ) : (
                <a
                  href="https://chrome.google.com/webstore/category/extensions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-[#0284a5] hover:bg-[#026d8a]"
                >
                  Get XELL Wallet
                </a>
              )}
              <div className="absolute top-0 right-0">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  availableWallets.xell ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {availableWallets.xell ? 'Available' : 'Not Installed'}
                </span>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or connect with</span>
              </div>
            </div>

            {/* MetaMask */}
            <div className="relative">
              {availableWallets.metamask ? (
                <button
                  onClick={() => {
                    setShowExtensionModal(false);
                    connectWallet('metamask');
                  }}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg shadow-sm text-gray-700 bg-white hover:bg-gray-50"
                >
                  <img src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" alt="MetaMask" className="w-5 h-5 mr-2" />
                  Connect MetaMask
                </button>
              ) : (
                <a
                  href="https://metamask.io/download/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg shadow-sm text-gray-700 bg-white hover:bg-gray-50"
                >
                  <img src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" alt="MetaMask" className="w-5 h-5 mr-2" />
                  Get MetaMask
                </a>
              )}
              <div className="absolute top-0 right-0">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  availableWallets.metamask ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {availableWallets.metamask ? 'Available' : 'Not Installed'}
                </span>
              </div>
              <p className="mt-2 text-xs text-gray-500">(For testing only)</p>
            </div>
          </div>
        </div>
      </Modal>
    </AuthContext.Provider>
  );
}