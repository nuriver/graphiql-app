import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Page from './page';

jest.mock('./History.tsx', () => () => <div>Mocked HistoryPage</div>);

test('renders HistoryPage component', () => {
  const { getByText } = render(<Page />);
  expect(getByText('Mocked HistoryPage')).toBeInTheDocument();
});
