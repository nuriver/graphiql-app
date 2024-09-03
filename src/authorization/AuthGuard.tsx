'use client';

import React, { ReactNode, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '../authorization/AuthContext';
import Loading from '../app/loading';

interface AuthGuardProps {
  children: ReactNode;
  publicRoutes?: string[];
}

const AuthGuard: React.FC<AuthGuardProps> = ({
  children,
  publicRoutes = [],
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading } = useAuth();
  const isPublicRoute = publicRoutes.includes(pathname);

  useEffect(() => {
    if (!loading) {
      if (!user && !isPublicRoute) {
        router.push('/');
      }
      if (user && (pathname === '/sign-in' || pathname === '/sign-up')) {
        router.push('/');
      }
    }
  }, [user, loading, router, isPublicRoute, pathname]);

  if (loading) {
    return <Loading />;
  }

  return <>{children}</>;
};

export default AuthGuard;
