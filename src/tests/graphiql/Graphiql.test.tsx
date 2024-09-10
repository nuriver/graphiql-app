import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Graphiql from '../../app/GRAPHQL/Graphiql/Graphiql';

type RootState = {
  graphiql: {
    endpoint: string;
    query: string;
    variables: string;
    headers: Array<{ id: number; key: string; value: string }>;
    sdl: string;
  };
};

type SelectorFn<T> = (state: RootState) => T;

jest.mock('react-toastify/dist/ReactToastify.css', () => {});

jest.mock('../../store/store.ts', () => ({
  useAppDispatch: () => jest.fn(),
  useAppSelector: (fn: SelectorFn<RootState>) =>
    fn({
      graphiql: {
        endpoint: 'http://example.com/graphql',
        query: '{ posts { id title } }',
        variables: '{}',
        headers: [{ id: 1, key: 'Authorization', value: 'Bearer token' }],
        sdl: 'some SDL data',
      },
    } as RootState),
}));

jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
  },
}));

describe('Graphiql Component', () => {
  const mockStore = configureStore([]);
  let store: ReturnType<typeof mockStore>;

  const mockSendClickHandler = jest.fn();
  const mockGetSchemaHandler = jest.fn();

  beforeEach(() => {
    store = mockStore({
      graphiql: {
        endpoint: 'http://example.com/graphql',
        query: '{ posts { id title } }',
        variables: '{}',
        headers: [{ id: 1, key: 'Authorization', value: 'Bearer token' }],
        sdl: 'some SDL data',
        url: '',
      },
    });
  });

  it('renders the Graphiql component with all inputs', () => {
    render(
      <Provider store={store}>
        <Graphiql
          sendClickHandler={mockSendClickHandler}
          getSchemaHandler={mockGetSchemaHandler}
          isRedirected={false}
        />
      </Provider>
    );

    expect(screen.getByText('GraphiQL Client')).toBeInTheDocument();
    expect(screen.getByText('Endpoint URL')).toBeInTheDocument();
    expect(screen.getByText('Headers')).toBeInTheDocument();
    expect(screen.getByText('Query')).toBeInTheDocument();
    expect(screen.getByText('Variables')).toBeInTheDocument();
  });
});
