import ResponseBlock from '../../app/[method]/responseBlock';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { ResponseProps } from '../../core/types';

jest.mock('../../app/[method]/status', () => () => (
  <div>Mock Status Component</div>
));
jest.mock('../../app/[method]/bodyResponse', () => () => (
  <div>Mock BodyResponse Component</div>
));

const mockResponse: ResponseProps = {
  response: {
    body: {
      id: 1,
      name: 'Test Name',
      details: 'Test Details',
    },
    status: 200,
    statusText: 'OK',
  },
};

describe('ResponseBlock Component', () => {
  it('renders Status and BodyResponse components with provided response props', () => {
    render(<ResponseBlock {...mockResponse} />);

    expect(screen.getByText('Mock Status Component')).toBeInTheDocument();
    expect(screen.getByText('Mock BodyResponse Component')).toBeInTheDocument();
  });
});
