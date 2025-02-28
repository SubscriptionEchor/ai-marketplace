import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export function HomeView() {
  const navigate = useNavigate();
  const [showSetupGuide, setShowSetupGuide] = useState(true);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-4 md:px-6 lg:px-8 pt-6">
      {/* Main Content Column */}
      <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-[#e1e3e5] h-fit">
        <h1 className="text-2xl font-semibold text-gray-900">Welcome to TRIE AI Marketplace</h1>
      </div>

      {/* Setup Guide Column */}
      <div className="space-y-6 h-[calc(100vh-160px)] overflow-y-auto pr-4 -mr-4">
        {/* Setup Guide */}
        {showSetupGuide && (
        <div className="bg-white rounded-xl shadow-sm border border-[#e1e3e5] overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Setup guide</h2>
                <p className="text-sm text-gray-500">0 / 3 completed</p>
              </div>
              <button 
                onClick={() => setShowSetupGuide(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              {/* Connect Wallet */}
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full border-2 border-gray-200">
                  <div className="w-2.5 h-2.5 rounded-full bg-gray-200"></div>
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-sm font-medium text-gray-900">Connect XELL wallet</h3>
                  <p className="mt-1 text-sm text-gray-500">Connect your wallet to start using the marketplace</p>
                  <button className="mt-2 text-sm text-[#0284a5] hover:text-[#026d8a]">
                    Connect wallet
                  </button>
                </div>
              </div>

              {/* Add Product */}
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full border-2 border-gray-200">
                  <div className="w-2.5 h-2.5 rounded-full bg-gray-200"></div>
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-sm font-medium text-gray-900">Add a product</h3>
                  <p className="mt-1 text-sm text-gray-500">Add your first AI model or dataset</p>
                  <button className="mt-2 text-sm text-[#0284a5] hover:text-[#026d8a]">
                    Add product
                  </button>
                </div>
              </div>

              {/* Make Sales */}
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full border-2 border-gray-200">
                  <div className="w-2.5 h-2.5 rounded-full bg-gray-200"></div>
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-sm font-medium text-gray-900">Make 10 sales to reach level 2</h3>
                  <p className="mt-1 text-sm text-gray-500">All users start at level 1</p>
                  <div className="mt-2 w-full bg-gray-100 rounded-full h-1.5">
                    <div className="bg-[#0284a5] h-1.5 rounded-full" style={{ width: '0%' }}></div>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">0 of 10 sales</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        )}

        {/* Best Practices and Guides */}
        <div className="bg-white rounded-xl shadow-sm border border-[#e1e3e5] p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Resources</h2>
          <div className="space-y-4">
            <a href="#" className="block p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
              <h3 className="text-sm font-medium text-gray-900">Seller Guide</h3>
              <p className="mt-1 text-sm text-gray-500">Learn how to effectively sell your AI models</p>
            </a>
            <a href="#" className="block p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
              <h3 className="text-sm font-medium text-gray-900">Buyer Guide</h3>
              <p className="mt-1 text-sm text-gray-500">Tips for finding and evaluating AI models</p>
            </a>
            <a href="#" className="block p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
              <h3 className="text-sm font-medium text-gray-900">Best Practices</h3>
              <p className="mt-1 text-sm text-gray-500">Recommended practices for the marketplace</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}