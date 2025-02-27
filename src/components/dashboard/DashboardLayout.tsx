import { TopNavbar } from './TopNavbar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="flex-1 flex flex-col">
        <TopNavbar />
        
        <main className="flex-1 pt-32 overflow-y-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}