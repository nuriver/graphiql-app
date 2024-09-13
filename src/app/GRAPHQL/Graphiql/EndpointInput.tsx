'use client';

import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { setGraphiqlEndpoint } from '../../../store/graphiqlFeatures/graphiqlSlice';
import { SendClickHandler } from '../../../core/types';
import toastNonLatinError from '../../../utils/toastNonLatinError';
import '../../../../i18n';
import { useTranslation } from 'react-i18next';

export default function EndpointInput({
  onClickHandler,
  updateUrl,
  isRedirected,
}: {
  onClickHandler: SendClickHandler;
  updateUrl: () => void;
  isRedirected: boolean;
}): JSX.Element {
  const initialValue = useAppSelector((state) => state.graphiql.endpoint);
  const [value, setValue] = useState('');
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (inputRef.current && isRedirected) {
      inputRef.current.focus();
    }
  }, [isRedirected]);

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
        {t('endpoint')}
      </label>
      <div className="endpoint-wrapper">
        <input
          value={value}
          type="text"
          className="graphiql-endpoint-input"
          id="graphiql-endpoint-input"
          placeholder={t('endpoint_placeholder')}
          onChange={onChangeHandler}
          onBlur={updateUrl}
          ref={inputRef}
        />
        <button onClick={onClickHandler}>{t('send_request_graph')}</button>
      </div>
    </div>
  );
}
