import ResponseBlock from '../../app/[method]/responseBlock';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { ResponseProps } from '../../core/types';

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

    expect(screen.getByText('200')).toBeInTheDocument();
    expect(screen.getByText('OK')).toBeInTheDocument();

    expect(screen.getByText('Test Name')).toBeInTheDocument();
    expect(screen.getByText('Test Details')).toBeInTheDocument();
  });
});
