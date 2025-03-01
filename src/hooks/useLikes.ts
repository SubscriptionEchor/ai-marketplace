import { useState } from 'react';

interface UseLikesResult {
  likedItems: Record<string, boolean>;
  likeCounts: Record<string, number>;
  handleLike: (itemId: string, currentLikes: string) => void;
}

export function useLikes(): UseLikesResult {
  const [likedItems, setLikedItems] = useState<Record<string, boolean>>({});
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>({});

  const handleLike = (itemId: string, currentLikes: string) => {
    // Initialize like count if not already set
    if (!likeCounts[itemId]) {
      setLikeCounts(prev => ({
        ...prev,
        [itemId]: parseInt(currentLikes.replace(/,/g, ''), 10) || 0
      }));
    }

    setLikedItems(prev => {
      const wasLiked = prev[itemId];
      return { ...prev, [itemId]: !wasLiked };
    });

    setLikeCounts(prev => ({
      ...prev,
      [itemId]: prev[itemId] + (likedItems[itemId] ? -1 : 1)
    }));
  };

  return { likedItems, likeCounts, handleLike };
}