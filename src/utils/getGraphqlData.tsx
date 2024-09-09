import { toast } from 'react-toastify';
import { GraphiqlState, HistoryObject } from '../core/types';
import addToHistory from './addToHistory';

function isError(error: unknown): error is Error {
  return typeof error === 'object' && error !== null && 'message' in error;
}

const getGraphiqlData = async (urlData: string) => {
  try {
    const decodedRequestData = atob(urlData);
    const requestData: GraphiqlState = JSON.parse(decodedRequestData);
    const headersArray = requestData.headers;
    const headersObject = headersArray.reduce<Record<string, string>>(
      (acc, header) => {
        if (header.key) {
          acc[header.key] = header.value;
        }
        return acc;
      },
      {}
    );

    let variables = requestData.variables;
    if (variables === '') {
      variables = '{}';
    }
    const res = await fetch(requestData.endpoint, {
      method: 'POST',
      headers: {
        ...headersObject,
      },
      body: JSON.stringify({
        query: requestData.query,
        variables: JSON.parse(variables),
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
            <b>Please fill in correctly all necessary request data.</b>
          </div>
        </div>
      );
    }
  }
};

export default getGraphiqlData;
