import { createBrowserRouter } from 'react-router-dom';
import { DashboardContainer } from "@/containers";
import { 
  DatasetUploadView, 
  ModelUploadView, 
  CreatorProfileView,
  DetailView,
  DownloadsView,
  ModelPricingView, 
  ModelReviewView, 
  InfraUploadView,
  InfraPricingView,
  InfraReviewView
} from "@/components/dashboard";
import { RootLayout } from '../components/layouts';
import { Navigate } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard/all" replace />,
      },
      {
        path: '/dashboard',
        children: [
          {
            index: true,
            element: <Navigate to="/dashboard/all" replace />,
          },
          {
            path: ':view',
            element: <DashboardContainer />,
          },
          {
            path: 'model/:id',
            element: <DetailView />
          },
          {
            path: 'dataset/:id', 
            element: <DetailView />
          },
          {
            path: 'infra/:id',
            element: <DetailView />
          },
          {
            path: 'creator/:creatorId',
            element: <CreatorProfileView />
          },
          {
            path: 'creator/:creatorId',
            element: <CreatorProfileView />
          },
          {
            path: 'downloads',
            element: <DownloadsView />,
          },
          {
            path: 'upload/model',
            element: <ModelUploadView />,
          },
          {
            path: 'upload/model/pricing',
            element: <ModelPricingView />,
          },
          {
            path: 'upload/model/review',
            element: <ModelReviewView />,
          },
          {
            path: 'upload/dataset',
            element: <DatasetUploadView />,
          },
          {
            path: 'upload/dataset/metadata',
            element: <DatasetUploadView />,
          },
          {
            path: 'upload/dataset/pricing',
            element: <DatasetUploadView />,
          },
          {
            path: 'upload/dataset/review',
            element: <DatasetUploadView />,
          },
          {
            path: 'upload/infra',
            element: <InfraUploadView />,
          },
          {
            path: 'upload/infra/pricing',
            element: <InfraPricingView />,
          },
          {
            path: 'upload/infra/review',
            element: <InfraReviewView />,
          }
        ]
      }
    ],
  },
]);