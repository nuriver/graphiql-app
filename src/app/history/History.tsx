'use client';

import getRequestHistory from '../../utils/getRequestHistory';
import HistoryEmpty from './HistoryEmpty';
import HistoryRequests from './HistoryRequests';

const HistoryPage = () => {
  const requests = getRequestHistory();
  return (
    <>
      {!requests ? <HistoryRequests requests={requests} /> : <HistoryEmpty />}
    </>
  );
};

export default HistoryPage;
