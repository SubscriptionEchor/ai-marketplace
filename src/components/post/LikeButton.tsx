import { motion } from 'framer-motion';
import { useLike } from '@/hooks/useLike';

interface LikeButtonProps {
  initialLikes: number;
}

export function LikeButton({ initialLikes }: LikeButtonProps) {
  const { likes, isLiked, toggleLike } = useLike(initialLikes);

  return (
    <button
      onClick={toggleLike}
      className="flex items-center text-gray-500 hover:text-gray-700"
    >
      <motion.div
        whileTap={{ scale: 0.8 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <svg 
          className={`w-4 h-4 mr-1 transition-colors ${isLiked ? 'text-red-500 fill-current' : ''}`} 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
          />
        </svg>
      </motion.div>
      <span className="text-sm">{likes}</span>
    </button>
  );
}