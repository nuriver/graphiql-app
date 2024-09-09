'use client';

import { ChangeEvent, useEffect } from 'react';
import { EndpointProps } from '../../core/types';
import { useAppSelector, useAppDispatch } from '../../store/store';
import toastNonLatinError from '../../utils/toastNonLatinError';
import { setRestfulEndpoint } from '../../store/restfulSlice';

export default function Endpoint({ endpoint, setEndpoint }: EndpointProps) {
  const initialEndpoint = useAppSelector((state) => state.restful.endpoint);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setEndpoint(initialEndpoint);
  }, [initialEndpoint]);

  const onChangeHandler = (event: ChangeEvent) => {
    const input = event.target as HTMLInputElement;
    const endpoint = input.value;
    if (/^[\x00-\x7F]*$/.test(endpoint)) {
      setEndpoint(endpoint);
      dispatch(setRestfulEndpoint(endpoint));
    } else {
      toastNonLatinError();
    }
  };

  return (
    <div className="request__endpoint">
      <h2 className="endpoint__title">Endpoint URL</h2>
      <input
        value={endpoint}
        type="text"
        className="rest__input"
        onChange={onChangeHandler}
      />
    </div>
  );
}
