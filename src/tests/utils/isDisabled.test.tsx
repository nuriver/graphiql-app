import isDisabled from '../../utils/isDisabled';

describe('isDisabled', () => {
  it('should return true if any field is an empty string', () => {
    expect(isDisabled(['field1', 'field2', ''])).toBe(true);
    expect(isDisabled(['', 'field2', 'field3'])).toBe(true);
    expect(isDisabled(['field1', 'field2', 'field3', ''])).toBe(true);
  });

  it('should return false if no fields are empty strings', () => {
    expect(isDisabled(['field1', 'field2', 'field3'])).toBe(false);
    expect(isDisabled(['field1', 'field2', 'field3', 'field4'])).toBe(false);
  });

  it('should return true if all fields are empty strings', () => {
    expect(isDisabled(['', '', ''])).toBe(true);
  });

  it('should return false for an empty array', () => {
    expect(isDisabled([])).toBe(false);
  });

  it('should handle fields with only spaces', () => {
    expect(isDisabled([' ', 'field2', 'field3'])).toBe(true);
    expect(isDisabled(['field1', 'field2', 'field3', '   '])).toBe(true);
  });
});
