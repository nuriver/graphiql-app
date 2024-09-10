'use client';

import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { setGraphiqlEndpoint } from '../../../store/graphiqlFeatures/graphiqlSlice';
import { SendClickHandler } from '../../../core/types';
import toastNonLatinError from '../../../utils/toastNonLatinError';

export default function EndpointInput({
  onClickHandler,
  updateUrl,
}: {
  onClickHandler: SendClickHandler;
  updateUrl: () => void;
}): JSX.Element {
  const initialValue = useAppSelector((state) => state.graphiql.endpoint);
  const [value, setValue] = useState('');
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const onChangeHandler = (event: ChangeEvent) => {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    if (/^[\x00-\x7F]*$/.test(value)) {
      setValue(value);
      dispatch(setGraphiqlEndpoint(value));
    } else {
      toastNonLatinError();
    }
  };

  return (
    <div className="graphiql-endpoint-wrapper">
      <label
        className="graphiql-endpoint-label"
        htmlFor="graphiql-endpoint-input"
      >
        Endpoint URL
      </label>
      <div className="endpoint-wrapper">
        <input
          value={value}
          type="text"
          className="graphiql-endpoint-input"
          id="graphiql-endpoint-input"
          placeholder="Enter your GraphQL API endpoint"
          onChange={onChangeHandler}
          onBlur={updateUrl}
          ref={inputRef}
        />
        <button onClick={onClickHandler}>SEND REQUEST</button>
      </div>
    </div>
  );
}
