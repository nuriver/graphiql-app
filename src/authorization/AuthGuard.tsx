'use client';

import React, { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../authorization/AuthContext';
import Loading from '../app/loading';

interface AuthGuardProps {
  children: ReactNode;
  publicRoutes?: string[];
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading) {
    return <Loading />;
  }

  return <>{children}</>;
};

export default AuthGuard;
