'use client';
import React, { useEffect } from 'react';
import RequestBlock from '../requestBlock';
import ResponseBlock from '../responseBlock';
import '../../../styles/main.scss';
import { useAppSelector, useAppDispatch } from '../../../store/store';
import {
  resetRestfulStore,
  setRestfulStore,
} from '../../../store/restfulSlice';
import { ResponseState, RestfulState } from '../../../core/types'; // Ensure correct path

interface MyRestProps {
  requestData: {
    endpoint: string;
    method: string;
    body: string;
    headers: Record<string, string>;
  } | null;
}

export default function MyRest({ requestData }: MyRestProps) {
  const dispatch = useAppDispatch();
  // const encodedUrl = useAppSelector((state) => state.restful.url);
  const response = useAppSelector((state) => state.restful.response);

  // Provide a default response object to avoid passing undefined or null
  const defaultResponse: ResponseState = {
    body: null,
    status: null,
    statusText: null,
  };

  useEffect(() => {
    if (requestData) {
      console.log('Loading requestData into store...');
      const restfulState: RestfulState = {
        endpoint: requestData.endpoint,
        method: requestData.method || 'GET',
        body: requestData.body || '',
        headers: Object.entries(requestData.headers || {}).map(
          ([key, value]) => ({ headerKey: key, headerValue: value })
        ),
        response: null,
        url: '',
        variables: '',
      };

      dispatch(setRestfulStore(restfulState));
    } else {
      console.log('No requestData found, resetting store...');
      dispatch(resetRestfulStore());
    }
  }, [dispatch, requestData]);
  const responseToConsole = useAppSelector((state) => state.restful.response);
  console.log('Response in MyRest:', responseToConsole);
  return (
    <div className="rest-client">
      <h1>REST Client</h1>
      <RequestBlock />
      <h1>Response</h1>
      <ResponseBlock response={response || defaultResponse} />{' '}
      {/* Pass default response if undefined */}
    </div>
  );
}
