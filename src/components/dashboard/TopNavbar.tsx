import { useState, useRef, useEffect, useCallback, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { Popover, Transition, Dialog } from '@headlessui/react';
import { useAuth } from '@/contexts/AuthContext';


const PROFILE_MENU_ITEMS = [
  { label: 'Home', href: '/dashboard/home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { label: 'My Downloads', href: '/dashboard/downloads', icon: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4' },
  { label: 'Transactions', href: '/dashboard/transactions', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
  { label: 'Become a data provider', href: '/dashboard/provider', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
  { label: 'Settings', href: '/dashboard/settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
];
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

const socialLinks = [
  {
    name: 'Instagram',
    href: 'https://instagram.com',
    icon: 'M12 2H8C4.69 2 2 4.69 2 8v8c0 3.31 2.69 6 6 6h8c3.31 0 6-2.69 6-6V8c0-3.31-2.69-6-6-6zm3.5 14.5h-9c-.55 0-1-.45-1-1v-9c0-.55.45-1 1-1h9c.55 0 1 .45 1 1v9c0 .55-.45 1-1 1z'
  },
  {
    name: 'Facebook',
    href: 'https://facebook.com',
    icon: 'M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z'
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com',
    icon: 'M19.615 3.184c-3.604-.246-11.631-.245-15.23 0C.488 3.45.029 5.804 0 12c.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0C23.512 20.55 23.971 18.196 24 12c-.029-6.185-.484-8.549-4.385-8.816zM9 16V8l8 4-8 4z'
  },
  {
    name: 'Pinterest',
    href: 'https://pinterest.com',
    icon: 'M12 2C6.477 2 2 6.477 2 12c0 4.237 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.6-.299-1.486c0-1.39.806-2.428 1.81-2.428.852 0 1.264.64 1.264 1.408 0 .858-.546 2.14-.828 3.33-.236.995.5 1.807 1.48 1.807 1.778 0 3.144-1.874 3.144-4.58 0-2.393-1.72-4.068-4.177-4.068-2.845 0-4.515 2.135-4.515 4.34 0 .859.331 1.781.745 2.281a.3.3 0 01.069.288l-.278 1.133c-.044.183-.145.223-.335.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.965-.525-2.291-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2z'
  },
  {
    name: 'X (Twitter)',
    href: 'https://x.com',
    icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z'
  }
];

const SEARCH_OPTIONS = [
  { id: 'all', label: 'All Items' },
  { id: 'models', label: 'AI Models' },
  { id: 'datasets', label: 'Datasets' },
  { id: 'providers', label: 'Providers' },
  { id: 'tools', label: 'Tools' }
];

export function TopNavbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(SEARCH_OPTIONS[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { isAuthenticated, login, logout } = useAuth();

  const focusSearchInput = useCallback((e: KeyboardEvent) => {
    if (
      document.activeElement?.tagName !== 'INPUT' &&
      document.activeElement?.tagName !== 'TEXTAREA' &&
      e.key === '/' &&
      !e.ctrlKey &&
      !e.metaKey
    ) {
      e.preventDefault();
      searchInputRef.current?.focus();
    }
  }, []);

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
              className="xl:hidden inline-flex items-center justify-center p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-background-tertiary focus:outline-none"
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
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => ( 
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-600 transition-colors hover:scale-110"
                >
                  <span className="sr-only">{social.name}</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
            
            <button
              onClick={login}
              className={`inline-flex items-center px-4 py-2 bg-[#0284a5] text-white text-sm font-medium rounded-lg hover:bg-[#026d8a] transition-colors ${
                isAuthenticated ? 'hidden' : ''
              }`}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
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
                              logout();
                              navigate('/');
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-error hover:bg-background-tertiary flex items-center space-x-2"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            <span>Log Out</span>
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
      <div>
        <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 hidden xl:block">
          <div className="flex justify-between items-center">
            <nav className="flex space-x-8">
              {Object.entries(CATEGORIES).map(([category, items]) => (
                <div key={category} className="relative group">
                  <div className="inline-flex items-center py-4 px-1 text-sm font-medium focus:outline-none rounded transition-colors text-text-secondary hover:text-text-primary cursor-pointer">
                    <span>{category}</span>
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
                            className="flex items-center rounded-lg px-4 py-2.5 transition duration-150 ease-in-out hover:bg-background-tertiary focus:outline-none w-full text-text-primary"
                          >
                            <div>
                              <p className="text-sm font-medium">
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
      </div>
      
      {/* Mobile menu */}
      <Transition.Root show={isMobileMenuOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-40 xl:hidden" onClose={setIsMobileMenuOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative max-w-xs w-full bg-[#191919] h-full">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-4">
                  <button
                    type="button"
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </Transition.Child>
              <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                <div className="flex-shrink-0 flex items-center px-4">
                  <img
                    src="https://trie.network/images/logo.png"
                    alt="TRIE AI"
                    className="h-8 w-auto cursor-pointer"
                    onClick={() => {
                      navigate('/');
                      setIsMobileMenuOpen(false);
                    }}
                  />
                </div>
                <nav className="mt-8 px-2 space-y-2">
                  {/* Search bar */}
                  <div className="px-2 mb-4">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                      <input
                        type="search"
                        placeholder="Search..."
                        className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-[#383838] text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-1 focus:ring-[#949494]"
                      />
                    </div>
                  </div>
                  
                  {/* Categories */}
                  {Object.entries(CATEGORIES).map(([category, items]) => (
                    <div
                      key={category}
                      className="space-y-1"
                    >
                      <div className="w-full flex items-center justify-between px-4 py-2 text-base font-medium text-text-primary hover:bg-background-tertiary rounded-lg transition-colors cursor-pointer">
                        <span>{category}</span>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                      <div className="pl-4 space-y-1">
                        {items.map((item) => (
                          <button
                            key={item}
                            className="w-full text-left px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-background-tertiary rounded-lg transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                  
                  {/* Upload Model Button */}
                  <div className="px-2 mt-6">
                    <button
                      onClick={() => {
                        navigate('/dashboard/upload');
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12" />
                      </svg>
                      Upload Model
                    </button>
                  </div>
                </nav>
              </div>
              
              {/* Mobile Footer */}
              <div className="border-t border-border p-4">
                <div className="flex justify-center space-x-4">
                  {socialLinks.slice(0, 4).map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-tertiary hover:text-text-secondary transition-colors"
                    >
                      <span className="sr-only">{social.name}</span>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d={social.icon} />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>
    </nav>
  );
}