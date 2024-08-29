'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '../authorization/AuthContext';
import Loading from '../app/loading';

export default function Main() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (user && user.displayName) {
    return (
      <>
        <h1>Welcome back, {user.displayName || 'User'}!</h1>
      </>
    );
  }

  return (
    <main className="container">
      <h1>Welcome!</h1>
      <button className="main-btn" onClick={handleSignIn}>
        Sign In
      </button>
      <button className="main-btn" onClick={handleSignUp}>
        Sign Up
      </button>
    </main>
  );

  function handleSignIn() {
    if (isMounted) {
      router.push('/sign-in');
    }
  }

  function handleSignUp() {
    if (isMounted) {
      router.push('/sign-up');
    }
  }
}
