'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { useAuth } from '../authorization/AuthContext';
import { auth } from '../authorization/firebase';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import '../../i18n';

export default function Header() {
  const { t, i18n } = useTranslation();
  const [isSticky, setIsSticky] = useState(false);
  const [isToggled, setIsToggled] = useState(i18n.language === 'en');
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const savedLang = localStorage.getItem('language');
    if (savedLang) {
      i18n.changeLanguage(savedLang);
      setIsToggled(savedLang === 'en');
    }
  }, [i18n]);

  const handleToggle = () => {
    const newLang = !isToggled ? 'en' : 'ru';
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
    setIsToggled(!isToggled);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      return;
    }
  };
  const handleSignIn = () => {
    router.push('/sign-in');
  };

  const handleSignUp = () => {
    router.push('/sign-up');
  };

  return (
    <header className={`header-main ${isSticky ? 'sticky' : ''}`}>
      <Link href="/" className="header-logo"></Link>
      <div className="toggle-cont">
        <div className="toggle-lang">RU</div>
        <div className="toggle-switch">
          <input
            className="toggle-input"
            id="toggle"
            type="checkbox"
            checked={isToggled}
            onChange={handleToggle}
          />
          <label className="toggle-label" htmlFor="toggle"></label>
        </div>
        <div className="toggle-lang">ENG</div>
      </div>

      {user ? (
        <button className="hoverline" onClick={handleSignOut}>
          {t('sign_out')}
        </button>
      ) : (
        <div className="header-btns">
          <button className="hoverline" onClick={handleSignIn}>
            {t('sign_in')}
          </button>
          <button onClick={handleSignUp}>{t('sign_up')}</button>
        </div>
      )}
    </header>
  );
}
