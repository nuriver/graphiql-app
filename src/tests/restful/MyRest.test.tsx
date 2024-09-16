import { render, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { setupStore } from '../../store/store';
import { ToastContainer } from 'react-toastify';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../i18n';
import MyRest from '../../app/[method]/[[...data]]/MyRest';
import { ResponseState, RestfulHeader } from '../../core/types';

interface TestProps {
  endpoint: string;
  method: string;
  body: string;
  headers: RestfulHeader[];
  MyRestProps: boolean;
  variables?: string;
  url?: string;
  response?: ResponseState | null;
}

const renderComponent = (
  store: ReturnType<typeof setupStore>,
  requestData: TestProps | null = null
) => {
  return render(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <MyRest requestData={requestData} />
        <ToastContainer />
      </I18nextProvider>
    </Provider>
  );
};

describe('MyRest Component', () => {
  it('should dispatch setRestfulStore if requestData is provided', async () => {
    const store = setupStore();
    store.dispatch = jest.fn();

    const requestData = {
      method: 'POST',
      endpoint: 'http://test.com/api',
      body: '{"key": "value"}',
      headers: [{ id: '1', key: 'Content-Type', value: 'application/json' }],
      MyRestProps: true,
    };

    await act(async () => {
      renderComponent(store, requestData);
    });
    expect(store.dispatch).toHaveBeenCalledWith({
      type: 'RestfulSlice/setRestfulStore',
      payload: {
        method: 'POST',
        endpoint: 'http://test.com/api',
        body: '{"key": "value"}',
        headers: [{ id: '1', key: 'Content-Type', value: 'application/json' }],
        response: null,
        url: '',
        variables: '',
      },
    });
  });
});
