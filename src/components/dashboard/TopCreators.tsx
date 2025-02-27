import { motion } from 'framer-motion';
import { useState } from 'react';

const TOP_CREATORS = [
  {
    id: 1,
    name: 'Elena Martinez',
    avatar: 'https://ui-avatars.com/api/?name=Elena+Martinez&background=6366F1&color=fff',
    handle: '@elenam',
    followers: 12500,
    isFollowing: false
  },
  {
    id: 2,
    name: 'David Kim',
    avatar: 'https://ui-avatars.com/api/?name=David+Kim&background=6366F1&color=fff',
    handle: '@davidk',
    followers: 9800,
    isFollowing: true
  },
  {
    id: 3,
    name: 'Sarah Johnson',
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=6366F1&color=fff',
    handle: '@sarahj',
    followers: 8200,
    isFollowing: false
  },
  {
    id: 4,
    name: 'Michael Chen',
    avatar: 'https://ui-avatars.com/api/?name=Michael+Chen&background=6366F1&color=fff',
    handle: '@michaelc',
    followers: 7400,
    isFollowing: false
  },
  {
    id: 5,
    name: 'Lisa Anderson',
    avatar: 'https://ui-avatars.com/api/?name=Lisa+Anderson&background=6366F1&color=fff',
    handle: '@lisaa',
    followers: 6900,
    isFollowing: true
  }
];

export function TopCreators() {
  const [creators, setCreators] = useState(TOP_CREATORS);

  const handleFollow = (creatorId: number) => {
    setCreators(prevCreators =>
      prevCreators.map(creator =>
        creator.id === creatorId
          ? { ...creator, isFollowing: !creator.isFollowing }
          : creator
      )
    );
  };

  const formatFollowers = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  return (
    <div className="bg-background-secondary rounded-xl border border-border overflow-hidden md:sticky md:top-6">
      <div className="p-5 border-b border-border">
        <h2 className="text-lg font-semibold text-text-primary">Top Creators</h2>
        <p className="text-sm text-text-secondary mt-1">Follow the best AI model creators</p>
      </div>

      <div className="divide-y divide-border">
        {creators.map((creator, index) => (
          <motion.div
            key={creator.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="p-4 hover:bg-background-tertiary transition-colors"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-3">
                <img
                  src={creator.avatar}
                  alt={creator.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h3 className="text-sm font-medium text-text-primary">{creator.name}</h3>
                  <div className="flex items-center space-x-2 mt-0.5">
                    <span className="text-sm text-text-secondary">{creator.handle}</span>
                    <span className="text-xs text-text-tertiary">•</span>
                    <span className="text-sm text-text-secondary">{formatFollowers(creator.followers)} followers</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleFollow(creator.id)}
                className={`w-full sm:w-auto px-3 py-1 rounded-full text-sm font-medium transition-all focus:outline-none focus:shadow-focus-dark ${
                  creator.isFollowing
                    ? 'bg-primary/10 text-primary hover:bg-primary/20'
                    : 'bg-primary text-white hover:bg-primary-hover'
                }`}
              >
                {creator.isFollowing ? 'Following' : 'Follow'}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="p-4 bg-background-tertiary border-t border-border">
        <button className="text-primary text-sm font-medium hover:text-primary-hover transition-colors">
          View all creators →
        </button>
      </div>
    </div>
  );
}