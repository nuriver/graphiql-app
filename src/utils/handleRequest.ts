import { HandleRequestProps, ResponseBody } from '../core/types';
import { setRestfulUrl } from '../store/restfulSlice';

export const handleRequest = async ({
  endpoint,
  method,
  body,
  headers,
  setResponse,
  dispatch,
}: HandleRequestProps) => {
  const queryParams = new URLSearchParams();
  const safeAtob = (str: string) => {
    try {
      return atob(str);
    } catch (e) {
      console.error('Failed to decode Base64:', e);
      return null;
    }
  };

  Object.entries(headers || {}).forEach(([key, value]) => {
    queryParams.append(
      btoa(encodeURIComponent(key)),
      btoa(encodeURIComponent(value))
    );
  });

  try {
    try {
      new URL(endpoint);
    } catch (error) {
      console.error('Invalid endpoint URL:', error);
      return;
    }

    const encodedEndpoint = btoa(endpoint);
    const encodedBody = body ? btoa(JSON.stringify(body)) : '';

    const path = body
      ? `/${method}/${encodedEndpoint}/${encodedBody}`
      : `/${method}/${encodedEndpoint}`;
    console.log('path:', path);
    dispatch(setRestfulUrl(path));
    window.history.pushState(null, '', `${path}?${queryParams.toString()}`);

    const decodedHeaders = Object.fromEntries(
      Array.from(queryParams.entries()).map(([key, value]) => [
        decodeURIComponent(safeAtob(key) || ''),
        decodeURIComponent(safeAtob(value) || ''),
      ])
    );

    const response = await fetch(endpoint, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...decodedHeaders,
      },
      body:
        body && (method === 'POST' || method === 'PUT' || method === 'PATCH')
          ? JSON.stringify(body)
          : undefined,
    });

    const responseBody = await response.text();

    let parsedBody: unknown;

    try {
      parsedBody = JSON.parse(responseBody);
    } catch (jsonError) {
      parsedBody = responseBody;
    }

    setResponse({
      body: parsedBody as ResponseBody,
      status: response.status,
      statusText: response.statusText,
    });
  } catch (error) {
    let errorMessage: string = 'Error occurred during fetch';
    let status: number | null = null;
    let statusText: string = '';

    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      errorMessage =
        'CORS error: Access to fetch was blocked due to CORS policy. The server did not allow the request from this origin.';
      status = 0;
      statusText = `Error occurred: ${error.message}`;
    } else if (error instanceof Error) {
      errorMessage = `Error occurred: ${error.message}`;
      status = -1;
    }

    setResponse({
      body: null,
      status: status || 500,
      statusText: errorMessage,
    });
  }
};
