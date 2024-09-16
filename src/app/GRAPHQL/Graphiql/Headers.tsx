'use client';

import { MouseEventHandler, useRef } from 'react';
import {
  addGraphiqlHeader,
  updateGraphiqlHeader,
} from '../../../store/graphiqlFeatures/graphiqlSlice';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import '../../../../i18n';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

export default function Headers({
  updateUrl,
}: {
  updateUrl: () => void;
}): JSX.Element {
  const headers = useAppSelector((state) => state.graphiql.headers);
  const dispatch = useAppDispatch();
  const headersRef = useRef<HTMLDivElement>(null);
  const addHeaderRef = useRef<HTMLButtonElement>(null);
  const { t } = useTranslation();

  const addHeader = () => {
    dispatch(addGraphiqlHeader());
  };

  const updateHeader = (id: string, key: string, value: string) => {
    dispatch(updateGraphiqlHeader({ id, key, value }));
  };

  const contentToggle: MouseEventHandler<HTMLButtonElement> = () => {
    if (headersRef.current && addHeaderRef.current) {
      if (headersRef.current.classList.contains('graphql-hidden-content')) {
        headersRef.current.classList.remove('graphql-hidden-content');
        addHeaderRef.current.disabled = false;
      } else {
        headersRef.current.classList.add('graphql-hidden-content');
        addHeaderRef.current.disabled = true;
      }
    }
  };

  return (
    <div
      className="graphiql-headers-wrapper graphql-hidden-content"
      ref={headersRef}
      data-testid="HeadersWrapper"
    >
      <header className="graphiql-headers-header">
        <h3>{t('headers')}</h3>
        <button
          className="add-headers-button"
          onClick={addHeader}
          ref={addHeaderRef}
          disabled={true}
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
      <main className="graphiql-headers-main">
        <div className="graphiql-headers-name-wrapper">
          <h4>{t('header_key')}</h4>
          <h4>{t('header_value')}</h4>
        </div>
        {headers.map((header) => (
          <div className="graphiql-headers-pairs-wrapper" key={header.id}>
            <input
              type="text"
              className="graphiql-headers-key-input"
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
              className="graphiql-headers-value-input"
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
      <p className="header-note">{t('headers_note')}</p>
    </div>
  );
}
