import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import EndpointInput from '../../app/GRAPHQL/Graphiql/EndpointInput';
import graphiqlReducer from '../../store/graphiqlFeatures/graphiqlSlice';
import * as toastUtils from '../../utils/toastNonLatinError';

const mockStore = (preloadedState = {}) =>
  configureStore({
    reducer: {
      graphiql: graphiqlReducer,
    },
    preloadedState,
  });

const mockOnClickHandler = jest.fn();
const mockUpdateUrl = jest.fn();

describe('EndpointInput component', () => {
  it('renders with initial value from Redux store', () => {
    const store = mockStore({
      graphiql: { endpoint: 'http://example.com/graphql' },
    });

    render(
      <Provider store={store}>
        <EndpointInput
          onClickHandler={mockOnClickHandler}
          updateUrl={mockUpdateUrl}
          isRedirected={false}
        />
      </Provider>
    );

    const input = screen.getByPlaceholderText(
      'Enter your GraphQL API endpoint'
    );
    expect(input).toHaveValue('http://example.com/graphql');
  });

  it('dispatches setGraphiqlEndpoint on valid input change', () => {
    const store = mockStore({ graphiql: { endpoint: '' } });

    render(
      <Provider store={store}>
        <EndpointInput
          onClickHandler={mockOnClickHandler}
          updateUrl={mockUpdateUrl}
          isRedirected={false}
        />
      </Provider>
    );

    const input = screen.getByPlaceholderText(
      'Enter your GraphQL API endpoint'
    );
    fireEvent.change(input, { target: { value: 'http://new-endpoint.com' } });

    expect(input).toHaveValue('http://new-endpoint.com');
    expect(store.getState().graphiql.endpoint).toBe('http://new-endpoint.com');
  });

  it('calls toastNonLatinError on invalid (non-Latin1) input', () => {
    const toastSpy = jest.spyOn(toastUtils, 'default');
    const store = mockStore({ graphiql: { endpoint: '' } });

    render(
      <Provider store={store}>
        <EndpointInput
          onClickHandler={mockOnClickHandler}
          updateUrl={mockUpdateUrl}
          isRedirected={false}
        />
      </Provider>
    );

    const input = screen.getByPlaceholderText(
      'Enter your GraphQL API endpoint'
    );
    fireEvent.change(input, { target: { value: 'http://example.com/ф' } });

    expect(input).toHaveValue('');
    expect(toastSpy).toHaveBeenCalled();
  });

  it('calls updateUrl on blur', () => {
    const store = mockStore({ graphiql: { endpoint: '' } });

    render(
      <Provider store={store}>
        <EndpointInput
          onClickHandler={mockOnClickHandler}
          updateUrl={mockUpdateUrl}
          isRedirected={false}
        />
      </Provider>
    );

    const input = screen.getByPlaceholderText(
      'Enter your GraphQL API endpoint'
    );
    fireEvent.blur(input);

    expect(mockUpdateUrl).toHaveBeenCalled();
  });

  it('focuses input field when isRedirected is true', () => {
    const store = mockStore({ graphiql: { endpoint: '' } });

    render(
      <Provider store={store}>
        <EndpointInput
          onClickHandler={mockOnClickHandler}
          updateUrl={mockUpdateUrl}
          isRedirected={true}
        />
      </Provider>
    );

    const input = screen.getByPlaceholderText(
      'Enter your GraphQL API endpoint'
    );
    expect(input).toHaveFocus();
  });

  it('calls onClickHandler when SEND REQUEST button is clicked', () => {
    const store = mockStore({ graphiql: { endpoint: '' } });

    render(
      <Provider store={store}>
        <EndpointInput
          onClickHandler={mockOnClickHandler}
          updateUrl={mockUpdateUrl}
          isRedirected={false}
        />
      </Provider>
    );

    const button = screen.getByText('SEND REQUEST');
    fireEvent.click(button);

    expect(mockOnClickHandler).toHaveBeenCalled();
  });
});
