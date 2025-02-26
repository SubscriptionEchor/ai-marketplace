import { DashboardLayout } from '../components/dashboard/DashboardLayout';
import { MarketplaceView } from '../components/dashboard/MarketplaceView';
import { ModelsView } from '../components/dashboard/ModelsView';
import { DatasetsView } from '../components/dashboard/DatasetsView';
import { HomeView } from '../components/dashboard/HomeView';
import { useLocation } from 'react-router-dom';

export default function DashboardPage() {
  const location = useLocation();
  const path = location.pathname.split('/').pop() || 'home';

  return (
    <DashboardLayout activeTab={path}>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 min-h-full">
        {path === 'home' && <HomeView />}
        {path === 'marketplace' && <MarketplaceView />}
        {path === 'models' && <ModelsView />}
        {path === 'datasets' && <DatasetsView />}
      </div>
    </DashboardLayout>
  );
}