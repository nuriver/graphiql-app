'use client';

import { StatusProps } from '../../core/types';
import '../../../i18n';
import { useTranslation } from 'react-i18next';

export default function Status({ status, statusText }: StatusProps) {
  const { t } = useTranslation();

  return (
    <div className="response__status">
      <h2 className="status__title">{t('status')}</h2>
      <div className="status__window">
        {status !== null ? status : ''}{' '}
        {statusText !== null ? `${statusText}` : ''}
      </div>
    </div>
  );
}
