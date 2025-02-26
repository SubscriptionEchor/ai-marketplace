import type { FeedItemType } from '@/lib/types';
import type { PaginatedResponse } from '../types';

const generateMockFeed = (page: number, limit: number): PaginatedResponse<FeedItemType> => {
  const startIndex = (page - 1) * limit;
  const total = 100; // Total number of items
  
  const items = Array.from({ length: Math.min(limit, total - startIndex) }, (_, i) => ({
    id: startIndex + i + 1,
    author: {
      name: `Creator ${startIndex + i + 1}`,
      avatar: `https://ui-avatars.com/api/?name=Creator+${startIndex + i + 1}&background=6366F1&color=fff`,
      handle: `@creator${startIndex + i + 1}`
    },
    content: {
      type: ((startIndex + i) % 2 === 0 ? 'image' : 'text') as 'image' | 'text',
      url: (startIndex + i) % 2 === 0 ? `https://picsum.photos/seed/${startIndex + i + 1}/800/800` : undefined,
      text: (startIndex + i) % 2 === 0 ? undefined : `This is post #${startIndex + i + 1} showcasing our latest AI model developments! #AI #Innovation`,
      caption: (startIndex + i) % 2 === 0 ? `Check out our latest AI model visualization #${startIndex + i + 1}` : undefined
    },
    stats: {
      upvotes: Math.floor(Math.random() * 1000),
      downloads: Math.floor(Math.random() * 500),
      shares: Math.floor(Math.random() * 100),
      lastUpdated: new Date(Date.now() - Math.random() * 10000000000).toISOString()
    },
    timestamp: `${Math.floor(Math.random() * 24)}h ago`
  }));

  return {
    items,
    hasMore: startIndex + limit < total,
    total,
    nextCursor: startIndex + limit < total ? String(page + 1) : undefined
  };
};

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockFeedApi = {
  getFeed: async ({ page, limit }: { page: number; limit: number }) => {
    await delay(800); // Simulate network delay
    return generateMockFeed(page, limit);
  }
};