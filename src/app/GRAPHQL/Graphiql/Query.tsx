'use client';

import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../store/store';
import QueryCodeEditor from './QueryCodeEditor';
import gqlPrettier from 'graphql-prettier';
import { toast } from 'react-toastify';
import '../../../../i18n';
import { useTranslation } from 'react-i18next';

export default function Query({
  updateUrl,
}: {
  updateUrl: () => void;
}): JSX.Element {
  const [value, setValue] = useState('');
  const query = useAppSelector((state) => state.graphiql.query);
  const { t } = useTranslation();

  useEffect(() => {
    setValue(query);
  }, [query]);

  const prettifyHandler = () => {
    try {
      const prettifiedQuery = gqlPrettier(query);
      setValue(prettifiedQuery);
    } catch (error) {
      toast.error('Please enter valid query');
    }
  };

  return (
    <div className="graphiql-query-wrapper">
      <div className="graphiql-query-header">
        <h3>{t('query')}</h3>
        <button className="prettify-button" onClick={prettifyHandler}>
          {t('prettify')}
        </button>
      </div>
      <QueryCodeEditor
        updateUrl={updateUrl}
        value={value}
        setValue={setValue}
      />
    </div>
  );
}
