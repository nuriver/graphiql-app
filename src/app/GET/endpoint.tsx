'use client';

import { ChangeEvent, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/store';
import toastNonLatinError from '../../utils/toastNonLatinError';
import { setRestfulEndpoint } from '../../store/restfulSlice';

interface EndpointProps {
  endpoint: string;
  setEndpoint: (endpoint: string) => void;
  updateUrl: () => void;
}

export default function Endpoint({
  endpoint,
  setEndpoint,
  updateUrl,
}: EndpointProps) {
  const initialEndpoint = useAppSelector((state) => state.restful.endpoint);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setEndpoint(initialEndpoint);
  }, [initialEndpoint, setEndpoint]);

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement;
    const endpoint = input.value;

    if (/^[\x00-\x7F]*$/.test(endpoint)) {
      setEndpoint(endpoint);
      dispatch(setRestfulEndpoint(endpoint));

      sessionStorage.setItem('endpoint', endpoint);
    } else {
      toastNonLatinError();
    }
  };

  const endpointSaved = sessionStorage.getItem('endpoint') || endpoint;

  return (
    <div className="request__endpoint">
      <h2 className="endpoint__title">Endpoint URL</h2>
      <input
        value={endpointSaved}
        type="text"
        className="rest__input"
        onChange={onChangeHandler}
        onBlur={updateUrl}
      />
    </div>
  );
}
