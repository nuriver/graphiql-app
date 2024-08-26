'use client';
import BodyResponse from './bodyResponse';
import Status from './status';

export default function RequestBlock() {
  return (
    <div className="rest-client__response">
      <Status />
      <BodyResponse />
    </div>
  );
}
