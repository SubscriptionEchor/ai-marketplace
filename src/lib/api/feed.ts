import type { FeedItemType } from '@/lib/types';
import type { PaginatedResponse } from './types';

interface FetchFeedParams {
  page: number;
  limit: number;
}

export async function fetchFeed({ page, limit }: FetchFeedParams): Promise<PaginatedResponse<FeedItemType>> {
  try {
    const response = await fetch(`/api/feed?page=${page}&limit=${limit}`);
    if (!response.ok) throw new Error('Failed to fetch feed');
    return await response.json();
  } catch (error) {
    console.error('Error fetching feed:', error);
    throw error;
  }
}