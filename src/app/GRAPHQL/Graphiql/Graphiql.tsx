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

export default function Graphiql({
  sendClickHandler,
  getSchemaHandler,
}: {
  sendClickHandler: SendClickHandler;
  getSchemaHandler: () => void;
}): JSX.Element {
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
    toast.error('Only Latin letters are allowed');
  } else {
    const encodedRequestData = btoa(requestDataString);
    finalRequestData = encodedRequestData.replace(/=+$/, '');
    console.log(atob(finalRequestData));
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
        />
        <SdlInput updateUrl={updateUrl} getSchemaHandler={getSchemaHandler} />
        <Headers updateUrl={updateUrl} />
        <Query updateUrl={updateUrl} />
        <Variables updateUrl={updateUrl} />
      </div>
    </section>
  );
}
