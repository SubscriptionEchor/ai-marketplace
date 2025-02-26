import { apiClient } from '../client';
import type { PaginationParams, PaginatedResponse } from '../types';

export interface Creator {
  id: number;
  name: string;
  handle: string;
  avatar: string;
  followers: number;
  isFollowing: boolean;
  stats: {
    models: number;
    totalSales: number;
    rating: number;
  };
}

export const creatorsApi = {
  getTopCreators: (params: PaginationParams) =>
    apiClient.get<PaginatedResponse<Creator>>('/creators/top', {
      page: params.page.toString(),
      limit: params.limit.toString(),
    }),

  followCreator: (creatorId: number) =>
    apiClient.post<{ success: boolean }>(`/creators/${creatorId}/follow`, {}),

  unfollowCreator: (creatorId: number) =>
    apiClient.delete<{ success: boolean }>(`/creators/${creatorId}/follow`),
};