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
import { ResponseState, RestfulState } from '../../../core/types';
import '../../../../i18n';
import { useTranslation } from 'react-i18next';
import getRestData from '../../../utils/getRestData';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface MyRestProps {
  requestData: {
    endpoint: string;
    method: string;
    body: string;
    headers: Record<string, string>;
    MyRestProps: boolean;
  } | null;
}

export default function MyRest({ requestData }: MyRestProps) {
  const dispatch = useAppDispatch();
  const encodedUrl = useAppSelector((state) => state.restful.url);
  // const response = useAppSelector((state) => state.restful.response);
  const { t } = useTranslation();
  const defaultResponse: ResponseState = {
    body: null,
    status: null,
    statusText: null,
  };
  const [response, setResponse] = useState(defaultResponse);

  useEffect(() => {
    if (!requestData) {
      console.log('No requestData found, resetting store...');
      dispatch(resetRestfulStore());
    } else {
      const headersArray = Object.entries(requestData.headers || {}).map(
        ([key, value]) => ({ headerKey: key, headerValue: value })
      );
      console.log('Loading requestData into store...');

      const restfulState: RestfulState = {
        endpoint: requestData.endpoint,
        method: requestData.method || 'GET',
        body: requestData.body || '',
        headers: headersArray,
        response: null,
        url: '',
        variables: '',
      };

      // Dispatch the restfulState
      dispatch(setRestfulStore(restfulState));
    }
  }, [dispatch, requestData]);

  const requestHandler = async () => {
    if (encodedUrl) {
      const response = await getRestData(encodedUrl);
      console.log(response);
      if (response) {
        console.log(response);
        setResponse(response);
      } else {
        toast.error(t('result_warning'));
      }
    }
  };

  const responseToConsole = useAppSelector((state) => state.restful.response);
  console.log('Response in MyRest:', responseToConsole);
  return (
    <div className="rest-client">
      <ToastContainer />
      <h1>REST Client</h1>
      <RequestBlock requestHandler={requestHandler} />
      <h1>{t('response')}</h1>
      <ResponseBlock response={response} />{' '}
    </div>
  );
}
