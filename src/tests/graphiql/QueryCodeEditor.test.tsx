import React, { ReactElement } from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../i18n';
import { RootState, setupStore } from '../../store/store';
import QueryCodeEditor from '../../app/GRAPHQL/Graphiql/QueryCodeEditor';

interface RenderWithProvidersOptions {
  reduxState?: Partial<RootState>;
}

const renderWithProviders = (
  ui: ReactElement,
  { reduxState }: RenderWithProvidersOptions = {}
) => {
  const store = setupStore(reduxState);
  return render(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <ToastContainer />
        {ui}
      </I18nextProvider>
    </Provider>
  );
};

describe('QueryCodeEditor', () => {
  const mockUpdateUrl = jest.fn();
  const mockSetValue = jest.fn();

  it('renders the CodeMirror component', () => {
    const { getByRole } = renderWithProviders(
      <QueryCodeEditor
        updateUrl={mockUpdateUrl}
        value=""
        setValue={mockSetValue}
      />
    );
    expect(getByRole('editor')).toBeInTheDocument();
  });

  it('shows a toast error on invalid input', () => {
    const { getByRole, getByText } = renderWithProviders(
      <QueryCodeEditor
        updateUrl={mockUpdateUrl}
        value=""
        setValue={mockSetValue}
      />
    );
    const editor = getByRole('editor');
    fireEvent.keyDown(editor, { key: '🚀' });
    expect(getByText('Only Latin letters are allowed')).toBeInTheDocument();
  });

  it('prevents invalid key input', () => {
    const { getByRole } = renderWithProviders(
      <QueryCodeEditor
        updateUrl={mockUpdateUrl}
        value=""
        setValue={mockSetValue}
      />
    );
    const editor = getByRole('editor');
    fireEvent.keyDown(editor, { key: '🚀' });
    expect(mockSetValue).not.toHaveBeenCalled();
  });

  it('calls updateUrl on blur', () => {
    const { getByRole } = renderWithProviders(
      <QueryCodeEditor
        updateUrl={mockUpdateUrl}
        value=""
        setValue={mockSetValue}
      />
    );
    const editor = getByRole('editor');
    fireEvent.blur(editor);
    expect(mockUpdateUrl).toHaveBeenCalled();
  });
});
