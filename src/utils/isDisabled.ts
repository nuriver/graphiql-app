const isDisabled = (fields: (string | undefined)[]): boolean => {
  return fields.some(
    (field) => typeof field === 'string' && field.trim() === ''
  );
};
export default isDisabled;
