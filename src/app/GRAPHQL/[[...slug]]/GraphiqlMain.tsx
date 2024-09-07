'use client';

import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import Graphiql from '../Graphiql/Graphiql';
import Response from '../Response/Response';
import { GraphiqlState, ResponseState } from '../../../core/types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Documentation from '../Response/Documentation';
import introspectionQuery from '../../../data/introspectionQuery';
import getGraphiqlData from '../../../utils/getGraphqlData';
import {
  resetGraphiqlStore,
  setGraphiqlStore,
} from '../../../store/graphiqlFeatures/graphiqlSlice';

const GraphiqlMain = ({
  requestData,
}: {
  requestData: GraphiqlState | null;
}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!requestData) {
      dispatch(resetGraphiqlStore());
    } else {
      dispatch(setGraphiqlStore(requestData));
    }
  }, [dispatch, requestData]);

  const encodedUrl = useAppSelector((state) => state.graphiql.url) as string;
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
