'use client';

import { BodyResponseProps } from '../../core/types';
import '../../../i18n';
import { useTranslation } from 'react-i18next';

export default function BodyResponse({ body }: BodyResponseProps) {
  const { t } = useTranslation();

  return (
    <div className="response__body">
      <h2 className="body__title">{t('body')}</h2>
      <div className="body__window">
        {body ? (
          <pre className="body__window-pre">
            {JSON.stringify(body, null, 2)}
          </pre>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
