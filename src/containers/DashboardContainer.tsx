import { DashboardLayout, HomeView, ModelsView, DatasetsView } from '@/components/dashboard';
import { useParams } from 'react-router-dom';

const VIEWS = {
  all: HomeView,
  models: ModelsView,
  datasets: DatasetsView,
  providers: HomeView, // Fallback to HomeView for now
  tools: HomeView // Fallback to HomeView for now
};

export function DashboardContainer() {
  const { view = 'all' } = useParams();
  const View = VIEWS[view as keyof typeof VIEWS] || HomeView;

  return (
    <DashboardLayout>
      <View />
    </DashboardLayout>
  );
}