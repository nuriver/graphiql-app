import { render, fireEvent } from '@testing-library/react';
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
    const { container } = render(
      <Provider store={store}>
        <Headers updateUrl={() => {}} />
      </Provider>
    );

    expect(container.firstChild).toHaveClass('restful-hidden-content');

    const toggleButton = container.querySelector('.content-toggle-button');
    expect(toggleButton).not.toBeNull();

    if (toggleButton) {
      fireEvent.click(toggleButton);

      expect(container.firstChild).not.toHaveClass('restful-hidden-content');

      const addHeaderButton = container.querySelector('.add-headers-button');
      expect(addHeaderButton).not.toBeNull();

      if (addHeaderButton) {
        expect(addHeaderButton).toBeEnabled();

        fireEvent.click(toggleButton);

        expect(container.firstChild).toHaveClass('restful-hidden-content');
      }
    }
  });
});
