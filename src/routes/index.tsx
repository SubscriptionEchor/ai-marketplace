import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../components/dashboard/DashboardPage';
import RootLayout from '../layouts/RootLayout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
      {
        path: '/dashboard/*',
        element: <DashboardPage />,
      }
    ],
  },
]);