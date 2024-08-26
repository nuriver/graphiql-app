'use client';
import Method from './method';
import Endpoint from './endpoint';
// import Variables from './variables';
import BodyRequest from './bodyRequest';
import Headers from './headers';

export default function RequestBlock() {
  return (
    <div className="rest-client__request">
      <div className="request__method-url">
        <Method />
        <Endpoint />
      </div>
      {/* <Variables /> */}
      <Headers />
      <BodyRequest />
    </div>
  );
}
