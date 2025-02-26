import { motion } from 'framer-motion';

interface LoginFlowProps {
  onShowTerms: () => void;
  onShowPrivacy: () => void;
  onCreateAccount: () => void;
}

export function LoginFlow({ onShowTerms, onShowPrivacy, onCreateAccount }: LoginFlowProps) {
  return (
    <div className="w-full max-w-sm mx-auto px-4 sm:px-0">
      <motion.button 
        whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
        whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
        className="w-full bg-[#6366F1] text-white py-2.5 sm:py-3 px-4 rounded-md flex items-center justify-center hover:bg-[#5558E6] transition-colors"
      >
        <div className="flex items-center space-x-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span>Connect Wallet</span>
        </div>
      </motion.button>

      <div className="mt-4 text-center">
        <span className="text-gray-600">Don't have an account?</span>{' '}
        <button
          type="button"
          className="text-[#6366F1] hover:underline font-medium"
          onClick={onCreateAccount}
        >
          Create one now
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.6,
          ease: "easeOut",
          delay: 0.2
        }}
        className="mt-8 space-y-6"
      >
        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
            <span>By continuing, you agree to our{' '}
              <button 
                type="button" 
                onClick={onShowTerms} 
                className="text-[#6366F1] hover:underline font-medium"
              >
                Terms
              </button>
              {' '}and{' '}
              <button 
                type="button" 
                onClick={onShowPrivacy} 
                className="text-[#6366F1] hover:underline font-medium"
              >
                Privacy Policy
              </button>
            </span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>SSL secured connection</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <svg className="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>Blockchain verified transactions</span>
          </div>
        </div>

        <div className="flex justify-center space-x-4 text-sm">
          <button className="text-gray-500 hover:text-[#6366F1]">FAQs</button>
          <span className="text-gray-300">|</span>
          <button className="text-gray-500 hover:text-[#6366F1]">Support</button>
          <span className="text-gray-300">|</span>
          <button className="text-gray-500 hover:text-[#6366F1]">Contact</button>
        </div>
      </motion.div>
    </div>
  );
}