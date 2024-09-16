import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { setupStore } from '../../store/store';
import Variables from './../../app/GRAPHQL/Graphiql/Variables';
import { ReactElement } from 'react';

jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
  },
}));

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

describe('Variables Component', () => {
  it('renders the Variables component', () => {
    renderWithProviders({ ui: <Variables updateUrl={jest.fn()} /> });
    expect(screen.getByText(/variables/i)).toBeInTheDocument();
  });

  it('toggles the visibility of the variables editor', () => {
    renderWithProviders({ ui: <Variables updateUrl={jest.fn()} /> });

    const toggleButton = screen.getByRole('toggle');
    const variablesWrapper = screen.getByRole('region');

    expect(variablesWrapper).toHaveClass('graphql-hidden-content');

    fireEvent.click(toggleButton);

    expect(variablesWrapper).not.toHaveClass('graphql-hidden-content');

    fireEvent.click(toggleButton);
    expect(variablesWrapper).toHaveClass('graphql-hidden-content');
  });

  it('updates the value in the VariablesCodeEditor component', () => {
    const store = setupStore({
      graphiql: {
        endpoint: 'http://example.com/graphql',
        query: 'new query',
        variables: '{"key": "value"}',
        headers: [{ id: '1', key: 'Authorization', value: 'Bearer token' }],
        sdl: 'some SDL data',
      },
    });

    renderWithProviders({ ui: <Variables updateUrl={jest.fn()} />, store });

    expect(screen.getByText(/key/i)).toBeInTheDocument();
  });
});
