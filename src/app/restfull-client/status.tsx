'use client';

import { StatusProps } from '../../core/types';

export default function Status({ status }: StatusProps) {
  return (
    <div className="response__status">
      <h2 className="status__title">Status</h2>
      <div className="status__window">{status !== null ? status : ''}</div>
    </div>
  );
}
