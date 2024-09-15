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
    (usePathname as jest.Mock).mockReturnValue('/some/path');
  });

  it('renders with initial value from Redux store', () => {
    const store = mockStore({
      restful: { endpoint: 'http://test.com/api' },
    });

    render(
      <Provider store={store}>
        <Endpoint updateUrl={mockUpdateUrl} />
      </Provider>
    );

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('http://test.com/api');
  });

  it('dispatches setRestfulEndpoint on valid input change', () => {
    const store = mockStore({ restful: { endpoint: '' } });

    render(
      <Provider store={store}>
        <Endpoint updateUrl={mockUpdateUrl} />
      </Provider>
    );

    const input = screen.getByRole('textbox');
    fireEvent.change(input, {
      target: { value: 'http://change-endpoint.com' },
    });

    expect(input).toHaveValue('http://change-endpoint.com');
  });

  it('shows error toast on invalid input change', () => {
    const store = mockStore({ restful: { endpoint: '' } });

    (usePathname as jest.Mock).mockReturnValue('/some/path');

    render(
      <Provider store={store}>
        <Endpoint updateUrl={mockUpdateUrl} />
      </Provider>
    );

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'http://тест.com' } });

    expect(toast.error).toHaveBeenCalledWith('Only Latin letters are allowed');
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
    (usePathname as jest.Mock).mockReturnValue('/api/test');

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
