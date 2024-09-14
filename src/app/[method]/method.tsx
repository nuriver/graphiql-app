'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { setRestfulMethod } from '../../store/restfulSlice';
import '../../../i18n';
import { useTranslation } from 'react-i18next';

export default function Method({ updateUrl }: { updateUrl: () => void }) {
  const initialMethod = useAppSelector((state) => state.restful.method);
  const [method, setMethod] = useState(initialMethod);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setMethod(initialMethod);
  }, [initialMethod, setMethod]);
  const { t } = useTranslation();

  const onChangeHandler = (event: ChangeEvent) => {
    const select = event.target as HTMLSelectElement;
    const method = select.value;
    setMethod(method);
    dispatch(setRestfulMethod(method));
  };

  return (
    <div className="request__method">
      <h2 className="method__title">{t('method')}</h2>
      <div className="method__custom-select">
        <select
          value={method}
          className="method__select"
          onChange={onChangeHandler}
          onBlur={updateUrl}
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="PATCH">PATCH</option>
          <option value="DELETE">DELETE</option>
        </select>
      </div>
    </div>
  );
}
