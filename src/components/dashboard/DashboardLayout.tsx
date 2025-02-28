import { TopNavbar } from './TopNavbar';
import { NavItem } from './NavItem';

interface DashboardLayoutProps {
  children: React.ReactNode;
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

const ADDITIONAL_NAVIGATION = [
  {
    id: 'provider',
    label: 'Become a Data Provider',
    icon: 'M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z'
  }
];

const SETTINGS = [
  { 
    id: 'settings', 
    label: 'Settings', 
    icon: 'M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z'
  }
];

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="h-screen bg-[#f6f6f7] overflow-hidden">
      <div className="h-full flex flex-col">
        <TopNavbar />
        
        <main className="flex-1 pt-[112px] relative bg-[#f6f6f7]">
          <div className="flex">
            {/* Left Sidebar - Navigation */}
            <div className="w-[280px] hidden lg:block flex-shrink-0 fixed left-0 top-[112px] bottom-0 overflow-y-auto border-r border-[#e1e3e5] pt-8 bg-[#f6f6f7]">
              <div className="flex flex-col h-full px-6">
                {/* Main Navigation */}
                <div className="space-y-1.5 mb-6">
                  <div className="px-3 mb-2">
                    <h2 className="font-display text-label text-gray-400 uppercase tracking-wider">Main</h2>
                  </div>
                  {MAIN_NAVIGATION.map((item) => (
                    <NavItem key={item.id} item={item} />
                  ))}
                </div>

                {/* Additional Navigation */}
                <div className="space-y-1.5 mb-6">
                  <div className="px-3 mb-2">
                    <h2 className="font-display text-label text-gray-400 uppercase tracking-wider">Additional</h2>
                  </div>
                  {ADDITIONAL_NAVIGATION.map((item) => (
                    <NavItem key={item.id} item={item} />
                  ))}
                </div>

                {/* Settings - Fixed at Bottom */}
                <div className="mt-auto pt-4 pb-6 border-t border-[#e1e3e5] flex flex-col items-center">
                  {SETTINGS.map((item) => (
                    <NavItem key={item.id} item={item} />
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 min-w-0 lg:ml-[276px] lg:mr-[24px]">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}