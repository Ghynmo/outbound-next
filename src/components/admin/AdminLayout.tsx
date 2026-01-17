import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Sidebar from './Sidebar';
import { useData } from '../../context/DataContext';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { isAuthenticated } = useData();
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);

  // Allow login page to render without auth check to prevent redirect loop
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    // If we are on login page, we don't need to check auth or redirect to login
    if (isLoginPage) {
      setIsChecking(false);
      return;
    }

    if (!isAuthenticated) {
      router.push('/admin/login');
    } else {
      setIsChecking(false);
    }
  }, [isAuthenticated, router, isLoginPage]);

  // If on login page, render children directly (Login component handles its own layout/redirection)
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Show nothing while checking auth to prevent flash of content
  if (isChecking || !isAuthenticated) {
    return null; 
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 ml-64 p-8 overflow-x-hidden">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
