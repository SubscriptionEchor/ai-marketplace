import { motion } from 'framer-motion';
import { LikeButton } from './LikeButton';
import { formatNumber } from '@/utils/formatNumber';

const CATEGORY_STYLES = {
  'Natural Language Processing': 'bg-green-50 text-green-700',
  'Multimodal': 'bg-purple-50 text-purple-700',
  'Computer Vision': 'bg-blue-50 text-blue-700',
  'Audio': 'bg-orange-50 text-orange-700',
  'Tabular': 'bg-indigo-50 text-indigo-700',
  'Reinforcement Learning': 'bg-yellow-50 text-yellow-700',
  'Text Generation': 'bg-emerald-50 text-emerald-700',
  'Image Generation': 'bg-rose-50 text-rose-700',
  'Video Generation': 'bg-cyan-50 text-cyan-700',
  'Chat Models': 'bg-fuchsia-50 text-fuchsia-700',
  'Vision Models': 'bg-sky-50 text-sky-700',
  'Other': 'bg-gray-50 text-gray-700'
};

interface ModelCardProps {
  model: {
    id: string;
    creator?: {
      name: string;
      avatar?: string;
    };
    image: string;
    name: string;
    categories: string[];
    description: string;
    updatedAt: string;
    downloads: string;
    likes: string;
  };
  isLiked: boolean;
  onLike: (id: string) => void;
}

export function ModelCard({ model, isLiked, onLike }: ModelCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="group bg-white rounded-xl border border-[#e1e3e5] hover:border-gray-300 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col cursor-pointer h-[420px]"
    >
      {/* Image Container */}
      <div className="relative h-[200px] overflow-hidden bg-gray-50 flex-shrink-0">
        <img 
          src={model.image} 
          alt="AI Model Visualization"
          className="w-full h-full object-cover transform group-hover:scale-105 transition-all duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-3 right-3">
          <LikeButton
            isLiked={isLiked}
            likes={model.likes}
            onLike={() => onLike(model.id)}
          />
        </div>
      </div>
      
      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-medium shadow-sm flex-shrink-0">
                {model.creator?.avatar || model.creator?.name?.[0] || model.name[0]}
              </div>
              <div className="min-w-0">
                <h3 className="text-base font-semibold text-gray-900 leading-snug tracking-tight truncate font-display">
                  {model.name}
                </h3>
                <p className="text-xs text-gray-500 truncate font-mono">
                  {model.creator?.name || model.name.split('/')[0]}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between mb-4">
              {model.categories.slice(0, 1).map((category) => (
                <span key={category} className={`inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${
                  CATEGORY_STYLES[category as keyof typeof CATEGORY_STYLES] || CATEGORY_STYLES['Other']
                }`}>
                  {category}
                </span>
              ))}
              {model.categories.length > 1 && (
                <span className="inline-flex items-center text-xs font-mono px-2 py-0.5 rounded-full bg-gray-50 text-gray-600 whitespace-nowrap">
                  +{model.categories.length - 1} more
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
              {model.description}
            </p>
          </div>
        </div>
        
        <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>{formatNumber(model.downloads)}</span>
          </div>
          <span className="text-xs text-gray-500">
            Updated {model.updatedAt}
          </span>
        </div>
      </div>
    </motion.div>
  );
}