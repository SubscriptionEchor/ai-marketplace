import type { FeedItemType } from '@/types';

export const FEED_ITEMS: FeedItemType[] = [
  {
    id: 1,
    author: {
      name: 'Sarah Chen',
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Chen&background=6366F1&color=fff',
      handle: '@sarahchen'
    },
    content: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80',
      caption: 'Just deployed my new AI model for image recognition! 🚀 #AI #MachineLearning'
    },
    stats: {
      upvotes: 234,
      downloads: 45,
      shares: 12,
      lastUpdated: '2024-01-15T10:30:00Z'
    },
    timestamp: '2h ago'
  },
  {
    id: 2,
    author: {
      name: 'Alex Rivera',
      avatar: 'https://ui-avatars.com/api/?name=Alex+Rivera&background=6366F1&color=fff',
      handle: '@arivera'
    },
    content: {
      type: 'text',
      text: 'Excited to announce our new NLP model achieving state-of-the-art results on multiple benchmarks! Check it out on the marketplace. 📊 #NLP #ArtificialIntelligence'
    },
    stats: {
      upvotes: 156,
      downloads: 89,
      shares: 34,
      lastUpdated: '2024-01-14T15:45:00Z'
    },
    timestamp: '4h ago'
  }
];