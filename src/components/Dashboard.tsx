import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('marketplace');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              {/* Logo */}
              <div className="flex-shrink-0 flex items-center">
                <img
                  src="https://trie.network/images/logo.png"
                  alt="TRIE AI"
                  className="h-8 w-auto"
                />
              </div>

              {/* Navigation Links */}
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <button
                  onClick={() => setActiveTab('marketplace')}
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                    activeTab === 'marketplace'
                      ? 'border-[#6366F1] text-gray-900 border-b-2'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 border-b-2'
                  }`}
                >
                  Marketplace
                </button>
                <button
                  onClick={() => setActiveTab('models')}
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                    activeTab === 'models'
                      ? 'border-[#6366F1] text-gray-900 border-b-2'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 border-b-2'
                  }`}
                >
                  My Models
                </button>
                <button
                  onClick={() => setActiveTab('datasets')}
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                    activeTab === 'datasets'
                      ? 'border-[#6366F1] text-gray-900 border-b-2'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 border-b-2'
                  }`}
                >
                  Datasets
                </button>
              </div>
            </div>

            {/* Right side buttons */}
            <div className="flex items-center space-x-4">
              <button className="bg-[#6366F1]/10 text-[#6366F1] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#6366F1]/20 transition-colors">
                Connect Wallet
              </button>
              <button className="bg-[#6366F1] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#5558E6] transition-colors">
                Upload Model
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Marketplace View */}
        {activeTab === 'marketplace' && (
          <div className="px-4 sm:px-0">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-xl font-semibold text-gray-900">AI Models Marketplace</h1>
                <p className="mt-2 text-sm text-gray-700">
                  Browse and discover AI models from the community
                </p>
              </div>
            </div>

            {/* Grid of Models */}
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: item * 0.1 }}
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
                        <h2 className="text-lg font-medium text-gray-900">AI Model #{item}</h2>
                        <p className="text-sm text-gray-500">By Creator Name</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm text-gray-500">
                        A powerful AI model for natural language processing and generation.
                      </p>
                    </div>
                  </div>
                  <div className="px-6 py-4 bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-900">2.5 ETH</span>
                        <span className="text-xs text-gray-500">($4,250)</span>
                      </div>
                      <button className="bg-[#6366F1] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#5558E6] transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* My Models View */}
        {activeTab === 'models' && (
          <div className="px-4 sm:px-0">
            <h1 className="text-xl font-semibold text-gray-900">My Models</h1>
            <p className="mt-2 text-sm text-gray-700">
              Manage and monitor your uploaded AI models
            </p>
          </div>
        )}

        {/* Datasets View */}
        {activeTab === 'datasets' && (
          <div className="px-4 sm:px-0">
            <h1 className="text-xl font-semibold text-gray-900">Datasets</h1>
            <p className="mt-2 text-sm text-gray-700">
              Browse and manage training datasets
            </p>
          </div>
        )}
      </main>
    </div>
  );
}