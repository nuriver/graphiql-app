import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import SignIn from '../../app/sign-in/page';

// Мокирование Firebase auth
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(() => ({ currentUser: null })),
  signInWithEmailAndPassword: jest.fn(),
}));

// Мокирование useRouter для навигации
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Мокирование useTranslation для перевода
jest.mock('react-i18next', () => ({
  useTranslation: jest.fn().mockReturnValue({
    t: (key: string) => key, // Возвращаем ключ перевода как строку
    i18n: {
      changeLanguage: jest.fn(),
    },
  }),
}));

describe('SignIn Component', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it('should handle successful sign in', async () => {
    const mockAuth = { currentUser: null };
    (signInWithEmailAndPassword as jest.Mock).mockResolvedValue({});

    // Рендерим компонент SignIn
    render(<SignIn />);

    // Заполняем поля email и password
    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText('email'), {
        target: { value: 'test@example.com' },
      });
      fireEvent.change(screen.getByPlaceholderText('password'), {
        target: { value: 'password123##' },
      });
    });

    // Проверяем, что поля содержат введенные значения
    expect(screen.getByPlaceholderText('email')).toHaveValue(
      'test@example.com'
    );
    expect(screen.getByPlaceholderText('password')).toHaveValue(
      'password123##'
    );

    // Ищем кнопку "sign_in" (теперь это ключ перевода)
    const submitButton = screen.getByRole('button', { name: 'sign_in' });
    expect(submitButton).not.toBeDisabled();

    // Кликаем на кнопку
    await act(async () => {
      fireEvent.click(submitButton);
    });

    // Проверяем, что Firebase функция signInWithEmailAndPassword была вызвана
    await waitFor(() => {
      expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
        mockAuth,
        'test@example.com',
        'password123##'
      );
    });

    // Проверяем, что после успешного входа в систему произошел редирект
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/');
    });
  });
});
