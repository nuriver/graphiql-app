'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/store';
import toastNonLatinError from '../../utils/toastNonLatinError';
import { setRestfulEndpoint } from '../../store/restfulSlice';
import '../../../i18n';
import { useTranslation } from 'react-i18next';

export default function Endpoint({ updateUrl }: { updateUrl: () => void }) {
  const initialEndpoint = useAppSelector((state) => state.restful.endpoint);
  const [value, setValue] = useState('');
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    setValue(initialEndpoint);
  }, [initialEndpoint]);

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement;
    const endpoint = input.value;

    if (/^[\x00-\x7F]*$/.test(endpoint)) {
      setValue(endpoint);
      dispatch(setRestfulEndpoint(endpoint));
    } else {
      toastNonLatinError();
    }
  };

  return (
    <div className="request__endpoint">
      <h2 className="endpoint__title">{t('endpoint')}</h2>
      <input
        value={value}
        type="text"
        className="rest__input"
        onChange={onChangeHandler}
        onBlur={updateUrl}
      />
    </div>
  );
}
