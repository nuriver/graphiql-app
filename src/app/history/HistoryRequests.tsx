'use client';

import Link from 'next/link';
import { HistoryObject } from '../../core/types';

const HistoryRequests = ({ requests }: { requests: HistoryObject[] }) => {
  return (
    <div className="history-wrapper">
      <h1>History Requests</h1>
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
