import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export function RootLayout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen">
      <Outlet />
    </div>
  );
}