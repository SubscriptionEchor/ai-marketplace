import { useState, useRef, useCallback, Fragment, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Popover, Transition, Dialog } from '@headlessui/react';
import { MODEL_CATEGORIES } from '@/constants/categories';
// import { useAuth } from '@/hooks';

interface ModalProps {
  show: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

function Modal({ show, onClose, title, children }: ModalProps) {
  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
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

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {title}
                </Dialog.Title>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // const connectWallet = useCallback(async (type: 'xell') => {
  //   setIsAuthenticated(true);
  //   return true;
  // }, []);

  const logout = useCallback(async () => {
    setIsAuthenticated(false);
    return true;
  }, []);

  return {
    isAuthenticated,
    // connectWallet,
    logout
  };
}

const MAIN_NAVIGATION = [
  { 
    id: 'all',
    label: 'Home',
    icon: 'M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 018.25 20.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z'
  },
  { 
    id: 'models', 
    label: 'AI Models', 
    icon: 'M9 3.75H6.912a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H15M2.25 15h19.5m-16.5 0h13.5M9 3.75l2.25 4.5m0 0L15 3.75M11.25 8.25h4.5'
  },
  { 
    id: 'datasets', 
    label: 'Data Sets', 
    icon: 'M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125'
  },
  { 
    id: 'infra-providers', 
    label: 'Infra Providers', 
    icon: 'M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z'
  }
];

const UPLOAD_NAVIGATION = [
  {
    id: 'upload',
    label: 'Upload Content',
    icon: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L9 8m4-4v12'
  }
];

const CREATOR_NAVIGATION = [
  {
    id: 'my-uploads',
    label: 'My Uploads',
    icon: 'M7 4V20M7 4L3 8M7 4L11 8M17 4V20M17 4L13 8M17 4L21 8'
  },
  {
    id: 'earnings',
    label: 'Earnings',
    icon: 'M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
  },
  {
    id: 'withdraw',
    label: 'Withdraw',
    icon: 'M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z'
  }
];

const DISCONNECT_WARNING = {
  title: 'Disconnect Wallet',
  message: 'Are you sure you want to disconnect your wallet? This action will remove access to your account and is irreversible.',
  confirmLabel: 'Yes, disconnect',
  cancelLabel: 'Cancel'
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
  const [showDisconnectModal, setShowDisconnectModal] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedOption, setSelectedOption] = useState(SEARCH_OPTIONS[0]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  // Parse the category query parameter for exact comparison
  const activeCategory = new URLSearchParams(location.search).get('category');

  useEffect(() => {
    let connect = localStorage.getItem('connect') as string;
    connect = JSON.parse(connect);
    if (connect) {
      setIsWalletConnected(true);
    }
  }, []);

  const focusSearchInput = useCallback(
    (e: KeyboardEvent) => {
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
    },
    [isSearchFocused]
  );

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

  const onHandleConnectWallet = () => {
    localStorage.setItem('connect', JSON.stringify(true));
    setIsWalletConnected(true);
  };

  return (
    <nav className="fixed top-0 right-0 left-0 z-20 bg-[#191919] border-b border-border">
      <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 relative">
          <div className="flex items-center">
            {/* Mobile menu button */}
            <button
              type="button"
              className="xl:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-[#222222] focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <div className="flex items-center space-x-6">
              <img
                src="/trie-nav-logo@4x.png"
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
            {/* Mobile Profile Button */}
            {isWalletConnected && (
              <div className="relative xl:hidden">
                <Popover>
                  {({ open }) => (
                    <>
                      <Popover.Button className="flex items-center space-x-2 p-1.5 rounded-full hover:bg-[#222222] transition-colors focus:outline-none">
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
                              onClick={() => {
                                navigate(item.href);
                                setIsMobileMenuOpen(false);
                              }} 
                              className="w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-background-tertiary flex items-center gap-2 text-white"
                            >
                              <svg className="w-5 h-5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={item.icon} />
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
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
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
            )}

            {!isWalletConnected ? (
              <button
                onClick={() => onHandleConnectWallet()}
                className={`inline-flex items-center px-4 py-2 bg-[#0284a5] text-white text-sm font-medium rounded-lg hover:bg-[#026d8a] transition-colors ${
                  isAuthenticated ? 'hidden' : ''
                }`}
              >
                <img src="https://learn.rubix.net//images/logo.png" alt="XELL" className="w-5 h-5 mr-2" />
                Connect Wallet
              </button>
            ) : null}
            
            {/* Profile Menu */}
            {isWalletConnected ? (
              <div className={`relative hidden xl:block ${!isAuthenticated ? 'hidden' : ''}`}>
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
                              className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-[#333333] flex items-center space-x-2"
                            >
                              <svg className="w-5 h-5 text-gray-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={item.icon} />
                              </svg>
                              <span>{item.label}</span>
                            </button>
                          ))}
                          <div className="border-t border-border mt-1">
                            <button
                              onClick={() => {
                                logout();
                                setShowDisconnectModal(false);
                                localStorage.setItem('connect', JSON.stringify(false));
                                setIsWalletConnected(false);
                                navigate('/');
                              }}
                              className="w-full text-left px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-[#333333] flex items-center space-x-2"
                            >
                              <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
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
            ) : null}
          </div>
        </div>
      </div>

      {/* Desktop Categories Navigation with Dropdowns */}
      <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 hidden xl:block">
        <div className="flex justify-between items-center h-12">
          <nav className="flex space-x-8">
            {Object.entries(MODEL_CATEGORIES).map(([category, items]) => (
              <div key={category} className="relative group">
                <div className="inline-flex items-center py-4 px-1 text-sm font-medium focus:outline-none rounded transition-colors text-text-secondary hover:text-text-primary cursor-pointer">
                  <span className={category === selectedCategory ? 'text-[#0284a5]' : ''}>{category}</span>
                  <svg className="ml-2 h-4 w-4 transition-transform group-hover:rotate-180 text-gray-400 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <div className="absolute z-10 mt-1 w-screen max-w-xs px-2 invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 max-h-[calc(100vh-4rem)] overflow-y-auto">
                  <div className="overflow-hidden rounded-lg shadow-popup border border-border">
                    <div className="relative grid gap-1 bg-[#191919] p-2 divide-y divide-border">
                      {items.map((item) => (
                        <button
                          key={item}
                          onClick={() => {
                            let targetView = 'models';
                            if (item.toLowerCase().includes('data') || item.includes('folder')) {
                              targetView = 'datasets';
                            } else if (item.toLowerCase().includes('gpu') || item.toLowerCase().includes('cpu') || item.toLowerCase().includes('storage')) {
                              targetView = 'infra-providers';
                            }
                            navigate(`/dashboard/${targetView}?category=${encodeURIComponent(item)}`);
                            setSelectedCategory(category);
                          }}
                          className="flex items-center rounded-lg px-4 py-2.5 transition duration-150 ease-in-out hover:bg-[#333333] focus:outline-none w-full text-gray-300 hover:text-white"
                        >
                          <div>
                            <p className={`text-sm font-medium ${activeCategory === item ? 'text-[#0284a5]' : ''}`}>
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
                localStorage.setItem('connect', JSON.stringify(false));
                setIsWalletConnected(false);
                navigate('/');
              }}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
            >
              {DISCONNECT_WARNING.confirmLabel}
            </button>
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
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto scrollbar-hide bg-[#191919] pb-12 shadow-xl">
                <div className="flex items-center justify-between px-4 py-4 border-b border-border">
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
                  {isWalletConnected && (
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-[#0284a5] rounded-full flex items-center justify-center text-white font-medium">
                        J
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-white">John Doe</span>
                        <span className="text-xs text-gray-400">Connected with XELL</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="px-4 py-6">
                  <div className="flow-root">
                    <div className="space-y-8">
                      {/* Main Navigation */}
                      <div>
                        <h3 className="px-3 text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">Main</h3>
                        <div className="space-y-1">
                          {MAIN_NAVIGATION.map((item) => (
                            <button
                              key={item.id}
                              onClick={() => {
                                navigate(`/dashboard/${item.id}`);
                                setIsMobileMenuOpen(false);
                              }}
                              className="flex items-center w-full px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-[#222222] rounded-lg transition-colors"
                            >
                              <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={item.icon} />
                              </svg>
                              {item.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Additional Navigation */}
                      <div>
                        <h3 className="px-3 text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">Additional</h3>
                        <div className="space-y-1">
                          {UPLOAD_NAVIGATION.map((item) => (
                            <button
                              key={item.id}
                              onClick={() => {
                                navigate(`/dashboard/${item.id}`);
                                setIsMobileMenuOpen(false);
                              }}
                              className="flex items-center w-full px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-[#222222] rounded-lg transition-colors"
                            >
                              <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={item.icon} />
                              </svg>
                              {item.label}
                            </button>
                          ))}

                          {/* Creator Navigation */}
                          {isAuthenticated && (
                            <div className="pl-6 mt-2 space-y-1">
                              {CREATOR_NAVIGATION.map((item) => (
                                <button
                                  key={item.id}
                                  onClick={() => {
                                    navigate(`/dashboard/${item.id}`);
                                    setIsMobileMenuOpen(false);
                                  }}
                                  className="flex items-center w-full px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-[#222222] rounded-lg transition-colors"
                                >
                                  <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={item.icon} />
                                  </svg>
                                  {item.label}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </nav>
  );
}