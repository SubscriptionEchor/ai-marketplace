import { createBrowserRouter } from 'react-router-dom';
import { DashboardContainer } from '../containers';
import { RootLayout } from '../components/layouts';
import { PrivacyView, TermsView, AccessibilityView } from '../components/legal';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <DashboardContainer />,
      },
      {
        path: 'privacy',
        element: <PrivacyView />,
      },
      {
        path: 'terms',
        element: <TermsView />,
      },
      {
        path: 'accessibility',
        element: <AccessibilityView />,
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