import addToHistory from '../../utils/addToHistory';
import { HistoryObject } from '../../core/types';

describe('addToHistory', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should add a history object to an empty history stack', () => {
    const historyObject: HistoryObject = {
      method: 'GET',
      endpoint: '/api/v1/users',
      url: 'https://example.com/api/v1/users',
    };
    addToHistory(historyObject);

    const historyStackStringified = localStorage.getItem('historyStack');
    const historyStack = historyStackStringified
      ? JSON.parse(historyStackStringified)
      : [];
    expect(historyStack).toEqual([historyObject]);
  });

  it('should add a history object to an existing history stack', () => {
    const initialHistoryObject: HistoryObject = {
      method: 'POST',
      endpoint: '/api/v1/users',
      url: 'https://example.com/api/v1/users',
    };
    localStorage.setItem(
      'historyStack',
      JSON.stringify([initialHistoryObject])
    );

    const newHistoryObject: HistoryObject = {
      method: 'DELETE',
      endpoint: '/api/v1/users/1',
      url: 'https://example.com/api/v1/users/1',
    };
    addToHistory(newHistoryObject);

    const historyStackStringified = localStorage.getItem('historyStack');
    const historyStack = historyStackStringified
      ? JSON.parse(historyStackStringified)
      : [];
    expect(historyStack).toEqual([initialHistoryObject, newHistoryObject]);
  });

  it('should handle multiple history objects correctly', () => {
    const historyObjects: HistoryObject[] = [
      {
        method: 'GET',
        endpoint: '/api/v1/users',
        url: 'https://example.com/api/v1/users',
      },
      {
        method: 'POST',
        endpoint: '/api/v1/users',
        url: 'https://example.com/api/v1/users',
      },
      {
        method: 'DELETE',
        endpoint: '/api/v1/users/1',
        url: 'https://example.com/api/v1/users/1',
      },
    ];

    historyObjects.forEach((obj) => addToHistory(obj));

    const historyStackStringified = localStorage.getItem('historyStack');
    const historyStack = historyStackStringified
      ? JSON.parse(historyStackStringified)
      : [];
    expect(historyStack).toEqual(historyObjects);
  });
});
