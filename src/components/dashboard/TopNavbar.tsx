import { useState, useRef, useCallback, Fragment } from 'react';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Popover, Transition, Dialog } from '@headlessui/react';
import { Modal } from '@/components/ui';
import { useAuth } from '@/hooks';

const WALLET_OPTIONS = [
  {
    id: 'xell',
    name: 'XELL Wallet',
    description: 'Recommended wallet for TRIE AI Marketplace',
    icon: 'https://learn.rubix.net//images/logo.png'
  },
  {
    id: 'metamask',
    name: 'MetaMask',
    description: 'Connect with MetaMask wallet',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg'
  }
];

const DISCONNECT_WARNING = {
  title: 'Disconnect Wallet',
  message: 'Are you sure you want to disconnect your wallet? This action will remove access to your account and is irreversible.',
  confirmLabel: 'Yes, disconnect',
  cancelLabel: 'Cancel'
};

const CATEGORIES = {
  'Multi-model': [
    'Audio-Text-to-Text', 'Image-Text-to-Text', 'Visual Question Answering',
    'Document Question Answering', 'Video-Text-to-Text', 'Visual Document Retrieval',
    'Any-to-Any'
  ],
  'Computer Vision': [
    'Depth Estimation', 'Image Classification', 'Object Detection',
    'Image Segmentation', 'Text-to-Image', 'Image-to-Text',
    'Image-to-Image', 'Image-to-Video', 'Unconditional Image Generation',
    'Video Classification', 'Text-to-Video', 'Zero-Shot Image Classification',
    'Mask Generation', 'Zero-Shot Object Detection', 'Text-to-3D',
    'Image-to-3D', 'Image Feature Extraction', 'Keypoint Detection'
  ],
  'Natural Language Processing': [
    'Text Classification', 'Token Classification', 'Table Question Answering',
    'Question Answering', 'Zero-Shot Classification', 'Translation',
    'Summarization', 'Feature Extraction', 'Text Generation',
    'Text2Text Generation', 'Fill-Mask', 'Sentence Similarity'
  ],
  'Audio': [
    'Text-to-Speech', 'Text-to-Audio', 'Automatic Speech Recognition',
    'Audio-to-Audio', 'Audio Classification', 'Voice Activity Detection'
  ],
  'Tabular': [
    'Tabular Classification', 'Tabular Regression', 'Time Series Forecasting'
  ],
  'Reinforcement Learning': [
    'Reinforcement Learning',
    'Robotics'
  ],
  'Other': [
    'Graph Machine Learning'
  ]
};

const PROFILE_MENU_ITEMS = [
  { label: 'Home', href: '/dashboard/home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { label: 'My Downloads', href: '/dashboard/downloads', icon: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4' },
  { label: 'Transactions', href: '/dashboard/transactions', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
  { label: 'Upload Dataset', href: '/dashboard/upload', icon: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L9 8m4-4v12' },
  { label: 'Settings', href: '/dashboard/settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
];

const SEARCH_OPTIONS = [
  { id: 'models', label: 'AI Models' },
  { id: 'datasets', label: 'Datasets' },
  { id: 'infra-providers', label: 'Infra Providers' }
];

export function TopNavbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [showDisconnectModal, setShowDisconnectModal] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedOption, setSelectedOption] = useState(SEARCH_OPTIONS[0]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, connectWallet, logout, connectedWallet } = useAuth();


  const focusSearchInput = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && isSearchFocused) {
      searchInputRef.current?.blur();
      setIsSearchFocused(false);
      return;
    }

    if (e.key === '/' && !e.ctrlKey && !e.metaKey && !isSearchFocused) {
      e.preventDefault();
      searchInputRef.current?.focus();
      setIsSearchFocused(true);
    }
  }, [isSearchFocused]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', focusSearchInput);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', focusSearchInput);
    };
  }, [focusSearchInput]);

  return (
    <nav className="fixed top-0 right-0 left-0 z-20 bg-[#191919] border-b border-border">
      <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 relative">
          <div className="flex items-center">
            {/* Mobile menu button */}
            <button
              type="button"
              className="xl:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-[#222222] focus:outline-none"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <div className="flex items-center space-x-6">
              <img
                src="https://trie.network/images/logo.png"
                alt="TRIE AI"
                className="h-8 w-auto cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => navigate('/')}
              />
              <div className="hidden xl:flex items-center relative">
                <div className="relative">
                  <div className="relative flex items-center">
                    <div ref={dropdownRef} className="relative">
                      <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center space-x-2 px-3 h-10 rounded-l-lg bg-[#383838] border border-r-0 border-border text-sm text-text-secondary hover:bg-[#222222] transition-colors focus:outline-none focus:ring-0"
                      >
                        <span>{selectedOption.label}</span>
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      {isDropdownOpen && (
                        <div className="absolute top-full left-0 mt-1 w-48 bg-[#191919] rounded-lg shadow-popup border border-border py-1 z-50">
                          {SEARCH_OPTIONS.map((option) => (
                            <button
                              key={option.id}
                              onClick={() => {
                                setSelectedOption(option);
                                setIsDropdownOpen(false);
                              }}
                              className={`w-full text-left px-4 py-2 text-sm hover:bg-background-tertiary flex items-center space-x-2 focus:outline-none focus:ring-0 ${
                                selectedOption.id === option.id ? 'text-[#949494] bg-background-tertiary' : 'text-text-primary'
                              }`}
                            >
                              <span>{option.label}</span>
                              {selectedOption.id === option.id && (
                                <svg className="w-4 h-4 text-[#949494]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                      <input
                        type="search"
                        value={searchQuery}
                        ref={searchInputRef}
                        onFocus={() => setIsSearchFocused(true)}
                        onBlur={() => setIsSearchFocused(false)}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search AI models, datasets..."
                        className="block w-[480px] pl-10 pr-8 h-10 border border-border rounded-r-lg text-sm placeholder-text-tertiary focus:outline-none focus:ring-1 focus:ring-[#949494] bg-[#383838] text-text-primary transition-all"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-1 text-xs text-gray-400">
                        <kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded text-gray-500">/</kbd>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <button
              onClick={() => setShowWalletModal(true)}
              className={`inline-flex items-center px-4 py-2 bg-[#0284a5] text-white text-sm font-medium rounded-lg hover:bg-[#026d8a] transition-colors ${
                isAuthenticated ? 'hidden' : ''
              }`}
            >
              <img src="https://learn.rubix.net//images/logo.png" alt="XELL" className="w-5 h-5 mr-2" />
              Connect Wallet
            </button>
            
            {/* Profile Menu */}
            <div className={`relative ${!isAuthenticated ? 'hidden' : ''}`}>
              <Popover className="relative">
                {({ open }) => (
                  <>
                    <Popover.Button className="flex items-center space-x-2 p-1.5 rounded-full hover:bg-gray-100 transition-colors focus:outline-none">
                      <div className="w-8 h-8 bg-[#0284a5] rounded-full flex items-center justify-center text-white font-medium">
                        J
                      </div>
                    </Popover.Button>

                    <Transition
                      show={open}
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <Popover.Panel className="absolute right-0 mt-2 w-56 bg-[#191919] rounded-lg shadow-popup border border-border py-1 z-50">
                        {PROFILE_MENU_ITEMS.map((item) => (
                          <button
                            key={item.label}
                            onClick={() => navigate(item.href)}
                            className="w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-background-tertiary flex items-center space-x-2"
                          >
                            <svg className="w-5 h-5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                            </svg>
                            <span>{item.label}</span>
                          </button>
                        ))}
                        
                        <div className="border-t border-border mt-1">
                          <button
                            onClick={() => {
                              setShowDisconnectModal(true);
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-background-tertiary flex items-center space-x-2"
                          >
                            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            <span>Disconnect Wallet</span>
                          </button>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 hidden xl:block">
        <div className="flex justify-between items-center h-12">
          <nav className="flex space-x-8">
            {Object.entries(CATEGORIES).map(([category, items]) => (
              <div key={category} className="relative group">
                <div className="inline-flex items-center py-4 px-1 text-sm font-medium focus:outline-none rounded transition-colors text-text-secondary hover:text-text-primary cursor-pointer">
                  <span className={category === selectedCategory ? 'text-[#0284a5]' : ''}>{category}</span>
                  <svg
                    className="ml-2 h-4 w-4 transition-transform group-hover:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>

                <div className="absolute z-10 mt-1 w-screen max-w-xs px-2 invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
                  <div className="overflow-hidden rounded-lg shadow-popup border border-border">
                    <div className="relative grid gap-1 bg-[#191919] p-2">
                      {items.map((item) => (
                        <button
                          key={item}
                          onClick={() => {
                            // Determine which page to navigate to based on the category
                            let targetView = 'models';
                            if (item.toLowerCase().includes('data') || item.includes('folder')) {
                              targetView = 'datasets';
                            } else if (item.toLowerCase().includes('gpu') || item.toLowerCase().includes('cpu') || item.toLowerCase().includes('storage')) {
                              targetView = 'infra-providers';
                            }
                            navigate(`/dashboard/${targetView}?category=${encodeURIComponent(item)}`);
                            setSelectedCategory(category);
                          }}
                          className="flex items-center rounded-lg px-4 py-2.5 transition duration-150 ease-in-out hover:bg-background-tertiary focus:outline-none w-full text-text-primary"
                        >
                          <div>
                            <p className={`text-sm font-medium ${
                              location.search.includes(encodeURIComponent(item)) ? 'text-[#0284a5]' : ''
                            }`}>
                              {item}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </nav>
        </div>
      </div>
      
      {/* Disconnect Confirmation Modal */}
      <Modal
        show={showDisconnectModal}
        onClose={() => setShowDisconnectModal(false)}
        title={DISCONNECT_WARNING.title}
      >
        <div className="p-6">
          <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-red-100">
            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <p className="mb-8 text-center text-gray-600">{DISCONNECT_WARNING.message}</p>
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setShowDisconnectModal(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              {DISCONNECT_WARNING.cancelLabel}
            </button>
            <button
              onClick={() => {
                logout();
                setShowDisconnectModal(false);
                navigate('/');
              }}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
            >
              {DISCONNECT_WARNING.confirmLabel}
            </button>
          </div>
        </div>
      </Modal>

      {/* Wallet Selection Modal */}
      <Modal
        show={showWalletModal}
        onClose={() => setShowWalletModal(false)}
        title="Connect Wallet"
      >
        <div className="p-6">
          <div className="space-y-4">
            {WALLET_OPTIONS.map((wallet) => (
              <button
                key={wallet.id}
                onClick={async () => {
                  setShowWalletModal(false);
                  await connectWallet(wallet.id as 'xell' | 'metamask');
                }}
                className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-full p-2 shadow-sm">
                    <img src={wallet.icon} alt={wallet.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-sm font-medium text-gray-900">{wallet.name}</h3>
                    <p className="text-xs text-gray-500">{wallet.description}</p>
                  </div>
                </div>
                {connectedWallet?.type === wallet.id ? (
                  <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">Connected</span>
                ) : (
                  <span className="text-xs font-medium text-gray-600">Connect</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </Modal>

      {/* Mobile Menu */}
      <Transition show={isMobileMenuOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setIsMobileMenuOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-50 flex">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-300"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-300"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-[#191919] pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-white"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Close menu</span>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Mobile Navigation */}
                <div className="mt-2 px-4">
                  <div className="border-b border-border pb-6">
                    <div className="flow-root">
                      <div className="-my-2 divide-y divide-border">
                        {Object.entries(CATEGORIES).map(([category, items]) => (
                          <div key={category} className="py-6">
                            <h3 className="text-sm font-medium text-gray-400 mb-2">{category}</h3>
                            <ul className="space-y-1">
                              {items.map((item) => (
                                <li key={item}>
                                  <button
                                    onClick={() => {
                                      let targetView = 'models';
                                      if (item.toLowerCase().includes('data') || item.includes('folder')) {
                                        targetView = 'datasets';
                                      } else if (item.toLowerCase().includes('gpu') || item.toLowerCase().includes('cpu') || item.toLowerCase().includes('storage')) {
                                        targetView = 'infra-providers';
                                      }
                                      navigate(`/dashboard/${targetView}?category=${encodeURIComponent(item)}`);
                                      setIsMobileMenuOpen(false);
                                    }}
                                    className="block py-2 text-sm text-gray-300 hover:text-white w-full text-left"
                                  >
                                    {item}
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile Profile Menu */}
                {isAuthenticated && (
                  <div className="border-t border-border px-4 py-6">
                    <div className="flow-root">
                      <div className="-my-2">
                        {PROFILE_MENU_ITEMS.map((item) => (
                          <button
                            key={item.label}
                            onClick={() => {
                              navigate(item.href);
                              setIsMobileMenuOpen(false);
                            }}
                            className="flex items-center py-2 text-sm text-gray-300 hover:text-white w-full"
                          >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                            </svg>
                            {item.label}
                          </button>
                        ))}
                        <button
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            setShowDisconnectModal(true);
                          }}
                          className="flex items-center py-2 text-sm text-red-500 hover:text-red-400 w-full"
                        >
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          Disconnect Wallet
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </nav>
  );
}