import { apiClient } from '../client';
import type { PaginationParams, PaginatedResponse } from '../types';

export interface MarketplaceItem {
  id: number;
  title: string;
  creator: string;
  description: string;
  price: {
    eth: number;
    usd: number;
  };
  stats: {
    downloads: number;
    ratings: number;
    averageRating: number;
  };
}

export const marketplaceApi = {
  getModels: (params: PaginationParams) =>
    apiClient.get<PaginatedResponse<MarketplaceItem>>('/marketplace/models', {
      page: params.page.toString(),
      limit: params.limit.toString(),
    }),

  getModelDetails: (modelId: number) =>
    apiClient.get<MarketplaceItem>(`/marketplace/models/${modelId}`),

  purchaseModel: (modelId: number) =>
    apiClient.post<{ success: boolean; transactionHash: string }>(
      `/marketplace/models/${modelId}/purchase`,
      {}
    ),
};