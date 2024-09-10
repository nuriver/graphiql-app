'use client';
import React, { useState } from 'react';
import { BodyRequestProps } from '../../core/types';
import { handlePrettify } from '../../utils/handlePrettify';
// import { useAppDispatch } from '../../store/store';

const BodyRequest: React.FC<BodyRequestProps> = ({ body, setBody }) => {
  const [formattedBody, setFormattedBody] = useState<string>(body);
  const [isPrettified, setIsPrettified] = useState<boolean>(false);

  const handlePrettifyClick = () => {
    const [newFormattedBody, newIsPrettified] = handlePrettify(
      body,
      isPrettified
    );
    setFormattedBody(newFormattedBody);
    setIsPrettified(newIsPrettified);
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setBody(value);
    setFormattedBody(value);
    setIsPrettified(false);
  };

  return (
    <div className="request__body">
      <h2 className="body__title">Body</h2>
      <textarea
        value={formattedBody}
        className="rest__input rest__body-input"
        onChange={handleChange}
        rows={10}
        cols={50}
      ></textarea>
      <button className="body-input__button" onClick={handlePrettifyClick}>
        {isPrettified ? 'Revert' : 'Prettify'}
      </button>
    </div>
  );
};

export default BodyRequest;
