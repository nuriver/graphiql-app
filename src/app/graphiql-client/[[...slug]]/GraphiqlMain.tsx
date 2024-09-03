'use client';

import { useState } from 'react';
import { useAppSelector } from '../../../store/store';
import Graphiql from '../Graphiql/Graphiql';
import Response from '../Response/Response';
import { ResponseState } from '../../../core/types';

const getGraphiqlData = async (urlData: string) => {
  const decodedRequestData = atob(urlData);
  const requestData = JSON.parse(decodedRequestData);

  const res = await fetch(requestData.endpoint, {
    method: 'POST',
    headers: {
      //TODO change
      'Content-Type': 'application/json',
      ...requestData.headersObject,
    },
    body: JSON.stringify({
      query: requestData.body.query,
      variables: requestData.body.variables,
    }),
  });

  const graphiqlData = await res.json();

  const response = {
    status: res.status,
    statusText: res.statusText,
    body: graphiqlData,
  };

  return response;
};

const GraphiqlMain = () => {
  const encodedUrl = useAppSelector((state) => state.graphiql.url);
  const [response, setResponse] = useState<ResponseState>({
    body: null,
    status: null,
    statusText: null,
  });

  const sendClickHandler = async () => {
    const data = await getGraphiqlData(encodedUrl);
    setResponse(data);
  };

  return (
    <div className="graphiql-page-wrapper">
      <Graphiql sendClickHandler={sendClickHandler} />
      <Response response={response} />
    </div>
  );
};

export default GraphiqlMain;
