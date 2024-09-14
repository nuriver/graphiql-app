import { render, screen, fireEvent, act } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import { useAuth } from '../../authorization/AuthContext';
import i18n from '../../../i18n';
import Header from '../../components/Header';
import { getAuth, signOut } from 'firebase/auth';

jest.mock('../../authorization/AuthContext', () => ({
  useAuth: jest.fn(),
}));

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  signOut: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

describe('Header component', () => {
  beforeEach(() => {
    act(() => {
      i18n.changeLanguage('en');
    });
  });

  test('should render Header component correctly', () => {
    (useAuth as jest.Mock).mockReturnValue({ user: null });

    render(
      <I18nextProvider i18n={i18n}>
        <Header />
      </I18nextProvider>
    );

    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
    expect(screen.getByText(/sign up/i)).toBeInTheDocument();
    expect(screen.getByText(/RU/i)).toBeInTheDocument();
    expect(screen.getByText(/ENG/i)).toBeInTheDocument();
  });

  test('should toggle language when switch is clicked', async () => {
    (useAuth as jest.Mock).mockReturnValue({ user: null });

    render(
      <I18nextProvider i18n={i18n}>
        <Header />
      </I18nextProvider>
    );

    const toggleInput = screen.getByRole('checkbox');

    expect(i18n.language).toBe('en');

    fireEvent.click(toggleInput);

    await act(async () => {
      expect(i18n.language).toBe('ru');
    });
  });

  test('should render sign out button when user is authenticated (RU)', async () => {
    await act(async () => {
      i18n.changeLanguage('ru');
    });

    (useAuth as jest.Mock).mockReturnValue({ user: { uid: '12345' } });

    render(
      <I18nextProvider i18n={i18n}>
        <Header />
      </I18nextProvider>
    );

    expect(screen.getByText(/выйти/i)).toBeInTheDocument();
  });

  test('should call signOut and redirect on sign out button click (RU)', async () => {
    await act(async () => {
      i18n.changeLanguage('ru');
    });

    (useAuth as jest.Mock).mockReturnValue({ user: { uid: '12345' } });
    (signOut as jest.Mock).mockResolvedValueOnce({ success: true });

    render(
      <I18nextProvider i18n={i18n}>
        <Header />
      </I18nextProvider>
    );

    const signOutButton = screen.getByText(/выйти/i);

    fireEvent.click(signOutButton);

    expect(signOut).toHaveBeenCalledWith(getAuth());
  });
});
