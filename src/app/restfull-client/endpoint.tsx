'use client';
import { useState } from 'react';

export default function Endpoint() {
  const [endpoint, setEndpoint] = useState('');
  return (
    <div className="request__endpoint">
      <h2 className="endpoint__title">Endpoint URL</h2>
      <input
        value={endpoint}
        type="text"
        className="rest__input"
        onChange={(item) => setEndpoint(item.target.value)}
      ></input>
    </div>
  );
}
