declare global {
  interface Window {
    xell?: {
      connect: () => Promise<{ address: string }>;
      disconnect: () => Promise<void>;
      isConnected: () => Promise<boolean>;
    };
    ethereum?: any;
  }
}

export type WalletType = 'xell' | 'metamask';

export class WalletService {
  static async isExtensionInstalled(type: WalletType = 'xell'): Promise<boolean> {
    if (type === 'xell') {
      return window.xell !== undefined;
    }
    return window.ethereum !== undefined;
  }

  static async connect(type: WalletType = 'xell'): Promise<{ address: string; type: WalletType } | null> {
    try {
      if (type === 'xell') {
        return await WalletService.connectXell();
      } else {
        return await WalletService.connectMetaMask();
      }
    } catch (error) {
      // Don't log user rejections as errors
      if (error && typeof error === 'object' && 'code' in error && error.code !== 4001) {
        console.error(`Failed to connect to ${type} wallet:`, error);
      }
      return null;
    }
  }

  private static async connectXell(): Promise<{ address: string; type: WalletType } | null> {
    if (!window.xell) {
      return null;
    }
    const result = await window.xell.connect();
    return { ...result, type: 'xell' };
  }

  private static async connectMetaMask(): Promise<{ address: string; type: WalletType } | null> {
    if (!window.ethereum) {
      return null;
    }

    try {
      // This will trigger the MetaMask popup
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
        params: [] // Empty params array is required
      });

      if (!accounts || accounts.length === 0) {
        return null;
      }

      return { address: accounts[0], type: 'metamask' };
    } catch (error) {
      throw error; // Let the parent handle the error
    }
  }

  static async disconnect(type: WalletType = 'xell'): Promise<void> {
    try {
      if (type === 'xell') {
        if (!window.xell) {
          throw new Error('XELL wallet extension not found');
        }
        await window.xell.disconnect();
      }
      // MetaMask doesn't have a disconnect method
    } catch (error) {
      console.error(`Failed to disconnect ${type} wallet:`, error);
    }
  }

  static async isConnected(type: WalletType = 'xell'): Promise<boolean> {
    try {
      if (type === 'xell') {
        if (!window.xell) {
          return false;
        }
        return await window.xell.isConnected();
      } else {
        if (!window.ethereum) {
          return false;
        }
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        return accounts.length > 0;
      }
    } catch (error) {
      console.error(`Failed to check ${type} wallet connection:`, error);
      return false;
    }
  }
}