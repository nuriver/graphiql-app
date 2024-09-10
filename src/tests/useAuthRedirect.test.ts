import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import useAuthRedirect from '../hooks/useAuthRedirect';
import { renderHook } from '@testing-library/react';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('firebase/auth', () => ({
  onAuthStateChanged: jest.fn(),
}));

jest.mock('../authorization/firebase', () => ({
  auth: {},
}));

describe('useAuthRedirect', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  it('should redirect to "/" when user is not authenticated', () => {
    (onAuthStateChanged as jest.Mock).mockImplementation((_auth, callback) => {
      callback(null);
      return jest.fn();
    });

    renderHook(() => useAuthRedirect());

    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it('should not redirect when user is authenticated', () => {
    (onAuthStateChanged as jest.Mock).mockImplementation((_auth, callback) => {
      callback({ uid: '123' });
      return jest.fn();
    });

    renderHook(() => useAuthRedirect());

    expect(mockPush).not.toHaveBeenCalled();
  });

  it('should unsubscribe on unmount', () => {
    const unsubscribeMock = jest.fn();

    (onAuthStateChanged as jest.Mock).mockImplementation((_auth) => {
      return unsubscribeMock;
    });

    const { unmount } = renderHook(() => useAuthRedirect());

    unmount();
    expect(unsubscribeMock).toHaveBeenCalled();
  });
});
