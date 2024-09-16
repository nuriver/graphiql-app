import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Loading from '../app/loading';

describe('Loading Component', () => {
  it('should render loader correctly', () => {
    render(<Loading />);
    const loaderElement = screen.getByRole('status');
    expect(loaderElement).toBeInTheDocument();
    expect(loaderElement).toHaveClass('loader');
  });
});
