import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Documentation from '../../app/GRAPHQL/Response/Documentation';

describe('Documentation Component', () => {
  test('renders without crashing', () => {
    render(<Documentation doc="Sample documentation" />);
    expect(screen.getByText('Documentation:')).toBeInTheDocument();
  });

  test('displays the documentation text', () => {
    const docText = 'Sample documentation';
    render(<Documentation doc={docText} />);
    expect(screen.getByText(docText)).toBeInTheDocument();
  });

  test('handles undefined doc prop', () => {
    render(<Documentation doc={undefined} />);
    expect(screen.getByText('Documentation:')).toBeInTheDocument();
    expect(screen.getByRole('region')).toBeInTheDocument();
  });
});
