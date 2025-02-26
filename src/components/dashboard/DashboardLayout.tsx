import { Sidebar } from './Sidebar';
import { TopNavbar } from './TopNavbar';

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange?: (tab: string) => void;
}

export function DashboardLayout({ children, activeTab, onTabChange }: DashboardLayoutProps) {
  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      <Sidebar isOpen={true} activeTab={activeTab} onTabChange={onTabChange} />
      
      <div className="flex-1 flex flex-col">
        <TopNavbar />
        
        <main className="flex-1 ml-64 pt-16 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}