import { render, screen, fireEvent } from '@testing-library/react';
import Main from '../../components/Main';
import { I18nextProvider } from 'react-i18next';
import { useAuth } from '../../authorization/AuthContext';
import { useRouter } from 'next/navigation';
import i18n from '../../../i18n';
import { act } from 'react';

jest.mock('../../authorization/AuthContext', () => ({
  useAuth: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('../../app/loading', () => jest.fn(() => <div>Loading...</div>));

describe('Main component', () => {
  let mockRouterPush: jest.Mock;

  beforeEach(() => {
    mockRouterPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockRouterPush,
    });

    i18n.changeLanguage('en');
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  test('renders loading state when loading is true', async () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      loading: true,
    });

    render(
      <I18nextProvider i18n={i18n}>
        <Main />
      </I18nextProvider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders content for authenticated user after delay', async () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: { displayName: 'Ryan Gosling' },
      loading: false,
    });

    render(
      <I18nextProvider i18n={i18n}>
        <Main />
      </I18nextProvider>
    );

    await act(async () => {
      jest.runAllTimers();
    });

    expect(screen.getByText(/welcome/i)).toBeInTheDocument();
    expect(screen.getByText(/Ryan Gosling/i)).toBeInTheDocument();
    expect(screen.getByText(/main page/i)).toBeInTheDocument();
    expect(screen.getByText(/help/i)).toBeInTheDocument();
  });

  test('renders content for unauthenticated user after delay', async () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      loading: false,
    });

    render(
      <I18nextProvider i18n={i18n}>
        <Main />
      </I18nextProvider>
    );

    await act(async () => {
      jest.runAllTimers();
    });

    expect(screen.getByText(/welcome/i)).toBeInTheDocument();
    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
    expect(screen.getByText(/sign up/i)).toBeInTheDocument();
  });

  test('redirects to sign-in page when Sign In button is clicked', async () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      loading: false,
    });

    render(
      <I18nextProvider i18n={i18n}>
        <Main />
      </I18nextProvider>
    );

    await act(async () => {
      jest.runAllTimers();
    });

    const signInButton = screen.getByText(/sign in/i);
    fireEvent.click(signInButton);

    expect(mockRouterPush).toHaveBeenCalledWith('/sign-in');
  });

  test('redirects to sign-up page when Sign Up button is clicked', async () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      loading: false,
    });

    render(
      <I18nextProvider i18n={i18n}>
        <Main />
      </I18nextProvider>
    );

    await act(async () => {
      jest.runAllTimers();
    });

    const signUpButton = screen.getByText(/sign up/i);
    fireEvent.click(signUpButton);

    expect(mockRouterPush).toHaveBeenCalledWith('/sign-up');
  });
});
