import { motion } from 'framer-motion';
import { SHARE_OPTIONS } from '@/lib/constants/share';

interface ShareOptionsProps {
  url: string;
  title?: string;
  onShare: () => void;
}

export function ShareOptions({ url, title = '', onShare }: ShareOptionsProps) {
  return (
    <div className="space-y-6">
      {/* Share Options */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-3 mt-2 mb-1">
          <h3 className="text-sm font-medium text-gray-700">Share via</h3>
        </div>
        {SHARE_OPTIONS.map((option) => (
          <motion.button
            key={option.name}
            onClick={() => {
              window.open(
                option.getShareUrl(title, url),
                '_blank',
                'width=600,height=400'
              );
              onShare();
            }}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
            whileTap={{ 
              scale: 0.98 
            }}
            className="flex items-center justify-center gap-2 p-2 rounded bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <svg
              className="w-5 h-5"
              viewBox={option.viewBox}
              fill="currentColor"
            >
              <path d={option.icon} />
            </svg>
            <span className="text-sm font-medium">{option.name}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}