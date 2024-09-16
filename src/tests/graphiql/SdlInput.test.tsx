import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { setupStore } from '../../store/store';
import SdlInput from '../../app/GRAPHQL/Graphiql/SdlInput';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../i18n';

jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
  },
}));

describe('SdlInput component', () => {
  const updateUrlMock = jest.fn();
  const getSchemaHandlerMock = jest.fn();

  const store = setupStore();
  const setup = () =>
    render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <SdlInput
            updateUrl={updateUrlMock}
            getSchemaHandler={getSchemaHandlerMock}
          />
        </I18nextProvider>
      </Provider>
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders input and button', () => {
    setup();
    const input = screen.getByLabelText('SDL URL');
    const button = screen.getByText('GET SCHEMA');

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('updates the value when valid input is provided', () => {
    setup();
    const input = screen.getByLabelText('SDL URL') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'http://valid-url.com' } });

    expect(input.value).toBe('http://valid-url.com');
    expect(store.getState().graphiql.sdl).toBe('http://valid-url.com');
  });

  it('calls updateUrl on input blur', () => {
    setup();
    const input = screen.getByLabelText('SDL URL');
    fireEvent.blur(input);

    expect(updateUrlMock).toHaveBeenCalledTimes(1);
  });

  it('calls getSchemaHandler when button is clicked', () => {
    setup();
    const button = screen.getByText('GET SCHEMA');
    fireEvent.click(button);

    expect(getSchemaHandlerMock).toHaveBeenCalledTimes(1);
  });
});
