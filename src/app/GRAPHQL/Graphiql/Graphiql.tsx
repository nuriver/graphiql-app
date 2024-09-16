'use client';

import { useAppDispatch, useAppSelector } from '../../../store/store';
import EndpointInput from './EndpointInput';
import Headers from './Headers';
import Query from './Query';
import SdlInput from './SdlInput';
import Variables from './Variables';
import { setGraphiqlUrl } from '../../../store/graphiqlFeatures/graphiqlSlice';
import { GraphiqlState, SendClickHandler } from '../../../core/types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';

export default function Graphiql({
  sendClickHandler,
  getSchemaHandler,
  isRedirected,
}: {
  sendClickHandler: SendClickHandler;
  getSchemaHandler: () => void;
  isRedirected: boolean;
}): JSX.Element {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const endpoint = useAppSelector((state) => state.graphiql.endpoint);
  const query = useAppSelector((state) => state.graphiql.query);
  const variables = useAppSelector((state) => state.graphiql.variables);
  const headersArray = useAppSelector((state) => state.graphiql.headers);
  const sdl = useAppSelector((state) => state.graphiql.sdl);

  const requestData: GraphiqlState = {
    query,
    variables,
    endpoint,
    headers: headersArray,
    sdl,
  };

  const containsNonLatin1 = (str: string) => /[^\x00-\xFF]/.test(str);

  const requestDataString = JSON.stringify(requestData);
  let finalRequestData: string;
  if (containsNonLatin1(requestDataString)) {
    toast.error(t('latin_warning'));
  } else {
    const encodedRequestData = encodeURIComponent(btoa(requestDataString));
    finalRequestData = encodedRequestData.replace(/=+$/, '');
  }

  const updateUrl = () => {
    if (finalRequestData) {
      dispatch(setGraphiqlUrl(finalRequestData));
      window.history.replaceState(null, '', `/GRAPHQL/${finalRequestData}`);
    }
  };

  return (
    <section className="graphiql">
      <h2>GraphiQL Client</h2>
      <div className="graphiql-wrapper">
        <EndpointInput
          onClickHandler={sendClickHandler}
          updateUrl={updateUrl}
          isRedirected={isRedirected}
        />
        <SdlInput updateUrl={updateUrl} getSchemaHandler={getSchemaHandler} />
        <Headers updateUrl={updateUrl} />
        <Query updateUrl={updateUrl} />
        <Variables updateUrl={updateUrl} />
      </div>
    </section>
  );
}
