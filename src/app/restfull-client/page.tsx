'use client';

import React, { useState } from 'react';
import RequestBlock from './requestBlock';
import ResponseBlock from './responseBlock';
import '../../styles/main.scss';
import { ResponseBody } from '../../core/types';

export default function Page() {
  const [response, setResponse] = useState<{
    body: ResponseBody | null;
    status: number | null;
    statusText: string | null;
  }>({
    body: null,
    status: null,
    statusText: null,
  });

  return (
    <div className="rest-client">
      <h1>REST Client</h1>
      <RequestBlock setResponse={setResponse} />
      <h1>Response</h1>
      <ResponseBlock response={response} />
    </div>
  );
}
