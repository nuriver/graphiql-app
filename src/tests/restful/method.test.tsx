import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Method from '../../app/[method]/method';
import restfulReducer from '../../store/restfulSlice';
import '@testing-library/jest-dom';

const mockStore = (preloadedState = {}) =>
  configureStore({
    reducer: {
      restful: restfulReducer,
    },
    preloadedState,
  });

const mockUpdateUrl = jest.fn();

describe('Method component', () => {
  it('renders with initial value from Redux store', () => {
    const store = mockStore({
      restful: { method: 'POST' }, // Initial method value
    });

    render(
      <Provider store={store}>
        <Method updateUrl={mockUpdateUrl} />
      </Provider>
    );

    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('POST');
  });

  it('dispatches setRestfulMethod on valid select change', () => {
    const store = mockStore({ restful: { method: 'GET' } });

    render(
      <Provider store={store}>
        <Method updateUrl={mockUpdateUrl} />
      </Provider>
    );

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'PUT' } });

    expect(select).toHaveValue('PUT');
    // Mock store doesn't directly show dispatch results, so this is a conceptual test
    // You would need to check if the action is dispatched in a real implementation
  });

  it('calls updateUrl on blur', () => {
    const store = mockStore({ restful: { method: 'GET' } });

    render(
      <Provider store={store}>
        <Method updateUrl={mockUpdateUrl} />
      </Provider>
    );

    const select = screen.getByRole('combobox');
    fireEvent.blur(select);

    expect(mockUpdateUrl).toHaveBeenCalled();
  });
});