'use client';

import React, { ReactNode, useEffect, useState, useRef, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getAuth, onAuthStateChanged, signOut, User } from 'firebase/auth';
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

  const logoutTimer = useRef<NodeJS.Timeout | null>(null); 

  
  const resetLogoutTimer = useCallback(() => {
    if (logoutTimer.current) clearTimeout(logoutTimer.current);
    logoutTimer.current = setTimeout(async () => {
      await signOut(auth);
      router.push('/');
    }, 60 * 60 * 1000); 
  }, [auth, router]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        resetLogoutTimer(); 
      } else {
        setUser(null);
      }
      setLoading(false);
      setIsAuthChecked(true);
    });

    return () => unsubscribe();
  }, [auth, resetLogoutTimer]);

  useEffect(() => {
    if (user) {
      const events = ['mousemove', 'keydown', 'click'];
      const handleActivity = () => resetLogoutTimer(); 

      events.forEach((event) => window.addEventListener(event, handleActivity));

      return () => {
        events.forEach((event) =>
          window.removeEventListener(event, handleActivity)
        );
        if (logoutTimer.current) clearTimeout(logoutTimer.current); 
      };
    }
  }, [user, resetLogoutTimer]);

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

  if (user && (pathname === '/sign-in' || pathname === '/sign-up')) {
    router.push('/');
  }

  return <>{children}</>;
};

export default AuthGuard;
