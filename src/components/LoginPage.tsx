import { useState, Fragment, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from './Modal';
import { CreateAccountFlow } from './CreateAccountFlow';

function LoginPage() {
  const navigate = useNavigate();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [isCreateAccount, setIsCreateAccount] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
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
  };

  const handleContinueToCreateAccount = () => {
    setShowWalletModal(false);
    setIsCreateAccount(true);
  };

  const handleNextStep = useCallback(async () => {
    if (currentStep === 3) {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      navigate('/dashboard');
    } else {
      setCurrentStep(currentStep + 1);
    }
  }, [currentStep, navigate]);

  return (
    <Fragment>
      <Modal
        show={showTerms}
        onClose={() => setShowTerms(false)}
        preventOutsideClick={true}
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
        preventOutsideClick={true}
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
        onContinue={handleContinueToCreateAccount}
        preventOutsideClick={true}
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
      
      {isCreateAccount ? (
        <main className="flex min-h-screen flex-col items-center justify-between">
          <div className="flex-1 flex flex-col items-center justify-start max-w-[56rem] py-12 w-full px-4">
            <CreateAccountFlow
              currentStep={currentStep}
              termsAccepted={termsAccepted}
              onTermsAccepted={setTermsAccepted}
              onShowTerms={() => setShowTerms(true)}
              onShowPrivacy={() => setShowPrivacy(true)}
              onLogin={() => setIsCreateAccount(false)}
              onNextStep={handleNextStep}
              isLoading={isLoading}
              profileData={profileData}
              onProfileChange={setProfileData}
              preferences={preferences}
              onPreferencesChange={setPreferences}
            />
          </div>
        </main>
      ) : (
        <main className="flex min-h-screen">
          {/* Left Side - Image */}
          <div className="hidden lg:block w-[55%] relative">
            <img
              src="https://cdn.midjourney.com/d8fdb597-0d88-467d-8637-8022fb31dc1e/0_0.png"
              alt="AI Illustration"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full lg:w-[45%] flex flex-col justify-center px-8 lg:px-24">
            <div className="max-w-[360px] w-full mx-auto space-y-12">
              {/* Logo */}
              <div>
                <img
                  src="https://trie.network/images/logo.png"
                  alt="TRIE AI Logo"
                  className="h-7"
                />
              </div>

              {/* Title */}
              <div className="space-y-2">
                <h1 className="text-2xl font-semibold text-gray-900">
                  Log in to TRIE AI
                </h1>
                <p className="text-sm text-gray-500">
                  Connect your wallet to access the marketplace
                </p>
              </div>

              {/* Connect Wallet Button */}
              <div>
                <button
                  onClick={() => setShowWalletModal(true)}
                  className="w-full bg-[#6366F1] text-white py-3.5 px-4 rounded-lg font-medium hover:bg-[#5558E6] transition-colors flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>Connect Wallet</span>
                </button>
              </div>

              {/* Create Account Link */}
              <div className="text-center">
                <span className="text-gray-600">Don't have an account?</span>{' '}
                <button
                  onClick={handleCreateAccount}
                  className="text-[#6366F1] hover:text-[#5558E6] font-medium"
                >
                  Create one now
                </button>
              </div>

              {/* Footer Links */}
              <div className="flex justify-between items-center text-sm pt-4">
                <button
                  onClick={() => setShowTerms(true)}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Terms & Conditions
                </button>
                <button
                  onClick={() => setShowPrivacy(true)}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Privacy Policy
                </button>
              </div>
            </div>
          </div>
        </main>
      )}
    </Fragment>
  );
}

export default LoginPage;