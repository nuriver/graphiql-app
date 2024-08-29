'use client';

import { MethodProps } from '../../core/types';

export default function Method({ method, setMethod }: MethodProps) {
  return (
    <div className="request__method">
      <h2 className="method__title">Method</h2>
      <div className="method__custom-select">
        <select
          value={method}
          className="method__select"
          onChange={(item) => setMethod(item.target.value)}
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="PATCH">PATCH</option>
          <option value="DELETE">DELETE</option>
          <option value="HEAD">HEAD</option>
          <option value="OPTIONS">OPTIONS</option>
          <option value="TRACE">TRACE</option>
          <option value="CONNECT">CONNECT</option>
        </select>
      </div>
    </div>
  );
}
