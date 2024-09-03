'use client';

import React, { useState } from 'react';
import { useAppSelector } from '../../store/store';
import Endpoint from './endpoint';
import Method from './method';
import Headers from './headers';
import BodyRequest from './bodyRequest';
import { RequestBlockProps } from '../../core/types';
import { handleRequest } from '../../utils/handleRequest';

const RequestBlock: React.FC<RequestBlockProps> = ({ setResponse }) => {
  const [endpoint, setEndpoint] = useState<string>('');
  const [method, setMethod] = useState<string>('GET');
  const [body, setBody] = useState<string>('');

  const headers = useAppSelector((state) => state.headers.headers);

  const handleClick = () => {
    handleRequest({
      endpoint,
      method,
      body,
      headers: Object.fromEntries(
        headers.map((header) => [header.headerKey, header.headerValue])
      ),
      setResponse,
    });
  };

  return (
    <div className="rest-client__request">
      <div className="request__method-url-wrapper">
        <Method method={method} setMethod={setMethod} />
        <Endpoint endpoint={endpoint} setEndpoint={setEndpoint} />
      </div>
      <Headers />
      <BodyRequest body={body} setBody={setBody} />
      <button onClick={handleClick} className="request__send-button">
        Send Request
      </button>
    </div>
  );
};

export default RequestBlock;
