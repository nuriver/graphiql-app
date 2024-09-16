'use client';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import '../../i18n';
import { useEffect } from 'react';

export default function NotFound() {
  const { t, i18n } = useTranslation();
  useEffect(() => {
    const savedLang = localStorage.getItem('language');
    if (savedLang) {
      i18n.changeLanguage(savedLang);
    }
  }, [i18n]);
  return (
    <div className="not-found-cont">
      <h1>{t('not_found')}</h1>
      <p>{t('not_found_warning')}</p>
      <Link href="/">{t('go_back')}</Link>
    </div>
  );
}
