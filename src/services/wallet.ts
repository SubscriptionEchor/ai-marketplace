declare global {
  interface Window {
    xell?: {
      connect: () => Promise<{ address: string }>;
      disconnect: () => Promise<void>;
      isConnected: () => Promise<boolean>;
    };
  }
}

export type WalletType = 'xell';

export class WalletService {
  static async isExtensionInstalled(): Promise<boolean> {
    return window.xell !== undefined;
  }

  static async connect(type: WalletType = 'xell'): Promise<{ address: string; type: WalletType } | null> {
    try {
      // For now, simulate a successful connection regardless of extension status
      return {
        address: '0x1234...5678',
        type: 'xell'
      };
    } catch (error) {
      // Don't log user rejections as errors
      if (error && typeof error === 'object' && 'code' in error && error.code !== 4001) {
        console.error(`Failed to connect to ${type} wallet:`, error);
      }
      return null;
    }
  }

  static async disconnect(type: WalletType = 'xell'): Promise<void> {
    try {
      // For now, just simulate successful disconnection
      return;
    } catch (error) {
      console.error(`Failed to disconnect ${type} wallet:`, error);
    }
  }

  static async isConnected(type: WalletType = 'xell'): Promise<boolean> {
    try {
      if (!window.xell) {
        return false;
      }
      return await window.xell.isConnected();
    } catch (error) {
      console.error(`Failed to check ${type} wallet connection:`, error);
      return false;
    }
  }
}