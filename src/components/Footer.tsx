'use client';

import { useTranslation } from 'react-i18next';
import Image from 'next/image';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer>
      <div className="links">
        {t('footer_made_by')}
        <a
          className="hoverline"
          href="https://github.com/nuriver"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('footer_alexei')}
        </a>
        ,
        <a
          className="hoverline"
          href="https://github.com/maryinfun"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('footer_maria')}
        </a>{' '}
        &amp;
        <a
          className="hoverline"
          href="https://github.com/aauroraaborealisrs"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('footer_kate')}
        </a>
      </div>

      <div>2024</div>

      <a href="https://rs.school/" target="_blank" rel="noopener noreferrer">
        <Image
          src="/assets/images/rs-logo.png"
          alt="RS logo"
          width={50}
          height={50}
        />
      </a>
    </footer>
  );
}
