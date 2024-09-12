import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import Headers from '../../app/GRAPHQL/Graphiql/Headers';
import { setupStore } from '../../store/store';

describe('Headers Component', () => {
  let store: ReturnType<typeof setupStore>;

  beforeEach(() => {
    store = setupStore();
  });

  it('renders Headers component with initial state', () => {
    render(
      <Provider store={store}>
        <Headers updateUrl={() => {}} />
      </Provider>
    );

    const addButton = screen.getByText(/add headers/i);
    expect(addButton).toBeDisabled();
    expect(screen.getByText('Headers')).toBeInTheDocument();
  });

  it('adds a header when add button is clicked', () => {
    render(
      <Provider store={store}>
        <Headers updateUrl={() => {}} />
      </Provider>
    );

    const toggleButton = screen.getByRole('toggle');
    fireEvent.click(toggleButton);

    const addButton = screen.getByText(/add headers/i);
    fireEvent.click(addButton);

    const newHeaderKeyInput = screen.getByPlaceholderText(/header key/i);
    const newHeaderValueInput = screen.getByPlaceholderText(/header value/i);
    expect(newHeaderKeyInput).toBeInTheDocument();
    expect(newHeaderValueInput).toBeInTheDocument();
  });

  it('updates header when input changes', () => {
    render(
      <Provider store={store}>
        <Headers updateUrl={() => {}} />
      </Provider>
    );

    const keyInput = screen.getByPlaceholderText(
      /header key/i
    ) as HTMLInputElement;
    fireEvent.change(keyInput, { target: { value: 'Authorization' } });

    expect(keyInput.value).toBe('Authorization');
  });

  it('toggles visibility of headers and enables/disables the add button', () => {
    render(
      <Provider store={store}>
        <Headers updateUrl={() => {}} />
      </Provider>
    );

    const headersWrapper = screen.getByTestId('HeadersWrapper');
    const toggleButton = screen.getByRole('toggle');
    const addButton = screen.getByText(/add headers/i);

    expect(headersWrapper).toHaveClass('graphql-hidden-content');
    expect(addButton).toBeDisabled();

    fireEvent.click(toggleButton);
    expect(headersWrapper).not.toHaveClass('graphql-hidden-content');
    expect(addButton).not.toBeDisabled();

    fireEvent.click(toggleButton);
    expect(headersWrapper).toHaveClass('graphql-hidden-content');
    expect(addButton).toBeDisabled();
  });
});
