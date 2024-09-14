'use client';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../../../../i18n';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useTranslation();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>{t('error_warning')}</h2>
      <button onClick={() => reset()}>{t('error_proposal')}</button>
    </div>
  );
}
