import Link from 'next/link';
import '../../../i18n';
import { useTranslation } from 'react-i18next';

const HistoryEmpty = () => {
  const { t } = useTranslation();
  return (
    <div className="history-wrapper">
      <p className="history-empty-heading">
        <span>{t('history_no_requests')}</span>
        <span>{t('history_proposal')}</span>
      </p>
      <div className="client-links-wrapper">
        <Link className="client-link" href={'/GET'}>
          REST Client
        </Link>
        <Link className="client-link" href={'/GRAPHQL'}>
          GraphiQL Client
        </Link>
      </div>
    </div>
  );
};

export default HistoryEmpty;
