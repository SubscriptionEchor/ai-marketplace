import { useLocation, Navigate } from 'react-router-dom';
import { DashboardLayout } from './DashboardLayout';
import { HomeView } from '../views/HomeView';
import { MarketplaceView } from '../views/MarketplaceView';
import { ModelsView } from '../views/ModelsView';
import { DatasetsView } from '../views/DatasetsView';

const VIEWS = {
  home: HomeView,
  marketplace: MarketplaceView,
  models: ModelsView,
  datasets: DatasetsView
} as const;

export default function DashboardPage() {
  const location = useLocation();
  const path = location.pathname.split('/').pop() || 'home';
  const View = VIEWS[path as keyof typeof VIEWS];

  if (!View) {
    return <Navigate to="/dashboard/home" replace />;
  }

  return (
    <DashboardLayout activeTab={path}>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 min-h-full">
        {<View />}
      </div>
    </DashboardLayout>
  );
}