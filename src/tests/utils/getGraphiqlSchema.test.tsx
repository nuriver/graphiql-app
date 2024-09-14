import { getGraphiqlSchema } from '../../app/actions';

describe('getGraphiqlSchema', () => {
  it('should return success true with valid SDL endpoint', async () => {
    const sdlUrl = 'https://example.com/sdl';

    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve({ data: 'schema' }),
      })
    ) as jest.Mock;

    const result = await getGraphiqlSchema(sdlUrl);
    expect(result.success).toBe(true);
    expect(result.data).toBe(JSON.stringify({ data: 'schema' }, null, 2));
  });

  it('should return success false with invalid SDL endpoint', async () => {
    const sdlUrl = 'https://example.com/sdl';

    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 400,
        json: () => Promise.resolve({ error: 'Invalid SDL' }),
      })
    ) as jest.Mock;

    const result = await getGraphiqlSchema(sdlUrl);
    expect(result.success).toBe(false);
    expect(result.error).toBe('Please enter valid SDL endpoint');
  });
});
