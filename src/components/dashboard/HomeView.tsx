import { Post } from '@/components/post';
import { MarketplaceItem } from '@/types/marketplace';
import { motion } from 'framer-motion';

const MARKETPLACE_ITEMS: MarketplaceItem[] = [
  // ... existing items array
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};
export function HomeView() {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-display-lg text-gray-900">Latest Updates</h1>
        <div className="flex items-center space-x-4">
          <button className="text-body-sm text-gray-500 hover:text-gray-700">Most Recent</button>
          <button className="text-body-sm text-gray-500 hover:text-gray-700">Most Popular</button>
        </div>
      </div>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        {MARKETPLACE_ITEMS.map((item) => (
          <Post key={item.id} item={item} />
        ))}
        <div className="flex justify-center py-8">
          <button className="px-6 py-2 text-body-sm text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
            Load More
          </button>
        </div>
      </motion.div>
    </div>
  );
}