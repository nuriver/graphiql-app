'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '../authorization/AuthContext';
import Loading from '../app/loading';
import Link from 'next/link';

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
      <main className="container">
        <div className="main-block-first">
          <h1>
            Welcome back,{' '}
            <span className="un-grad">{user.displayName || 'User'}</span>
          </h1>
        </div>

        <div className="main-block-second">
          <h3>How we can help you today?</h3>
          <div className="main-buttons">
            <Link className="main-btn" href="/restfull-client">
              REST Client
            </Link>
            <Link className="main-btn" href="/graphiql-client">
              GraphiQL Client
            </Link>
            <Link className="main-btn" href="/history">
              History
            </Link>
          </div>
        </div>
        <div className="main-block-3">
          <h3>About</h3>
          <div className="about-text">
            We are Alexei, Maria, and Kate, a passionate team of developers who
            met during the Frontend course at RS School in May 2024. Since then,
            we&apos;ve been working together seamlessly, continuing to develop
            our skills and collaborate on exciting projects. After successfully
            completing the Frontend course, we were inspired to dive even deeper
            into the world of web development. Together, we enrolled in the
            React course, eager to push our boundaries and explore new
            possibilities. During this course, we successfully completed an
            intriguing project &mdash; a client for REST and GraphQL APIs
            &mdash; that challenged us to innovate and grow as developers. This
            project not only showcased our technical skills but also our shared
            passion for creating solutions that make a difference. The
            experience was incredible, and we&apos;re deeply grateful to RS
            School for providing us with the opportunity to learn so much and
            connect with amazing people (all for free!). We&apos;re excited to
            see where this journey takes us next!
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="container main-out">
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
