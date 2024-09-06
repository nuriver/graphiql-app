'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { setGraphiqlSdl } from '../../../store/graphiqlFeatures/graphiqlSlice';
import toastNonLatinError from '../../../utils/toastNonLatinError';

export default function SdlInput({
  updateUrl,
  getSchemaHandler,
}: {
  updateUrl: () => void;
  getSchemaHandler: () => void;
}): JSX.Element {
  const dispatch = useAppDispatch();
  const defaultValue = useAppSelector((state) => state.graphiql.sdl);
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const onChangeHandler = (event: ChangeEvent) => {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    if (/^[\x00-\x7F]*$/.test(value)) {
      setValue(value);
      dispatch(setGraphiqlSdl(value));
    } else {
      toastNonLatinError();
    }
  };

  return (
    <div className="graphiql-endpoint-wrapper">
      <label className="graphiql-endpoint-label" htmlFor="graphiql-sdl-input">
        SDL URL
      </label>
      <div className="endpoint-wrapper">
        <input
          type="text"
          className="graphiql-endpoint-input"
          id="graphiql-sdl-input"
          value={value}
          onChange={onChangeHandler}
          onBlur={updateUrl}
        />
        <button onClick={getSchemaHandler}>GET SCHEMA</button>
      </div>
    </div>
  );
}
