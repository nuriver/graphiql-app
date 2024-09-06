'use client';

import { useState } from 'react';
import { useAppSelector } from '../../../store/store';
import Graphiql from '../Graphiql/Graphiql';
import Response from '../Response/Response';
import { HistoryObject, ResponseState } from '../../../core/types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Documentation from '../Response/Documentation';
import introspectionQuery from '../../../data/introspectionQuery';
import addToHistory from '../../../utils/addToHistory';

function isError(error: unknown): error is Error {
  return typeof error === 'object' && error !== null && 'message' in error;
}

const getGraphiqlData = async (urlData: string) => {
  try {
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

    const historyObject: HistoryObject = {
      method: 'GRAPHQL',
      endpoint: requestData.endpoint,
      url: urlData,
    };

    addToHistory(historyObject);

    return response;
  } catch (error) {
    if (isError(error)) {
      toast.error(
        <div>
          <div>
            <b>Please fill in correctly all necessary information.</b>
          </div>
        </div>
      );
    }
  }
};

const GraphiqlMain = () => {
  const encodedUrl = useAppSelector((state) => state.graphiql.url);
  const sdlUrl = useAppSelector((state) => state.graphiql.sdl);
  const [response, setResponse] = useState<ResponseState>({
    body: null,
    status: null,
    statusText: null,
  });
  const [doc, setDoc] = useState<string | undefined>(undefined);

  const sendClickHandler = async () => {
    setDoc(undefined);

    const data = await getGraphiqlData(encodedUrl);
    if (data) {
      setResponse(data);
    }
  };

  const getSchemaHandler = async () => {
    setDoc(undefined);
    try {
      const res = await fetch(sdlUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: introspectionQuery,
        }),
      });

      if (res.status !== 200) {
        toast.error('Please enter valid SDL endpoint');
      } else {
        const schema = await res.json();
        const schemaJson = JSON.stringify(schema, null, 2);
        setDoc(schemaJson);
      }
    } catch (error) {
      toast.error('Please enter valid SDL endpoint');
    }
  };

  return (
    <div className="graphiql-page-wrapper">
      <ToastContainer />
      <Graphiql
        sendClickHandler={sendClickHandler}
        getSchemaHandler={getSchemaHandler}
      />
      <Response response={response} />
      {doc ? <Documentation doc={doc} /> : null}
    </div>
  );
};

export default GraphiqlMain;
