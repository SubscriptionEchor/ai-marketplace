import { createBrowserRouter } from 'react-router-dom';
import { LoginContainer } from '@/containers';
import { DashboardContainer } from '@/containers';
import { RootLayout } from '@/components/layouts';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <LoginContainer />,
      },
      {
        path: '/dashboard',
        children: [
          {
            index: true,
            element: <DashboardContainer />,
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