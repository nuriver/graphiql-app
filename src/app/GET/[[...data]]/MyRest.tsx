'use client';
import React, { useEffect, useState } from 'react';
import RequestBlock from '../requestBlock';
import ResponseBlock from '../responseBlock';
import '../../../styles/main.scss';
import { ResponseState, RestfulState } from '../../../core/types';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import {
  resetRestfulStore,
  setRestfulStore,
} from '../../../store/restfulSlice';

export default function MyRest({
  requestData,
}: {
  requestData: RestfulState | null;
}) {
  const savedData = useAppSelector((state) => state.restful);
  console.log(savedData);

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!requestData) {
      dispatch(resetRestfulStore());
    } else {
      dispatch(setRestfulStore(requestData));
    }
  }, [dispatch, requestData]);

  const encodedUrl = useAppSelector((state) => state.restful.url) as string;
  console.log(typeof encodedUrl);
  const [response, setResponse] = useState<ResponseState>({
    body: null,
    status: null,
    statusText: null,
  });

  //ЗДЕСЬ РАЗОБРАТЬСЯ
//   const obtainDataHandler = async () => {
//     const data = await getRestData(encodedUrl);
//     console.log(data);
//     if (data) {
//       setResponse(data);
//     }
//   };

  return (
    <div className="rest-client">
      <h1>REST Client</h1>
      <RequestBlock setResponse={setResponse} />
      <h1>Response</h1>
      <ResponseBlock response={response} />
    </div>
  );
}
