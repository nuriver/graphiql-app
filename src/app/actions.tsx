'use server';

import { GraphiqlState, HistoryObject, RestfulState } from '../core/types';
import introspectionQuery from '../data/introspectionQuery';

function isError(error: unknown): error is Error {
  return typeof error === 'object' && error !== null && 'message' in error;
}

export const getGraphiqlData = async (urlData: string) => {
  try {
    const decodedRequestData = atob(decodeURIComponent(urlData));
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

    const contentType = res.headers.get('Content-Type') || '';
    let graphiqlData;

    if (res.status >= 200 && res.status < 300) {
      if (contentType.includes('application/json')) {
        graphiqlData = await res.json();
      } else {
        graphiqlData = await res.text();
      }
    } else if (res.status === 204) {
      graphiqlData = '';
    }

    const historyObject: HistoryObject = {
      method: 'GRAPHQL',
      endpoint: requestData.endpoint,
      url: urlData,
    };

    return {
      success: true,
      data: {
        status: res.status,
        statusText: res.statusText,
        body: graphiqlData,
      },
      history: historyObject,
    };
  } catch (error) {
    return {
      success: false,
      error: isError(error) ? error.message : 'Unknown error',
    };
  }
};

export const getGraphiqlSchema = async (sdlUrl: string) => {
  try {
    const res = await fetch(sdlUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: introspectionQuery,
      }),
    });

    if (res.status !== 200) {
      throw new Error('Please enter valid SDL endpoint');
    }

    const schema = await res.json();
    const schemaJson = JSON.stringify(schema, null, 2);

    return {
      success: true,
      data: schemaJson,
    };
  } catch (error) {
    return {
      success: false,
      error: isError(error)
        ? 'Please enter valid SDL endpoint'
        : 'Unknown error',
    };
  }
};

export const getRestData = async (urlString: string) => {
  try {
    let decodedRequestData;
    try {
      decodedRequestData = atob(urlString);
    } catch (err) {
      throw new Error('Invalid base64 string');
    }
    const requestData: RestfulState = JSON.parse(decodedRequestData);
    const receivedHeaders = requestData.headers;
    const headersObject = receivedHeaders.reduce<Record<string, string>>(
      (acc, header) => {
        if (header.key) {
          acc[header.key] = header.value;
        }
        return acc;
      },
      {}
    );
    const body = requestData.body;
    const method = requestData.method;
    if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
      try {
        JSON.parse(body);
      } catch (err) {
        throw new Error('Invalid JSON body');
      }
    }

    const result = await fetch(requestData.endpoint, {
      method: requestData.method,
      headers: {
        ...headersObject,
      },
      body:
        body && (method === 'POST' || method === 'PUT' || method === 'PATCH')
          ? body
          : undefined,
    });

    const contentType = result.headers.get('Content-Type') || '';
    let restfulData;

    if (result.status >= 200 && result.status < 300) {
      if (contentType.includes('application/json')) {
        restfulData = await result.json();
      } else {
        restfulData = await result.text();
      }
    } else if (result.status === 204) {
      restfulData = '';
    }

    const historyRestObject: HistoryObject = {
      method: method,
      endpoint: requestData.endpoint,
      url: urlString,
    };

    return {
      success: true,
      data: {
        status: result.status,
        statusText: result.statusText,
        body: restfulData,
      },
      history: historyRestObject,
    };
  } catch (error) {
    return {
      success: false,
      error: isError(error) ? error.message : 'Unknown error',
    };
  }
};
