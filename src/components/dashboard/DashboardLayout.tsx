import { TopNavbar } from './TopNavbar';
import { TopProviders } from './TopProviders';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const NAVIGATION_ITEMS = [
  { label: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { label: 'Notifications', icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' },
  { label: 'Lists', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
  { label: 'Stories', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' },
  { label: 'Write', icon: 'M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z' }
];

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="h-screen bg-white overflow-hidden">
      <div className="h-full flex flex-col">
        <TopNavbar />
        
        <main className="flex-1 pt-[120px] relative bg-white">
          <div className="max-w-[1504px] mx-auto px-6 lg:px-12 pt-8">
            <div className="flex gap-6">
              {/* Left Sidebar - Navigation */}
              <div className="w-[280px] hidden lg:block flex-shrink-0 fixed left-[max(0px,calc(50%-752px))] top-[120px] bottom-0 overflow-y-auto border-r border-gray-100 pt-8 bg-white">
                <div className="space-y-4 px-8 h-full">
                  {NAVIGATION_ITEMS.map((item) => (
                    <button
                      key={item.label}
                      className="flex items-center w-full px-5 py-3.5 text-gray-500 hover:text-gray-900 rounded-xl hover:bg-gray-50 hover:shadow-sm transition-all duration-200 group"
                    >
                      <svg className="w-5 h-5 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={item.icon} />
                      </svg>
                      <span className="text-sm font-medium">
                        {item.label}
                      </span>
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