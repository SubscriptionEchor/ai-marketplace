import { apiClient } from '../client';
import type { FeedItemType } from '@/lib/types';
import type { PaginationParams, PaginatedResponse } from '../types';

export const feedApi = {
  getFeed: (params: PaginationParams) =>
    apiClient.get<PaginatedResponse<FeedItemType>>('/feed', {
      page: params.page.toString(),
      limit: params.limit.toString(),
    }),

  likePost: (postId: number) =>
    apiClient.post<{ success: boolean }>(`/feed/${postId}/like`, {}),

  sharePost: (postId: number) =>
    apiClient.post<{ success: boolean }>(`/feed/${postId}/share`, {}),
};