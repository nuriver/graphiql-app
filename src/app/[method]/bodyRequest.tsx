'use client';
import React, { useEffect, useState } from 'react';
import { handlePrettify } from '../../utils/handlePrettify';
import '../../../i18n';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { setRestfulBody } from '../../store/restfulSlice';
import { toast } from 'react-toastify';

const BodyRequest = ({ updateUrl }: { updateUrl: () => void }) => {
  const dispatch = useAppDispatch();
  const initialBody = useAppSelector((state) => state.restful.body);
  const [value, setValue] = useState('');
  const [isPrettified, setIsPrettified] = useState<boolean>(false);
  const { t } = useTranslation();

  useEffect(() => {
    setValue(initialBody);
  }, [initialBody]);

  const handlePrettifyClick = () => {
    const [newFormattedBody, newIsPrettified] = handlePrettify(
      value,
      isPrettified
    );
    if (newFormattedBody !== 'Invalid JSON') {
      setValue(newFormattedBody);
      setIsPrettified(newIsPrettified);
      dispatch(setRestfulBody(newFormattedBody));
    } else {
      toast.error(t('json_warning'));
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setValue(value);
    setIsPrettified(false);
    dispatch(setRestfulBody(value));
  };

  return (
    <div className="request__body">
      <h2 className="body__title">{t('body')}</h2>
      <textarea
        value={value}
        className="rest__input rest__body-input"
        onChange={handleChange}
        rows={10}
        cols={50}
        onBlur={updateUrl}
      ></textarea>
      <button className="body-input__button" onClick={handlePrettifyClick}>
        {isPrettified ? t('revert') : t('prettify')}
      </button>
    </div>
  );
};

export default BodyRequest;
