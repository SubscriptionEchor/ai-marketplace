import { createBrowserRouter } from 'react-router-dom';
import { DashboardContainer } from "@/containers";
import { DatasetUploadView, ModelUploadView, ModelPricingView, ModelReviewView, InfraUploadView, DataProviderView } from "@/components/dashboard";
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
            path: 'upload/infra',
            element: <InfraUploadView />,
          }
        ]
      }
    ],
  },
]);