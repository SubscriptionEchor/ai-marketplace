import type { MarketplaceItem } from '../endpoints/marketplace';
import type { PaginatedResponse } from '../types';

const generateMockMarketplace = (page: number, limit: number): PaginatedResponse<MarketplaceItem> => {
  const startIndex = (page - 1) * limit;
  const total = 100;

  const items = Array.from({ length: Math.min(limit, total - startIndex) }, (_, i) => ({
    id: startIndex + i + 1,
    title: `AI Model #${startIndex + i + 1}`,
    creator: 'Creator Name',
    description: 'A powerful AI model for natural language processing and generation.',
    price: {
      eth: 2.5,
      usd: 4250
    },
    stats: {
      downloads: Math.floor(Math.random() * 1000),
      ratings: Math.floor(Math.random() * 500),
      averageRating: 4 + Math.random()
    }
  }));

  return {
    items,
    hasMore: startIndex + limit < total,
    total,
    nextCursor: startIndex + limit < total ? String(page + 1) : undefined
  };
};

export const mockMarketplaceApi = {
  getModels: async ({ page, limit }: { page: number; limit: number }) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return generateMockMarketplace(page, limit);
  }
};