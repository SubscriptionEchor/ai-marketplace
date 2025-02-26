import { useState, useCallback } from 'react';
import { Modal } from '@/features/ui/components/Modal';
import { FeedItem } from './FeedItem';
import { ShareOptions } from './ShareOptions';
import type { FeedItemType } from '@/lib/types';
import { useInfiniteScroll } from '@/lib/hooks/useInfiniteScroll';
import { FEED_ITEMS } from '@/lib/constants/feed';

export function FeedList() {
  const [shareItem, setShareItem] = useState<FeedItemType | null>(null);
  const [items] = useState(FEED_ITEMS);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore] = useState(false);
  
  const handleShare = useCallback((item: FeedItemType) => {
    setShareItem(item);
  }, []);

  const handleCloseShare = useCallback(() => {
    setShareItem(null);
  }, []);
  
  const loadMore = useCallback(async () => {
    if (!hasMore || isLoading) return;
    setIsLoading(true);
    // In a real app, this would fetch more items from an API
    setIsLoading(false);
  }, [hasMore, isLoading]);

  const { targetRef } = useInfiniteScroll(loadMore);

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900">No posts yet</h3>
        <p className="text-sm text-gray-500 mt-2">Be the first to share something!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {items.map((item, index) => (
        <FeedItem 
          key={item.id}
          item={item}
          index={index}
          onShare={() => handleShare(item)}
        />
      ))}

      {/* Loading indicator and intersection observer target */}
      <div ref={targetRef} className="py-4 text-center">
        {isLoading && hasMore && (
          <div className="flex items-center justify-center space-x-2 text-gray-500">
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Loading more posts...</span>
          </div>
        )}
        {!hasMore && items.length > 0 && (
          <p className="text-gray-500">No more posts to load</p>
        )}
      </div>
      
      <Modal
        show={shareItem !== null}
        onClose={handleCloseShare}
        title="Share this post"
      >
        <div className="py-4">
          {shareItem && (
            <ShareOptions
              url={window.location.href}
              title={shareItem.content.type === 'text' ? shareItem.content.text : shareItem.content.caption || ''}
              onShare={handleCloseShare}
            />
          )}
        </div>
      </Modal>
    </div>
  );
}