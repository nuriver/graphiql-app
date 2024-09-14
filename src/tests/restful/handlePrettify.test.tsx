import { handlePrettify } from '../../utils/handlePrettify';

describe('handlePrettify', () => {
  it('should return empty string and false if body is empty', () => {
    const result = handlePrettify('', false);
    expect(result).toEqual(['', false]);
  });

  it('should return body as is and false if isPrettified is true', () => {
    const body = '{"key":"value"}';
    const result = handlePrettify(body, true);
    expect(result).toEqual([body, false]);
  });

  it('should return prettified JSON and true if body is not prettified', () => {
    const body = '{"key":"value"}';
    const prettyJson = JSON.stringify(JSON.parse(body), null, 2);
    const result = handlePrettify(body, false);
    expect(result).toEqual([prettyJson, true]);
  });

  it('should return "Invalid JSON" and false if body is not valid JSON', () => {
    const body = '{key:value}';
    const result = handlePrettify(body, false);
    expect(result).toEqual(['Invalid JSON', false]);
  });
});
