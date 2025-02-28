import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useLike } from '@/hooks/useLike';

interface LikeButtonProps {
  initialLikes: number;
}

const particles = Array.from({ length: 6 });

export function LikeButton({ initialLikes }: LikeButtonProps) {
  const { likes, isLiked, toggleLike } = useLike(initialLikes);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);
    toggleLike();
    setTimeout(() => setIsAnimating(false), 700);
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center text-gray-500 hover:text-gray-700 relative"
    >
      <div className="relative">
        <motion.div
          animate={isLiked ? {
            scale: [1, 1.2, 0.95, 1],
            transition: { duration: 0.35 }
          } : {}}
          className="relative z-10"
        >
          <svg 
            className={`w-5 h-5 transition-colors ${isLiked ? 'text-red-500 fill-current' : ''}`}
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

        <AnimatePresence>
          {isAnimating && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              {particles.map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ 
                    opacity: 1,
                    scale: 0,
                    x: 0,
                    y: 0
                  }}
                  animate={{
                    opacity: 0,
                    scale: 1.5,
                    x: Math.cos(index * (360 / particles.length) * (Math.PI / 180)) * 20,
                    y: Math.sin(index * (360 / particles.length) * (Math.PI / 180)) * 20,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="absolute w-1 h-1 bg-red-500 rounded-full"
                />
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
      <span className="text-sm ml-2">{likes}</span>
    </button>
  );
}