import { createBrowserRouter } from 'react-router-dom';
import { DashboardContainer } from "@/containers";
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
          }
        ]
      }
    ],
  },
]);