import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '../components/LoginPage';
import RootLayout from '../layouts/RootLayout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      }
    ],
  },
]);