import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { setupStore } from '../../store/store';
import Query from './../../app/GRAPHQL/Graphiql/Query';
import { toast } from 'react-toastify';
import gqlPrettier from 'graphql-prettier';
import { ReactElement } from 'react';

jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
  },
}));

jest.mock('graphql-prettier', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockGqlPrettier = gqlPrettier as jest.MockedFunction<typeof gqlPrettier>;

interface RenderWithProvidersProps {
  ui: ReactElement;
  store?: ReturnType<typeof setupStore>;
}

const renderWithProviders = ({
  ui,
  store = setupStore(),
}: RenderWithProvidersProps) => {
  return render(<Provider store={store}>{ui}</Provider>);
};

describe('Query Component', () => {
  it('renders the Query component', () => {
    renderWithProviders({ ui: <Query updateUrl={jest.fn()} /> });
    expect(screen.getByText(/Query/i)).toBeInTheDocument();
  });

  it('shows an error toast when prettify fails', () => {
    mockGqlPrettier.mockImplementation(() => {
      throw new Error('Invalid query');
    });

    renderWithProviders({ ui: <Query updateUrl={jest.fn()} /> });
    fireEvent.click(screen.getByText(/prettify/i));

    expect(toast.error).toHaveBeenCalledWith('Please enter valid query');
  });

  it('updates the value when query changes in the store', () => {
    const store = setupStore({
      graphiql: {
        endpoint: 'http://example.com/graphql',
        query: 'new query',
        variables: '{}',
        headers: [{ id: '1', key: 'Authorization', value: 'Bearer token' }],
        sdl: 'some SDL data',
      },
    });

    renderWithProviders({ ui: <Query updateUrl={jest.fn()} />, store });
    expect(screen.getByText('new query')).toBeInTheDocument();
  });
});
