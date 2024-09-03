'use client';

import { useAppDispatch, useAppSelector } from '../../../store/store';
import EndpointInput from './EndpointInput';
import Headers from './Headers';
import Query from './Query';
import SdlInput from './SdlInput';
import Variables from './Variables';
import { setGraphiqlUrl } from '../../../store/graphiqlFeatures/graphiqlSlice';

export default function Graphiql({ sendClickHandler }): JSX.Element {
  const dispatch = useAppDispatch();
  const endpoint = useAppSelector((state) => state.graphiql.endpoint);
  const query = useAppSelector((state) => state.graphiql.query);
  const variables = useAppSelector((state) => state.graphiql.variables);
  const headersArray = useAppSelector((state) => state.graphiql.headers);
  const headersObject = headersArray.reduce((acc, header) => {
    if (header.key) {
      acc[header.key] = header.value;
    }
    return acc;
  }, {});

  const sdl = useAppSelector((state) => state.graphiql.sdl);
  const body = {
    query,
    variables,
  };

  const requestData = {
    body,
    endpoint,
    headersObject,
    sdl,
  };

  const requestDataString = JSON.stringify(requestData);
  const encodedRequestData = btoa(requestDataString);

  const updateUrl = () => {
    dispatch(setGraphiqlUrl(encodedRequestData));
    window.history.replaceState(
      null,
      '',
      `/graphiql-client/GRAPHQL/${encodedRequestData}`
    );
  };

  return (
    <section className="graphiql">
      <h2>GraphiQL Client</h2>
      <div className="graphiql-wrapper">
        <EndpointInput
          onClickHandler={sendClickHandler}
          updateUrl={updateUrl}
        />
        <SdlInput updateUrl={updateUrl} />
        <Headers updateUrl={updateUrl} />
        <Query updateUrl={updateUrl} />
        <Variables updateUrl={updateUrl} />
      </div>
    </section>
  );
}
