import { motion } from 'framer-motion';
import { useState, Fragment } from 'react';
import { Modal } from './Modal';
import { Footer } from './Footer';
import { LoginFlow } from './LoginFlow';
import { CreateAccountFlow } from './CreateAccountFlow';

function LoginPage() {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [isCreateAccount, setIsCreateAccount] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [preferences, setPreferences] = useState({
    aiModels: false,
    dataScience: false,
    blockchain: false,
    automation: false,
    nlp: false,
    computerVision: false,
    robotics: false
  });

  const handleCreateAccount = () => {
    setIsCreateAccount(true);
    setShowWalletModal(true);
  }

  return (
    <Fragment>
      <Modal
        show={showTerms}
        onClose={() => setShowTerms(false)}
        title="Terms & Conditions"
      >
        <div className="space-y-4 text-gray-600">
          <h3 className="font-semibold text-gray-800">1. Acceptance of Terms</h3>
          <p>By accessing and using the TRIE AI Marketplace, you agree to be bound by these Terms and Conditions.</p>
          
          <h3 className="font-semibold text-gray-800">2. Blockchain Transactions</h3>
          <p>All transactions on our platform are recorded on the blockchain and are irreversible. Please review all transaction details carefully before confirming.</p>
          
          <h3 className="font-semibold text-gray-800">3. Smart Contracts</h3>
          <p>Our platform utilizes smart contracts for automated transactions. Users acknowledge the inherent risks of blockchain technology.</p>
          
          <h3 className="font-semibold text-gray-800">4. User Responsibilities</h3>
          <p>Users are responsible for maintaining the security of their wallet credentials and understanding the implications of blockchain transactions.</p>
          
          <h3 className="font-semibold text-gray-800">5. Service Modifications</h3>
          <p>We reserve the right to modify or discontinue any aspect of our service at any time.</p>
        </div>
      </Modal>
      
      <Modal
        show={showPrivacy}
        onClose={() => setShowPrivacy(false)}
        title="Privacy Policy"
      >
        <div className="space-y-4 text-gray-600">
          <h3 className="font-semibold text-gray-800">1. Data Collection</h3>
          <p>We collect and process only essential information required for blockchain transactions and platform functionality.</p>
          
          <h3 className="font-semibold text-gray-800">2. Blockchain Data</h3>
          <p>Transaction data stored on the blockchain is public and immutable by nature. Exercise caution with sensitive information.</p>
          
          <h3 className="font-semibold text-gray-800">3. Security Measures</h3>
          <p>We implement industry-standard security measures to protect your data, including SSL encryption and secure smart contracts.</p>
          
          <h3 className="font-semibold text-gray-800">4. Third-Party Services</h3>
          <p>Our platform integrates with blockchain networks and may utilize third-party services for enhanced functionality.</p>
          
          <h3 className="font-semibold text-gray-800">5. User Rights</h3>
          <p>Users have the right to access, correct, or delete their personal data, subject to blockchain limitations.</p>
        </div>
      </Modal>
      
      <Modal
        show={showWalletModal}
        onClose={() => setShowWalletModal(false)}
        title="Set Up Your XELL Wallet"
      >
        <div className="space-y-10 text-gray-600">
          {/* Info Banner */}
          <div className="bg-indigo-50 rounded-xl p-6 flex items-start space-x-4">
            <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-[#6366F1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-display text-lg text-gray-900 mb-2">Quick Setup Guide</h3>
              <p className="text-gray-600">Follow these simple steps to get started with XELL wallet and join the TRIE AI marketplace.</p>
            </div>
          </div>

          {/* Installation Steps */}
          <div className="space-y-6 px-1">
            <h3 className="font-display text-lg text-gray-900 flex items-center space-x-2">
              <span className="w-8 h-8 bg-[#6366F1] bg-opacity-10 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-[#6366F1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </span>
              <span>Installation Steps</span>
            </h3>
            <ol className="space-y-6">
              {[
                "Visit the XELL wallet extension page",
                'Click "Add to Browser" or "Install Extension"',
                "Follow the browser's installation prompts",
                "Return to this page and refresh"
              ].map((step, index) => (
                <li key={index} className="flex items-center space-x-4 group">
                  <span className="flex-shrink-0 w-10 h-10 bg-indigo-50 text-[#6366F1] rounded-xl flex items-center justify-center font-medium group-hover:bg-[#6366F1] group-hover:text-white transition-colors">
                    {index + 1}
                  </span>
                  <span className="flex-1 text-gray-700 font-medium">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Download Button */}
          <div className="flex justify-center py-2">
            <a
              href="https://xell-wallet.example.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-3 bg-[#6366F1] text-white px-10 py-4 rounded-xl hover:bg-[#5558E6] transition-all duration-200 hover:shadow-lg hover:shadow-indigo-100 transform hover:-translate-y-0.5"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span className="font-medium tracking-wide">Download XELL Wallet</span>
            </a>
          </div>

          {/* Features Section */}
          <div className="p-6 bg-gradient-to-b from-gray-50 to-white rounded-xl border border-gray-100">
            <h4 className="font-display text-lg text-gray-900 mb-6 flex items-center space-x-2">
              <span className="w-8 h-8 bg-[#6366F1] bg-opacity-10 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-[#6366F1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span>What You'll Get</span>
            </h4>
            <ul className="space-y-5">
              {[
                { title: "Create a secure wallet", desc: "Set up your digital wallet with military-grade encryption" },
                { title: "Connect to TRIE AI", desc: "Seamlessly integrate with our marketplace" },
                { title: "Explore AI Models", desc: "Access our curated collection of AI solutions" }
              ].map((item, index) => (
                <li key={index} className="flex items-start space-x-4 group">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-white border-2 border-indigo-100 flex items-center justify-center group-hover:border-[#6366F1] transition-colors">
                    <div className="w-2 h-2 bg-[#6366F1] rounded-lg group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 mb-1">{item.title}</p>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Modal>
      
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1]
        }}
        className="flex min-h-screen flex-col items-center justify-between"
      >
        {/* Top Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ 
            duration: 0.8,
            ease: "easeOut"
          }}
          className={`flex-1 flex flex-col items-center ${isCreateAccount ? 'justify-start max-w-[56rem] py-12' : 'justify-center max-w-md'} w-full px-4`}
        >
          {!isCreateAccount && <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="w-[140px] sm:w-[160px] md:w-[180px] mb-6 sm:mb-8"
          >
            <img
              src="https://trie.network/images/logo.png"
              alt="TRIE AI Logo"
              className="w-full h-auto object-contain"
            />
          </motion.div>}
        
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-title mb-6 sm:mb-8 text-center px-4"
          >
            {!isCreateAccount && 'Log in to TRIE AI Marketplace'}
          </motion.h1>
        
          {/* Login Options */}
          {isCreateAccount ? (
            <CreateAccountFlow
              currentStep={currentStep}
              termsAccepted={termsAccepted}
              onTermsAccepted={setTermsAccepted}
              onShowTerms={() => setShowTerms(true)}
              onShowPrivacy={() => setShowPrivacy(true)}
              onLogin={() => setIsCreateAccount(false)}
              onNextStep={() => setCurrentStep(currentStep + 1)}
              profileData={profileData}
              onProfileChange={setProfileData}
              preferences={preferences}
              onPreferencesChange={setPreferences}
            />
          ) : (
            <LoginFlow
              onShowTerms={() => setShowTerms(true)}
              onShowPrivacy={() => setShowPrivacy(true)}
              onCreateAccount={handleCreateAccount}
            />
          )}
        </motion.div>
        <Footer />
      </motion.main>
    </Fragment>
  );
}

export default LoginPage;