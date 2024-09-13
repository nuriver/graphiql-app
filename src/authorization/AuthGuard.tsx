'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
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
  const auth = getAuth();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const isPublicRoute = publicRoutes.includes(pathname);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      setIsAuthChecked(true);
    });

    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    if (isAuthChecked && !loading) {
      if (!user && !isPublicRoute) {
        router.push('/');
      } else if (user && (pathname === '/sign-in' || pathname === '/sign-up')) {
        router.push('/');
      }
    }
  }, [user, loading, router, isPublicRoute, pathname, isAuthChecked]);

  if (loading || !isAuthChecked) {
    return <Loading />;
  }

  if (!user && !isPublicRoute) {
    router.push('/');
  }

  return <>{children}</>;
};

export default AuthGuard;
