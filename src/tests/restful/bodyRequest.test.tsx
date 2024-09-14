import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import BodyRequest from '../../app/[method]/bodyRequest';
import restfulReducer from '../../store/restfulSlice';
import { handlePrettify } from '../../utils/handlePrettify';
import { RestfulState } from '../../core/types';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
  },
}));

jest.mock('../../utils/handlePrettify', () => ({
  handlePrettify: jest.fn(),
}));

const renderComponent = (initialBody: string = '') => {
  const store = configureStore({
    reducer: {
      restful: restfulReducer,
    },
    preloadedState: {
      restful: {
        body: initialBody,
        method: 'GET',
        endpoint: '',
        headers: [],
      } as RestfulState,
    },
  });

  const updateUrl = jest.fn();

  render(
    <Provider store={store}>
      <BodyRequest updateUrl={updateUrl} />
    </Provider>
  );
};

describe('BodyRequest', () => {
  it('should render correctly and handle text area changes', () => {
    renderComponent();

    const textArea = screen.getByRole('textbox');
    expect(textArea).toBeInTheDocument();

    // Check text area change
    fireEvent.change(textArea, { target: { value: '{"newKey": "newValue"}' } });
    expect(textArea).toHaveValue('{"newKey": "newValue"}');

    // Check button click
    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(handlePrettify).toHaveBeenCalled();
  });

  it('should display an error toast on invalid JSON', () => {
    (handlePrettify as jest.Mock).mockReturnValue(['Invalid JSON', false]);

    renderComponent();
    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(handlePrettify).toHaveBeenCalled();
    expect(toast.error).toHaveBeenCalledWith('json_warning');
  });
});
