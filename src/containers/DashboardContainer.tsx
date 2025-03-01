import { DashboardLayout, HomeView, ModelsView, DatasetsView, InfraProvidersView, DataProviderView, SettingsView } from '@/components/dashboard';
import { MyUploadsView, EarningsView, WithdrawView, TransactionsView } from '@/components/dashboard';
import { useParams } from 'react-router-dom';

const VIEWS = {
  all: HomeView,
  models: ModelsView,
  datasets: DatasetsView,
  'infra-providers': InfraProvidersView,
  upload: DataProviderView,
  'my-uploads': MyUploadsView,
  'earnings': EarningsView,
  'withdraw': WithdrawView,
  'transactions': TransactionsView,
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