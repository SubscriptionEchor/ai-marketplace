import { TopNavbar } from './TopNavbar';
import { TopProviders } from './TopProviders';
import { useNavigate, useLocation } from 'react-router-dom';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const NAVIGATION_OPTIONS = [
  { id: 'all', label: 'All Items', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
  { id: 'models', label: 'AI Models', icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  { id: 'datasets', label: 'Data Sets', icon: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4' },
  { id: 'providers', label: 'Data Providers', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
  { id: 'tools', label: 'Tools', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' }
];

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname.split('/').pop() || 'all';

  return (
    <div className="h-screen bg-white overflow-hidden">
      <div className="h-full flex flex-col">
        <TopNavbar />
        
        <main className="flex-1 pt-[120px] relative bg-white overflow-y-auto flex justify-center">
          <div className="w-full max-w-[1504px] px-6 lg:px-12 pt-8">
            <div className="flex gap-6">
              {/* Left Sidebar - Navigation */}
              <div className="w-[280px] hidden lg:block flex-shrink-0 fixed left-[max(0px,calc(50%-752px))] top-[120px] bottom-0 overflow-y-auto border-r border-gray-100 pt-8 bg-white">
                <div className="space-y-1 px-8">
                  {NAVIGATION_OPTIONS.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => navigate(`/dashboard/${option.id}`)}
                      className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                        currentPath === option.id
                          ? 'text-[#0284a5] bg-[#0284a5]/10'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={option.icon} />
                      </svg>
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Main Content Area */}
              <div className="flex-1 min-w-0 lg:ml-[296px] lg:mr-[376px] overflow-y-auto scrollbar-hide">
                {children}
              </div>

              {/* Right Sidebar */}
              <div className="w-[340px] hidden xl:block flex-shrink-0 fixed right-[max(0px,calc(50%-752px))] top-[120px] bottom-0 overflow-y-auto border-l border-gray-100 pt-8 bg-white">
                <div className="px-8 h-full">
                  <TopProviders />
                  <div className="mt-8 pt-8 border-t border-gray-100">
                    <nav className="flex flex-col space-y-4">
                      <div className="flex flex-wrap gap-x-6 gap-y-2">
                        <a href="/about" className="text-sm text-gray-500 hover:text-gray-700">About</a>
                        <a href="/accessibility" className="text-sm text-gray-500 hover:text-gray-700">Accessibility</a>
                        <a href="/help" className="text-sm text-gray-500 hover:text-gray-700">Help Center</a>
                        <a href="/privacy" className="text-sm text-gray-500 hover:text-gray-700">Privacy Policy</a>
                        <a href="/terms" className="text-sm text-gray-500 hover:text-gray-700">Terms of Service</a>
                      </div>
                      <div className="flex items-center space-x-2 mt-2">
                        <img
                          src="https://trie.network/images/logo.png"
                          alt="Trie Logo"
                          className="h-4 w-auto object-contain"
                          onError={(e) => {
                            e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIgMkM2LjQ4IDIgMiA2LjQ4IDIgMTJzNC40OCAxMCAxMCAxMCAxMC00LjQ4IDEwLTEwUzE3LjUyIDIgMTIgMnoiIGZpbGw9IiM2MzY2RjEiLz48L3N2Zz4=';
                          }}
                        />
                        <span className="text-sm text-gray-500">Trie Corporation © 2024</span>
                      </div>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}