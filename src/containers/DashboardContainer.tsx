import { DashboardLayout, HomeView } from '@/components/dashboard';
import { useParams } from 'react-router-dom';

const VIEWS = {
  all: HomeView,
  models: HomeView,
  datasets: HomeView,
  providers: HomeView,
  tools: HomeView
};

export function DashboardContainer() {
  const { view } = useParams();
  const View = VIEWS[view as keyof typeof VIEWS] || HomeView;
  
  return (
    <DashboardLayout>
      <View />
    </DashboardLayout>
  );
}