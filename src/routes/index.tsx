import { createBrowserRouter } from 'react-router-dom';
import { DashboardContainer } from "../containers/DashboardContainer";
import { RootLayout } from '../components/layouts';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <DashboardContainer />, // This will now show HomeView by default
      },
      {
        path: '/dashboard',
        children: [
          {
            index: true,
            element: <DashboardContainer />, // This will now show HomeView by default
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