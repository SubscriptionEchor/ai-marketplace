import { Card } from '../ui/Card/Card';
import { PostHeader } from './PostHeader';
import { PostContent } from './PostContent';
import { PostActions } from './PostActions';
import { motion } from 'framer-motion';
import { MarketplaceItem } from '@/types/marketplace';

interface PostProps {
  item: MarketplaceItem;
}

export function Post({ item }: PostProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
    >
      <Card className="hover:shadow-md transition-shadow duration-300">
        <div className="flex flex-col space-y-6">
          <PostHeader
            author={item.author}
            avatar={item.avatar}
            timestamp={item.timestamp}
          />
          <PostContent
            title={item.title}
            content={item.content}
            images={item.images}
          />
          <div className="flex items-center pt-4 border-t border-gray-100">
            <PostActions
              likes={item.likes}
              downloads={item.downloads}
            />
          </div>
        </div>
      </Card>
    </motion.div>
  );
}