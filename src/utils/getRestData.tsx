import { HistoryObject, RestfulState } from '../core/types';
import addToHistory from './addToHistory';

// function isError(error: unknown): error is Error {
//   return typeof error === 'object' && error !== null && 'message' in error;
// }

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
    const body = requestData.body;
    const method = requestData.method;

    const result = await fetch(requestData.endpoint, {
      method: requestData.method,
      headers: {
        ...headersObject,
      },
      body:
        body && (method === 'POST' || method === 'PUT' || method === 'PATCH')
          ? JSON.stringify(body)
          : undefined,
    });

    const restfulData = await result.json();

    const response = {
      status: result.status,
      statusText: result.statusText,
      body: restfulData,
    };

    const historyRestObject: HistoryObject = {
      method: method,
      endpoint: requestData.endpoint,
      url: urlString,
    };
    addToHistory(historyRestObject);
    return response;
  } catch (error) {
    return;
  }
};

export default getRestData;
