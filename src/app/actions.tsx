'use server';

import { GraphiqlState, HistoryObject } from '../core/types';
import introspectionQuery from '../data/introspectionQuery';

function isError(error: unknown): error is Error {
  return typeof error === 'object' && error !== null && 'message' in error;
}

export const getGraphiqlData = async (urlData: string) => {
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
      error: isError(error)
        ? 'Please fill in correctly all necessary request data.'
        : 'Unknown error',
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
