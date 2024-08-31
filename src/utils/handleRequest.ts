import { HandleRequestProps, ResponseBody } from '../core/types';

export const handleRequest = async ({
  endpoint,
  method,
  body,
  headers,
  setResponse,
}: HandleRequestProps) => {
  console.log('handleRequest called');

  const queryParams = new URLSearchParams();

  Object.entries(headers).forEach(([key, value]) => {
    queryParams.append(
      btoa(encodeURIComponent(key)),
      btoa(encodeURIComponent(value))
    );
  });

  try {
    const encodedEndpoint = btoa(endpoint);
    const encodedBody = body ? btoa(JSON.stringify(body)) : '';

    const path = body
      ? `/${method}/${encodedEndpoint}/${encodedBody}`
      : `/${method}/${encodedEndpoint}`;

    window.history.pushState(null, '', `${path}?${queryParams.toString()}`);

    const decodedHeaders = Object.fromEntries(
      Array.from(queryParams.entries()).map(([key, value]) => [
        decodeURIComponent(atob(key)),
        decodeURIComponent(atob(value)),
      ])
    );

    const response = await fetch(endpoint, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        ...decodedHeaders,
      },
      body:
        method === 'POST' || method === 'PUT' || method === 'PATCH'
          ? JSON.stringify(body)
          : undefined,
    });

    const responseBody = await response.json();

    setResponse({
      body: responseBody as ResponseBody,
      status: response.status,
      statusText: response.statusText,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error occurred during fetch:', error.message);
      setResponse({
        body: null,
        status: null,
        statusText: 'Error occurred: ' + error.message,
      });
    }
  }
};
