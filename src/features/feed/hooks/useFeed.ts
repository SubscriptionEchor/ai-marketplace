import { FEED_ITEMS } from '@/lib/constants/feed';
import type { FeedItemType } from '@/lib/types';
import { useState } from 'react';

export function useFeed() {
  const [items] = useState<FeedItemType[]>(FEED_ITEMS);
  const [hasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loadMore = async () => {
    if (!hasMore || isLoading) return;
    setIsLoading(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  return {
    items,
    hasMore,
    isLoading,
    loadMore
  };
}