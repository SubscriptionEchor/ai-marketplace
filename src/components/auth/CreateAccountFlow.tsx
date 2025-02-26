import { motion } from 'framer-motion';
import type { ProfileData, Preferences } from '../../lib/types';
import { PREFERENCES_OPTIONS } from '../../lib/constants';

interface CreateAccountFlowProps {
  currentStep: number;
  termsAccepted: boolean;
  onTermsAccepted: (accepted: boolean) => void;
  onShowTerms: () => void;
  onShowPrivacy: () => void;
  onLogin: () => void;
  onNextStep: () => void;
  isLoading?: boolean;
  profileData: ProfileData;
  onProfileChange: (data: ProfileData) => void;
  preferences: Preferences;
  onPreferencesChange: (prefs: Preferences) => void;
}

export function CreateAccountFlow({
  currentStep,
  termsAccepted,
  onTermsAccepted,
  onShowTerms,
  onShowPrivacy,
  onLogin,
  onNextStep,
  isLoading = false,
  profileData,
  onProfileChange,
  preferences,
  onPreferencesChange,
}: CreateAccountFlowProps) {
  return (
    <div className="flex flex-col lg:flex-row w-full max-w-[56rem] mx-auto gap-6 lg:gap-12 p-4 lg:p-0 relative">
      {/* Left Side - Steps Navigation */}
      <div className="w-full lg:w-[360px] pt-0 lg:fixed lg:top-24">
        {/* Logo */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1]
          }}
          className="mb-6 lg:mb-8"
        >
          <img
            src="https://trie.network/images/logo.png"
            alt="TRIE AI Logo"
            className="w-[120px] h-auto lg:w-[140px] object-contain"
          />
        </motion.div>

        <div className="mb-6 lg:mb-8">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.6,
              ease: "easeOut"
            }}
            className="text-title text-gray-900 mb-3 lg:mb-4"
          >
            Welcome to TRIE AI
          </motion.h2>
          <p className="text-body-sm text-gray-600">
            Follow these steps to create your account on the TRIE AI Marketplace:
          </p>
        </div>
        
        <div className="space-y-5">
          <div className={`flex items-center ${currentStep === 1 ? 'text-[#6366F1]' : 'text-gray-500'}`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm mr-3 
              ${currentStep > 1 ? 'bg-green-500 text-white' : 
                currentStep === 1 ? 'bg-[#6366F1] text-white' : 
                'bg-gray-200 text-gray-600'}`}
            >
              {currentStep > 1 ? '✓' : '1'}
            </div>
            <span className="text-body-sm font-medium">Connect Wallet</span>
          </div>
          
          <div className="w-px h-5 bg-gray-200 ml-3" />
          
          <div className={`flex items-center ${currentStep === 2 ? 'text-[#6366F1]' : 'text-gray-500'}`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm mr-3
              ${currentStep > 2 ? 'bg-green-500 text-white' : 
                currentStep === 2 ? 'bg-[#6366F1] text-white' : 
                'bg-gray-200 text-gray-600'}`}
            >
              {currentStep > 2 ? '✓' : '2'}
            </div>
            <span className="font-medium text-sm">Setup Profile</span>
          </div>
          
          <div className="w-px h-5 bg-gray-200 ml-3" />
          
          <div className={`flex items-center ${currentStep === 3 ? 'text-[#6366F1]' : 'text-gray-500'}`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm mr-3
              ${currentStep > 3 ? 'bg-green-500 text-white' : 
                currentStep === 3 ? 'bg-[#6366F1] text-white' : 
                'bg-gray-200 text-gray-600'}`}
            >
              {currentStep > 3 ? '✓' : '3'}
            </div>
            <span className="font-medium text-sm">Choose Preferences</span>
          </div>
        </div>
      </div>

      {/* Right Side - Content */}
      <div className="flex-1 bg-white rounded-lg p-6 lg:p-10 border border-gray-200 mt-6 lg:mt-24 lg:ml-[400px] min-h-fit">
        {currentStep === 1 && (
          <div className="min-h-[300px]">
            <h2 className="text-subtitle text-gray-900 mb-4 lg:mb-6">Connect Your Wallet</h2>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5,
                ease: "easeOut"
              }}
              className="mb-6 lg:mb-8 p-4 lg:p-8 bg-gray-50 rounded-lg"
            >
              <label className="flex items-start space-x-3 cursor-pointer group">
                <div className="relative flex items-start">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => onTermsAccepted(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-[#6366F1] focus:ring-[#6366F1] cursor-pointer"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-body-sm font-medium text-gray-900 mb-1">
                    Accept Terms & Conditions
                  </p>
                  <p className="text-body-sm text-gray-600">
                    I agree to the{' '}
                    <button 
                      type="button" 
                      onClick={onShowTerms} 
                      className="text-[#6366F1] hover:underline font-medium"
                    >
                      Terms & Conditions
                    </button>
                    {' '}and{' '}
                    <button 
                      type="button" 
                      onClick={onShowPrivacy} 
                      className="text-[#6366F1] hover:underline font-medium"
                    >
                      Privacy Policy
                    </button>
                  </p>
                </div>
              </label>
              {!termsAccepted && (
                <p className="text-xs text-gray-500 mt-2 pl-7">
                  Please accept the terms to continue
                </p>
              )}
            </motion.div>

            <motion.button 
              whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
              className={`w-full bg-[#6366F1] text-white py-2.5 px-4 rounded-md flex items-center justify-center transition-colors ${
                !termsAccepted ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#5558E6]'
              }`}
              disabled={!termsAccepted}
              onClick={onNextStep}
            >
              Connect
            </motion.button>
          </div>
        )}

        {currentStep === 2 && (
          <div className="min-h-[300px]">
            <h3 className="text-subtitle text-gray-900 mb-4 lg:mb-6">Setup Your Profile</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-body-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => onProfileChange({ ...profileData, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => onProfileChange({ ...profileData, email: e.target.value })}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number (Optional)</label>
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => onProfileChange({ ...profileData, phone: e.target.value })}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent"
                  placeholder="Enter your phone number"
                />
              </div>
              <div className="pt-4">
                <button 
                  className="w-full bg-[#6366F1] text-white py-2.5 px-4 rounded-md hover:bg-[#5558E6] transition-colors"
                  onClick={onNextStep}
                >
                  Continue to Preferences
                </button>
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="min-h-[300px]">
            <div className="text-center mb-8">
              <h3 className="text-subtitle text-gray-900">Choose Your Interests</h3>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-8">
              {PREFERENCES_OPTIONS.map(({ id, title, icon }) => (
                <motion.div
                  key={id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative p-3 rounded-lg border transition-all cursor-pointer flex items-center justify-between
                    ${preferences[id as keyof typeof preferences]
                      ? 'border-[#6366F1] bg-indigo-50'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  onClick={() => onPreferencesChange({
                    ...preferences,
                    [id]: !preferences[id as keyof typeof preferences]
                  })}
                >
                  <div className="flex items-center space-x-2">
                    <div className={`p-2 rounded-md transition-colors
                      ${preferences[id as keyof typeof preferences]
                        ? 'bg-[#6366F1]/10 text-[#6366F1]'
                        : 'bg-gray-100/50 text-gray-500'
                      }`}
                    >
                      <div className="w-5 h-5">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={icon} />
                        </svg>
                      </div>
                    </div>
                    <span className="text-body-sm font-medium text-gray-900">{title}</span>
                  </div>
                  <div className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors
                      ${preferences[id as keyof typeof preferences]
                        ? 'border-[#6366F1] bg-[#6366F1]'
                        : 'border-gray-300'
                      }`}
                  >
                      {preferences[id as keyof typeof preferences] && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="flex justify-center">
              <button 
                className={`w-full bg-[#6366F1] text-white py-2.5 px-4 rounded-md hover:bg-[#5558E6] transition-colors flex items-center justify-center ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
                onClick={onNextStep}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </>
                ) : (
                  'Create Account'
                )}
              </button>
            </div>
          </div>
        )}

        <div className="mt-4 lg:mt-6 text-center pb-4">
          <span className="text-gray-600">Already have an account?</span>{' '}
          <button
            type="button"
            className="text-[#6366F1] hover:underline font-medium"
            onClick={onLogin}
          >
            Log in now
          </button>
        </div>
      </div>
    </div>
  );
}