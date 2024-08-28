'use client';
import Method from './method';
import Endpoint from './endpoint';
// import Variables from './variables';
import BodyRequest from './bodyRequest';
import Headers from './headers';
import { useState } from 'react';

export default function RequestBlock() {
  const [endpoint, setEndpoint] = useState<string>('');
  const [method, setMethod] = useState<string>('GET');

  const handleRequest = async () => {
    try {
      const response = await fetch(endpoint, {
        method,
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
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
}
