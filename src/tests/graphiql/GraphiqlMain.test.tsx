import { render, screen, fireEvent, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import GraphiqlMain from '../../app/GRAPHQL/[[...slug]]/GraphiqlMain';
import { GraphiqlState } from '../../core/types';
import { ToastContainer } from 'react-toastify';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../i18n';
import { setupStore } from '../../store/store';

type AppStore = ReturnType<typeof setupStore>;

const renderComponent = (
  store: AppStore,
  requestData: GraphiqlState | null,
  isRedirected: boolean
) => {
  return render(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <GraphiqlMain requestData={requestData} isRedirected={isRedirected} />
        <ToastContainer />
      </I18nextProvider>
    </Provider>
  );
};
describe('GraphiqlMain Component', () => {
  it('should render without crashing', async () => {
    const store = setupStore();
    await act(async () => {
      renderComponent(store, null, false);
    });
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('should dispatch resetGraphiqlStore if requestData is null', async () => {
    const store = setupStore();
    store.dispatch = jest.fn();
    await act(async () => {
      renderComponent(store, null, false);
    });
    expect(store.dispatch).toHaveBeenCalledWith({
      type: 'graphiql/resetGraphiqlStore',
    });
  });

  it('should dispatch setGraphiqlStore if requestData is provided', async () => {
    const store = setupStore();
    store.dispatch = jest.fn();
    const requestData: GraphiqlState = {
      endpoint: 'http://example.com/graphql',
      sdl: 'http://example.com/sdl',
      query: '',
      variables: '',
      headers: [],
    };
    await act(async () => {
      renderComponent(store, requestData, false);
    });
    expect(store.dispatch).toHaveBeenCalledWith({
      type: 'graphiql/setGraphiqlStore',
      payload: requestData,
    });
  });

  it('should show loading component when isLoading is true', async () => {
    const store = setupStore();
    await act(async () => {
      renderComponent(store, null, false);
    });

    await act(async () => {
      fireEvent.click(screen.getByText(/send request/i));
    });

    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('should show toast error when request fails', async () => {
    const store = setupStore();
    await act(async () => {
      renderComponent(store, null, false);
    });

    await act(async () => {
      fireEvent.click(screen.getByText(/send request/i));
    });

    await act(async () => {
      const warnings = await screen.findAllByText(
        'Please fill in correctly all necessary request data'
      );
      expect(warnings[0]).toBeInTheDocument();
    });
  });
});
