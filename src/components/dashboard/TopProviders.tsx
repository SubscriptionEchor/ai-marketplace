import { motion } from 'framer-motion';
import { Popover } from '@headlessui/react';

const TOP_PROVIDERS = [
  {
    id: 1,
    name: 'Esme Crutchley',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    assets: 156
  },
  {
    id: 2, 
    name: 'Marshall',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop&crop=face',
    assets: 89
  },
  {
    id: 3,
    name: 'JF Martin',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face',
    assets: 234
  },
  {
    id: 4,
    name: 'FlohGro',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face',
    assets: 67
  },
  {
    id: 5,
    name: 'Hans Rippel',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    assets: 178
  },
  {
    id: 6,
    name: "Sean O'Kana",
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    assets: 92
  }
];

export function TopProviders() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">Top Creator's this Week</h2>
        <Popover className="relative">
          <Popover.Button className="text-gray-400 hover:text-gray-600 focus:outline-none">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </Popover.Button>
          <Popover.Panel className="absolute z-10 right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-100 p-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-900">Weekly Rankings</p>
              <p className="text-sm text-gray-600">
                This list is updated every Monday based on creator performance and engagement metrics from the previous week.
              </p>
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-sm font-medium text-gray-900">Why it matters</p>
                <ul className="mt-2 space-y-1">
                  <li className="text-sm text-gray-600 flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Increased visibility to potential buyers
                  </li>
                  <li className="text-sm text-gray-600 flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Higher trust and credibility
                  </li>
                  <li className="text-sm text-gray-600 flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Featured in marketplace recommendations
                  </li>
                </ul>
              </div>
            </div>
          </Popover.Panel>
        </Popover>
      </div>
      <div className="p-3">
        {TOP_PROVIDERS.map((provider, index) => (
          <motion.div
            key={provider.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-center justify-between group hover:bg-gray-50 p-2.5 rounded-lg transition-colors duration-200"
          >
            <div className="flex items-center space-x-3">
              <img
                src={provider.avatar}
                alt={provider.name}
                className="w-9 h-9 rounded-full ring-1 ring-gray-100"
              />
              <span className="text-sm font-medium text-gray-900">{provider.name}</span>
            </div>
            <span className="text-xs font-medium text-gray-600 bg-gray-50 px-2.5 py-1 rounded-full group-hover:bg-white transition-all duration-200">
              {provider.assets}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}