import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';

const ITEMS_PER_PAGE = 25;
const TOTAL_ITEMS = 100;

import type { MarketplaceItem } from '@/features/dashboard/views/MarketplaceView';

export function MarketplaceView() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(TOTAL_ITEMS / ITEMS_PER_PAGE);
  
  const items = useMemo<MarketplaceItem[]>(() => {
    return Array.from({ length: Math.min(ITEMS_PER_PAGE, TOTAL_ITEMS - ((currentPage - 1) * ITEMS_PER_PAGE)) }, (_, i) => {
      const id = i + 1 + (currentPage - 1) * ITEMS_PER_PAGE;
      return {
        id,
        title: `AI Model #${id}`,
        creator: 'Creator Name',
        description: 'A powerful AI model for natural language processing and generation.',
        price: {
          eth: 2.5,
          usd: 4250
        }
      };
    });
  }, [currentPage]);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">AI Models Marketplace</h1>
          <p className="mt-2 text-sm text-gray-700">
            Browse and discover AI models from the community
          </p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: Math.min((item.id % ITEMS_PER_PAGE) * 0.02, 0.5) }}
            className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200"
          >
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 bg-[#6366F1]/10 rounded-lg flex items-center justify-center">
                    <svg className="h-6 w-6 text-[#6366F1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h2 className="text-lg font-medium text-gray-900">{item.title}</h2>
                  <p className="text-sm text-gray-500">By {item.creator}</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-500">
                  {item.description}
                </p>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-900">{item.price.eth} ETH</span>
                  <span className="text-xs text-gray-500">(${item.price.usd})</span>
                </div>
                <button className="bg-[#6366F1] text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-[#5558E6] transition-colors">
                  View Details
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-8 pb-8 flex flex-col sm:flex-row items-center justify-between border-t border-gray-200 pt-6 space-y-4 sm:space-y-0">
        <div className="flex items-center text-center sm:text-left w-full sm:w-auto">
          <p className="text-sm text-gray-700">
            Showing{' '}
            <span className="font-medium">{((currentPage - 1) * ITEMS_PER_PAGE) + 1}</span>
            {' '}-{' '}
            <span className="font-medium">{Math.min(currentPage * ITEMS_PER_PAGE, TOTAL_ITEMS)}</span>
            {' '}of{' '}
            <span className="font-medium">{TOTAL_ITEMS}</span>
            {' '}results
          </p>
        </div>
        <div className="flex space-x-2 w-full sm:w-auto justify-center sm:justify-end">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              currentPage === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            } border border-gray-300`}
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              currentPage === totalPages
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            } border border-gray-300`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}