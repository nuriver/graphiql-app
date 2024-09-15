import { getGraphiqlData } from '../../app/actions';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

describe('getGraphiqlData', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should return data on successful fetch with JSON response', async () => {
    const mockResponse = { data: 'test' };
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

    const urlData = encodeURIComponent(
      btoa(
        JSON.stringify({
          endpoint: 'https://example.com/graphql',
          query: '{ test }',
          variables: '{}',
          headers: [{ key: 'Authorization', value: 'Bearer token' }],
        })
      )
    );

    const result = await getGraphiqlData(urlData);

    expect(result).toEqual({
      success: true,
      data: {
        status: 200,
        statusText: 'OK',
        body: mockResponse,
      },
      history: {
        method: 'GRAPHQL',
        endpoint: 'https://example.com/graphql',
        url: urlData,
      },
    });
  });

  it('should return data on successful fetch with text response', async () => {
    const mockResponse = 'test';
    fetchMock.mockResponseOnce(mockResponse, {
      status: 200,
      headers: { 'Content-Type': 'text/plain' },
    });

    const urlData = encodeURIComponent(
      btoa(
        JSON.stringify({
          endpoint: 'https://example.com/graphql',
          query: '{ test }',
          variables: '{}',
          headers: [{ key: 'Authorization', value: 'Bearer token' }],
        })
      )
    );

    const result = await getGraphiqlData(urlData);

    expect(result).toEqual({
      success: true,
      data: {
        status: 200,
        statusText: 'OK',
        body: mockResponse,
      },
      history: {
        method: 'GRAPHQL',
        endpoint: 'https://example.com/graphql',
        url: urlData,
      },
    });
  });

  it('should handle fetch error', async () => {
    fetchMock.mockRejectOnce(new Error('Fetch error'));

    const urlData = encodeURIComponent(
      btoa(
        JSON.stringify({
          endpoint: 'https://example.com/graphql',
          query: '{ test }',
          variables: '{}',
          headers: [{ key: 'Authorization', value: 'Bearer token' }],
        })
      )
    );

    const result = await getGraphiqlData(urlData);

    expect(result).toEqual({
      success: false,
      error: 'Fetch error',
    });
  });
});
