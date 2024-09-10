import { toast } from 'react-toastify';
import { HistoryObject, RestfulState } from '../core/types';
import addToHistory from './addToHistory';

function isError(error: unknown): error is Error {
  return typeof error === 'object' && error !== null && 'message' in error;
}

const getRestData = async (urlString: string) => {
  try {
    const decodedRequestData = atob(urlString);
    const requestData: RestfulState = JSON.parse(decodedRequestData);
    const receivedHeaders = requestData.headers;
    const headersObject = receivedHeaders.reduce<Record<string, string>>(
      (acc, header) => {
        if (header.headerKey) {
          acc[header.headerKey] = header.headerValue;
        }
        return acc;
      },
      {}
    );
    const result = await fetch(requestData.endpoint, {
      method: 'POST',
      headers: {
        ...headersObject,
      },
      body: JSON.stringify({
        body: requestData.body,
      }),
    });

    const restfulData = await result.json();

    const response = {
      status: result.status,
      statusText: result.statusText,
      body: restfulData,
    };

    const historyRestObject: HistoryObject = {
      method: 'RESTFUL',
      endpoint: requestData.endpoint,
      url: urlString,
    };
    addToHistory(historyRestObject);
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

export default getRestData;
