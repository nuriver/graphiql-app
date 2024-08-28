'use client';
import React, { useState } from 'react';
import Method from './method';
import Endpoint from './endpoint';
// import Variables from './variables';
import BodyRequest from './bodyRequest';
import Headers from './headers';
import { RequestBlockProps, ResponseBody } from '../../core/types';

const RequestBlock: React.FC<RequestBlockProps> = ({ setResponse }) => {
  const [endpoint, setEndpoint] = useState<string>('');
  const [method, setMethod] = useState<string>('GET');

  const handleRequest = async () => {
    try {
      const res = await fetch(endpoint, { method });
      const data: ResponseBody = await res.json();
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

  return (
    <div className="rest-client__request">
      <Endpoint endpoint={endpoint} setEndpoint={setEndpoint} />
      <Method method={method} setMethod={setMethod} />
      {/* <Variables /> */}
      <Headers />
      <BodyRequest />
      <button onClick={handleRequest} className="request__send-button">
        Send Request
      </button>
    </div>
  );
};

export default RequestBlock;
