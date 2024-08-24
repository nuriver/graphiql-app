'use client';
import { useState } from 'react';

export default function Method() {
  const [method, setMethod] = useState('GET');

  return (
    <div className="request__method">
      <h2 className="method__title">Method</h2>
      <select
        value={method}
        className="method__select"
        onChange={(item) => setMethod(item.target.value)}
      >
        <option value="GET">GET</option>
        <option value="POST">POST</option>
        <option value="PUT">PUT</option>
        <option value="DELETE">DELETE</option>
      </select>
    </div>
  );
}
