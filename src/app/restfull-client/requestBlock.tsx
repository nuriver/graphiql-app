'use client';

import React, { useState } from 'react';
import { useAppSelector } from '../../store/store';
import Endpoint from './endpoint';
import Method from './method';
import Headers from './headers';
import BodyRequest from './bodyRequest';
import { RequestBlockProps, ResponseBody } from '../../core/types';
import { useRouter } from 'next/navigation';

const RequestBlock: React.FC<RequestBlockProps> = ({ setResponse }) => {
  const [endpoint, setEndpoint] = useState<string>('');
  const [method, setMethod] = useState<string>('GET');
  const [body, setBody] = useState<string>('');
  const router = useRouter();

  const headers = useAppSelector((state) => state.headers.headers);

  const handleRequest = async () => {
    console.log('handleRequest called');
    const queryParams = new URLSearchParams();

    headers.forEach((header) => {
      queryParams.append(
        encodeURIComponent(header.headerKey),
        encodeURIComponent(header.headerValue)
      );
    });

    try {
      const decodedEndpoint = atob(endpoint);

      const response = await fetch(
        `${decodedEndpoint}?${queryParams.toString()}`,
        {
          method: method,
          headers: { 'Content-Type': 'application/json' },
          body:
            method === 'POST' || method === 'PUT'
              ? JSON.stringify(body)
              : undefined,
        }
      );

      const responseBody = await response.json();

      setResponse({
        body: responseBody as ResponseBody,
        status: response.status,
        statusText: response.statusText,
      });

      await router.push(`/endpoint?url=${decodedEndpoint}`);
    } catch (error) {
      setResponse({
        body: null,
        status: null,
        statusText: 'Error occurred',
      });
    }
  };
  return (
    <div className="rest-client__request">
      <div className="request__method-url-wrapper">
        <Method method={method} setMethod={setMethod} />
        <Endpoint endpoint={endpoint} setEndpoint={setEndpoint} />
      </div>
      <Headers />
      <BodyRequest body={body} setBody={setBody} />
      <button onClick={handleRequest} className="request__send-button">
        Send Request
      </button>
    </div>
  );
};

export default RequestBlock;
