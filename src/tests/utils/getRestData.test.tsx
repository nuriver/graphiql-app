import { getRestData } from '../../app/actions';

describe('getRestData', () => {
  it('should return success true with valid data', async () => {
    const urlString = btoa(
      JSON.stringify({
        endpoint: 'https://example.com/api',
        method: 'GET',
        headers: [{ key: 'Content-Type', value: 'application/json' }],
        body: '',
      })
    );

    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 200,
        statusText: 'OK',
        headers: {
          get: () => 'application/json',
        },
        json: () => Promise.resolve({ data: 'test' }),
      })
    ) as jest.Mock;

    const result = await getRestData(urlString);
    expect(result.success).toBe(true);
    expect(result.data?.status).toBe(200);
    expect(result.data?.body).toEqual({ data: 'test' });
  });

  it('should return success false with invalid data', async () => {
    const urlString = 'invalidData';

    const result = await getRestData(urlString);
    expect(result.success).toBe(false);
  });
});
