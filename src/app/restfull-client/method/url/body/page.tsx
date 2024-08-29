'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ResponseState } from '../../../../../core/types';

export default function RequestHandler() {
  const router = useRouter();
  const { method, url, body } = router.query;

  const [response, setResponse] = useState<ResponseState>({
    body: null,
    status: null,
    statusText: null,
  });

  useEffect(() => {
    if (!method || !url) return;

    const decodedUrl = atob(url as string);
    const decodedBody = body ? JSON.parse(atob(body as string)) : undefined;
    const headers = Object.fromEntries(
      new URLSearchParams(window.location.search)
    );

    const fetchData = async () => {
      try {
        const res = await fetch(decodedUrl, {
          method: method as string,
          headers,
          body: decodedBody ? JSON.stringify(decodedBody) : undefined,
        });

        const data = await res.json();
        setResponse({
          body: data,
          status: res.status,
          statusText: res.statusText,
        });
      } catch (error) {
        console.error('Error:', error);
        setResponse({
          body: null,
          status: null,
          statusText: 'Error fetching data',
        });
      }
    };

    fetchData();
  }, [method, url, body]);

  return (
    <div>
      <h1>Response</h1>
      <div>Status: {response.status}</div>
      <div>Status Text: {response.statusText}</div>
      <pre>{JSON.stringify(response.body, null, 2)}</pre>
    </div>
  );
}
