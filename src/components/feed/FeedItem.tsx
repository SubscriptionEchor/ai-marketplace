import type { HTMLMotionProps } from 'framer-motion';
import { motion } from 'framer-motion';
import type { FeedItemType } from '@/types';
import { memo, useCallback } from 'react';
import { PostOptionsMenu } from './PostOptionsMenu';

interface FeedItemProps extends HTMLMotionProps<"div"> {
  item: FeedItemType;
  index: number;
  onShare: () => void;
}

export const FeedItem = memo(function FeedItem({ 
  item, 
  index, 
  onShare,
  ...motionProps 
}: FeedItemProps): JSX.Element {
  const handleNotInterested = useCallback(() => {
    // Implement not interested logic
    console.log('Not interested in post:', item.id);
  }, [item.id]);

  const handleReport = useCallback(() => {
    // Implement report logic
    console.log('Reporting post:', item.id);
  }, [item.id]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      {...motionProps}
      className="bg-background-secondary rounded-xl shadow-card border border-border overflow-hidden"
    >
      <div className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0 border-b border-border">
        <div className="flex items-center space-x-3">
          <img
            src={item.author.avatar}
            alt={item.author.name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h3 className="font-medium text-text-primary">{item.author.name}</h3>
            <p className="text-sm text-text-secondary">{item.author.handle}</p>
          </div>
        </div>
        <PostOptionsMenu
          onNotInterested={handleNotInterested}
          onReport={handleReport}
        />
      </div>

      {item.content.type === 'image' && (
        <img
          src={item.content.url}
          alt="Post"
          className="w-full aspect-square object-cover"
        />
      )}
      {item.content.type === 'text' && (
        <div className="px-4 py-3">
          <p className="text-text-primary">{item.content.text}</p>
        </div>
      )}

      <div className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between border-t border-border space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-1 text-text-secondary hover:text-primary transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="text-sm font-medium">{item.stats.upvotes}</span>
          </button>
          <button className="flex items-center space-x-1 text-text-secondary hover:text-primary transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span className="text-sm font-medium">{item.stats.downloads}</span>
          </button>
          <div className="relative">
            <button 
              className="flex items-center space-x-1 text-text-secondary hover:text-primary transition-colors relative"
              onClick={onShare}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              <span className="text-sm font-medium">{item.stats.shares}</span>
            </button>
          </div>
        </div>
        <div className="text-left sm:text-right w-full sm:w-auto">
          <span className="text-sm text-text-secondary block">{item.timestamp}</span>
          <span className="text-xs text-text-tertiary block">
            Updated {new Date(item.stats.lastUpdated).toLocaleDateString()}
          </span>
        </div>
      </div>
    </motion.div>
  );
});