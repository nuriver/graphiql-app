import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import restfulReducer from '../../store/restfulSlice';
import Headers from '../../app/[method]/headers';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

const store = configureStore({
  reducer: {
    restful: restfulReducer,
  },
});

describe('Headers component contentToggle function', () => {
  test('toggles content visibility and button state', () => {
    render(
      <Provider store={store}>
        <Headers updateUrl={() => {}} />
      </Provider>
    );

    const restHeaderWrapper = screen.getByTestId('restful-headers-wrapper');
    const addHeaderButton = screen.getByRole('button', { name: 'add_header' });
    expect(restHeaderWrapper).toHaveClass('restful-hidden-content');
    expect(addHeaderButton).toBeEnabled();

    const toggleButton = screen.getByRole('button', { name: '' });
    fireEvent.click(toggleButton);

    expect(restHeaderWrapper).not.toHaveClass('restful-hidden-content');
    expect(addHeaderButton).toBeDisabled();

    fireEvent.click(toggleButton);

    expect(restHeaderWrapper).toHaveClass('restful-hidden-content');
    expect(addHeaderButton).toBeEnabled();
  });
});
