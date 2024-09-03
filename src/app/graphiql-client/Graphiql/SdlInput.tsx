'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { setGraphiqlSdl } from '../../../store/graphiqlFeatures/graphiqlSlice';

export default function SdlInput({
  updateUrl,
}: {
  updateUrl: () => void;
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
    setValue(value);
    dispatch(setGraphiqlSdl(value));
  };

  return (
    <div className="graphiql-endpoint-wrapper">
      <label className="graphiql-endpoint-label" htmlFor="graphiql-sdl-input">
        SDL URL
      </label>
      <input
        type="text"
        className="graphiql-endpoint-input"
        id="graphiql-sdl-input"
        value={value}
        onChange={onChangeHandler}
        onBlur={updateUrl}
      />
    </div>
  );
}
