import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { AuthProvider, useAuth } from '../authorization/AuthContext';

jest.mock('../authorization/firebase', () => ({
  auth: {},
}));

jest.mock('firebase/auth', () => ({
  onAuthStateChanged: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const TestComponent = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  return <div>{user ? `User: ${user.email}` : 'No user'}</div>;
};

describe('AuthProvider', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it('should show loading while user is being fetched', async () => {
    (onAuthStateChanged as jest.Mock).mockImplementation((_auth, callback) => {
      setTimeout(() => callback(null), 1000);
      return jest.fn();
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should show "No user" when no user is logged in', async () => {
    (onAuthStateChanged as jest.Mock).mockImplementation((_auth, callback) => {
      callback(null);
      return jest.fn();
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() =>
      expect(screen.getByText('No user')).toBeInTheDocument()
    );
  });

  it('should show user email when user is logged in', async () => {
    const mockUser = { email: 'test@example.com' };

    (onAuthStateChanged as jest.Mock).mockImplementation((_auth, callback) => {
      callback(mockUser);
      return jest.fn();
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() =>
      expect(screen.getByText('User: test@example.com')).toBeInTheDocument()
    );
  });
});
