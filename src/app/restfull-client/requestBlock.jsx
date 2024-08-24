'use client';
import { useState } from 'react';
import Method from './method';
import Endpoint from './endpoint';
import Variables from './variables';

export default function RequestBlock() {
  //   const [endpoint, setEndpoint] = useState('');
  //   const [headerKey, setHeaderKey] = useState('');
  //   const [headerValue, setHeaderValue] = useState('');
  //   const [body, setBody] = useState('');

  return (
    <div className="rest-client__request">
      <div className="request__method-url">
        <Method />
        <Endpoint />
      </div>
      <Variables />
    </div>
  );
}
