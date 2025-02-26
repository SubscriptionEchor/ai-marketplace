export interface FeedItemType {
  id: number;
  author: {
    name: string;
    avatar: string;
    handle: string;
  };
  content: {
    type: 'image' | 'text';
    url?: string;
    text?: string;
    caption?: string;
  };
  stats: {
    upvotes: number;
    downloads: number;
    shares: number;
    lastUpdated: string;
  };
  timestamp: string;
}