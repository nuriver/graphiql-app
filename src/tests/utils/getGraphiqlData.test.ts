import { getGraphiqlData } from '../../app/actions';

describe('getGraphiqlData', () => {
  it('should return success true with valid data', async () => {
    const urlData = btoa(
      JSON.stringify({
        endpoint: 'https://example.com/graphql',
        query: '{ test }',
        variables: '{}',
        headers: [{ key: 'Content-Type', value: 'application/json' }],
      })
    );

    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 200,
        statusText: 'OK',
        json: () => Promise.resolve({ data: 'test' }),
      })
    ) as jest.Mock;

    const result = await getGraphiqlData(urlData);
    expect(result.success).toBe(true);
    expect(result.data?.status).toBe(200);
    expect(result.data?.body).toEqual({ data: 'test' });
  });

  it('should return success false with invalid data', async () => {
    const urlData = 'invalidData';

    const result = await getGraphiqlData(urlData);
    expect(result.success).toBe(false);
    expect(result.error).toBe(
      'Please fill in correctly all necessary request data.'
    );
  });
});
