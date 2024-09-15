import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import RequestBlock from '../../app/[method]/requestBlock';
import { setupStore } from '../../store/store';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('RequestBlock component', () => {
  it('renders without crashing', () => {
    render(
      <Provider store={setupStore()}>
        <RequestBlock requestHandler={() => {}} />
      </Provider>
    );

    expect(screen.getByText(/Method/i)).toBeInTheDocument();
    expect(screen.getByText(/Endpoint URL/i)).toBeInTheDocument();
    expect(screen.getByText(/Headers/i)).toBeInTheDocument();
    expect(screen.getByText(/Body/i)).toBeInTheDocument();
  });
});

describe('RequestBlock component', () => {
  it('renders with missing props gracefully', () => {
    render(
      <Provider store={setupStore()}>
        <RequestBlock requestHandler={() => {}} />
      </Provider>
    );

    expect(screen.getByText(/Method/i)).toBeInTheDocument();
    expect(screen.getByText(/Endpoint URL/i)).toBeInTheDocument();
    expect(screen.getByText(/Headers/i)).toBeInTheDocument();
    expect(screen.getByText(/Body/i)).toBeInTheDocument();
  });
});

describe('RequestBlock component', () => {
  it('renders without headers and pathname', () => {
    render(
      <Provider store={setupStore()}>
        <RequestBlock requestHandler={() => {}} />
      </Provider>
    );

    expect(screen.getByText(/Method/i)).toBeInTheDocument();
    expect(screen.getByText(/Endpoint URL/i)).toBeInTheDocument();
    expect(screen.getByText(/Headers/i)).toBeInTheDocument();
    expect(screen.getByText(/Body/i)).toBeInTheDocument();
  });
});
