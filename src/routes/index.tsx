import { createBrowserRouter } from 'react-router-dom';
import { DashboardContainer } from "@/containers";
import { DatasetUploadView, ModelUploadView, InfraUploadView } from "@/components/dashboard";
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
            path: 'upload/dataset',
            element: <DatasetUploadView />,
          },
          {
            path: 'upload/model',
            element: <ModelUploadView />,
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