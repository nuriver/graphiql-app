'use client';

import { useAppSelector } from '../../../store/store';
import Graphiql from '../Graphiql/Graphiql';
import Response from '../Response/Response';

const getGraphiqlData = async (urlData: string) => {
  const decodedRequestData = atob(urlData);
  const requestData = JSON.parse(decodedRequestData);

  const res = await fetch(requestData.endpoint, {
    method: 'POST',
    headers: {
      ...requestData.headers,
    },
    body: JSON.stringify({
      query: requestData.body.query,
      variables: requestData.body.variables,
    }),
  });

  const graphiqlData = await res.json();
  return graphiqlData;
};

const GraphiqlMain = () => {
  const encodedUrl = useAppSelector((state) => state.graphiql.url);

  const sendClickHandler = async () => {
    const data = await getGraphiqlData(encodedUrl);
    console.log(data);
  };

  return (
    <div className="graphiql-page-wrapper">
      <Graphiql sendClickHandler={sendClickHandler} />
      <Response />
    </div>
  );
};

export default GraphiqlMain;
