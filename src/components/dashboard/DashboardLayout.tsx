import { TopNavbar } from './TopNavbar';

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

const TOPICS = [
  'Staff Picks',
  'Following',
  'Technology',
  'Money',
  'Business',
  'Productivity',
  'Psychology',
  'Mindfulness',
  'Art',
  'Science'
];
export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <div className="flex-1 flex flex-col">
        <TopNavbar />
        
        <main className="flex-1 pt-[120px] relative">
          <div className="max-w-[1504px] mx-auto px-4 lg:px-8 pt-6">
            <div className="flex gap-6">
              {/* Left Sidebar - Navigation */}
              <div className="w-[240px] hidden lg:block flex-shrink-0 fixed left-[max(0px,calc(50%-752px))] top-[120px] h-[calc(100vh-120px)] overflow-y-auto border-r border-gray-200 pt-6">
                <div className="space-y-6 pr-6 h-full">
                  {NAVIGATION_ITEMS.map((item) => (
                    <button
                      key={item.label}
                      className="flex items-center w-full px-4 py-3 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors group"
                    >
                      <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              <div className="flex-1 min-w-0 lg:ml-[256px] lg:mr-[336px] overflow-y-auto scrollbar-hide">
                {children}
              </div>

              {/* Right Sidebar */}
              <div className="w-[320px] hidden xl:block flex-shrink-0 fixed right-[max(0px,calc(50%-752px))] top-[120px] h-[calc(100vh-120px)] overflow-y-auto border-l border-gray-200 pt-6">
                <div className="pl-6 h-full">
                  <div className="mb-8">
                    <h3 className="text-sm font-medium text-gray-900 mb-4">Recommended topics</h3>
                    <div className="flex flex-wrap gap-2">
                      {TOPICS.map((topic) => (
                        <button
                          key={topic}
                          className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-[13px] text-gray-700 transition-colors"
                        >
                          {topic}
                        </button>
                      ))}
                    </div>
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