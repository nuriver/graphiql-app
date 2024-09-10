'use client';

import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import Graphiql from '../Graphiql/Graphiql';
import Response from '../Response/Response';
import { GraphiqlState, ResponseState } from '../../../core/types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Documentation from '../Response/Documentation';
import {
  resetGraphiqlStore,
  setGraphiqlStore,
} from '../../../store/graphiqlFeatures/graphiqlSlice';
import { getGraphiqlData, getGraphiqlSchema } from '../../actions';
import addToHistory from '../../../utils/addToHistory';
import Loading from '../../loading';

const GraphiqlMain = ({
  requestData,
  isRedirected,
}: {
  requestData: GraphiqlState | null;
  isRedirected: boolean;
}) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!requestData) {
      dispatch(resetGraphiqlStore());
    } else {
      dispatch(setGraphiqlStore(requestData));
    }
  }, [dispatch, requestData]);

  const encodedUrl = useAppSelector((state) => state.graphiql.url) as string;
  const sdlUrl = useAppSelector((state) => state.graphiql.sdl);
  const initialResponse = {
    body: null,
    status: null,
    statusText: null,
  };
  const [response, setResponse] = useState<ResponseState>(initialResponse);
  const [doc, setDoc] = useState<string | undefined>(undefined);

  const sendClickHandler = async () => {
    setDoc(undefined);
    setIsLoading(true);
    const result = await getGraphiqlData(encodedUrl);
    if (result.success) {
      if (result.data && result.history) {
        addToHistory(result.history);
        setResponse(result.data);
      }
    } else {
      toast.error(result.error);
      setResponse(initialResponse);
    }
    setIsLoading(false);
  };

  const getSchemaHandler = async () => {
    setIsLoading(true);
    setDoc(undefined);

    const result = await getGraphiqlSchema(sdlUrl);
    if (result.success) {
      setDoc(result.data);
    } else {
      toast.error('Please enter valid SDL endpoint');
    }
    setIsLoading(false);
  };

  return (
    <div className="graphiql-page-wrapper">
      {isLoading && <Loading />}
      <ToastContainer />
      <Graphiql
        sendClickHandler={sendClickHandler}
        getSchemaHandler={getSchemaHandler}
        isRedirected={isRedirected}
      />
      <Response response={response} />
      {doc ? <Documentation doc={doc} /> : null}
    </div>
  );
};

export default GraphiqlMain;
