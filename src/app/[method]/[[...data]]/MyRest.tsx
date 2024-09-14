'use client';
import React, { useEffect, useState } from 'react';
import RequestBlock from '../requestBlock';
import ResponseBlock from '../responseBlock';
import '../../../styles/main.scss';
import { useAppSelector, useAppDispatch } from '../../../store/store';
import {
  resetRestfulStore,
  setRestfulStore,
} from '../../../store/restfulSlice';
import {
  ResponseState,
  RestfulHeader,
  RestfulState,
} from '../../../core/types';
import '../../../../i18n';
import { useTranslation } from 'react-i18next';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getRestData } from '../../actions';
import addToHistory from '../../../utils/addToHistory';
import Loading from '../../loading';

interface MyRestProps {
  requestData: {
    endpoint: string;
    method: string;
    body: string;
    headers: RestfulHeader[];
    MyRestProps: boolean;
    isRedirected?: boolean;
  } | null;
}

export default function MyRest({ requestData }: MyRestProps) {
  const dispatch = useAppDispatch();
  const encodedUrl = useAppSelector((state) => state.restful.url);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const defaultResponse: ResponseState = {
    body: null,
    status: null,
    statusText: null,
  };
  const [response, setResponse] = useState(defaultResponse);

  useEffect(() => {
    if (!requestData) {
      dispatch(resetRestfulStore());
    } else {
      const restfulState: RestfulState = {
        endpoint: requestData.endpoint,
        method: requestData.method || 'GET',
        body: requestData.body,
        headers: requestData.headers,
        response: null,
        url: '',
        variables: '',
      };

      dispatch(setRestfulStore(restfulState));
    }
  }, [dispatch, requestData]);

  const requestHandler = async () => {
    setIsLoading(true);
    if (encodedUrl) {
      const result = await getRestData(encodedUrl);
      if (result.success) {
        if (result.data && result.history) {
          addToHistory(result.history);
          setResponse(result.data);
        }
      } else {
        toast.error(t('result_warning'));
        setResponse(defaultResponse);
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="rest-client">
      {isLoading && <Loading />}
      <ToastContainer />
      <h1>REST Client</h1>
      <RequestBlock requestHandler={requestHandler} />
      <h1>{t('response')}</h1>
      <ResponseBlock response={response} />{' '}
    </div>
  );
}
