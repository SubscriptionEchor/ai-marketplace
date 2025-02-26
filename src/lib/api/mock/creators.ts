import type { Creator } from '../endpoints/creators';
import type { PaginatedResponse } from '../types';

const MOCK_CREATORS: Creator[] = [
  {
    id: 1,
    name: 'Elena Martinez',
    handle: '@elenam',
    avatar: 'https://ui-avatars.com/api/?name=Elena+Martinez&background=6366F1&color=fff',
    followers: 12500,
    isFollowing: false,
    stats: {
      models: 15,
      totalSales: 2500,
      rating: 4.8
    }
  },
  // ... other creators
];

export const mockCreatorsApi = {
  getTopCreators: async ({ page, limit }: { page: number; limit: number }): Promise<PaginatedResponse<Creator>> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const startIndex = (page - 1) * limit;
    const items = MOCK_CREATORS.slice(startIndex, startIndex + limit);
    
    return {
      items,
      hasMore: startIndex + limit < MOCK_CREATORS.length,
      total: MOCK_CREATORS.length,
      nextCursor: startIndex + limit < MOCK_CREATORS.length ? String(page + 1) : undefined
    };
  }
};