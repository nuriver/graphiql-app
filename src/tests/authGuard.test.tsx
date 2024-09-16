import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import userEvent from '@testing-library/user-event';
import AuthGuard from '../authorization/AuthGuard';

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(() => ({ currentUser: null })),
  onAuthStateChanged: jest.fn(),
  signOut: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn().mockReturnValue('/some-private-page'),
}));

describe('AuthGuard Component', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it('should render children if user is authenticated', async () => {
    const mockUser = { uid: '123', email: 'test@example.com' };

    (onAuthStateChanged as jest.Mock).mockImplementation((__auth, callback) => {
      callback(mockUser);
      return jest.fn();
    });

    render(
      <AuthGuard>
        <div>Protected Content</div>
      </AuthGuard>
    );

    await waitFor(() => {
      expect(screen.getByText('Protected Content')).toBeInTheDocument();
    });
  });

  it('should redirect to home page if user is not authenticated', async () => {
    (onAuthStateChanged as jest.Mock).mockImplementation((__auth, callback) => {
      callback(null);
      return jest.fn();
    });

    render(
      <AuthGuard>
        <div>Protected Content</div>
      </AuthGuard>
    );

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/');
    });
  });

  it('should log out user after 1 hour of inactivity', async () => {
    jest.useFakeTimers();

    const mockUser = { uid: '123', email: 'test@example.com' };

    (onAuthStateChanged as jest.Mock).mockImplementation((__auth, callback) => {
      callback(mockUser);
      return jest.fn();
    });

    render(
      <AuthGuard>
        <div>Protected Content</div>
      </AuthGuard>
    );

    jest.advanceTimersByTime(60 * 60 * 1000);

    await waitFor(() => {
      expect(signOut).toHaveBeenCalledTimes(1);
      expect(mockPush).toHaveBeenCalledWith('/');
    });

    jest.useRealTimers();
  });

  it('should reset logout timer on user activity', async () => {
    jest.useFakeTimers();

    const mockUser = { uid: '123', email: 'test@example.com' };

    (onAuthStateChanged as jest.Mock).mockImplementation((_auth, callback) => {
      callback(mockUser);
      return jest.fn();
    });

    render(
      <AuthGuard>
        <button>Simulate Activity</button>
        <div>Protected Content</div>
      </AuthGuard>
    );

    jest.advanceTimersByTime(30 * 60 * 1000);

    userEvent.click(screen.getByText('Simulate Activity'));

    jest.advanceTimersByTime(31 * 60 * 1000);

    await waitFor(() => {
      expect(signOut).toHaveBeenCalledTimes(1);
    });

    jest.useRealTimers();
  });
});
