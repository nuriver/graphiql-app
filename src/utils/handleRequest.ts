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
  Object.entries(headers || {}).forEach(([key, value]) => {
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
        Accept: 'application/json',
        ...decodedHeaders,
      },
      body:
        method === 'POST' || method === 'PUT' || method === 'PATCH'
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
      statusText: response.statusText || 'Request successful',
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

    console.error(errorMessage);

    setResponse({
      body: null,
      status: status,
      statusText: errorMessage,
    });
  }
};
