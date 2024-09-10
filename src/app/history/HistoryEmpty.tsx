import Link from 'next/link';

const HistoryEmpty = () => {
  return (
    <div className="history-wrapper">
      <p className="history-empty-heading">
        <span>You haven&#39;t executed any requests</span>
        <span>It&#39;s empty here. Try:</span>
      </p>
      <div className="client-links-wrapper">
        <Link className="client-link" href={'/restfull-client'}>
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
