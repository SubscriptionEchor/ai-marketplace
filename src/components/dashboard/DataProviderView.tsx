import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks';
import { Modal } from '@/components/ui';
import { useState } from 'react';

const UPLOAD_OPTIONS = [
  {
    id: 'model',
    title: 'Add New Model',
    description: 'Upload your AI model to the marketplace',
    icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    color: 'from-purple-500 to-pink-500',
    comingSoon: false
  },
  {
    id: 'dataset',
    title: 'Add New Dataset',
    description: 'Share your dataset with the community',
    icon: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4',
    color: 'from-blue-500 to-cyan-500',
    comingSoon: false
  },
  {
    id: 'infra',
    title: 'Add Infra Service',
    description: 'Provide computing infrastructure for AI workloads',
    icon: 'M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01',
    color: 'from-green-500 to-emerald-500',
    comingSoon: false
  }
];

export function DataProviderView() {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleOptionClick = (optionId: string) => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    navigate(`/dashboard/upload/${optionId}`);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">What would you like to add?</h1>
        <p className="text-lg text-gray-600">Choose an option below to get started</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {UPLOAD_OPTIONS.map((option) => (
          <motion.div
            key={option.id}
            whileHover={{ y: -8 }}
            whileTap={{ scale: 0.95 }}
            className="relative bg-white rounded-xl border border-[#e1e3e5] p-6 cursor-pointer hover:shadow-lg transition-all duration-300"
            onClick={() => !option.comingSoon && handleOptionClick(option.id)}
          >
            {option.comingSoon && (
              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  Coming Soon
                </span>
              </div>
            )}
            
            <div className={`w-12 h-12 bg-gradient-to-br ${option.color} rounded-lg flex items-center justify-center text-white mb-6`}>
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={option.icon} />
              </svg>
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{option.title}</h3>
            <p className="text-gray-600">{option.description}</p>
            
            <div className="mt-6 flex items-center text-[#0284a5]">
              <span className="text-sm font-medium">Get started</span>
              <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </motion.div>
        ))}
      </div>
      
      <Modal
        show={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        title="Connect Your Wallet"
      >
        <div className="text-center py-6">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <img src="https://learn.rubix.net//images/logo.png" alt="XELL" className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Authentication Required</h3>
          <p className="text-gray-600 mb-6">Please connect your XELL wallet to add content to the marketplace</p>
          <button
            onClick={() => {
              login();
              setShowAuthModal(false);
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-[#0284a5] hover:bg-[#026d8a]"
          >
            Connect XELL Wallet
          </button>
        </div>
      </Modal>
    </div>
  );
}