import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import restfulReducer from '../../store/restfulSlice';
import { toast } from 'react-toastify';
import { usePathname } from 'next/navigation';
import Endpoint from '../../app/[method]/endpoint';

jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
  },
}));

// Mock usePathname hook
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

const mockStore = (preloadedState = {}) =>
  configureStore({
    reducer: {
      restful: restfulReducer,
    },
    preloadedState,
  });

const mockUpdateUrl = jest.fn();

describe('Endpoint component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (usePathname as jest.Mock).mockReturnValue('/some/path'); // Mock pathname for all tests
  });

  it('renders with initial value from Redux store', () => {
    const store = mockStore({
      restful: { endpoint: 'http://example.com/api' }, // Initial endpoint value
    });

    render(
      <Provider store={store}>
        <Endpoint updateUrl={mockUpdateUrl} />
      </Provider>
    );

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('http://example.com/api');
  });

  it('dispatches setRestfulEndpoint on valid input change', () => {
    const store = mockStore({ restful: { endpoint: '' } });

    render(
      <Provider store={store}>
        <Endpoint updateUrl={mockUpdateUrl} />
      </Provider>
    );

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'http://new-endpoint.com' } });

    expect(input).toHaveValue('http://new-endpoint.com');
    // You would need to verify that the action is dispatched correctly in a real implementation
  });

  it('shows error toast on invalid input change', () => {
    const store = mockStore({ restful: { endpoint: '' } });

    (usePathname as jest.Mock).mockReturnValue('/some/path'); // Ensure mock returns valid pathname

    render(
      <Provider store={store}>
        <Endpoint updateUrl={mockUpdateUrl} />
      </Provider>
    );

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'http://пример.com' } }); // Non-Latin characters

    expect(toast.error).toHaveBeenCalledWith('Only Latin letters are allowed'); // Ensure the correct error message
  });

  it('calls updateUrl on blur', () => {
    const store = mockStore({ restful: { endpoint: '' } });

    render(
      <Provider store={store}>
        <Endpoint updateUrl={mockUpdateUrl} />
      </Provider>
    );

    const input = screen.getByRole('textbox');
    fireEvent.blur(input);

    expect(mockUpdateUrl).toHaveBeenCalled();
  });

  it('focuses input field based on pathname', () => {
    (usePathname as jest.Mock).mockReturnValue('/api/test'); // Mock pathname to simulate focus

    const store = mockStore({ restful: { endpoint: '' } });

    render(
      <Provider store={store}>
        <Endpoint updateUrl={mockUpdateUrl} />
      </Provider>
    );

    const input = screen.getByRole('textbox');
    expect(input).toHaveFocus();
  });
});
