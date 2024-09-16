'use client';

import Link from 'next/link';
import { HistoryObject } from '../../core/types';
import '../../../i18n';
import { useTranslation } from 'react-i18next';

const HistoryRequests = ({ requests }: { requests: HistoryObject[] }) => {
  const { t } = useTranslation();

  return (
    <div className="history-wrapper">
      <h1>{t('history')}</h1>
      <div className="history-requests-wrapper">
        {requests.map((request, index) => (
          <Link
            className="request-link"
            key={index}
            href={`${request.method}/${request.url}`}
          >
            <span className="request-method-name">{request.method}</span>
            <span className="request-endpoint-name">{request.endpoint}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HistoryRequests;
