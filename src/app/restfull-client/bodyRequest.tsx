'use client';
import React from 'react';
import { BodyRequestProps } from '../../core/types';

const BodyRequest: React.FC<BodyRequestProps> = ({ body, setBody }) => {
  return (
    <div className="request__body">
      <h2 className="body__title">Body</h2>
      <input
        value={body}
        type="text"
        className="rest__input rest__body-input"
        onChange={(item) => setBody(item.target.value)}
      ></input>
      <button className="body-input__button">Prettify</button>
    </div>
  );
};

export default BodyRequest;
