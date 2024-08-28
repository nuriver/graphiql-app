export const isDisabled = (fields: string[]): boolean => {
  return fields.some((field) => field.trim() === '');
};
export default isDisabled;
