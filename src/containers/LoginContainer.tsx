import { Fragment } from 'react';
import type { ProfileData, Preferences } from '@/types';
import { Modal } from '@/components/ui';
import { CreateAccountFlow, WalletModal } from '@/components/auth';
import { useModal } from '@/hooks/useModal';
import { useForm } from '@/hooks/useForm';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export function LoginContainer() {
  const navigate = useNavigate();
  const termsModal = useModal();
  const privacyModal = useModal();
  const walletModal = useModal();
  
  const { values: profileData, handleChange } = useForm<ProfileData>({
    name: '',
    username: '',
    email: '',
    phone: ''
  });
  
  const { values: preferences, handleChange: handlePrefsChange } = useForm<Preferences>({
    aiModels: false,
    dataScience: false,
    blockchain: false,
    automation: false,
    nlp: false,
    computerVision: false,
    robotics: false
  });

  const {
    termsAccepted,
    setTermsAccepted,
    isCreateAccount,
    setIsCreateAccount,
    isLoading,
    currentStep,
    handleNextStep
  } = useAuth();

  const handleCreateAccount = () => {
    setIsCreateAccount(true);
    walletModal.open();
  };

  const handleCloseWalletModal = () => {
    walletModal.close();
    setIsCreateAccount(false);
  };

  const handleContinueToCreateAccount = () => {
    walletModal.close();
    setIsCreateAccount(true);
  };

  return (
    <Fragment>
      <Modal
        show={termsModal.isOpen}
        onClose={termsModal.close}
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
        show={privacyModal.isOpen}
        onClose={privacyModal.close}
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
        show={walletModal.isOpen}
        onClose={handleCloseWalletModal}
        onContinue={handleContinueToCreateAccount}
        preventOutsideClick={true}
        title="Set Up Your XELL Wallet"
      >
        <WalletModal />
      </Modal>
      
      {isCreateAccount ? (
        <main className="flex min-h-screen flex-col items-center justify-between">
          <div className="flex-1 flex flex-col items-center justify-start max-w-[56rem] py-12 w-full px-4">
            <CreateAccountFlow
              currentStep={currentStep}
              termsAccepted={termsAccepted}
              onTermsAccepted={setTermsAccepted}
              onShowTerms={termsModal.open}
              onShowPrivacy={privacyModal.open}
              onLogin={() => setIsCreateAccount(false)}
              onNextStep={handleNextStep}
              isLoading={isLoading}
              profileData={profileData}
              onProfileChange={(data: ProfileData) => {
                handleChange('name', data.name);
                handleChange('username', data.username);
                handleChange('email', data.email);
                handleChange('phone', data.phone);
              }}
              preferences={preferences}
              onPreferencesChange={(prefs: Preferences) => {
                Object.entries(prefs).forEach(([key, value]) => {
                  handlePrefsChange(key as keyof Preferences, value);
                });
              }}
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
                  onClick={() => navigate('/dashboard')}
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
                  onClick={termsModal.open}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Terms & Conditions
                </button>
                <button
                  onClick={privacyModal.open}
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