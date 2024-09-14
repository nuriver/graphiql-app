'use client';

import { MouseEventHandler, useRef } from 'react';
import {
  addRestfulHeader,
  updateRestfulHeader,
} from '../../store/restfulSlice';
import { useAppDispatch, useAppSelector } from '../../store/store';
import '../../../i18n';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

export default function Headers({
  updateUrl,
}: {
  updateUrl: () => void;
}): JSX.Element {
  const headers = useAppSelector((state) => state.restful.headers);
  const dispatch = useAppDispatch();
  const restHeaderRef = useRef<HTMLDivElement>(null);
  const addRestHeaderRef = useRef<HTMLButtonElement>(null);
  const { t } = useTranslation();

  const addRestfulHeaderHandler = () => {
    dispatch(addRestfulHeader());
  };

  const updateHeader = (id: string, key: string, value: string) => {
    dispatch(updateRestfulHeader({ id, key, value }));
  };

  const contentToggle: MouseEventHandler<HTMLButtonElement> = () => {
    if (restHeaderRef.current && addRestHeaderRef.current) {
      if (restHeaderRef.current.classList.contains('restful-hidden-content')) {
        restHeaderRef.current.classList.remove('restful-hidden-content');
        addRestHeaderRef.current.disabled = false;
      } else {
        restHeaderRef.current.classList.add('restful-hidden-content');
        addRestHeaderRef.current.disabled = true;
      }
    }
  };

  return (
    <div
      className="restful-headers-wrapper restful-hidden-content"
      ref={restHeaderRef}
    >
      <header className="restful-headers-header">
        <h3>{t('headers')}</h3>
        <button
          className="add-headers-button"
          onClick={addRestfulHeaderHandler}
          ref={addRestHeaderRef}
          disabled={false}
        >
          {t('add_header')}
        </button>
        <button
          className="content-toggle-button"
          role="toggle"
          onClick={contentToggle}
        >
          <span></span>
        </button>
      </header>
      <main className="restful-headers-main">
        <div className="restful-headers-name-wrapper">
          <h4>{t('header_key')}</h4>
          <h4>{t('header_value')}</h4>
        </div>
        {headers.map((header) => (
          <div className="restful-headers-pairs-wrapper" key={header.id}>
            <input
              type="text"
              className="restful-headers-key-input"
              placeholder={t('header_key')}
              value={header.key}
              onChange={(event) => {
                if (/^[\x00-\x7F]*$/.test(event.target.value)) {
                  updateHeader(header.id, event.target.value, header.value);
                } else {
                  toast.error(t('latin_warning'));
                }
              }}
              onBlur={updateUrl}
            />
            <input
              type="text"
              className="restful-headers-value-input"
              placeholder={t('header_value')}
              value={header.value}
              onChange={(event) => {
                if (/^[\x00-\x7F]*$/.test(event.target.value)) {
                  updateHeader(header.id, header.key, event.target.value);
                } else {
                  toast.error(t('latin_warning'));
                }
              }}
              onBlur={updateUrl}
            />
          </div>
        ))}
      </main>
    </div>
  );
}
