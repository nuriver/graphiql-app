'use client';

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { addHeader, removeHeader } from '../../store/headersSlice';
import { isDisabled } from '../../utils/isDisabled';

const Headers: React.FC = () => {
  const [headerKey, setHeaderKey] = useState('');
  const [headerValue, setHeaderValue] = useState('');
  const headers = useSelector((state: RootState) => state.headers.headers);
  const dispatch = useDispatch<AppDispatch>();

  const handleAddHeader = () => {
    if (headerKey && headerValue) {
      dispatch(addHeader({ headerKey, headerValue }));
      setHeaderKey('');
      setHeaderValue('');
    }
  };

  const handleRemoveHeader = (index: number) => {
    dispatch(removeHeader(index));
  };

  return (
    <div className="request__headers">
      <h2>Headers</h2>
      <div className="headers__add-header">
        <input
          className="rest__input"
          type="text"
          placeholder="Header Key"
          value={headerKey}
          onChange={(e) => setHeaderKey(e.target.value)}
        />
        <input
          className="rest__input"
          type="text"
          placeholder="Header Value"
          value={headerValue}
          onChange={(e) => setHeaderValue(e.target.value)}
        />
        <button
          className="rest__button"
          disabled={isDisabled([headerKey, headerValue])}
          onClick={handleAddHeader}
        >
          Add Header
        </button>
      </div>
      <div
        className={`headers__headers-list ${
          headers.length > 0
            ? 'headers__headers-list--with-border'
            : 'headers__headers-list--no-border'
        }`}
      >
        {headers.map((header, index) => (
          <div key={index} className="headers-list__item">
            <span className="headers-list__item-data">
              {header.headerKey}: {header.headerValue}
            </span>
            <button
              className="rest__button"
              onClick={() => handleRemoveHeader(index)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Headers;
