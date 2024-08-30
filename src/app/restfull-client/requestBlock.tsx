'use client';

import React, { useState } from 'react';
import { useAppSelector } from '../../store/store';
import Endpoint from './endpoint';
import Method from './method';
import Headers from './headers';
import BodyRequest from './bodyRequest';
import { RequestBlockProps, ResponseBody } from '../../core/types';

const RequestBlock: React.FC<RequestBlockProps> = ({ setResponse }) => {
  const [endpoint, setEndpoint] = useState<string>('');
  const [method, setMethod] = useState<string>('GET');
  const [body, setBody] = useState<string>('');

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
      const encodedEndpoint = btoa(endpoint);
      const encodedBody = body ? btoa(body) : '';
      const path = body
        ? `/${method}/${encodedEndpoint}/${encodedBody}`
        : `/${method}/${encodedEndpoint}`;

      window.history.pushState(null, '', `${path}?${queryParams.toString()}`);

      const response = await fetch(endpoint + '?' + queryParams.toString(), {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body:
          method === 'POST' || method === 'PUT' || method === 'PATCH'
            ? JSON.stringify(body)
            : undefined,
      });

      const responseBody = await response.json();

      setResponse({
        body: responseBody as ResponseBody,
        status: response.status,
        statusText: response.statusText,
      });
    } catch (error) {
      if (error instanceof Error) {
      }
      {
        console.error('Error occurred during fetch:', error.message);

        setResponse({
          body: null,
          status: null,
          statusText: 'Error occurred: ' + error.message,
        });
      }
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
