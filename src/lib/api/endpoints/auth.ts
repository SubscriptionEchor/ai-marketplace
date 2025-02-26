import { apiClient } from '../client';
import type { ProfileData, Preferences } from '@/lib/types';

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    walletAddress: string;
  };
}

export const authApi = {
  connectWallet: (walletAddress: string) =>
    apiClient.post<AuthResponse>('/auth/connect', { walletAddress }),

  createAccount: (data: {
    walletAddress: string;
    profile: ProfileData;
    preferences: Preferences;
  }) =>
    apiClient.post<AuthResponse>('/auth/create-account', data),

  logout: () => apiClient.post<{ success: boolean }>('/auth/logout', {}),
};