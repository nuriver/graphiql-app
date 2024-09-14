import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import SignUp from '../../app/sign-up/page';

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(() => ({ currentUser: null })),
  createUserWithEmailAndPassword: jest.fn(),
  updateProfile: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('SignUp Component', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it('should handle successful sign up', async () => {
    const mockAuth = { currentUser: null };
    (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue({
      user: { email: 'test@example.com' },
    });

    render(<SignUp />);

    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText('name'), {
        target: { value: 'Test User' },
      });
      fireEvent.change(screen.getByPlaceholderText('email'), {
        target: { value: 'test@example.com' },
      });
      fireEvent.change(screen.getByPlaceholderText('password'), {
        target: { value: 'password123#' },
      });
      fireEvent.change(
        screen.getByPlaceholderText('password confirmation is required'),
        {
          target: { value: 'password123#' },
        }
      );
    });

    const submitButton = screen.getByRole('button', { name: /sign up/i });
    expect(submitButton).not.toBeDisabled();

    await act(async () => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
        mockAuth,
        'test@example.com',
        'password123#'
      );
    });

    await waitFor(() => {
      expect(updateProfile).toHaveBeenCalledTimes(1);
      expect(updateProfile).toHaveBeenCalledWith(
        { email: 'test@example.com' },
        { displayName: 'Test User' }
      );
    });

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/');
    });
  });

  it('should handle sign up error', async () => {
    (createUserWithEmailAndPassword as jest.Mock).mockRejectedValue(
      new Error('Firebase: Error (auth/email-already-in-use).')
    );

    render(<SignUp />);

    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText('name'), {
        target: { value: 'Test User' },
      });
      fireEvent.change(screen.getByPlaceholderText('email'), {
        target: { value: 'test@example.com' },
      });
      fireEvent.change(screen.getByPlaceholderText('password'), {
        target: { value: 'password123#' },
      });
      fireEvent.change(
        screen.getByPlaceholderText('password confirmation is required'),
        {
          target: { value: 'password123#' },
        }
      );
    });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /sign up/i }));
    });

    await waitFor(() => {
      expect(
        screen.getByText(/Error: Email Already In Use/i)
      ).toBeInTheDocument();
    });
  });
});
