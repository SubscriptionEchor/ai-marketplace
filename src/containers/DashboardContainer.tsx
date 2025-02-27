import { DashboardLayout, HomeView, MarketplaceView } from '@/components/dashboard';
import { useParams } from 'react-router-dom';

export function DashboardContainer() {
  const { view } = useParams();
  
  const renderView = () => {
    switch (view) {
      case 'marketplace':
        return <MarketplaceView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <DashboardLayout>
      {renderView()}
    </DashboardLayout>
  );
}