import { motion } from 'framer-motion';

const FEED_ITEMS = [
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
      likes: 234,
      comments: 45,
      shares: 12
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
      likes: 156,
      comments: 23,
      shares: 8
    },
    timestamp: '4h ago'
  }
];

export function HomeView() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Feed */}
      <div className="space-y-6">
        {FEED_ITEMS.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
          >
            {/* Post Header */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src={item.author.avatar}
                  alt={item.author.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h3 className="font-medium text-gray-900">{item.author.name}</h3>
                  <p className="text-sm text-gray-500">{item.author.handle}</p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                </svg>
              </button>
            </div>

            {/* Post Content */}
            {item.content.type === 'image' && (
              <img
                src={item.content.url}
                alt="Post"
                className="w-full aspect-square object-cover"
              />
            )}
            {item.content.type === 'text' && (
              <div className="px-4 py-3">
                <p className="text-gray-900">{item.content.text}</p>
              </div>
            )}

            {/* Post Actions */}
            <div className="p-4 flex items-center justify-between border-t border-gray-100">
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-1 text-gray-500 hover:text-[#6366F1]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span className="text-sm font-medium">{item.stats.likes}</span>
                </button>
                <button className="flex items-center space-x-1 text-gray-500 hover:text-[#6366F1]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span className="text-sm font-medium">{item.stats.comments}</span>
                </button>
                <button className="flex items-center space-x-1 text-gray-500 hover:text-[#6366F1]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  <span className="text-sm font-medium">{item.stats.shares}</span>
                </button>
              </div>
              <span className="text-sm text-gray-500">{item.timestamp}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}