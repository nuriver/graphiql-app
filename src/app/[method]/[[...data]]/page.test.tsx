import Page from './page';
import MyRest from './MyRest';
import { render } from '@testing-library/react';

jest.mock('./MyRest', () => jest.fn(() => <div>MyRest Component</div>));

describe('Page Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render MyRest with null requestData if no data is provided', () => {
    const params = { method: 'GET' };

    render(<Page params={params} />);

    expect(MyRest).toHaveBeenCalledWith(
      { requestData: null },
      expect.any(Object)
    );
  });

  it('should decode and pass requestData to MyRest', () => {
    const data = [btoa(JSON.stringify({ id: 1, name: 'Test' }))];
    const params = { method: 'POST', data };
    render(<Page params={params} />);

    expect(MyRest).toHaveBeenCalledWith(
      { requestData: { id: 1, name: 'Test' } },
      expect.any(Object)
    );
  });
});
