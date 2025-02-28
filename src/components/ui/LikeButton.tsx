import { motion, AnimatePresence } from 'framer-motion';

interface LikeButtonProps {
  isLiked: boolean;
  likes: string;
  onLike: () => void;
}

export function LikeButton({ isLiked, likes, onLike }: LikeButtonProps) {
  return (
    <motion.button
      onClick={(e) => {
        e.stopPropagation();
        onLike();
      }}
      className="flex items-center gap-1 group relative"
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <AnimatePresence>
        {isLiked ? (
          <motion.svg
            key="filled"
            className="w-4 h-4 text-red-500"
            viewBox="0 0 24 24"
            fill="currentColor"
            initial={{ scale: 0 }}
            animate={{ 
              scale: [0, 1.2, 1],
              transition: { 
                duration: 0.3,
                times: [0, 0.6, 1]
              }
            }}
            exit={{ scale: 0 }}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </motion.svg>
        ) : (
          <motion.svg
            key="outline"
            className="w-4 h-4 text-gray-600 group-hover:text-red-500 transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            initial={{ scale: 0 }}
            animate={{ 
              scale: [0, 1.1, 1],
              transition: { 
                duration: 0.2,
                times: [0, 0.6, 1]
              }
            }}
            exit={{ scale: 0 }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </motion.svg>
        )}
      </AnimatePresence>
      {likes}
    </motion.button>
  );
}