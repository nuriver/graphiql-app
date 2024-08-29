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

  if (user) {
    return (
      <>
        <h1>Welcome back, {user.displayName || 'User'}!</h1>
      </>
    );
  }

  return (
    <>
      <h1>Welcome!</h1>
      <button onClick={handleSignIn}>Sign In</button>
      <button onClick={handleSignUp}>Sign Up</button>
    </>
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
