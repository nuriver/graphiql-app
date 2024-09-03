'use client';

import { ChangeEvent, useState } from 'react';
import { useAppDispatch } from '../../../store/store';
import { setGraphiqlEndpoint } from '../../../store/graphiqlFeatures/graphiqlSlice';

export default function EndpointInput({
  onClickHandler,
  updateUrl,
}): JSX.Element {
  const [value, setValue] = useState('');
  const dispatch = useAppDispatch();

  const onChangeHandler = (event: ChangeEvent) => {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    setValue(value);
    dispatch(setGraphiqlEndpoint(value));
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
        />
        <button onClick={onClickHandler}>SEND</button>
      </div>
    </div>
  );
}
