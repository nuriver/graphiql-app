import getRequestHistory from '../../utils/getRequestHistory';

describe('getRequestHistory', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('should return parsed historyStack when localStorage has historyStack', () => {
    const mockHistoryStack = [{ id: 1, request: 'GET /api/data' }];
    localStorage.setItem('historyStack', JSON.stringify(mockHistoryStack));

    const result = getRequestHistory();
    expect(result).toEqual(mockHistoryStack);
  });

  test('should return false when localStorage does not have historyStack', () => {
    const result = getRequestHistory();
    expect(result).toBe(false);
  });
});
