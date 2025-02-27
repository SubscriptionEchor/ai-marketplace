export interface MarketplaceItem {
  id: number;
  title: string;
  content: string;
  timestamp: string;
  author: string;
  avatar: string;
  likes: number;
  downloads: number;
  images?: string[];
  creator: string;
  description: string;
  price: {
    eth: number;
    usd: number;
  };
}