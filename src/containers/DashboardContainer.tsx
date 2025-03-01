import { DashboardLayout, HomeView, ModelsView, DatasetsView, InfraProvidersView, DataProviderView } from '@/components/dashboard';
import { SettingsView } from '@/components/dashboard/SettingsView';
import { useParams } from 'react-router-dom';

const VIEWS = {
  all: HomeView,
  models: ModelsView,
  datasets: DatasetsView,
  'infra-providers': InfraProvidersView,
  'upload': DataProviderView,
  'settings': SettingsView
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