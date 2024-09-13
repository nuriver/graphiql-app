'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '../authorization/AuthContext';
import Loading from '../app/loading';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import '../../i18n';

export default function Main() {
  const { t } = useTranslation();
  const router = useRouter();
  const { user } = useAuth();
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  console.log(t('sign_in'));
  useEffect(() => {
    setIsMounted(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (user && user.displayName) {
    return (
      <main className="container">
        <div className="main-block-first main-logo-block">
          <div className="column">
            <h1>
              {t('welcome')},{' '}
              <span className="un-grad">
                {user.displayName || t('default_user')}
              </span>
            </h1>
            <Link href="/" className="main-btn">
              {t('main_page')}
            </Link>
          </div>
          <Link href="/" className="main-logo"></Link>
        </div>

        <div className="main-block-second">
          <h3>{t('help')}</h3>
          <div className="main-buttons">
            <Link className="main-btn" href="/GET">
              {t('rest_client')}
            </Link>
            <Link className="main-btn" href="/GRAPHQL">
              {t('graphiql_client')}
            </Link>
            <Link className="main-btn" href="/history">
              {t('history')}
            </Link>
          </div>
        </div>
        <div className="main-block-3">
          <h3>{t('about')}</h3>
          <div className="about-text">{t('about_text')}</div>
        </div>
      </main>
    );
  }

  return (
    <main className="container main-logo-block">
      <div className="main-out">
        <h1> {t('welcome')}!</h1>
        <button className="main-btn" onClick={handleSignIn}>
          {t('main_sign_in')}
        </button>
        <button className="main-btn" onClick={handleSignUp}>
          {t('main_sign_up')}
        </button>
      </div>
      <Link href="/" className="main-logo"></Link>

      <div className="center">
        <div className="loader" role="status"></div>
      </div>
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
