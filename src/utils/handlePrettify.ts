export const handlePrettify = (
  body: string,
  isPrettified: boolean
): [string, boolean] => {
  try {
    if (body.trim() === '') {
      return ['', false];
    }

    if (isPrettified) {
      return [body, false];
    }

    const json = JSON.parse(body);
    const prettyJson = JSON.stringify(json, null, 2);
    return [prettyJson, true];
  } catch (e) {
    // console.error('Error formatting JSON:', e);
    return ['Invalid JSON', false];
  }
};
